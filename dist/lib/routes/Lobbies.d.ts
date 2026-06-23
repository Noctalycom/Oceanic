import type RESTManager from "../rest/RESTManager";
import type { CreateLobbyOptions, AddLobbyMemberOptions, EditLobbyOptions } from "../types/lobbies";
import Lobby from "../structures/Lobby";
import LobbyMember from "../structures/LobbyMember";
/** Various methods for interacting with lobbies. Located at {@link Client#rest | Client#rest}{@link RESTManager#lobbies | .lobbies}. */
export default class Lobbies {
    private _manager;
    constructor(manager: RESTManager);
    /**
     * Add a member to a lobby.
     * @param lobbyID The ID of the lobby to add the member to.
     * @param userID The ID of the user to add to the lobby.
     * @param options The options for adding the member to the lobby.
     */
    addMember(lobbyID: string, userID: string, options?: AddLobbyMemberOptions): Promise<LobbyMember>;
    /**
     * Create a new lobby.
     * @param options The options for creating the lobby.
     * @caching This method **does not** cache its result.
     */
    create(options?: CreateLobbyOptions): Promise<Lobby>;
    /**
     * Delete a lobby.
     * @param lobbyID The ID of the lobby to delete.
     */
    delete(lobbyID: string): Promise<void>;
    /**
     * Edit a lobby.
     * @param lobbyID The ID of the lobby to edit.
     * @param options The options for editing the lobby.
     */
    edit(lobbyID: string, options: EditLobbyOptions): Promise<Lobby>;
    /**
     * Get a lobby.
     * @param lobbyID The ID of the lobby to retrieve.
     */
    get(lobbyID: string): Promise<Lobby>;
    /**
     * Leave a lobby. This requires bearer token authentication.
     * @param lobbyID The ID of the lobby to leave.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    leave(lobbyID: string, accessToken?: string): Promise<void>;
    /**
     * Link a lobby to a channel. This requires bearer token authentication and the `CAN_LINK_LOBBY` flag on the member.
     * @param lobbyID The ID of the lobby to link the channel to.
     * @param channelID The ID of the channel to link the lobby to.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    linkChannel(lobbyID: string, channelID: string | undefined, accessToken?: string): Promise<Lobby>;
    /**
     * Remove a member from a lobby.
     * @param lobbyID The ID of the lobby to remove the member from.
     * @param userID The ID of the user to remove from the lobby.
     */
    removeMember(lobbyID: string, userID: string): Promise<void>;
    /**
     * Unlink a lobby from a channel. This requires bearer token authentication and the `CAN_LINK_LOBBY` flag on the member.
     * @param lobbyID The ID of the lobby to unlink the channel from.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    unlinkChannel(lobbyID: string, accessToken?: string): Promise<Lobby>;
    /**
     * Update the moderation metadata for a message in a lobby.
     * @param lobbyID The ID of the lobby the message is in.
     * @param messageID The ID of the message to update the metadata for.
     * @param metadata The metadata to set for the message.
     */
    updateMessageModerationMetadata(lobbyID: string, messageID: string, metadata: Record<string, string>): Promise<void>;
}
