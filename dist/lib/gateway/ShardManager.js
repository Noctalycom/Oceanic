"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module ShardManager */
const Constants_1 = require("../Constants");
const Collection_1 = tslib_1.__importDefault(require("../util/Collection"));
const Errors_1 = require("../util/Errors");
const config_1 = tslib_1.__importDefault(require("./compression/config"));
const Dispatcher_1 = tslib_1.__importDefault(require("./Dispatcher"));
const Shard_1 = tslib_1.__importDefault(require("./Shard"));
/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports */
// @ts-ignore
let Erlpack;
try {
    Erlpack = require("erlpack");
    // eslint-disable-next-line no-empty
}
catch { }
/* eslint-enable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports */
/** A manager for all the client's shards. */
class ShardManager extends Collection_1.default {
    _buckets;
    _connectQueue;
    _connectTimeout;
    _gatewayURL;
    client;
    connected = false;
    dispatcher;
    options;
    constructor(client, options = {}) {
        super();
        Object.defineProperty(this, "client", {
            value: client,
            writable: false,
            enumerable: false,
            configurable: false,
        });
        this._buckets = {};
        this._connectQueue = [];
        this._connectTimeout = null;
        this.options = {
            autoReconnect: options.autoReconnect ?? true,
            compress: options.compress ?? false,
            compressLibrary: options.compressLibrary ?? null,
            connectionProperties: {
                browser: options.connectionProperties?.browser ?? "Oceanic",
                device: options.connectionProperties?.device ?? "Oceanic",
                os: options.connectionProperties?.os ?? process.platform,
            },
            concurrency: options.concurrency === "auto" || (options.concurrency && options.concurrency < 1) ? -1 : options.concurrency ?? -1,
            connectionTimeout: options.connectionTimeout ?? 30000,
            dispatcher: {
                blacklist: options.dispatcher?.blacklist ?? null,
                whitelist: options.dispatcher?.whitelist ?? null,
            },
            firstShardID: options.firstShardID && options.firstShardID < 0 ? 0 : options.firstShardID ?? 0,
            getAllUsers: options.getAllUsers ?? false,
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            override: options.override ?? {
                appendQuery: true,
                gatewayURLIsResumeURL: false,
                timeBetweenShardConnects: 5000,
            },
            guildCreateTimeout: options.guildCreateTimeout ?? 2000,
            intents: typeof options.intents === "number" ? options.intents : 0,
            largeThreshold: options.largeThreshold ?? 250,
            lastShardID: options.lastShardID ?? -1,
            lookupDisallowedIntents: options.lookupDisallowedIntents ?? false,
            maxReconnectAttempts: options.maxReconnectAttempts ?? Infinity,
            maxResumeAttempts: options.maxResumeAttempts ?? 10,
            maxShards: options.maxShards === "auto" || (options.maxShards && options.maxShards < 1) ? -1 : options.maxShards ?? -1,
            presence: {
                activities: options.presence?.activities ?? [],
                afk: options.presence?.afk ?? false,
                status: options.presence?.status ?? "online",
            },
            reconnectDelay: options.reconnectDelay ?? ((lastDelay, attempts) => Math.pow(attempts + 1, 0.7) * 20000),
            removeDisallowedIntents: options.removeDisallowedIntents ?? false,
            seedVoiceConnections: options.seedVoiceConnections ?? false,
            shardIDs: options.shardIDs ?? [],
            ws: options.ws ?? {},
        };
        if (this.options.compress) {
            const types = Object.keys(config_1.default);
            if (!types.includes(this.options.compress)) {
                throw new Error(`Invalid compress type: ${this.options.compress}`);
            }
            if (this.options.compressLibrary) {
                const config = config_1.default[this.options.compress].find(cnf => cnf.name === this.options.compressLibrary);
                if (!config) {
                    throw new Error(`Invalid library "${this.options.compressLibrary}" for ${this.options.compress}`);
                }
                if (!config.check(client)) {
                    throw config.getError();
                }
            }
            else {
                const available = config_1.default[this.options.compress] ?? [];
                const usable = available.find(av => av.check(client));
                if (!usable) {
                    throw new Errors_1.DependencyError(`Unable to find a usable ${this.options.compress} compressor`);
                }
                this.options.compressLibrary = usable.name;
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        this.options.override.appendQuery ??= (this.options.override.getBot === undefined && this.options.override.url === undefined);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        this.options.override.gatewayURLIsResumeURL ??= (this.options.override.getBot !== undefined || this.options.override.url !== undefined);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        this.options.override.timeBetweenShardConnects ??= 5000;
        if (this.options.lastShardID === -1 && this.options.maxShards !== -1) {
            this.options.lastShardID = this.options.maxShards - 1;
        }
        if (!Array.isArray(this.options.shardIDs)) {
            this.options.shardIDs = [];
        }
        if (Object.hasOwn(options, "intents")) {
            if (Array.isArray(options.intents)) {
                let bitmask = 0;
                for (const intent of options.intents) {
                    if (typeof intent === "number") {
                        bitmask |= intent;
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    }
                    else if (Constants_1.Intents[intent]) {
                        bitmask |= Constants_1.Intents[intent];
                    }
                    else {
                        if (intent === "ALL") {
                            bitmask = Constants_1.AllIntents;
                            break;
                        }
                        else if (intent === "ALL_NON_PRIVILEGED") {
                            bitmask = Constants_1.AllNonPrivilegedIntents;
                            continue;
                        }
                        client.emit("warn", `Unknown intent: ${intent}`);
                    }
                }
                this.options.intents = bitmask;
            }
        }
        else {
            this.options.intents = Constants_1.AllNonPrivilegedIntents;
        }
        if (this.options.getAllUsers && !(this.options.intents & Constants_1.Intents.GUILD_MEMBERS)) {
            throw new TypeError("Guild members cannot be requested without the GUILD_MEMBERS intent");
        }
        Object.defineProperty(this, "dispatcher", {
            value: new Dispatcher_1.default(this),
            writable: false,
            enumerable: false,
            configurable: false,
        });
    }
    _connect(shard) {
        this._connectQueue.push(shard);
        this.tryConnect();
    }
    _forGuild(guild) {
        if (this.options.maxShards === -1) {
            return undefined;
        }
        return this.get((this.client.guildShardMap.get(guild) ?? Number((BigInt(guild) >> 22n) % BigInt(this.options.maxShards))));
    }
    async _gatewayURLForShard(shard) {
        if (this.options.override.url !== undefined) {
            return this.options.override.url(shard, this.options.shardIDs.length);
        }
        if (this._gatewayURL) {
            return this._gatewayURL;
        }
        // how did we manage to get all the way to connecting without gatewayURL being set?
        return (this._gatewayURL = (await (this.options.override.getBot?.() ?? this.client.rest.getBotGateway())).url);
    }
    _ready(id) {
        const mod = id % this.options.concurrency;
        const rateLimitKey = isNaN(mod) ? 0 : mod;
        this._buckets[rateLimitKey] = Date.now();
        this.tryConnect();
    }
    _resetConnectQueue() {
        this._connectQueue = [];
    }
    async connect() {
        if (this.connected) {
            throw new Error("Already connected.");
        }
        let url, data;
        const overrideURL = (this.options.override.getBot ?? this.options.override.url) !== undefined;
        try {
            if (this.options.maxShards === -1 || this.options.concurrency === -1) {
                data = await (this.options.override.getBot?.() ?? this.client.rest.getBotGateway());
                url = data.url;
            }
            else {
                url = overrideURL ? null : (await this.client.rest.getGateway()).url;
            }
        }
        catch (err) {
            throw new TypeError("Failed to get gateway information.", { cause: err });
        }
        if (url && this.options.override.appendQuery) {
            if (url.includes("?")) {
                url = url.slice(0, url.indexOf("?"));
            }
            if (!url.endsWith("/")) {
                url += "/";
            }
        }
        if (this.options.removeDisallowedIntents && Constants_1.PrivilegedIntentMapping.some(([intent]) => (this.options.intents & intent) === intent)) {
            const { flags } = await this.client.rest.applications.getCurrent();
            const check = (intent, allowed) => {
                if ((this.options.intents & intent) === intent && !allowed.some(flag => (flags & flag) === flag)) {
                    this.client.emit("warn", `removeDisallowedIntents is enabled, and ${Constants_1.Intents[intent]} was included but not found to be allowed. It has been removed.`);
                    this.options.intents &= ~intent;
                }
            };
            for (const [intent, allowed] of Constants_1.PrivilegedIntentMapping) {
                check(intent, allowed);
            }
        }
        if (url && this.options.override.appendQuery) {
            url += `?v=${Constants_1.GATEWAY_VERSION}&encoding=${Erlpack ? "etf" : "json"}`;
            if (this.options.compress) {
                const type = this.options.compress === "zstd-stream" ? "zstd-stream" : "zlib-stream";
                url += `&compress=${type}`;
            }
            this._gatewayURL = url;
        }
        if (this.options.maxShards === -1) {
            if (!data?.shards) {
                throw new TypeError("AutoSharding failed, missing required information from Discord.");
            }
            this.options.maxShards = data.shards;
            if (this.options.lastShardID === -1) {
                this.options.lastShardID = data.shards - 1;
            }
        }
        if (this.options.concurrency === -1) {
            if (!data) {
                throw new TypeError("AutoConcurrency failed, missing required information from Discord.");
            }
            this.options.concurrency = data.sessionStartLimit.maxConcurrency;
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (this.options.shardIDs.length === 0 && this.options.firstShardID !== undefined && this.options.lastShardID !== undefined) {
            for (let i = this.options.firstShardID; i <= this.options.lastShardID; i++) {
                this.options.shardIDs.push(i);
            }
        }
        this.connected = true;
        for (const id of this.options.shardIDs) {
            this.spawn(id);
        }
    }
    /**
     * Disconnect all shards.
     * @param reconnect If shards should be reconnected. Defaults to {@link Types/Gateway~GatewayOptions#autoReconnect | GatewayOptions#autoReconnect}
     */
    disconnect(reconnect = this.options.autoReconnect) {
        if (!reconnect) {
            this.connected = false;
        }
        this.client.ready = false;
        for (const [, shard] of this)
            shard.disconnect(reconnect);
        this.client.time.reset();
        this._resetConnectQueue();
    }
    spawn(id) {
        let shard = this.get(id);
        if (!shard) {
            shard = new Shard_1.default(id, this);
            this.set(id, shard);
            shard
                .on("ready", () => {
                this.client.time.set("ready", Date.now());
                this.client.emit("shardReady", id);
                if (this.client.ready) {
                    return;
                }
                for (const other of this.values()) {
                    if (!other.ready) {
                        return;
                    }
                }
                this.client.ready = true;
                this.client.emit("ready");
            })
                .on("resume", () => {
                this.client.time.set("resume", Date.now());
                this.client.emit("shardResume", id);
                if (this.client.ready) {
                    return;
                }
                for (const other of this.values()) {
                    if (!other.ready) {
                        return;
                    }
                }
                this.client.ready = true;
                this.client.emit("ready");
            })
                .on("disconnect", (error) => {
                this.client.time.set("disconnect", Date.now());
                this.client.emit("shardDisconnect", error, id);
                for (const other of this.values()) {
                    if (other.ready) {
                        return;
                    }
                }
                this.client.ready = false;
                this.client.emit("disconnect");
            })
                .on("preReady", () => {
                this.client.time.set("preReady", Date.now());
                this.client.emit("shardPreReady", id);
            });
        }
        if (shard.status === "disconnected") {
            this._connect(shard);
        }
    }
    tryConnect() {
        if (this._connectQueue.length === 0) {
            return;
        }
        for (const shard of this._connectQueue) {
            const mod = shard.id % this.options.concurrency;
            const rateLimitKey = isNaN(mod) ? 0 : mod;
            const lastConnect = this._buckets[rateLimitKey] ?? 0;
            if (!shard.sessionID && Date.now() - lastConnect < this.options.override.timeBetweenShardConnects) {
                continue;
            }
            if (this.some(s => s.connecting && ((s.id % this.options.concurrency) || 0) === rateLimitKey)) {
                continue;
            }
            this.client.time.set("connect", Date.now());
            void shard.connect();
            this._buckets[rateLimitKey] = Date.now();
            this._connectQueue.splice(this._connectQueue.findIndex(s => s.id === shard.id), 1);
        }
        if (!this._connectTimeout && this._connectQueue.length !== 0) {
            this._connectTimeout = setTimeout(() => {
                this._connectTimeout = null;
                this.tryConnect();
            }, 500);
        }
    }
}
exports.default = ShardManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcmRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2dhdGV3YXkvU2hhcmRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQiw0Q0FPc0I7QUFDdEIsNEVBQTRDO0FBQzVDLDJDQUFpRDtBQUVqRCwwRUFBc0Q7QUFDdEQsc0VBQXNDO0FBQ3RDLDREQUE0QjtBQUs1QixzSUFBc0k7QUFDdEksYUFBYTtBQUNiLElBQUksT0FBNkMsQ0FBQztBQUNsRCxJQUFJLENBQUM7SUFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pDLG9DQUFvQztBQUNwQyxDQUFDO0FBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztBQUNWLHFJQUFxSTtBQUVySSw2Q0FBNkM7QUFDN0MsTUFBcUIsWUFBYSxTQUFRLG9CQUF5QjtJQUN2RCxRQUFRLENBQXlCO0lBQ2pDLGFBQWEsQ0FBZTtJQUM1QixlQUFlLENBQXdCO0lBQ3ZDLFdBQVcsQ0FBVTtJQUM3QixNQUFNLENBQVU7SUFDaEIsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUNsQixVQUFVLENBQWM7SUFDeEIsT0FBTyxDQUE0QztJQUNuRCxZQUFZLE1BQWMsRUFBRSxVQUF3QyxFQUFFO1FBQ2xFLEtBQUssRUFBRSxDQUFDO1FBQ1IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ2xDLEtBQUssRUFBRSxNQUFNO1lBQ2IsUUFBUSxFQUFFLEtBQUs7WUFDZixVQUFVLEVBQUUsS0FBSztZQUNqQixZQUFZLEVBQUUsS0FBSztTQUN0QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gs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