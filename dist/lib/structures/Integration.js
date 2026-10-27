"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Integration */
const Errors_1 = require("../util/Errors");
const Base_1 = tslib_1.__importDefault(require("./Base"));
const PartialApplication_1 = tslib_1.__importDefault(require("./PartialApplication"));
/** Represents a guild integration. */
class Integration extends Base_1.default {
    _cachedGuild;
    _cachedRole;
    /** The account information associated with this integration. */
    account;
    /** The application associated with this integration. */
    application;
    /** If this integration is enabled. */
    enabled;
    /** If emoticons should be synced for this integration. */
    enableEmoticons;
    /** The [behavior](https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors) of expiring subscribers. */
    expireBehavior;
    /** The grace period (in days) before expiring subscribers. */
    expireGracePeriod;
    /** The ID of the guild this integration belongs to, if applicable. */
    guildID;
    /** The name of the integration. */
    name;
    /** If this integration has been revoked. */
    revoked;
    /** The id of the role this integration uses for subscribers, if any. */
    roleID;
    /** The scopes the application associated with this integration has been authorized for. */
    scopes;
    /** The number of subscribers this integration has. */
    subscriberCount;
    /** The last date at which this integration was synced at. */
    syncedAt;
    /** If this integration is syncing. */
    syncing;
    /** The type of integration. */
    type;
    /** The user associated with this integration, if applicable. */
    user;
    constructor(data, client, guildID) {
        super(data.id, client);
        this.account = data.account;
        this.application = null;
        this.enableEmoticons = !!data.enable_emoticons;
        this.enabled = !!data.enabled;
        this.guildID = guildID ?? null;
        this.name = data.name;
        this.revoked = !!data.revoked;
        this.roleID = data.role_id ?? null;
        this.syncing = !!data.syncing;
        this.type = data.type;
        this.update(data);
    }
    /** The guild this integration belongs to, if applicable. This will throw an error if the guild is not cached. */
    get guild() {
        if (this.guildID !== null && this._cachedGuild !== null) {
            this._cachedGuild ??= this.client.guilds.get(this.guildID);
            if (!this._cachedGuild) {
                if (this.client.options.restMode) {
                    throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present when rest mode is enabled.`);
                }
                if (!this.client.shards.connected) {
                    throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present without a gateway connection.`);
                }
                throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present.`);
            }
            return this._cachedGuild;
        }
        return this._cachedGuild === null ? this._cachedGuild : (this._cachedGuild = null);
    }
    /** The role this integration uses for subscribers, if any. */
    get role() {
        if (this.roleID !== null && this._cachedRole !== null) {
            try {
                return this._cachedRole ?? (this._cachedRole = this.guild?.roles.get(this.roleID));
            }
            catch {
                return (this._cachedRole = undefined);
            }
        }
        return this._cachedRole === null ? this._cachedRole : (this._cachedRole = null);
    }
    update(data) {
        if (data.account !== undefined) {
            this.account = data.account;
        }
        if (data.application !== undefined) {
            this.application = new PartialApplication_1.default(data.application, this.client);
        }
        if (data.enable_emoticons !== undefined) {
            this.enableEmoticons = data.enable_emoticons;
        }
        if (data.enabled !== undefined) {
            this.enabled = data.enabled;
        }
        if (data.expire_behavior !== undefined) {
            this.expireBehavior = data.expire_behavior;
        }
        if (data.expire_grace_period !== undefined) {
            this.expireGracePeriod = data.expire_grace_period;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.revoked !== undefined) {
            this.revoked = data.revoked;
        }
        if (data.role_id !== undefined) {
            this.roleID = data.role_id;
        }
        if (data.scopes !== undefined) {
            this.scopes = data.scopes;
        }
        if (data.subscriber_count !== undefined) {
            this.subscriberCount = data.subscriber_count;
        }
        if (data.synced_at !== undefined) {
            this.syncedAt = new Date(data.synced_at);
        }
        if (data.syncing !== undefined) {
            this.syncing = data.syncing;
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
        if (data.user !== undefined) {
            this.user = this.client.users.update(data.user);
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            account: this.account,
            application: this.application?.toJSON(),
            enableEmoticons: this.enableEmoticons,
            enabled: this.enabled,
            expireBehavior: this.expireBehavior,
            expireGracePeriod: this.expireGracePeriod,
            name: this.name,
            revoked: this.revoked,
            roleID: this.roleID,
            scopes: this.scopes,
            subscriberCount: this.subscriberCount,
            syncedAt: this.syncedAt?.getTime(),
            syncing: this.syncing,
            type: this.type,
            user: this.user?.toJSON(),
        };
    }
}
exports.default = Integration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZWdyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9JbnRlZ3JhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsMkNBQStDO0FBRS9DLDBEQUEwQjtBQUMxQixzRkFBc0Q7QUFTdEQsc0NBQXNDO0FBQ3RDLE1BQXFCLFdBQVksU0FBUSxjQUFJO0lBQ2pDLFlBQVksQ0FBZ0I7SUFDNUIsV0FBVyxDQUFlO0lBQ2xDLGdFQUFnRTtJQUNoRSxPQUFPLENBQWtDO0lBQ3pDLHdEQUF3RDtJQUN4RCxXQUFXLENBQTRCO0lBQ3ZDLHNDQUFzQztJQUN0QyxPQUFPLENBQVU7SUFDakIsMERBQTBEO0lBQzFELGVBQWUsQ0FBVTtJQUN6QixtSkFBbUo7SUFDbkosY0FBYyxDQUE4QjtJQUM1Qyw4REFBOEQ7SUFDOUQsaUJBQWlCLENBQVU7SUFDM0Isc0VBQXNFO0lBQ3RFLE9BQU8sQ0FBZ0I7SUFDdkIsbUNBQW1DO0lBQ25DLElBQUksQ0FBUztJQUNiLDRDQUE0QztJQUM1QyxPQUFPLENBQVU7SUFDakIsd0VBQXdFO0lBQ3hFLE1BQU0sQ0FBZ0I7SUFDdEIsMkZBQTJGO0lBQzNGLE1BQU0sQ0FBaUI7SUFDdkIsc0RBQXNEO0lBQ3RELGVBQWUsQ0FBVTtJQUN6Qiw2REFBNkQ7SUFDN0QsUUFBUSxDQUFRO0lBQ2hCLHNDQUFzQztJQUN0QyxPQUFPLENBQVU7SUFDakIsK0JBQStCO0lBQy9CLElBQUksQ0FBa0I7SUFDdEIsZ0VBQWdFO0lBQ2hFLElBQUksQ0FBUTtJQUNaLFlBQVksSUFBaUMsRUFBRSxNQUFjLEVBQUUsT0FBZ0I7UUFDM0UsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FB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