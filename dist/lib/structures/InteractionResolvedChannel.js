"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module InteractionResolvedChannel */
const Errors_1 = require("../util/Errors");
const Channel_1 = tslib_1.__importDefault(require("./Channel"));
const Permission_1 = tslib_1.__importDefault(require("./Permission"));
/** Represents a channel from an interaction option. This can be any guild channel, or a direct message. */
class InteractionResolvedChannel extends Channel_1.default {
    _cachedCompleteChannel;
    _cachedGuild;
    _cachedParent;
    /** The permissions the bot has in the channel. */
    appPermissions;
    /** The id of the guild this channel is in. */
    guildID;
    /** The ID of last message sent in this channel. */
    lastMessageID;
    /** The timestamp of the last pinned message in this channel. */
    lastPinTimestamp;
    /** The name of this channel. */
    name;
    /** If this channel is age gated. */
    nsfw;
    /** The ID of the parent of this channel, if this represents a thread. */
    parentID;
    /** The permissions the user has in the channel. */
    permissions;
    /** The position of this channel on the sidebar. */
    position;
    /** The amount of seconds between non-moderators sending messages. */
    rateLimitPerUser;
    /** The [thread metadata](https://discord.com/developers/docs/resources/channel#thread-metadata-object-thread-metadata-structure) associated with this channel, if this represents a thread. */
    threadMetadata;
    /** The topic of the channel. */
    topic;
    constructor(data, client) {
        super(data, client);
        this.appPermissions = new Permission_1.default(data.app_permissions ?? "0");
        this.guildID = data.guild_id;
        this.lastMessageID = data.last_message_id;
        this.lastPinTimestamp = data.last_pin_timestamp;
        this.name = data.name;
        this.nsfw = data.nsfw;
        this.parentID = data.parent_id ?? null;
        this.permissions = new Permission_1.default(data.permissions ?? "0");
        this.position = data.position;
        this.rateLimitPerUser = data.rate_limit_per_user;
        this.threadMetadata = data.thread_metadata ? {
            archiveTimestamp: new Date(data.thread_metadata.archive_timestamp),
            archived: data.thread_metadata.archived,
            autoArchiveDuration: data.thread_metadata.auto_archive_duration,
            createTimestamp: data.thread_metadata.create_timestamp ? new Date(data.thread_metadata.create_timestamp) : null,
            locked: data.thread_metadata.locked,
            invitable: data.thread_metadata.invitable,
        } : null;
        this.topic = data.topic;
    }
    /** The complete channel this channel option represents, if it's cached. */
    get completeChannel() {
        return this._cachedCompleteChannel ??= this.client.getChannel(this.id);
    }
    /** The guild associated with this channel. This will throw an error if the guild is not cached. */
    get guild() {
        if (!this.guildID)
            return null;
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
    /** The parent of this channel, if this represents a thread. */
    get parent() {
        if (this.parentID !== null && this._cachedParent !== null) {
            return this._cachedParent ?? (this._cachedParent = this.client.getChannel(this.parentID));
        }
        return this._cachedParent === null ? this._cachedParent : (this._cachedParent = null);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            appPermissions: this.appPermissions.toJSON(),
            name: this.name,
            parentID: this.parentID,
            permissions: this.permissions.toJSON(),
            threadMetadata: this.threadMetadata,
            type: this.type,
        };
    }
}
exports.default = InteractionResolvedChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb25SZXNvbHZlZENoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9JbnRlcmFjdGlvblJlc29sdmVkQ2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBeUM7QUFDekMsMkNBQStDO0FBRS9DLGdFQUFnQztBQUNoQyxzRUFBc0M7QUFTdEMsMkdBQTJHO0FBQzNHLE1BQXFCLDBCQUEyQixTQUFRLGlCQUFPO0lBQ25ELHNCQUFzQixDQUF3QztJQUM5RCxZQUFZLENBQVM7SUFDckIsYUFBYSxDQUEyRDtJQUNoRixrREFBa0Q7SUFDbEQsY0FBYyxDQUFhO0lBQzNCLDhDQUE4QztJQUM5QyxPQUFPLENBQVU7SUFDakIsbURBQW1EO0lBQ25ELGFBQWEsQ0FBaUI7SUFDOUIsZ0VBQWdFO0lBQ2hFLGdCQUFnQixDQUFpQjtJQUNqQyxnQ0FBZ0M7SUFDaEMsSUFBSSxDQUFnQjtJQUNwQixvQ0FBb0M7SUFDcEMsSUFBSSxDQUFXO0lBQ2YseUVBQXlFO0lBQ3pFLFFBQVEsQ0FBZ0I7SUFDeEIsbURBQW1EO0lBQ25ELFdBQVcsQ0FBYTtJQUN4QixtREFBbUQ7SUFDbkQsUUFBUSxDQUFVO0lBQ2xCLHFFQUFxRTtJQUNyRSxnQkFBZ0IsQ0FBVTtJQUMxQiwrTEFBK0w7SUFDL0wsY0FBYyxDQUE4RTtJQUM1RixnQ0FBZ0M7SUFDaEMsS0FBSyxDQUFpQjtJQUV0QixZQUFZLElBQWtELEVBQUUsTUFBYztRQUMxRSxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxvQkFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksR0FBRyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FB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