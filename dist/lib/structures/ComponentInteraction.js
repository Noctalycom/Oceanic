"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module ComponentInteraction */
const Interaction_1 = tslib_1.__importDefault(require("./Interaction"));
const Message_1 = tslib_1.__importDefault(require("./Message"));
const Member_1 = tslib_1.__importDefault(require("./Member"));
const Permission_1 = tslib_1.__importDefault(require("./Permission"));
const GuildChannel_1 = tslib_1.__importDefault(require("./GuildChannel"));
const Role_1 = tslib_1.__importDefault(require("./Role"));
const User_1 = tslib_1.__importDefault(require("./User"));
const InteractionResolvedChannel_1 = tslib_1.__importDefault(require("./InteractionResolvedChannel"));
const Constants_1 = require("../Constants");
const SelectMenuValuesWrapper_1 = tslib_1.__importDefault(require("../util/interactions/SelectMenuValuesWrapper"));
const TypedCollection_1 = tslib_1.__importDefault(require("../util/TypedCollection"));
const Errors_1 = require("../util/Errors");
const MessageInteractionResponse_1 = tslib_1.__importDefault(require("../util/interactions/MessageInteractionResponse"));
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
        if (data.message !== undefined && data.guild_id !== undefined) {
            data.message.guild_id = data.guild_id;
        }
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
                    customID: data.data.custom_id
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
                    users: new TypedCollection_1.default(User_1.default, client)
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
                    resolved
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
    /**
     * Create a followup message.
     * Note that the returned class is not a message. It is a wrapper around the interaction response. The {@link MessageInteractionResponse#getMessage | getMessage} function can be used to get the message.
     * @param options The options for creating the followup message.
     */
    async createFollowup(options) {
        const message = await this.client.rest.interactions.createFollowupMessage(this.applicationID, this.token, options);
        return new MessageInteractionResponse_1.default(this, message, "followup", null);
    }
    /**
     * Create a message through this interaction. This is an initial response, and more than one initial response cannot be used. Use  {@link ComponentInteraction#createFollowup | createFollowup}.
     * Note that the returned class is not a message. It is a wrapper around the interaction response. The {@link MessageInteractionResponse#getMessage | getMessage} function can be used to get the message.
     * @param options The options for the message.
     */
    async createMessage(options) {
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
    /**
     * Edit a followup message.
     * @param messageID The ID of the message.
     * @param options The options for editing the followup message.
     */
    async editFollowup(messageID, options) {
        return this.client.rest.interactions.editFollowupMessage(this.applicationID, this.token, messageID, options);
    }
    /**
     * Edit the original interaction response.
     * @param options The options for editing the original message.
     */
    async editOriginal(options) {
        return this.client.rest.interactions.editOriginalMessage(this.applicationID, this.token, options);
    }
    /**
     * Edit the message this interaction is from. If this interaction has already been acknowledged, use `editOriginal`.
     * @param options The options for editing the message.
     */
    async editParent(options) {
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
    /**
     * Reply to this interaction. If the interaction hasn't been acknowledged, {@link ComponentInteraction#createMessage | createMessage} is used. Else, {@link ComponentInteraction#createFollowup | createFollowup} is used.
     * Note that the returned class is not a message. It is a wrapper around the interaction response. The {@link MessageInteractionResponse#getMessage | getMessage} function can be used to get the message.
     * @param options The options for the message.
     */
    async reply(options) {
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
            user: this.user.toJSON()
        };
    }
}
exports.default = ComponentInteraction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9uZW50SW50ZXJhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9Db21wb25lbnRJbnRlcmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsd0VBQXdDO0FBQ3hDLGdFQUFnQztBQUVoQyw4REFBOEI7QUFDOUIsc0VBQXNDO0FBQ3RDLDBFQUEwQztBQUUxQywwREFBMEI7QUFDMUIsMERBQTBCO0FBQzFCLHNHQUFzRTtBQUt0RSw0Q0FNc0I7QUFDdEIsbUhBQW1GO0FBQ25GLHNGQUFzRDtBQUN0RCwyQ0FBK0M7QUFDL0MseUhBQStLO0FBRS9LLDBDQUEwQztBQUMxQyxNQUFxQixvQkFBeVAsU0FBUSxxQkFBVztJQUNyUixjQUFjLENBQWtFO0lBQ2hGLFlBQVksQ0FBMkU7SUFDL0Ysb1FBQW9RO0lBQ3BRLGNBQWMsQ0FBYTtJQUMzQix1TkFBdU47SUFDdk4sbUJBQW1CLENBQVM7SUFDNUIsdVJBQXVSO0lBQ3ZSLDRCQUE0QixDQUFrRDtJQUM5RSw0REFBNEQ7SUFDNUQsU0FBUyxDQUFTO0lBQ2xCLGtEQUFrRDtJQUNsRCxPQUFPLENBQTJCO0lBQ2xDLGdEQUFnRDtJQUNoRCxJQUFJLENBQTRKO0lBQ2hLLG9HQUFvRztJQUNwRyxZQUFZLENBQXVDO0lBQ25ELHlFQUF5RTtJQUN6RSxPQUFPLENBQTRFO0lBQ25GLGdKQUFnSjtJQUNoSixXQUFXLENBQWlGO0lBQzVGLHVFQUF1RTtJQUN2RSxZQUFZLENBQTRJO0lBQ3hKLGdHQUFnRztJQUNoRyxNQUFNLENBQVM7SUFDZiw4RkFBOEY7SUFDOUYsTUFBTSxDQUE0RTtJQUNsRixpSEFBaUg7SUFDakgsaUJBQWlCLENBQW9GO0lBQ3JHLDJDQUEyQztJQUMzQyxPQUFPLENBQWE7SUFFcEIsOENBQThDO0lBQzlDLElBQUksQ0FBTztJQUNYLFlBQVksSUFBdUQsRUFBRSxNQUFjO1FBQy9FLEtBQUssQ0FBQyxJ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