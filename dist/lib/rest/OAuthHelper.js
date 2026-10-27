"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module OAuthHelper */
const Constants_1 = require("../Constants");
const ExtendedUser_1 = tslib_1.__importDefault(require("../structures/ExtendedUser"));
const Integration_1 = tslib_1.__importDefault(require("../structures/Integration"));
const Member_1 = tslib_1.__importDefault(require("../structures/Member"));
const OAuthApplication_1 = tslib_1.__importDefault(require("../structures/OAuthApplication"));
const OAuthGuild_1 = tslib_1.__importDefault(require("../structures/OAuthGuild"));
const PartialApplication_1 = tslib_1.__importDefault(require("../structures/PartialApplication"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
/** A helper to make using authenticated oauth requests without needing a new client instance. */
class OAuthHelper {
    _manager;
    _token;
    constructor(manager, token) {
        this._token = token;
        this._manager = manager;
    }
    /**
     * Construct an oauth authorization url.
     * @param options The options to construct the url with.
     */
    static constructURL(options) {
        const params = [
            `client_id=${options.clientID}`,
            `response_type=${options.responseType ?? "code"}`,
            `scope=${options.scopes.join("%20")}`,
        ];
        if (options.redirectURI) {
            params.push(`redirect_uri=${options.redirectURI}`);
        }
        if (options.disableGuildSelect !== undefined) {
            params.push(`disable_guild_select=${String(options.disableGuildSelect)}`);
        }
        if (options.prompt) {
            params.push(`prompt=${options.prompt}`);
        }
        if (options.permissions) {
            params.push(`permissions=${options.permissions}`);
        }
        if (options.guildID) {
            params.push(`guild_id=${options.guildID}`);
        }
        if (options.state) {
            params.push(`state=${options.state}`);
        }
        if (options.integrationType) {
            params.push(`integration_type=${options.integrationType}`);
        }
        return `${Constants_1.BASE_URL}${Routes.OAUTH_AUTHORIZE}?${params.join("&")}`;
    }
    async addGuildMember(guildID, userID, options) {
        return this._manager.guilds.addMember(guildID, userID, { accessToken: this._token.split(" ").slice(1).join(" "), ...options });
    }
    /**
     * Delete the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param applicationID The ID of the application.
     * @caching This method **does not** cache its result.
     */
    async deleteRoleConnection(applicationID) {
        await this._manager.request({
            method: "DELETE",
            path: Routes.OAUTH_ROLE_CONNECTION(applicationID),
            auth: this._token,
        });
    }
    /**
     * Get the current OAuth2 application's information.
     */
    async getApplication() {
        return this._manager.request({
            method: "GET",
            path: Routes.OAUTH_APPLICATION,
            auth: this._token,
        }).then(data => new OAuthApplication_1.default(data, this._manager.client));
    }
    /**
     * Get information about the current authorization.
     */
    async getCurrentAuthorizationInformation() {
        return this._manager.request({
            method: "GET",
            path: Routes.OAUTH_INFO,
            auth: this._token,
        }).then(data => ({
            application: new PartialApplication_1.default(data.application, this._manager.client),
            expires: new Date(data.expires),
            scopes: data.scopes,
            user: this._manager.client.users.update(data.user),
        }));
    }
    /**
     * Get the connections of the currently authenticated user.
     *
     * Note: Requires the `connections` scope.
     */
    async getCurrentConnections() {
        return this._manager.request({
            method: "GET",
            path: Routes.OAUTH_CONNECTIONS,
            auth: this._token,
        }).then(data => data.map(connection => ({
            friendSync: connection.friend_sync,
            id: connection.id,
            integrations: connection.integrations?.map(integration => new Integration_1.default(integration, this._manager.client)),
            name: connection.name,
            revoked: connection.revoked,
            showActivity: connection.show_activity,
            twoWayLink: connection.two_way_link,
            type: connection.type,
            verified: connection.verified,
            visibility: connection.visibility,
        })));
    }
    /**
     * Get the guild member information about the currently authenticated user.
     *
     * Note: Requires the `guilds.members.read` scope.
     * @param guild the ID of the guild
     */
    async getCurrentGuildMember(guild) {
        return this._manager.request({
            method: "GET",
            path: Routes.OAUTH_GUILD_MEMBER(guild),
            auth: this._token,
        }).then(data => new Member_1.default(data, this._manager.client, guild));
    }
    /**
     * Get the currently authenticated user's guilds. Note these are missing several properties gateway guilds have.
     */
    async getCurrentGuilds() {
        return this._manager.request({
            method: "GET",
            path: Routes.OAUTH_GUILDS,
            auth: this._token,
        }).then(data => data.map(d => new OAuthGuild_1.default(d, this._manager.client)));
    }
    /**
     * Get the currently authenticated user's information.
     *
     * Note: This does not touch the client's cache in any way.
     */
    async getCurrentUser() {
        return this._manager.request({
            method: "GET",
            path: Routes.OAUTH_CURRENT_USER,
            auth: this._token,
        }).then(data => new ExtendedUser_1.default(data, this._manager.client));
    }
    /**
     * Get the currently authenticated user's entitlements for an application.
     * @caching This method **does not** cache its result. If an entitlement's application id is the client's application id.
     * @caches {@link ClientApplication#entitlements | ClientApplication#entitlements}
     */
    async getEntitlements(applicationID) {
        return this._manager.request({
            method: "GET",
            path: Routes.OAUTH_ENTITLEMENTS(applicationID),
            auth: this._token,
        }).then(data => data.map(d => this._manager.client.util.updateEntitlement(d)));
    }
    /**
     * Get the OIDC userinfo.
     *
     * Note: requires the `openid` scope.
     */
    async getOIDCUserInfo() {
        return this._manager.request({
            method: "GET",
            path: Routes.OAUTH_OIDC_USERINFO,
            auth: this._token,
        }).then(data => ({
            email: data.email,
            emailVerified: data.email_verified,
            locale: data.locale,
            nickname: data.nickname,
            picture: data.picture,
            preferredUsername: data.preferred_username,
            sub: data.sub,
        }));
    }
    /**
     * Revoke the used access token.
     * @param options The options for revoking the token.
     */
    async revokeToken(options) {
        const form = new FormData();
        form.append("client_id", options.clientID);
        form.append("client_secret", options.clientSecret);
        form.append("token", this._token);
        await this._manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_TOKEN_REVOKE,
            form,
        });
    }
    /**
     * Update the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param applicationID The ID of the application.
     * @param data The metadata to update.
     */
    async updateRoleConnection(applicationID, data) {
        return this._manager.request({
            method: "PUT",
            path: Routes.OAUTH_ROLE_CONNECTION(applicationID),
            json: {
                metadata: data.metadata,
                platform_name: data.platformName,
                platform_username: data.platformUsername,
            },
            auth: this._token,
        }).then(d => ({
            metadata: Object.entries(d.metadata).map(([key, value]) => ({
                [key]: {
                    description: value.description,
                    descriptionLocalizations: value.description_localizations,
                    key: value.key,
                    name: value.name,
                    nameLocalizations: value.name_localizations,
                    type: value.type,
                },
            })).reduce((a, b) => ({ ...a, ...b })),
            platformName: d.platform_name,
            platformUsername: d.platform_username,
        }));
    }
}
exports.default = OAuthHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcmVzdC9PQXV0aEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsNENBQXdDO0FBQ3hDLHNGQUFzRDtBQUN0RCxvRkFBb0Q7QUFDcEQsMEVBQTBDO0FBQzFDLDhGQUE4RDtBQUM5RCxrRkFBa0Q7QUFDbEQsa0dBQWtFO0FBQ2xFLCtEQUF5QztBQU96QyxpR0FBaUc7QUFDakcsTUFBcUIsV0FBVztJQUNwQixRQUFRLENBQWM7SUFDdEIsTUFBTSxDQUFTO0lBQ3ZCLFlBQVksT0FBb0IsRUFBRSxLQUFhO1FBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQW9DO1FBQ3BELE1BQU0sTUFBTSxHQUFrQjtZQUMxQixhQUFhLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDL0IsaUJBQWlCLE9BQU8sQ0FBQyxZQUFZLElBQUksTUFBTSxFQUFFO1lBQ2pELFNBQVMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7U0FDeEMsQ0FBQztRQUNGLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxrQkFBa0IsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLENBQUM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FB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