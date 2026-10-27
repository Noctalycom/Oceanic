"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module REST/OAuth */
const OAuthHelper_1 = tslib_1.__importDefault(require("../rest/OAuthHelper"));
const ExtendedUser_1 = tslib_1.__importDefault(require("../structures/ExtendedUser"));
const Integration_1 = tslib_1.__importDefault(require("../structures/Integration"));
const Member_1 = tslib_1.__importDefault(require("../structures/Member"));
const OAuthApplication_1 = tslib_1.__importDefault(require("../structures/OAuthApplication"));
const OAuthGuild_1 = tslib_1.__importDefault(require("../structures/OAuthGuild"));
const PartialApplication_1 = tslib_1.__importDefault(require("../structures/PartialApplication"));
const Webhook_1 = tslib_1.__importDefault(require("../structures/Webhook"));
const QueryBuilder_1 = tslib_1.__importDefault(require("../util/QueryBuilder"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
/** Various methods for interacting with oauth. Located at {@link Client#rest | Client#rest}{@link RESTManager#oauth | .oauth}. */
class OAuth {
    _manager;
    constructor(manager) {
        this._manager = manager;
    }
    /**
     * Get an access token for the application owner. If the application is owned by a team, this is restricted to `identify` & `applications.commands.update`.
     * @param options The options to for the client credentials grant.
     * @caching This method **does not** cache its result.
     */
    async clientCredentialsGrant(options) {
        options = this._manager.client.util._freeze(options);
        const form = new FormData();
        form.append("grant_type", "client_credentials");
        form.append("scope", options.scopes.join(" "));
        return this._manager.request({
            method: "POST",
            path: Routes.OAUTH_TOKEN,
            form,
            auth: (options.clientID ?? this._manager.client["_application"]) && options.clientSecret ? `Basic ${Buffer.from(`${options.clientID ?? this._manager.client["_application"].id}:${options.clientSecret}`).toString("base64")}` : true,
        }).then(data => ({
            accessToken: data.access_token,
            expiresIn: data.expires_in,
            scopes: data.scope.split(" "),
            tokenType: data.token_type,
            webhook: data.webhook ? new Webhook_1.default(data.webhook, this._manager.client) : null,
        }));
    }
    /**
     * Delete the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param applicationID The ID of the application.
     * @caching This method **does not** cache its result.
     */
    async deleteUserRoleConnection(applicationID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.OAUTH_ROLE_CONNECTION(applicationID),
        });
    }
    /**
     * Exchange a code for an access token.
     * @param options The options for exchanging the code.
     * @caching This method **does not** cache its result.
     */
    async exchangeCode(options) {
        options = this._manager.client.util._freeze(options);
        const form = new FormData();
        form.append("client_id", options.clientID);
        form.append("client_secret", options.clientSecret);
        form.append("code", options.code);
        form.append("grant_type", "authorization_code");
        form.append("redirect_uri", options.redirectURI);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_TOKEN,
            form,
        }).then(data => ({
            accessToken: data.access_token,
            expiresIn: data.expires_in,
            refreshToken: data.refresh_token,
            scopes: data.scope.split(" "),
            tokenType: data.token_type,
            webhook: data.webhook ? new Webhook_1.default(data.webhook, this._manager.client) : null,
        }));
    }
    /**
     * Get the current OAuth2 application's information.
     * @caching This method **does not** cache its result.
     */
    async getApplication() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_APPLICATION,
        }).then(data => new OAuthApplication_1.default(data, this._manager.client));
    }
    /**
     * Get information about the current authorization.
     *
     * Note: OAuth only. Bots cannot use this.
     * @caching This method **does** cache part of its result.
     * @caches {@link Client#users | Client#users}
     */
    async getCurrentAuthorizationInformation() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_INFO,
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
     * Note: Requires the `connections` scope when using oauth.
     * @caching This method **does not** cache its result.
     */
    async getCurrentConnections() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_CONNECTIONS,
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
     * Note: OAuth only. Requires the `guilds.members.read` scope. Bots cannot use this.
     * @param guildID the ID of the guild
     * @caching This method **does not** cache its result.
     */
    async getCurrentGuildMember(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_GUILD_MEMBER(guildID),
        }).then(data => new Member_1.default(data, this._manager.client, guildID));
    }
    /**
     * Get the currently authenticated user's guilds. Note these are missing several properties gateway guilds have.
     * @param options The options for getting the current user's guilds.
     * @caching This method **does not** cache its result.
     */
    async getCurrentGuilds(options) {
        const query = new QueryBuilder_1.default();
        query.setIfPresent("after", options?.after);
        query.setIfPresent("before", options?.before);
        query.setIfPresent("limit", options?.limit);
        query.setIfPresent("with_counts", options?.withCounts);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_GUILDS,
            query,
        }).then(data => data.map(d => new OAuthGuild_1.default(d, this._manager.client)));
    }
    /**
     * Get the currently authenticated user's information.
     * @caching This method **does not** cache its result.
     */
    async getCurrentUser() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_CURRENT_USER,
        }).then(data => new ExtendedUser_1.default(data, this._manager.client));
    }
    /**
     * Get the currently authenticated user's entitlements for an application.
     * @caching This method **may** cache its result. If an entitlement's application id is the client's application id.
     * @caches {@link ClientApplication#entitlements | ClientApplication#entitlements}
     */
    async getEntitlements(applicationID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_ENTITLEMENTS(applicationID),
        }).then(data => data.map(d => this._manager.client.util.updateEntitlement(d)));
    }
    /**
     * Get a helper instance that can be used with a specific access token.
     * @param accessToken The access token. Must be prefixed with `Bearer `.
     */
    getHelper(accessToken) {
        return new OAuthHelper_1.default(this._manager, accessToken);
    }
    /** Get the OIDC JWKS keys */
    async getOIDCKeys() {
        return this._manager.request({
            method: "GET",
            path: Routes.OAUTH_OIDC_KEYS,
        }).then(data => data.keys);
    }
    /**
     * Get the OIDC userinfo.
     *
     * Note: requires the `openid` scope.
     */
    async getOIDCUserInfo() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_OIDC_USERINFO,
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
     * Get an application's role connection metadata records.
     * @param applicationID The ID of the application.
     * @caching This method **does not** cache its result.
     */
    async getRoleConnectionsMetadata(applicationID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.ROLE_CONNECTIONS_METADATA(applicationID),
        }).then(data => data.map(d => ({
            description: d.description,
            descriptionLocalizations: d.description_localizations,
            key: d.key,
            name: d.name,
            nameLocalizations: d.name_localizations,
            type: d.type,
        })));
    }
    /**
     * Get the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param applicationID The ID of the application.
     * @caching This method **does not** cache its result.
     */
    async getUserRoleConnection(applicationID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_ROLE_CONNECTION(applicationID),
        }).then(data => ({
            metadata: Object.entries(data.metadata).map(([key, value]) => ({
                [key]: {
                    description: value.description,
                    descriptionLocalizations: value.description_localizations,
                    key: value.key,
                    name: value.name,
                    nameLocalizations: value.name_localizations,
                    type: value.type,
                },
            })).reduce((a, b) => ({ ...a, ...b })),
            platformName: data.platform_name,
            platformUsername: data.platform_username,
        }));
    }
    /**
     * Refresh an existing access token.
     * @param options The options for refreshing the token.
     * @caching This method **does not** cache its result.
     */
    async refreshToken(options) {
        options = this._manager.client.util._freeze(options);
        const form = new FormData();
        form.append("client_id", options.clientID);
        form.append("client_secret", options.clientSecret);
        form.append("grant_type", "refresh_token");
        form.append("refresh_token", options.refreshToken);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_TOKEN,
            form,
        }).then(data => ({
            accessToken: data.access_token,
            expiresIn: data.expires_in,
            refreshToken: data.refresh_token,
            scopes: data.scope.split(" "),
            tokenType: data.token_type,
        }));
    }
    /**
     * Revoke an access token.
     * @param options The options for revoking the token.
     * @caching This method **does not** cache its result.
     */
    async revokeToken(options) {
        options = this._manager.client.util._freeze(options);
        const form = new FormData();
        form.append("client_id", options.clientID);
        form.append("client_secret", options.clientSecret);
        form.append("token", options.token);
        await this._manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_TOKEN_REVOKE,
            form,
        });
    }
    /**
     * Update an application's role connections metadata.
     * @param applicationID The ID of the application.
     * @param metadata The metadata records.
     * @caching This method **does not** cache its result.
     */
    async updateRoleConnectionsMetadata(applicationID, metadata) {
        return this._manager.authRequest({
            method: "PUT",
            path: Routes.ROLE_CONNECTIONS_METADATA(applicationID),
            json: metadata.map(d => ({
                description: d.description,
                description_localizations: d.descriptionLocalizations,
                key: d.key,
                name: d.name,
                name_localizations: d.nameLocalizations,
                type: d.type,
            })),
        }).then(data => data.map(d => ({
            description: d.description,
            descriptionLocalizations: d.description_localizations,
            key: d.key,
            name: d.name,
            nameLocalizations: d.name_localizations,
            type: d.type,
        })));
    }
    /**
     * Update the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param applicationID The ID of the application.
     * @param data The metadata to update.
     * @caching This method **does not** cache its result.
     */
    async updateUserRoleConnection(applicationID, data) {
        return this._manager.authRequest({
            method: "PUT",
            path: Routes.OAUTH_ROLE_CONNECTION(applicationID),
            json: {
                metadata: data.metadata,
                platform_name: data.platformName,
                platform_username: data.platformUsername,
            },
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
exports.default = OAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcm91dGVzL09BdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlCQUF5QjtBQUN6Qiw4RUFBOEM7QUFDOUMsc0ZBQXNEO0FBQ3RELG9GQUFvRDtBQUNwRCwwRUFBMEM7QUFDMUMsOEZBQThEO0FBQzlELGtGQUFrRDtBQUNsRCxrR0FBa0U7QUFDbEUsNEVBQTRDO0FBQzVDLGdGQUFnRDtBQUNoRCwrREFBeUM7QUFPekMsa0lBQWtJO0FBQ2xJLE1BQXFCLEtBQUs7SUFDZCxRQUFRLENBQWM7SUFDOUIsWUFBWSxPQUFvQjtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxPQUFrRDtRQUMzRSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxNQUFNLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFnRDtZQUN4RSxNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBRSxNQUFNLENBQUMsV0FBVztZQUN4QixJQUFJO1lBQ0osSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNB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