"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Client */
const node_util_1 = require("node:util");
const ShardManager_1 = tslib_1.__importDefault(require("./gateway/ShardManager"));
const RESTManager_1 = tslib_1.__importDefault(require("./rest/RESTManager"));
const GroupChannel_1 = tslib_1.__importDefault(require("./structures/GroupChannel"));
const Guild_1 = tslib_1.__importDefault(require("./structures/Guild"));
const PrivateChannel_1 = tslib_1.__importDefault(require("./structures/PrivateChannel"));
const UnavailableGuild_1 = tslib_1.__importDefault(require("./structures/UnavailableGuild"));
const User_1 = tslib_1.__importDefault(require("./structures/User"));
const Errors_1 = require("./util/Errors");
const Time_1 = tslib_1.__importDefault(require("./util/Time"));
const TypedCollection_1 = tslib_1.__importDefault(require("./util/TypedCollection"));
const TypedEmitter_1 = tslib_1.__importDefault(require("./util/TypedEmitter"));
const Util_1 = tslib_1.__importDefault(require("./util/Util"));
const warning_1 = require("./util/warning");
// @ts-ignore optional dependency
let DiscordJSVoice;
try {
    DiscordJSVoice = require("@discordjs/voice");
    // eslint-disable-next-line no-empty
}
catch { }
/* eslint-enable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports */
/** The primary class for interfacing with Discord. See {@link Types.Events.ClientEvents | Client Events} for a list of events. */
class Client extends TypedEmitter_1.default {
    _application;
    _user;
    /** A key-value mapping of channel IDs to guild IDs. In most cases, every channel listed here should be cached in their respective guild's {@link Guild#channels | channels collection}. */
    channelGuildMap = new Map();
    groupChannels;
    guilds;
    guildShardMap = new Map();
    options;
    privateChannels;
    ready;
    rest;
    shards;
    /** A key-value mapping of thread IDs to guild IDs. In most cases, every channel listed here should be cached in their respective guild's {@link Guild#threads | threads collection}. */
    threadGuildMap = new Map();
    time = new Time_1.default(this);
    unavailableGuilds;
    users;
    util = new Util_1.default(this);
    voiceAdapters = new Map();
    /**
     * @constructor
     * @param options The options to create the client with.
     */
    constructor(options) {
        super();
        this.time.set("start", Date.now());
        const disableCache = options?.disableCache === true || options?.disableCache === "no-warning";
        const colZero = {
            auditLogEntries: 0,
            autoModerationRules: 0,
            channels: 0,
            emojis: 0,
            groupChannels: 0,
            guilds: 0,
            guildThreads: 0,
            integrations: 0,
            invites: 0,
            members: 0,
            messages: 0,
            privateChannels: 0,
            roles: 0,
            scheduledEvents: 0,
            soundboardSounds: 0,
            stageInstances: 0,
            stickers: 0,
            unavailableGuilds: 0,
            users: 0,
            voiceMembers: 0,
            voiceStates: 0,
        };
        if (options?.token) {
            if (options.auth)
                (0, warning_1.warning)(warning_1.WarningCodes.OCEANIC_AUTH_AND_TOKEN_PROVIDED);
            else
                options.auth = this._prefixToken(options.token);
            delete options.token;
        }
        this.options = {
            allowedMentions: options?.allowedMentions ?? {
                everyone: false,
                repliedUser: false,
                users: true,
                roles: true,
            },
            auth: options?.auth ?? null,
            collectionLimits: disableCache ? colZero : {
                auditLogEntries: this.util._setLimit(options?.collectionLimits?.auditLogEntries, 50),
                autoModerationRules: this.util._setLimit(options?.collectionLimits?.autoModerationRules, Infinity),
                channels: this.util._setLimit(options?.collectionLimits?.channels, Infinity),
                emojis: this.util._setLimit(options?.collectionLimits?.emojis, Infinity),
                groupChannels: options?.collectionLimits?.groupChannels ?? 10,
                guilds: options?.collectionLimits?.guilds ?? Infinity,
                guildThreads: this.util._setLimit(options?.collectionLimits?.guildThreads, Infinity),
                integrations: this.util._setLimit(options?.collectionLimits?.integrations, Infinity),
                invites: this.util._setLimit(options?.collectionLimits?.invites, Infinity),
                members: this.util._setLimit(options?.collectionLimits?.members, Infinity),
                messages: this.util._setLimit(options?.collectionLimits?.messages, 100),
                privateChannels: options?.collectionLimits?.privateChannels ?? 25,
                roles: this.util._setLimit(options?.collectionLimits?.roles, Infinity),
                scheduledEvents: this.util._setLimit(options?.collectionLimits?.scheduledEvents, Infinity),
                soundboardSounds: this.util._setLimit(options?.collectionLimits?.soundboardSounds, Infinity),
                stageInstances: this.util._setLimit(options?.collectionLimits?.stageInstances, Infinity),
                stickers: this.util._setLimit(options?.collectionLimits?.stickers, Infinity),
                unavailableGuilds: options?.collectionLimits?.unavailableGuilds ?? Infinity,
                users: options?.collectionLimits?.users ?? Infinity,
                voiceMembers: this.util._setLimit(options?.collectionLimits?.voiceMembers, Infinity),
                voiceStates: this.util._setLimit(options?.collectionLimits?.voiceStates, Infinity),
            },
            defaultImageFormat: options?.defaultImageFormat ?? "png",
            defaultImageSize: options?.defaultImageSize ?? 4096,
            disableMemberLimitScaling: options?.disableMemberLimitScaling ?? false,
            restMode: false,
            disableCache,
        };
        if (options?.disableCache === true) {
            (0, warning_1.warning)(warning_1.WarningCodes.OCEANIC_CACHE_DISABLED);
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (disableCache && options?.collectionLimits !== undefined && !(0, node_util_1.isDeepStrictEqual)(options.collectionLimits, colZero)) {
            (0, warning_1.warning)(warning_1.WarningCodes.OCEANIC_COLLECTIONS_LIMIT_WITH_CACHE_DISABLED);
        }
        this.groupChannels = new TypedCollection_1.default(GroupChannel_1.default, this, this.options.collectionLimits.groupChannels);
        this.guilds = new TypedCollection_1.default(Guild_1.default, this, this.options.collectionLimits.guilds);
        this.privateChannels = new TypedCollection_1.default(PrivateChannel_1.default, this, this.options.collectionLimits.privateChannels);
        this.ready = false;
        this.rest = new RESTManager_1.default(this, options?.rest);
        this.shards = new ShardManager_1.default(this, options?.gateway);
        this.unavailableGuilds = new TypedCollection_1.default(UnavailableGuild_1.default, this, this.options.collectionLimits.unavailableGuilds);
        this.users = new TypedCollection_1.default(User_1.default, this, this.options.collectionLimits.users);
    }
    /** The client's partial application. This will throw an error if not using a gateway connection or no shard is READY. If using a client for rest only, consider enabling rest mode. */
    get application() {
        if (this._application) {
            return this._application;
        }
        else {
            throw new Errors_1.UncachedError(`${this.constructor.name}#application is not present if not using a gateway connection or no shard is READY. Consider making sure you have connected your client, or enable rest mode.`);
        }
    }
    /** @deprecated Use {@link Time.start | time.start}. */
    get startTime() {
        return this.time.start ?? 0;
    }
    get uptime() {
        return this.time.start === null ? 0 : Date.now() - this.time.start;
    }
    /** The client's user. This will throw an error if not using a gateway connection or no shard is READY. If using a client for rest only, consider enabling rest mode. */
    get user() {
        if (this._user) {
            return this._user;
        }
        else {
            throw new Errors_1.UncachedError(`${this.constructor.name}#user is not present if not using a gateway connection or no shard is READY. Consider making sure you have connected your client, or enable rest mode.`);
        }
    }
    /** The active voice connections of this client. */
    get voiceConnections() {
        if (!DiscordJSVoice) {
            throw new Errors_1.DependencyError("Voice is only supported with @discordjs/voice installed.");
        }
        return DiscordJSVoice.getVoiceConnections();
    }
    /** The function called to prefix the `token` option. This will always be called if the {@link Types.Client.ClientOptions#token | token} option is set. */
    _prefixToken(token) {
        return token.startsWith("Bot ") ? token : `Bot ${token}`;
    }
    /** Connect the client to Discord. */
    async connect() {
        if (this.options.restMode) {
            throw new TypeError("Rest mode has been enabled on this client. You cannot connect to the gateway.");
        }
        if (!this.options.auth?.startsWith("Bot ")) {
            throw new TypeError("You must provide a bot token to connect. Make sure it has been prefixed with `Bot `.");
        }
        await this.shards.connect();
    }
    /**
     * Disconnect all shards.
     * @param reconnect If shards should be reconnected. Defaults to {@link Types/Gateway~GatewayOptions#autoReconnect | GatewayOptions#autoReconnect}
     */
    disconnect(reconnect = this.shards.options.autoReconnect) {
        this.shards.disconnect(reconnect);
    }
    /**
     * Edit the client's status across all shards.
     * @param status The status.
     * @param activities An array of activities.
     */
    async editStatus(status, activities = []) {
        for (const [, shard] of this.shards)
            await shard.editStatus(status, activities);
    }
    /**
     * Get a channel from an ID. This will return undefined if the channel is not cached.
     * @param channelID The id of the channel.
     */
    getChannel(channelID) {
        if (this.channelGuildMap.has(channelID)) {
            return this.guilds.get(this.channelGuildMap.get(channelID))?.channels.get(channelID);
        }
        else if (this.threadGuildMap.has(channelID)) {
            return this.guilds.get(this.threadGuildMap.get(channelID))?.threads.get(channelID);
        }
        return (this.privateChannels.get(channelID) ?? this.groupChannels.get(channelID));
    }
    /**
     * Get a helper instance that can be used with a specific access token.
     * @param accessToken The access token. Must be prefixed with `Bearer `.
     */
    getOAuthHelper(accessToken) {
        return this.rest.oauth.getHelper(accessToken);
    }
    /**
     * Get a voice connection.
     * @param guildID The ID of the guild the voice channel belongs to.
     */
    getVoiceConnection(guildID) {
        if (!DiscordJSVoice) {
            throw new Errors_1.DependencyError("Voice is only supported with @discordjs/voice installed.");
        }
        return DiscordJSVoice.getVoiceConnection(guildID);
    }
    /**
     * Join a voice channel.
     * @param options The options to join the channel with.
     * */
    joinVoiceChannel(options) {
        if (!DiscordJSVoice) {
            throw new Errors_1.DependencyError("Voice is only supported with @discordjs/voice installed.");
        }
        return DiscordJSVoice.joinVoiceChannel({
            channelId: options.channelID,
            guildId: options.guildID,
            debug: options.debug,
            adapterCreator: options.voiceAdapterCreator,
            selfDeaf: options.selfDeaf,
            selfMute: options.selfMute,
        });
    }
    /**
     * Leave a voice channel.
     * @param guildID The ID of the guild the voice channel belongs to.
     */
    leaveVoiceChannel(guildID) {
        return this.getVoiceConnection(guildID)?.destroy();
    }
    /**
     * Initialize this client for rest only use. Currently, this sets both the `application` and `user` properties (if not already present), as would happen with a gateway connection.
     * @param fakeReady If the client should emit a ready event. Defaults to true.
     */
    async restMode(fakeReady = true) {
        this._application ??= await this.rest.applications.getCurrent();
        this._user ??= await this.rest.oauth.getCurrentUser();
        this.options.restMode = true;
        if (fakeReady) {
            this.emit("ready");
        }
        return this;
    }
}
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL0NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQkFBcUI7QUFDckIseUNBQThDO0FBRTlDLGtGQUFrRDtBQUNsRCw2RUFBNkM7QUFDN0MscUZBQXFEO0FBQ3JELHVFQUF1QztBQUN2Qyx5RkFBeUQ7QUFDekQsNkZBQTZEO0FBQzdELHFFQUFxQztBQUNyQywwQ0FBK0Q7QUFDL0QsK0RBQStCO0FBQy9CLHFGQUFxRDtBQUNyRCwrRUFBK0M7QUFDL0MsK0RBQStCO0FBQy9CLDRDQUF1RDtBQVV2RCxpQ0FBaUM7QUFDakMsSUFBSSxjQUE2RCxDQUFDO0FBQ2xFLElBQUksQ0FBQztJQUNELGNBQWMsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNqRCxvQ0FBb0M7QUFDcEMsQ0FBQztBQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7QUFDVixxSUFBcUk7QUFFckksa0lBQWtJO0FBQ2xJLE1BQXFCLE1BQXdFLFNBQVEsc0JBQWU7SUFDeEcsWUFBWSxDQUFxQjtJQUNqQyxLQUFLLENBQWdCO0lBQzdCLDJMQUEyTDtJQUMzTCxlQUFlLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7SUFDNUMsYUFBYSxDQUFnRTtJQUM3RSxNQUFNLENBQWtFO0lBQ3hFLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztJQUMxQyxPQUFPLENBQXFDO0lBQzVDLGVBQWUsQ0FBb0U7SUFDbkYsS0FBSyxDQUFVO0lBQ2YsSUFBSSxDQUFjO0lBQ2xCLE1BQU0sQ0FBZTtJQUNyQix3TEFBd0w7SUFDeEwsY0FBYyxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO0lBQzNDLElBQUksR0FBRyxJQUFJLGNBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixpQkFBaUIsQ0FBc0U7SUFDdkYsS0FBSyxDQUE2QztJQUNsRCxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFB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