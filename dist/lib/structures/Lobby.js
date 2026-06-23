"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Lobby */
const Base_1 = tslib_1.__importDefault(require("./Base"));
const GuildChannel_1 = tslib_1.__importDefault(require("./GuildChannel"));
const LobbyMember_1 = tslib_1.__importDefault(require("./LobbyMember"));
class Lobby extends Base_1.default {
    applicationID;
    linkedChannel;
    members;
    metadata;
    constructor(data, client) {
        super(data.id, client);
        this.applicationID = data.application_id;
        this.linkedChannel = data.linked_channel ? client.util.updateChannel(data.linked_channel) : undefined;
        this.members = data.members.map(member => new LobbyMember_1.default(member, client, this.id));
        this.metadata = data.metadata;
    }
    /**
     * Add a member to this lobby.
     * @param userID The ID of the user to add to the lobby.
     * @param options The options for adding the member to the lobby.
     */
    async addMember(userID, options) {
        return this.client.rest.lobbies.addMember(this.id, userID, options);
    }
    /** Delete this lobby. */
    async delete() {
        return this.client.rest.lobbies.delete(this.id);
    }
    /**
     * Edit this lobby.
     * @param options The options for editing the lobby.
     */
    async edit(options) {
        return this.client.rest.lobbies.edit(this.id, options);
    }
    /**
     * Leave this lobby. This requires bearer token authentication.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async leave(accessToken) {
        return this.client.rest.lobbies.leave(this.id, accessToken);
    }
    /**
     * Link this lobby to a channel. This requires bearer token authentication and the `CAN_LINK_LOBBY` flag on the member.
     * @param channelID The ID of the channel to link the lobby to.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async linkChannel(channelID, accessToken) {
        return this.client.rest.lobbies.linkChannel(this.id, channelID, accessToken);
    }
    /**
     * Remove a member from this lobby.
     * @param userID The ID of the user to remove from the lobby.
     */
    async removeMember(userID) {
        return this.client.rest.lobbies.removeMember(this.id, userID);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            applicationID: this.applicationID,
            linkedChannel: this.linkedChannel ? (this.linkedChannel instanceof GuildChannel_1.default ? this.linkedChannel.toJSON() : this.linkedChannel) : undefined,
            members: this.members.map(member => member.toJSON()),
            metadata: this.metadata
        };
    }
    /**
     * Unlink this lobby from a channel. This requires bearer token authentication and the `CAN_LINK_LOBBY` flag on the member.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async unlinkChannel(accessToken) {
        return this.client.rest.lobbies.unlinkChannel(this.id, accessToken);
    }
    /**
     * Update the moderation metadata for a message in this lobby.
     * @param messageID The ID of the message to update the metadata for.
     * @param metadata The metadata to set for the message.
     */
    async updateMessageModerationMetadata(messageID, metadata) {
        return this.client.rest.lobbies.updateMessageModerationMetadata(this.id, messageID, metadata);
    }
}
exports.default = Lobby;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9iYnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9Mb2JieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvQkFBb0I7QUFDcEIsMERBQTBCO0FBQzFCLDBFQUEwQztBQUMxQyx3RUFBd0M7QUFJeEMsTUFBcUIsS0FBTSxTQUFRLGNBQUk7SUFDbkMsYUFBYSxDQUFTO0lBQ3RCLGFBQWEsQ0FBd0M7SUFDckQsT0FBTyxDQUFxQjtJQUM1QixRQUFRLENBQWlDO0lBQ3pDLFlBQVksSUFBNEIsRUFBRSxNQUFjO1FBQ3BELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUN6QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3RHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLHFCQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQWMsRUFBRSxPQUE2QztRQUN6RSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELHlCQUF5QjtJQUN6QixLQUFLLENBQUMsTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBdUM7UUFDOUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBb0I7UUFDNUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQTZCLEVBQUUsV0FBb0I7UUFDakUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQWM7UUFDN0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNqQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxZQUFZLHNCQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztZQUMvSSxPQUFPLEVBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDMUQsUUFBUSxFQUFPLElBQUksQ0FBQyxRQUFRO1NBQy9CLENBQUM7SUFDTixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBQyxXQUFvQjtRQUNwQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxTQUFpQixFQUFFLFFBQWdDO1FBQ3JGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7Q0FDSjtBQXRGRCx3QkFzRkMifQ==