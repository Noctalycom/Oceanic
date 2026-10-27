"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Guild */
const Constants_1 = require("../Constants");
const Errors_1 = require("../util/Errors");
const Routes = tslib_1.__importStar(require("../util/Routes"));
const SimpleCollection_1 = tslib_1.__importDefault(require("../util/SimpleCollection"));
const TypedCollection_1 = tslib_1.__importDefault(require("../util/TypedCollection"));
const AuditLogEntry_1 = tslib_1.__importDefault(require("./AuditLogEntry"));
const AutoModerationRule_1 = tslib_1.__importDefault(require("./AutoModerationRule"));
const Base_1 = tslib_1.__importDefault(require("./Base"));
const Channel_1 = tslib_1.__importDefault(require("./Channel"));
const GuildChannel_1 = tslib_1.__importDefault(require("./GuildChannel"));
const GuildJoinRequest_1 = tslib_1.__importDefault(require("./GuildJoinRequest"));
const GuildScheduledEvent_1 = tslib_1.__importDefault(require("./GuildScheduledEvent"));
const Integration_1 = tslib_1.__importDefault(require("./Integration"));
const Invite_1 = tslib_1.__importDefault(require("./Invite"));
const Member_1 = tslib_1.__importDefault(require("./Member"));
const Permission_1 = tslib_1.__importDefault(require("./Permission"));
const Role_1 = tslib_1.__importDefault(require("./Role"));
const Soundboard_1 = tslib_1.__importDefault(require("./Soundboard"));
const StageInstance_1 = tslib_1.__importDefault(require("./StageInstance"));
const ThreadChannel_1 = tslib_1.__importDefault(require("./ThreadChannel"));
const VoiceState_1 = tslib_1.__importDefault(require("./VoiceState"));
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
    /** The cached join requests in this guild. This will be empty unless join requests have been fetched. */
    joinRequests;
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
    /** The guild's server tag, only present for guilds received over the gateway. */
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
            },
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
        this.joinRequests = new TypedCollection_1.default(GuildJoinRequest_1.default, client);
        this.joinedAt = null;
        // RawGuild's gateway-only fields (member_count, channels, threads, etc. - see the comment atop
        // lib/types/guilds.d.ts) are typed as required for convenience, but this class is also constructed
        // from REST responses where they're genuinely absent - these checks are real
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        this.large = (data.member_count ?? data.approximate_member_count ?? 0) >= client.shards.options.largeThreshold;
        this.latestOnboardingQuestionID = null;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
            },
        });
        this.unavailable = !!data.unavailable;
        this.vanityURLCode = data.vanity_url_code;
        this.verificationLevel = data.verification_level;
        this.voiceStates = new TypedCollection_1.default(VoiceState_1.default, client, client.util._getLimit("voiceStates", this.id));
        this.widgetChannelID = data.widget_channel_id ?? null;
        for (const role of data.roles) {
            this.roles.update(role, data.id);
        }
        this.update(data);
        this._rest = !!rest;
        // RawGuild's gateway-only fields (channels, threads, members, etc. - see the comment atop
        // lib/types/guilds.d.ts) are typed as required for convenience, but this class is also constructed
        // from REST responses where they're genuinely absent - these checks are real
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (data.channels) {
            for (const channelData of data.channels) {
                channelData.guild_id = this.id;
                this.channels.update(channelData);
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (data.threads) {
            for (const threadData of data.threads) {
                threadData.guild_id = this.id;
                this.threads.update(threadData);
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (data.members) {
            for (const rawMember of data.members) {
                const member = this.members.update({ ...rawMember, id: rawMember.user?.id }, this.id);
                if (this.client["_user"] && member.id === this.client.user.id) {
                    this._clientMember = member;
                }
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (data.stage_instances) {
            for (const stageInstance of data.stage_instances) {
                stageInstance.guild_id = this.id;
                this.stageInstances.update(stageInstance);
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
                // the `as` cast above lies about `.get()` never returning undefined - this is the real guard
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (channel && "voiceMembers" in channel) {
                    channel.voiceMembers.add(member);
                }
                if (client.shards.options.seedVoiceConnections && voiceState.user_id === client.user.id && !this.client.getVoiceConnection(this.id)) {
                    this.client.joinVoiceChannel({
                        guildID: this.id,
                        channelID: voiceState.channel_id,
                        selfDeaf: voiceState.self_deaf,
                        selfMute: voiceState.self_mute,
                        voiceAdapterCreator: this.voiceAdapterCreator,
                    });
                }
            }
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
            throw new TypeError(`${this.constructor.name}#voiceAdapterCreator cannot be used without a gateway connection.`);
        }
        if (!this._shard) {
            throw new TypeError(`Failed to determine shard for ${this.constructor.name}#voiceAdapterCreator (guild: ${this.id})`);
        }
        return (methods) => {
            this.client.voiceAdapters.set(this.id, methods);
            return {
                sendPayload: (payload) => {
                    this.shard.send(payload.op, payload.d);
                    return true;
                },
                destroy: () => this.client.voiceAdapters.delete(this.id),
            };
        };
    }
    toggleFeature(feature, enable, reason) {
        const newFeatures = enable
            ? (this.features.includes(feature) ? this.features : [...this.features, feature])
            : this.features.filter(name => name !== feature);
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
                invitesDisabledUntil: data.incident_actions.invites_disabled_until,
            };
        }
        if (data.inventory_settings !== undefined) {
            this.inventorySettings = data.inventory_settings === null ? null : {
                isEmojiPackCollectible: data.inventory_settings.is_emoji_pack_collectible,
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
                    emojiName: channel.emoji_name,
                })),
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
    /**
     * Accept or deny a join request for this guild.
     * @param requestID The ID of the join request.
     * @param options The options for actioning the join request.
     * @caching This method **does** cache its result.
     * @caches {@link Guild#joinRequests | Guild#joinRequests}
     */
    async actionJoinRequest(requestID, options) {
        return this.client.rest.guilds.actionJoinRequest(this.id, requestID, options);
    }
    /**
     * Add a member to this guild. Requires an access token with the `guilds.join` scope.
     *
     * Returns the newly added member upon success, or void if the member is already in the guild.
     * @param userID The ID of the user to add.
     * @param options The options for adding the member.
     */
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- deliberate: void or Member, see above
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
     * Create an exception to the recurrence rule for a scheduled event.
     * @param eventID The ID of the scheduled event.
     * @param options The options for creating the scheduled event exception.
     * @caching This method **may** cache its result. The result will not be cached if the scheduled event is not cached.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    async createScheduledEventException(eventID, options) {
        return this.client.rest.guilds.createScheduledEventException(this.id, eventID, options);
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
            skuID,
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
     * Delete an exception to the recurrence rule for a scheduled event.
     * @param eventID The ID of the scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param reason The reason for deleting the scheduled event exception.
     * @caching This method **may** remove the result from cache. The result will not be removed if the scheduled event is not cached.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    async deleteScheduledEventException(eventID, exceptionID, reason) {
        return this.client.rest.guilds.deleteScheduledEventException(this.id, eventID, exceptionID, reason);
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
        return this.toggleFeature("INVITES_DISABLED", false, reason);
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
     * Edit an exception to the recurrence rule for a scheduled event.
     * @param eventID The ID of the scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param options The options for editing the scheduled event exception.
     * @caching This method **may** cache its result. The result will not be cached if the scheduled event is not cached.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    async editScheduledEventException(eventID, exceptionID, options) {
        return this.client.rest.guilds.editScheduledEventException(this.id, eventID, exceptionID, options);
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
        return this.toggleFeature("INVITES_DISABLED", true, reason);
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
     * @deprecated Use {@link requestMembers}. This will be removed in `1.16.0`.
     */
    async fetchMembers(options) {
        return this.requestMembers(options);
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
     * Get this guild's join requests.
     * @param options The options for getting join requests.
     * @caching This method **does** cache its result.
     * @caches {@link Guild#joinRequests | Guild#joinRequests}
     */
    async getJoinRequests(options) {
        return this.client.rest.guilds.getJoinRequests(this.id, options);
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
     * Get this guild's new member welcome info.
     */
    async getNewMemberWelcome() {
        return this.client.rest.guilds.getNewMemberWelcome(this.id);
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
     * Get users subscribed to an exception for a scheduled event.
     * @param eventID The ID of the scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param options The options for getting the users.
     * @caching This method **does** cache part of its result. Members will not be cached if the guild is not cached.
     * @caches {@link Client#users | Client#users}<br>{@link Guild#members | Guild#members}
     */
    async getScheduledEventExceptionUsers(eventID, exceptionID, options) {
        return this.client.rest.guilds.getScheduledEventExceptionUsers(this.id, eventID, exceptionID, options);
    }
    /**
     * Get this guild's scheduled events
     * @param withUserCount If the number of users subscribed to the event should be included.
     */
    async getScheduledEvents(withUserCount) {
        return this.client.rest.guilds.getScheduledEvents(this.id, withUserCount);
    }
    /**
     * Get user counts for a scheduled event and optionally specific exceptions.
     * @param eventID The ID of the scheduled event.
     * @param options The options for getting the user counts.
     * @caching This method **may** cache the event user count.
     * @caches {@link GuildScheduledEvent#userCount | GuildScheduledEvent#userCount}
     */
    async getScheduledEventUserCounts(eventID, options) {
        return this.client.rest.guilds.getScheduledEventUserCounts(this.id, eventID, options);
    }
    /**
     * Get the users subscribed to a scheduled event.
     * @param eventID The ID of the scheduled event to get the users of.
     * @param options The options for getting the users.
     * @caching This method **does** cache part of its result. Members will not be cached if the guild is not cached.
     * @caches {@link Client#users | Client#users}<br>{@link Guild#members | Guild#members}
     */
    async getScheduledEventUsers(eventID, options) {
        return this.client.rest.guilds.getScheduledEventUsers(this.id, eventID, options);
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
        return this.client.joinVoiceChannel({
            ...options,
            voiceAdapterCreator: this.voiceAdapterCreator,
            guildID: this.id,
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
        this.client.leaveVoiceChannel(this.id);
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
        // the `!` above lies to the type checker to defer the real null check to here, which throws a
        // more useful error than a bare TypeError - `.get()` can genuinely return undefined at runtime
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
     * Request extended channel info for this guild.
     * @param options The options.
     */
    async requestChannelInfo(options) {
        return this.shard.requestChannelInfo(this.id, options);
    }
    /**
     * Request members from this guild.
     * @param options The options for fetching the members.
     */
    async requestMembers(options) {
        return this.shard.requestGuildMembers(this.id, options);
    }
    /**
     * Request soundboard sounds for this guild.
     * @param options The options.
     */
    async requestSoundboardSounds(options) {
        return this.shard.requestSoundboardSounds(this.id, options);
    }
    /**
     * Search the username & nicknames of members in this guild. See {@link Guild#memberSearch | memberSearch} for a more detailed search.
     * @param options The options for the search.
     */
    async searchMembers(options) {
        return this.client.rest.guilds.searchMembers(this.id, options);
    }
    /**
     * Search messages in this guild.
     * @param options The options to search with.
     * @param retryOnIndexNotAvailable If the search should be retried if Discord replies with an index unavailable response. This will retry at most one time, waiting for `retry_after` or 15-45 seconds.
     */
    async searchMessages(options, retryOnIndexNotAvailable = true) {
        return this.client.rest.guilds.searchMessages(this.id, options, retryOnIndexNotAvailable);
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
            widgetEnabled: this.widgetEnabled,
        };
    }
}
exports.default = Guild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9HdWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvQkFBb0I7QUFDcEIsNENBZXNCO0FBQ3RCLDJDQUErQztBQUMvQywrREFBeUM7QUFDekMsd0ZBQXdEO0FBQ3hELHNGQUFzRDtBQUV0RCw0RUFBNEM7QUFDNUMsc0ZBQXNEO0FBQ3RELDBEQUEwQjtBQUMxQixnRUFBZ0M7QUFDaEMsMEVBQTBDO0FBQzFDLGtGQUFrRDtBQUNsRCx3RkFBd0Q7QUFDeEQsd0VBQXdDO0FBQ3hDLDhEQUEyRDtBQUMzRCw4REFBOEI7QUFDOUIsc0VBQXNDO0FBQ3RDLDBEQUEwQjtBQUMxQixzRUFBc0M7QUFDdEMsNEVBQTRDO0FBQzVDLDRFQUE0QztBQUM1QyxzRUFBc0M7QUFzQnRDLG1DQUFtQztBQUNuQyxNQUFxQixLQUFNLFNBQVEsY0FBSTtJQUMzQixhQUFhLENBQVU7SUFDL0IsdUNBQXVDO0lBQy9CLEtBQUssQ0FBQztJQUNOLE1BQU0sQ0FBUztJQUN2QixzQ0FBc0M7SUFDdEMsVUFBVSxDQUF1QjtJQUNqQyxnREFBZ0Q7SUFDaEQsWUFBWSxDQUFnQjtJQUM1Qiw0RUFBNEU7SUFDNUUsVUFBVSxDQUFTO0lBQ25CLDhEQUE4RDtJQUM5RCxXQUFXLENBQTRCO0lBQ3ZDLHdFQUF3RTtJQUN4RSxhQUFhLENBQWdCO0lBQzdCLGtGQUFrRjtJQUNsRixzQkFBc0IsQ0FBVTtJQUNoQyw4RkFBOEY7SUFDOUYsd0JBQXdCLENBQVU7SUFDbEMsNE1BQTRNO0lBQzVNLGVBQWUsQ0FBa0U7SUFDakYsK0NBQStDO0lBQy9DLG1CQUFtQixDQUFrRjtJQUNyRyx1Q0FBdUM7SUFDdkMsTUFBTSxDQUFnQjtJQUN0QixrQ0FBa0M7SUFDbEMsUUFBUSxDQUFnRztJQUN4RyxvS0FBb0s7SUFDcEssMkJBQTJCLENBQW1DO0lBQzlELHFDQUFxQztJQUNyQyxXQUFXLENBQWdCO0lBQzNCLG9HQUFvRztJQUNwRyxlQUFlLENBQWdCO0lBQy9CLHVDQUF1QztJQUN2QyxNQUFNLENBQWdGO0lBQ3RGLG1KQUFtSjtJQUNuSixxQkFBcUIsQ0FBOEI7SUFDbkQsc0hBQXNIO0lBQ3RILFFBQVEsQ0FBc0I7SUFDOUIsbUNBQW1DO0lBQ25DLElBQUksQ0FBZ0I7SUFDcEIsZUFBZSxDQUFzQztJQUNyRCxzQ0FBc0M7SUFDdEMsWUFBWSxDQUFnRjtJQUM1RixzQ0FBc0M7SUFDdEMsaUJBQWlCLENBQXdDO0lBQ3pELG1IQUFtSDtJQUNuSCxPQUFPLENBQXNIO0lBQzdILCtDQUErQztJQUMvQyxRQUFRLENBQWM7SUFDdEIseUdBQXlHO0lBQ3pHLFlBQVksQ0FBc0U7SUFDbEYseUNBQXlDO0lBQ3pDLEtBQUssQ0FBVTtJQUNmLDBCQUEwQixDQUFnQjtJQUMxQyx5REFBeUQ7SUFDekQsVUFBVSxDQUFVO0lBQ3BCLG9IQUFvSDtJQUNwSCxZQUFZLENBQVU7SUFDdEIsZ0ZBQWdGO0lBQ2hGLHlCQUF5QixDQUFVO0lBQ25DLDBFQUEwRTtJQUMxRSxvQkFBb0IsQ0FBVTtJQUM5QiwyQ0FBMkM7SUFDM0MsV0FBVyxDQUFTO0lBQ3BCLHdDQUF3QztJQUN4QyxPQUFPLENBQStGO0lBQ3RHLHlJQUF5STtJQUN6SSxRQUFRLENBQVk7SUFDcEIsOEJBQThCO0lBQzlCLElBQUksQ0FBUztJQUNiLHlIQUF5SDtJQUN6SCxTQUFTLENBQWtCO0lBQzNCLCtCQUErQjtJQUMvQixLQUFLLENBQWU7SUFDcEIseUNBQXlDO0lBQ3pDLE9BQU8sQ0FBZ0I7SUFDdkIsbUdBQW1HO0lBQ25HLGVBQWUsQ0FBUztJQUN4Qix3REFBd0Q7SUFDeEQseUJBQXlCLENBQVU7SUFDbkMsaURBQWlEO0lBQ2pELHdCQUF3QixDQUFVO0lBQ2xDLHNIQUFzSDtJQUN0SCxXQUFXLENBQWU7SUFDMUIsaUZBQWlGO0lBQ2pGLE9BQU8sQ0FBbUM7SUFDMUMsZ0hBQWdIO0lBQ2hILG9CQUFvQixDQUFpRDtJQUNyRSwwSEFBMEg7SUFDMUgsc0JBQXNCLENBQWdCO0lBQ3RDLDRDQUE0QztJQUM1QyxNQUFNLENBQWlCO0lBQ3ZCLCtCQUErQjtJQUMvQixLQUFLLENBQWlFO0lBQ3RFLDZHQUE2RztJQUM3RyxZQUFZLENBQXNCO0lBQ2xDLHVIQUF1SDtJQUN2SCxjQUFjLENBQWdCO0lBQzlCLDJEQUEyRDtJQUMzRCxtQkFBbUIsQ0FBc0I7SUFDekMscUVBQXFFO0lBQ3JFLHFCQUFxQixDQUFnQjtJQUNyQywwQ0FBMEM7SUFDMUMsZUFBZSxDQUFnRjtJQUMvRiwyQ0FBMkM7SUFDM0MsZ0JBQWdCLENBQTREO0lBQzVFLDRDQUE0QztJQUM1QyxNQUFNLENBQWdCO0lBQ3RCLHlDQUF5QztJQUN6QyxjQUFjLENBQWdFO0lBQzlFLHlDQUF5QztJQUN6QyxRQUFRLENBQTBFO0lBQ2xGLHdFQUF3RTtJQUN4RSxhQUFhLENBQXNCO0lBQ25DLGlJQUFpSTtJQUNqSSxrQkFBa0IsQ0FBUztJQUMzQixrRkFBa0Y7SUFDbEYsZUFBZSxDQUFnQjtJQUMvQixpQ0FBaUM7SUFDakMsT0FBTyxDQUFvRjtJQUMzRixvQ0FBb0M7SUFDcEMsV0FBVyxDQUFVO0lBQ3JCLDBGQUEwRjtJQUMxRixhQUFhLENBQWdCO0lBQzdCLG1JQUFtSTtJQUNuSSxpQkFBaUIsQ0FBcUI7SUFDdEMscURBQXFEO0lBQ3JELFdBQVcsQ0FBeUQ7SUFDcEUsMEdBQTBHO0lBQzFHLGFBQWEsQ0FBOEI7SUFDM0Msd0ZBQXdGO0lBQ3hGLGFBQWEsQ0FBbUU7SUFDaEYsa0dBQWtHO0lBQ2xHLGVBQWUsQ0FBZ0I7SUFDL0IsZ0NBQWdDO0lBQ2hDLGFBQWEsQ0FBVztJQUN4QixZQUFZLElBQTJCLEVBQUUsTUFBYyxFQUFFLElBQWM7UUFDbkUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSx5QkFBZSxDQUFDLHVCQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLHlCQUFlLENBQUMsNEJBQWtCLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSx5QkFBZSxDQUFDLHNCQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDbEcsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFnQixFQUFFO2dCQUNqQyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEQsT0FBTyxpQkFBTyxDQUFDLElBQUksQ0FBK0MsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZGLENBQUM7WUFDRCxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQVEsRUFBRTtnQkFDakIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsQ0FBQztTQUNKLENBQWtHLENBQUM7UUFDcEcsSUFBSSxDQUFDLDJCQUEyQixHQUFHLElBQUksQ0FBQyw2QkFBNkIsQ0FBQztRQUN0RSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksMEJBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hKLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUM7UUFDMUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLHlCQUFlLENBQUMscUJBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLDBCQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RKLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSx5QkFBZSxDQUFDLDBCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLCtGQUErRjtRQUMvRixtR0FBbUc7UUFDbkcsNkVBQTZFO1FBQzdFLHVFQUF1RTtRQUN2RSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsd0JBQXdCLElBQUksQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1FBQy9HLElBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUM7UUFDdkMsdUVBQXVFO1FBQ3ZFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsd0JBQXdCLElBQUksQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSx5QkFBZSxDQUFDLGdCQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5RixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUUsQ0FBQztRQUM5RSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDN0MsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQztRQUNuRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUkseUJBQWUsQ0FBQyxjQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSx5QkFBZSxDQUFDLDZCQUFtQixFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzSCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSx5QkFBZSxDQUFDLG9CQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BILElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSx5QkFBZSxDQUFDLHVCQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25ILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSwwQkFBZ0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDaEosSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUNwRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUkseUJBQWUsQ0FBQyx1QkFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3RHLFNBQVMsRUFBRSxDQUFDLE1BQU0sRUFBaUIsRUFBRTtnQkFDakMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlDLE9BQU8saUJBQU8sQ0FBQyxJQUFJLENBQWtDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN6RSxDQUFDO1lBQ0QsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFRLEVBQUU7Z0JBQ2pCLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7U0FDSixDQUFzRixDQUFDO1FBQ3hGLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDakQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHlCQUFlLENBQUMsb0JBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFHLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQztRQUN0RCxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVwQiwwRkFBMEY7UUFDMUYsbUdBQW1HO1FBQ25HLDZFQUE2RTtRQUM3RSx1RUFBdUU7UUFDdkUsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsS0FBSyxNQUFNLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3RDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEMsQ0FBQztRQUNMLENBQUM7UUFFRCx1RUFBdUU7UUFDdkUsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDZixLQUFLLE1BQU0sVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDcEMsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwQyxDQUFDO1FBQ0wsQ0FBQztRQUVELHVFQUF1RTtRQUN2RSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNmLEtBQUssTUFBTSxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsU0FBUyxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdEYsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQzVELElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO2dCQUNoQyxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFFRCx1RUFBdUU7UUFDdkUsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsS0FBSyxNQUFNLGFBQWEsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQy9DLGFBQWEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDOUMsQ0FBQztRQUNMLENBQUM7UUFFRCx1RUFBdUU7UUFDdkUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsS0FBSyxNQUFNLFVBQVUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xFLFNBQVM7Z0JBQ2IsQ0FBQztnQkFDRCxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxVQUFVLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFnQyxDQUFDO2dCQUN4RixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0SCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDbkYsQ0FBQztnQkFDRCw2RkFBNkY7Z0JBQzdGLHVFQUF1RTtnQkFDdkUsSUFBSSxPQUFPLElBQUksY0FBYyxJQUFJLE9BQU8sRUFBRSxDQUFDO29CQUN2QyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckMsQ0FBQztnQkFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixJQUFJLFVBQVUsQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUNsSSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDO3dCQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUU7d0JBQ2hCLFNBQVMsRUFBRSxVQUFVLENBQUMsVUFBVTt3QkFDaEMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxTQUFTO3dCQUM5QixRQUFRLEVBQUUsVUFBVSxDQUFDLFNBQVM7d0JBRTlCLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7cUJBQ2hELENBQUMsQ0FBQztnQkFDUCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0dBQWdHO0lBQ2hHLElBQUksWUFBWTtRQUNaLElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsSCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3RCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNiLE1BQU0sSUFBSSxzQkFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLG1FQUFtRSxDQUFDLENBQUM7WUFDekgsQ0FBQztZQUVELE1BQU0sSUFBSSxzQkFBYSxDQUFDLCtDQUErQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksZ0JBQWdCLENBQUMsQ0FBQztRQUNsSCxDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFRCxnREFBZ0Q7SUFDaEQsSUFBSSxLQUFLO1FBQ0wsSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMvQixNQUFNLElBQUksU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLG9EQUFvRCxDQUFDLENBQUM7UUFDdEcsQ0FBQztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNoQyxNQUFNLElBQUksU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDBEQUEwRCxDQUFDLENBQUM7UUFDNUcsQ0FBQztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZixNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVHLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELDZMQUE2TDtJQUM3TCxJQUFJLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQy9CLE1BQU0sSUFBSSxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksNkRBQTZELENBQUMsQ0FBQztRQUMvRyxDQUFDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLE1BQU0sSUFBSSxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksbUVBQW1FLENBQUMsQ0FBQztRQUNySCxDQUFDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNmLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxnQ0FBZ0MsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDMUgsQ0FBQztRQUVELE9BQU8sQ0FBQyxPQUE0QyxFQUEyQyxFQUFFO1lBQzdGLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRWhELE9BQU87Z0JBQ0gsV0FBVyxFQUFFLENBQUMsT0FBMkMsRUFBUSxFQUFFO29CQUMvRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFdkMsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2FBQzNELENBQUM7UUFDTixDQUFDLENBQUM7SUFDTixDQUFDO0lBRU8sYUFBYSxDQUFDLE9BQTZCLEVBQUUsTUFBZSxFQUFFLE1BQWU7UUFDakYsTUFBTSxXQUFXLEdBQUcsTUFBTTtZQUN0QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDakYsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsdUJBQXVCO0lBQ2YsaUJBQWlCLENBQUMsS0FBb0I7UUFDMUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUNuRixPQUFPO1FBQ1gsQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3BDLE1BQU0sR0FBRyxHQUFHLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMzRSxNQUFNLEtBQUssR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0RCxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNqQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3RELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQzlCLE9BQU87WUFDWCxDQUFDO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQy9CLENBQUM7YUFBTSxDQUFDO1lBQ0osTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDOUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDOUIsT0FBTztZQUNYLENBQUM7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxnREFBZ0QsSUFBSSxDQUFDLEVBQUUsMEJBQTBCLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssNEJBQTRCLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssV0FBVyxDQUFDLENBQUM7SUFDdFAsQ0FBQztJQUVrQixNQUFNLENBQUMsSUFBb0M7UUFDMUQsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQWUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2xILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN2QyxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkwsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdDLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyx3QkFBd0IsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUM5QyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDO1FBQ2hFLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQywwQkFBMEIsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNoRCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDO1FBQ3BFLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzlCLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyw2QkFBNkIsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNuRCxJQUFJLENBQUMsMkJBQTJCLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDO1FBQzFFLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3hDLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRCxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEIsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUM5RCxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNsQyxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMxQixDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCO2dCQUMxRCxvQkFBb0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCO2FBQ3JFLENBQUM7UUFDTixDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQy9ELHNCQUFzQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyx5QkFBeUI7YUFDNUUsQ0FBQztRQUNOLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLDZCQUE2QixLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ25ELElBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUM7UUFDekUsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdkMsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDM0MsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLDZCQUE2QixLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ25ELElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUM7UUFDeEUsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLHVCQUF1QixLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUM7UUFDN0QsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDekMsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbkMsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDckMsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDO1FBQ3ZGLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRCxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsNEJBQTRCLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDbEQsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQztRQUN2RSxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsMEJBQTBCLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDaEQsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQztRQUNwRSxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN6QyxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNoQyxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMseUJBQXlCLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDL0MsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyx5QkFBeUIsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQXlDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQzVLLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUM7UUFDakUsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBYyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN2SCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQWMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDOUksSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztRQUMvRCxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM5QixDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEIsS0FBSyxNQUFNLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUTtnQkFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDMUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUN4RCxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFjLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzFILElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ2xELENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxlQUFlLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzlDLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ3JELENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRztnQkFDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVztnQkFDNUMsZUFBZSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDbEUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxVQUFVO29CQUM3QixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7b0JBQ2hDLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUTtvQkFDekIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxVQUFVO2lCQUNoQyxDQUFDLENBQUM7YUFDTixDQUFDO1FBQ04sQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLGlCQUFpQixLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBMkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDdkssSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDbEQsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDN0MsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsaUJBQWlCLENBQUMsU0FBaUIsRUFBRSxPQUFtRDtRQUMxRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsNEdBQTRHO0lBQzVHLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBYyxFQUFFLE9BQXNDO1FBQ2xFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQWdCLEVBQUUsTUFBYyxFQUFFLE1BQWU7UUFDakUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFNBQVMsQ0FBQyxNQUFvQixFQUFFLElBQWE7UUFDekMsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekgsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBd0M7UUFDckQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFvQztRQUM5QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLHdCQUF3QixDQUFDLE9BQTZEO1FBQ3hGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQWMsRUFBRSxPQUF1QztRQUNuRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxhQUFhLENBQXVELElBQU8sRUFBRSxPQUF3RDtRQUN2SSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUksSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBNkM7UUFDM0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBd0M7UUFDckQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxPQUEwRDtRQUNqRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsNkJBQTZCLENBQUMsT0FBZSxFQUFFLE9BQW1FO1FBQ3BILE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMscUJBQXFCLENBQUMsT0FBa0Q7UUFDMUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUEwQztRQUMxRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFrRDtRQUNuRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxLQUFhLEVBQUUsYUFBc0I7UUFDN0QsSUFBSSxhQUFhLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDM0UsTUFBTSxJQUFJLHNCQUFhLENBQUMsb01BQW9NLENBQUMsQ0FBQztRQUNsTyxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRTtZQUNwRyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDaEIsU0FBUyxFQUFFLGlDQUFxQixDQUFDLEtBQUs7WUFDdEMsS0FBSztTQUNSLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLHdCQUF3QixDQUFDLE1BQWMsRUFBRSxNQUFlO1FBQzFELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFlLEVBQUUsTUFBZTtRQUM5QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsaUJBQWlCLENBQUMsYUFBcUIsRUFBRSxNQUFlO1FBQzFELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFjLEVBQUUsTUFBZTtRQUM1QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQUMsT0FBZSxFQUFFLE1BQWU7UUFDdkQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxLQUFLLENBQUMsNkJBQTZCLENBQUMsT0FBZSxFQUFFLFdBQW1CLEVBQUUsTUFBZTtRQUNyRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEcsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMscUJBQXFCLENBQUMsT0FBZSxFQUFFLE1BQWU7UUFDeEQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsTUFBZTtRQUNsRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBWTtRQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQWU7UUFDbEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFlO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQWU7UUFDaEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE1BQWU7UUFDbkMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGtCQUFrQixDQUFDLE1BQW9CLEVBQUUsSUFBYTtRQUNsRCxPQUFPLElBQUksQ0FBQyxlQUFlLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNKLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQXNDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLHNCQUFzQixDQUFDLE1BQWMsRUFBRSxPQUEyRDtRQUNwRyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLG9CQUFvQixDQUFDLE9BQXdEO1FBQy9FLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUE4QztRQUNsRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMseUJBQXlCLENBQUMsT0FBc0Q7UUFDbEYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFlLEVBQUUsT0FBMkM7UUFDeEUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsbUJBQW1CLENBQUMsT0FBZ0Q7UUFDdEUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBZ0IsRUFBRSxPQUF1QztRQUN0RSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBMkM7UUFDNUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBYyxFQUFFLE9BQXFDO1FBQ2hFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE9BQW1ELEVBQUUsTUFBZTtRQUN4RixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBd0IsRUFBRSxPQUF3RDtRQUN2RyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsS0FBSyxDQUFDLDJCQUEyQixDQUFDLE9BQWUsRUFBRSxXQUFtQixFQUFFLE9BQWlFO1FBQ3JJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxPQUFlLEVBQUUsT0FBZ0Q7UUFDdkYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBaUIsRUFBRSxPQUF3QztRQUN6RSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLElBQVksRUFBRSxPQUFxRDtRQUNsRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsa0JBQWtCLENBQUMsUUFBZ0IsRUFBRSxPQUErQztRQUN0RixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE9BQThDO1FBQ2xFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBb0M7UUFDakQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBZTtRQUNqQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFlO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQWU7UUFDL0IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQWU7UUFDbEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBa0Q7UUFDakUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxnQkFBZ0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQTJDO1FBQ3pELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMscUJBQXFCLENBQUMsTUFBYztRQUN0QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxzQkFBc0I7UUFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQWM7UUFDdkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBcUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQWU7UUFDMUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUF1RSxFQUFFLGFBQXNCO1FBQ2pILElBQUksYUFBYSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzNFLE1BQU0sSUFBSSxzQkFBYSxDQUFDLG9NQUFvTSxDQUFDLENBQUM7UUFDbE8sQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3hJLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBaUQ7UUFDbkUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBZ0I7UUFDNUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBd0M7UUFDckQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLG1CQUFtQjtRQUNyQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUEyQztRQUMzRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFjO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxtQkFBbUI7UUFDckIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUFlLEVBQUUsYUFBc0I7UUFDM0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxLQUFLLENBQUMsK0JBQStCLENBQUMsT0FBZSxFQUFFLFdBQW1CLEVBQUUsT0FBNkQ7UUFDckksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNHLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsa0JBQWtCLENBQUMsYUFBc0I7UUFDM0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLDJCQUEyQixDQUFDLE9BQWUsRUFBRSxPQUFrRTtRQUNqSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLHNCQUFzQixDQUFDLE9BQWUsRUFBRSxPQUE2RDtRQUN2RyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE9BQWU7UUFDcEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsbUJBQW1CO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFpQjtRQUM5QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQWdCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBcUM7UUFDdEQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxpQkFBaUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsT0FBTyxDQUFDLE1BQW9CLEVBQUUsSUFBYTtRQUN2QyxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6SCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVyxDQUFDLE9BQXFGO1FBQzdGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztZQUNoQyxHQUFHLE9BQU87WUFFVixtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CO1lBQzdDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELGdFQUFnRTtJQUNoRSxZQUFZO1FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQTBDLEVBQUUsd0JBQXdCLEdBQUcsSUFBSTtRQUMxRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsYUFBYSxDQUFDLE1BQXVCO1FBQ2pDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDN0IsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBRSxDQUFDO1FBQ3ZDLENBQUM7UUFDRCw4RkFBOEY7UUFDOUYsK0ZBQStGO1FBQy9GLHVFQUF1RTtRQUN2RSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDVixNQUFNLElBQUksc0JBQWEsQ0FBQyxjQUFjLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSwwREFBMEQsQ0FBQyxDQUFDO1FBQzNILENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdCLE9BQU8sSUFBSSxvQkFBVSxDQUFDLDBCQUFjLENBQUMsQ0FBQztRQUMxQyxDQUFDO2FBQU0sQ0FBQztZQUNKLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUM1RCxJQUFJLFdBQVcsR0FBRyx1QkFBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMxQyxPQUFPLElBQUksb0JBQVUsQ0FBQywwQkFBYyxDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUNELEtBQUssTUFBTSxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM1QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNSLFNBQVM7Z0JBQ2IsQ0FBQztnQkFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyx1QkFBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNwRCxXQUFXLEdBQUcsMEJBQWMsQ0FBQztvQkFDN0IsTUFBTTtnQkFDVixDQUFDO3FCQUFNLENBQUM7b0JBQ0osV0FBVyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDekMsQ0FBQztZQUNMLENBQUM7WUFDRCxPQUFPLElBQUksb0JBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2QyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQWMsRUFBRSxNQUFlO1FBQzNDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBZ0IsRUFBRSxNQUFlO1FBQ2hELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBZ0IsRUFBRSxNQUFjLEVBQUUsTUFBZTtRQUNwRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxPQUFnRDtRQUNyRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFrRDtRQUNuRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLHVCQUF1QixDQUFDLE9BQXNEO1FBQ2hGLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQTBDO1FBQzFELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGNBQWMsQ0FBNEksT0FBNEMsRUFBRSx3QkFBd0IsR0FBRyxJQUFJO1FBQ3pPLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBSSxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsU0FBUyxDQUFDLE1BQW9CLEVBQUUsSUFBYTtRQUN6QyxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFZO1FBQzNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFUSxNQUFNO1FBQ1gsT0FBTztZQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDL0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxJQUFJLFNBQVM7WUFDNUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQjtZQUNuRCx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCO1lBQ3ZELG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDbEQsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQjtZQUM3RCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUM3QixxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCO1lBQ2pELFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksSUFBSTtZQUMxQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUMvQix5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCO1lBQ3pELG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0I7WUFDL0MsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDOUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLHlCQUF5QixFQUFFLElBQUksQ0FBQyx5QkFBeUI7WUFDekQsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QjtZQUN2RCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLHNCQUFzQixFQUFFLElBQUksQ0FBQyxzQkFBc0I7WUFDbkQsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM1QyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDbkMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdEUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2pDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCO1lBQzNDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDOUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNqQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCO1lBQ3pDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMxRCxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtTQUNwQyxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBcGlERCx3QkFvaURDIn0=