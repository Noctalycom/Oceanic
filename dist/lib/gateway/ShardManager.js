"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module ShardManager */
const Shard_1 = tslib_1.__importDefault(require("./Shard"));
const Dispatcher_1 = tslib_1.__importDefault(require("./Dispatcher"));
const Constants_1 = require("../Constants");
const Collection_1 = tslib_1.__importDefault(require("../util/Collection"));
/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment, unicorn/prefer-module */
// @ts-ignore
let Erlpack;
try {
    Erlpack = require("erlpack");
}
catch { }
/* eslint-enable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment, unicorn/prefer-module */
let __compressionTrueDeprecationWarning = 0;
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
        this._buckets = {};
        this._connectQueue = [];
        this._connectTimeout = null;
        this.options = {
            autoReconnect: options.autoReconnect ?? true,
            compress: options.compress === true ? (__compressionTrueDeprecationWarning++, "zlib-stream") : options.compress ?? false,
            connectionProperties: {
                browser: options.connectionProperties?.browser ?? "Oceanic",
                device: options.connectionProperties?.device ?? "Oceanic",
                os: options.connectionProperties?.os ?? process.platform
            },
            concurrency: options.concurrency === "auto" || options.concurrency && options.concurrency < 1 ? -1 : options.concurrency ?? -1,
            connectionTimeout: options.connectionTimeout ?? 30000,
            dispatcher: {
                blacklist: options.dispatcher?.blacklist === undefined ? null : options.dispatcher.blacklist,
                whitelist: options.dispatcher?.whitelist === undefined ? null : options.dispatcher.whitelist
            },
            firstShardID: options.firstShardID && options.firstShardID < 0 ? 0 : options.firstShardID ?? 0,
            getAllUsers: options.getAllUsers ?? false,
            override: options.override ?? {
                appendQuery: true,
                gatewayURLIsResumeURL: false,
                timeBetweenShardConnects: 5000
            },
            guildCreateTimeout: options.guildCreateTimeout ?? 2000,
            intents: typeof options.intents === "number" ? options.intents : 0,
            largeThreshold: options.largeThreshold ?? 250,
            lastShardID: options.lastShardID ?? -1,
            lookupDisallowedIntents: options.lookupDisallowedIntents ?? false,
            maxReconnectAttempts: options.maxReconnectAttempts ?? Infinity,
            maxResumeAttempts: options.maxResumeAttempts ?? 10,
            maxShards: options.maxShards === "auto" || options.maxShards && options.maxShards < 1 ? -1 : options.maxShards ?? -1,
            presence: {
                activities: options.presence?.activities ?? [],
                afk: options.presence?.afk ?? false,
                status: options.presence?.status ?? "online"
            },
            reconnectDelay: options.reconnectDelay ?? ((lastDelay, attempts) => Math.pow(attempts + 1, 0.7) * 20000),
            removeDisallowedIntents: options.removeDisallowedIntents ?? false,
            seedVoiceConnections: options.seedVoiceConnections ?? false,
            shardIDs: options.shardIDs ?? [],
            ws: options.ws ?? {}
        };
        if (__compressionTrueDeprecationWarning === 1) {
            process.emitWarning("Using `compress: true` is deprecated and will be removed in a future version. Please use `compress: \"zlib-stream\"` instead.", {
                code: "OCEANIC_GATEWAY_COMPRESSION_TRUE_DEPRECATION"
            });
        }
        this.options.override.appendQuery ??= (this.options.override.getBot === undefined && this.options.override.url === undefined);
        this.options.override.gatewayURLIsResumeURL ??= (this.options.override.getBot !== undefined || this.options.override.url !== undefined);
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
        Object.defineProperties(this, {
            client: {
                value: client,
                writable: false,
                enumerable: false,
                configurable: false
            },
            dispatcher: {
                value: new Dispatcher_1.default(this),
                writable: false,
                enumerable: false,
                configurable: false
            }
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
        const overrideURL = (this.options.override.getBot || this.options.override.url) !== undefined;
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
        /* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
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
        /* eslint-enable @typescript-eslint/no-unsafe-enum-comparison */
        if (url && this.options.override.appendQuery) {
            url += `?v=${Constants_1.GATEWAY_VERSION}&encoding=${Erlpack ? "etf" : "json"}`;
            if (this.options.compress) {
                const type = this.options.compress === "zstd-stream" ? "zstd-stream" : "zlib-stream";
                url += `&compress=${type}`;
            }
            this._gatewayURL = url;
        }
        if (this.options.maxShards === -1) {
            if (!data || !data.shards) {
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
        this._resetConnectQueue();
    }
    spawn(id) {
        let shard = this.get(id);
        if (!shard) {
            shard = new Shard_1.default(id, this);
            this.set(id, shard);
            shard
                .on("ready", () => {
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
                this.client.startTime = Date.now();
                this.client.emit("ready");
            })
                .on("resume", () => {
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
                this.client.startTime = Date.now();
                this.client.emit("ready");
            })
                .on("disconnect", error => {
                this.client.emit("shardDisconnect", error, id);
                for (const other of this.values()) {
                    if (other.ready) {
                        return;
                    }
                }
                this.client.ready = false;
                this.client.startTime = 0;
                this.client.emit("disconnect");
            })
                .on("preReady", () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcmRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2dhdGV3YXkvU2hhcmRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQiw0REFBNEI7QUFDNUIsc0VBQXNDO0FBR3RDLDRDQU9zQjtBQUN0Qiw0RUFBNEM7QUFFNUMsNk1BQTZNO0FBQzdNLGFBQWE7QUFDYixJQUFJLE9BQTZDLENBQUM7QUFDbEQsSUFBSSxDQUFDO0lBQ0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztBQUNWLDRNQUE0TTtBQUc1TSxJQUFJLG1DQUFtQyxHQUFHLENBQUMsQ0FBQztBQUM1Qyw2Q0FBNkM7QUFDN0MsTUFBcUIsWUFBYSxTQUFRLG9CQUF5QjtJQUN2RCxRQUFRLENBQXlCO0lBQ2pDLGFBQWEsQ0FBZTtJQUM1QixlQUFlLENBQXdCO0lBQ3ZDLFdBQVcsQ0FBVTtJQUM3QixNQUFNLENBQVU7SUFDaEIsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUNsQixVQUFVLENBQWM7SUFDeEIsT0FBTyxDQUE0QztJQUNuRCxZQUFZLE1BQWMsRUFBRSxVQUF3QyxFQUFFO1FBQ2xFLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLGFBQWEsRUFBUyxPQUFPLENBQUMsYUFBYSxJQUFJLElBQUk7WUFDbkQsUUFBUSxFQUFjLE9BQU8sQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1DQUFtQyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksS0FBSztZQUNwSSxvQkFBb0IsRUFBRTtnQkFDbEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLElBQUksU0FBUztnQkFDM0QsTUFBTSxFQUFHLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLElBQUksU0FBUztnQkFDMUQsRUFBRSxFQUFPLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLElBQUksT0FBTyxDQUFDLFFBQVE7YUFDaEU7WUFDRCxXQUFXLEVBQVEsT0FBTyxDQUFDLFdBQVcsS0FBSyxNQUFNLElBQUksT0FBTyxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1lBQ3BJLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSxLQUFLO1lBQ3JELFVBQVUsRUFBUztnQkFDZixTQUFTLEVBQUUsT0FBTyxDQUFDLFVBQVUsRUFBRSxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUztnQkFDNUYsU0FBUyxFQUFFLE9BQU8sQ0FBQyxVQUFVLEVBQUUsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVM7YUFDL0Y7WUFDRCxZQUFZLEVBQUUsT0FBTyxDQUFDLFlBQVksSUFBSSxPQUFPLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFJLENBQUM7WUFDOUYsV0FBVyxFQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksS0FBSztZQUMxQyxRQUFRLEVBQU0sT0FBTyxDQUFDLFFBQWlFLElBQUk7Z0JBQ3ZGLFdBQVcsRUFBZSxJQUFJO2dCQUM5QixxQkFBcUIsRUFBSyxLQUFLO2dCQUMvQix3QkFBd0IsRUFBRSxJQUFJO2FBQ2pDO1lBQ0Qsa0JBQWtCLEVBQU8sT0FBTyxDQUFDLGtCQUFrQixJQUFJLElBQUk7WUFDM0QsT0FBTyxFQUFrQixPQUFPLE9BQU8sQ0FBQyxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLGNBQWMsRUFBVyxPQUFPLENBQUMsY0FBYyxJQUFJLEdBQUc7WUFDdEQsV0FBVyxFQUFjLE9BQU8sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1lBQ2xELHVCQUF1QixFQUFFLE9BQU8sQ0FBQyx1QkFBdUIsSUFBSSxLQUFLO1lBQ2pFLG9CQUFvQixFQUFLLE9BQU8sQ0FBQyxvQkFBb0IsSUFBSSxRQUFRO1lBQ2pFLGlCQUFpQixFQUFRLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSxFQUFFO1lBQ3hELFNBQVMsRUFBZ0IsT0FBTyxDQUFDLFNBQVMsS0FBSyxNQUFNLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO1lBQ2xJLFFBQVEsRUFBaUI7Z0JBQ3JCLFVBQVUsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQVUsSUFBSSxFQUFFO2dCQUM5QyxHQUFHLEVBQVMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksS0FBSztnQkFDMUMsTUFBTSxFQUFNLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxJQUFJLFFBQVE7YUFDbkQ7WUFDRCxjQUFjLEVBQVcsT0FBTyxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUN6SCx1QkFBdUIsRUFBRSxPQUFPLENBQUMsdUJBQXVCLElBQUksS0FBSztZQUNqRSxvQkFBb0IsRUFBSyxPQUFPLENBQUMsb0JBQW9CLElBQUksS0FBSztZQUM5RCxRQUFRLEVBQWlCLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRTtZQUMvQyxFQUFFLEVBQXVCLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRTtTQUM1QyxDQUFDO1FBQ0YsSUFBSSxtQ0FBbUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUM1QyxPQUFPLENBQUMsV0FBVyxDQUFDLCtIQUErSCxFQUFFO2dCQUNqSixJQUFJLEVBQUUsOENBQThDO2FBQ3ZELENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQztRQUM5SCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFDO1FBQ3hJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLHdCQUF3QixLQUFLLElBQUksQ0FBQztRQUN4RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDbkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQy9CLENBQUM7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDcEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUNqQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNuQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRSxDQUFDO3dCQUM3QixPQUFPLElBQUksTUFBTSxDQUFDO29CQUN0QixDQUFDO3lCQUFNLElBQUksbUJBQU8sQ0FBQyxNQUE4QixDQUFDLEVBQUUsQ0FBQzt3QkFDakQsT0FBTyxJQUFJLG1CQUFPLENBQUMsTUFBOEIsQ0FBQyxDQUFDO29CQUN2RCxDQUFDO3lCQUFNLENBQUM7d0JBQ0osSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFLENBQUM7NEJBQ25CLE9BQU8sR0FBRyxzQkFBVSxDQUFDOzRCQUNyQixNQUFNO3dCQUNWLENBQUM7NkJBQU0sSUFBSSxNQUFNLEtBQUssb0JBQW9CLEVBQUUsQ0FBQzs0QkFDekMsT0FBTyxHQUFHLG1DQUF1QixDQUFDOzRCQUNsQyxTQUFTO3dCQUNiLENBQUM7d0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLE1BQU0sRUFBRSxDQUFDLENBQUM7b0JBQ3JELENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDbkMsQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsbUNBQXVCLENBQUM7UUFDbkQsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztZQUM5RSxNQUFNLElBQUksU0FBUyxDQUFDLG9FQUFvRSxDQUFDLENBQUM7UUFDOUYsQ0FBQztRQUNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7WUFDMUIsTUFBTSxFQUFFO2dCQUNKLEtBQUssRUFBUyxNQUFNO2dCQUNwQixRQUFRLEVBQU0sS0FBSztnQkFDbkIsVUFBVSxFQUFJLEtBQUs7Z0JBQ25CLFlBQVksRUFBRSxLQUFLO2FBQ3RCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLEtBQUssRUFBUyxJQUFJLG9CQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNsQyxRQUFRLEVBQU0sS0FBSztnQkFDbkIsVUFBVSxFQUFJLEtBQUs7Z0JBQ25CLFlBQVksRUFBRSxLQUFLO2FBQ3RCO1NBQ0osQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVPLFFBQVEsQ0FBQyxLQUFZO1FBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sU0FBUyxDQUFDLEtBQWE7UUFDM0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ILENBQUM7SUFFTyxLQUFLLENBQUMsbUJBQW1CLENBQUMsS0FBWTtRQUMxQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUMxQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDO1FBRUQsbUZBQW1GO1FBQ25GLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25ILENBQUM7SUFFTyxNQUFNLENBQUMsRUFBVTtRQUNyQixNQUFNLEdBQUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDMUMsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUV6QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVPLGtCQUFrQjtRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDVCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUVELElBQUksR0FBa0IsRUFBRSxJQUFxRCxDQUFDO1FBQzlFLE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQztRQUM5RixJQUFJLENBQUM7WUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ25FLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNuQixDQUFDO2lCQUFNLENBQUM7Z0JBQ0osR0FBRyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDekUsQ0FBQztRQUNMLENBQUM7UUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ1gsTUFBTSxJQUFJLFNBQVMsQ0FBQyxvQ0FBb0MsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7UUFDRCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMzQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDcEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDckIsR0FBRyxJQUFJLEdBQUcsQ0FBQztZQUNmLENBQUM7UUFDTCxDQUFDO1FBRUQsaUVBQWlFO1FBQ2pFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsSUFBSSxtQ0FBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDakksTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ25FLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBZSxFQUFFLE9BQWdDLEVBQVEsRUFBRTtnQkFDdEUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUMvRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsMkNBQTJDLG1CQUFPLENBQUMsTUFBTSxDQUFDLGlFQUFpRSxDQUFDLENBQUM7b0JBQ3RKLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNwQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDO1lBQ0YsS0FBSyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLG1DQUF1QixFQUFFLENBQUM7Z0JBQ3RELEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDM0IsQ0FBQztRQUNMLENBQUM7UUFDRCxnRUFBZ0U7UUFFaEUsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDM0MsR0FBRyxJQUFJLE1BQU0sMkJBQWUsYUFBYSxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDcEUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN4QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO2dCQUNyRixHQUFHLElBQUksYUFBYSxJQUFJLEVBQUUsQ0FBQztZQUMvQixDQUFDO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDM0IsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN4QixNQUFNLElBQUksU0FBUyxDQUFDLGlFQUFpRSxDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDckMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUMvQyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxJQUFJLFNBQVMsQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDO1lBQzlGLENBQUM7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDO1FBQ3JFLENBQUM7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzFILEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3pFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLEtBQUssTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWE7UUFDN0MsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQztRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMxQixLQUFLLE1BQU0sQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLElBQUk7WUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxLQUFLLENBQUMsRUFBVTtRQUNaLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ1QsS0FBSyxHQUFHLElBQUksZUFBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwQixLQUFLO2lCQUNBLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNwQixPQUFPO2dCQUNYLENBQUM7Z0JBQ0QsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDZixPQUFPO29CQUNYLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDO2lCQUNELEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNwQixPQUFPO2dCQUNYLENBQUM7Z0JBQ0QsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDZixPQUFPO29CQUNYLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDO2lCQUNELEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDL0MsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztvQkFDaEMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ2QsT0FBTztvQkFDWCxDQUFDO2dCQUNMLENBQUM7Z0JBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQztpQkFDRCxFQUFFLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtnQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUVELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxjQUFjLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDbEMsT0FBTztRQUNYLENBQUM7UUFFRCxLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQ2hELE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDMUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2dCQUNoRyxTQUFTO1lBQ2IsQ0FBQztZQUVELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxZQUFZLENBQUMsRUFBRSxDQUFDO2dCQUM1RixTQUFTO1lBQ2IsQ0FBQztZQUNELEtBQUssS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkYsQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzNELElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN0QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixDQUFDO0lBRUwsQ0FBQztDQUNKO0FBNVVELCtCQTRVQyJ9