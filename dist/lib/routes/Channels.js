"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module REST/Channels */
const promises_1 = require("node:timers/promises");
const Constants_1 = require("../Constants");
const Invite_1 = tslib_1.__importDefault(require("../structures/Invite"));
const StageInstance_1 = tslib_1.__importDefault(require("../structures/StageInstance"));
const QueryBuilder_1 = tslib_1.__importDefault(require("../util/QueryBuilder"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
/** Various methods for interacting with channels. Located at {@link Client#rest | Client#rest}{@link RESTManager#channels | .channels}. */
class Channels {
    _manager;
    constructor(manager) {
        this._manager = manager;
    }
    /**
     * Add a user to a group channel.
     * @param groupID The ID of the group to add the user to.
     * @param options The options for adding the recipient.
     * @caching This method **does not** cache its result.
     */
    async addGroupRecipient(groupID, options) {
        options = this._manager.client.util._freeze(options);
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.GROUP_RECIPIENT(groupID, options.userID),
            json: {
                access_token: options.accessToken,
                nick: options.nick,
            },
        });
    }
    /**
     * Add a member to a thread.
     * @param channelID The ID of the thread to add them to.
     * @param userID The ID of the user to add to the thread.
     * @caching This method **does not** cache its result.
     */
    async addThreadMember(channelID, userID) {
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, userID),
        });
    }
    /**
     * Create a direct message. This will not create a new channel if you have already started a dm with the user.
     * @param recipient The ID of the recipient of the direct message.
     * @caching This method **does** cache its result.
     * @caches {@link Client#privateChannels | Client#privateChannels}
     */
    async createDM(recipient) {
        let cache;
        if ((cache = this._manager.client.privateChannels.find(ch => ch.recipient.id === recipient))) {
            return cache;
        }
        return this._manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_CHANNELS,
            json: { recipient_id: recipient },
        }).then(data => this._manager.client.privateChannels.update(data));
    }
    /**
     * Create a group dm.
     * @param options The options for creating the group dm.
     * @caching This method **does** cache its result.
     * @caches {@link Client#groupChannels | Client#groupChannels}
     */
    async createGroupDM(options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_CHANNELS,
            json: {
                access_tokens: options.accessTokens,
                nicks: options.nicks,
            },
        }).then(data => this._manager.client.groupChannels.update(data));
    }
    /**
     * Create an invite for a channel. If the guild is not a `COMMUNITY` server, invites can only be made to last 30 days.
     * @param channelID The ID of the channel to create an invite for.
     * @param options The options for creating the invite.
     * @caching This method **does not** cache its result.
     */
    async createInvite(channelID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_INVITES(channelID),
            json: {
                max_age: options.maxAge,
                max_uses: options.maxUses,
                target_application_id: options.targetApplicationID,
                target_type: options.targetType,
                target_user_id: options.targetUserID,
                temporary: options.temporary,
                unique: options.unique,
            },
            reason: options.reason,
            files: options.targetUsers ? [this._manager.client.util._arrayToCSVFile(options.targetUsers, "target_users_file", "user_id")] : undefined,
        }).then(data => Invite_1.default.withMetadata(data, this._manager.client));
    }
    /**
     * Create a message in a channel.
     * @param channelID The ID of the channel to create the message in.
     * @param options The options for creating the message.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    async createMessage(channelID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_MESSAGES(channelID),
            json: {
                allowed_mentions: this._manager.client.util.formatAllowedMentions(options.allowedMentions),
                attachments: options.attachments?.map(attachment => ({
                    description: attachment.description,
                    filename: attachment.filename,
                    id: attachment.id,
                    is_spoiler: attachment.isSpoiler,
                })),
                components: options.components ? this._manager.client.util.componentsToRaw(options.components) : undefined,
                content: options.content,
                embeds: options.embeds ? this._manager.client.util.embedsToRaw(options.embeds) : undefined,
                enforce_nonce: options.enforceNonce,
                flags: options.flags,
                sticker_ids: options.stickerIDs,
                message_reference: options.messageReference ? {
                    channel_id: options.messageReference.channelID,
                    fail_if_not_exists: options.messageReference.failIfNotExists,
                    guild_id: options.messageReference.guildID,
                    message_id: options.messageReference.messageID,
                    type: options.messageReference.type,
                } : undefined,
                nonce: options.nonce,
                poll: options.poll ? {
                    allow_multiselect: options.poll.allowMultiselect,
                    answers: options.poll.answers.map(a => ({
                        poll_media: a.pollMedia,
                    })),
                    duration: options.poll.duration,
                    layout_type: options.poll.layoutType,
                    question: options.poll.question,
                } : undefined,
                tts: options.tts,
            },
            files: options.files,
        }).then(data => this._manager.client.util.updateMessage(data));
    }
    /**
     * Add a reaction to a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to add a reaction to.
     * @param emoji The reaction to add to the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @caching This method **does not** cache its result.
     */
    async createReaction(channelID, messageID, emoji) {
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.CHANNEL_REACTION_USER(channelID, messageID, emoji, "@me"),
        });
    }
    /**
     * Create a stage instance.
     * @param channelID The ID of the channel to create the stage instance on.
     * @param options The options for creating the stage instance.
     * @caching This method **does not** cache its result.
     */
    async createStageInstance(channelID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.STAGE_INSTANCES,
            json: {
                channel_id: channelID,
                topic: options.topic,
                privacy_level: options.privacyLevel,
                send_start_notification: options.sendStartNotification,
            },
            reason: options.reason,
        }).then(data => new StageInstance_1.default(data, this._manager.client));
    }
    /**
     * Crosspost a message in an announcement channel.
     * @param channelID The ID of the channel to crosspost the message in.
     * @param messageID The ID of the message to crosspost.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    async crosspostMessage(channelID, messageID) {
        return this._manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_MESSAGES_CROSSPOST(channelID, messageID),
        }).then(data => this._manager.client.util.updateMessage(data));
    }
    /**
     * Delete or close a channel.
     * @param channelID The ID of the channel to delete or close.
     * @param reason The reason to be displayed in the audit log.
     * @caching This method **does not** cache its result.
     */
    async delete(channelID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL(channelID),
            reason,
        });
    }
    /**
     * Delete an invite.
     * @param code The code of the invite to delete.
     * @param reason The reason for deleting the invite.
     * @caching This method **does not** cache its result.
     */
    async deleteInvite(code, reason) {
        return this._manager.authRequest({
            method: "DELETE",
            path: Routes.INVITE(code),
            reason,
        }).then(data => new Invite_1.default(data, this._manager.client));
    }
    /**
     * Delete a message.
     * @param channelID The ID of the channel to delete the message in.
     * @param messageID The ID of the message to delete.
     * @param reason The reason for deleting the message.
     * @caching This method **does not** cache its result.
     */
    async deleteMessage(channelID, messageID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_MESSAGE(channelID, messageID),
            reason,
        });
    }
    /**
     * Bulk delete messages.
     * @param channelID The ID of the channel to delete the messages in.
     * @param messageIDs The IDs of the messages to delete. Any duplicates or messages older than two weeks will cause an error.
     * @param reason The reason for deleting the messages.
     * @caching This method **does not** cache its result.
     */
    async deleteMessages(channelID, messageIDs, reason) {
        const chunks = [];
        messageIDs = Array.from(messageIDs);
        const amountOfMessages = messageIDs.length;
        while (messageIDs.length !== 0) {
            chunks.push(messageIDs.splice(0, 100));
        }
        let done = 0;
        for (const chunk of chunks.values()) {
            if (chunks.length > 1) {
                const left = amountOfMessages - done;
                this._manager.client.emit("debug", `Deleting ${left} messages in ${channelID}`);
            }
            if (chunk.length === 1) {
                this._manager.client.emit("debug", "deleteMessages created a chunk with only 1 element, using deleteMessage instead.");
                await this.deleteMessage(channelID, chunk[0], reason);
                continue;
            }
            await this._manager.authRequest({
                method: "POST",
                path: Routes.CHANNEL_BULK_DELETE_MESSAGES(channelID),
                json: { messages: chunk },
                reason,
            });
            done += chunk.length;
        }
        return amountOfMessages;
    }
    /**
     * Delete a permission overwrite.
     * @param channelID The ID of the channel to delete the permission overwrite in.
     * @param overwriteID The ID of the permission overwrite to delete.
     * @param reason The reason for deleting the permission overwrite.
     * @caching This method **does not** cache its result.
     */
    async deletePermission(channelID, overwriteID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_PERMISSION(channelID, overwriteID),
            reason,
        });
    }
    /**
     * Remove a reaction from a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to remove a reaction from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param user The user to remove the reaction from, `@me` for the current user (default).
     * @caching This method **does not** cache its result.
     */
    async deleteReaction(channelID, messageID, emoji, user = "@me") {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_REACTION_USER(channelID, messageID, emoji, user),
        });
    }
    /**
     * Remove all, or a specific emoji's reactions from a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to remove reactions from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis. Omit to remove all reactions.
     * @caching This method **does not** cache its result.
     */
    async deleteReactions(channelID, messageID, emoji) {
        await this._manager.authRequest({
            method: "DELETE",
            path: emoji ? Routes.CHANNEL_REACTION(channelID, messageID, emoji) : Routes.CHANNEL_REACTIONS(channelID, messageID),
        });
    }
    /**
     * Delete a stage instance.
     * @param channelID The ID of the channel to delete the stage instance on.
     * @param reason The reason for deleting the stage instance.
     * @caching This method **does not** cache its result.
     */
    async deleteStageInstance(channelID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.STAGE_INSTANCE(channelID),
            reason,
        });
    }
    /**
     * Edit a channel.
     * @param channelID The ID of the channel to edit.
     * @param options The options for editing the channel.
     * @caching This method **may** cache its result. If a guild channel, the result will not be cached if the guild is not cached.
     * @caches {@link Guild#channels | Guild#channels}<br>{@link Guild#threads | Guild#threads}<br>{@link Client#groupChannels | Client#groupChannels}
     */
    async edit(channelID, options) {
        options = this._manager.client.util._freeze(options);
        let icon;
        if (options.icon) {
            try {
                icon = this._manager.client.util.convertImage(options.icon);
            }
            catch (err) {
                throw new TypeError("Invalid icon provided. Ensure you are providing a valid, fully-qualified base64 url.", { cause: err });
            }
        }
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.CHANNEL(channelID),
            json: {
                applied_tags: options.appliedTags,
                archived: options.archived,
                auto_archive_duration: options.autoArchiveDuration,
                available_tags: options.availableTags?.map(tag => ({
                    emoji_id: tag.emoji?.id,
                    emoji_name: tag.emoji?.name,
                    moderated: tag.moderated,
                    name: tag.name,
                    id: tag.id,
                })),
                bitrate: options.bitrate,
                default_auto_archive_duration: options.defaultAutoArchiveDuration,
                default_forum_layout: options.defaultForumLayout,
                default_reaction_emoji: options.defaultReactionEmoji ? { emoji_id: options.defaultReactionEmoji.id, emoji_name: options.defaultReactionEmoji.name } : options.defaultReactionEmoji,
                default_sort_order: options.defaultSortOrder,
                default_thread_rate_limit_per_user: options.defaultThreadRateLimitPerUser,
                flags: options.flags,
                icon,
                invitable: options.invitable,
                locked: options.locked,
                name: options.name,
                nsfw: options.nsfw,
                parent_id: options.parentID,
                permission_overwrites: options.permissionOverwrites,
                position: options.position,
                rate_limit_per_user: options.rateLimitPerUser,
                rtc_region: options.rtcRegion,
                topic: options.topic,
                type: options.type,
                user_limit: options.userLimit,
                video_quality_mode: options.videoQualityMode,
            },
            reason: options.reason,
        }).then(data => this._manager.client.util.updateChannel(data));
    }
    /**
     * Edit a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    async editMessage(channelID, messageID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.CHANNEL_MESSAGE(channelID, messageID),
            json: {
                allowed_mentions: options.content !== undefined || options.allowedMentions || ((options.flags ?? 0) & Constants_1.MessageFlags.IS_COMPONENTS_V2) !== 0
                    ? this._manager.client.util.formatAllowedMentions(options.allowedMentions)
                    : undefined,
                attachments: options.attachments?.map(attachment => ({
                    description: attachment.description,
                    filename: attachment.filename,
                    id: attachment.id,
                    is_spoiler: attachment.isSpoiler,
                })),
                components: options.components ? this._manager.client.util.componentsToRaw(options.components) : undefined,
                content: options.content,
                embeds: options.embeds ? this._manager.client.util.embedsToRaw(options.embeds) : undefined,
                flags: options.flags,
            },
            files: options.files ?? undefined,
        }).then(data => this._manager.client.util.updateMessage(data));
    }
    /**
     * Edit a permission overwrite.
     * @param channelID The ID of the channel to edit the permission overwrite for.
     * @param overwriteID The ID of the permission overwrite to edit.
     * @param options The options for editing the permission overwrite.
     * @caching This method **does not** cache its result.
     */
    async editPermission(channelID, overwriteID, options) {
        options = this._manager.client.util._freeze(options);
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.CHANNEL_PERMISSION(channelID, overwriteID),
            json: {
                allow: options.allow,
                deny: options.deny,
                type: options.type,
            },
            reason: options.reason,
        });
    }
    /**
     * Edit a stage instance.
     * @param channelID The ID of the channel to edit the stage instance on.
     * @param options The options for editing the stage instance.
     * @caching This method **does not** cache its result.
     */
    async editStageInstance(channelID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.STAGE_INSTANCE(channelID),
            json: {
                channel_id: channelID,
                topic: options.topic,
                privacy_level: options.privacyLevel,
            },
            reason: options.reason,
        }).then(data => new StageInstance_1.default(data, this._manager.client));
    }
    /**
     * End a poll now.
     * @param channelID The ID of the channel the poll is in.
     * @param messageID The ID of the message the poll is on.
     * @caching This method **does not** cache its result.
     */
    async expirePoll(channelID, messageID) {
        await this._manager.authRequest({
            method: "POST",
            path: Routes.POLL_EXPIRE(channelID, messageID),
        });
    }
    /**
     * Follow an announcement channel.
     * @param channelID The ID of the channel to follow announcements from.
     * @param webhookChannelID The ID of the channel crossposted messages should be sent to. The client must have the `MANAGE_WEBHOOKS` permission in this channel.
     * @param reason The reason for following the announcement channel.
     * @caching This method **does not** cache its result.
     */
    async followAnnouncement(channelID, webhookChannelID, reason) {
        return this._manager.authRequest({
            method: "POST",
            reason,
            path: Routes.CHANNEL_FOLLOWERS(channelID),
            json: { webhook_channel_id: webhookChannelID },
        }).then(data => ({
            channelID: data.channel_id,
            webhookID: data.webhook_id,
        }));
    }
    /**
     * Get a channel.
     * @param channelID The ID of the channel to get.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#channels | Guild#channels}<br>{@link Guild#threads | Guild#threads}<br>{@link Client#privateChannels | Client#privateChannels}<br>{@link Client#groupChannels | Client#groupChannels}
     */
    async get(channelID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL(channelID),
        }).then(data => this._manager.client.util.updateChannel(data));
    }
    async getInvite(code, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("guild_scheduled_event_id", options?.guildScheduledEventID);
        query.setIfPresent("with_counts", options?.withCounts);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.INVITE(code),
            query,
        }).then(data => new Invite_1.default(data, this._manager.client));
    }
    /**
     * Get the invites of a channel.
     * @param channelID The ID of the channel to get the invites of.
     * @caching This method **does not** cache its result.
     */
    async getInvites(channelID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_INVITES(channelID),
        }).then(data => data.map(invite => Invite_1.default.withMetadata(invite, this._manager.client)));
    }
    /**
     * Get the target users for an invite. Requires being the inviter or having the `MANAGE_GUILD` or `VIEW_AUDIT_LOG` permission.
     * @param code The code of the invite.
     */
    async getInviteTargetUsers(code) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.INVITE_TARGET_USERS(code),
        }).then(data => data.toString().split(/\r?\n/).filter(line => /^\d{15,}$/.test(line)));
    }
    /**
     * Get the target users job status for an invite. Requires being the inviter or having the `MANAGE_GUILD` or `VIEW_AUDIT_LOG` permission.
     * @param code The code of the invite.
     */
    async getInviteTargetUsersJobStatus(code) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.INVITE_TARGET_USERS_JOB_STATUS(code),
        }).then(data => ({
            completedAt: data.completed_at ? new Date(data.completed_at) : null,
            createdAt: new Date(data.created_at),
            errorMessage: data.error_message,
            processedUsers: data.processed_users,
            status: data.status,
            totalUsers: data.total_users,
        }));
    }
    /**
     * Get the private archived threads the current user has joined in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     * @caching This method **does not** cache its result.
     */
    async getJoinedPrivateArchivedThreads(channelID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_PRIVATE_ARCHIVED_THREADS(channelID),
            json: {
                before: options?.before,
                limit: options?.limit,
            },
        }).then(data => ({
            hasMore: data.has_more,
            members: data.members.map(m => ({
                flags: m.flags,
                id: m.id,
                joinTimestamp: new Date(m.join_timestamp),
                userID: m.user_id,
            })),
            threads: data.threads.map(d => this._manager.client.util.updateThread(d)),
        }));
    }
    /**
     * Get a message in a channel.
     * @param channelID The ID of the channel the message is in
     * @param messageID The ID of the message to get.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    async getMessage(channelID, messageID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_MESSAGE(channelID, messageID),
        }).then(data => this._manager.client.util.updateMessage(data));
    }
    /**
     * Get messages in a channel.
     * @param channelID The ID of the channel to get messages from.
     * @param options The options for getting messages. `before`, `after`, and `around `All are mutually exclusive.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    async getMessages(channelID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        let chosenOption;
        if (options?.around !== undefined) {
            query.set("around", options.around);
            chosenOption = "around";
        }
        else if (options?.after !== undefined) {
            query.set("after", options.after);
            chosenOption = "after";
        }
        else {
            query.setIfPresent("before", options?.before);
            chosenOption = "before";
        }
        if (chosenOption === "around" || (options?.limit && options.limit <= 100)) {
            const filter = options?.filter?.bind(this) ?? (() => true);
            if (options?.limit !== undefined) {
                query.set("limit", Math.min(options.limit, 100));
            }
            const messages = await this._manager.authRequest({
                method: "GET",
                path: Routes.CHANNEL_MESSAGES(channelID),
                query,
            }).then(data => data.map(d => this._manager.client.util.updateMessage(d)));
            for (const message of Array.from(messages)) {
                const f = filter(message);
                if (f === false) {
                    messages.splice(messages.indexOf(message), 1);
                }
                if (f === "break") {
                    messages.splice(messages.indexOf(message));
                    break;
                }
            }
            return messages;
        }
        const results = [];
        const it = this.getMessagesIterator(channelID, options);
        for await (const messages of it) {
            const limit = messages.length < 100 ? messages.length : it.limit + 100;
            this._manager.client.emit("debug", `Getting ${limit} more message${limit === 1 ? "" : "s"} for ${channelID}: ${it.lastMessage ?? ""}`);
            results.push(...messages);
        }
        return results;
    }
    /**
     * Get an async iterator for getting messages in a channel.
     * @param channelID The ID of the channel to get messages from.
     * @param options The options for getting messages. `before`, `after`, and `around `All are mutually exclusive.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    getMessagesIterator(channelID, options) {
        options = this._manager.client.util._freeze(options);
        const filter = options?.filter?.bind(this) ?? (() => true);
        const chosenOption = options?.after === undefined ? "before" : "after";
        // arrow functions cannot be generator functions
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const it = {
            lastMessage: chosenOption === "after" ? options?.after : options?.before,
            limit: options?.limit ?? 100,
            async *[Symbol.asyncIterator]() {
                loop: while (it.limit > 0) {
                    const messages = await self.getMessages(channelID, {
                        limit: Math.min(it.limit, 100),
                        [chosenOption]: it.lastMessage,
                    });
                    const originalCount = messages.length;
                    it.limit -= messages.length;
                    for (const message of Array.from(messages)) {
                        const f = filter(message);
                        if (f === false) {
                            messages.splice(messages.indexOf(message), 1);
                        }
                        if (f === "break") {
                            messages.splice(messages.indexOf(message));
                            yield messages;
                            break loop;
                        }
                    }
                    it.lastMessage = messages.at(-1)?.id;
                    yield messages;
                    if (originalCount < 100 || it.limit <= 0) {
                        break loop;
                    }
                }
            },
        };
        return it;
    }
    /**
     * Get the pinned messages in a channel.
     * @param channelID The ID of the channel to get the pinned messages from.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     * @deprecated Use {@link Channels#getPins | getPins} instead.
     */
    async getPinnedMessages(channelID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_PINS(channelID),
        }).then(data => data.map(d => this._manager.client.util.updateMessage(d)));
    }
    /**
     * Get the pins in a channel.
     * @param channelID The ID of the channel to get the pins from.
     * @param options The options for getting pins.
     * @caching This method **may** cache its result. The messages will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    async getPins(channelID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("before", options?.before);
        if (options?.limit === undefined || options.limit <= 50) {
            const filter = options?.filter?.bind(this) ?? (() => true);
            query.setIfPresent("limit", options?.limit);
            const pins = await this._manager.authRequest({
                method: "GET",
                path: Routes.CHANNEL_MESSAGE_PINS(channelID),
                query,
            }).then(data => data.items.map(pin => ({
                message: this._manager.client.util.updateMessage(pin.message),
                pinnedTimestamp: new Date(pin.pinned_at),
            })));
            for (const pin of Array.from(pins)) {
                const f = await filter(pin);
                if (f === false) {
                    pins.splice(pins.indexOf(pin), 1);
                }
                if (f === "break") {
                    pins.splice(pins.indexOf(pin));
                    break;
                }
            }
            return pins;
        }
        const results = [];
        const it = this.getPinsIterator(channelID, options);
        for await (const pins of it) {
            const limit = pins.length < 50 ? pins.length : it.limit + 50;
            this._manager.client.emit("debug", `Getting ${limit} more pin${limit === 1 ? "" : "s"} for ${channelID}: ${it.lastPinTimestamp ?? ""}`);
            results.push(...pins);
        }
        return results;
    }
    /**
     * Get an async iterator for getting pins in a channel.
     * @param channelID The ID of the channel to get pins from.
     * @param options The options for getting pins.
     * @caching This method **may** cache its result. The messages will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    getPinsIterator(channelID, options) {
        options = this._manager.client.util._freeze(options);
        const filter = options?.filter?.bind(this) ?? (() => true);
        // arrow functions cannot be generator functions
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const it = {
            lastPinTimestamp: options?.before,
            limit: options?.limit ?? 50,
            async *[Symbol.asyncIterator]() {
                loop: while (it.limit > 0) {
                    const query = new QueryBuilder_1.default();
                    query.setIfPresent("before", it.lastPinTimestamp);
                    query.set("limit", Math.min(it.limit, 50));
                    const data = await self._manager.authRequest({
                        method: "GET",
                        path: Routes.CHANNEL_MESSAGE_PINS(channelID),
                        query,
                    });
                    const pins = data.items.map(pin => ({
                        message: self._manager.client.util.updateMessage(pin.message),
                        pinnedTimestamp: new Date(pin.pinned_at),
                    }));
                    it.limit -= pins.length;
                    for (const pin of Array.from(pins)) {
                        const f = await filter(pin);
                        if (f === false) {
                            pins.splice(pins.indexOf(pin), 1);
                        }
                        if (f === "break") {
                            pins.splice(pins.indexOf(pin));
                            yield pins;
                            break loop;
                        }
                    }
                    it.lastPinTimestamp = data.items.at(-1)?.pinned_at;
                    yield pins;
                    if (!data.has_more || it.limit <= 0) {
                        break loop;
                    }
                }
            },
        };
        return it;
    }
    /**
     * Get the users that voted on a poll answer.
     * @param channelID The ID of the channel the poll is in.
     * @param messageID The ID of the message the poll is on.
     * @param answerID The ID of the poll answer to get voters for.
     * @param options The options for getting the voters.
     * @caching This method **does** cache its result.
     * @caches {@link Client#users | Client#users}
     */
    async getPollAnswerUsers(channelID, messageID, answerID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("after", options?.after);
        query.setIfPresent("limit", options?.limit);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.POLL_ANSWER_USERS(channelID, messageID, answerID),
            query,
        }).then((data) => {
            const users = data.users.map(user => this._manager.client.users.update(user));
            const message = this._manager.client.getChannel(channelID)?.messages.get(messageID);
            if (message?.poll) {
                this._manager.client.util.replacePollAnswer(message.poll, answerID, users.length, users.map(u => u.id));
            }
            return users;
        });
    }
    /**
     * Get the private archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    async getPrivateArchivedThreads(channelID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("before", options?.before);
        query.setIfPresent("limit", options?.limit);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_PRIVATE_ARCHIVED_THREADS(channelID),
            query,
        }).then(data => ({
            hasMore: data.has_more,
            members: data.members.map(m => ({
                flags: m.flags,
                id: m.id,
                joinTimestamp: new Date(m.join_timestamp),
                userID: m.user_id,
            })),
            threads: data.threads.map(d => this._manager.client.util.updateThread(d)),
        }));
    }
    /**
     * Get the private joined archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    async getPrivateJoinedArchivedThreads(channelID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("before", options?.before);
        query.setIfPresent("limit", options?.limit);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_JOINED_PRIVATE_ARCHIVED_THREADS(channelID),
            query,
        }).then(data => ({
            hasMore: data.has_more,
            members: data.members.map(m => ({
                flags: m.flags,
                id: m.id,
                joinTimestamp: new Date(m.join_timestamp),
                userID: m.user_id,
            })),
            threads: data.threads.map(d => this._manager.client.util.updateThread(d)),
        }));
    }
    /**
     * Get the public archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    async getPublicArchivedThreads(channelID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("before", options?.before);
        query.setIfPresent("limit", options?.limit);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_PUBLIC_ARCHIVED_THREADS(channelID),
            query,
        }).then(data => ({
            hasMore: data.has_more,
            members: data.members.map(m => ({
                flags: m.flags,
                id: m.id,
                joinTimestamp: new Date(m.join_timestamp),
                userID: m.user_id,
            })),
            threads: data.threads.map(d => this._manager.client.util.updateThread(d)),
        }));
    }
    /**
     * Get the users who reacted with a specific emoji on a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to get reactions from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param options The options for getting the reactions.
     * @caching This method **does not** cache its result.
     */
    async getReactions(channelID, messageID, emoji, options) {
        options = this._manager.client.util._freeze(options);
        const _getReactions = async (_options) => {
            const query = new QueryBuilder_1.default();
            query.setIfPresent("after", _options?.after);
            query.setIfPresent("limit", _options?.limit);
            query.setIfPresent("type", options?.type);
            return this._manager.authRequest({
                method: "GET",
                path: Routes.CHANNEL_REACTION(channelID, messageID, emoji),
                query,
            }).then(data => data.map(d => this._manager.client.users.update(d)));
        };
        const limit = options?.limit ?? 100;
        let after = options?.after;
        let reactions = [];
        while (reactions.length < limit) {
            const limitLeft = limit - reactions.length;
            const limitToFetch = Math.min(limitLeft, 100);
            this._manager.client.emit("debug", `Getting ${limitLeft} more ${emoji} reactions for message ${messageID} on ${channelID}: ${after ?? ""}`);
            const reactionsChunk = await _getReactions({
                after,
                limit: limitToFetch,
            });
            if (reactionsChunk.length === 0) {
                break;
            }
            reactions = reactions.concat(reactionsChunk);
            after = reactionsChunk.at(-1).id;
            if (reactionsChunk.length < 100) {
                break;
            }
        }
        return reactions;
    }
    /**
     * Get the stage instance associated with a channel.
     * @param channelID The ID of the channel to get the stage instance on.
     * @caching This method **does not** cache its result.
     */
    async getStageInstance(channelID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.STAGE_INSTANCE(channelID),
        }).then(data => new StageInstance_1.default(data, this._manager.client));
    }
    /**
     * Get a thread member.
     * @param channelID The ID of the thread.
     * @param userID The ID of the user to get the thread member of.
     * @caching This method **does not** cache its result.
     */
    async getThreadMember(channelID, userID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, userID),
        }).then(data => ({
            flags: data.flags,
            id: data.id,
            joinTimestamp: new Date(data.join_timestamp),
            userID: data.user_id,
        }));
    }
    /**
     * Get the members of a thread.
     * @param channelID The ID of the thread.
     * @param options The options for getting the thread members.
     * @caching This method **does not** cache its result.
     */
    async getThreadMembers(channelID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("after", options?.after);
        query.setIfPresent("limit", options?.limit);
        query.setIfPresent("with_member", options?.withMember);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_THREAD_MEMBERS(channelID),
            query,
        }).then(data => data.map((d) => {
            const guild = this._manager.client.getChannel(channelID)?.["_cachedGuild"];
            const member = guild && options?.withMember ? guild.members.update(d.member, guild.id) : undefined;
            return {
                flags: d.flags,
                id: d.id,
                joinTimestamp: new Date(d.join_timestamp),
                member,
                userID: d.user_id,
            };
        }));
    }
    /** @deprecated Get the list of usable voice regions. Moved to `misc`. */
    async getVoiceRegions() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.VOICE_REGIONS,
        });
    }
    /**
     * Join a thread.
     * @param channelID The ID of the thread to join.
     * @caching This method **does not** cache its result.
     */
    async joinThread(channelID) {
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, "@me"),
        });
    }
    /**
     * Leave a thread.
     * @param channelID The ID of the thread to leave.
     * @caching This method **does not** cache its result.
     */
    async leaveThread(channelID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, "@me"),
        });
    }
    /**
     * Pin a message in a channel.
     * @param channelID The ID of the channel to pin the message in.
     * @param messageID The ID of the message to pin.
     * @param reason The reason for pinning the message.
     * @caching This method **does not** cache its result.
     */
    async pinMessage(channelID, messageID, reason) {
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.CHANNEL_MESSAGE_PIN(channelID, messageID),
            reason,
        });
    }
    /**
     * Purge an amount of messages from a channel.
     * @param channelID The ID of the channel to purge.
     * @param options The options to purge. `before`, `after`, and `around `All are mutually exclusive.
     * @caching This method **does not** cache its result.
     */
    async purgeMessages(channelID, options) {
        options = this._manager.client.util._freeze(options);
        if (options.limit === 0) {
            return 0;
        }
        const filter = (message) => {
            if (message.timestamp.getTime() < Date.now() - 1209600000) {
                return "break";
            }
            return options.filter?.(message) ?? true;
        };
        let chosenOption;
        if (options.after) {
            chosenOption = "after";
        }
        else if (options.around) {
            chosenOption = "around";
        }
        else {
            chosenOption = "before";
        }
        if (chosenOption === "around" || options.limit <= 100) {
            const messages = await this.getMessages(channelID, {
                limit: options.limit,
                [chosenOption]: options[chosenOption],
            });
            for (const message of Array.from(messages)) {
                const f = filter(message);
                if (f === false) {
                    messages.splice(messages.indexOf(message), 1);
                }
                if (f === "break") {
                    messages.splice(messages.indexOf(message));
                    break;
                }
            }
            return this.deleteMessages(channelID, messages.map(message => message.id), options.reason);
        }
        const it = this.getMessagesIterator(channelID, {
            after: options.after,
            before: options.before,
            limit: options.limit,
            filter,
        });
        let deleted = 0;
        for await (const messages of it) {
            deleted += await this.deleteMessages(channelID, messages.map(message => message.id), options.reason);
        }
        return deleted;
    }
    /**
     * Remove a user from the group channel.
     * @param groupID The ID of the group to remove the user from.
     * @param userID The ID of the user to remove.
     * @caching This method **does not** cache its result.
     */
    async removeGroupRecipient(groupID, userID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.GROUP_RECIPIENT(groupID, userID),
        });
    }
    /**
     * Remove a member from a thread.
     * @param channelID The ID of the thread to remove them from.
     * @param userID The ID of the user to remove from the thread.
     * @caching This method **does not** cache its result.
     */
    async removeThreadMember(channelID, userID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, userID),
        });
    }
    /**
     * Search threads in a channel.
     * @param channelID The ID of the channel to search threads in.
     * @param options The options to search with.
     * @param retryOnIndexNotAvailable If the search should be retried if Discord replies with an index unavailable response. This will retry at most one time, waiting for `retry_after` or 15-45 seconds.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}<br>{@link ThreadChannel#messages | ThreadChannel#messages}
     */
    async searchThreads(channelID, options, retryOnIndexNotAvailable = true) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        const append = (name, value) => {
            if (Array.isArray(value)) {
                for (const item of value) {
                    query.append(name, item);
                }
            }
            else if (value !== undefined) {
                query.append(name, value);
            }
        };
        query.setIfPresent("archived", options?.archived);
        query.setIfPresent("limit", options?.limit);
        query.setIfPresent("max_id", options?.maxID);
        query.setIfPresent("min_id", options?.minID);
        query.setIfPresent("name", options?.name);
        query.setIfPresent("offset", options?.offset);
        query.setIfPresent("slop", options?.slop);
        query.setIfPresent("sort_by", options?.sortBy);
        query.setIfPresent("sort_order", options?.sortOrder);
        query.setIfPresent("tag_setting", options?.tagSetting);
        append("tag", options?.tag);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_THREADS_SEARCH(channelID),
            query,
        }).then(async (data) => {
            if ("retry_after" in data) {
                if (!retryOnIndexNotAvailable) {
                    throw new Error(`Thread search for channel ${channelID} failed due to the index not being available.`);
                }
                let retryAfter = data.retry_after;
                if (retryAfter === 0) {
                    retryAfter = Math.floor(Math.random() * 30) + 15;
                }
                this._manager.client.emit("debug", `Retrying thread search for channel ${channelID} in ${retryAfter} seconds...`);
                await (0, promises_1.setTimeout)(retryAfter * 1000);
                return this.searchThreads(channelID, options, false);
            }
            const guild = this._manager.client.getChannel(channelID)?.["_cachedGuild"];
            return {
                firstMessages: data.first_messages?.map(message => this._manager.client.util.updateMessage(message)),
                hasMore: data.has_more,
                members: data.members?.map(m => ({
                    flags: m.flags,
                    id: m.id,
                    joinTimestamp: new Date(m.join_timestamp),
                    member: m.member && guild?.members.update(m.member, guild.id),
                    userID: m.user_id,
                })),
                threads: data.threads.map(thread => this._manager.client.util.updateThread(thread)),
                totalResults: data.total_results,
            };
        });
    }
    /**
     * Send a sound from the soundboard to the channel where the user is connected.
     * @param channelID The ID of the channel to send the soundboard sound to.
     * @param options The options for sending the soundboard sound.
     * @caching This method **does not** cache its result.
     */
    async sendSoundboardSound(channelID, options) {
        options = this._manager.client.util._freeze(options);
        await this._manager.authRequest({
            method: "POST",
            path: Routes.SEND_SOUNDBOARD_SOUND(channelID),
            json: { sound_id: options.soundID, source_guild_id: options.sourceGuildID },
        });
    }
    /**
     * Show a typing indicator in a channel. How long users see this varies from client to client.
     * @param channelID The ID of the channel to show the typing indicator in.
     * @caching This method **does not** cache its result.
     */
    async sendTyping(channelID) {
        await this._manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_TYPING(channelID),
        });
    }
    /**
     * Set a voice status in a channel.
     * @param channelID The ID of the channel to set the voice status in.
     * @param status The voice status to set.
     */
    async setVoiceStatus(channelID, status) {
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.VOICE_STATUS(channelID),
            json: { status },
        });
    }
    /**
     * Create a thread from an existing message.
     * @param channelID The ID of the channel to create the thread in.
     * @param messageID The ID of the message to create the thread from.
     * @param options The options for starting the thread.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    async startThreadFromMessage(channelID, messageID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_MESSAGE_THREADS(channelID, messageID),
            json: {
                auto_archive_duration: options.autoArchiveDuration,
                name: options.name,
                rate_limit_per_user: options.rateLimitPerUser,
            },
            reason: options.reason,
        }).then(data => this._manager.client.util.updateThread(data));
    }
    /**
     * Create a thread in a thread only channel (forum & media).
     * @param channelID The ID of the channel to start the thread in.
     * @param options The options for starting the thread.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    async startThreadInThreadOnlyChannel(channelID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_THREADS(channelID),
            json: {
                auto_archive_duration: options.autoArchiveDuration,
                message: {
                    allowed_mentions: this._manager.client.util.formatAllowedMentions(options.message.allowedMentions),
                    attachments: options.message.attachments,
                    components: options.message.components ? this._manager.client.util.componentsToRaw(options.message.components) : undefined,
                    content: options.message.content,
                    embeds: options.message.embeds ? this._manager.client.util.embedsToRaw(options.message.embeds) : undefined,
                    flags: options.message.flags,
                    sticker_ids: options.message.stickerIDs,
                },
                name: options.name,
                rate_limit_per_user: options.rateLimitPerUser,
                applied_tags: options.appliedTags,
            },
            reason: options.reason,
            files: options.message.files,
        }).then(data => this._manager.client.util.updateThread(data));
    }
    /**
     * Create a thread without an existing message.
     * @param channelID The ID of the channel to start the thread in.
     * @param options The options for starting the thread.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    async startThreadWithoutMessage(channelID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_THREADS(channelID),
            json: {
                auto_archive_duration: options.autoArchiveDuration,
                invitable: options.invitable,
                name: options.name,
                rate_limit_per_user: options.rateLimitPerUser,
                type: options.type,
            },
            reason: options.reason,
        }).then(data => this._manager.client.util.updateThread(data));
    }
    /**
     * Unpin a message in a channel.
     * @param channelID The ID of the channel to unpin the message in.
     * @param messageID The ID of the message to unpin.
     * @param reason The reason for unpinning the message.
     * @caching This method **does not** cache its result.
     */
    async unpinMessage(channelID, messageID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_MESSAGE_PIN(channelID, messageID),
            reason,
        });
    }
    /**
     * Update the target users for an invite. Requires being the inviter or having the `MANAGE_GUILD` permission.
     * @param code The code of the invite.
     * @param users The IDs of the users to allow accepting the invite.
     */
    async updateInviteTargetUsers(code, users) {
        return this._manager.authRequest({
            method: "PUT",
            path: Routes.INVITE_TARGET_USERS(code),
            files: [
                this._manager.client.util._arrayToCSVFile(users, "target_users_file", "user_id"),
            ],
        });
    }
}
exports.default = Channels;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbm5lbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcm91dGVzL0NoYW5uZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRCQUE0QjtBQUM1QixtREFBa0Q7QUFFbEQsNENBQTRDO0FBQzVDLDBFQU04QjtBQUM5Qix3RkFBd0Q7QUFDeEQsZ0ZBQWdEO0FBQ2hELCtEQUF5QztBQWF6QywySUFBMkk7QUFDM0ksTUFBcUIsUUFBUTtJQUNqQixRQUFRLENBQWM7SUFDOUIsWUFBWSxPQUFvQjtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsaUJBQWlCLENBQUMsT0FBZSxFQUFFLE9BQWdEO1FBQ3JGLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQU87WUFDbEMsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNyRCxJQUFJLEVBQUU7Z0JBQ0YsWUFBWSxFQUFFLE9BQU8sQ0FBQyxXQUFXO2dCQUNqQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7YUFDckI7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsZUFBZSxDQUFDLFNBQWlCLEVBQUUsTUFBYztRQUNuRCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFPO1lBQ2xDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDO1NBQ3hELENBQUMsQ0FBQztJQUNQLENBQUM7SUFF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