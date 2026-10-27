"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module ComponentInteraction */
const Constants_1 = require("../Constants");
const Errors_1 = require("../util/Errors");
const MessageInteractionResponse_1 = tslib_1.__importDefault(require("../util/interactions/MessageInteractionResponse"));
const SelectMenuValuesWrapper_1 = tslib_1.__importDefault(require("../util/interactions/SelectMenuValuesWrapper"));
const TypedCollection_1 = tslib_1.__importDefault(require("../util/TypedCollection"));
const GuildChannel_1 = tslib_1.__importDefault(require("./GuildChannel"));
const Interaction_1 = tslib_1.__importDefault(require("./Interaction"));
const InteractionResolvedChannel_1 = tslib_1.__importDefault(require("./InteractionResolvedChannel"));
const Member_1 = tslib_1.__importDefault(require("./Member"));
const Message_1 = tslib_1.__importDefault(require("./Message"));
const Permission_1 = tslib_1.__importDefault(require("./Permission"));
const Role_1 = tslib_1.__importDefault(require("./Role"));
const User_1 = tslib_1.__importDefault(require("./User"));
/** Represents a component interaction. */
class ComponentInteraction extends Interaction_1.default {
    _cachedChannel;
    _cachedGuild;
    /** The permissions the bot has in the channel this interaction was sent from. If in a dm/group dm, this will contain `ATTACH_FILES`, `EMBED_LINKS`, and `MENTION_EVERYONE`. In addition, `USE_EXTERNAL_EMOJIS` will be included for DMs with the app's bot user. */
    appPermissions;
    /** The maximum size limit per attachment. This will be 10MiB by default, unless the user that created this interaction has a Nitro subscription or the guild it was sent from has been boosted to level 2 or above. */
    attachmentSizeLimit;
    /** Details about the authorizing user or server for the installation(s) relevant to the interaction. See [Discord's docs](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-authorizing-integration-owners-object) for more information. */
    authorizingIntegrationOwners;
    /** The ID of the channel this interaction was sent from. */
    channelID;
    /** The context this interaction was sent from. */
    context;
    /** The data associated with the interaction. */
    data;
    /** The entitlements for the user that created this interaction, and the guild it was created in. */
    entitlements;
    /** The id of the guild this interaction was sent from, if applicable. */
    guildID;
    /** The preferred [locale](https://discord.com/developers/docs/reference#locales) of the guild this interaction was sent from, if applicable. */
    guildLocale;
    /** The partial guild this interaction was sent from, if applicable. */
    guildPartial;
    /** The [locale](https://discord.com/developers/docs/reference#locales) of the invoking user. */
    locale;
    /** The member associated with the invoking user, if this interaction is sent from a guild. */
    member;
    /** The permissions of the member associated with the invoking user, if this interaction is sent from a guild. */
    memberPermissions;
    /** The message the interaction is from. */
    message;
    /** The user that invoked this interaction. */
    user;
    constructor(data, client) {
        super(data, client);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (data.message !== undefined && data.guild_id !== undefined) {
            data.message.guild_id = data.guild_id;
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        this.appPermissions = new Permission_1.default(data.app_permissions ?? "0");
        this.attachmentSizeLimit = data.attachment_size_limit;
        this.authorizingIntegrationOwners = data.authorizing_integration_owners;
        this.channelID = data.channel_id;
        this.context = data.context;
        this.entitlements = data.entitlements?.map(entitlement => client.util.updateEntitlement(entitlement)) ?? [];
        this.guildID = (data.guild_id ?? null);
        this.guildLocale = data.guild_locale;
        this.guildPartial = data.guild;
        this.locale = data.locale;
        this.member = (data.member === undefined ? null : this.client.util.updateMember(data.guild_id, data.member.user.id, data.member));
        this.memberPermissions = (data.member === undefined ? null : new Permission_1.default(data.member.permissions));
        this.message = (this.channel && "messages" in this.channel && this.channel.messages.update(data.message)) || new Message_1.default(data.message, client);
        this.user = client.users.update((data.user ?? data.member.user));
        switch (data.data.component_type) {
            case Constants_1.ComponentTypes.BUTTON: {
                this.data = {
                    componentType: data.data.component_type,
                    customID: data.data.custom_id,
                };
                break;
            }
            case Constants_1.ComponentTypes.STRING_SELECT:
            case Constants_1.ComponentTypes.USER_SELECT:
            case Constants_1.ComponentTypes.ROLE_SELECT:
            case Constants_1.ComponentTypes.MENTIONABLE_SELECT:
            case Constants_1.ComponentTypes.CHANNEL_SELECT: {
                const resolved = {
                    channels: new TypedCollection_1.default(InteractionResolvedChannel_1.default, client),
                    members: new TypedCollection_1.default(Member_1.default, client),
                    roles: new TypedCollection_1.default(Role_1.default, client),
                    users: new TypedCollection_1.default(User_1.default, client),
                };
                if (data.data.resolved) {
                    if (data.data.resolved.channels) {
                        for (const channel of Object.values(data.data.resolved.channels))
                            resolved.channels.update(channel);
                    }
                    if (data.data.resolved.members) {
                        for (const [id, member] of Object.entries(data.data.resolved.members)) {
                            const m = member;
                            m.user = data.data.resolved.users[id];
                            resolved.members.add(client.util.updateMember(data.guild_id, id, m));
                        }
                    }
                    if (data.data.resolved.roles) {
                        for (const role of Object.values(data.data.resolved.roles)) {
                            try {
                                resolved.roles.add(this.guild?.roles.update(role, this.guildID) ?? new Role_1.default(role, client, this.guildID));
                            }
                            catch {
                                resolved.roles.add(new Role_1.default(role, client, this.guildID));
                            }
                        }
                    }
                    if (data.data.resolved.users) {
                        for (const user of Object.values(data.data.resolved.users))
                            resolved.users.add(client.users.update(user));
                    }
                }
                this.data = {
                    componentType: data.data.component_type,
                    customID: data.data.custom_id,
                    values: new SelectMenuValuesWrapper_1.default(resolved, data.data.values),
                    resolved,
                };
                break;
            }
        }
    }
    /** The channel this interaction was sent from. */
    get channel() {
        return this._cachedChannel ??= this.client.getChannel(this.channelID);
    }
    /** The guild this interaction was sent from, if applicable. This will throw an error if the guild is not cached. */
    get guild() {
        if (this.guildID !== null && this._cachedGuild !== null) {
            this._cachedGuild = this.client.guilds.get(this.guildID);
            if (!this._cachedGuild) {
                throw new Errors_1.UncachedError(this, "guild", "GUILDS", this.client);
            }
            return this._cachedGuild;
        }
        return this._cachedGuild === null ? this._cachedGuild : (this._cachedGuild = null);
    }
    async createFollowup(content, options) {
        if (typeof content === "string") {
            options = {
                ...options,
                content,
            };
        }
        else
            options = content;
        const message = await this.client.rest.interactions.createFollowupMessage(this.applicationID, this.token, options);
        return new MessageInteractionResponse_1.default(this, message, "followup", null);
    }
    async createMessage(content, options) {
        if (typeof content === "string") {
            options = {
                ...options,
                content,
            };
        }
        else
            options = content;
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        const cb = await this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE, data: options }, true);
        return new MessageInteractionResponse_1.default(this, null, "initial", cb);
    }
    /**
     * Respond to this interaction with a modal. This is an initial response, and more than one initial response cannot be used.
     * @param options The options for the modal.
     */
    async createModal(options) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.MODAL, data: options }, true);
    }
    /**
     * Defer this interaction with a `DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE` response. This is an initial response, and more than one initial response cannot be used.
     * @param flags The [flags](https://discord.com/developers/docs/resources/channel#message-object-message-flags) to respond with.
     */
    async defer(flags) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE, data: { flags } }, true);
    }
    /**
     * Defer this interaction with a `DEFERRED_UPDATE_MESSAGE` response. This is an initial response, and more than one initial response cannot be used.
     * @param flags The [flags](https://discord.com/developers/docs/resources/channel#message-object-message-flags) to respond with.
     */
    async deferUpdate(flags) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.DEFERRED_UPDATE_MESSAGE, data: { flags } }, true);
    }
    /**
     * Delete a follow-up message.
     * @param messageID The ID of the message.
     */
    async deleteFollowup(messageID) {
        return this.client.rest.interactions.deleteFollowupMessage(this.applicationID, this.token, messageID);
    }
    /**
     * Delete the original interaction response.
     */
    async deleteOriginal() {
        return this.client.rest.interactions.deleteOriginalMessage(this.applicationID, this.token);
    }
    async editFollowup(messageID, content, options) {
        if (typeof content === "string") {
            options = {
                ...options,
                content,
            };
        }
        else
            options = content;
        return this.client.rest.interactions.editFollowupMessage(this.applicationID, this.token, messageID, options);
    }
    async editOriginal(content, options) {
        if (typeof content === "string") {
            options = {
                ...options,
                content,
            };
        }
        else
            options = content;
        return this.client.rest.interactions.editOriginalMessage(this.applicationID, this.token, options);
    }
    async editParent(content, options) {
        if (typeof content === "string") {
            options = {
                ...options,
                content,
            };
        }
        else
            options = content;
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.UPDATE_MESSAGE, data: options }, true);
    }
    /**
     * Get a followup message.
     * @param messageID The ID of the message.
     */
    async getFollowup(messageID) {
        return this.client.rest.interactions.getFollowupMessage(this.applicationID, this.token, messageID);
    }
    /**
     * Get the original interaction response.
     */
    async getOriginal() {
        return this.client.rest.interactions.getOriginalMessage(this.applicationID, this.token);
    }
    /** Whether this interaction belongs to a cached guild channel. The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inCachedGuildChannel() {
        return this.channel instanceof GuildChannel_1.default;
    }
    /** Whether this interaction belongs to a private channel (PrivateChannel or uncached). The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inPrivateChannel() {
        return this.guildID === null;
    }
    /** Whether this interaction is a button interaction. The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the component type. */
    isButtonComponentInteraction() {
        return this.data.componentType === Constants_1.ComponentTypes.BUTTON;
    }
    /** Whether this interaction is a select menu interaction. The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the component type. */
    isSelectMenuComponentInteraction() {
        return this.data.componentType === Constants_1.ComponentTypes.STRING_SELECT
            || this.data.componentType === Constants_1.ComponentTypes.CHANNEL_SELECT
            || this.data.componentType === Constants_1.ComponentTypes.ROLE_SELECT
            || this.data.componentType === Constants_1.ComponentTypes.MENTIONABLE_SELECT
            || this.data.componentType === Constants_1.ComponentTypes.USER_SELECT;
    }
    /**
     * Launch the bot's activity. This is an initial response, and more than one initial response cannot be used.
     */
    async launchActivity() {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.LAUNCH_ACTIVITY }, true);
    }
    /**
     * Show a "premium required" response to the user. This is an initial response, and more than one initial response cannot be used.
     * @deprecated The {@link Constants~InteractionResponseTypes.PREMIUM_REQUIRED | PREMIUM_REQUIRED} interaction response type is now deprecated in favor of using {@link Types/Channels~PremiumButton | custom premium buttons}.
     */
    async premiumRequired() {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.PREMIUM_REQUIRED }, true);
    }
    async reply(content, options) {
        if (typeof content === "string") {
            options = {
                ...options,
                content,
            };
        }
        else
            options = content;
        return this.acknowledged ? this.createFollowup(options) : this.createMessage(options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            appPermissions: this.appPermissions.toJSON(),
            attachmentSizeLimit: this.attachmentSizeLimit,
            authorizingIntegrationOwners: this.authorizingIntegrationOwners,
            channelID: this.channelID,
            context: this.context,
            data: this.data,
            guildID: this.guildID ?? undefined,
            guildLocale: this.guildLocale,
            locale: this.locale,
            member: this.member?.toJSON(),
            type: this.type,
            user: this.user.toJSON(),
        };
    }
}
exports.default = ComponentInteraction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9uZW50SW50ZXJhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9Db21wb25lbnRJbnRlcmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsNENBTXNCO0FBQ3RCLDJDQUErQztBQUMvQyx5SEFBK0s7QUFDL0ssbUhBQW1GO0FBQ25GLHNGQUFzRDtBQUV0RCwwRUFBMEM7QUFDMUMsd0VBQXdDO0FBQ3hDLHNHQUFzRTtBQUN0RSw4REFBOEI7QUFDOUIsZ0VBQWdDO0FBQ2hDLHNFQUFzQztBQUN0QywwREFBMEI7QUFDMUIsMERBQTBCO0FBUzFCLDBDQUEwQztBQUMxQyxNQUFxQixvQkFBeVAsU0FBUSxxQkFBVztJQUNyUixjQUFjLENBQWtFO0lBQ2hGLFlBQVksQ0FBMkU7SUFDL0Ysb1FBQW9RO0lBQ3BRLGNBQWMsQ0FBYTtJQUMzQix1TkFBdU47SUFDdk4sbUJBQW1CLENBQVM7SUFDNUIsdVJBQXVSO0lBQ3ZSLDRCQUE0QixDQUFrRDtJQUM5RSw0REFBNEQ7SUFDNUQsU0FBUyxDQUFTO0lBQ2xCLGtEQUFrRDtJQUNsRCxPQUFPLENBQTJCO0lBQ2xDLGdEQUFnRDtJQUNoRCxJQUFJLENBQTRKO0lBQ2hLLG9HQUFvRztJQUNwRyxZQUFZLENBQXVDO0lBQ25ELHlFQUF5RTtJQUN6RSxPQUFPLENBQTRFO0lBQ25GLGdKQUFnSjtJQUNoSixXQUFXLENBQWlGO0lBQzVGLHVFQUF1RTtJQUN2RSxZQUFZLENBQTRJO0lBQ3hKLGdHQUFnRztJQUNoRyxNQUFNLENBQVM7SUFDZiw4RkFBOEY7SUFDOUYsTUFBTSxDQUE0RTtJQUNsRixpSEFBaUg7SUFDakgsaUJBQWlCLENBQW9GO0lBQ3JHLDJDQUEyQztJQUMzQyxPQUFPLENBQWE7SUFFcEIsOENBQThDO0lBQzlDLElBQUksQ0FBTztJQUNYLFlBQVksSUFBdUQsRUFBRSxNQUFjO1FBQy9FLEtBQUssQ0FBQyxJ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