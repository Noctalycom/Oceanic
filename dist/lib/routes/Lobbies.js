"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module REST/Channels */
const Lobby_1 = tslib_1.__importDefault(require("../structures/Lobby"));
const LobbyMember_1 = tslib_1.__importDefault(require("../structures/LobbyMember"));
const LobbyMessage_1 = tslib_1.__importDefault(require("../structures/LobbyMessage"));
const QueryBuilder_1 = tslib_1.__importDefault(require("../util/QueryBuilder"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
function formatLobbyMember(member) {
    return {
        additional_name: member.additionalName,
        flags: member.flags,
        id: member.id,
        metadata: member.metadata,
    };
}
/** Various methods for interacting with lobbies. Located at {@link Client#rest | Client#rest}{@link RESTManager#lobbies | .lobbies}. */
class Lobbies {
    _manager;
    constructor(manager) {
        this._manager = manager;
    }
    _getBearerAuth(accessToken) {
        if (accessToken === undefined) {
            return this._manager.client.options.auth;
        }
        return accessToken.startsWith("Bearer ") ? accessToken : `Bearer ${accessToken}`;
    }
    /**
     * Add a member to a lobby.
     * @param lobbyID The ID of the lobby to add the member to.
     * @param userID The ID of the user to add to the lobby.
     * @param options The options for adding the member to the lobby.
     */
    async addMember(lobbyID, userID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PUT",
            path: Routes.LOBBY_MEMBER(lobbyID, userID),
            json: options ? {
                additional_name: options.additionalName,
                flags: options.flags,
                metadata: options.metadata,
            } : undefined,
        }).then(data => new LobbyMember_1.default(data, this._manager.client, lobbyID));
    }
    /**
     * Bulk update members in a lobby.
     * @param lobbyID The ID of the lobby to update members in.
     * @param members The members to update.
     */
    async bulkUpdateMembers(lobbyID, members) {
        members = this._manager.client.util._freeze(members);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.LOBBY_MEMBERS_BULK(lobbyID),
            json: members.map(member => ({
                ...formatLobbyMember(member),
                remove_member: member.removeMember,
            })),
        }).then(data => data.map(member => new LobbyMember_1.default(member, this._manager.client, lobbyID)));
    }
    /**
     * Create a new lobby.
     * @param options The options for creating the lobby.
     * @caching This method **does not** cache its result.
     */
    async create(options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.LOBBIES,
            json: {
                flags: options?.flags,
                metadata: options?.metadata,
                members: options?.members?.map(formatLobbyMember),
                idle_timeout_seconds: options?.idleTimeoutSeconds,
            },
        }).then(data => new Lobby_1.default(data, this._manager.client));
    }
    /**
     * Create an invite for the current user to join a lobby's linked channel. This requires bearer token authentication.
     * @param lobbyID The ID of the lobby to create the invite for.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async createCurrentUserInvite(lobbyID, accessToken) {
        return this._manager.request({
            method: "POST",
            path: Routes.LOBBY_MEMBER_INVITES(lobbyID, "@me"),
            auth: this._getBearerAuth(accessToken),
        });
    }
    /**
     * Create an invite for a user to join a lobby's linked channel. This requires bearer token authentication.
     * @param lobbyID The ID of the lobby to create the invite for.
     * @param userID The ID of the user to create the invite for.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async createInvite(lobbyID, userID, accessToken) {
        return this._manager.request({
            method: "POST",
            path: Routes.LOBBY_MEMBER_INVITES(lobbyID, userID),
            auth: this._getBearerAuth(accessToken),
        });
    }
    /**
     * Create a message in a lobby. This requires bearer token authentication.
     * @param lobbyID The ID of the lobby to create the message in.
     * @param options The options for creating the message.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async createMessage(lobbyID, options, accessToken) {
        options = this._manager.client.util._freeze(options);
        return this._manager.request({
            method: "POST",
            path: Routes.LOBBY_MESSAGES(lobbyID),
            auth: this._getBearerAuth(accessToken),
            json: {
                content: options.content,
                flags: options.flags,
                metadata: options.metadata,
            },
        }).then(data => new LobbyMessage_1.default(data, this._manager.client));
    }
    /**
     * Delete a lobby.
     * @param lobbyID The ID of the lobby to delete.
     */
    async delete(lobbyID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.LOBBY(lobbyID),
        });
    }
    /**
     * Edit a lobby.
     * @param lobbyID The ID of the lobby to edit.
     * @param options The options for editing the lobby.
     */
    async edit(lobbyID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.LOBBY(lobbyID),
            json: {
                flags: options.flags,
                metadata: options.metadata,
                members: options.members?.map(formatLobbyMember),
                idle_timeout_seconds: options.idleTimeoutSeconds,
            },
        }).then(data => new Lobby_1.default(data, this._manager.client));
    }
    /**
     * Get a lobby.
     * @param lobbyID The ID of the lobby to retrieve.
     */
    async get(lobbyID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.LOBBY(lobbyID),
        }).then(data => new Lobby_1.default(data, this._manager.client));
    }
    /**
     * Get messages in a lobby. This requires bearer token authentication.
     * @param lobbyID The ID of the lobby to get messages from.
     * @param options The options for getting the messages.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async getMessages(lobbyID, options, accessToken) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("limit", options?.limit);
        return this._manager.request({
            method: "GET",
            path: Routes.LOBBY_MESSAGES(lobbyID),
            auth: this._getBearerAuth(accessToken),
            query,
        }).then(data => data.map(message => new LobbyMessage_1.default(message, this._manager.client)));
    }
    /**
     * Join an existing lobby or create a new lobby.
     * @param options The options for joining or creating the lobby.
     * @caching This method **does not** cache its result.
     */
    async joinOrCreate(options) {
        options = this._manager.client.util._freeze(options);
        const requestOptions = {
            method: "PUT",
            path: Routes.LOBBIES,
            json: {
                flags: options.flags,
                idle_timeout_seconds: options.idleTimeoutSeconds,
                lobby_metadata: options.lobbyMetadata,
                member_metadata: options.memberMetadata,
                secret: options.secret,
            },
        };
        if (options.accessToken === undefined) {
            return this._manager.authRequest(requestOptions).then(data => new Lobby_1.default(data, this._manager.client));
        }
        return this._manager.request({
            ...requestOptions,
            auth: this._getBearerAuth(options.accessToken),
        }).then(data => new Lobby_1.default(data, this._manager.client));
    }
    /**
     * Leave a lobby. This requires bearer token authentication.
     * @param lobbyID The ID of the lobby to leave.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async leave(lobbyID, accessToken) {
        await this._manager.request({
            method: "DELETE",
            path: Routes.LOBBY_MEMBER(lobbyID, "@me"),
            auth: this._getBearerAuth(accessToken),
        });
    }
    /**
     * Link a lobby to a channel. This requires bearer token authentication and the `CAN_LINK_LOBBY` flag on the member.
     * @param lobbyID The ID of the lobby to link the channel to.
     * @param channelID The ID of the channel to link the lobby to.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async linkChannel(lobbyID, channelID, accessToken) {
        return this._manager.request({
            method: "PATCH",
            path: Routes.LOBBY_CHANNEL_LINKING(lobbyID),
            auth: this._getBearerAuth(accessToken),
            json: { channel_id: channelID },
        }).then(data => new Lobby_1.default(data, this._manager.client));
    }
    /**
     * Remove a member from a lobby.
     * @param lobbyID The ID of the lobby to remove the member from.
     * @param userID The ID of the user to remove from the lobby.
     */
    async removeMember(lobbyID, userID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.LOBBY_MEMBER(lobbyID, userID),
        });
    }
    /**
     * Unlink a lobby from a channel. This requires bearer token authentication and the `CAN_LINK_LOBBY` flag on the member.
     * @param lobbyID The ID of the lobby to unlink the channel from.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async unlinkChannel(lobbyID, accessToken) {
        return this.linkChannel(lobbyID, undefined, accessToken);
    }
    /**
     * Update the moderation metadata for a message in a lobby.
     * @param lobbyID The ID of the lobby the message is in.
     * @param messageID The ID of the message to update the metadata for.
     * @param metadata The metadata to set for the message.
     */
    async updateMessageModerationMetadata(lobbyID, messageID, metadata) {
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.LOBBY_MESSAGE_MODERATION_METADATA(lobbyID, messageID),
            json: metadata,
        });
    }
}
exports.default = Lobbies;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9iYmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9yb3V0ZXMvTG9iYmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0QkFBNEI7QUFDNUIsd0VBQXdDO0FBQ3hDLG9GQUFvRDtBQUNwRCxzRkFBc0Q7QUFDdEQsZ0ZBQWdEO0FBQ2hELCtEQUF5QztBQU16QyxTQUFTLGlCQUFpQixDQUFDLE1BQXdDO0lBQy9ELE9BQU87UUFDSCxlQUFlLEVBQUUsTUFBTSxDQUFDLGNBQWM7UUFDdEMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1FBQ25CLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNiLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtLQUM1QixDQUFDO0FBQ04sQ0FBQztBQUVELHdJQUF3STtBQUN4SSxNQUFxQixPQUFPO0lBQ2hCLFFBQVEsQ0FBYztJQUM5QixZQUFZLE9BQW9CO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFTyxjQUFjLENBQUMsV0FBb0I7UUFDdkMsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDNUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSyxDQUFDO1FBQzlDLENBQUM7UUFDRCxPQUFPLFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxXQUFXLEVBQUUsQ0FBQztJQUNyRixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQWUsRUFBRSxNQUFjLEVBQUUsT0FBK0I7UUFDNUUsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFD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