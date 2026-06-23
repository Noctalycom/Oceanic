"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_REACTION_REMOVE = exports.MESSAGE_REACTION_ADD = exports.MESSAGE_POLL_VOTE_REMOVE = exports.MESSAGE_POLL_VOTE_ADD = exports.MESSAGE_DELETE_BULK = exports.MESSAGE_DELETE = exports.MESSAGE_CREATE = exports.INVITE_DELETE = exports.INVITE_CREATE = exports.INTERACTION_CREATE = exports.INTEGRATION_UPDATE = exports.INTEGRATION_DELETE = exports.INTEGRATION_CREATE = exports.GUILD_UPDATE = exports.GUILD_STICKERS_UPDATE = exports.GUILD_SOUNDBOARD_SOUNDS_UPDATE = exports.GUILD_SOUNDBOARD_SOUND_UPDATE = exports.GUILD_SOUNDBOARD_SOUND_DELETE = exports.GUILD_SOUNDBOARD_SOUND_CREATE = exports.GUILD_SCHEDULED_EVENT_USER_REMOVE = exports.GUILD_SCHEDULED_EVENT_USER_ADD = exports.GUILD_SCHEDULED_EVENT_UPDATE = exports.GUILD_SCHEDULED_EVENT_DELETE = exports.GUILD_SCHEDULED_EVENT_CREATE = exports.GUILD_ROLE_UPDATE = exports.GUILD_ROLE_DELETE = exports.GUILD_ROLE_CREATE = exports.GUILD_MEMBER_UPDATE = exports.GUILD_MEMBER_REMOVE = exports.GUILD_MEMBERS_CHUNK = exports.GUILD_MEMBER_ADD = exports.GUILD_INTEGRATIONS_UPDATE = exports.GUILD_EMOJIS_UPDATE = exports.GUILD_DELETE = exports.GUILD_CREATE = exports.GUILD_BAN_REMOVE = exports.GUILD_BAN_ADD = exports.GUILD_AUDIT_LOG_ENTRY_CREATE = exports.ENTITLEMENT_UPDATE = exports.ENTITLEMENT_DELETE = exports.ENTITLEMENT_CREATE = exports.CHANNEL_UPDATE = exports.CHANNEL_PINS_UPDATE = exports.CHANNEL_DELETE = exports.CHANNEL_CREATE = exports.AUTO_MODERATION_RULE_UPDATE = exports.AUTO_MODERATION_RULE_DELETE = exports.AUTO_MODERATION_RULE_CREATE = exports.AUTO_MODERATION_ACTION_EXECUTION = exports.APPLICATION_COMMAND_PERMISSIONS_UPDATE = void 0;
exports.WEBHOOKS_UPDATE = exports.VOICE_SERVER_UPDATE = exports.VOICE_CHANNEL_STATUS_UPDATE = exports.VOICE_STATE_UPDATE = exports.VOICE_CHANNEL_EFFECT_SEND = exports.USER_UPDATE = exports.TYPING_START = exports.THREAD_UPDATE = exports.THREAD_MEMBERS_UPDATE = exports.THREAD_MEMBER_UPDATE = exports.THREAD_LIST_SYNC = exports.THREAD_DELETE = exports.THREAD_CREATE = exports.STAGE_INSTANCE_UPDATE = exports.STAGE_INSTANCE_DELETE = exports.STAGE_INSTANCE_CREATE = exports.SOUNDBOARD_SOUNDS = exports.RESUMED = exports.READY = exports.PRESENCE_UPDATE = exports.MESSAGE_UPDATE = exports.MESSAGE_REACTION_REMOVE_EMOJI = exports.MESSAGE_REACTION_REMOVE_ALL = void 0;
const tslib_1 = require("tslib");
const Constants_1 = require("../Constants");
const Member_1 = tslib_1.__importDefault(require("../structures/Member"));
const AutoModerationRule_1 = tslib_1.__importDefault(require("../structures/AutoModerationRule"));
const Channel_1 = tslib_1.__importDefault(require("../structures/Channel"));
const VoiceChannel_1 = tslib_1.__importDefault(require("../structures/VoiceChannel"));
const StageChannel_1 = tslib_1.__importDefault(require("../structures/StageChannel"));
const GuildScheduledEvent_1 = tslib_1.__importDefault(require("../structures/GuildScheduledEvent"));
const Invite_1 = tslib_1.__importDefault(require("../structures/Invite"));
const Message_1 = tslib_1.__importDefault(require("../structures/Message"));
const StageInstance_1 = tslib_1.__importDefault(require("../structures/StageInstance"));
const Interaction_1 = tslib_1.__importDefault(require("../structures/Interaction"));
const Guild_1 = tslib_1.__importDefault(require("../structures/Guild"));
const Role_1 = tslib_1.__importDefault(require("../structures/Role"));
const Integration_1 = tslib_1.__importDefault(require("../structures/Integration"));
const VoiceState_1 = tslib_1.__importDefault(require("../structures/VoiceState"));
const AuditLogEntry_1 = tslib_1.__importDefault(require("../structures/AuditLogEntry"));
const Soundboard_1 = tslib_1.__importDefault(require("../structures/Soundboard"));
const node_util_1 = require("node:util");
async function APPLICATION_COMMAND_PERMISSIONS_UPDATE(data, shard) {
    shard.client.emit("applicationCommandPermissionsUpdate", shard.client.guilds.get(data.guild_id) ?? { id: data.guild_id }, {
        application: data.application_id === shard.client.application.id ? shard.client.application : undefined,
        applicationID: data.application_id,
        id: data.id,
        permissions: data.permissions
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
                durationSeconds: data.action.metadata.duration_seconds
            },
            type: data.action.type
        },
        alertSystemMessageID: data.alert_system_message_id,
        content: data.content,
        matchedContent: data.matched_content,
        matchedKeyword: data.matched_keyword,
        messageID: data.message_id,
        rule: guild?.autoModerationRules.get(data.rule_id),
        ruleID: data.rule_id,
        ruleTriggerType: data.rule_trigger_type
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
            type: data.type
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
        shard.client.emit("unavailableGuildCreate", shard.client.unavailableGuilds.update(data));
    }
    else {
        const guild = shard["createGuild"](data);
        if (shard.ready) {
            if (shard.client.unavailableGuilds.delete(guild.id)) {
                shard.client.emit("guildAvailable", guild);
            }
            else {
                shard.client.emit("guildCreate", guild);
            }
        }
        else {
            if (shard.client.unavailableGuilds.delete(guild.id)) {
                void shard["restartGuildCreateTimeout"]();
            }
            else {
                shard.client.emit("guildCreate", guild);
            }
        }
    }
}
exports.GUILD_CREATE = GUILD_CREATE;
async function GUILD_DELETE(data, shard) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    shard.client.voiceAdapters.get(data.id)?.destroy();
    shard.client.guildShardMap.delete(data.id);
    const guild = shard.client.guilds.get(data.id);
    guild?.channels.clear();
    guild?.threads.clear();
    shard.client.guilds.delete(data.id);
    if (data.unavailable) {
        shard.client.emit("guildUnavailable", shard.client.unavailableGuilds.update(data));
    }
    else {
        shard.client.emit("guildDelete", guild ?? { id: data.id });
    }
}
exports.GUILD_DELETE = GUILD_DELETE;
async function GUILD_EMOJIS_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldEmojis = guild?.emojis ? guild.emojis.toArray() : null;
    // eslint-disable-next-line @typescript-eslint/dot-notation
    guild?.["update"]({ emojis: data.emojis });
    shard.client.emit("guildEmojisUpdate", guild ?? { id: data.guild_id }, guild?.emojis?.toArray() ?? data.emojis.map(emoji => shard.client.util.convertGuildEmoji(emoji)), oldEmojis);
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
    // eslint-disable-next-line @typescript-eslint/dot-notation
    guild?.["updateMemberLimit"](data.members.length);
    const members = data.members.map(member => shard.client.util.updateMember(data.guild_id, member.user.id, member));
    if (!data.nonce) {
        shard.client.emit("warn", "Received GUILD_MEMBERS_CHUNK without a nonce.");
        return;
    }
    if (shard["_requestMembersPromise"][data.nonce]) {
        shard["_requestMembersPromise"][data.nonce].members.push(...members);
    }
    if (data.chunk_index >= data.chunk_count - 1) {
        if (shard["_requestMembersPromise"][data.nonce]) {
            clearTimeout(shard["_requestMembersPromise"][data.nonce].timeout);
            shard["_requestMembersPromise"][data.nonce].resolve(shard["_requestMembersPromise"][data.nonce].members);
            delete shard["_requestMembersPromise"][data.nonce];
        }
        if (shard["_getAllUsersCount"][data.guild_id]) {
            delete shard["_getAllUsersCount"][data.guild_id];
            void shard["checkReady"]();
        }
    }
    shard.client.emit("guildMemberChunk", members);
    shard.lastHeartbeatAck = true;
}
exports.GUILD_MEMBERS_CHUNK = GUILD_MEMBERS_CHUNK;
async function GUILD_MEMBER_REMOVE(data, shard) {
    if (data.user.id === shard.client.user.id) {
        return;
    }
    const guild = shard.client.guilds.get(data.guild_id);
    // eslint-disable-next-line @typescript-eslint/dot-notation
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
    shard.client.emit("guildScheduledEventUserAdd", event ?? { id: data.guild_scheduled_event_id }, user ?? { id: data.user_id });
}
exports.GUILD_SCHEDULED_EVENT_USER_ADD = GUILD_SCHEDULED_EVENT_USER_ADD;
async function GUILD_SCHEDULED_EVENT_USER_REMOVE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const event = guild?.scheduledEvents.get(data.guild_scheduled_event_id);
    if (event?.userCount) {
        event.userCount--;
    }
    const user = shard.client.users.get(data.user_id) ?? { id: data.user_id };
    shard.client.emit("guildScheduledEventUserRemove", event ?? { id: data.guild_scheduled_event_id }, user ?? { id: data.user_id });
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
    // eslint-disable-next-line @typescript-eslint/dot-notation
    guild?.["update"]({ stickers: data.stickers });
    shard.client.emit("guildStickersUpdate", guild ?? { id: data.guild_id }, guild?.stickers?.toArray() ?? data.stickers.map(sticker => shard.client.util.convertSticker(sticker)), oldStickers);
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
        guild
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
    const message = channel?.messages?.update(data) ?? new Message_1.default(data, shard.client);
    if (channel) {
        channel.lastMessageID = message.id;
    }
    shard.client.emit("messageCreate", message);
}
exports.MESSAGE_CREATE = MESSAGE_CREATE;
async function MESSAGE_DELETE(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const message = channel?.messages?.get(data.id);
    if (channel) {
        channel.messages?.delete(data.id);
        if (channel.lastMessageID === data.id) {
            channel.lastMessageID = null;
        }
    }
    shard.client.emit("messageDelete", message ?? {
        channel: channel ?? { id: data.channel_id },
        channelID: data.channel_id,
        guild: data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined,
        guildID: data.guild_id, id: data.id
    });
}
exports.MESSAGE_DELETE = MESSAGE_DELETE;
async function MESSAGE_DELETE_BULK(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const guild = data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined;
    shard.client.emit("messageDeleteBulk", data.ids.map(id => {
        const message = channel?.messages?.get(id);
        channel?.messages?.delete(id);
        return message ?? {
            channel: channel ?? { id: data.channel_id },
            channelID: data.channel_id,
            guild,
            guildID: data.guild_id,
            id
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
    const message = channel?.messages?.get(data.message_id);
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
                    normal: data.burst ? 0 : 1
                },
                emoji: data.emoji,
                me: data.user_id === shard.client.user.id,
                meBurst: data.user_id === shard.client.user.id && data.burst
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
        member: data.message_author_id === undefined ? undefined : guild?.members.get(data.message_author_id) ?? { id: data.message_author_id }
    }, reactor, {
        burst: data.burst,
        burstColors: data.burst_colors,
        emoji: data.emoji,
        type: data.type
    });
}
exports.MESSAGE_REACTION_ADD = MESSAGE_REACTION_ADD;
async function MESSAGE_REACTION_REMOVE(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const message = channel?.messages?.get(data.message_id);
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
        id: data.message_id
    }, reactor, {
        burst: data.burst,
        burstColors: data.burst_colors,
        emoji: data.emoji,
        type: data.type
    });
}
exports.MESSAGE_REACTION_REMOVE = MESSAGE_REACTION_REMOVE;
async function MESSAGE_REACTION_REMOVE_ALL(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const message = channel?.messages?.get(data.message_id);
    if (message) {
        message.reactions = [];
    }
    shard.client.emit("messageReactionRemoveAll", message ?? {
        channel: channel ?? { id: data.channel_id },
        channelID: data.channel_id,
        guild: data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined,
        guildID: data.guild_id,
        id: data.message_id
    });
}
exports.MESSAGE_REACTION_REMOVE_ALL = MESSAGE_REACTION_REMOVE_ALL;
async function MESSAGE_REACTION_REMOVE_EMOJI(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const message = channel?.messages?.get(data.message_id);
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
        id: data.message_id
    }, data.emoji);
}
exports.MESSAGE_REACTION_REMOVE_EMOJI = MESSAGE_REACTION_REMOVE_EMOJI;
async function MESSAGE_UPDATE(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const oldMessage = channel?.messages?.get(data.id)?.toJSON() ?? null;
    if (!oldMessage && !data.author) {
        shard.client.emit("debug", `Got partial MESSAGE_UPDATE for uncached message ${data.id} for channel ${data.channel_id}, discarding..`);
        return;
    }
    const message = channel?.messages?.update(data) ?? new Message_1.default(data, shard.client);
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
                smallText: activity.assets.small_text
            } : undefined,
            buttons: activity.buttons,
            details: activity.details,
            emoji: activity.emoji,
            flags: activity.flags,
            instance: activity.instance,
            party: activity.party,
            secrets: activity.secrets,
            state: activity.state,
            timestamps: activity.timestamps,
            url: activity.url
        }))
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
    shard.client.emit("soundboardSounds", data.guild_id, soundboardSounds);
    shard.lastHeartbeatAck = true;
}
exports.SOUNDBOARD_SOUNDS = SOUNDBOARD_SOUNDS;
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
    if (channel && channel.type === Constants_1.ChannelTypes.GUILD_FORUM) {
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
        parent: channel || { id: data.parent_id },
        parentID: data.parent_id,
        type: data.type
    };
    if (channel && channel.type === Constants_1.ChannelTypes.GUILD_FORUM && channel.lastThreadID === data.id) {
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
                userID: member.user_id
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
        userID: data.user_id
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
        guildID: data.guild_id
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
        userID: rawMember.user_id
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
        guildID: data.guild_id
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
        animationType: data.animation_type
    });
}
exports.VOICE_CHANNEL_EFFECT_SEND = VOICE_CHANNEL_EFFECT_SEND;
async function VOICE_STATE_UPDATE(data, shard) {
    if (data.guild_id && data.session_id && data.user_id === shard.client.user.id) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
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
}
exports.VOICE_STATE_UPDATE = VOICE_STATE_UPDATE;
async function VOICE_CHANNEL_STATUS_UPDATE(data, shard) {
    shard.client.emit("voiceChannelStatusUpdate", shard.client.getChannel(data.id) ?? { id: data.id }, data.status);
}
exports.VOICE_CHANNEL_STATUS_UPDATE = VOICE_CHANNEL_STATUS_UPDATE;
async function VOICE_SERVER_UPDATE(data, shard) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    shard.client.voiceAdapters.get(data.guild_id)?.onVoiceServerUpdate(data);
}
exports.VOICE_SERVER_UPDATE = VOICE_SERVER_UPDATE;
async function WEBHOOKS_UPDATE(data, shard) {
    shard.client.emit("webhooksUpdate", shard.client.guilds.get(data.guild_id) ?? { id: data.guild_id }, shard.client.getChannel(data.channel_id) ?? { id: data.channel_id });
}
exports.WEBHOOKS_UPDATE = WEBHOOKS_UPDATE;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2dhdGV3YXkvZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsNENBQTRDO0FBQzVDLDBFQUEwQztBQUMxQyxrR0FBa0U7QUFDbEUsNEVBQTRDO0FBQzVDLHNGQUFzRDtBQUN0RCxzRkFBc0Q7QUFDdEQsb0dBQW9FO0FBQ3BFLDBFQUEwQztBQUMxQyw0RUFBNEM7QUFDNUMsd0ZBQXdEO0FBRXhELG9GQUFvRDtBQUNwRCx3RUFBd0M7QUFDeEMsc0VBQXNDO0FBQ3RDLG9GQUFvRDtBQUNwRCxrRkFBa0Q7QUFDbEQsd0ZBQXdEO0FBRXhELGtGQUFrRDtBQUNsRCx5Q0FBOEM7QUFFdkMsS0FBSyxVQUFVLHNDQUFzQyxDQUFDLElBQWdFLEVBQUUsS0FBWTtJQUN2SSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUN0SCxXQUFXLEVBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQ3pHLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYztRQUNsQyxFQUFFLEVBQWEsSUFBSSxDQUFDLEVBQUU7UUFDdEIsV0FBVyxFQUFJLElBQUksQ0FBQyxXQUFXO0tBQ2xDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFQRCx3RkFPQztBQUVNLEtBQUssVUFBVSxnQ0FBZ0MsQ0FBQyxJQUEwRCxFQUFFLEtBQVk7SUFDM0gsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFN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