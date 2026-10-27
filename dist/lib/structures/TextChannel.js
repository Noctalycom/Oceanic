"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module TextChannel */
const Constants_1 = require("../Constants");
const ThreadableChannel_1 = tslib_1.__importDefault(require("./ThreadableChannel"));
/** Represents a guild text channel. */
class TextChannel extends ThreadableChannel_1.default {
    constructor(data, client) {
        super(data, client);
    }
    /**
     * Convert this text channel to a announcement channel.
     */
    async convert() {
        return this.client.rest.channels.edit(this.id, { type: Constants_1.ChannelTypes.GUILD_ANNOUNCEMENT });
    }
    /**
     * Follow an announcement channel to this channel.
     * @param webhookChannelID The ID of the channel to follow the announcement channel to.
     * @param reason The reason for following the announcement channel.
     */
    async followAnnouncement(webhookChannelID, reason) {
        return this.client.rest.channels.followAnnouncement(this.id, webhookChannelID, reason);
    }
    /**
     * Get the private archived threads the current user has joined in this channel.
     * @param options The options for getting the joined private archived threads.
     */
    async getJoinedPrivateArchivedThreads(options) {
        return this.client.rest.channels.getJoinedPrivateArchivedThreads(this.id, options);
    }
    /**
     * Get the private archived threads in this channel.
     * @param options The options for getting the private archived threads.
     */
    async getPrivateArchivedThreads(options) {
        return this.client.rest.channels.getPrivateArchivedThreads(this.id, options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            type: this.type,
        };
    }
}
exports.default = TextChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dENoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9UZXh0Q2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsNENBQTRDO0FBRTVDLG9GQUFvRDtBQVFwRCx1Q0FBdUM7QUFDdkMsTUFBcUIsV0FBWSxTQUFRLDJCQUEwRTtJQUUvRyxZQUFZLElBQW1DLEVBQUUsTUFBYztRQUMzRCxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFzQixJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHdCQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO0lBQ25ILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGtCQUFrQixDQUFDLGdCQUF3QixFQUFFLE1BQWU7UUFDOUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLCtCQUErQixDQUFDLE9BQWtEO1FBQ3BGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxPQUFrRDtRQUM5RSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFUSxNQUFNO1FBQ1gsT0FBTztZQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDbEIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTVDRCw4QkE0Q0MifQ==