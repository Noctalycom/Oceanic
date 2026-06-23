"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Guild */
const Role_1 = tslib_1.__importDefault(require("./Role"));
const Base_1 = tslib_1.__importDefault(require("./Base"));
const GuildChannel_1 = tslib_1.__importDefault(require("./GuildChannel"));
const Member_1 = tslib_1.__importDefault(require("./Member"));
const GuildScheduledEvent_1 = tslib_1.__importDefault(require("./GuildScheduledEvent"));
const ThreadChannel_1 = tslib_1.__importDefault(require("./ThreadChannel"));
const Integration_1 = tslib_1.__importDefault(require("./Integration"));
const AutoModerationRule_1 = tslib_1.__importDefault(require("./AutoModerationRule"));
const Permission_1 = tslib_1.__importDefault(require("./Permission"));
const VoiceState_1 = tslib_1.__importDefault(require("./VoiceState"));
const StageInstance_1 = tslib_1.__importDefault(require("./StageInstance"));
const Channel_1 = tslib_1.__importDefault(require("./Channel"));
const Invite_1 = tslib_1.__importDefault(require("./Invite"));
const AuditLogEntry_1 = tslib_1.__importDefault(require("./AuditLogEntry"));
const Soundboard_1 = tslib_1.__importDefault(require("./Soundboard"));
const Constants_1 = require("../Constants");
const Routes = tslib_1.__importStar(require("../util/Routes"));
const TypedCollection_1 = tslib_1.__importDefault(require("../util/TypedCollection"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-line
const Errors_1 = require("../util/Errors");
const SimpleCollection_1 = tslib_1.__importDefault(require("../util/SimpleCollection"));
/** Represents a Discord server. */
class Guild extends Base_1.default {
    _clientMember;
    // if the guild was retrieved from rest
    _rest;
    _shard;
    /** This guild's afk voice channel. */
    afkChannel;
    /** The ID of this guild's afk voice channel. */
    afkChannelID;
    /** The seconds after which voice users will be moved to the afk channel. */
    afkTimeout;
    /** The application that created this guild, if applicable. */
    application;
    /** The ID of the application that created this guild, if applicable. */
    applicationID;
    /** The approximate number of members in this guild (if retrieved with counts). */
    approximateMemberCount;
    /** The approximate number of non-offline members in this guild (if retrieved with counts). */
    approximatePresenceCount;
    /** The cached audit log entries. This requires both the {@link Constants~Intents.GUILD_MODERATION | GUILD_MODERATION} intent, as well as the {@link Constants~Permissions | VIEW_AUDIT_LOG } permission. */
    auditLogEntries;
    /** The auto moderation rules in this guild. */
    autoModerationRules;
    /** The hash of this guild's banner. */
    banner;
    /** The channels in this guild. */
    channels;
    /** The default [message notifications level](https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level) of this guild. */
    defaultMessageNotifications;
    /** The description of this guild. */
    description;
    /** The discovery splash of this guild. Only present if the guild has the `DISCOVERABLE` feature. */
    discoverySplash;
    /** The custom emojis of this guild. */
    emojis;
    /** The [explicit content filter](https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level) of this guild. */
    explicitContentFilter;
    /** The [features](https://discord.com/developers/docs/resources/guild#guild-object-guild-features) this guild has. */
    features;
    /** The icon hash of this guild. */
    icon;
    incidentActions;
    /** The integrations in this guild. */
    integrations;
    /** The guild's inventory settings. */
    inventorySettings;
    /** The cached invites in this guild. This will only be populated by invites created while the client is active. */
    invites;
    /** The date at which this guild was joined. */
    joinedAt;
    /** If this guild is considered large. */
    large;
    latestOnboardingQuestionID;
    /** The maximum amount of members this guild can have. */
    maxMembers;
    /** The maximum amount of people that can be present at a time in this guild. Only present for very large guilds. */
    maxPresences;
    /** The maximum amount of users that can be present in a stage video channel. */
    maxStageVideoChannelUsers;
    /** The maximum amount of users that can be present in a video channel. */
    maxVideoChannelUsers;
    /** The number of members in this guild. */
    memberCount;
    /** The cached members in this guild. */
    members;
    /** The required [mfa level](https://discord.com/developers/docs/resources/guild#guild-object-mfa-level) for moderators of this guild. */
    mfaLevel;
    /** The name of this guild. */
    name;
    /** The [nsfw level](https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level) of this guild. */
    nsfwLevel;
    /** The owner of this guild. */
    owner;
    /** The ID of the owner of this guild. */
    ownerID;
    /** The [preferred locale](https://discord.com/developers/docs/reference#locales) of this guild. */
    preferredLocale;
    /** If this guild has the boost progress bar enabled. */
    premiumProgressBarEnabled;
    /** The number of nitro boosts this guild has. */
    premiumSubscriptionCount;
    /** The [boost level](https://discord.com/developers/docs/resources/guild#guild-object-premium-tier) of this guild. */
    premiumTier;
    /** The guild's server tag, only present for guilds recieved over the gateway. */
    profile;
    /** The channel where notices from Discord are received. Only present in guilds with the `COMMUNITY` feature. */
    publicUpdatesChannel;
    /** The id of the channel where notices from Discord are received. Only present in guilds with the `COMMUNITY` feature. */
    publicUpdatesChannelID;
    /** @deprecated The region of this guild. */
    region;
    /** The roles in this guild. */
    roles;
    /** The channel where rules/guidelines are displayed. Only present in guilds with the `COMMUNITY` feature. */
    rulesChannel;
    /** The id of the channel where rules/guidelines are displayed. Only present in guilds with the `COMMUNITY` feature. */
    rulesChannelID;
    /** The channel where safety related notices are posted. */
    safetyAlertsChannel;
    /** The ID if the channel where safety related notices are posted. */
    safetyAlertsChannelID;
    /** The scheduled events in this guild. */
    scheduledEvents;
    /** The soundboard sounds in this guild. */
    soundboardSounds;
    /** The invite splash hash of this guild. */
    splash;
    /** The stage instances in this guild. */
    stageInstances;
    /** The custom stickers of this guild. */
    stickers;
    /** The channel where welcome messages and boosts notices are posted. */
    systemChannel;
    /** The [flags](https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags) for the system channel. */
    systemChannelFlags;
    /** The ID of the channel where welcome messages and boosts notices are posted. */
    systemChannelID;
    /** The threads in this guild. */
    threads;
    /** If this guild is unavailable. */
    unavailable;
    /** The vanity url of this guild. Only present in guilds with the `VANITY_URL` feature. */
    vanityURLCode;
    /** The [verification level](https://discord.com/developers/docs/resources/guild#guild-object-verification-level) of this guild. */
    verificationLevel;
    /** The voice states of members in voice channels. */
    voiceStates;
    /** The welcome screen configuration. Only present in guilds with the `WELCOME_SCREEN_ENABLED` feature. */
    welcomeScreen;
    /** The channel the widget will generate an invite to, or `null` if set to no invite. */
    widgetChannel;
    /** The id of the channel the widget will generate an invite to, or `null` if set to no invite. */
    widgetChannelID;
    /** If the widget is enabled. */
    widgetEnabled;
    constructor(data, client, rest) {
        super(data.id, client);
        this.afkChannelID = null;
        this.afkTimeout = 0;
        this.applicationID = data.application_id;
        this.auditLogEntries = new TypedCollection_1.default(AuditLogEntry_1.default, client, client.util._getLimit("auditLogEntries", this.id));
        this.autoModerationRules = new TypedCollection_1.default(AutoModerationRule_1.default, client, client.util._getLimit("autoModerationRules", this.id));
        this.banner = null;
        this.channels = new TypedCollection_1.default(GuildChannel_1.default, client, client.util._getLimit("channels", this.id), {
            construct: (channel) => {
                client.channelGuildMap.set(channel.id, this.id);
                return Channel_1.default.from(channel, client);
            },
            delete: (id) => {
                client.channelGuildMap.delete(id);
            }
        });
        this.defaultMessageNotifications = data.default_message_notifications;
        this.description = null;
        this.discoverySplash = null;
        this.emojis = new SimpleCollection_1.default(rawEmoji => this.client.util.convertGuildEmoji(rawEmoji), client.util._getLimit("emojis", this.id), "merge");
        this.explicitContentFilter = data.explicit_content_filter;
        this.features = [];
        this.icon = null;
        this.incidentActions = null;
        this.integrations = new TypedCollection_1.default(Integration_1.default, client, client.util._getLimit("integrations", this.id));
        this.inventorySettings = null;
        this.invites = new SimpleCollection_1.default(rawInvite => Invite_1.default.withMetadata(rawInvite, client), client.util._getLimit("invites", this.id), "update", "code");
        this.joinedAt = null;
        this.large = (data.member_count ?? data.approximate_member_count ?? 0) >= client.shards.options.largeThreshold;
        this.latestOnboardingQuestionID = null;
        this.memberCount = data.member_count ?? data.approximate_member_count ?? 0;
        this.members = new TypedCollection_1.default(Member_1.default, client, client.util._getLimit("members", this.id));
        this.mfaLevel = data.mfa_level;
        this.name = data.name;
        this.nsfwLevel = data.nsfw_level;
        this.owner = data.owner_id === null ? null : client.users.get(data.owner_id);
        this.ownerID = data.owner_id;
        this.preferredLocale = data.preferred_locale;
        this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
        this.premiumTier = data.premium_tier;
        this.profile = null;
        this.publicUpdatesChannelID = null;
        this.roles = new TypedCollection_1.default(Role_1.default, client, client.util._getLimit("roles", this.id));
        this.rulesChannelID = null;
        this.safetyAlertsChannelID = null;
        this.scheduledEvents = new TypedCollection_1.default(GuildScheduledEvent_1.default, client, client.util._getLimit("scheduledEvents", this.id));
        this.soundboardSounds = new TypedCollection_1.default(Soundboard_1.default, client, client.util._getLimit("soundboardSounds", this.id));
        this.splash = null;
        this.stageInstances = new TypedCollection_1.default(StageInstance_1.default, client, client.util._getLimit("stageInstances", this.id));
        this.stickers = new SimpleCollection_1.default(rawSticker => client.util.convertSticker(rawSticker), client.util._getLimit("stickers", this.id), "merge");
        this.systemChannelID = null;
        this.systemChannelFlags = data.system_channel_flags;
        this.threads = new TypedCollection_1.default(ThreadChannel_1.default, client, client.util._getLimit("guildThreads", this.id), {
            construct: (thread) => {
                client.threadGuildMap.set(thread.id, this.id);
                return Channel_1.default.from(thread, client);
            },
            delete: (id) => {
                client.threadGuildMap.delete(id);
            }
        });
        this.unavailable = !!data.unavailable;
        this.vanityURLCode = data.vanity_url_code;
        this.verificationLevel = data.verification_level;
        this.voiceStates = new TypedCollection_1.default(VoiceState_1.default, client, client.util._getLimit("voiceStates", this.id));
        this.widgetChannelID = data.widget_channel_id === null ? null : data.widget_channel_id;
        for (const role of data.roles) {
            this.roles.update(role, data.id);
        }
        this.update(data);
        this._rest = !!rest;
        if (data.channels) {
            for (const channelData of data.channels) {
                channelData.guild_id = this.id;
                client.channelGuildMap.set(channelData.id, this.id); // @TODO this seems redundant
                this.channels.update(channelData);
            }
        }
        if (data.threads) {
            for (const threadData of data.threads) {
                threadData.guild_id = this.id;
                this.threads.update(threadData);
            }
        }
        if (data.members) {
            for (const rawMember of data.members) {
                const member = this.members.update({ ...rawMember, id: rawMember.user?.id }, this.id);
                if (this.client["_user"] && member.id === this.client.user.id) {
                    this._clientMember = member;
                }
            }
        }
        if (data.stage_instances) {
            for (const stageInstance of data.stage_instances) {
                stageInstance.guild_id = this.id;
                this.stageInstances.update(stageInstance);
            }
        }
        if (data.voice_states) {
            for (const voiceState of data.voice_states) {
                if (!this.members.has(voiceState.user_id) || !voiceState.channel_id) {
                    continue;
                }
                voiceState.guild_id = this.id;
                this.voiceStates.update({ ...voiceState, id: voiceState.user_id });
                const channel = this.channels.get(voiceState.channel_id);
                const member = this.members.update({ id: voiceState.user_id, deaf: voiceState.deaf, mute: voiceState.mute }, this.id);
                if (this._clientMember) {
                    this._clientMember["update"]({ deaf: voiceState.deaf, mute: voiceState.mute });
                }
                if (channel && "voiceMembers" in channel) {
                    channel.voiceMembers.add(member);
                }
                if (client.shards.options.seedVoiceConnections && voiceState.user_id === client.user.id && !this.client.getVoiceConnection(this.id)) {
                    this.client.joinVoiceChannel({
                        guildID: this.id,
                        channelID: voiceState.channel_id,
                        selfDeaf: voiceState.self_deaf,
                        selfMute: voiceState.self_mute,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        voiceAdapterCreator: this.voiceAdapterCreator
                    });
                }
            }
        }
    }
    toggleFeature(feature, enable, reason) {
        const newFeatures = enable ?
            (this.features.includes(feature) ? this.features : [...this.features, feature]) :
            this.features.filter(name => name !== feature);
        return this.edit({ features: newFeatures, reason });
    }
    // true = `memberCount`
    updateMemberLimit(toAdd) {
        if (this.members.limit === Infinity || this.client.options.disableMemberLimitScaling) {
            return;
        }
        const original = this.members.limit;
        const num = toAdd === true ? this.memberCount : this.members.limit + toAdd;
        const round = 10 ** (Math.floor(Math.log10(num)) - 1);
        if (toAdd === true) {
            const limit = Math.round(num / round) * round + round;
            if (this.members.limit >= limit) {
                return;
            }
            this.members.limit = limit;
        }
        else {
            const limit = Math.round((this.members.size + toAdd) / round) * round + round;
            if (this.members.limit >= limit) {
                return;
            }
            this.members.limit = limit;
        }
        this.client.emit("debug", `The limit of the members collection of guild ${this.id} has been updated from ${original} to ${this.members.limit} to accommodate at least ${toAdd === true ? this.memberCount : this.members.size + toAdd} members.`);
    }
    update(data) {
        if (data.afk_channel_id !== undefined) {
            this.afkChannel = data.afk_channel_id === null ? null : this.client.getChannel(data.afk_channel_id);
            this.afkChannelID = data.afk_channel_id;
        }
        if (data.afk_timeout !== undefined) {
            this.afkTimeout = data.afk_timeout;
        }
        if (data.application_id !== undefined) {
            this.application = this.client["_application"] && data.application_id === null ? null : (this.client.application.id === data.application_id ? this.client.application : undefined);
            this.applicationID = data.application_id;
        }
        if (data.approximate_member_count !== undefined) {
            this.approximateMemberCount = data.approximate_member_count;
        }
        if (data.approximate_presence_count !== undefined) {
            this.approximatePresenceCount = data.approximate_presence_count;
        }
        if (data.banner !== undefined) {
            this.banner = data.banner;
        }
        if (data.default_message_notifications !== undefined) {
            this.defaultMessageNotifications = data.default_message_notifications;
        }
        if (data.description !== undefined) {
            this.description = data.description;
        }
        if (data.discovery_splash !== undefined) {
            this.discoverySplash = data.discovery_splash;
        }
        if (data.emojis !== undefined) {
            this.emojis.clear();
            for (const emoji of data.emojis) {
                this.emojis.update(emoji);
            }
        }
        if (data.explicit_content_filter !== undefined) {
            this.explicitContentFilter = data.explicit_content_filter;
        }
        if (data.features !== undefined) {
            this.features = data.features;
        }
        if (data.icon !== undefined) {
            this.icon = data.icon;
        }
        if (data.incident_actions !== undefined) {
            this.incidentActions = data.incident_actions === null ? null : {
                dmsDisabledUntil: data.incident_actions.dms_disabled_until,
                invitesDisabledUntil: data.incident_actions.invites_disabled_until
            };
        }
        if (data.inventory_settings !== undefined) {
            this.inventorySettings = data.inventory_settings === null ? null : {
                isEmojiPackCollectible: data.inventory_settings.is_emoji_pack_collectible
            };
        }
        if (data.joined_at !== undefined) {
            this.joinedAt = data.joined_at === null ? null : new Date(data.joined_at);
        }
        if (data.large !== undefined) {
            this.large = data.large;
        }
        if (data.latest_onboarding_question_id !== undefined) {
            this.latestOnboardingQuestionID = data.latest_onboarding_question_id;
        }
        if (data.max_members !== undefined) {
            this.maxMembers = data.max_members;
        }
        if (data.max_presences !== undefined) {
            this.maxPresences = data.max_presences;
        }
        if (data.max_stage_video_channel_users !== undefined) {
            this.maxStageVideoChannelUsers = data.max_stage_video_channel_users;
        }
        if (data.max_video_channel_users !== undefined) {
            this.maxVideoChannelUsers = data.max_video_channel_users;
        }
        if (data.member_count !== undefined) {
            this.memberCount = data.member_count;
        }
        if (data.mfa_level !== undefined) {
            this.mfaLevel = data.mfa_level;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.nsfw_level !== undefined) {
            this.nsfwLevel = data.nsfw_level;
        }
        if (data.owner_id !== undefined) {
            this.ownerID = data.owner_id;
            this.owner = data.owner_id === null ? null : this.client.users.get(data.owner_id);
        }
        if (data.preferred_locale !== undefined) {
            this.preferredLocale = data.preferred_locale;
        }
        if (data.premium_progress_bar_enabled !== undefined) {
            this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
        }
        if (data.premium_subscription_count !== undefined) {
            this.premiumSubscriptionCount = data.premium_subscription_count;
        }
        if (data.premium_tier !== undefined) {
            this.premiumTier = data.premium_tier;
        }
        if (data.profile !== undefined) {
            this.profile = data.profile;
        }
        if (data.public_updates_channel_id !== undefined) {
            this.publicUpdatesChannel = data.public_updates_channel_id === null ? null : this.client.getChannel(data.public_updates_channel_id);
            this.publicUpdatesChannelID = data.public_updates_channel_id;
        }
        if (data.region !== undefined) {
            this.region = data.region;
        }
        if (data.rules_channel_id !== undefined) {
            this.rulesChannel = data.rules_channel_id === null ? null : this.client.getChannel(data.rules_channel_id);
            this.rulesChannelID = data.rules_channel_id;
        }
        if (data.safety_alerts_channel_id !== undefined) {
            this.safetyAlertsChannel = data.safety_alerts_channel_id === null ? null : this.client.getChannel(data.safety_alerts_channel_id);
            this.safetyAlertsChannelID = data.safety_alerts_channel_id;
        }
        if (data.splash !== undefined) {
            this.splash = data.splash;
        }
        if (data.stickers !== undefined) {
            this.stickers.clear();
            for (const sticker of data.stickers)
                this.stickers.update(sticker);
        }
        if (data.system_channel_flags !== undefined) {
            this.systemChannelFlags = data.system_channel_flags;
        }
        if (data.system_channel_id !== undefined) {
            this.systemChannel = data.system_channel_id === null ? null : this.client.getChannel(data.system_channel_id);
            this.systemChannelID = data.system_channel_id;
        }
        if (data.vanity_url_code !== undefined) {
            this.vanityURLCode = data.vanity_url_code;
        }
        if (data.verification_level !== undefined) {
            this.verificationLevel = data.verification_level;
        }
        if (data.welcome_screen !== undefined) {
            this.welcomeScreen = {
                description: data.welcome_screen.description,
                welcomeChannels: data.welcome_screen.welcome_channels.map(channel => ({
                    channelID: channel.channel_id,
                    description: channel.description,
                    emojiID: channel.emoji_id,
                    emojiName: channel.emoji_name
                }))
            };
        }
        if (data.widget_channel_id !== undefined) {
            this.widgetChannel = data.widget_channel_id === null ? null : this.client.getChannel(data.widget_channel_id);
            this.widgetChannelID = data.widget_channel_id;
        }
        if (data.widget_enabled !== undefined) {
            this.widgetEnabled = data.widget_enabled;
        }
    }
    /** The client's member for this guild. This will throw an error if the member is not cached. */
    get clientMember() {
        this._clientMember ??= this.client["_user"] === undefined ? undefined : this.members.get(this.client["_user"].id);
        if (!this._clientMember) {
            if (this._rest) {
                throw new Errors_1.UncachedError(`${this.constructor.name}#clientMember is not present when the guild is obtained via rest.`);
            }
            throw new Errors_1.UncachedError(`The client's member has not been cached for ${this.constructor.name}#clientMember.`);
        }
        return this._clientMember;
    }
    /** The shard this guild is on. Gateway only. */
    get shard() {
        this._shard ??= this.client.shards["_forGuild"](this.id);
        if (this.client.options.restMode) {
            throw new TypeError(`${this.constructor.name}#shard will not be present with rest mode enabled.`);
        }
        if (!this.client.shards.connected) {
            throw new TypeError(`${this.constructor.name}#shard will not be present without a gateway connection.`);
        }
        if (!this._shard) {
            throw new TypeError(`Failed to determine shard for ${this.constructor.name}#shard (guild: ${this.id})`);
        }
        return this._shard;
    }
    /** The voice adapter creator for this guild that can be used with [@discordjs/voice](https://discord.js.org/#/docs/voice/main/general/welcome) to play audio in voice and stage channels. */
    get voiceAdapterCreator() {
        this._shard ??= this.client.shards["_forGuild"](this.id);
        if (this.client.options.restMode) {
            throw new TypeError(`${this.constructor.name}#voiceAdapterCreator cannot be used with rest mode enabled.`);
        }
        if (!this.client.shards.connected) {
            throw new TypeError(`${this.constructor.name}#shard cannot be used without a gateway connection.`);
        }
        if (!this._shard) {
            throw new TypeError(`Failed to determine shard for ${this.constructor.name}#voiceAdapterCreator (guild: ${this.id})`);
        }
        return (methods) => {
            this.client.voiceAdapters.set(this.id, methods);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return {
                sendPayload: (payload) => {
                    this.shard.send(payload.op, payload.d);
                    return true;
                },
                destroy: () => this.client.voiceAdapters.delete(this.id)
            };
        };
    }
    /**
     * Add a member to this guild. Requires an access token with the `guilds.join` scope.
     *
     * Returns the newly added member upon success, or void if the member is already in the guild.
     * @param userID The ID of the user to add.
     * @param options The options for adding the member.
     */
    async addMember(userID, options) {
        return this.client.rest.guilds.addMember(this.id, userID, options);
    }
    /**
     * Add a role to a member.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to add.
     * @param reason The reason for adding the role.
     */
    async addMemberRole(memberID, roleID, reason) {
        return this.client.rest.guilds.addMemberRole(this.id, memberID, roleID, reason);
    }
    /**
     * The url of this guild's banner.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    bannerURL(format, size) {
        return this.banner === null ? null : this.client.util.formatImage(Routes.BANNER(this.id, this.banner), format, size);
    }
    /**
     * Begin a prune.
     * @param options The options for the prune.
     */
    async beginPrune(options) {
        return this.client.rest.guilds.beginPrune(this.id, options);
    }
    /**
     * Ban up to 200 members from this guild. This requires both the `BAN_MEMBERS` and `MANAGE_GUILD` permissions.
     * If no members were banned, a {@link Constants~JSONErrorCodes.FAILED_TO_BAN_USERS | FAILED_TO_BAN_USERS } will be returned.
     * The bot user is ignored.
     * @param options The options for banning.
     */
    async bulkBan(options) {
        return this.client.rest.guilds.bulkBan(this.id, options);
    }
    /**
     * Create an auto moderation rule for this guild.
     * @param options The options for the rule.
     */
    async createAutoModerationRule(options) {
        return this.client.rest.guilds.createAutoModerationRule(this.id, options);
    }
    /**
     * Create a ban for a user.
     * @param userID The ID of the user.
     * @param options The options for creating the ban.
     */
    async createBan(userID, options) {
        return this.client.rest.guilds.createBan(this.id, userID, options);
    }
    /**
     * Create a channel in this guild.
     * @param options The options for creating the channel.
     */
    async createChannel(type, options) {
        return this.client.rest.guilds.createChannel(this.id, type, options);
    }
    /**
     * Create an emoji in this guild.
     * @param options The options for creating the emoji.
     */
    async createEmoji(options) {
        return this.client.rest.guilds.createEmoji(this.id, options);
    }
    /**
     * Create a role.
     * @param options The options for creating the role.
     */
    async createRole(options) {
        return this.client.rest.guilds.createRole(this.id, options);
    }
    /**
     * Create a scheduled event in this guild.
     * @param options The options for creating the scheduled event.
     */
    async createScheduledEvent(options) {
        return this.client.rest.guilds.createScheduledEvent(this.id, options);
    }
    /**
     * Create a soundboard sound.
     * @param options The options for creating the soundboard sound.
     */
    async createSoundboardSound(options) {
        return this.client.rest.guilds.createSoundboardSound(this.id, options);
    }
    /**
     * Create a sticker.
     * @param options The options for creating the sticker.
     */
    async createSticker(options) {
        return this.client.rest.guilds.createSticker(this.id, options);
    }
    /**
     * Create a guild template.
     * @param options The options for creating the template.
     */
    async createTemplate(options) {
        return this.client.rest.guilds.createTemplate(this.id, options);
    }
    /**
     * Create a test entitlement for this guild.
     * @param skuID The ID of the SKU to create an entitlement for.
     * @param applicationID The ID of the application to create the entitlement for. If present, defaults to the logged in client's application id.
     */
    async createTestEntitlement(skuID, applicationID) {
        if (applicationID === undefined && this.client["_application"] === undefined) {
            throw new Errors_1.UncachedError("Client#application is not present, you must provide an applicationID as a second argument. To not need to provide an ID, only call this after at least one shard is READY, or restMode is enabled.");
        }
        return this.client.rest.applications.createTestEntitlement(applicationID ?? this.client.application.id, {
            ownerID: this.id,
            ownerType: Constants_1.EntitlementOwnerTypes.GUILD,
            skuID
        });
    }
    /**
     * Delete an auto moderation rule in this guild.
     * @param ruleID The ID of the rule to delete.
     * @param reason The reason for deleting the rule.
     */
    async deleteAutoModerationRule(ruleID, reason) {
        return this.client.rest.guilds.deleteAutoModerationRule(this.id, ruleID, reason);
    }
    /**
     * Delete an emoji in this guild.
     * @param emojiID The ID of the emoji.
     * @param reason The reason for deleting the emoji.
     */
    async deleteEmoji(emojiID, reason) {
        return this.client.rest.guilds.deleteEmoji(this.id, emojiID, reason);
    }
    /**
     * Delete an integration.
     * @param integrationID The ID of the integration.
     * @param reason The reason for deleting the integration.
     */
    async deleteIntegration(integrationID, reason) {
        return this.client.rest.guilds.deleteIntegration(this.id, integrationID, reason);
    }
    /**
     * Delete a role.
     * @param roleID The ID of the role to delete.
     * @param reason The reason for deleting the role.
     */
    async deleteRole(roleID, reason) {
        return this.client.rest.guilds.deleteRole(this.id, roleID, reason);
    }
    /**
     * Delete a scheduled event.
     * @param eventID The ID of the scheduled event.
     * @param reason The reason for deleting the scheduled event. Discord's docs do not explicitly state a reason can be provided, so it may not be used.
     */
    async deleteScheduledEvent(eventID, reason) {
        return this.client.rest.guilds.deleteScheduledEvent(this.id, eventID, reason);
    }
    /**
     * Delete a soundboard sound.
     * @param soundID The ID of the soundboard sound.
     * @param reason The reason for deleting the soundboard sound.
     */
    async deleteSoundboardSound(soundID, reason) {
        return this.client.rest.guilds.deleteSoundboardSound(this.id, soundID, reason);
    }
    /**
     * Delete a sticker.
     * @param stickerID The ID of the sticker to delete.
     * @param reason The reason for deleting the sticker.
     */
    async deleteSticker(stickerID, reason) {
        return this.client.rest.guilds.deleteSticker(this.id, stickerID, reason);
    }
    /**
     * Delete a template.
     * @param code The code of the template.
     */
    async deleteTemplate(code) {
        return this.client.rest.guilds.deleteTemplate(this.id, code);
    }
    /**
     * Disable the `COMMUNITY` feature for this guild. Requires the **Administrator** permission.
     * @param reason The reason for disable the feature.
     */
    async disableCommunity(reason) {
        return this.toggleFeature("COMMUNITY", false, reason);
    }
    /**
     * Disable the `DISCOVERABLE` feature for this guild. Requires the **Administrator** permission.
     * @param reason The reason for disabling the feature.
     */
    async disableDiscovery(reason) {
        return this.toggleFeature("DISCOVERABLE", false, reason);
    }
    /**
     * Disable the `INVITES_DISABLED` feature for this guild. Requires the **Manage Guild** permission.
     * @param reason The reason for disabling the feature.
     */
    async disableInvites(reason) {
        return this.toggleFeature("INVITES_DISABLED", true, reason);
    }
    /**
     * Disable the `RAID_ALERTS_ENABLED` feature for this guild. Requires the **Manage Guild** permission.
     * @param reason The reason for disabling the feature.
     */
    async disableRaidAlerts(reason) {
        return this.toggleFeature("RAID_ALERTS_ENABLED", false, reason);
    }
    /**
     * The url of this guild's discovery splash.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    discoverySplashURL(format, size) {
        return this.discoverySplash === null ? null : this.client.util.formatImage(Routes.GUILD_DISCOVERY_SPLASH(this.id, this.discoverySplash), format, size);
    }
    /**
     * Edit this guild.
     * @param options The options for editing the guild.
     */
    async edit(options) {
        return this.client.rest.guilds.edit(this.id, options);
    }
    /**
     * Edit an existing auto moderation rule in this guild.
     * @param ruleID The ID of the rule to edit.
     * @param options The options for editing the rule.
     */
    async editAutoModerationRule(ruleID, options) {
        return this.client.rest.guilds.editAutoModerationRule(this.id, ruleID, options);
    }
    /**
     * Edit the positions of channels in this guild.
     * @param options The channels to move. Unedited channels do not need to be specified.
     */
    async editChannelPositions(options) {
        return this.client.rest.guilds.editChannelPositions(this.id, options);
    }
    /**
     * Modify the current member in this guild.
     * @param options The options for editing the member.
     */
    async editCurrentMember(options) {
        return this.client.rest.guilds.editCurrentMember(this.id, options);
    }
    /**
     * Edit the current member's voice state in this guild. `channelID` is required, and the current member must already be in that channel. See [Discord's docs](https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state-caveats) for more information.
     * @param options The options for editing the voice state.
     */
    async editCurrentUserVoiceState(options) {
        return this.client.rest.guilds.editCurrentUserVoiceState(this.id, options);
    }
    /**
     * Edit an existing emoji in this guild.
     * @param options The options for editing the emoji.
     */
    async editEmoji(emojiID, options) {
        return this.client.rest.guilds.editEmoji(this.id, emojiID, options);
    }
    /**
     * Edit the incident actions for this guild.
     * @param options The options for editing the incident actions.
     */
    async editIncidentActions(options) {
        return this.client.rest.guilds.editIncidentActions(this.id, options);
    }
    /**
     * Edit a member of this guild. Use \<Guild\>.editCurrentMember if you wish to update the nick of this client using the CHANGE_NICKNAME permission.
     * @param memberID The ID of the member.
     * @param options The options for editing the member.
     */
    async editMember(memberID, options) {
        return this.client.rest.guilds.editMember(this.id, memberID, options);
    }
    /**
     * Edit this guild's onboarding configuration.
     * @param options The options for editing the onboarding configuration.
     */
    async editOnboarding(options) {
        return this.client.rest.guilds.editOnboarding(this.id, options);
    }
    /**
     * Edit an existing role.
     * @param options The options for editing the role.
     */
    async editRole(roleID, options) {
        return this.client.rest.guilds.editRole(this.id, roleID, options);
    }
    /**
     * Edit the position of roles in this guild.
     * @param options The roles to move.
     */
    async editRolePositions(options, reason) {
        return this.client.rest.guilds.editRolePositions(this.id, options, reason);
    }
    /**
     * Edit an existing scheduled event in this guild.
     * @param scheduledEventID The ID of the scheduled event.
     * @param options The options for editing the scheduled event.
     */
    async editScheduledEvent(scheduledEventID, options) {
        return this.client.rest.guilds.editScheduledEvent(this.id, scheduledEventID, options);
    }
    /**
     * Edit a soundboard sound.
     * @param soundID The ID of the soundboard sound.
     * @param options The options for editing the soundboard sound.
     */
    async editSoundboardSound(soundID, options) {
        return this.client.rest.guilds.editSoundboardSound(this.id, soundID, options);
    }
    /**
     * Edit a sticker.
     * @param options The options for editing the sticker.
     */
    async editSticker(stickerID, options) {
        return this.client.rest.guilds.editSticker(this.id, stickerID, options);
    }
    /**
     * Edit a template.
     * @param code The code of the template.
     * @param options The options for editing the template.
     */
    async editTemplate(code, options) {
        return this.client.rest.guilds.editTemplate(this.id, code, options);
    }
    /**
     * Edit a guild member's voice state. `channelID` is required, and the user must already be in that channel. See [Discord's docs](https://discord.com/developers/docs/resources/guild#modify-user-voice-state) for more information.
     * @param memberID The ID of the member.
     * @param options The options for editing the voice state.
     */
    async editUserVoiceState(memberID, options) {
        return this.client.rest.guilds.editUserVoiceState(this.id, memberID, options);
    }
    /**
     * Edit the welcome screen in this guild.
     * @param options The options for editing the welcome screen.
     */
    async editWelcomeScreen(options) {
        return this.client.rest.guilds.editWelcomeScreen(this.id, options);
    }
    /**
     * Edit the widget of this guild.
     * @param options The options for editing the widget.
     */
    async editWidget(options) {
        return this.client.rest.guilds.editWidget(this.id, options);
    }
    /**
     * Enable the `COMMUNITY` feature for this guild. Requires the **Administrator** permission.
     * @param reason The reason for enabling the feature.
     */
    async enableCommunity(reason) {
        return this.toggleFeature("COMMUNITY", true, reason);
    }
    /**
     * Enable the `DISCOVERABLE` feature for this guild. Requires the **Administrator** permission. The server must also be passing all discovery requirements.
     * @param reason The reason for enabling the feature.
     */
    async enableDiscovery(reason) {
        return this.toggleFeature("DISCOVERABLE", true, reason);
    }
    /**
     * Enable the `INVITES_DISABLED` feature for this guild. Requires the **Manage Guild** permission.
     * @param reason The reason for enabling the feature.
     */
    async enableInvites(reason) {
        return this.toggleFeature("INVITES_DISABLED", false, reason);
    }
    /**
     * Enable the `RAID_ALERTS_ENABLED` feature for this guild. Requires the **Manage Guild** permission.
     * @param reason The reason for enabling the feature.
     */
    async enableRaidAlerts(reason) {
        return this.toggleFeature("RAID_ALERTS_ENABLED", true, reason);
    }
    /**
     * Request members from this guild.
     * @param options The options for fetching the members.
     */
    async fetchMembers(options) {
        return this.shard.requestGuildMembers(this.id, options);
    }
    /**
     * Get the active threads in this guild.
     */
    async getActiveThreads() {
        return this.client.rest.guilds.getActiveThreads(this.id);
    }
    /**
     * Get this guild's audit log.
     * @param options The options for the audit log.
     */
    async getAuditLog(options) {
        return this.client.rest.guilds.getAuditLog(this.id, options);
    }
    /**
     * Get an auto moderation rule for this guild.
     * @param ruleID The ID of the rule to get.
     */
    async getAutoModerationRule(ruleID) {
        return this.client.rest.guilds.getAutoModerationRule(this.id, ruleID);
    }
    /**
     * Get the auto moderation rules for this guild.
     */
    async getAutoModerationRules() {
        return this.client.rest.guilds.getAutoModerationRules(this.id);
    }
    /**
     * Get a ban in this guild.
     * @param userID The ID of the user to get the ban of.
     */
    async getBan(userID) {
        return this.client.rest.guilds.getBan(this.id, userID);
    }
    /**
     * Get the bans in this guild.
     * @param options The options for getting the bans.
     */
    async getBans(options) {
        return this.client.rest.guilds.getBans(this.id, options);
    }
    /**
     * Get the channels in a guild. Does not include threads. Only use this if you need to. See the `channels` collection.
     */
    async getChannels() {
        return this.client.rest.guilds.getChannels(this.id);
    }
    /**
     * Get an emoji in this guild.
     * @param emojiID The ID of the emoji to get.
     */
    async getEmoji(emojiID) {
        return this.client.rest.guilds.getEmoji(this.id, emojiID);
    }
    /**
     * Get the emojis in this guild.
     */
    async getEmojis() {
        return this.client.rest.guilds.getEmojis(this.id);
    }
    /**
     * Get the entitlements for this guild.
     * @param options The options for getting the entitlements.
     * @param applicationID The ID of the application to create the entitlement for. If present, defaults to the logged in client's application id.
     */
    async getEntitlements(options, applicationID) {
        if (applicationID === undefined && this.client["_application"] === undefined) {
            throw new Errors_1.UncachedError("Client#application is not present, you must provide an applicationID as a second argument. To not need to provide an ID, only call this after at least one shard is READY, or restMode is enabled.");
        }
        return this.client.rest.applications.getEntitlements(applicationID ?? this.client.application.id, { guildID: this.id, ...options });
    }
    /**
     * Get the integrations in this guild.
     */
    async getIntegrations() {
        return this.client.rest.guilds.getIntegrations(this.id);
    }
    /**
     * Get the invites of this guild.
     */
    async getInvites() {
        return this.client.rest.guilds.getInvites(this.id);
    }
    /**
     * Get a member of this guild.
     * @param memberID The ID of the member.
     */
    async getMember(memberID) {
        return this.client.rest.guilds.getMember(this.id, memberID);
    }
    /**
     * Get this guild's members. This requires the `GUILD_MEMBERS` intent.
     * @param options The options for getting the members.
     */
    async getMembers(options) {
        return this.client.rest.guilds.getMembers(this.id, options);
    }
    /**
     * Get the onboarding information for this guild.
     */
    async getOnboarding() {
        return this.client.rest.guilds.getOnboarding(this.id);
    }
    /**
     * Get a preview of this guild.
     */
    async getPreview() {
        return this.client.rest.guilds.getPreview(this.id);
    }
    /**
     * Get the prune count of this guild.
     * @param options The options for getting the prune count.
     */
    async getPruneCount(options) {
        return this.client.rest.guilds.getPruneCount(this.id, options);
    }
    /**
     * Get a role in this guild. Only use this if you need to. See the `roles` collection.
     * @param roleID The ID of the role to get.
     */
    async getRole(roleID) {
        return this.client.rest.guilds.getRole(this.id, roleID);
    }
    /**
     * Get the member count of the roles in this guild. The result is a key-value map of role id to member count.
     */
    async getRoleMemberCounts() {
        return this.client.rest.guilds.getRoleMemberCounts(this.id);
    }
    /**
     * Get the roles in this guild. Only use this if you need to. See the `roles` collection.
     */
    async getRoles() {
        return this.client.rest.guilds.getRoles(this.id);
    }
    /**
     * Get a scheduled event.
     * @param eventID The ID of the scheduled event to get.
     * @param withUserCount If the number of users subscribed to the event should be included.
     */
    async getScheduledEvent(eventID, withUserCount) {
        return this.client.rest.guilds.getScheduledEvent(this.id, eventID, withUserCount);
    }
    /**
     * Get the users subscribed to a scheduled event.
     * @param eventID The ID of the scheduled event to get the users of.
     * @param options The options for getting the users.
     */
    async getScheduledEventUsers(eventID, options) {
        return this.client.rest.guilds.getScheduledEventUsers(this.id, eventID, options);
    }
    /**
     * Get this guild's scheduled events
     * @param withUserCount If the number of users subscribed to the event should be included.
     */
    async getScheduledEvents(withUserCount) {
        return this.client.rest.guilds.getScheduledEvents(this.id, withUserCount);
    }
    /**
     * Get a soundboard sound.
     * @param soundID The ID of the soundboard sound to get.
     */
    async getSoundboardSound(soundID) {
        return this.client.rest.guilds.getSoundboardSound(this.id, soundID);
    }
    /**
     * Get this guild's soundboard sounds.
     */
    async getSoundboardSounds() {
        return this.client.rest.guilds.getSoundboardSounds(this.id);
    }
    /**
     * Get a sticker. Response will include a user if the client has the `MANAGE_EMOJIS_AND_STICKERS` permissions.
     * @param stickerID The ID of the sticker to get.
     */
    async getSticker(stickerID) {
        return this.client.rest.guilds.getSticker(this.id, stickerID);
    }
    /**
     * Get this guild's stickers. Stickers will include a user if the client has the `MANAGE_EMOJIS_AND_STICKERS` permissions.
     */
    async getStickers() {
        return this.client.rest.guilds.getStickers(this.id);
    }
    /**
     * Get this guild's templates.
     */
    async getTemplates() {
        return this.client.rest.guilds.getTemplates(this.id);
    }
    /**
     * Get the vanity url of this guild.
     */
    async getVanityURL() {
        return this.client.rest.guilds.getVanityURL(this.id);
    }
    /**
     * Get the list of usable voice regions for this guild. This will return VIP servers when the guild is VIP-enabled.
     */
    async getVoiceRegions() {
        return this.client.rest.guilds.getVoiceRegions(this.id);
    }
    /**
     * Get the voice state of a member.
     * @param memberID The ID of the member. Use `@me` for the bot user.
     */
    async getVoiceState(memberID) {
        return this.client.rest.guilds.getVoiceState(this.id, memberID);
    }
    /**
     * Get the webhooks in this guild.
     */
    async getWebhooks() {
        return this.client.rest.webhooks.getForGuild(this.id);
    }
    /**
     * Get the welcome screen for this guild.
     */
    async getWelcomeScreen() {
        return this.client.rest.guilds.getWelcomeScreen(this.id);
    }
    /**
     * Get the widget of this guild.
     */
    async getWidget() {
        return this.client.rest.guilds.getWidget(this.id);
    }
    /**
     * Get the widget image of this guild.
     * @param style The style of the image.
     */
    async getWidgetImage(style) {
        return this.client.rest.guilds.getWidgetImage(this.id, style);
    }
    /**
     * Get the raw JSON widget of this guild.
     */
    async getWidgetJSON() {
        return this.client.rest.guilds.getWidgetJSON(this.id);
    }
    /**
     * Get this guild's widget settings.
     */
    async getWidgetSettings() {
        return this.client.rest.guilds.getWidgetSettings(this.id);
    }
    /**
     * The url of this guild's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    iconURL(format, size) {
        return this.icon === null ? null : this.client.util.formatImage(Routes.GUILD_ICON(this.id, this.icon), format, size);
    }
    /**
     * Join a voice or stage channel.
     * @param options The options to join the channel with.
     */
    joinChannel(options) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
        return this.client.joinVoiceChannel({
            ...options,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            voiceAdapterCreator: this.voiceAdapterCreator,
            guildID: this.id
        });
    }
    /**
     * Leave this guild.
     */
    async leave() {
        return this.client.rest.users.leaveGuild(this.id);
    }
    /** Leave the connected voice or stage channel on this guild. */
    leaveChannel() {
        return this.client.leaveVoiceChannel(this.id);
    }
    /**
     * Search this guild's members.
     * @param options The options to search with.
     * @param retryOnIndexNotAvailable If the search should be retried if Discord replies with an index unavailable response. This will retry at most one time, waiting for `retry_after` or 15-45 seconds.
     */
    async memberSearch(options, retryOnIndexNotAvailable = true) {
        return this.client.rest.guilds.memberSearch(this.id, options, retryOnIndexNotAvailable);
    }
    /**
     * Get the permissions of a member. If providing an id, the member must be cached.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member) {
        if (typeof member === "string") {
            member = this.members.get(member);
        }
        if (!member) {
            throw new Errors_1.UncachedError(`Cannot use ${this.constructor.name}#permissionsOf with an ID when the member is not cached.`);
        }
        if (member.id === this.ownerID) {
            return new Permission_1.default(Constants_1.AllPermissions);
        }
        else {
            let permissions = this.roles.get(this.id).permissionsAllow;
            if (permissions & Constants_1.Permissions.ADMINISTRATOR) {
                return new Permission_1.default(Constants_1.AllPermissions);
            }
            for (const id of member.roles) {
                const role = this.roles.get(id);
                if (!role) {
                    continue;
                }
                if (role.permissionsAllow & Constants_1.Permissions.ADMINISTRATOR) {
                    permissions = Constants_1.AllPermissions;
                    break;
                }
                else {
                    permissions |= role.permissionsAllow;
                }
            }
            return new Permission_1.default(permissions);
        }
    }
    /**
     * Remove a ban.
     * @param userID The ID of the user to remove the ban from.
     * @param reason The reason for removing the ban.
     */
    async removeBan(userID, reason) {
        return this.client.rest.guilds.removeBan(this.id, userID, reason);
    }
    /**
     * Remove a member from this guild.
     * @param memberID The ID of the user to remove.
     * @param reason The reason for the removal.
     */
    async removeMember(memberID, reason) {
        return this.client.rest.guilds.removeMember(this.id, memberID, reason);
    }
    /**
     * Remove a role from a member.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to remove.
     * @param reason The reason for removing the role.
     */
    async removeMemberRole(memberID, roleID, reason) {
        return this.client.rest.guilds.removeMemberRole(this.id, memberID, roleID, reason);
    }
    /**
     * Search the username & nicknames of members in this guild. See {@link Guild#memberSearch | memberSearch} for a more detailed search.
     * @param options The options for the search.
     */
    async searchMembers(options) {
        return this.client.rest.guilds.searchMembers(this.id, options);
    }
    /**
     * The url of this guild's invite splash.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    splashURL(format, size) {
        return this.splash === null ? null : this.client.util.formatImage(Routes.GUILD_SPLASH(this.id, this.splash), format, size);
    }
    /**
     * Sync a guild template.
     * @param code The code of the template to sync.
     */
    async syncTemplate(code) {
        return this.client.rest.guilds.syncTemplate(this.id, code);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            afkChannelID: this.afkChannelID,
            afkTimeout: this.afkTimeout,
            application: this.applicationID ?? undefined,
            approximateMemberCount: this.approximateMemberCount,
            approximatePresenceCount: this.approximatePresenceCount,
            autoModerationRules: this.autoModerationRules.map(rule => rule.toJSON()),
            banner: this.banner,
            channels: this.channels.map(channel => channel.id),
            defaultMessageNotifications: this.defaultMessageNotifications,
            description: this.description,
            discoverySplash: this.discoverySplash,
            emojis: this.emojis.toArray(),
            explicitContentFilter: this.explicitContentFilter,
            features: this.features,
            icon: this.icon,
            incidentActions: this.incidentActions,
            joinedAt: this.joinedAt?.getTime() ?? null,
            large: this.large,
            maxMembers: this.maxMembers,
            maxPresences: this.maxPresences,
            maxStageVideoChannelUsers: this.maxStageVideoChannelUsers,
            maxVideoChannelUsers: this.maxVideoChannelUsers,
            memberCount: this.memberCount,
            members: this.members.map(member => member.id),
            mfaLevel: this.mfaLevel,
            name: this.name,
            nsfwLevel: this.nsfwLevel,
            ownerID: this.ownerID,
            preferredLocale: this.preferredLocale,
            premiumProgressBarEnabled: this.premiumProgressBarEnabled,
            premiumSubscriptionCount: this.premiumSubscriptionCount,
            premiumTier: this.premiumTier,
            profile: this.profile,
            publicUpdatesChannelID: this.publicUpdatesChannelID,
            region: this.region,
            roles: this.roles.map(role => role.toJSON()),
            rulesChannelID: this.rulesChannelID,
            scheduledEvents: this.scheduledEvents.map(event => event.toJSON()),
            splash: this.splash,
            stageInstances: this.stageInstances.map(instance => instance.toJSON()),
            stickers: this.stickers.toArray(),
            systemChannelID: this.systemChannelID,
            systemChannelFlags: this.systemChannelFlags,
            threads: this.threads.map(thread => thread.id),
            unavailable: this.unavailable,
            vanityURLCode: this.vanityURLCode,
            verificationLevel: this.verificationLevel,
            voiceStates: this.voiceStates.map(state => state.toJSON()),
            welcomeScreen: this.welcomeScreen,
            widgetChannelID: this.widgetChannelID,
            widgetEnabled: this.widgetEnabled
        };
    }
}
exports.default = Guild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9HdWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvQkFBb0I7QUFDcEIsMERBQTBCO0FBQzFCLDBEQUEwQjtBQUMxQiwwRUFBMEM7QUFDMUMsOERBQThCO0FBQzlCLHdGQUF3RDtBQUN4RCw0RUFBNEM7QUFNNUMsd0VBQXdDO0FBQ3hDLHNGQUFzRDtBQUN0RCxzRUFBc0M7QUFDdEMsc0VBQXNDO0FBQ3RDLDRFQUE0QztBQUM1QyxnRUFBZ0M7QUFJaEMsOERBQTJEO0FBRTNELDRFQUE0QztBQUc1QyxzRUFBc0M7QUFFdEMsNENBZXNCO0FBQ3RCLCtEQUF5QztBQUV6QyxzRkFBc0Q7QUFFdEQsNkRBQTZEO0FBQzdELGtCQUFrQjtBQUNsQiwyQ0FBK0M7QUFDL0Msd0ZBQXdEO0FBR3hELG1DQUFtQztBQUNuQyxNQUFxQixLQUFNLFNBQVEsY0FBSTtJQUMzQixhQUFhLENBQVU7SUFDL0IsdUNBQXVDO0lBQy9CLEtBQUssQ0FBQztJQUNOLE1BQU0sQ0FBUztJQUN2QixzQ0FBc0M7SUFDdEMsVUFBVSxDQUF1QjtJQUNqQyxnREFBZ0Q7SUFDaEQsWUFBWSxDQUFnQjtJQUM1Qiw0RUFBNEU7SUFDNUUsVUFBVSxDQUFTO0lBQ25CLDhEQUE4RDtJQUM5RCxXQUFXLENBQTRCO0lBQ3ZDLHdFQUF3RTtJQUN4RSxhQUFhLENBQWdCO0lBQzdCLGtGQUFrRjtJQUNsRixzQkFBc0IsQ0FBVTtJQUNoQyw4RkFBOEY7SUFDOUYsd0JBQXdCLENBQVU7SUFDbEMsNE1BQTRNO0lBQzVNLGVBQWUsQ0FBa0U7SUFDakYsK0NBQStDO0lBQy9DLG1CQUFtQixDQUFrRjtJQUNyRyx1Q0FBdUM7SUFDdkMsTUFBTSxDQUFnQjtJQUN0QixrQ0FBa0M7SUFDbEMsUUFBUSxDQUFnRztJQUN4RyxvS0FBb0s7SUFDcEssMkJBQTJCLENBQW1DO0lBQzlELHFDQUFxQztJQUNy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