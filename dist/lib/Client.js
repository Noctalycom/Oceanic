"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const RESTManager_1 = tslib_1.__importDefault(require("./rest/RESTManager"));
const TypedCollection_1 = tslib_1.__importDefault(require("./util/TypedCollection"));
const PrivateChannel_1 = tslib_1.__importDefault(require("./structures/PrivateChannel"));
const GroupChannel_1 = tslib_1.__importDefault(require("./structures/GroupChannel"));
const User_1 = tslib_1.__importDefault(require("./structures/User"));
const Guild_1 = tslib_1.__importDefault(require("./structures/Guild"));
const TypedEmitter_1 = tslib_1.__importDefault(require("./util/TypedEmitter"));
const ShardManager_1 = tslib_1.__importDefault(require("./gateway/ShardManager"));
const UnavailableGuild_1 = tslib_1.__importDefault(require("./structures/UnavailableGuild"));
const Util_1 = tslib_1.__importDefault(require("./util/Util"));
const Errors_1 = require("./util/Errors");
const node_util_1 = require("node:util");
// @ts-ignore
let DiscordJSVoice;
try {
    DiscordJSVoice = require("@discordjs/voice");
}
catch { }
/* eslint-enable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment, unicorn/prefer-module */
/** The primary class for interfacing with Discord. See {@link Types.Events.ClientEvents | Client Events} for a list of events. */
class Client extends TypedEmitter_1.default {
    _application;
    _user;
    /** A key-value mapping of channel IDs to guild IDs. In most cases, every channel listed here should be cached in their respective guild's {@link Guild#channels | channels collection}. */
    channelGuildMap = new Map();
    groupChannels;
    guildShardMap = new Map();
    guilds;
    options;
    privateChannels;
    ready;
    rest;
    shards;
    startTime = 0;
    /** A key-value mapping of thread IDs to guild IDs. In most cases, every channel listed here should be cached in their respective guild's {@link Guild#threads | threads collection}. */
    threadGuildMap = new Map();
    unavailableGuilds;
    users;
    util;
    voiceAdapters = new Map();
    /**
     * @constructor
     * @param options The options to create the client with.
     */
    constructor(options) {
        super();
        this.util = new Util_1.default(this);
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
            voiceStates: 0
        };
        this.options = {
            allowedMentions: options?.allowedMentions ?? {
                everyone: false,
                repliedUser: false,
                users: true,
                roles: true
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
                voiceStates: this.util._setLimit(options?.collectionLimits?.voiceStates, Infinity)
            },
            defaultImageFormat: options?.defaultImageFormat ?? "png",
            defaultImageSize: options?.defaultImageSize ?? 4096,
            disableMemberLimitScaling: options?.disableMemberLimitScaling ?? false,
            restMode: false,
            disableCache
        };
        if (options?.disableCache === true) {
            process.emitWarning("Enabling the disableCache option is not recommended. This will break many aspects of the library, as it is not designed to function without cache.", {
                code: "OCEANIC_CACHE_DISABLED",
                detail: "Set the disableCache option to the literal string \"no-warning\" to disable this warning."
            });
        }
        if (disableCache && options?.collectionLimits !== undefined && !(0, node_util_1.isDeepStrictEqual)(options.collectionLimits, colZero)) {
            process.emitWarning("Providing the collectionsLimit option when the disableCache option has been enabled is redundant. Any provided values will be ignored.", {
                code: "OCEANIC_COLLECTIONS_LIMIT_WITH_CACHE_DISABLED",
                detail: "Remove the collectionsLimit option, or zero out all of the possible options to disable this warning."
            });
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
    get uptime() {
        return this.startTime ? Date.now() - this.startTime : 0;
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return DiscordJSVoice.getVoiceConnections();
    }
    /** Connect the client to Discord. */
    async connect() {
        if (this.options.restMode) {
            throw new TypeError("Rest mode has been enabled on this client. You cannot connect to the gateway.");
        }
        if (!this.options.auth || !this.options.auth.startsWith("Bot ")) {
            throw new TypeError("You must provide a bot token to connect. Make sure it has been prefixed with `Bot `.");
        }
        await this.shards.connect();
    }
    /**
     * Disconnect all shards.
     * @param reconnect If shards should be reconnected. Defaults to {@link Types/Gateway~GatewayOptions#autoReconnect | GatewayOptions#autoReconnect}
     */
    disconnect(reconnect = this.shards.options.autoReconnect) {
        return this.shards.disconnect(reconnect);
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return DiscordJSVoice.joinVoiceChannel({
            channelId: options.channelID,
            guildId: options.guildID,
            debug: options.debug,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            adapterCreator: options.voiceAdapterCreator,
            selfDeaf: options.selfDeaf,
            selfMute: options.selfMute
        });
    }
    /**
     * Leave a voice channel.
     * @param guildID The ID of the guild the voice channel belongs to.
     */
    leaveVoiceChannel(guildID) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL0NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw2RUFBNkM7QUFDN0MscUZBQXFEO0FBQ3JELHlGQUF5RDtBQUN6RCxxRkFBcUQ7QUFDckQscUVBQXFDO0FBQ3JDLHVFQUF1QztBQUN2QywrRUFBK0M7QUFFL0Msa0ZBQWtEO0FBQ2xELDZGQUE2RDtBQUU3RCwrREFBK0I7QUFDL0IsMENBQStEO0FBTS9ELHlDQUE4QztBQUU5QyxhQUFhO0FBQ2IsSUFBSSxjQUE2RCxDQUFDO0FBQ2xFLElBQUksQ0FBQztJQUNELGNBQWMsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztBQUNWLDRNQUE0TTtBQUU1TSxrSUFBa0k7QUFDbEksTUFBcUIsTUFBd0UsU0FBUSxzQkFBZTtJQUN4RyxZQUFZLENBQXFCO0lBQ2pDLEtBQUssQ0FBZ0I7SUFDN0IsMkxBQTJMO0lBQzNMLGVBQWUsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztJQUM1QyxhQUFhLENBQWdFO0lBQzdFLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztJQUMxQyxNQUFNLENBQWtFO0lBQ3hFLE9BQU8sQ0FBcUM7SUFDNUMsZUFBZSxDQUFvRTtJQUNuRixLQUFLLENBQVU7SUFDZixJQUFJLENBQWM7SUFDbEIsTUFBTSxDQUFlO0lBQ3JCLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDZCx3TEFBd0w7SUFDeEwsY0FBYyxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO0lBQzNDLGlCQUFpQixDQUFzRTtJQUN2RixLQUFLLENBQTZDO0lBQ2xELElBQUksQ0FBTztJQUNYLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBK0MsQ0FBQztJQUN2RTs7O09BR0c7SUFDSCxZQUFZLE9BQW9DO1FBQzVDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFB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