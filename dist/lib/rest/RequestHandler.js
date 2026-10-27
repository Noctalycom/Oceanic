"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module RequestHandler */
const Constants_1 = require("../Constants");
const Base_1 = tslib_1.__importDefault(require("../structures/Base"));
const Errors_1 = require("../util/Errors");
const DiscordHTTPError_1 = tslib_1.__importDefault(require("./DiscordHTTPError"));
const DiscordRESTError_1 = tslib_1.__importDefault(require("./DiscordRESTError"));
const SequentialBucket_1 = tslib_1.__importDefault(require("./SequentialBucket"));
/**
 * Latency & ratelimit related things lovingly borrowed from eris
 * https://github.com/abalabahaha/eris/blob/dev/lib/rest/RequestHandler.js (eb403730855714eafa36c541dbe2cb84c9979158)
 */
/** The primary means of communicating with Discord via rest. */
class RequestHandler {
    _manager;
    globalBlock = false;
    latencyRef;
    options;
    ratelimits = {};
    readyQueue = [];
    constructor(manager, options = {}) {
        if (options.baseURL?.endsWith("/")) {
            options.baseURL = options.baseURL.slice(0, -1);
        }
        this._manager = manager;
        this.options = {
            agent: options.agent,
            baseURL: options.baseURL ?? Constants_1.API_URL,
            disableLatencyCompensation: !!options.disableLatencyCompensation,
            followRedirects: !!options.followRedirects,
            host: options.host ?? (options.baseURL ? new URL(options.baseURL).host : new URL(Constants_1.API_URL).host),
            latencyThreshold: options.latencyThreshold ?? 30000,
            maxRatelimitRetryWindow: options.maxRatelimitRetryWindow ?? 30000,
            ratelimiterOffset: options.ratelimiterOffset ?? 0,
            requestTimeout: options.requestTimeout ?? 15000,
            superProperties: options.superProperties ?? null,
            userAgent: options.userAgent ?? Constants_1.USER_AGENT,
        };
        this.latencyRef = {
            lastTimeOffsetCheck: 0,
            latency: options.ratelimiterOffset ?? 0,
            raw: Array.from({ length: 10 }).fill(options.ratelimiterOffset ?? 0),
            timeOffsets: Array.from({ length: 10 }).fill(0),
            timeoffset: 0,
        };
    }
    getRoute(path, method) {
        let route = path.replaceAll(/\/([a-z-]+)\/\d{15,21}/g, function (match, p) {
            return p === "channels" || p === "guilds" || p === "webhooks" ? match : `/${p}/:id`;
        }).replaceAll(/\/reactions\/[^/]+/g, "/reactions/:id").replaceAll(/\/reactions\/:id\/[^/]+/g, "/reactions/:id/:userID").replace(/^\/webhooks\/(\d+)\/[\w-]{64,}/, "/webhooks/$1/:token");
        if (method === "DELETE" && route.endsWith("/messages/:id")) {
            const messageID = path.slice(path.lastIndexOf("/") + 1);
            const createdAt = Base_1.default.getCreatedAt(messageID).getTime();
            if (Date.now() - this.latencyRef.latency - createdAt >= 1000 * 60 * 60 * 24 * 14) {
                method += "_OLD";
            }
            else if (Date.now() - this.latencyRef.latency - createdAt <= 1000 * 10) {
                method += "_NEW";
            }
            route = method + route;
        }
        else if (method === "GET" && /\/guilds\/\d+\/channels$/.test(route)) {
            route = "/guilds/:id/channels";
        }
        if (method === "PUT" || method === "DELETE") {
            const index = route.indexOf("/reactions");
            if (index !== -1) {
                route = "MODIFY" + route.slice(0, index + 10);
            }
        }
        return route;
    }
    globalUnblock() {
        this.globalBlock = false;
        while (this.readyQueue.length !== 0) {
            this.readyQueue.shift()();
        }
    }
    /** same as `request`, but with `auth` always set to `true`. */
    async authRequest(options) {
        return this.request({
            ...options,
            auth: true,
        });
    }
    /**
     * Make a request. `null` will be returned if the request results in a `204 NO CONTENT`.
     * @param options The options for the request.
     */
    async request(options) {
        options.method = options.method.toUpperCase();
        if (!Constants_1.RESTMethods.includes(options.method)) {
            throw new TypeError(`Invalid method "${options.method}.`);
        }
        const _stackHolder = {};
        Error.captureStackTrace(_stackHolder);
        if (!options.path.startsWith("/")) {
            options.path = `/${options.path}`;
        }
        const route = options.route ?? this.getRoute(options.path, options.method);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!this.ratelimits[route]) {
            this.ratelimits[route] = new SequentialBucket_1.default(1, this.latencyRef);
        }
        let attempts = 0;
        return new Promise((resolve, reject) => {
            async function attempt(cb) {
                const headers = options.headers ?? {};
                try {
                    if (typeof options.auth === "string") {
                        headers.Authorization = options.auth;
                    }
                    else if (options.auth && this._manager.client.options.auth) {
                        headers.Authorization = this._manager.client.options.auth;
                    }
                    if (options.reason) {
                        headers["X-Audit-Log-Reason"] = encodeURIComponent(options.reason);
                    }
                    let reqBody;
                    if (options.method !== "GET") {
                        let stringBody;
                        if (options.json) {
                            stringBody = JSON.stringify(options.json, (k, v) => typeof v === "bigint" ? v.toString() : v);
                        }
                        if (options.form || (options.files && options.files.length !== 0)) {
                            const data = options.form ?? new FormData();
                            let index = 0;
                            if (options.files)
                                for (const file of options.files.values()) {
                                    index++;
                                    if (file.index !== undefined) {
                                        index = file.index;
                                    }
                                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                                    if (!file.contents) {
                                        continue;
                                    }
                                    data.set(file.field ?? `files[${index}]`, new Blob([file.contents]), file.name);
                                }
                            if (stringBody) {
                                data.set("payload_json", stringBody);
                            }
                            reqBody = data;
                        }
                        else if (options.json) {
                            reqBody = stringBody;
                            headers["Content-Type"] = "application/json";
                        }
                    }
                    if (this.options.host) {
                        headers.Host = this.options.host;
                    }
                    if (this.options.superProperties) {
                        headers["X-Super-Properties"] = typeof this.options.superProperties === "object" ? JSON.stringify(this.options.superProperties) : this.options.superProperties;
                    }
                    const url = `${this.options.baseURL}${options.path}${options.query && Array.from(options.query.keys()).length !== 0 ? `?${options.query.toString()}` : ""}`;
                    let latency = Date.now();
                    const controller = new AbortController();
                    let timeout;
                    if (this.options.requestTimeout > 0 && this.options.requestTimeout !== Infinity) {
                        timeout = setTimeout(() => { controller.abort(); }, this.options.requestTimeout);
                    }
                    const res = await fetch(url, {
                        method: options.method,
                        headers,
                        body: reqBody,
                        dispatcher: this.options.agent ?? undefined,
                        signal: controller.signal,
                        redirect: this.options.followRedirects ? "follow" : "manual",
                    });
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    latency = Date.now() - latency;
                    if (!this.options.disableLatencyCompensation) {
                        this.latencyRef.raw.push(latency);
                        this.latencyRef.latency = this.latencyRef.latency - Math.trunc((this.latencyRef.raw.shift() ?? 0) / 10) + Math.trunc(latency / 10);
                    }
                    let resBody;
                    if (res.status === 204) {
                        resBody = null;
                    }
                    else {
                        if (res.headers.get("content-type") === "application/json") {
                            const b = await res.text();
                            try {
                                resBody = JSON.parse(b);
                            }
                            catch (err) {
                                this._manager.client.emit("error", err);
                                resBody = b;
                            }
                        }
                        else {
                            resBody = Buffer.from(await res.arrayBuffer());
                        }
                    }
                    this._manager.client.emit("request", {
                        method: options.method,
                        path: options.path,
                        route,
                        withAuth: !!options.auth,
                        requestBody: reqBody,
                        responseBody: resBody,
                    });
                    const headerNow = Date.parse(res.headers.get("date"));
                    const now = Date.now();
                    if (this.latencyRef.lastTimeOffsetCheck < (Date.now() - 5000)) {
                        const timeOffset = headerNow + 500 - (this.latencyRef.lastTimeOffsetCheck = Date.now());
                        if (this.latencyRef.timeoffset - this.latencyRef.latency >= this.options.latencyThreshold && timeOffset - this.latencyRef.latency >= this.options.latencyThreshold) {
                            this._manager.client.emit("warn", `Your clock is ${this.latencyRef.timeoffset}ms behind Discord's server clock. Please check your connection and system time.`);
                        }
                        this.latencyRef.timeoffset = this.latencyRef.timeoffset - Math.trunc(this.latencyRef.timeOffsets.shift() / 10) + Math.trunc(timeOffset / 10);
                        this.latencyRef.timeOffsets.push(timeOffset);
                    }
                    if (res.headers.has("x-ratelimit-limit")) {
                        this.ratelimits[route].limit = Number(res.headers.get("x-ratelimit-limit"));
                    }
                    if (options.method !== "GET" && (!res.headers.has("x-ratelimit-remaining") || !res.headers.has("x-ratelimit-limit")) && this.ratelimits[route].limit !== 1) {
                        this._manager.client.emit("debug", [`Missing ratelimit headers for SequentialBucket(${this.ratelimits[route].remaining}/${this.ratelimits[route].limit}) with non-default limit\n`,
                            `${res.status} ${res.headers.get("content-type") ?? "null"}: ${options.method} ${route} | ${res.headers.get("cf-ray") ?? "null"}\n`,
                            `content-type = ${res.headers.get("content-type") ?? "null"}\n`,
                            `x-ratelimit-remaining = ${res.headers.get("x-ratelimit-remaining") ?? "null"}\n`,
                            `x-ratelimit-limit = ${res.headers.get("x-ratelimit-limit") ?? "null"}\n`,
                            `x-ratelimit-reset = ${res.headers.get("x-ratelimit-reset") ?? "null"}\n`,
                            `x-ratelimit-global = ${res.headers.get("x-ratelimit-global") ?? "null"}`].join("\n"));
                    }
                    this.ratelimits[route].remaining = res.headers.has("x-ratelimit-remaining") ? Number(res.headers.get("x-ratelimit-remaining") ?? 0) : 1;
                    const retryAfter = Number(res.headers.get("x-ratelimit-reset-after") ?? res.headers.get("retry-after") ?? 0) * 1000;
                    if (retryAfter >= 0) {
                        if (res.headers.has("x-ratelimit-global")) {
                            this.globalBlock = true;
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                            setTimeout(this.globalUnblock.bind(this), retryAfter ?? 1);
                        }
                        else {
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                            this.ratelimits[route].reset = (retryAfter ?? 1) + now;
                        }
                    }
                    else if (res.headers.has("x-ratelimit-reset")) {
                        let resetTime = Number(res.headers.get("x-ratelimit-reset")) * 1000;
                        if (route.endsWith("/reactions/:id") && (resetTime - headerNow) === 1000) {
                            resetTime = now + 250;
                        }
                        this.ratelimits[route].reset = Math.max(resetTime - this.latencyRef.latency, now);
                    }
                    else {
                        this.ratelimits[route].reset = now;
                    }
                    if (res.status !== 429) {
                        this._manager.client.emit("debug", `${now} ${route} ${res.status}: ${latency}ms (${this.latencyRef.latency}ms avg) | ${this.ratelimits[route].remaining}/${this.ratelimits[route].limit} left | Reset ${this.ratelimits[route].reset} (${this.ratelimits[route].reset - now}ms left)`);
                    }
                    if (res.status > 300) {
                        if (res.status === 429) {
                            let delay = retryAfter;
                            if (res.headers.get("x-ratelimit-scope") === "shared") {
                                try {
                                    delay = resBody.retry_after * 1000;
                                }
                                catch (err) {
                                    cb();
                                    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
                                    reject(err);
                                }
                            }
                            this._manager.client.emit("debug", `${res.headers.has("x-ratelimit-global") ? "Global" : "Unexpected"} RateLimit: ${JSON.stringify(resBody)}\n${now} ${route} ${res.status}: ${latency}ms (${this.latencyRef.latency}ms avg) | ${this.ratelimits[route].remaining}/${this.ratelimits[route].limit} left | Reset ${delay} (${this.ratelimits[route].reset - now}ms left) | Scope ${res.headers.get("x-ratelimit-scope")}`);
                            if (delay) {
                                if (delay > this.options.maxRatelimitRetryWindow) {
                                    cb();
                                    reject(new Errors_1.RateLimitedError(`Ratelimit on "${options.method} ${route}" exceeds the maximum retry window (${delay} > ${this.options.maxRatelimitRetryWindow})`, delay));
                                    return;
                                }
                                setTimeout(() => {
                                    cb();
                                    this.request(options).then(resolve).catch(reject);
                                }, delay);
                                return;
                            }
                            else {
                                cb();
                                this.request(options).then(resolve).catch(reject);
                                return;
                            }
                        }
                        else if (res.status === 502 && ++attempts < 4) {
                            this._manager.client.emit("debug", `Unexpected 502 on ${options.method} ${route}`);
                            setTimeout(() => {
                                this.request(options).then(resolve).catch(reject);
                            }, Math.floor(Math.random() * 1900 + 100));
                            cb();
                            return;
                        }
                        cb();
                        let { stack } = _stackHolder;
                        if (stack.startsWith("Error\n")) {
                            stack = stack.slice(6);
                        }
                        const err = resBody && typeof resBody === "object" && "code" in resBody ? new DiscordRESTError_1.default(res, resBody, options.method, stack) : new DiscordHTTPError_1.default(res, resBody, options.method, stack);
                        reject(err);
                        return;
                    }
                    cb();
                    resolve(resBody);
                }
                catch (err) {
                    cb();
                    if (err instanceof Error && err.constructor.name === "DOMException" && err.name === "AbortError") {
                        reject(new Error(`Request Timed Out (>${this.options.requestTimeout}ms) on ${options.method} ${options.path}`));
                    }
                    this._manager.client.emit("error", err);
                }
            }
            if (this.globalBlock && options.auth) {
                (options.priority ? this.readyQueue.unshift.bind(this.readyQueue) : this.readyQueue.push.bind(this.readyQueue))(() => {
                    this.ratelimits[route].queue(attempt.bind(this), options.priority);
                });
            }
            else {
                this.ratelimits[route].queue(attempt.bind(this), options.priority);
            }
        });
    }
}
exports.default = RequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdEhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcmVzdC9SZXF1ZXN0SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNkI7QUFDN0IsNENBQWlGO0FBQ2pGLHNFQUFzQztBQUN0QywyQ0FBa0Q7QUFFbEQsa0ZBQWtEO0FBQ2xELGtGQUFrRDtBQUNsRCxrRkFBa0Q7QUFLbEQ7OztHQUdHO0FBRUgsZ0VBQWdFO0FBQ2hFLE1BQXFCLGNBQWM7SUFDdkIsUUFBUSxDQUFjO0lBQzlCLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDcEIsVUFBVSxDQUFrQztJQUM1QyxPQUFPLENBQXFEO0lBQzVELFVBQVUsR0FBcUMsRUFBRSxDQUFDO0lBQ2xELFVBQVUsR0FBc0IsRUFBRSxDQUFDO0lBQ25DLFlBQVksT0FBb0IsRUFBRSxVQUFvQyxFQUFFO1FBQ3BFLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1lBQ3BCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxJQUFJLG1CQUFPO1lBQ25DLDBCQUEwQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsMEJBQTBCO1lBQ2hFLGVBQWUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWU7WUFDMUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMs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