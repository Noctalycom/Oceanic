"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Message */
const Base_1 = tslib_1.__importDefault(require("./Base"));
const Attachment_1 = tslib_1.__importDefault(require("./Attachment"));
const User_1 = tslib_1.__importDefault(require("./User"));
const GuildChannel_1 = tslib_1.__importDefault(require("./GuildChannel"));
const Poll_1 = tslib_1.__importDefault(require("./Poll"));
const TypedCollection_1 = tslib_1.__importDefault(require("../util/TypedCollection"));
const Constants_1 = require("../Constants");
const Routes = tslib_1.__importStar(require("../util/Routes"));
const Errors_1 = require("../util/Errors");
/** Represents a message. */
class Message extends Base_1.default {
    _cachedChannel;
    _cachedGuild;
    /** The attachments on this message. */
    attachments;
    /** The author of this message. */
    author;
    /** The ID of the channel this message was created in. */
    channelID;
    /** The components on this message. */
    components;
    /** The content of this message. */
    content;
    /** The embeds on this message. */
    embeds;
    /** The [flags](https://discord.com/developers/docs/resources/channel#message-object-message-flags) on this message. */
    flags;
    /** The ID of the guild this message is in. */
    guildID;
    /** The interaction info, if this message was the result of an interaction. */
    interactionMetadata;
    /** The member that created this message, if this message is in a guild. */
    member;
    /** The mentions in this message. */
    mentions;
    /** If this message is a forwarded message, the partial contents of that message. */
    messageSnapshots;
    /** The poll on this message, if any. */
    poll;
    /** The reactions on this message. */
    reactions;
    /** The timestamp at which this message was sent. */
    timestamp;
    /** The [type](https://discord.com/developers/docs/resources/channel#message-object-message-types) of this message. */
    type;
    constructor(data, client) {
        super(data.id, client);
        this.attachments = new TypedCollection_1.default(Attachment_1.default, client);
        this.channelID = data.channel_id;
        this.components = [];
        this.content = data.content ?? "";
        this.embeds = [];
        this.flags = 0;
        this.guildID = (data.guild_id === undefined ? null : data.guild_id);
        this.member = (data.member === undefined ? undefined : this.client.util.updateMember(data.guild_id, data.author.id, { ...data.member, user: data.author }));
        this.mentions = {
            channels: [],
            everyone: false,
            members: [],
            roles: [],
            users: []
        };
        this.poll = data.poll ? new Poll_1.default(data.poll, client, this) : undefined;
        this.reactions = [];
        // message updates can be missing a timestamp
        this.timestamp = data.timestamp === undefined ? Base_1.default.getCreatedAt(this.id) : new Date(data.timestamp);
        this.type = data.type;
        this.update(data);
        // don't add webhook users to the cache
        this.author = data.webhook_id === undefined ? client.users.update(data.author) : new User_1.default(data.author, client);
    }
    update(data) {
        if (data.mention_everyone !== undefined) {
            this.mentions.everyone = data.mention_everyone;
        }
        if (data.mention_roles !== undefined) {
            this.mentions.roles = data.mention_roles;
        }
        if (data.mentions !== undefined) {
            const members = [];
            this.mentions.users = data.mentions.map(user => {
                if (this.channel && "guildID" in this.channel && user.member) {
                    members.push(this.client.util.updateMember(this.channel.guildID, user.id, { ...user.member, user }));
                }
                return this.client.users.update(user);
            });
            this.mentions.members = members;
        }
        if (data.attachments !== undefined) {
            if (this.attachments.size !== 0) {
                for (const id of this.attachments.keys()) {
                    if (!data.attachments.some(attachment => attachment.id === id)) {
                        this.attachments.delete(id);
                    }
                }
            }
            for (const attachment of data.attachments) {
                this.attachments.update(attachment);
            }
        }
        if (data.components !== undefined) {
            this.components = this.client.util.componentsToParsed(data.components);
        }
        if (data.content !== undefined) {
            this.content = data.content;
            this.mentions.channels = (data.content.match(/<#\d{17,21}>/g) ?? []).map(mention => mention.slice(2, -1));
        }
        if (data.embeds !== undefined) {
            this.embeds = this.client.util.embedsToParsed(data.embeds);
        }
        if (data.flags !== undefined) {
            this.flags = data.flags;
        }
        if (data.interaction_metadata !== undefined) {
            this.interactionMetadata = {
                authorizingIntegrationOwners: data.interaction_metadata.authorizing_integration_owners,
                id: data.interaction_metadata.id,
                interactedMessageID: data.interaction_metadata.interacted_message_id,
                name: data.interaction_metadata.name,
                originalResponseMessageID: data.interaction_metadata.original_response_message_id,
                targetMessageID: data.interaction_metadata.target_message_id,
                targetUser: data.interaction_metadata.target_user ? this.client.users.update(data.interaction_metadata.target_user) : undefined,
                type: data.interaction_metadata.type,
                user: this.client.users.update(data.interaction_metadata.user),
                triggeringInteractionMetadata: data.interaction_metadata.triggering_interaction_metadata === undefined ? undefined : {
                    authorizingIntegrationOwners: data.interaction_metadata.triggering_interaction_metadata.authorizing_integration_owners,
                    id: data.interaction_metadata.triggering_interaction_metadata.id,
                    interactedMessageID: data.interaction_metadata.triggering_interaction_metadata.interacted_message_id,
                    originalResponseMessageID: data.interaction_metadata.triggering_interaction_metadata.original_response_message_id,
                    targetMessageID: data.interaction_metadata.triggering_interaction_metadata.target_message_id,
                    targetUser: data.interaction_metadata.triggering_interaction_metadata.target_user ? this.client.users.update(data.interaction_metadata.triggering_interaction_metadata.target_user) : undefined,
                    type: data.interaction_metadata.triggering_interaction_metadata.type,
                    user: this.client.users.update(data.interaction_metadata.triggering_interaction_metadata.user)
                }
            };
        }
        if (data.message_snapshots) {
            this.messageSnapshots = data.message_snapshots.map(s => ({
                message: {
                    attachments: s.message.attachments.map(a => new Attachment_1.default(a, this.client)),
                    components: s.message.components ? this.client.util.componentsToParsed(s.message.components) : [],
                    content: s.message.content,
                    editedTimestamp: s.message.edited_timestamp ? new Date(s.message.edited_timestamp) : null,
                    embeds: this.client.util.embedsToParsed(s.message.embeds),
                    flags: s.message.flags ?? 0,
                    mentions: {
                        channels: (s.message.content.match(/<#\d{17,21}>/g) ?? []).map(mention => mention.slice(2, -1)),
                        roles: s.message.mention_roles,
                        users: s.message.mentions.map(u => this.client.users.update(u))
                    },
                    stickerItems: s.message.sticker_items ?? [],
                    timestamp: new Date(s.message.timestamp),
                    type: s.message.type
                }
            }));
        }
        if (data.reactions) {
            this.reactions = data.reactions.map(r => ({
                burstColors: r.burst_colors,
                count: r.count,
                countDetails: r.count_details,
                emoji: r.emoji,
                me: r.me,
                meBurst: r.me_burst
            }));
        }
    }
    /** The channel this message was created in. */
    get channel() {
        return this._cachedChannel ??= this.client.getChannel(this.channelID);
    }
    /** The guild this message is in. This will throw an error if the guild is not cached. */
    get guild() {
        if (this.guildID !== null && this._cachedGuild !== null) {
            this._cachedGuild ??= this.client.guilds.get(this.guildID);
            if (!this._cachedGuild) {
                if (this.client.options.restMode) {
                    throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present when rest mode is enabled.`);
                }
                if (!this.client.shards.connected) {
                    throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present without a gateway connection.`);
                }
                throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present.`);
            }
            return this._cachedGuild;
        }
        return this._cachedGuild === null ? this._cachedGuild : (this._cachedGuild = null);
    }
    /** A link to this message. */
    get jumpLink() {
        return `${Constants_1.BASE_URL}${Routes.MESSAGE_LINK(this.guildID ?? "@me", this.channelID, this.id)}`;
    }
    /**
     * Add a reaction to this message.
     * @param emoji The reaction to add to the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     */
    async createReaction(emoji) {
        return this.client.rest.channels.createReaction(this.channelID, this.id, emoji);
    }
    /**
     * Crosspost this message in an announcement channel.
     */
    async crosspost() {
        return this.client.rest.channels.crosspostMessage(this.channelID, this.id);
    }
    /**
     * Delete this message.
     * @param reason The reason for deleting the message.
     */
    async delete(reason) {
        return this.client.rest.channels.deleteMessage(this.channelID, this.id, reason);
    }
    /**
     * Remove a reaction from this message.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param user The user to remove the reaction from, `@me` for the current user (default).
     */
    async deleteReaction(emoji, user = "@me") {
        return this.client.rest.channels.deleteReaction(this.channelID, this.id, emoji, user);
    }
    /**
     * Remove all, or a specific emoji's reactions from this message.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis. Omit to remove all reactions.
     */
    async deleteReactions(emoji) {
        return this.client.rest.channels.deleteReactions(this.channelID, this.id, emoji);
    }
    /**
     * Edit this message.
     * @param options The options for editing the message.
     */
    async edit(options) {
        return this.client.rest.channels.editMessage(this.channelID, this.id, options);
    }
    /** End this The poll on this message now. */
    async expire() {
        if (this.poll === undefined) {
            throw new TypeError("Message does not have a poll.");
        }
        await this.poll.expire();
    }
    /**
     * Get the users that voted on a poll answer.
     * @param answerID The ID of the poll answer to get voters for.
     * @param options The options for getting the voters.
     */
    async getPollAnswerUsers(answerID, options) {
        if (this.poll === undefined) {
            throw new TypeError("Message does not have a poll.");
        }
        return this.poll.getAnswerUsers(answerID, options);
    }
    /**
     * Get the users who reacted with a specific emoji on this message.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param options The options for getting the reactions.
     */
    async getReactions(emoji, options) {
        return this.client.rest.channels.getReactions(this.channelID, this.id, emoji, options);
    }
    /** Whether this message belongs to a cached guild channel. The only difference on using this method over a simple if statement is to easily update all the message properties typing definitions based on the channel it belongs to. */
    inCachedGuildChannel() {
        return this.channel instanceof GuildChannel_1.default;
    }
    /** Whether this message belongs to a direct message channel (PrivateChannel or uncached). The only difference on using this method over a simple if statement is to easily update all the message properties typing definitions based on the channel it belongs to. */
    inDirectMessageChannel() {
        return this.guildID === null;
    }
    /**
     * Pin this message.
     * @param reason The reason for pinning the message.
     */
    async pin(reason) {
        return this.client.rest.channels.pinMessage(this.channelID, this.id, reason);
    }
    /**
     * Create a thread from this message.
     * @param options The options for creating the thread.
     */
    async startThread(options) {
        return this.client.rest.channels.startThreadFromMessage(this.channelID, this.id, options);
    }
    toJSON() {
        const im = this.interactionMetadata;
        return {
            ...super.toJSON(),
            attachments: this.attachments.map(attachment => attachment.toJSON()),
            author: this.author.toJSON(),
            channelID: this.channelID,
            components: this.components,
            content: this.content,
            embeds: this.embeds,
            flags: this.flags,
            guildID: this.guildID ?? undefined,
            interactionMetadata: im === undefined ? undefined : {
                authorizingIntegrationOwners: im.authorizingIntegrationOwners,
                id: im.id,
                interactedMessageID: im.interactedMessageID,
                name: im.name,
                originalResponseMessageID: im.originalResponseMessageID,
                targetMessageID: im.targetMessageID,
                targetUser: im.targetUser instanceof User_1.default ? im.targetUser.toJSON() : im.targetUser,
                type: im.type,
                user: im.user instanceof User_1.default ? im.user.toJSON() : im.user,
                triggeringInteractionMetadata: im.triggeringInteractionMetadata === undefined ? undefined : {
                    authorizingIntegrationOwners: im.triggeringInteractionMetadata.authorizingIntegrationOwners,
                    id: im.triggeringInteractionMetadata.id,
                    interactedMessageID: im.triggeringInteractionMetadata.interactedMessageID,
                    originalResponseMessageID: im.triggeringInteractionMetadata.originalResponseMessageID,
                    targetMessageID: im.triggeringInteractionMetadata.targetMessageID,
                    targetUser: im.triggeringInteractionMetadata.targetUser instanceof User_1.default ? im.triggeringInteractionMetadata.targetUser.toJSON() : im.triggeringInteractionMetadata.targetUser,
                    type: im.triggeringInteractionMetadata.type,
                    user: im.triggeringInteractionMetadata.user instanceof User_1.default ? im.triggeringInteractionMetadata.user.toJSON() : im.triggeringInteractionMetadata.user
                }
            },
            mentions: {
                channels: this.mentions.channels,
                everyone: this.mentions.everyone,
                members: this.mentions.members.map(member => member.toJSON()),
                roles: this.mentions.roles,
                users: this.mentions.users.map(user => user.toJSON())
            },
            messageSnapshots: this.messageSnapshots?.map(s => ({
                message: {
                    attachments: s.message.attachments.map(a => a.toJSON()),
                    content: s.message.content,
                    editedTimestamp: s.message.editedTimestamp?.getTime() ?? null,
                    embeds: s.message.embeds,
                    flags: s.message.flags,
                    mentions: {
                        channels: s.message.mentions.channels,
                        roles: s.message.mentions.roles,
                        users: s.message.mentions.users.map(u => u.toJSON())
                    },
                    timestamp: s.message.timestamp.getTime(),
                    type: s.message.type
                }
            })),
            poll: this.poll?.toJSON(),
            reactions: this.reactions,
            timestamp: this.timestamp.getTime(),
            type: this.type
        };
    }
    /**
     * Unpin this message.
     * @param reason The reason for unpinning the message.
     */
    async unpin(reason) {
        return this.client.rest.channels.unpinMessage(this.channelID, this.id, reason);
    }
}
exports.default = Message;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL01lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0JBQXNCO0FBQ3RCLDBEQUEwQjtBQUMxQixzRUFBc0M7QUFDdEMsMERBQTBCO0FBTzFCLDBFQUEwQztBQUUxQywwREFBMEI7QUFHMUIsc0ZBQXNEO0FBQ3RELDRDQUEyRDtBQUMzRCwrREFBeUM7QUFDekMsMkNBQStDO0FBRS9DLDRCQUE0QjtBQUM1QixNQUFxQixPQUF5SSxTQUFRLGNBQUk7SUFDOUosY0FBYyxDQUErRDtJQUM3RSxZQUFZLENBQTJFO0lBQy9GLHVDQUF1QztJQUN2QyxXQUFXLENBQTREO0lBQ3ZFLGtDQUFrQztJQUNsQyxNQUFNLENBQU87SUFDYix5REFBeUQ7SUFDekQsU0FBUyxDQUFTO0lBQ2xCLHNDQUFzQztJQUN0QyxVQUFVLENBQXlDO0lBQ25ELG1DQUFtQztJQUNuQyxPQUFPLENBQVM7SUFDaEIsa0NBQWtDO0lBQ2xDLE1BQU0sQ0FBOEI7SUFDcEMsdUhBQXVIO0lBQ3ZILEtBQUssQ0FBUztJQUNkLDhDQUE4QztJQUM5QyxPQUFPLENBQTRFO0lBQ25GLDhFQUE4RTtJQUM5RSxtQkFBbUIsQ0FBZ0Q7SUFDbkUsMkVBQTJFO0lBQzNFLE1BQU0sQ0FBaUY7SUFDdkYsb0NBQW9DO0lBQ3BDLFFBQVEsQ0FBaUM7SUFDekMsb0ZBQW9GO0lBQ3BGLGdCQUFnQixDQUF5QztJQUN6RCx3Q0FBd0M7SUFDeEMsSUFBSSxDQUFRO0lBQ1oscUNBQXFDO0lBQ3JDLFNBQVMsQ0FBd0M7SUFDakQsb0RBQW9EO0lBQ3BELFNBQVMsQ0FBTztJQUNoQixzSEFBc0g7SUFDdEgsSUFBSSxDQUFlO0lBQ25CLFlBQVksSUFBK0IsRUFBRSxNQUFjO1FBQ3ZELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFX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