// Memory benchmark: bytes per cached object, measured from heapUsed deltas.
//
//   pnpm exec tsc -p tsconfig.json   (the benchmark loads ./dist)
//   node --expose-gc test/memory.mjs [guilds=200] [messages=20000]
//
// Each stage builds its objects from freshly JSON-parsed payloads (so every string is its own allocation, like a
// gateway packet) and drops the raw payloads before measuring, so the strings the library keeps are counted and the
// ones it discards are not.
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { Client } = require("../dist/lib/index.js");

if (typeof globalThis.gc !== "function") {
    console.error("Run with: node --expose-gc test/memory.mjs");
    process.exit(1);
}

const GUILDS = Number(process.argv[2] ?? 200);
const MESSAGES = Number(process.argv[3] ?? 20000);
const CHANNELS_PER_GUILD = 42;
const ROLES_PER_GUILD = 41;
const MEMBERS_PER_GUILD = 40;

let idCounter = 100000000000000000n;
const nextID = () => String(idCounter++);
// round-trip through JSON so each string is a new allocation, like a parsed gateway payload
const fresh = value => JSON.parse(JSON.stringify(value));

function heap() {
    for (let i = 0; i < 4; i++) globalThis.gc();
    return process.memoryUsage().heapUsed;
}

function rawGuild() {
    return fresh({
        id:                           nextID(),
        name:                         "Synthetic guild",
        icon:                         "a_1234567890abcdef1234567890abcdef",
        splash:                       null,
        discovery_splash:             null,
        owner_id:                     nextID(),
        afk_channel_id:               null,
        afk_timeout:                  300,
        verification_level:           1,
        default_message_notifications: 0,
        explicit_content_filter:      2,
        roles:                        [],
        emojis:                       [],
        stickers:                     [],
        features:                     ["COMMUNITY", "NEWS"],
        mfa_level:                    0,
        application_id:               null,
        system_channel_id:            null,
        system_channel_flags:         0,
        rules_channel_id:             null,
        max_members:                  500000,
        vanity_url_code:              null,
        description:                  null,
        banner:                       null,
        premium_tier:                 1,
        premium_subscription_count:   3,
        preferred_locale:             "en-US",
        public_updates_channel_id:    null,
        nsfw_level:                   0,
        premium_progress_bar_enabled: false,
        member_count:                 MEMBERS_PER_GUILD,
        channels:                     [],
        threads:                      [],
        members:                      [],
        presences:                    [],
        voice_states:                 [],
        stage_instances:              [],
        guild_scheduled_events:       [],
        soundboard_sounds:            []
    });
}

function rawChannel(guildID, position) {
    return fresh({
        id:                    nextID(),
        type:                  0,
        guild_id:              guildID,
        name:                  `channel-${position}`,
        position,
        permission_overwrites: [
            { id: nextID(), type: 0, allow: "1024", deny: "0" },
            { id: nextID(), type: 1, allow: "0", deny: "2048" }
        ],
        parent_id:             nextID(),
        topic:                 "A channel topic of average length",
        nsfw:                  false,
        last_message_id:       null,
        rate_limit_per_user:   0,
        flags:                 0
    });
}

function rawRole(position) {
    return fresh({
        id:            nextID(),
        name:          `role-${position}`,
        color:         0x3498db,
        colors:        { primary_color: 0x3498db, secondary_color: null, tertiary_color: null },
        hoist:         position % 3 === 0,
        icon:          null,
        unicode_emoji: null,
        position,
        permissions:   "1071698660929",
        managed:       false,
        mentionable:   position % 2 === 0,
        flags:         0,
        tags:          {}
    });
}

function rawMember() {
    const id = nextID();
    return fresh({
        user: {
            id,
            username:               `user_${id.slice(-8)}`,
            discriminator:          "0",
            global_name:            "Some User",
            avatar:                 "0123456789abcdef0123456789abcdef",
            bot:                    false,
            system:                 false,
            banner:                 null,
            accent_color:           null,
            avatar_decoration_data: null,
            public_flags:           0,
            flags:                  0
        },
        nick:                       "nickname",
        avatar:                     null,
        banner:                     null,
        roles:                      [],
        joined_at:                  "2023-04-05T06:07:08.000000+00:00",
        premium_since:              null,
        deaf:                       false,
        mute:                       false,
        flags:                      0,
        pending:                    false,
        communication_disabled_until: null
    });
}

function rawMessage(channel, author) {
    const id = nextID();
    return fresh({
        id,
        channel_id:       channel.id,
        guild_id:         channel.guildID,
        author,
        content:          "A plain message of roughly average length, nothing special in it at all.",
        timestamp:        "2026-01-02T03:04:05.678000+00:00",
        edited_timestamp: null,
        tts:              false,
        mention_everyone: false,
        mentions:         [],
        mention_roles:    [],
        attachments:      [],
        embeds:           [],
        reactions:        undefined,
        nonce:            "1234567890123",
        pinned:           false,
        type:             0,
        flags:            0,
        components:       []
    });
}

const client = new Client({ collectionLimits: { messages: MESSAGES + 100 } });
// a READY client always has its application; Guild#update reads it
client._application = { id: nextID() };
const results = {};
const guildIDs = [];

function measure(label, count, build) {
    const before = heap();
    build();
    const after = heap();
    results[label] = { total: after - before, count, perObject: (after - before) / count };
}

measure("guild shell", GUILDS, () => {
    for (let i = 0; i < GUILDS; i++) {
        const raw = rawGuild();
        client.guilds.update(raw);
        guildIDs.push(raw.id);
    }
});

measure("text channel (2 overwrites)", GUILDS * CHANNELS_PER_GUILD, () => {
    for (const guildID of guildIDs) {
        const guild = client.guilds.get(guildID);
        for (let i = 0; i < CHANNELS_PER_GUILD; i++) guild.channels.update(rawChannel(guildID, i));
    }
});

measure("role", GUILDS * ROLES_PER_GUILD, () => {
    for (const guildID of guildIDs) {
        const guild = client.guilds.get(guildID);
        for (let i = 0; i < ROLES_PER_GUILD; i++) guild.roles.update(rawRole(i), guildID);
    }
});

measure("member + user", GUILDS * MEMBERS_PER_GUILD, () => {
    for (const guildID of guildIDs) {
        const guild = client.guilds.get(guildID);
        for (let i = 0; i < MEMBERS_PER_GUILD; i++) {
            const raw = rawMember();
            guild.members.update({ ...raw, id: raw.user.id }, guildID);
        }
    }
});

{
    const guild = client.guilds.get(guildIDs[0]);
    const channel = guild.channels.find(c => c.type === 0);
    const authors = Array.from({ length: MEMBERS_PER_GUILD }, () => rawMember().user);
    measure("plain message", MESSAGES, () => {
        for (let i = 0; i < MESSAGES; i++) channel.messages.update(rawMessage(channel, authors[i % authors.length]));
    });
}

const fmt = n => `${n.toFixed(0)} B`.padStart(10);
console.log(`node ${process.version}, ${GUILDS} guilds, ${CHANNELS_PER_GUILD} channels/${ROLES_PER_GUILD} roles/${MEMBERS_PER_GUILD} members each, ${MESSAGES} messages`);
for (const [label, { perObject, count }] of Object.entries(results)) {
    console.log(`${label.padEnd(30)} ${fmt(perObject)} / object   (${count} objects)`);
}
