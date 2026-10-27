"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_REACTION_ADD = exports.MESSAGE_POLL_VOTE_REMOVE = exports.MESSAGE_POLL_VOTE_ADD = exports.MESSAGE_DELETE_BULK = exports.MESSAGE_DELETE = exports.MESSAGE_CREATE = exports.INVITE_DELETE = exports.INVITE_CREATE = exports.INTERACTION_CREATE = exports.INTEGRATION_UPDATE = exports.INTEGRATION_DELETE = exports.INTEGRATION_CREATE = exports.GUILD_UPDATE = exports.GUILD_STICKERS_UPDATE = exports.GUILD_SOUNDBOARD_SOUNDS_UPDATE = exports.GUILD_SOUNDBOARD_SOUND_UPDATE = exports.GUILD_SOUNDBOARD_SOUND_DELETE = exports.GUILD_SOUNDBOARD_SOUND_CREATE = exports.GUILD_SCHEDULED_EVENT_USER_REMOVE = exports.GUILD_SCHEDULED_EVENT_USER_ADD = exports.GUILD_SCHEDULED_EVENT_UPDATE = exports.GUILD_SCHEDULED_EVENT_DELETE = exports.GUILD_SCHEDULED_EVENT_CREATE = exports.GUILD_ROLE_UPDATE = exports.GUILD_ROLE_DELETE = exports.GUILD_ROLE_CREATE = exports.GUILD_MEMBER_UPDATE = exports.GUILD_MEMBER_REMOVE = exports.GUILD_MEMBERS_CHUNK = exports.GUILD_MEMBER_ADD = exports.GUILD_INTEGRATIONS_UPDATE = exports.GUILD_EMOJIS_UPDATE = exports.GUILD_DELETE = exports.GUILD_CREATE = exports.GUILD_BAN_REMOVE = exports.GUILD_BAN_ADD = exports.GUILD_AUDIT_LOG_ENTRY_CREATE = exports.ENTITLEMENT_UPDATE = exports.ENTITLEMENT_DELETE = exports.ENTITLEMENT_CREATE = exports.CHANNEL_UPDATE = exports.CHANNEL_PINS_UPDATE = exports.CHANNEL_INFO = exports.CHANNEL_DELETE = exports.CHANNEL_CREATE = exports.AUTO_MODERATION_RULE_UPDATE = exports.AUTO_MODERATION_RULE_DELETE = exports.AUTO_MODERATION_RULE_CREATE = exports.AUTO_MODERATION_ACTION_EXECUTION = exports.APPLICATION_COMMAND_PERMISSIONS_UPDATE = void 0;
exports.WEBHOOKS_UPDATE = exports.VOICE_SERVER_UPDATE = exports.VOICE_CHANNEL_STATUS_UPDATE = exports.VOICE_CHANNEL_START_TIME_UPDATE = exports.VOICE_STATE_UPDATE = exports.VOICE_CHANNEL_EFFECT_SEND = exports.USER_UPDATE = exports.TYPING_START = exports.THREAD_UPDATE = exports.THREAD_MEMBERS_UPDATE = exports.THREAD_MEMBER_UPDATE = exports.THREAD_LIST_SYNC = exports.THREAD_DELETE = exports.THREAD_CREATE = exports.STAGE_INSTANCE_UPDATE = exports.STAGE_INSTANCE_DELETE = exports.STAGE_INSTANCE_CREATE = exports.SUBSCRIPTION_UPDATE = exports.SUBSCRIPTION_DELETE = exports.SUBSCRIPTION_CREATE = exports.SOUNDBOARD_SOUNDS = exports.RATE_LIMITED = exports.RESUMED = exports.READY = exports.PRESENCE_UPDATE = exports.MESSAGE_UPDATE = exports.MESSAGE_REACTION_REMOVE_EMOJI = exports.MESSAGE_REACTION_REMOVE_ALL = exports.MESSAGE_REACTION_REMOVE = void 0;
const tslib_1 = require("tslib");
const node_util_1 = require("node:util");
const Constants_1 = require("../Constants");
const AuditLogEntry_1 = tslib_1.__importDefault(require("../structures/AuditLogEntry"));
const AutoModerationRule_1 = tslib_1.__importDefault(require("../structures/AutoModerationRule"));
const Channel_1 = tslib_1.__importDefault(require("../structures/Channel"));
const Guild_1 = tslib_1.__importDefault(require("../structures/Guild"));
const GuildScheduledEvent_1 = tslib_1.__importDefault(require("../structures/GuildScheduledEvent"));
const Integration_1 = tslib_1.__importDefault(require("../structures/Integration"));
const Interaction_1 = tslib_1.__importDefault(require("../structures/Interaction"));
const Invite_1 = tslib_1.__importDefault(require("../structures/Invite"));
const Member_1 = tslib_1.__importDefault(require("../structures/Member"));
const Message_1 = tslib_1.__importDefault(require("../structures/Message"));
const Role_1 = tslib_1.__importDefault(require("../structures/Role"));
const Soundboard_1 = tslib_1.__importDefault(require("../structures/Soundboard"));
const StageChannel_1 = tslib_1.__importDefault(require("../structures/StageChannel"));
const StageInstance_1 = tslib_1.__importDefault(require("../structures/StageInstance"));
const VoiceChannel_1 = tslib_1.__importDefault(require("../structures/VoiceChannel"));
const VoiceState_1 = tslib_1.__importDefault(require("../structures/VoiceState"));
async function APPLICATION_COMMAND_PERMISSIONS_UPDATE(data, shard) {
    shard.client.emit("applicationCommandPermissionsUpdate", shard.client.guilds.get(data.guild_id) ?? { id: data.guild_id }, {
        application: data.application_id === shard.client.application.id ? shard.client.application : undefined,
        applicationID: data.application_id,
        id: data.id,
        permissions: data.permissions,
    });
}
exports.APPLICATION_COMMAND_PERMISSIONS_UPDATE = APPLICATION_COMMAND_PERMISSIONS_UPDATE;
async function AUTO_MODERATION_ACTION_EXECUTION(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const channel = shard.client.getChannel(data.channel_id ?? "");
    shard.client.emit("autoModerationActionExecution", guild ?? { id: data.guild_id }, data.channel_id === undefined ? null : channel ?? { id: data.channel_id }, shard.client.users.get(data.user_id) ?? { id: data.user_id }, {
        action: {
            metadata: {
                channelID: data.action.metadata.channel_id,
                customMessage: data.action.metadata.custom_message,
                durationSeconds: data.action.metadata.duration_seconds,
            },
            type: data.action.type,
        },
        alertSystemMessageID: data.alert_system_message_id,
        content: data.content,
        matchedContent: data.matched_content,
        matchedKeyword: data.matched_keyword,
        messageID: data.message_id,
        rule: guild?.autoModerationRules.get(data.rule_id),
        ruleID: data.rule_id,
        ruleTriggerType: data.rule_trigger_type,
    });
}
exports.AUTO_MODERATION_ACTION_EXECUTION = AUTO_MODERATION_ACTION_EXECUTION;
async function AUTO_MODERATION_RULE_CREATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const rule = guild?.autoModerationRules.update(data) ?? new AutoModerationRule_1.default(data, shard.client);
    shard.client.emit("autoModerationRuleCreate", rule);
}
exports.AUTO_MODERATION_RULE_CREATE = AUTO_MODERATION_RULE_CREATE;
async function AUTO_MODERATION_RULE_DELETE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const rule = guild?.autoModerationRules.update(data) ?? new AutoModerationRule_1.default(data, shard.client);
    guild?.autoModerationRules.delete(data.id);
    shard.client.emit("autoModerationRuleDelete", rule);
}
exports.AUTO_MODERATION_RULE_DELETE = AUTO_MODERATION_RULE_DELETE;
async function AUTO_MODERATION_RULE_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldRule = guild?.autoModerationRules.get(data.id)?.toJSON() ?? null;
    const rule = guild?.autoModerationRules.update(data) ?? new AutoModerationRule_1.default(data, shard.client);
    shard.client.emit("autoModerationRuleUpdate", rule, oldRule);
}
exports.AUTO_MODERATION_RULE_UPDATE = AUTO_MODERATION_RULE_UPDATE;
async function CHANNEL_CREATE(data, shard) {
    const channel = shard.client.util.updateChannel(data);
    shard.client.emit("channelCreate", channel);
}
exports.CHANNEL_CREATE = CHANNEL_CREATE;
async function CHANNEL_DELETE(data, shard) {
    if (data.type === Constants_1.ChannelTypes.DM) {
        const channel = shard.client.privateChannels.get(data.id);
        shard.client.privateChannels.delete(data.id);
        shard.client.emit("channelDelete", channel ?? {
            id: data.id,
            flags: data.flags,
            lastMessageID: data.last_message_id,
            type: data.type,
        });
        return;
    }
    const guild = shard.client.guilds.get(data.guild_id);
    const channel = shard.client.util.updateChannel(data);
    if (channel instanceof VoiceChannel_1.default || channel instanceof StageChannel_1.default) {
        for (const [, member] of channel.voiceMembers) {
            channel.voiceMembers.delete(member.id);
            shard.client.emit("voiceChannelLeave", member, channel);
        }
    }
    guild?.channels.delete(data.id);
    shard.client.emit("channelDelete", channel);
}
exports.CHANNEL_DELETE = CHANNEL_DELETE;
async function CHANNEL_INFO(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const channels = data.channels.map(channelInfo => ({ channel: guild?.channels.update(channelInfo), info: channelInfo }));
    for (const nonce in shard["_requestChannelInfoPromise"]) {
        if (data.guild_id === shard["_requestChannelInfoPromise"][nonce].guildID) {
            shard["_requestChannelInfoPromise"][nonce].channels.push(...channels);
            clearTimeout(shard["_requestChannelInfoPromise"][nonce].timeout);
            shard["_requestChannelInfoPromise"][nonce].resolve(shard["_requestChannelInfoPromise"][nonce].channels);
            delete shard["_requestChannelInfoPromise"][nonce];
        }
    }
    shard.client.emit("channelInfo", guild ?? { id: data.guild_id }, channels, shard);
    shard.lastHeartbeatAck = true;
}
exports.CHANNEL_INFO = CHANNEL_INFO;
async function CHANNEL_PINS_UPDATE(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    shard.client.emit("channelPinsUpdate", channel ?? { id: data.channel_id }, data.last_pin_timestamp === undefined || data.last_pin_timestamp === null ? null : new Date(data.last_pin_timestamp));
}
exports.CHANNEL_PINS_UPDATE = CHANNEL_PINS_UPDATE;
async function CHANNEL_UPDATE(data, shard) {
    const oldChannel = shard.client.getChannel(data.id)?.toJSON() ?? null;
    let channel;
    if (oldChannel && oldChannel.type !== data.type) {
        const guildID = shard.client.channelGuildMap.get(data.id);
        if (guildID)
            shard.client.guilds.get(guildID)?.channels.delete(data.id);
        channel = shard.client.util.updateChannel(data);
    }
    else {
        channel = shard.client.util.updateChannel(data);
    }
    shard.client.emit("channelUpdate", channel, oldChannel);
}
exports.CHANNEL_UPDATE = CHANNEL_UPDATE;
async function ENTITLEMENT_CREATE(data, shard) {
    const entitlement = shard.client.util.updateEntitlement(data);
    shard.client.emit("entitlementCreate", entitlement);
}
exports.ENTITLEMENT_CREATE = ENTITLEMENT_CREATE;
async function ENTITLEMENT_DELETE(data, shard) {
    const entitlement = shard.client.util.updateEntitlement(data);
    shard.client["_application"]?.entitlements.delete(data.id);
    shard.client.emit("entitlementDelete", entitlement);
}
exports.ENTITLEMENT_DELETE = ENTITLEMENT_DELETE;
async function ENTITLEMENT_UPDATE(data, shard) {
    const oldEntitlement = shard.client["_application"]?.entitlements.get(data.id)?.toJSON() ?? null;
    const entitlement = shard.client.util.updateEntitlement(data);
    shard.client.emit("entitlementUpdate", entitlement, oldEntitlement);
}
exports.ENTITLEMENT_UPDATE = ENTITLEMENT_UPDATE;
async function GUILD_AUDIT_LOG_ENTRY_CREATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    shard.client.emit("guildAuditLogEntryCreate", guild ?? { id: data.guild_id }, guild?.auditLogEntries.update(data) ?? new AuditLogEntry_1.default(data, shard.client));
}
exports.GUILD_AUDIT_LOG_ENTRY_CREATE = GUILD_AUDIT_LOG_ENTRY_CREATE;
async function GUILD_BAN_ADD(data, shard) {
    shard.client.emit("guildBanAdd", shard.client.guilds.get(data.guild_id) ?? { id: data.guild_id }, shard.client.users.update(data.user));
}
exports.GUILD_BAN_ADD = GUILD_BAN_ADD;
async function GUILD_BAN_REMOVE(data, shard) {
    shard.client.emit("guildBanRemove", shard.client.guilds.get(data.guild_id) ?? { id: data.guild_id }, shard.client.users.update(data.user));
}
exports.GUILD_BAN_REMOVE = GUILD_BAN_REMOVE;
async function GUILD_CREATE(data, shard) {
    if (data.unavailable) {
        shard.client.guilds.delete(data.id);
        shard.client.emit("unavailableGuildCreate", shard.client.unavailableGuilds.update(data), shard);
    }
    else {
        const guild = shard["createGuild"](data);
        if (shard.ready) {
            if (shard.client.unavailableGuilds.delete(guild.id)) {
                shard.client.emit("guildAvailable", guild, shard);
            }
            else {
                shard.client.emit("guildCreate", guild, shard);
            }
        }
        else {
            if (shard.client.unavailableGuilds.delete(guild.id)) {
                void shard["restartGuildCreateTimeout"]();
            }
            else {
                shard.client.emit("guildCreate", guild, shard);
            }
        }
    }
}
exports.GUILD_CREATE = GUILD_CREATE;
async function GUILD_DELETE(data, shard) {
    shard.client.voiceAdapters.get(data.id)?.destroy();
    shard.client.guildShardMap.delete(data.id);
    const guild = shard.client.guilds.get(data.id);
    guild?.channels.clear();
    guild?.threads.clear();
    shard.client.guilds.delete(data.id);
    if (data.unavailable) {
        shard.client.emit("guildUnavailable", shard.client.unavailableGuilds.update(data), shard);
    }
    else {
        shard.client.emit("guildDelete", guild ?? { id: data.id }, shard);
    }
}
exports.GUILD_DELETE = GUILD_DELETE;
async function GUILD_EMOJIS_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldEmojis = guild?.emojis ? guild.emojis.toArray() : null;
    guild?.["update"]({ emojis: data.emojis });
    shard.client.emit("guildEmojisUpdate", guild ?? { id: data.guild_id }, guild?.emojis.toArray() ?? data.emojis.map(emoji => shard.client.util.convertGuildEmoji(emoji)), oldEmojis);
}
exports.GUILD_EMOJIS_UPDATE = GUILD_EMOJIS_UPDATE;
async function GUILD_INTEGRATIONS_UPDATE(data, shard) {
    shard.client.emit("guildIntegrationsUpdate", shard.client.guilds.get(data.guild_id) ?? { id: data.guild_id });
}
exports.GUILD_INTEGRATIONS_UPDATE = GUILD_INTEGRATIONS_UPDATE;
async function GUILD_MEMBER_ADD(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    if (guild) {
        guild.memberCount++;
    }
    const member = shard.client.util.updateMember(data.guild_id, data.user.id, data);
    shard.client.emit("guildMemberAdd", member);
}
exports.GUILD_MEMBER_ADD = GUILD_MEMBER_ADD;
async function GUILD_MEMBERS_CHUNK(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    guild?.["updateMemberLimit"](data.members.length);
    const members = data.members.map(member => shard.client.util.updateMember(data.guild_id, member.user.id, member));
    if (!data.nonce) {
        shard.client.emit("warn", "Received GUILD_MEMBERS_CHUNK without a nonce.");
        return;
    }
    // Record<string, ...> indexed access is always-defined per the type without noUncheckedIndexedAccess -
    // these checks are real runtime guards against a key that was never set/already deleted
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (shard["_requestMembersPromise"][data.nonce]) {
        shard["_requestMembersPromise"][data.nonce].members.push(...members);
    }
    if (data.chunk_index >= data.chunk_count - 1) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (shard["_requestMembersPromise"][data.nonce]) {
            clearTimeout(shard["_requestMembersPromise"][data.nonce].timeout);
            shard["_requestMembersPromise"][data.nonce].resolve(shard["_requestMembersPromise"][data.nonce].members);
            delete shard["_requestMembersPromise"][data.nonce];
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (shard["_getAllUsersCount"][data.guild_id]) {
            delete shard["_getAllUsersCount"][data.guild_id];
            void shard["checkReady"]();
        }
    }
    shard.client.emit("guildMemberChunk", members, shard);
    shard.lastHeartbeatAck = true;
}
exports.GUILD_MEMBERS_CHUNK = GUILD_MEMBERS_CHUNK;
async function GUILD_MEMBER_REMOVE(data, shard) {
    if (data.user.id === shard.client.user.id) {
        return;
    }
    const guild = shard.client.guilds.get(data.guild_id);
    let user = guild?.members.get(data.user.id);
    if (user instanceof Member_1.default) {
        user["update"]({ user: data.user });
    }
    else {
        user = shard.client.users.update(data.user);
    }
    if (guild) {
        guild.memberCount--;
        guild.members.delete(data.user.id);
    }
    shard.client.emit("guildMemberRemove", user, guild ?? { id: data.guild_id });
}
exports.GUILD_MEMBER_REMOVE = GUILD_MEMBER_REMOVE;
async function GUILD_MEMBER_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldMember = guild?.members.get(data.user.id)?.toJSON() ?? null;
    const member = shard.client.util.updateMember(data.guild_id, data.user.id, { deaf: false, mute: false, ...data });
    shard.client.emit("guildMemberUpdate", member, oldMember);
}
exports.GUILD_MEMBER_UPDATE = GUILD_MEMBER_UPDATE;
async function GUILD_ROLE_CREATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const role = guild?.roles.update(data.role, data.guild_id) ?? new Role_1.default(data.role, shard.client, data.guild_id);
    shard.client.emit("guildRoleCreate", role);
}
exports.GUILD_ROLE_CREATE = GUILD_ROLE_CREATE;
async function GUILD_ROLE_DELETE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const role = guild?.roles.get(data.role_id);
    guild?.roles.delete(data.role_id);
    shard.client.emit("guildRoleDelete", role ?? { id: data.role_id }, guild ?? { id: data.guild_id });
}
exports.GUILD_ROLE_DELETE = GUILD_ROLE_DELETE;
async function GUILD_ROLE_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldRole = guild?.roles.get(data.role.id)?.toJSON() ?? null;
    const role = guild?.roles.update(data.role, data.guild_id) ?? new Role_1.default(data.role, shard.client, data.guild_id);
    shard.client.emit("guildRoleUpdate", role, oldRole);
}
exports.GUILD_ROLE_UPDATE = GUILD_ROLE_UPDATE;
async function GUILD_SCHEDULED_EVENT_CREATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const event = guild?.scheduledEvents.update(data) ?? new GuildScheduledEvent_1.default(data, shard.client);
    shard.client.emit("guildScheduledEventCreate", event);
}
exports.GUILD_SCHEDULED_EVENT_CREATE = GUILD_SCHEDULED_EVENT_CREATE;
async function GUILD_SCHEDULED_EVENT_DELETE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const event = guild?.scheduledEvents.update(data) ?? new GuildScheduledEvent_1.default(data, shard.client);
    guild?.scheduledEvents.delete(data.id);
    shard.client.emit("guildScheduledEventDelete", event);
}
exports.GUILD_SCHEDULED_EVENT_DELETE = GUILD_SCHEDULED_EVENT_DELETE;
async function GUILD_SCHEDULED_EVENT_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldEvent = guild?.scheduledEvents.get(data.id)?.toJSON() ?? null;
    const event = guild?.scheduledEvents.update(data) ?? new GuildScheduledEvent_1.default(data, shard.client);
    shard.client.emit("guildScheduledEventUpdate", event, oldEvent);
}
exports.GUILD_SCHEDULED_EVENT_UPDATE = GUILD_SCHEDULED_EVENT_UPDATE;
async function GUILD_SCHEDULED_EVENT_USER_ADD(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const event = guild?.scheduledEvents.get(data.guild_scheduled_event_id);
    if (event?.userCount) {
        event.userCount++;
    }
    const user = shard.client.users.get(data.user_id) ?? { id: data.user_id };
    shard.client.emit("guildScheduledEventUserAdd", event ?? { id: data.guild_scheduled_event_id }, user);
}
exports.GUILD_SCHEDULED_EVENT_USER_ADD = GUILD_SCHEDULED_EVENT_USER_ADD;
async function GUILD_SCHEDULED_EVENT_USER_REMOVE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const event = guild?.scheduledEvents.get(data.guild_scheduled_event_id);
    if (event?.userCount) {
        event.userCount--;
    }
    const user = shard.client.users.get(data.user_id) ?? { id: data.user_id };
    shard.client.emit("guildScheduledEventUserRemove", event ?? { id: data.guild_scheduled_event_id }, user);
}
exports.GUILD_SCHEDULED_EVENT_USER_REMOVE = GUILD_SCHEDULED_EVENT_USER_REMOVE;
async function GUILD_SOUNDBOARD_SOUND_CREATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const soundboardSound = guild?.soundboardSounds.update(data) ?? new Soundboard_1.default(data, shard.client);
    shard.client.emit("guildSoundboardSoundCreate", soundboardSound);
}
exports.GUILD_SOUNDBOARD_SOUND_CREATE = GUILD_SOUNDBOARD_SOUND_CREATE;
async function GUILD_SOUNDBOARD_SOUND_DELETE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const soundboardSound = guild?.soundboardSounds.get(data.sound_id);
    guild?.soundboardSounds.delete(data.sound_id);
    shard.client.emit("guildSoundboardSoundDelete", soundboardSound ?? { id: data.sound_id });
}
exports.GUILD_SOUNDBOARD_SOUND_DELETE = GUILD_SOUNDBOARD_SOUND_DELETE;
async function GUILD_SOUNDBOARD_SOUND_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldSoundboardSound = guild?.soundboardSounds.get(data.sound_id)?.toJSON() ?? null;
    const soundboardSound = guild?.soundboardSounds.update(data) ?? new Soundboard_1.default(data, shard.client);
    shard.client.emit("guildSoundboardSoundUpdate", soundboardSound, oldSoundboardSound);
}
exports.GUILD_SOUNDBOARD_SOUND_UPDATE = GUILD_SOUNDBOARD_SOUND_UPDATE;
async function GUILD_SOUNDBOARD_SOUNDS_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldSoundboardSounds = data.soundboard_sounds.map(rawSound => guild?.soundboardSounds.get(rawSound.sound_id)?.toJSON() ?? null);
    const newSoundboardSounds = data.soundboard_sounds.map(sound => guild?.soundboardSounds.update(sound) ?? new Soundboard_1.default(sound, shard.client));
    shard.client.emit("guildSoundboardSoundsUpdate", newSoundboardSounds, oldSoundboardSounds, data.guild_id);
}
exports.GUILD_SOUNDBOARD_SOUNDS_UPDATE = GUILD_SOUNDBOARD_SOUNDS_UPDATE;
async function GUILD_STICKERS_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldStickers = guild?.stickers ? guild.stickers.toArray() : null;
    guild?.["update"]({ stickers: data.stickers });
    shard.client.emit("guildStickersUpdate", guild ?? { id: data.guild_id }, guild?.stickers.toArray() ?? data.stickers.map(sticker => shard.client.util.convertSticker(sticker)), oldStickers);
}
exports.GUILD_STICKERS_UPDATE = GUILD_STICKERS_UPDATE;
async function GUILD_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.id);
    const oldGuild = guild?.toJSON() ?? null;
    shard.client.emit("guildUpdate", shard.client.guilds.update(data), oldGuild);
}
exports.GUILD_UPDATE = GUILD_UPDATE;
async function INTEGRATION_CREATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const integration = guild?.integrations.update(data, data.guild_id) ?? new Integration_1.default(data, shard.client, data.guild_id);
    shard.client.emit("integrationCreate", guild ?? { id: data.guild_id }, integration);
}
exports.INTEGRATION_CREATE = INTEGRATION_CREATE;
async function INTEGRATION_DELETE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const integration = guild?.integrations.get(data.id);
    guild?.integrations.delete(data.id);
    shard.client.emit("integrationDelete", guild ?? { id: data.guild_id }, integration ?? { applicationID: data.application_id, id: data.id });
}
exports.INTEGRATION_DELETE = INTEGRATION_DELETE;
async function INTEGRATION_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldIntegration = guild?.integrations.get(data.id)?.toJSON() ?? null;
    const integration = guild?.integrations.update(data, data.guild_id) ?? new Integration_1.default(data, shard.client, data.guild_id);
    shard.client.emit("integrationUpdate", guild ?? { id: data.guild_id }, integration, oldIntegration);
}
exports.INTEGRATION_UPDATE = INTEGRATION_UPDATE;
async function INTERACTION_CREATE(data, shard) {
    shard.client.emit("interactionCreate", Interaction_1.default.from(data, shard.client));
}
exports.INTERACTION_CREATE = INTERACTION_CREATE;
async function INVITE_CREATE(data, shard) {
    let invite;
    if (data.guild_id) {
        const guild = shard.client.guilds.get(data.guild_id);
        invite = guild?.invites.update(data);
    }
    shard.client.emit("inviteCreate", invite ?? new Invite_1.default(data, shard.client));
}
exports.INVITE_CREATE = INVITE_CREATE;
async function INVITE_DELETE(data, shard) {
    const channel = shard.client.getChannel(data.channel_id) ?? { id: data.channel_id };
    const guild = data.guild_id ? shard.client.guilds.get(data.guild_id) ?? { id: data.guild_id } : undefined;
    let invite = {
        code: data.code,
        channel,
        guild,
    };
    if (guild instanceof Guild_1.default && guild.invites.has(data.code)) {
        invite = guild.invites.get(data.code);
        guild.invites.delete(data.code);
    }
    shard.client.emit("inviteDelete", invite);
}
exports.INVITE_DELETE = INVITE_DELETE;
async function MESSAGE_CREATE(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const message = channel?.messages.update(data) ?? new Message_1.default(data, shard.client);
    if (channel) {
        channel.lastMessageID = message.id;
    }
    shard.client.emit("messageCreate", message);
}
exports.MESSAGE_CREATE = MESSAGE_CREATE;
async function MESSAGE_DELETE(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const message = channel?.messages.get(data.id);
    if (channel) {
        channel.messages.delete(data.id);
        if (channel.lastMessageID === data.id) {
            channel.lastMessageID = null;
        }
    }
    shard.client.emit("messageDelete", message ?? {
        channel: channel ?? { id: data.channel_id },
        channelID: data.channel_id,
        guild: data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined,
        guildID: data.guild_id, id: data.id,
    });
}
exports.MESSAGE_DELETE = MESSAGE_DELETE;
async function MESSAGE_DELETE_BULK(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const guild = data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined;
    shard.client.emit("messageDeleteBulk", data.ids.map((id) => {
        const message = channel?.messages.get(id);
        channel?.messages.delete(id);
        return message ?? {
            channel: channel ?? { id: data.channel_id },
            channelID: data.channel_id,
            guild,
            guildID: data.guild_id,
            id,
        };
    }));
}
exports.MESSAGE_DELETE_BULK = MESSAGE_DELETE_BULK;
async function MESSAGE_POLL_VOTE_ADD(data, shard) {
    const user = shard.client.users.get(data.user_id) ?? { id: data.user_id };
    const channel = shard.client.getChannel(data.channel_id) ?? { id: data.channel_id };
    const guild = data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined;
    const message = (channel instanceof Channel_1.default ? channel.messages.get(data.message_id) : undefined) ?? { channel, channelID: channel.id, guild, guildID: guild?.id, id: data.message_id };
    let answer = { answerID: data.answer_id };
    if (message instanceof Message_1.default && message.poll !== undefined) {
        const pollAnswer = message.poll.answers.find(a => a.answerID === data.answer_id);
        if (pollAnswer) {
            answer = pollAnswer;
        }
        shard.client.util.updatePollAnswer(message.poll, data.answer_id, 1, data.user_id);
    }
    shard.client.emit("messagePollVoteAdd", message, user, answer);
}
exports.MESSAGE_POLL_VOTE_ADD = MESSAGE_POLL_VOTE_ADD;
async function MESSAGE_POLL_VOTE_REMOVE(data, shard) {
    const user = shard.client.users.get(data.user_id) ?? { id: data.user_id };
    const channel = shard.client.getChannel(data.channel_id) ?? { id: data.channel_id };
    const guild = data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined;
    const message = (channel instanceof Channel_1.default ? channel.messages.get(data.message_id) : undefined) ?? { channel, channelID: channel.id, guild, guildID: guild?.id, id: data.message_id };
    let answer = { answerID: data.answer_id };
    if (message instanceof Message_1.default && message.poll !== undefined) {
        const pollAnswer = message.poll.answers.find(a => a.answerID === data.answer_id);
        if (pollAnswer) {
            answer = pollAnswer;
        }
        shard.client.util.updatePollAnswer(message.poll, data.answer_id, -1, data.user_id);
    }
    shard.client.emit("messagePollVoteRemove", message, user, answer);
}
exports.MESSAGE_POLL_VOTE_REMOVE = MESSAGE_POLL_VOTE_REMOVE;
async function MESSAGE_REACTION_ADD(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const guild = data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined;
    const message = channel?.messages.get(data.message_id);
    const reactor = data.member
        ? (data.guild_id ? shard.client.util.updateMember(data.guild_id, data.user_id, data.member) : shard.client.users.get(data.user_id) ?? { id: data.user_id })
        : shard.client.users.get(data.user_id) ?? { id: data.user_id };
    if (message) {
        const index = message.reactions.findIndex(r => r.emoji.id === data.emoji.id && r.emoji.name === data.emoji.name);
        if (index === -1) {
            message.reactions.push({
                burstColors: data.burst_colors,
                count: 1,
                countDetails: {
                    burst: data.burst ? 1 : 0,
                    normal: data.burst ? 0 : 1,
                },
                emoji: data.emoji,
                me: data.user_id === shard.client.user.id,
                meBurst: data.user_id === shard.client.user.id && data.burst,
            });
        }
        else {
            if (data.burst) {
                message.reactions[index].countDetails.burst++;
            }
            else {
                message.reactions[index].countDetails.normal++;
            }
            message.reactions[index].count++;
            if (data.user_id === shard.client.user.id) {
                message.reactions[index].me = true;
            }
        }
    }
    shard.client.emit("messageReactionAdd", message ?? {
        channel: channel ?? { id: data.channel_id },
        channelID: data.channel_id,
        guild,
        guildID: data.guild_id,
        id: data.message_id,
        author: data.message_author_id === undefined ? undefined : shard.client.users.get(data.message_author_id) ?? { id: data.message_author_id },
        member: data.message_author_id === undefined ? undefined : guild?.members.get(data.message_author_id) ?? { id: data.message_author_id },
    }, reactor, {
        burst: data.burst,
        burstColors: data.burst_colors,
        emoji: data.emoji,
        type: data.type,
    });
}
exports.MESSAGE_REACTION_ADD = MESSAGE_REACTION_ADD;
async function MESSAGE_REACTION_REMOVE(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const message = channel?.messages.get(data.message_id);
    const reactor = shard.client.users.get(data.user_id) ?? { id: data.user_id };
    if (message) {
        const index = message.reactions.findIndex(r => r.emoji.id === data.emoji.id && r.emoji.name === data.emoji.name);
        if (index !== -1) {
            if (data.burst) {
                message.reactions[index].countDetails.burst--;
            }
            else {
                message.reactions[index].countDetails.normal--;
            }
            message.reactions[index].count--;
            if (data.user_id === shard.client.user.id) {
                if (data.burst) {
                    message.reactions[index].meBurst = false;
                }
                else {
                    message.reactions[index].me = false;
                }
            }
            if (message.reactions[index].count === 0) {
                message.reactions.splice(index, 1);
            }
        }
    }
    shard.client.emit("messageReactionRemove", message ?? {
        channel: channel ?? { id: data.channel_id },
        channelID: data.channel_id,
        guild: data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined,
        guildID: data.guild_id,
        id: data.message_id,
    }, reactor, {
        burst: data.burst,
        burstColors: data.burst_colors,
        emoji: data.emoji,
        type: data.type,
    });
}
exports.MESSAGE_REACTION_REMOVE = MESSAGE_REACTION_REMOVE;
async function MESSAGE_REACTION_REMOVE_ALL(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const message = channel?.messages.get(data.message_id);
    if (message) {
        message.reactions = [];
    }
    shard.client.emit("messageReactionRemoveAll", message ?? {
        channel: channel ?? { id: data.channel_id },
        channelID: data.channel_id,
        guild: data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined,
        guildID: data.guild_id,
        id: data.message_id,
    });
}
exports.MESSAGE_REACTION_REMOVE_ALL = MESSAGE_REACTION_REMOVE_ALL;
async function MESSAGE_REACTION_REMOVE_EMOJI(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const message = channel?.messages.get(data.message_id);
    if (message) {
        const index = message.reactions.findIndex(r => r.emoji.id === data.emoji.id && r.emoji.name === data.emoji.name);
        if (index !== -1) {
            message.reactions.splice(index, 1);
        }
    }
    shard.client.emit("messageReactionRemoveEmoji", message ?? {
        channel: channel ?? { id: data.channel_id },
        channelID: data.channel_id,
        guild: data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined,
        guildID: data.guild_id,
        id: data.message_id,
    }, data.emoji);
}
exports.MESSAGE_REACTION_REMOVE_EMOJI = MESSAGE_REACTION_REMOVE_EMOJI;
async function MESSAGE_UPDATE(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const oldMessage = channel?.messages.get(data.id)?.toJSON() ?? null;
    if (!oldMessage && !data.author) {
        shard.client.emit("debug", `Got partial MESSAGE_UPDATE for uncached message ${data.id} for channel ${data.channel_id}, discarding..`);
        return;
    }
    const message = channel?.messages.update(data) ?? new Message_1.default(data, shard.client);
    shard.client.emit("messageUpdate", message, oldMessage);
}
exports.MESSAGE_UPDATE = MESSAGE_UPDATE;
async function PRESENCE_UPDATE(data, shard) {
    const user = shard.client.users.get(data.user.id);
    if (user) {
        const oldUser = user.toJSON();
        user["update"](data.user);
        if (!(0, node_util_1.isDeepStrictEqual)(oldUser, user.toJSON())) {
            shard.client.emit("userUpdate", user, oldUser);
        }
    }
    const guild = shard.client.guilds.get(data.guild_id);
    const member = guild?.members.get(data.user.id);
    const presence = {
        clientStatus: data.client_status,
        guildID: data.guild_id,
        status: data.status,
        activities: data.activities?.map(activity => ({
            createdAt: activity.created_at,
            name: activity.name,
            type: activity.type,
            applicationID: activity.application_id,
            assets: activity.assets ? {
                largeImage: activity.assets.large_image,
                largeText: activity.assets.large_text,
                smallImage: activity.assets.small_image,
                smallText: activity.assets.small_text,
            } : undefined,
            buttons: activity.buttons,
            details: activity.details,
            detailsURL: activity.details_url,
            emoji: activity.emoji,
            flags: activity.flags,
            instance: activity.instance,
            party: activity.party,
            secrets: activity.secrets,
            state: activity.state,
            stateURL: activity.state_url,
            statusDisplayType: activity.status_display_type,
            timestamps: activity.timestamps,
            url: activity.url,
        })),
    };
    const userID = data.user.id;
    delete data.user;
    shard.client.emit("presenceUpdate", guild ?? { id: data.guild_id }, member ?? { id: userID }, presence, null);
}
exports.PRESENCE_UPDATE = PRESENCE_UPDATE;
async function READY(data, shard) {
    shard["_ready"](data);
}
exports.READY = READY;
async function RESUMED(data, shard) {
    shard["_resume"]();
}
exports.RESUMED = RESUMED;
async function RATE_LIMITED(data, shard) {
    shard.client.emit("rateLimited", data, shard);
}
exports.RATE_LIMITED = RATE_LIMITED;
async function SOUNDBOARD_SOUNDS(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const soundboardSounds = data.soundboard_sounds.map(soundboardSound => guild?.soundboardSounds.update(soundboardSound) ?? new Soundboard_1.default(soundboardSound, shard.client));
    for (const nonce in shard["_requestSoundboardSoundsPromise"]) {
        if (data.guild_id === shard["_requestSoundboardSoundsPromise"][nonce].guildID) {
            shard["_requestSoundboardSoundsPromise"][nonce].soundboardSounds.push(...soundboardSounds);
            clearTimeout(shard["_requestSoundboardSoundsPromise"][nonce].timeout);
            shard["_requestSoundboardSoundsPromise"][nonce].resolve(shard["_requestSoundboardSoundsPromise"][nonce].soundboardSounds);
            delete shard["_requestSoundboardSoundsPromise"][nonce];
        }
    }
    shard.client.emit("soundboardSounds", guild ?? { id: data.guild_id }, soundboardSounds, shard);
    shard.lastHeartbeatAck = true;
}
exports.SOUNDBOARD_SOUNDS = SOUNDBOARD_SOUNDS;
async function SUBSCRIPTION_CREATE(data, shard) {
    const subscription = shard.client.util.updateSubscription(data);
    shard.client.emit("subscriptionCreate", subscription);
}
exports.SUBSCRIPTION_CREATE = SUBSCRIPTION_CREATE;
async function SUBSCRIPTION_DELETE(data, shard) {
    const subscription = shard.client.util.updateSubscription(data);
    shard.client["_application"]?.subscriptions.delete(data.id);
    shard.client.emit("subscriptionDelete", subscription);
}
exports.SUBSCRIPTION_DELETE = SUBSCRIPTION_DELETE;
async function SUBSCRIPTION_UPDATE(data, shard) {
    const oldSubscription = shard.client["_application"]?.subscriptions.get(data.id)?.toJSON() ?? null;
    const subscription = shard.client.util.updateSubscription(data);
    shard.client.emit("subscriptionUpdate", subscription, oldSubscription);
}
exports.SUBSCRIPTION_UPDATE = SUBSCRIPTION_UPDATE;
async function STAGE_INSTANCE_CREATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const stateInstance = guild?.stageInstances.update(data) ?? new StageInstance_1.default(data, shard.client);
    shard.client.emit("stageInstanceCreate", stateInstance);
}
exports.STAGE_INSTANCE_CREATE = STAGE_INSTANCE_CREATE;
async function STAGE_INSTANCE_DELETE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const stateInstance = guild?.stageInstances.update(data) ?? new StageInstance_1.default(data, shard.client);
    guild?.stageInstances.delete(data.id);
    shard.client.emit("stageInstanceDelete", stateInstance);
}
exports.STAGE_INSTANCE_DELETE = STAGE_INSTANCE_DELETE;
async function STAGE_INSTANCE_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldStageInstance = guild?.stageInstances.get(data.id)?.toJSON() ?? null;
    const stateInstance = guild?.stageInstances.update(data) ?? new StageInstance_1.default(data, shard.client);
    shard.client.emit("stageInstanceUpdate", stateInstance, oldStageInstance);
}
exports.STAGE_INSTANCE_UPDATE = STAGE_INSTANCE_UPDATE;
async function THREAD_CREATE(data, shard) {
    const thread = shard.client.util.updateThread(data);
    const channel = shard.client.getChannel(data.parent_id);
    if (channel?.type === Constants_1.ChannelTypes.GUILD_FORUM) {
        channel.lastThreadID = thread.id;
    }
    shard.client.emit("threadCreate", thread);
}
exports.THREAD_CREATE = THREAD_CREATE;
async function THREAD_DELETE(data, shard) {
    const channel = shard.client.getChannel(data.parent_id);
    const thread = shard.client.getChannel(data.id) ?? {
        id: data.id,
        guild: shard.client.guilds.get(data.guild_id),
        guildID: data.guild_id,
        parent: channel ?? { id: data.parent_id },
        parentID: data.parent_id,
        type: data.type,
    };
    if (channel?.type === Constants_1.ChannelTypes.GUILD_FORUM && channel.lastThreadID === data.id) {
        channel.lastThreadID = null;
    }
    shard.client.guilds.get(data.guild_id)?.threads.delete(data.id);
    shard.client.emit("threadDelete", thread);
}
exports.THREAD_DELETE = THREAD_DELETE;
async function THREAD_LIST_SYNC(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    if (!guild) {
        shard.client.emit("debug", `Missing guild in THREAD_LIST_SYNC: ${data.guild_id}`);
        return;
    }
    for (const threadData of data.threads) {
        shard.client.util.updateThread(threadData);
    }
    for (const member of data.members) {
        const thread = shard.client.getChannel(member.id);
        if (thread) {
            const threadMember = {
                id: member.id,
                flags: member.flags,
                joinTimestamp: new Date(member.join_timestamp),
                userID: member.user_id,
            };
            const index = thread.members.findIndex(m => m.userID === member.user_id);
            if (index === -1) {
                thread.members.push(threadMember);
            }
            else {
                thread.members[index] = threadMember;
            }
        }
    }
}
exports.THREAD_LIST_SYNC = THREAD_LIST_SYNC;
async function THREAD_MEMBER_UPDATE(data, shard) {
    const thread = shard.client.getChannel(data.id);
    const guild = shard.client.guilds.get(data.guild_id);
    const threadMember = {
        id: data.id,
        flags: data.flags,
        joinTimestamp: new Date(data.join_timestamp),
        userID: data.user_id,
    };
    let oldThreadMember = null;
    if (thread) {
        const index = thread.members.findIndex(m => m.userID === data.user_id);
        if (index === -1) {
            thread.members.push(threadMember);
        }
        else {
            oldThreadMember = { ...thread.members[index] };
            thread.members[index] = threadMember;
        }
    }
    shard.client.emit("threadMemberUpdate", thread ?? {
        id: data.id,
        guild,
        guildID: data.guild_id,
    }, threadMember, oldThreadMember);
}
exports.THREAD_MEMBER_UPDATE = THREAD_MEMBER_UPDATE;
async function THREAD_MEMBERS_UPDATE(data, shard) {
    const thread = shard.client.getChannel(data.id);
    const guild = shard.client.guilds.get(data.guild_id);
    const addedMembers = (data.added_members ?? []).map(rawMember => ({
        flags: rawMember.flags,
        id: rawMember.id,
        joinTimestamp: new Date(rawMember.join_timestamp),
        userID: rawMember.user_id,
    }));
    const removedMembers = (data.removed_member_ids ?? []).map(id => ({ userID: id, id: data.id }));
    if (thread) {
        thread.memberCount = data.member_count;
        for (const rawMember of addedMembers) {
            const index = thread.members.findIndex(m => m.userID === rawMember.id);
            if (index === -1) {
                thread.members.push(rawMember);
            }
            else {
                thread.members[index] = rawMember;
            }
        }
        for (const [index, { userID }] of removedMembers.entries()) {
            const memberIndex = thread.members.findIndex(m => m.userID === userID);
            if (memberIndex !== -1) {
                removedMembers[index] = thread.members[memberIndex];
                thread.members.splice(memberIndex, 1);
            }
        }
    }
    shard.client.emit("threadMembersUpdate", thread ?? {
        id: data.id,
        guild,
        guildID: data.guild_id,
    }, addedMembers, removedMembers);
}
exports.THREAD_MEMBERS_UPDATE = THREAD_MEMBERS_UPDATE;
async function THREAD_UPDATE(data, shard) {
    const oldThread = shard.client.getChannel(data.id)?.toJSON() ?? null;
    const thread = shard.client.util.updateThread(data);
    shard.client.emit("threadUpdate", thread, oldThread);
}
exports.THREAD_UPDATE = THREAD_UPDATE;
async function TYPING_START(data, shard) {
    const channel = shard.client.getChannel(data.channel_id) ?? { id: data.channel_id };
    const startTimestamp = new Date(data.timestamp);
    if (data.member) {
        const member = shard.client.util.updateMember(data.guild_id, data.user_id, data.member);
        shard.client.emit("typingStart", channel, member, startTimestamp);
        return;
    }
    const user = shard.client.users.get(data.user_id);
    shard.client.emit("typingStart", channel, user ?? { id: data.user_id }, startTimestamp);
}
exports.TYPING_START = TYPING_START;
async function USER_UPDATE(data, shard) {
    const oldUser = shard.client.users.get(data.id)?.toJSON() ?? null;
    shard.client.emit("userUpdate", shard.client.users.update(data), oldUser);
}
exports.USER_UPDATE = USER_UPDATE;
async function VOICE_CHANNEL_EFFECT_SEND(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const guild = shard.client.guilds.get(data.guild_id);
    const user = guild?.members.get(data.user_id) ?? shard.client.users.get(data.user_id);
    shard.client.emit("voiceChannelEffectSend", channel ?? { id: data.channel_id, guild: guild ?? { id: data.guild_id } }, user ?? { id: data.user_id }, {
        animationID: data.animation_id,
        animationType: data.animation_type,
        soundID: data.sound_id,
        soundVolume: data.sound_volume,
    });
}
exports.VOICE_CHANNEL_EFFECT_SEND = VOICE_CHANNEL_EFFECT_SEND;
async function VOICE_STATE_UPDATE(data, shard) {
    if (data.guild_id && data.session_id && data.user_id === shard.client.user.id) {
        shard.client.voiceAdapters.get(data.guild_id)?.onVoiceStateUpdate(data);
    }
    // @TODO voice states without guilds?
    if (!data.guild_id || !data.member) {
        return;
    }
    data.self_stream = !!data.self_stream;
    const guild = shard.client.guilds.get(data.guild_id);
    const member = shard.client.util.updateMember(data.guild_id, data.user_id, data.member);
    const oldState = guild?.voiceStates.get(member.id)?.toJSON() ?? null;
    const state = guild?.voiceStates.update({ ...data, id: member.id }) ?? new VoiceState_1.default(data, shard.client);
    if (oldState?.channelID !== state.channelID) {
        const oldChannel = oldState?.channelID ? shard.client.getChannel(oldState.channelID) ?? { id: oldState.channelID } : null;
        const newChannel = state.channel === null ? null : state.channel ?? { id: state.channelID };
        if (newChannel instanceof Channel_1.default) {
            newChannel.voiceMembers.add(member);
        }
        if (oldChannel instanceof Channel_1.default) {
            oldChannel.voiceMembers.delete(member.id);
        }
        if (oldChannel && newChannel) {
            shard.client.emit("voiceChannelSwitch", member, newChannel, oldChannel);
        }
        else if (newChannel) {
            shard.client.emit("voiceChannelJoin", member, newChannel);
        }
        else if (state.channelID === null) {
            shard.client.emit("voiceChannelLeave", member, oldChannel);
        }
    }
    if (!(0, node_util_1.isDeepStrictEqual)(oldState, state.toJSON())) {
        shard.client.emit("voiceStateUpdate", member, oldState);
    }
    // remove after emitting so listeners still get the old state
    if (state.channelID === null) {
        guild?.voiceStates.delete(member.id);
    }
}
exports.VOICE_STATE_UPDATE = VOICE_STATE_UPDATE;
async function VOICE_CHANNEL_START_TIME_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const channel = shard.client.getChannel(data.id);
    if (channel)
        channel["update"]({ voice_start_time: data.voice_start_time });
    shard.client.emit("voiceChannelStartTimeUpdate", guild ?? { id: data.guild_id }, channel ?? { id: data.id }, data.voice_start_time ?? null);
}
exports.VOICE_CHANNEL_START_TIME_UPDATE = VOICE_CHANNEL_START_TIME_UPDATE;
async function VOICE_CHANNEL_STATUS_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const channel = shard.client.getChannel(data.id);
    if (channel)
        channel["update"]({ status: data.status });
    shard.client.emit("voiceChannelStatusUpdate", guild ?? { id: data.guild_id }, channel ?? { id: data.id }, data.status);
}
exports.VOICE_CHANNEL_STATUS_UPDATE = VOICE_CHANNEL_STATUS_UPDATE;
async function VOICE_SERVER_UPDATE(data, shard) {
    shard.client.voiceAdapters.get(data.guild_id)?.onVoiceServerUpdate(data);
    shard.client.emit("voiceServerUpdate", shard.client.guilds.get(data.guild_id) ?? { id: data.guild_id }, data.endpoint, data.token);
}
exports.VOICE_SERVER_UPDATE = VOICE_SERVER_UPDATE;
async function WEBHOOKS_UPDATE(data, shard) {
    shard.client.emit("webhooksUpdate", shard.client.guilds.get(data.guild_id) ?? { id: data.guild_id }, shard.client.getChannel(data.channel_id) ?? { id: data.channel_id });
}
exports.WEBHOOKS_UPDATE = WEBHOOKS_UPDATE;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2dhdGV3YXkvZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUNBQThDO0FBRTlDLDRDQUE0QztBQUM1Qyx3RkFBd0Q7QUFDeEQsa0dBQWtFO0FBQ2xFLDRFQUE0QztBQUM1Qyx3RUFBd0M7QUFDeEMsb0dBQW9FO0FBQ3BFLG9GQUFvRDtBQUNwRCxvRkFBb0Q7QUFDcEQsMEVBQTBDO0FBQzFDLDBFQUEwQztBQUMxQyw0RUFBNEM7QUFDNUMsc0VBQXNDO0FBQ3RDLGtGQUFrRDtBQUNsRCxzRkFBc0Q7QUFDdEQsd0ZBQXdEO0FBQ3hELHNGQUFzRDtBQUN0RCxrRkFBa0Q7QUFTM0MsS0FBSyxVQUFVLHNDQUFzQyxDQUFDLElBQWdFLEVBQUUsS0FBWTtJQUN2SSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUN0SCxXQUFXLEVBQUUsSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQ3ZHLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYztRQUNsQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7UUFDWCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7S0FDaEMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVBELHdGQU9DO0FBRU0sS0FBSyxVQUFVLGdDQUFnQyxDQUFDLElBQTBELEVBQUUsS0FBWTtJQUMzSCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0s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