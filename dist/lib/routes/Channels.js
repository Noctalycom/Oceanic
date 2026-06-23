"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Routes = tslib_1.__importStar(require("../util/Routes"));
const Invite_1 = tslib_1.__importDefault(require("../structures/Invite"));
const StageInstance_1 = tslib_1.__importDefault(require("../structures/StageInstance"));
const Constants_1 = require("../Constants");
const QueryBuilder_1 = tslib_1.__importDefault(require("../util/QueryBuilder"));
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
                nick: options.nick
            }
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
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, userID)
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
            json: { recipient_id: recipient }
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
                nicks: options.nicks
            }
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
                unique: options.unique
            },
            reason: options.reason,
            files: options.targetUsers ? [this._manager.client.util._arrayToCSVFile(options.targetUsers, "target_users_file", "user_id")] : undefined
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
                attachments: options.attachments,
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
                    message_id: options.messageReference.messageID
                } : undefined,
                nonce: options.nonce,
                poll: options.poll ? {
                    allow_multiselect: options.poll.allowMultiselect,
                    answers: options.poll.answers.map(a => ({
                        poll_media: a.pollMedia
                    })),
                    duration: options.poll.duration,
                    layout_type: options.poll.layoutType,
                    question: options.poll.question
                } : undefined,
                tts: options.tts
            },
            files: options.files
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
            path: Routes.CHANNEL_REACTION_USER(channelID, messageID, emoji, "@me")
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
                send_start_notification: options.sendStartNotification
            },
            reason: options.reason
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
            path: Routes.CHANNEL_MESSAGES_CROSSPOST(channelID, messageID)
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
            reason
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
            reason
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
            reason
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
                reason
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
            reason
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
            path: Routes.CHANNEL_REACTION_USER(channelID, messageID, emoji, user)
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
            path: emoji ? Routes.CHANNEL_REACTION(channelID, messageID, emoji) : Routes.CHANNEL_REACTIONS(channelID, messageID)
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
            reason
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
                    id: tag.id
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
                video_quality_mode: options.videoQualityMode
            },
            reason: options.reason
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
                attachments: options.attachments,
                components: options.components ? this._manager.client.util.componentsToRaw(options.components) : undefined,
                content: options.content,
                embeds: options.embeds ? this._manager.client.util.embedsToRaw(options.embeds) : undefined,
                flags: options.flags
            },
            files: options.files ?? undefined
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
                type: options.type
            },
            reason: options.reason
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
                privacy_level: options.privacyLevel
            },
            reason: options.reason
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
            path: Routes.POLL_EXPIRE(channelID, messageID)
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
            json: { webhook_channel_id: webhookChannelID }
        }).then(data => ({
            channelID: data.channel_id,
            webhookID: data.webhook_id
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
            path: Routes.CHANNEL(channelID)
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
            query
        }).then(data => new Invite_1.default(data, this._manager.client));
    }
    /**
     * Get the target users for an invite. Requires being the inviter or having the `MANAGE_GUILD` or `VIEW_AUDIT_LOG` permission.
     * @param code The code of the invite.
     */
    async getInviteTargetUsers(code) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.INVITE_TARGET_USERS(code)
        }).then(data => data.toString().split(/\r?\n/).filter(line => /^\d{15,}$/.test(line)));
    }
    /**
     * Get the target users job status for an invite. Requires being the inviter or having the `MANAGE_GUILD` or `VIEW_AUDIT_LOG` permission.
     * @param code The code of the invite.
     */
    async getInviteTargetUsersJobStatus(code) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.INVITE_TARGET_USERS_JOB_STATUS(code)
        }).then(data => ({
            completedAt: data.completed_at ? new Date(data.completed_at) : null,
            createdAt: new Date(data.created_at),
            errorMessage: data.error_message,
            processedUsers: data.processed_users,
            status: data.status,
            totalUsers: data.total_users
        }));
    }
    /**
     * Get the invites of a channel.
     * @param channelID The ID of the channel to get the invites of.
     * @caching This method **does not** cache its result.
     */
    async getInvites(channelID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_INVITES(channelID)
        }).then(data => data.map(invite => Invite_1.default.withMetadata(invite, this._manager.client)));
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
                limit: options?.limit
            }
        }).then(data => ({
            hasMore: data.has_more,
            members: data.members.map(m => ({
                flags: m.flags,
                id: m.id,
                joinTimestamp: new Date(m.join_timestamp),
                userID: m.user_id
            })),
            threads: data.threads.map(d => this._manager.client.util.updateThread(d))
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
            path: Routes.CHANNEL_MESSAGE(channelID, messageID)
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
            // eslint-disable-next-line unicorn/no-negated-condition
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
                query
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
        // eslint-disable-next-line unicorn/no-this-assignment
        const self = this;
        const it = {
            lastMessage: chosenOption === "after" ? options?.after : options?.before,
            limit: options?.limit ?? 100,
            async *[Symbol.asyncIterator]() {
                loop: while (it.limit > 0) {
                    const messages = await self.getMessages(channelID, {
                        limit: Math.min(it.limit, 100),
                        [chosenOption]: it.lastMessage
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
            }
        };
        return it;
    }
    /**
     * Get the pinned messages in a channel.
     * @param channelID The ID of the channel to get the pinned messages from.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    async getPinnedMessages(channelID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_PINS(channelID)
        }).then(data => data.map(d => this._manager.client.util.updateMessage(d)));
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
        query.setIfPresent("before", options?.after);
        query.setIfPresent("limit", options?.limit);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.POLL_ANSWER_USERS(channelID, messageID, answerID),
            query
        }).then(data => {
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
            query
        }).then(data => ({
            hasMore: data.has_more,
            members: data.members.map(m => ({
                flags: m.flags,
                id: m.id,
                joinTimestamp: new Date(m.join_timestamp),
                userID: m.user_id
            })),
            threads: data.threads.map(d => this._manager.client.util.updateThread(d))
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
            query
        }).then(data => ({
            hasMore: data.has_more,
            members: data.members.map(m => ({
                flags: m.flags,
                id: m.id,
                joinTimestamp: new Date(m.join_timestamp),
                userID: m.user_id
            })),
            threads: data.threads.map(d => this._manager.client.util.updateThread(d))
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
            query
        }).then(data => ({
            hasMore: data.has_more,
            members: data.members.map(m => ({
                flags: m.flags,
                id: m.id,
                joinTimestamp: new Date(m.join_timestamp),
                userID: m.user_id
            })),
            threads: data.threads.map(d => this._manager.client.util.updateThread(d))
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
                query
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
                limit: limitToFetch
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
            path: Routes.STAGE_INSTANCE(channelID)
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
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, userID)
        }).then(data => ({
            flags: data.flags,
            id: data.id,
            joinTimestamp: new Date(data.join_timestamp),
            userID: data.user_id
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
            query
        }).then(data => data.map(d => {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            const guild = this._manager.client.getChannel(channelID)?.["_cachedGuild"];
            const member = guild && options?.withMember ? guild.members.update(d.member, guild.id) : undefined;
            return {
                flags: d.flags,
                id: d.id,
                joinTimestamp: new Date(d.join_timestamp),
                member,
                userID: d.user_id
            };
        }));
    }
    /** @deprecated Get the list of usable voice regions. Moved to `misc`. */
    async getVoiceRegions() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.VOICE_REGIONS
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
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, "@me")
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
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, "@me")
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
            path: Routes.CHANNEL_PINNED_MESSAGE(channelID, messageID),
            reason
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
        const filter = (message) => {
            if (message.timestamp.getTime() < Date.now() - 1209600000) {
                return "break";
            }
            return options?.filter?.(message) ?? true;
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
                [chosenOption]: options[chosenOption]
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
            filter
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
            path: Routes.GROUP_RECIPIENT(groupID, userID)
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
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, userID)
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
            json: { sound_id: options.soundID, source_guild_id: options.sourceGuildID }
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
            path: Routes.CHANNEL_TYPING(channelID)
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
            json: { status }
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
                rate_limit_per_user: options.rateLimitPerUser
            },
            reason: options.reason
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
                    sticker_ids: options.message.stickerIDs
                },
                name: options.name,
                rate_limit_per_user: options.rateLimitPerUser,
                applied_tags: options.appliedTags
            },
            reason: options.reason,
            files: options.message.files
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
                type: options.type
            },
            reason: options.reason
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
            path: Routes.CHANNEL_PINNED_MESSAGE(channelID, messageID),
            reason
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
                this._manager.client.util._arrayToCSVFile(users, "target_users_file", "user_id")
            ]
        });
    }
}
exports.default = Channels;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbm5lbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcm91dGVzL0NoYW5uZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLCtEQUF5QztBQUV6QywwRUFNOEI7QUFTOUIsd0ZBQXdEO0FBQ3hELDRDQUE0QztBQUM1QyxnRkFBZ0Q7QUFFaEQsMklBQTJJO0FBQzNJLE1BQXFCLFFBQVE7SUFDakIsUUFBUSxDQUFjO0lBQzlCLFlBQVksT0FBb0I7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE9BQWUsRUFBRSxPQUFnRDtRQUNyRixPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFPO1lBQ2xDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDdkQsSUFBSSxFQUFJO2dCQUNKLFlBQVksRUFBRSxPQUFPLENBQUMsV0FBVztnQkFDakMsSUFBSSxFQUFVLE9BQU8sQ0FBQyxJQUFJO2FBQzdCO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLGVBQWUsQ0FBQyxTQUFpQixFQUFFLE1BQWM7UUFDbkQsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBTztZQUNsQyxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQztTQUMxRCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMs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