"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module CommandInteraction */
const Constants_1 = require("../Constants");
const Errors_1 = require("../util/Errors");
const InteractionOptionsWrapper_1 = tslib_1.__importDefault(require("../util/interactions/InteractionOptionsWrapper"));
const MessageInteractionResponse_1 = tslib_1.__importDefault(require("../util/interactions/MessageInteractionResponse"));
const TypedCollection_1 = tslib_1.__importDefault(require("../util/TypedCollection"));
const Attachment_1 = tslib_1.__importDefault(require("./Attachment"));
const GuildChannel_1 = tslib_1.__importDefault(require("./GuildChannel"));
const Interaction_1 = tslib_1.__importDefault(require("./Interaction"));
const InteractionResolvedChannel_1 = tslib_1.__importDefault(require("./InteractionResolvedChannel"));
const Member_1 = tslib_1.__importDefault(require("./Member"));
const Message_1 = tslib_1.__importDefault(require("./Message"));
const Permission_1 = tslib_1.__importDefault(require("./Permission"));
const Role_1 = tslib_1.__importDefault(require("./Role"));
const User_1 = tslib_1.__importDefault(require("./User"));
/** Represents a command interaction. */
class CommandInteraction extends Interaction_1.default {
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
    /** The user that invoked this interaction. */
    user;
    constructor(data, client) {
        super(data, client);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        this.appPermissions = new Permission_1.default(data.app_permissions ?? "0");
        this.attachmentSizeLimit = data.attachment_size_limit;
        this.authorizingIntegrationOwners = data.authorizing_integration_owners;
        this.channelID = data.channel_id;
        this.context = data.context;
        const resolved = {
            attachments: new TypedCollection_1.default(Attachment_1.default, client),
            channels: new TypedCollection_1.default(InteractionResolvedChannel_1.default, client),
            members: new TypedCollection_1.default(Member_1.default, client),
            messages: new TypedCollection_1.default(Message_1.default, client),
            roles: new TypedCollection_1.default(Role_1.default, client),
            users: new TypedCollection_1.default(User_1.default, client),
        };
        this.entitlements = data.entitlements?.map(entitlement => client.util.updateEntitlement(entitlement)) ?? [];
        this.guildID = (data.guild_id ?? null);
        this.guildLocale = data.guild_locale;
        this.guildPartial = data.guild;
        this.locale = data.locale;
        this.member = (data.member === undefined ? null : this.client.util.updateMember(data.guild_id, data.member.user.id, data.member));
        this.memberPermissions = (data.member === undefined ? null : new Permission_1.default(data.member.permissions));
        this.user = client.users.update((data.user ?? data.member.user));
        if (data.data.resolved) {
            if (data.data.resolved.attachments) {
                for (const attachment of Object.values(data.data.resolved.attachments))
                    resolved.attachments.update(attachment);
            }
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
            if (data.data.resolved.messages) {
                for (const message of Object.values(data.data.resolved.messages)) {
                    const channel = client.getChannel(message.channel_id);
                    if (channel && "messages" in channel) {
                        resolved.messages.add(channel.messages.update(message));
                    }
                    else {
                        resolved.messages.update(message);
                    }
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
            guildID: data.data.guild_id,
            id: data.data.id,
            name: data.data.name,
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            options: new InteractionOptionsWrapper_1.default(data.data.options ?? [], resolved ?? null),
            resolved,
            target: null,
            targetID: data.data.target_id,
            type: data.data.type,
        };
        if (this.data.targetID) {
            if (this.data.type === Constants_1.ApplicationCommandTypes.USER) {
                this.data.target = resolved.users.get(this.data.targetID);
            }
            else if (this.data.type === Constants_1.ApplicationCommandTypes.MESSAGE) {
                this.data.target = resolved.messages.get(this.data.targetID);
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
            this._cachedGuild ??= this.client.guilds.get(this.guildID);
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
     * Defer this interaction. This is an initial response, and more than one initial response cannot be used.
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
    /** A type guard, checking if this command interaction is a {@link Constants~ApplicationCommandTypes.CHAT_INPUT | Chat Input} command. */
    isChatInputCommand() {
        return this.data.type === Constants_1.ApplicationCommandTypes.CHAT_INPUT;
    }
    /** A type guard, checking if this command interaction is a {@link Constants~ApplicationCommandTypes.MESSAGE | Message} command. */
    isMessageCommand() {
        return this.data.type === Constants_1.ApplicationCommandTypes.MESSAGE;
    }
    /** A type guard, checking if this command interaction is a {@link Constants~ApplicationCommandTypes.PRIMARY_ENTRY_POINT | Primary Entry Point} command. */
    isPrimaryEntryPointCommand() {
        return this.data.type === Constants_1.ApplicationCommandTypes.PRIMARY_ENTRY_POINT;
    }
    /** A type guard, checking if this command interaction is a {@link Constants~ApplicationCommandTypes.USER | User} command. */
    isUserCommand() {
        return this.data.type === Constants_1.ApplicationCommandTypes.USER;
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
exports.default = CommandInteraction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZEludGVyYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvQ29tbWFuZEludGVyYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUNqQyw0Q0FBc0k7QUFDdEksMkNBQStDO0FBQy9DLHVIQUF1RjtBQUN2Rix5SEFBK0s7QUFDL0ssc0ZBQXNEO0FBRXRELHNFQUFzQztBQUN0QywwRUFBMEM7QUFDMUMsd0VBQXdDO0FBQ3hDLHNHQUFzRTtBQUN0RSw4REFBOEI7QUFDOUIsZ0VBQWdDO0FBQ2hDLHNFQUFzQztBQUN0QywwREFBMEI7QUFDMUIsMERBQTBCO0FBUzFCLHdDQUF3QztBQUN4QyxNQUFxQixrQkFBdU4sU0FBUSxxQkFBVztJQUNuUCxjQUFjLENBQWtFO0lBQ2hGLFlBQVksQ0FBMkU7SUFDL0Ysb1FBQW9RO0lBQ3BRLGNBQWMsQ0FBYTtJQUMzQix1TkFBdU47SUFDdk4sbUJBQW1CLENBQVM7SUFDNUIsdVJBQXVSO0lBQ3ZSLDRCQUE0QixDQUFrRDtJQUM5RSw0REFBNEQ7SUFDNUQsU0FBUyxDQUFTO0lBQ2xCLGtEQUFrRDtJQUNsRCxPQUFPLENBQTJCO0lBQ2xDLGdEQUFnRDtJQUNoRCxJQUFJLENBQTZEO0lBQ2pFLG9HQUFvRztJQUNwRyxZQUFZLENBQXVDO0lBQ25ELHlFQUF5RTtJQUN6RSxPQUFPLENBQTRFO0lBQ25GLGdKQUFnSjtJQUNoSixXQUFXLENBQWlGO0lBQzVGLHVFQUF1RTtJQUN2RSxZQUFZLENBQTRJO0lBQ3hKLGdHQUFnRztJQUNoRyxNQUFNLENBQVM7SUFDZiw4RkFBOEY7SUFDOUYsTUFBTSxDQUE0RTtJQUNsRixpSEFBaUg7SUFDakgsaUJBQWlCLENBQW9GO0lBRXJHLDhDQUE4QztJQUM5QyxJQUFJLENBQU87SUFDWCxZQUFZLElBQXlELEVBQUUsTUFBYztRQUNqRixLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxD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