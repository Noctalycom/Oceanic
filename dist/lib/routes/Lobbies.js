"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module REST/Channels */
const Routes = tslib_1.__importStar(require("../util/Routes"));
const Lobby_1 = tslib_1.__importDefault(require("../structures/Lobby"));
const LobbyMember_1 = tslib_1.__importDefault(require("../structures/LobbyMember"));
/** Various methods for interacting with lobbies. Located at {@link Client#rest | Client#rest}{@link RESTManager#lobbies | .lobbies}. */
class Lobbies {
    _manager;
    constructor(manager) {
        this._manager = manager;
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
            json: options
        }).then(data => new LobbyMember_1.default(data, this._manager.client, lobbyID));
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
                metadata: options?.metadata,
                members: options?.members,
                idle_timeout_seconds: options?.idleTimeoutSeconds
            }
        }).then(data => new Lobby_1.default(data, this._manager.client));
    }
    /**
     * Delete a lobby.
     * @param lobbyID The ID of the lobby to delete.
     */
    async delete(lobbyID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.LOBBY(lobbyID)
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
                metadata: options?.metadata,
                members: options?.members,
                idle_timeout_seconds: options?.idleTimeoutSeconds
            }
        }).then(data => new Lobby_1.default(data, this._manager.client));
    }
    /**
     * Get a lobby.
     * @param lobbyID The ID of the lobby to retrieve.
     */
    async get(lobbyID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.LOBBY(lobbyID)
        }).then(data => new Lobby_1.default(data, this._manager.client));
    }
    /**
     * Leave a lobby. This requires bearer token authentication.
     * @param lobbyID The ID of the lobby to leave.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async leave(lobbyID, accessToken) {
        let auth = this._manager.client.options.auth;
        if (accessToken) {
            if (!accessToken.startsWith("Bearer ")) {
                accessToken = `Bearer ${accessToken}`;
            }
            auth = accessToken;
        }
        await this._manager.request({
            method: "DELETE",
            path: Routes.LOBBY_MEMBER(lobbyID, "@me"),
            auth
        });
    }
    /**
     * Link a lobby to a channel. This requires bearer token authentication and the `CAN_LINK_LOBBY` flag on the member.
     * @param lobbyID The ID of the lobby to link the channel to.
     * @param channelID The ID of the channel to link the lobby to.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async linkChannel(lobbyID, channelID, accessToken) {
        let auth = this._manager.client.options.auth;
        if (accessToken) {
            if (!accessToken.startsWith("Bearer ")) {
                accessToken = `Bearer ${accessToken}`;
            }
            auth = accessToken;
        }
        return this._manager.request({
            method: "POST",
            path: Routes.LOBBY_CHANNEL_LINKING(lobbyID),
            auth,
            json: { channel_id: channelID }
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
            path: Routes.LOBBY_MEMBER(lobbyID, userID)
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
            json: metadata
        });
    }
}
exports.default = Lobbies;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9iYmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9yb3V0ZXMvTG9iYmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0QkFBNEI7QUFDNUIsK0RBQXlDO0FBR3pDLHdFQUF3QztBQUN4QyxvRkFBb0Q7QUFFcEQsd0lBQXdJO0FBQ3hJLE1BQXFCLE9BQU87SUFDaEIsUUFBUSxDQUFjO0lBQzlCLFlBQVksT0FBb0I7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFlLEVBQUUsTUFBYyxFQUFFLE9BQStCO1FBQzVFLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQVc7WUFDdkMsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1lBQzVDLElBQUksRUFBSSxPQUFPO1NBQ2xCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLHFCQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQTRCO1FBQ3JDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQVc7WUFDdkMsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUks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