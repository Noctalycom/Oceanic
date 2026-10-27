"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module REST/ApplicationCommands */
const Application_1 = tslib_1.__importDefault(require("../structures/Application"));
const ApplicationCommand_1 = tslib_1.__importDefault(require("../structures/ApplicationCommand"));
const Attachment_1 = tslib_1.__importDefault(require("../structures/Attachment"));
const ClientApplication_1 = tslib_1.__importDefault(require("../structures/ClientApplication"));
const SKU_1 = tslib_1.__importDefault(require("../structures/SKU"));
const Subscription_1 = tslib_1.__importDefault(require("../structures/Subscription"));
const TestEntitlement_1 = tslib_1.__importDefault(require("../structures/TestEntitlement"));
const QueryBuilder_1 = tslib_1.__importDefault(require("../util/QueryBuilder"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
/** Various methods for interacting with application commands. Located at {@link Client#rest | Client#rest}{@link RESTManager#applications | .applications}. */
class Applications {
    _manager;
    constructor(manager) {
        this._manager = manager;
    }
    /**
     * Overwrite all existing global application commands.
     * @param applicationID The ID of the application.
     * @param options The commands.
     * @caching This method **does not** cache its result.
     */
    async bulkEditGlobalCommands(applicationID, options) {
        const opts = options;
        return this._manager.authRequest({
            method: "PUT",
            path: Routes.APPLICATION_COMMANDS(applicationID),
            json: opts.map(opt => ({
                contexts: opt.contexts,
                description: opt.description,
                default_member_permissions: opt.defaultMemberPermissions,
                description_localizations: opt.descriptionLocalizations,
                dm_permission: opt.dmPermission,
                handler: opt.handler,
                integration_types: opt.integrationTypes,
                name: opt.name,
                name_localizations: opt.nameLocalizations,
                nsfw: opt.nsfw,
                options: opt.options?.map(o => this._manager.client.util.optionToRaw(o)),
                type: opt.type,
            })),
        }).then(data => data.map(d => new ApplicationCommand_1.default(d, this._manager.client)));
    }
    /**
     * Overwrite all existing application commands in a guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param options The commands.
     * @caching This method **does not** cache its result.
     */
    async bulkEditGuildCommands(applicationID, guildID, options) {
        const opts = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PUT",
            path: Routes.GUILD_APPLICATION_COMMANDS(applicationID, guildID),
            json: opts.map(opt => ({
                id: opt.id,
                default_member_permissions: opt.defaultMemberPermissions,
                description: opt.description,
                description_localizations: opt.descriptionLocalizations,
                dm_permission: opt.dmPermission,
                name: opt.name,
                name_localizations: opt.nameLocalizations,
                nsfw: opt.nsfw,
                options: opt.options?.map(o => this._manager.client.util.optionToRaw(o)),
                type: opt.type,
            })),
        }).then(data => data.map(d => new ApplicationCommand_1.default(d, this._manager.client)));
    }
    /**
     * Mark an entitlement as consumed.
     * @param applicationID The ID of the application to the entitlement is for.
     * @param entitlementID The ID of the entitlement to consume.
     */
    async consumeEntitlement(applicationID, entitlementID) {
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- explicit <void> call-site generic, not covered by allowInGenericTypeArguments
        await this._manager.authRequest({
            method: "POST",
            path: Routes.CONSUME_ENTITLEMENT(applicationID, entitlementID),
        });
    }
    /**
     * Create an emoji for an application.
     * @param applicationID The ID of the application.
     * @param options The options for creating the emoji.
     * @caching This method **does not** cache its result.
     */
    async createEmoji(applicationID, options) {
        options = this._manager.client.util._freeze(options);
        let image;
        if (options.image) {
            image = this._manager.client.util._convertImage(options.image, "image");
        }
        return this._manager.authRequest({
            method: "POST",
            path: Routes.APPLICATION_EMOJIS(applicationID),
            json: {
                name: options.name,
                image,
            },
        }).then(emoji => this._manager.client.util.convertApplicationEmoji(emoji));
    }
    /**
     * Create a global application command.
     * @param applicationID The ID of the application.
     * @param options The options for the command.
     * @caching This method **does not** cache its result.
     */
    async createGlobalCommand(applicationID, options) {
        const opt = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.APPLICATION_COMMANDS(applicationID),
            json: {
                contexts: opt.contexts,
                default_member_permissions: opt.defaultMemberPermissions,
                description_localizations: opt.descriptionLocalizations,
                description: opt.description,
                dm_permission: opt.dmPermission,
                handler: opt.handler,
                integration_types: opt.integrationTypes,
                name_localizations: opt.nameLocalizations,
                name: opt.name,
                nsfw: opt.nsfw,
                options: opt.options?.map(o => this._manager.client.util.optionToRaw(o)),
                type: opt.type,
            },
        }).then(data => new ApplicationCommand_1.default(data, this._manager.client));
    }
    /**
     * Create a guild application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param options The options for the command.
     * @caching This method **does not** cache its result.
     */
    async createGuildCommand(applicationID, guildID, options) {
        const opt = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.GUILD_APPLICATION_COMMANDS(applicationID, guildID),
            json: {
                default_member_permissions: opt.defaultMemberPermissions,
                description: opt.description,
                description_localizations: opt.descriptionLocalizations,
                dm_permission: opt.dmPermission,
                name: opt.name,
                name_localizations: opt.nameLocalizations,
                nsfw: opt.nsfw,
                options: opt.options?.map(o => this._manager.client.util.optionToRaw(o)),
                type: opt.type,
            },
        }).then(data => new ApplicationCommand_1.default(data, this._manager.client));
    }
    /**
     * Create a test entitlement.
     * @param applicationID The ID of the application to create the entitlement for.
     * @param options The options for creating the test entitlement.
     */
    async createTestEntitlement(applicationID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.ENTITLEMENTS(applicationID),
            json: {
                owner_id: options.ownerID,
                owner_type: options.ownerType,
                sku_id: options.skuID,
            },
        }).then(data => new TestEntitlement_1.default(data, this._manager.client));
    }
    /**
     * Delete an emoji for an application.
     * @param applicationID The ID of the application.
     * @param emojiID The ID of the emoji to be deleted.
     * @caching This method **does not** cache its result.
     */
    async deleteEmoji(applicationID, emojiID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.APPLICATION_EMOJI(applicationID, emojiID),
        });
    }
    /**
     * Delete a global application command.
     * @param applicationID The ID of the application.
     * @param commandID The ID the command to delete.
     * @caching This method **does not** cache its result.
     */
    async deleteGlobalCommand(applicationID, commandID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.APPLICATION_COMMAND(applicationID, commandID),
        });
    }
    /**
     * Delete a guild application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command to delete.
     * @caching This method **does not** cache its result.
     */
    async deleteGuildCommand(applicationID, guildID, commandID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.GUILD_APPLICATION_COMMAND(applicationID, guildID, commandID),
        });
    }
    /**
     * Delete an entitlement.
     * @param applicationID The ID of the application to delete the entitlement from.
     * @param entitlementID The ID of the entitlement to delete.
     */
    async deleteTestEntitlement(applicationID, entitlementID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.ENTITLEMENT(applicationID, entitlementID),
        });
    }
    /**
     * Edit the currently authenticated bot's application info.
     * @param options The options for editing the application.
     * @caching This method **does not** cache its result.
     */
    async editCurrent(options) {
        options = this._manager.client.util._freeze(options);
        let coverImage, icon;
        if (options.coverImage) {
            coverImage = this._manager.client.util._convertImage(options.coverImage, "cover image");
        }
        if (options.icon) {
            icon = this._manager.client.util._convertImage(options.icon, "icon");
        }
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.APPLICATION("@me"),
            json: {
                cover_image: coverImage,
                custom_install_url: options.customInstallURL,
                description: options.description,
                event_webhooks_status: options.eventWebhooksStatus,
                event_webhooks_types: options.eventWebhooksTypes,
                event_webhooks_url: options.eventWebhooksURL,
                flags: options.flags,
                icon,
                install_params: options.installParams,
                integration_types_config: options.integrationTypesConfig,
                interactions_endpoint_url: options.interactionsEndpointURL,
                role_connections_verification_url: options.roleConnectionsVerificationURL,
                tags: options.tags,
            },
        }).then(data => new Application_1.default(data, this._manager.client));
    }
    /**
     * Edit an existing emoji for an application.
     * @param applicationID The ID of the application.
     * @param emojiID The ID of the emoji to be edited.
     * @param options The options for editing the emoji.
     * @caching This method **does not** cache its result.
     */
    async editEmoji(applicationID, emojiID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.APPLICATION_EMOJI(applicationID, emojiID),
            json: { name: options.name },
        }).then(emoji => this._manager.client.util.convertApplicationEmoji(emoji));
    }
    /**
     * Edit a global application command.
     * @param applicationID The ID of the application.
     * @param commandID The ID of the command to edit.
     * @param options The options for editing the command.
     * @caching This method **does not** cache its result.
     */
    async editGlobalCommand(applicationID, commandID, options) {
        const opt = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.APPLICATION_COMMAND(applicationID, commandID),
            json: {
                contexts: opt.contexts,
                default_member_permissions: opt.defaultMemberPermissions,
                description: opt.description,
                description_localizations: opt.descriptionLocalizations,
                dm_permission: opt.dmPermission,
                integration_types: opt.integrationTypes,
                name: opt.name,
                name_localizations: opt.nameLocalizations,
                nsfw: opt.nsfw,
                options: opt.options?.map(o => this._manager.client.util.optionToRaw(o)),
            },
        }).then(data => new ApplicationCommand_1.default(data, this._manager.client));
    }
    /**
     * Edit a guild application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command to edit.
     * @param options The options for editing the command.
     * @caching This method **does not** cache its result.
     */
    async editGuildCommand(applicationID, guildID, commandID, options) {
        const opt = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_APPLICATION_COMMAND(applicationID, guildID, commandID),
            json: {
                default_member_permissions: opt.defaultMemberPermissions,
                description: opt.description,
                description_localizations: opt.descriptionLocalizations,
                dm_permission: opt.dmPermission,
                name: opt.name,
                name_localizations: opt.nameLocalizations,
                nsfw: opt.nsfw,
                options: opt.options?.map(o => this._manager.client.util.optionToRaw(o)),
            },
        }).then(data => new ApplicationCommand_1.default(data, this._manager.client));
    }
    /**
     * Edit a guild application command's permissions. This requires a bearer token with the `applications.commands.permissions.update` scope.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for editing the permissions.
     * @caching This method **does not** cache its result.
     */
    async editGuildCommandPermissions(applicationID, guildID, commandID, options) {
        options = this._manager.client.util._freeze(options);
        const path = Routes.GUILD_APPLICATION_COMMAND_PERMISSION(applicationID, guildID, commandID);
        const json = { permissions: options.permissions };
        return (options.accessToken
            ? this._manager.request({ method: "PUT", path, json, auth: options.accessToken })
            : this._manager.authRequest({ method: "PUT", path, json })).then(d => ({
            applicationID: d.application_id,
            guildID: d.guild_id,
            id: d.id,
            permissions: d.permissions,
        }));
    }
    /**
     * Get an application's info.
     * @param applicationID The ID of the application.
     * @caching This method **does not** cache its result.
     * @note This generally cannot be used on any application except the authenticated bot.
     */
    async get(applicationID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.APPLICATION(applicationID),
        }).then(data => new Application_1.default(data, this._manager.client));
    }
    /**
     * Get an activity instance.
     * @param applicationID The ID of the application.
     * @param instanceID The ID of the instance.
     */
    async getActivityInstance(applicationID, instanceID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.APPLICATION_ACTIVITY_INSTANCE(applicationID, instanceID),
        }).then(data => ({
            applicationID: data.application_id,
            instanceID: data.instance_id,
            launchID: data.launch_id,
            location: {
                channelID: data.location.channel_id,
                guildID: data.location.guild_id,
                id: data.location.id,
                kind: data.location.kind,
            },
            users: data.users,
        }));
    }
    /**
     * Get the currently authenticated bot's application info as a bare {@link ClientApplication | ClientApplication}.
     * @caching This method **does not** cache its result.
     */
    async getClient() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.APPLICATION("@me"),
        }).then(data => new ClientApplication_1.default(data, this._manager.client));
    }
    /**
     * Get the currently authenticated bot's application info.
     * @caching This method **does not** cache its result.
     */
    async getCurrent() {
        return this.get("@me");
    }
    /**
     * Get an emoji for an application.
     * @param applicationID The ID of the application to get the emojis of.
     * @param emojiID The ID of the emoji to get.
     * @caching This method **does not** cache its result.
     */
    async getEmoji(applicationID, emojiID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.APPLICATION_EMOJI(applicationID, emojiID),
        }).then(emoji => this._manager.client.util.convertApplicationEmoji(emoji));
    }
    /**
     * Get the emojis for an application.
     * @param applicationID The ID of the application to get the emojis of.
     * @caching This method **does not** cache its result.
     */
    async getEmojis(applicationID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.APPLICATION_EMOJIS(applicationID),
        }).then(({ items }) => ({
            items: items.map(item => this._manager.client.util.convertApplicationEmoji(item)),
        }));
    }
    /**
     * Get an entitlement for an application.
     * @param applicationID The ID of the application that the entitlement is for.
     * @param entitlementID The ID of the entitlement.
     * @caching This method **may** cache its result. If the entitlement's application id is the client's application id.
     * @caches {@link ClientApplication#entitlements | ClientApplication#entitlements}
     */
    async getEntitlement(applicationID, entitlementID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.ENTITLEMENT(applicationID, entitlementID),
        }).then(data => this._manager.client.util.updateEntitlement(data));
    }
    /**
     * Get the entitlements for an application.
     * @param applicationID The ID of the application to get the entitlements of.
     * @param options The options for getting the entitlements.
     * @caching This method **may** cache its result. If an entitlement's application id is the client's application id.
     * @caches {@link ClientApplication#entitlements | ClientApplication#entitlements}
     */
    async getEntitlements(applicationID, options = {}) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("after", options.after);
        query.setIfPresent("before", options.before);
        query.setIfPresent("exclude_deleted", options.excludeDeleted);
        query.setIfPresent("exclude_ended", options.excludeEnded);
        query.setIfPresent("guild_id", options.guildID);
        query.setIfPresent("limit", options.limit);
        query.setIfPresent("sku_ids", options.skuIDs?.join(","));
        query.setIfPresent("user_id", options.userID);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.ENTITLEMENTS(applicationID),
            query,
        }).then(data => data.map(d => this._manager.client.util.updateEntitlement(d)));
    }
    /**
     * Get a global application command.
     * @param applicationID The ID of the application.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     * @caching This method **does not** cache its result.
     */
    async getGlobalCommand(applicationID, commandID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("with_localizations", options?.withLocalizations);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.APPLICATION_COMMAND(applicationID, commandID),
            query,
            headers: options?.locale === undefined ? undefined : { "X-Discord-Locale": options.locale },
        }).then(data => new ApplicationCommand_1.default(data, this._manager.client));
    }
    /**
     * Get an application's global commands.
     * @param applicationID The ID of the application.
     * @param options The options for getting the command.
     * @caching This method **does not** cache its result.
     */
    async getGlobalCommands(applicationID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("with_localizations", options?.withLocalizations);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.APPLICATION_COMMANDS(applicationID),
            query,
            headers: options?.locale === undefined ? undefined : { "X-Discord-Locale": options.locale },
        }).then(data => data.map(d => new ApplicationCommand_1.default(d, this._manager.client)));
    }
    /**
     * Get a global application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     * @caching This method **does not** cache its result.
     */
    async getGuildCommand(applicationID, guildID, commandID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("with_localizations", options?.withLocalizations);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_APPLICATION_COMMAND(applicationID, guildID, commandID),
            query,
            headers: options?.locale === undefined ? undefined : { "X-Discord-Locale": options.locale },
        }).then(data => new ApplicationCommand_1.default(data, this._manager.client));
    }
    /**
     * Get an application's application commands in a specific guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param options The options for getting the command.
     * @caching This method **does not** cache its result.
     */
    async getGuildCommands(applicationID, guildID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("with_localizations", options?.withLocalizations);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_APPLICATION_COMMANDS(applicationID, guildID),
            query,
            headers: options?.locale === undefined ? undefined : { "X-Discord-Locale": options.locale },
        }).then(data => data.map(d => new ApplicationCommand_1.default(d, this._manager.client)));
    }
    /**
     * Get an application command's permissions in a guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @caching This method **does not** cache its result.
     */
    async getGuildPermission(applicationID, guildID, commandID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_APPLICATION_COMMAND_PERMISSION(applicationID, guildID, commandID),
        }).then(data => ({
            applicationID: data.application_id,
            guildID: data.guild_id,
            id: data.id,
            permissions: data.permissions,
        }));
    }
    /**
     * Get the permissions for all application commands in a guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    async getGuildPermissions(applicationID, guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_APPLICATION_COMMAND_PERMISSIONS(applicationID, guildID),
        }).then(data => data.map(d => ({
            applicationID: d.application_id,
            guildID: d.guild_id,
            id: d.id,
            permissions: d.permissions,
        })));
    }
    /**
     * Get the SKUs for an application.
     * @param applicationID The ID of the application to get the SKUs of.
     */
    async getSKUs(applicationID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.SKUS(applicationID),
        }).then(data => data.map(d => new SKU_1.default(d, this._manager.client)));
    }
    /**
     * Get the subscription for an SKU.
     * @param skuID The ID of the SKU to get the subscription of.
     * @param subscriptionID The ID of the subscription to get.
     */
    async getSKUSubscription(skuID, subscriptionID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.SKU_SUBSCRIPTION(skuID, subscriptionID),
        }).then(data => new Subscription_1.default(data, this._manager.client));
    }
    /**
     * Get the subscriptions for an SKU.
     * @param skuID The ID of the SKU to get the subscriptions of.
     * @param options The options for getting the subscriptions.
     */
    async getSKUSubscriptions(skuID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("after", options.after);
        query.setIfPresent("before", options.before);
        query.setIfPresent("limit", options.limit);
        query.setIfPresent("user_id", options.userID);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.SKU_SUBSCRIPTIONS(skuID),
            query,
        }).then(data => data.map(d => new Subscription_1.default(d, this._manager.client)));
    }
    /**
     * Upload an ephemeral attachment for an application.
     *
     * The application must have Activities enabled (the {@link ApplicationFlags~EMBEDDED EMBEDDED} application flag). Applications without Activities enabled currently return an "Unknown Application" error.
     *
     * This endpoint requires a user OAuth2 bearer token; client credentials grant tokens are not valid and currently produce a 500 error.
     *
     * The returned url is only valid for 24 hours.
     * @param applicationID The ID of the application.
     * @param options The options for uploading the attachment.
     * @caching This method **does not** cache its result.
     */
    async uploadAttachment(applicationID, options) {
        options = this._manager.client.util._freeze(options);
        const auth = options.accessToken.startsWith("Bearer ") ? options.accessToken : `Bearer ${options.accessToken}`;
        return this._manager.request({
            method: "POST",
            path: Routes.APPLICATION_ATTACHMENT(applicationID),
            files: [{ ...options.file, field: "file" }],
            auth,
        }).then(data => new Attachment_1.default(data.attachment, this._manager.client));
    }
}
exports.default = Applications;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3JvdXRlcy9BcHBsaWNhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQXVDO0FBQ3ZDLG9GQUFvRDtBQUNwRCxrR0FBa0U7QUFDbEUsa0ZBQWtEO0FBQ2xELGdHQUFnRTtBQUNoRSxvRUFBb0M7QUFDcEMsc0ZBQXNEO0FBQ3RELDRGQUE0RDtBQUM1RCxnRkFBZ0Q7QUFDaEQsK0RBQXlDO0FBTXpDLCtKQUErSjtBQUMvSixNQUFxQixZQUFZO0lBQ3JCLFFBQVEsQ0FBYztJQUM5QixZQUFZLE9BQW9CO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxhQUFxQixFQUFFLE9BQWtFO1FBQ2xILE1BQU0sSUFBSSxHQUFHLE9BQTZFLENBQUM7UUFDM0YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBa0Q7WUFDOUUsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUUsTUFBTSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQztZQUNoRCxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ25CLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtnQkFDdEIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXO2dCQUM1QiwwQkFBMEIsRUFBRSxHQUFHLENBQUMsd0JBQXdCO2dCQUN4RCx5QkFBeUIsRUFBRSxHQUFHLENBQUMsd0JBQXdCO2dCQUN2RCxhQUFhLEVBQUUsR0FBRyxDQUFDLFlBQVk7Z0JBQy9CLE9BQU8sRUFBRyxHQUFzRixDQUFDLE9BQU87Z0JBQ3hHLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxnQkFBZ0I7Z0JBQ3ZDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtn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