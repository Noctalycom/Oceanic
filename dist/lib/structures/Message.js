"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Message */
const Constants_1 = require("../Constants");
const Errors_1 = require("../util/Errors");
const Routes = tslib_1.__importStar(require("../util/Routes"));
const TypedCollection_1 = tslib_1.__importDefault(require("../util/TypedCollection"));
const Attachment_1 = tslib_1.__importDefault(require("./Attachment"));
const Base_1 = tslib_1.__importDefault(require("./Base"));
const GuildChannel_1 = tslib_1.__importDefault(require("./GuildChannel"));
const Poll_1 = tslib_1.__importDefault(require("./Poll"));
const User_1 = tslib_1.__importDefault(require("./User"));
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
    /**
     * The interaction info, if this message was the result of an interaction.
     * @deprecated Use {@link Message#interactionMetadata | Message#interactionMetadata } instead.
     */
    interaction;
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
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        this.content = data.content ?? "";
        this.embeds = [];
        this.flags = 0;
        this.guildID = data.guild_id ?? null;
        this.member = (data.member === undefined ? undefined : this.client.util.updateMember(data.guild_id, data.author.id, { ...data.member, user: data.author }));
        this.mentions = {
            channels: [],
            everyone: false,
            members: [],
            roles: [],
            users: [],
        };
        this.poll = data.poll ? new Poll_1.default(data.poll, client, this) : undefined;
        this.reactions = [];
        // message updates can be missing a timestamp
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        this.timestamp = data.timestamp === undefined ? Base_1.default.getCreatedAt(this.id) : new Date(data.timestamp);
        this.type = data.type;
        this.update(data);
        // don't add webhook users to the cache
        this.author = data.webhook_id === undefined ? client.users.update(data.author) : new User_1.default(data.author, client);
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
    update(data) {
        if (data.mention_everyone !== undefined) {
            this.mentions.everyone = data.mention_everyone;
        }
        if (data.mention_roles !== undefined) {
            this.mentions.roles = data.mention_roles;
        }
        if (data.mentions !== undefined) {
            const members = [];
            this.mentions.users = data.mentions.map((user) => {
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
        if (data.interaction !== undefined) {
            let member;
            if (data.interaction.member) {
                member = {
                    ...data.interaction.member,
                    user: data.interaction.user,
                };
            }
            this.interaction = {
                id: data.interaction.id,
                member: member ? this.client.util.updateMember(data.guild_id, member.user.id, member) : undefined,
                name: data.interaction.name,
                type: data.interaction.type,
                user: this.client.users.update(data.interaction.user),
            };
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
                    user: this.client.users.update(data.interaction_metadata.triggering_interaction_metadata.user),
                },
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
                        users: s.message.mentions.map(u => this.client.users.update(u)),
                    },
                    stickerItems: s.message.sticker_items ?? [],
                    timestamp: new Date(s.message.timestamp),
                    type: s.message.type,
                },
            }));
        }
        if (data.reactions) {
            this.reactions = data.reactions.map(r => ({
                burstColors: r.burst_colors,
                count: r.count,
                countDetails: r.count_details,
                emoji: r.emoji,
                me: r.me,
                meBurst: r.me_burst,
            }));
        }
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
    async edit(content, options) {
        if (typeof content === "string") {
            options = {
                ...options,
                content,
            };
        }
        else
            options = content;
        return this.client.rest.channels.editMessage(this.channelID, this.id, options);
    }
    /** End the poll on this message now. */
    async expire() {
        if (this.poll === undefined) {
            throw new TypeError("Message does not have a poll.");
        }
        await this.poll.expire();
    }
    async forward(channelID, content, options) {
        if (typeof content === "string") {
            options = {
                ...options,
                content,
            };
        }
        else
            options = content;
        return this.client.rest.channels.createMessage(channelID, {
            ...options,
            messageReference: {
                channelID: this.channelID,
                messageID: this.id,
                type: Constants_1.MessageReferenceType.FORWARD,
            },
        });
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
    async reply(content, options) {
        if (typeof content === "string") {
            options = {
                ...options,
                content,
            };
        }
        else
            options = content;
        return this.client.rest.channels.createMessage(this.channelID, {
            ...options,
            messageReference: {
                messageID: this.id,
                type: Constants_1.MessageReferenceType.DEFAULT,
            },
        });
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
            interaction: this.interaction === undefined ? undefined : {
                id: this.interaction.id,
                member: this.interaction.member?.toJSON(),
                name: this.interaction.name,
                type: this.interaction.type,
                user: this.interaction.user.toJSON(),
            },
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
                    user: im.triggeringInteractionMetadata.user instanceof User_1.default ? im.triggeringInteractionMetadata.user.toJSON() : im.triggeringInteractionMetadata.user,
                },
            },
            mentions: {
                channels: this.mentions.channels,
                everyone: this.mentions.everyone,
                members: this.mentions.members.map(member => member.toJSON()),
                roles: this.mentions.roles,
                users: this.mentions.users.map(user => user.toJSON()),
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
                        users: s.message.mentions.users.map(u => u.toJSON()),
                    },
                    timestamp: s.message.timestamp.getTime(),
                    type: s.message.type,
                },
            })),
            poll: this.poll?.toJSON(),
            reactions: this.reactions,
            timestamp: this.timestamp.getTime(),
            type: this.type,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL01lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0JBQXNCO0FBQ3RCLDRDQUFpRjtBQUNqRiwyQ0FBK0M7QUFDL0MsK0RBQXlDO0FBQ3pDLHNGQUFzRDtBQUV0RCxzRUFBc0M7QUFDdEMsMERBQTBCO0FBQzFCLDBFQUEwQztBQUMxQywwREFBMEI7QUFDMUIsMERBQTBCO0FBWTFCLDRCQUE0QjtBQUM1QixNQUFxQixPQUF5SSxTQUFRLGNBQUk7SUFDOUosY0FBYyxDQUErRDtJQUM3RSxZQUFZLENBQTJFO0lBQy9GLHVDQUF1QztJQUN2QyxXQUFXLENBQTREO0lBQ3ZFLGtDQUFrQztJQUNsQyxNQUFNLENBQU87SUFDYix5REFBeUQ7SUFDekQsU0FBUyxDQUFTO0lBQ2xCLHNDQUFzQztJQUN0QyxVQUFVLENBQXlDO0lBQ25ELG1DQUFtQztJQUNuQyxPQUFPLENBQVM7SUFDaEIsa0NBQWtDO0lBQ2xDLE1BQU0sQ0FBOEI7SUFDcEMsdUhBQXVIO0lBQ3ZILEtBQUssQ0FBUztJQUNkLDhDQUE4QztJQUM5QyxPQUFPLENBQTRFO0lBQ25GOzs7T0FHRztJQUNILFdBQVcsQ0FBcUM7SUFDaEQsOEVBQThFO0lBQzlFLG1CQUFtQixDQUFnRDtJQUNuRSwyRUFBMkU7SUFDM0UsTUFBTSxDQUFpRjtJQUN2RixvQ0FBb0M7SUFDcEMsUUFBUSxDQUFpQztJQUN6QyxvRkFBb0Y7SUFDcEYsZ0JBQWdCLENBQXlDO0lBQ3pELHdDQUF3QztJQUN4QyxJQUFJLENBQVE7SUFDWixxQ0FBcUM7SUFDckMsU0FBUyxDQUF3QztJQUNqRCxvREFBb0Q7SUFDcEQsU0FBUyxDQUFPO0lBQ2hCLHNIQUFzSDtJQUN0SCxJQUFJLENBQWU7SUFDbkIsWUFBWSxJQUErQixFQUFFLE1BQWM7UUFDdkQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxD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