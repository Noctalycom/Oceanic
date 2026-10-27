"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module AnnouncementChannel */
const Constants_1 = require("../Constants");
const ThreadableChannel_1 = tslib_1.__importDefault(require("./ThreadableChannel"));
/**
 * Represents a guild announcement channel.
 * @mergeTarget AnnouncementChannel
 */
class AnnouncementChannel extends ThreadableChannel_1.default {
    constructor(data, client) {
        super(data, client);
        this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
    }
    /**
     * Convert this announcement channel to a text channel.
     */
    async convert() {
        return this.client.rest.channels.edit(this.id, { type: Constants_1.ChannelTypes.GUILD_TEXT });
    }
    /**
     * Crosspost a message in this channel.
     * @param messageID The ID of the message to crosspost.
     */
    async crosspostMessage(messageID) {
        return this.client.rest.channels.crosspostMessage(this.id, messageID);
    }
    /**
     * Follow this announcement channel.
     * @param webhookChannelID The ID of the channel crossposted messages should be sent to. The client must have the `MANAGE_WEBHOOKS` permission in this channel.
     * @param reason The reason for following this channel.
     */
    async follow(webhookChannelID, reason) {
        return this.client.rest.channels.followAnnouncement(this.id, webhookChannelID, reason);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            rateLimitPerUser: 0,
            type: this.type,
        };
    }
}
exports.default = AnnouncementChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5ub3VuY2VtZW50Q2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0Fubm91bmNlbWVudENoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBQWtDO0FBQ2xDLDRDQUE0QztBQUU1QyxvRkFBb0Q7QUFRcEQ7OztHQUdHO0FBQ0gsTUFBcUIsbUJBQW9CLFNBQVEsMkJBQWlFO0lBSTlHLFlBQVksSUFBMkMsRUFBRSxNQUFjO1FBQ25FLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyw2QkFBNkIsQ0FBQztJQUN6RSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBYyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHdCQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNuRyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFNBQWlCO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLGdCQUF3QixFQUFFLE1BQWU7UUFDbEQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDbEIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXhDRCxzQ0F3Q0MifQ==