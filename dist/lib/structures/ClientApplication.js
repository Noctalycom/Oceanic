"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module ClientApplication */
const TypedCollection_1 = tslib_1.__importDefault(require("../util/TypedCollection"));
const Base_1 = tslib_1.__importDefault(require("./Base"));
const BaseEntitlement_1 = tslib_1.__importDefault(require("./BaseEntitlement"));
const Entitlement_1 = tslib_1.__importDefault(require("./Entitlement"));
const Subscription_1 = tslib_1.__importDefault(require("./Subscription"));
const TestEntitlement_1 = tslib_1.__importDefault(require("./TestEntitlement"));
/** A representation of the authorized client's application (typically received via gateway). */
class ClientApplication extends Base_1.default {
    /** The entitlements for this application. This will almost certainly be empty unless you fetch entitlements, or recieve new/updated entitlements. */
    entitlements;
    /**
     * This application's [flags](https://discord.com/developers/docs/resources/application#application-object-application-flags).
     * @deprecated See {@link flagsNew}. This will likely be made a bigint in the future.
     */
    flags;
    /** This application's [flags](https://discord.com/developers/docs/resources/application#application-object-application-flags). */
    flagsNew;
    /** The subscriptions for this application. This will almost certainly be empty unless you fetch subscriptions, or recieve new/updated subscriptions. */
    subscriptions;
    constructor(data, client) {
        super(data.id, client);
        this.entitlements = new TypedCollection_1.default(BaseEntitlement_1.default, client, Infinity, {
            construct: (entitlement) => {
                if ("subscription_id" in entitlement && entitlement.subscription_id) {
                    return new Entitlement_1.default(entitlement, client);
                }
                return new TestEntitlement_1.default(entitlement, client);
            },
        });
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        this.flags = data.flags ?? 0;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        this.flagsNew = BigInt(data.flags_new ?? data.flags ?? "0");
        this.subscriptions = new TypedCollection_1.default(Subscription_1.default, client, Infinity);
        this.update(data);
    }
    update(data) {
        if (data.flags !== undefined) {
            this.flags = data.flags;
        }
        if (data.flags_new !== undefined) {
            this.flagsNew = BigInt(data.flags_new);
        }
    }
    /**
     * Overwrite all existing global application commands.
     * @param options The commands.
     */
    async bulkEditGlobalCommands(options) {
        return this.client.rest.applications.bulkEditGlobalCommands(this.id, options);
    }
    /**
     * Overwrite all existing application commands in a guild.
     * @param guildID The ID of the guild.
     * @param options The commands.
     */
    async bulkEditGuildCommands(guildID, options) {
        return this.client.rest.applications.bulkEditGuildCommands(this.id, guildID, options);
    }
    /**
     * Mark an entitlement as consumed.
     * @param entitlementID The ID of the entitlement to consume.
     */
    async consumeEntitlement(entitlementID) {
        return this.client.rest.applications.consumeEntitlement(this.id, entitlementID);
    }
    /**
     * Create an emoji for this application.
     * @param options The options for creating the emoji.
     * @caching This method **does not** cache its result.
     */
    async createEmoji(options) {
        return this.client.rest.applications.createEmoji(this.id, options);
    }
    /**
     * Create a global application command.
     * @param options The options for creating the command.
     */
    async createGlobalCommand(options) {
        return this.client.rest.applications.createGlobalCommand(this.id, options);
    }
    /**
     * Create a guild application command.
     * @param guildID The ID of the guild.
     * @param options The options for creating the command.
     */
    async createGuildCommand(guildID, options) {
        return this.client.rest.applications.createGuildCommand(this.id, guildID, options);
    }
    /**
     * Create a test entitlement.
     * @param options The options for creating the test entitlement.
     */
    async createTestEntitlement(options) {
        return this.client.rest.applications.createTestEntitlement(this.id, options);
    }
    /**
     * Delete an emoji for this application.
     * @param emojiID The ID of the emoji to be deleted.
     * @caching This method **does not** cache its result.
     */
    async deleteEmoji(emojiID) {
        return this.client.rest.applications.deleteEmoji(this.id, emojiID);
    }
    /**
     * Delete a global application command.
     * @param commandID The ID of the command.
     */
    async deleteGlobalCommand(commandID) {
        return this.client.rest.applications.deleteGlobalCommand(this.id, commandID);
    }
    /**
     * Delete a guild application command.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     */
    async deleteGuildCommand(guildID, commandID) {
        return this.client.rest.applications.deleteGuildCommand(this.id, guildID, commandID);
    }
    /**
     * Delete a test entitlement.
     * @param entitlementID The ID of the entitlement to delete.
     */
    async deleteTestEntitlement(entitlementID) {
        return this.client.rest.applications.deleteTestEntitlement(this.id, entitlementID);
    }
    /**
     * Edit this application.
     * @param options The options for editing the application.
     */
    async edit(options) {
        return this.client.rest.applications.editCurrent(options);
    }
    /**
     * Edit an existing emoji for this application.
     * @param emojiID The ID of the emoji to be edited.
     * @param options The options for editing the emoji.
     * @caching This method **does not** cache its result.
     */
    async editEmoji(emojiID, options) {
        return this.client.rest.applications.editEmoji(this.id, emojiID, options);
    }
    /**
     * Edit a global application command.
     * @param commandID The ID of the command.
     * @param options The options for editing the command.
     */
    async editGlobalCommand(commandID, options) {
        return this.client.rest.applications.editGlobalCommand(this.id, commandID, options);
    }
    /**
     * Edit a guild application command.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for editing the command.
     */
    async editGuildCommand(guildID, commandID, options) {
        return this.client.rest.applications.editGuildCommand(this.id, guildID, commandID, options);
    }
    /**
     * Edit a guild application command's permissions. This requires a bearer token with the `applications.commands.permissions.update` scope.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for editing the permissions.
     */
    async editGuildCommandPermissions(guildID, commandID, options) {
        return this.client.rest.applications.editGuildCommandPermissions(this.id, guildID, commandID, options);
    }
    /**
     * Get an activity instance.
     * @param instanceID The ID of the instance.
     */
    async getActivityInstance(instanceID) {
        return this.client.rest.applications.getActivityInstance(this.id, instanceID);
    }
    /**
     * Get an emoji for this application.
     * @param emojiID The ID of the emoji to get.
     */
    async getEmoji(emojiID) {
        return this.client.rest.applications.getEmoji(this.id, emojiID);
    }
    /**
     * Get the emojis for this application.
     */
    async getEmojis() {
        return this.client.rest.applications.getEmojis(this.id);
    }
    /**
     * Get an entitlement for this application.
     * @param entitlementID The ID of the entitlement.
     * @caching This method **may** cache its result. If an entitlement's application id is the client's application id.
     * @caches {@link ClientApplication#entitlements | ClientApplication#entitlements}
     */
    async getEntitlement(entitlementID) {
        return this.client.rest.applications.getEntitlement(this.id, entitlementID);
    }
    /**
     * Get the entitlements for this application.
     * @param options The options for getting the entitlements.
     * @caching This method **may** cache its result. If an entitlement's application id is the client's application id.
     * @caches {@link ClientApplication#entitlements | ClientApplication#entitlements}
     */
    async getEntitlements(options = {}) {
        return this.client.rest.applications.getEntitlements(this.id, options);
    }
    /**
     * Get a global application command.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     */
    async getGlobalCommand(commandID, options) {
        return this.client.rest.applications.getGlobalCommand(this.id, commandID, options);
    }
    /**
     * Get this application's global commands.
     * @param options The options for getting the command.
     */
    async getGlobalCommands(options) {
        return this.client.rest.applications.getGlobalCommands(this.id, options);
    }
    /**
     * Get a global application command.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     */
    async getGuildCommand(guildID, commandID, options) {
        return this.client.rest.applications.getGuildCommand(this.id, guildID, commandID, options);
    }
    /**
     * Get this application's commands in a specific guild.
     * @param guildID The ID of the guild.
     * @param options The options for getting the command.
     */
    async getGuildCommands(guildID, options) {
        return this.client.rest.applications.getGuildCommands(this.id, guildID, options);
    }
    /**
     * Get a command's permissions in a guild.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     */
    async getGuildPermission(guildID, commandID) {
        return this.client.rest.applications.getGuildPermission(this.id, guildID, commandID);
    }
    /**
     * Get the permissions for all commands in a guild.
     * @param guildID The ID of the guild.
     */
    async getGuildPermissions(guildID) {
        return this.client.rest.applications.getGuildPermissions(this.id, guildID);
    }
    /**
     * Get this application's role connection metadata records.
     */
    async getRoleConnectionsMetadata() {
        return this.client.rest.oauth.getRoleConnectionsMetadata(this.id);
    }
    /**
     * Get the SKUs for this application.
     */
    async getSKUs() {
        return this.client.rest.applications.getSKUs(this.id);
    }
    /**
     * Get the authenticated user's role connection object for this application. This requires the `role_connections.write` scope.
     */
    async getUserRoleConnection() {
        return this.client.rest.oauth.getUserRoleConnection(this.id);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            flags: this.flags,
            flagsNew: this.flagsNew,
        };
    }
    /**
     * Update this application's role connections metadata.
     * @param metadata The metadata records.
     */
    async updateRoleConnectionsMetadata(metadata) {
        return this.client.rest.oauth.updateRoleConnectionsMetadata(this.id, metadata);
    }
    /**
     * Update the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param data The metadata to update.
     */
    async updateUserRoleConnection(data) {
        return this.client.rest.oauth.updateUserRoleConnection(this.id, data);
    }
    /**
     * Upload an ephemeral attachment for this application.
     * The application must have Activities enabled (the `EMBEDDED` application flag). Applications without Activities enabled currently return an "Unknown Application" error.
     * This endpoint requires a user OAuth2 bearer token; client credentials grant tokens are not valid and currently produce a 500 error.
     * @param options The options for uploading the attachment.
     * @caching This method **does not** cache its result.
     */
    async uploadAttachment(options) {
        return this.client.rest.applications.uploadAttachment(this.id, options);
    }
}
exports.default = ClientApplication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50QXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9DbGllbnRBcHBsaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnQ0FBZ0M7QUFDaEMsc0ZBQXNEO0FBRXRELDBEQUEwQjtBQUMxQixnRkFBZ0Q7QUFDaEQsd0VBQXdDO0FBQ3hDLDBFQUEwQztBQUMxQyxnRkFBZ0Q7QUFTaEQsZ0dBQWdHO0FBQ2hHLE1BQXFCLGlCQUFrQixTQUFRLGNBQUk7SUFDL0MscUpBQXFKO0lBQ3JKLFlBQVksQ0FBNEg7SUFDeEk7OztPQUdHO0lBQ0gsS0FBSyxDQUFTO0lBQ2Qsa0lBQWtJO0lBQ2xJLFFBQVEsQ0FBUztJQUNqQix3SkFBd0o7SUFDeEosYUFBYSxDQUFvRTtJQUNqRixZQUFZLElBQTZDLEVBQUUsTUFBYztRQUNyRSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUkseUJBQWUsQ0FBQyx5QkFBZSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7WUFDdkUsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFtQixFQUFFO2dCQUN4QyxJQUFJLGlCQUFpQixJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQ2xFLE9BQU8sSUFBSSxxQkFBVyxDQUFDLFdBQWdELEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3JGLENBQUM7Z0JBRUQsT0FBTyxJQUFJLHlCQUFlLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELENBQUM7U0FDSixDQUE4SCxDQUFDO1FBQ2hJLHVFQUF1RTtRQUN2RSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQzdCLHVFQUF1RTtRQUN2RSxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLHlCQUFlLENBQUMsc0JBQVksRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRWtCLE1BQU0sQ0FBQyxJQUFzRDtRQUM1RSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzVCLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLHNCQUFzQixDQUFDLE9BQWtFO1FBQzNGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMscUJBQXFCLENBQUMsT0FBZSxFQUFFLE9BQXVFO1FBQ2hILE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsa0JBQWtCLENBQUMsYUFBcUI7UUFDMUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBeUQ7UUFDdkUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxtQkFBbUIsQ0FBb0gsT0FBVTtRQUNuSixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBSSxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGtCQUFrQixDQUE4SCxPQUFlLEVBQUUsT0FBVTtRQUM3SyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBSSxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLHFCQUFxQixDQUFDLE9BQXdEO1FBQ2hGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQWU7UUFDN0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxTQUFpQjtRQUN2QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE9BQWUsRUFBRSxTQUFpQjtRQUN2RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLHFCQUFxQixDQUFDLGFBQXFCO1FBQzdDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBa0Q7UUFDekQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBZSxFQUFFLE9BQXVEO1FBQ3BGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxpQkFBaUIsQ0FBZ0gsU0FBaUIsRUFBRSxPQUFVO1FBQ2hLLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxnQkFBZ0IsQ0FBMEgsT0FBZSxFQUFFLFNBQWlCLEVBQUUsT0FBVTtRQUMxTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBSSxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkcsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLDJCQUEyQixDQUFDLE9BQWUsRUFBRSxTQUFpQixFQUFFLE9BQW9FO1FBQ3RJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLG1CQUFtQixDQUFDLFVBQWtCO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBZTtRQUMxQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLGNBQWMsQ0FBQyxhQUFxQjtRQUN0QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsZUFBZSxDQUFDLFVBQXdELEVBQUU7UUFDNUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsZ0JBQWdCLENBQWdHLFNBQWlCLEVBQUUsT0FBeUQ7UUFDOUwsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUksSUFBSSxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUF5RDtRQUM3RSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxlQUFlLENBQWdHLE9BQWUsRUFBRSxTQUFpQixFQUFFLE9BQXlEO1FBQzlNLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBSSxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEcsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBZSxFQUFFLE9BQXlEO1FBQzdGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE9BQWUsRUFBRSxTQUFpQjtRQUN2RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLG1CQUFtQixDQUFDLE9BQWU7UUFDckMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsMEJBQTBCO1FBQzVCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLHFCQUFxQjtRQUN2QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDMUIsQ0FBQztJQUNOLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsNkJBQTZCLENBQUMsUUFBbUQ7UUFDbkYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLHdCQUF3QixDQUFDLElBQTREO1FBQ3ZGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUE4RDtRQUNqRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVFLENBQUM7Q0FDSjtBQTNVRCxvQ0EyVUMifQ==