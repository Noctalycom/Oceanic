"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module TextableChannel */
const Collection_1 = tslib_1.__importDefault(require("../util/Collection"));
const TextableChannel_1 = tslib_1.__importDefault(require("./TextableChannel"));
/** Represents a guild textable channel. */
class ThreadableChannel extends TextableChannel_1.default {
    /** The default auto archive duration for threads created in this channel. */
    defaultAutoArchiveDuration;
    constructor(data, client) {
        super(data, client);
        this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
        this.update(data);
    }
    /** The threads in this channel. The returned collection is disposable. */
    get threads() {
        return new Collection_1.default(this.guild.threads.filter(thread => thread.parentID === this.id).map(thread => [thread.id, thread]));
    }
    update(data) {
        super.update(data);
        if (data.default_auto_archive_duration !== undefined) {
            this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
        }
    }
    /**
     * Get the public archived threads in this channel.
     * @param options The options for getting the public archived threads.
     */
    async getPublicArchivedThreads(options) {
        return this.client.rest.channels.getPublicArchivedThreads(this.id, options);
    }
    /**
     * Search threads in this channel.
     * @param options The options to search with.
     * @param retryOnIndexNotAvailable If the search should be retried if Discord replies with an index unavailable response. This will retry at most one time, waiting for `retry_after` or 15-45 seconds.
     */
    async searchThreads(options, retryOnIndexNotAvailable = true) {
        return this.client.rest.channels.searchThreads(this.id, options, retryOnIndexNotAvailable);
    }
    /**
     * Create a thread from an existing message in this channel.
     * @param messageID The ID of the message to create a thread from.
     * @param options The options for creating the thread.
     */
    async startThreadFromMessage(messageID, options) {
        return this.client.rest.channels.startThreadFromMessage(this.id, messageID, options);
    }
    /**
     * Create a thread without an existing message in this channel.
     * @param options The options for creating the thread.
     */
    async startThreadWithoutMessage(options) {
        return this.client.rest.channels.startThreadWithoutMessage(this.id, options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            defaultAutoArchiveDuration: this.defaultAutoArchiveDuration,
            threads: this.threads.map(thread => thread.id),
            type: this.type,
        };
    }
}
exports.default = ThreadableChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGhyZWFkYWJsZUNoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9UaHJlYWRhYmxlQ2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4QkFBOEI7QUFDOUIsNEVBQTRDO0FBRTVDLGdGQUFnRDtBQU9oRCwyQ0FBMkM7QUFDM0MsTUFBcUIsaUJBQTRMLFNBQVEseUJBQW1CO0lBQ3hPLDZFQUE2RTtJQUM3RSwwQkFBMEIsQ0FBNEI7SUFHdEQsWUFBWSxJQUEyRSxFQUFFLE1BQWM7UUFDbkcsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDO1FBQ3JFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELDBFQUEwRTtJQUMxRSxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksb0JBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JJLENBQUM7SUFFa0IsTUFBTSxDQUFDLElBQW9GO1FBQzFHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsNkJBQTZCLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDbkQsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyw2QkFBNkIsQ0FBQztRQUN6RSxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxPQUFrRDtRQUM3RSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBb0MsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBNkMsRUFBRSx3QkFBd0IsR0FBRyxJQUFJO1FBQzlGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBSyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLHNCQUFzQixDQUFDLFNBQWlCLEVBQUUsT0FBcUQ7UUFDakcsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQW9DLElBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVILENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMseUJBQXlCLENBQUMsT0FBd0Q7UUFDcEYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUssSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQjtZQUMzRCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQzlDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtTQUNsQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBakVELG9DQWlFQyJ9