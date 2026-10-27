"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module REST/Guilds */
const promises_1 = require("node:timers/promises");
const ApplicationCommand_1 = tslib_1.__importDefault(require("../structures/ApplicationCommand"));
const AuditLogEntry_1 = tslib_1.__importDefault(require("../structures/AuditLogEntry"));
const AutoModerationRule_1 = tslib_1.__importDefault(require("../structures/AutoModerationRule"));
const Channel_1 = tslib_1.__importDefault(require("../structures/Channel"));
const Guild_1 = tslib_1.__importDefault(require("../structures/Guild"));
const GuildJoinRequest_1 = tslib_1.__importDefault(require("../structures/GuildJoinRequest"));
const GuildPreview_1 = tslib_1.__importDefault(require("../structures/GuildPreview"));
const GuildScheduledEvent_1 = tslib_1.__importDefault(require("../structures/GuildScheduledEvent"));
const GuildTemplate_1 = tslib_1.__importDefault(require("../structures/GuildTemplate"));
const Integration_1 = tslib_1.__importDefault(require("../structures/Integration"));
const Invite_1 = tslib_1.__importDefault(require("../structures/Invite"));
const Role_1 = tslib_1.__importDefault(require("../structures/Role"));
const Soundboard_1 = tslib_1.__importDefault(require("../structures/Soundboard"));
const VoiceState_1 = tslib_1.__importDefault(require("../structures/VoiceState"));
const Webhook_1 = tslib_1.__importDefault(require("../structures/Webhook"));
const QueryBuilder_1 = tslib_1.__importDefault(require("../util/QueryBuilder"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
/** Various methods for interacting with guilds. Located at {@link Client#rest | Client#rest}{@link RESTManager#guilds | .guilds}. */
class Guilds {
    _manager;
    constructor(manager) {
        this._manager = manager;
    }
    /**
     * Accept or deny a guild join request.
     * @param guildID The ID of the guild.
     * @param requestID The ID of the join request.
     * @param options The options for actioning the join request.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#joinRequests | Guild#joinRequests}
     */
    async actionJoinRequest(guildID, requestID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_JOIN_REQUEST(guildID, requestID),
            json: {
                action: options.action,
                rejection_reason: options.rejectionReason,
            },
        }).then(data => this._manager.client.guilds.get(guildID)?.joinRequests.update(data) ?? new GuildJoinRequest_1.default(data, this._manager.client));
    }
    /**
     * Add a member to a guild. Requires an access token with the `guilds.join` scope.
     *
     * Returns the newly added member upon success, or void if the member is already in the guild.
     * @param guildID The ID of the guild.
     * @param userID The ID of the user to add.
     * @param options The options for adding the member.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#members | Guild#members}
     */
    async addMember(guildID, userID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PUT",
            path: Routes.GUILD_MEMBER(guildID, userID),
            json: {
                access_token: options.accessToken,
                deaf: options.deaf,
                mute: options.mute,
                nick: options.nick,
                roles: options.roles,
            },
        }).then(data => data === null ? undefined : this._manager.client.util.updateMember(guildID, userID, data));
    }
    /**
     * Add a role to a member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to add.
     * @param reason The reason for adding the role.
     * @caching This method **does not** cache its result.
     */
    async addMemberRole(guildID, memberID, roleID, reason) {
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.GUILD_MEMBER_ROLE(guildID, memberID, roleID),
            reason,
        });
    }
    /**
     * Begin a prune.
     * @param guildID The ID of the guild.
     * @param options The options for the prune.
     * @caching This method **does not** cache its result.
     */
    async beginPrune(guildID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.GUILD_PRUNE(guildID),
            json: {
                days: options?.days,
                compute_prune_count: options?.computePruneCount,
                include_roles: options?.includeRoles,
            },
            reason: options?.reason,
        }).then(data => data.pruned);
    }
    /**
     * Ban up to 200 members from a guild. This requires both the `BAN_MEMBERS` and `MANAGE_GUILD` permissions.
     * If no members were banned, a {@link Constants~JSONErrorCodes.FAILED_TO_BAN_USERS | FAILED_TO_BAN_USERS } will be returned.
     * The bot user is ignored.
     * @param guildID The ID of the guild.
     * @param options The options for banning.
     */
    async bulkBan(guildID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.GUILD_BULK_BAN(guildID),
            json: {
                delete_message_seconds: options.deleteMessageSeconds,
                user_ids: options.userIDs,
            },
            reason: options.reason,
        }).then(data => ({
            bannedUsers: data.banned_users,
            failedUsers: data.failed_users,
        }));
    }
    /**
     * Create an auto moderation rule for a guild.
     * @param guildID The ID of the guild.
     * @param options The options for creating the rule.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#autoModerationRules | Guild#autoModerationRules}
     */
    async createAutoModerationRule(guildID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.GUILD_AUTOMOD_RULES(guildID),
            json: {
                actions: options.actions.map(a => ({
                    metadata: {
                        channel_id: a.metadata.channelID,
                        custom_message: a.metadata.customMessage,
                        duration_seconds: a.metadata.durationSeconds,
                    },
                    type: a.type,
                })),
                enabled: options.enabled,
                event_type: options.eventType,
                exempt_channels: options.exemptChannels,
                exempt_roles: options.exemptRoles,
                name: options.name,
                trigger_metadata: options.triggerMetadata ? {
                    allow_list: options.triggerMetadata.allowList,
                    keyword_filter: options.triggerMetadata.keywordFilter,
                    mention_raid_protection_enabled: options.triggerMetadata.mentionRaidProtectionEnabled,
                    mention_total_limit: options.triggerMetadata.mentionTotalLimit,
                    presets: options.triggerMetadata.presets,
                    regex_patterns: options.triggerMetadata.regexPatterns,
                } : undefined,
                trigger_type: options.triggerType,
            },
            reason: options.reason,
        }).then(data => this._manager.client.guilds.get(guildID)?.autoModerationRules.update(data) ?? new AutoModerationRule_1.default(data, this._manager.client));
    }
    /**
     * Create a ban for a user.
     * @param guildID The ID of the guild.
     * @param userID The ID of the user to ban.
     * @param options The options for creating the ban.
     * @caching This method **does not** cache its result.
     */
    async createBan(guildID, userID, options) {
        options = this._manager.client.util._freeze(options);
        let deleteMessageSeconds = options?.deleteMessageSeconds;
        if (options?.deleteMessageDays !== undefined && !Object.hasOwn(options, "deleteMessageSeconds")) {
            deleteMessageSeconds = options.deleteMessageDays * 86400;
        }
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.GUILD_BAN(guildID, userID),
            json: { delete_message_seconds: deleteMessageSeconds },
            reason: options?.reason,
        });
    }
    /**
     * Create a channel in a guild.
     * @param guildID The ID of the guild.
     * @param options The options for creating the channel.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#channels | Guild#channels}
     */
    async createChannel(guildID, type, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.GUILD_CHANNELS(guildID),
            json: {
                available_tags: options.availableTags ? options.availableTags.map(tag => ({
                    emoji_id: tag.emoji?.id,
                    emoji_name: tag.emoji?.name,
                    moderated: tag.moderated,
                    name: tag.name,
                })) : options.availableTags,
                bitrate: options.bitrate,
                default_auto_archive_duration: options.defaultAutoArchiveDuration,
                default_forum_layout: options.defaultForumLayout,
                default_reaction_emoji: options.defaultReactionEmoji ? { emoji_id: options.defaultReactionEmoji.id, emoji_name: options.defaultReactionEmoji.name } : options.defaultReactionEmoji,
                default_sort_order: options.defaultSortOrder,
                name: options.name,
                nsfw: options.nsfw,
                parent_id: options.parentID,
                permission_overwrites: options.permissionOverwrites,
                position: options.position,
                rate_limit_per_user: options.rateLimitPerUser,
                rtc_region: options.rtcRegion,
                topic: options.topic,
                type,
                user_limit: options.userLimit,
                video_quality_mode: options.videoQualityMode,
            },
            reason: options.reason,
        }).then(data => this._manager.client.util.updateChannel(data));
    }
    /**
     * Create an emoji in a guild.
     * @param guildID The ID of the guild.
     * @param options The options for creating the emoji.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#emojis | Guild#emojis}<br>{@link Client#users | Client#users} (creator, if applicable)
     */
    async createEmoji(guildID, options) {
        options = this._manager.client.util._freeze(options);
        let image;
        if (options.image) {
            image = this._manager.client.util._convertImage(options.image, "image");
        }
        return this._manager.authRequest({
            method: "POST",
            path: Routes.GUILD_EMOJIS(guildID),
            json: {
                image,
                name: options.name,
                roles: options.roles,
            },
            reason: options.reason,
        }).then(data => this._manager.client.guilds.get(guildID)?.emojis.update(data) ?? this._manager.client.util.convertGuildEmoji(data));
    }
    /**
     * Create a role.
     * @param guildID The ID of the guild.
     * @param options The options for creating the role.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#roles | Guild#roles}
     */
    async createRole(guildID, options) {
        options = this._manager.client.util._freeze(options);
        let icon;
        if (options?.icon) {
            icon = this._manager.client.util._convertImage(options.icon, "icon");
        }
        return this._manager.authRequest({
            method: "POST",
            path: Routes.GUILD_ROLES(guildID),
            json: {
                colors: options?.colors || options?.color ? {
                    primary_color: options.colors?.primaryColor ?? options.color,
                    secondary_color: options.colors?.secondaryColor,
                    tertiary_color: options.colors?.tertiaryColor,
                } : undefined,
                hoist: options?.hoist,
                icon,
                mentionable: options?.mentionable,
                name: options?.name,
                permissions: options?.permissions,
                unicode_emoji: options?.unicodeEmoji,
            },
            reason: options?.reason,
        }).then(data => this._manager.client.guilds.get(guildID)?.roles.update(data, guildID) ?? new Role_1.default(data, this._manager.client, guildID));
    }
    /**
     * Create a scheduled event in a guild.
     * @param guildID The ID of the guild.
     * @param options The options for creating the scheduled event.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#scheduledEvents | Guild#scheduledEvents}
     */
    async createScheduledEvent(guildID, options) {
        options = this._manager.client.util._freeze(options);
        let image;
        if (options.image) {
            image = this._manager.client.util._convertImage(options.image, "image");
        }
        return this._manager.authRequest({
            method: "POST",
            path: Routes.GUILD_SCHEDULED_EVENTS(guildID),
            json: {
                channel_id: options.channelID,
                description: options.description,
                entity_metadata: options.entityMetadata ? { location: options.entityMetadata.location } : undefined,
                entity_type: options.entityType,
                image,
                name: options.name,
                privacy_level: options.privacyLevel,
                scheduled_end_time: options.scheduledEndTime,
                scheduled_start_time: options.scheduledStartTime,
            },
            reason: options.reason,
        }).then(data => this._manager.client.guilds.get(guildID)?.scheduledEvents.update(data) ?? new GuildScheduledEvent_1.default(data, this._manager.client));
    }
    /**
     * Create an exception to the recurrence rule for a scheduled event.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event.
     * @param options The options for creating the scheduled event exception.
     * @caching This method **may** cache its result. The result will not be cached if the scheduled event is not cached.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    async createScheduledEventException(guildID, eventID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.GUILD_SCHEDULED_EVENT_EXCEPTIONS(guildID, eventID),
            json: {
                is_canceled: options.isCanceled,
                original_scheduled_start_time: options.originalScheduledStartTime,
                scheduled_end_time: options.scheduledEndTime,
                scheduled_start_time: options.scheduledStartTime,
            },
            reason: options.reason,
        }).then((data) => {
            const exception = this._manager.client.util.convertScheduledEventException(data);
            const event = this._manager.client.guilds.get(guildID)?.scheduledEvents.get(eventID);
            if (event) {
                const existing = event.exceptions.findIndex(e => e.eventExceptionID === exception.eventExceptionID);
                if (existing === -1) {
                    event.exceptions.push(exception);
                }
                else {
                    event.exceptions[existing] = exception;
                }
            }
            return exception;
        });
    }
    /**
     * Create a soundboard sound
     * @param guildID The ID of the guild
     * @param options The options for creating the soundboard sound
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#soundboardSounds | Guild#soundboardSounds}
     */
    async createSoundboardSound(guildID, options) {
        options = this._manager.client.util._freeze(options);
        let sound;
        if (options.sound) {
            sound = this._manager.client.util._convertSound(options.sound, "sound");
        }
        return this._manager.authRequest({
            method: "POST",
            path: Routes.SOUNDBOARD_SOUNDS(guildID),
            json: {
                emoji_id: options.emojiID,
                emoji_name: options.emojiName,
                name: options.name,
                sound,
                volume: options.volume,
            },
            reason: options.reason,
        }).then(data => this._manager.client.guilds.get(guildID)?.soundboardSounds.update(data) ?? new Soundboard_1.default(data, this._manager.client));
    }
    /**
     * Create a sticker.
     * @param guildID The ID of the guild.
     * @param options The options for creating the sticker.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#stickers | Guild#stickers}<br>{@link Client#users | Client#users} (creator, if applicable)
     */
    async createSticker(guildID, options) {
        options = this._manager.client.util._freeze(options);
        const magic = this._manager.client.util.getMagic(options.file.contents);
        let mime;
        switch (magic) {
            // png & apng have the same magic
            case "89504E47": {
                mime = "image/png";
                break;
            }
            // lottie
            case "7B227622": {
                mime = "application/json";
                break;
            }
        }
        const form = new FormData();
        form.append("description", options.description);
        form.append("name", options.name);
        form.append("tags", options.tags);
        form.append("file", new Blob([options.file.contents], { type: mime }), options.file.name);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.GUILD_STICKERS(guildID),
            form,
            reason: options.reason,
        }).then(data => this._manager.client.guilds.get(guildID)?.stickers.update(data) ?? this._manager.client.util.convertSticker(data));
    }
    /**
     * Create a guild template.
     * @param guildID The ID of the guild to create a template from.
     * @param options The options for creating the template.
     */
    async createTemplate(guildID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.GUILD_TEMPLATES(guildID),
            json: {
                description: options.description,
                name: options.name,
            },
        }).then(data => new GuildTemplate_1.default(data, this._manager.client));
    }
    /**
     * Delete an auto moderation rule.
     * @param guildID The ID of the guild.
     * @param ruleID The ID of the rule to delete.
     * @param reason The reason for deleting the rule.
     * @caching This method **does not** cache its result.
     */
    async deleteAutoModerationRule(guildID, ruleID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.GUILD_AUTOMOD_RULE(guildID, ruleID),
            reason,
        });
    }
    /**
     * Delete an emoji.
     * @param guildID The ID of the guild.
     * @param emojiID The ID of the emoji.
     * @param reason The reason for deleting the emoji.
     * @caching This method **does not** cache its result.
     */
    async deleteEmoji(guildID, emojiID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.GUILD_EMOJI(guildID, emojiID),
            reason,
        });
    }
    /**
     * Delete an integration.
     * @param guildID The ID of the guild.
     * @param integrationID The ID of the integration.
     * @param reason The reason for deleting the integration.
     * @caching This method **does not** cache its result.
     */
    async deleteIntegration(guildID, integrationID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.GUILD_INTEGRATION(guildID, integrationID),
            reason,
        });
    }
    /**
     * Delete a role.
     * @param guildID The ID of the guild.
     * @param roleID The ID of the role to delete.
     * @param reason The reason for deleting the role.
     * @caching This method **does not** cache its result.
     */
    async deleteRole(guildID, roleID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.GUILD_ROLE(guildID, roleID),
            reason,
        });
    }
    /**
     * Delete a scheduled event.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event.
     * @param reason The reason for deleting the scheduled event. Discord's docs do not explicitly state a reason can be provided, so it may not be used.
     * @caching This method **does not** cache its result.
     */
    async deleteScheduledEvent(guildID, eventID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.GUILD_SCHEDULED_EVENT(guildID, eventID),
            reason,
        });
    }
    /**
     * Delete an exception to the recurrence rule for a scheduled event.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param reason The reason for deleting the scheduled event exception.
     * @caching This method **may** remove the result from cache. The result will not be removed if the scheduled event is not cached.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    async deleteScheduledEventException(guildID, eventID, exceptionID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.GUILD_SCHEDULED_EVENT_EXCEPTION(guildID, eventID, exceptionID),
            reason,
        });
        const event = this._manager.client.guilds.get(guildID)?.scheduledEvents.get(eventID);
        if (event) {
            event.exceptions = event.exceptions.filter(exception => exception.eventExceptionID !== exceptionID);
        }
    }
    /**
     *
     * @param guildID The ID of the guild.
     * @param soundID The ID of the soundboard sound to delete.
     * @param reason The reason for deleting the soundboard sound.
     * @caching This method **does not** cache its result.
     */
    async deleteSoundboardSound(guildID, soundID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.SOUNDBOARD_SOUND(guildID, soundID),
            reason,
        });
    }
    /**
     * Delete a sticker.
     * @param guildID The ID of the guild.
     * @param stickerID The ID of the sticker to delete.
     * @param reason The reason for deleting the sticker.
     * @caching This method **does not** cache its result.
     */
    async deleteSticker(guildID, stickerID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.GUILD_STICKER(guildID, stickerID),
            reason,
        });
    }
    /**
     * Delete a template.
     * @param guildID The ID of the guild.
     * @param code The code of the template.
     * @caching This method **does not** cache its result.
     */
    async deleteTemplate(guildID, code) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.GUILD_TEMPLATE(guildID, code),
        });
    }
    /**
     * Edit a guild.
     * @param guildID The ID of the guild.
     * @param options The options for editing the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not already cached.
     * @caches {@link Client#guilds | Client#guilds}
     */
    async edit(guildID, options) {
        options = this._manager.client.util._freeze(options);
        let banner, discoverySplash, icon, splash;
        if (options.banner) {
            banner = this._manager.client.util._convertImage(options.banner, "banner");
        }
        if (options.discoverySplash) {
            discoverySplash = this._manager.client.util._convertImage(options.discoverySplash, "discovery splash");
        }
        if (options.icon) {
            icon = this._manager.client.util._convertImage(options.icon, "icon");
        }
        if (options.splash) {
            splash = this._manager.client.util._convertImage(options.splash, "splash");
        }
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD(guildID),
            json: {
                afk_channel_id: options.afkChannelID,
                afk_timeout: options.afkTimeout,
                banner,
                default_message_notifications: options.defaultMessageNotifications,
                description: options.description,
                discovery_splash: discoverySplash,
                explicit_content_filter: options.explicitContentFilter,
                features: options.features,
                icon,
                name: options.name,
                preferred_locale: options.preferredLocale,
                premium_progress_bar_enabled: options.premiumProgressBarEnabled,
                public_updates_channel_id: options.publicUpdatesChannelID,
                region: options.region,
                rules_channel_id: options.rulesChannelID,
                safety_alerts_channel_id: options.safetyAlertsChannelID,
                splash,
                system_channel_flags: options.systemChannelFlags,
                system_channel_id: options.systemChannelID,
                verification_level: options.verificationLevel,
            },
            reason: options.reason,
        }).then(data => this._manager.client.guilds.has(guildID) ? this._manager.client.guilds.update(data, true) : new Guild_1.default(data, this._manager.client, true));
    }
    /**
     * Edit an existing auto moderation rule.
     * @param guildID The ID of the guild.
     * @param ruleID The ID of the rule to edit.
     * @param options The options for editing the rule.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#autoModerationRules | Guild#autoModerationRules}
     */
    async editAutoModerationRule(guildID, ruleID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_AUTOMOD_RULE(guildID, ruleID),
            json: {
                actions: options.actions?.map(a => ({
                    metadata: {
                        channel_id: a.metadata.channelID,
                        custom_message: a.metadata.customMessage,
                        duration_seconds: a.metadata.durationSeconds,
                    },
                    type: a.type,
                })),
                enabled: options.enabled,
                event_type: options.eventType,
                exempt_channels: options.exemptChannels,
                exempt_roles: options.exemptRoles,
                name: options.name,
                trigger_metadata: options.triggerMetadata ? {
                    allow_list: options.triggerMetadata.allowList,
                    keyword_filter: options.triggerMetadata.keywordFilter,
                    mention_raid_protection_enabled: options.triggerMetadata.mentionRaidProtectionEnabled,
                    mention_total_limit: options.triggerMetadata.mentionTotalLimit,
                    presets: options.triggerMetadata.presets,
                    regex_patterns: options.triggerMetadata.regexPatterns,
                } : undefined,
            },
            reason: options.reason,
        }).then(data => this._manager.client.guilds.get(guildID)?.autoModerationRules.update(data) ?? new AutoModerationRule_1.default(data, this._manager.client));
    }
    /**
     * Edit the positions of channels in a guild.
     * @param guildID The ID of the guild.
     * @param options The channels to move. Unedited channels do not need to be specified.
     * @caching This method **does not** cache its result.
     */
    async editChannelPositions(guildID, options) {
        options = this._manager.client.util._freeze(options);
        await this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_CHANNELS(guildID),
            json: options.map(o => ({
                id: o.id,
                // lock_permissions: o.lockPermissions ?? null,
                // parent_id:        o.parentID ?? null,
                position: o.position ?? null,
            })),
        });
    }
    /**
     * Modify the current member in a guild.
     * @param guildID The ID of the guild.
     * @param options The options for editing the member.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#members | Guild#members}<br>{@link Guild#clientMember | Guild#clientMember}
     */
    async editCurrentMember(guildID, options) {
        options = this._manager.client.util._freeze(options);
        let avatar = options.avatar;
        let banner = options.banner;
        if (avatar) {
            avatar = this._manager.client.util._convertImage(avatar, "avatar");
        }
        if (banner) {
            banner = this._manager.client.util._convertImage(banner, "banner");
        }
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_MEMBER(guildID, "@me"),
            json: { nick: options.nick, banner, avatar, bio: options.bio },
            reason: options.reason,
        }).then(data => this._manager.client.util.updateMember(guildID, data.user.id, data));
    }
    /**
     * Edit the current member's voice state in a guild. `channelID` is required, and the current member must already be in that channel. See [Discord's docs](https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state-caveats) for more information.
     * @param guildID The ID of the guild.
     * @param options The options for editing the voice state.
     * @caching This method **does not** cache its result.
     */
    async editCurrentUserVoiceState(guildID, options) {
        options = this._manager.client.util._freeze(options);
        await this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_VOICE_STATE(guildID, "@me"),
            json: {
                channel_id: options.channelID,
                suppress: options.suppress,
                request_to_speak_timestamp: options.requestToSpeakTimestamp,
            },
        });
    }
    /**
     * Edit an existing emoji.
     * @param guildID The ID of the guild the emoji is in.
     * @param options The options for editing the emoji.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#emojis | Guild#emojis}
     */
    async editEmoji(guildID, emojiID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_EMOJI(guildID, emojiID),
            json: {
                name: options.name,
                roles: options.roles,
            },
            reason: options.reason,
        }).then(data => this._manager.client.guilds.get(guildID)?.emojis.update(data) ?? this._manager.client.util.convertGuildEmoji(data));
    }
    /**
     * Edit the incident actions for a guild.
     * @param guildID The ID of the guild.
     * @param options The options for editing the incident actions.
     * @caching This method **does not** cache its result.
     */
    async editIncidentActions(guildID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PUT",
            path: Routes.GUILD_INCIDENT_ACTIONS(guildID),
            json: {
                dms_disabled_until: options.dmsDisabledUntil,
                invites_disabled_until: options.invitesDisabledUntil,
            },
            reason: options.reason,
        }).then(data => ({
            dmsDisabledUntil: data.dms_disabled_until,
            invitesDisabledUntil: data.invites_disabled_until,
        }));
    }
    /**
     * Edit a guild member. Use editCurrentMember if you wish to update the nick of this client using the `CHANGE_NICKNAME` permission.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @param options The options for editing the member.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#members | Guild#members}
     */
    async editMember(guildID, memberID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_MEMBER(guildID, memberID),
            json: {
                channel_id: options.channelID,
                communication_disabled_until: options.communicationDisabledUntil,
                deaf: options.deaf,
                flags: options.flags,
                mute: options.mute,
                nick: options.nick,
                roles: options.roles,
            },
            reason: options.reason,
        }).then(data => this._manager.client.util.updateMember(guildID, memberID, data));
    }
    /**
     * Edit a guild's onboarding configuration.
     * @param guildID The ID of the guild.
     * @param options The options for editing the onboarding configuration.
     * @caching This method **does not** cache its result.
     */
    async editOnboarding(guildID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PUT",
            path: Routes.GUILD_ONBOARDING(guildID),
            json: {
                enabled: options.enabled,
                default_channel_ids: options.defaultChannelIDs,
                prompts: options.prompts?.map(p => ({
                    id: p.id,
                    in_oboarding: p.inOnboarding,
                    options: p.options.map(o => ({
                        channel_ids: o.channelIDs,
                        description: o.description,
                        emoji: o.emoji,
                        id: o.id,
                        role_ids: o.roleIDs,
                        title: o.title,
                    })),
                    required: p.required,
                    single_select: p.singleSelect,
                    title: p.title,
                })),
                mode: options.mode,
            },
            reason: options.reason,
        }).then(data => ({
            defaultChannelIDs: data.default_channel_ids,
            enabled: data.enabled,
            guildID: data.guild_id,
            mode: data.mode,
            prompts: data.prompts.map(p => ({
                id: p.id,
                inOnboarding: p.in_onboarding,
                options: p.options.map(o => ({
                    channelIDs: o.channel_ids,
                    description: o.description,
                    emoji: o.emoji,
                    id: o.id,
                    roleIDs: o.role_ids,
                    title: o.title,
                })),
                required: p.required,
                singleSelect: p.single_select,
                title: p.title,
            })),
        }));
    }
    /**
     * Edit an existing role.
     * @param guildID The ID of the guild.
     * @param options The options for editing the role.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#roles | Guild#roles}
     */
    async editRole(guildID, roleID, options) {
        options = this._manager.client.util._freeze(options);
        let icon;
        if (options.icon) {
            icon = this._manager.client.util._convertImage(options.icon, "icon");
        }
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_ROLE(guildID, roleID),
            json: {
                colors: options.colors || options.color ? {
                    primary_color: options.colors?.primaryColor ?? options.color,
                    secondary_color: options.colors?.secondaryColor,
                    tertiary_color: options.colors?.tertiaryColor,
                } : undefined,
                hoist: options.hoist,
                icon,
                mentionable: options.mentionable,
                name: options.name,
                permissions: options.permissions,
                unicode_emoji: options.unicodeEmoji,
            },
            reason: options.reason,
        }).then(data => this._manager.client.guilds.get(guildID)?.roles.update(data, guildID) ?? new Role_1.default(data, this._manager.client, guildID));
    }
    /**
     * Edit the position of roles in a guild.
     * @param guildID The ID of the guild.
     * @param options The roles to move.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#roles | Guild#roles}
     */
    async editRolePositions(guildID, options, reason) {
        options = this._manager.client.util._freeze(options);
        const guild = this._manager.client.guilds.get(guildID);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_ROLES(guildID),
            json: options.map(o => ({
                id: o.id,
                position: o.position,
            })),
            reason,
        }).then(data => data.map(role => guild?.roles.update(role, guildID) ?? new Role_1.default(role, this._manager.client, guildID)));
    }
    /**
     * Edit an existing scheduled event in a guild.
     * @param guildID The ID of the guild.
     * @param scheduledEventID The ID of the scheduled event.
     * @param options The options for editing the scheduled event.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#scheduledEvents | Guild#scheduledEvents}
     */
    async editScheduledEvent(guildID, scheduledEventID, options) {
        options = this._manager.client.util._freeze(options);
        let image;
        if (options.image) {
            image = this._manager.client.util._convertImage(options.image, "image");
        }
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_SCHEDULED_EVENT(guildID, scheduledEventID),
            json: {
                channel_id: options.channelID,
                description: options.description,
                entity_metadata: options.entityMetadata ? { location: options.entityMetadata.location } : undefined,
                entity_type: options.entityType,
                image,
                name: options.name,
                privacy_level: options.privacyLevel,
                status: options.status,
                scheduled_end_time: options.scheduledEndTime,
                scheduled_start_time: options.scheduledStartTime,
            },
            reason: options.reason,
        }).then(data => this._manager.client.guilds.get(guildID)?.scheduledEvents.update(data) ?? new GuildScheduledEvent_1.default(data, this._manager.client));
    }
    /**
     * Edit an exception to the recurrence rule for a scheduled event.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param options The options for editing the scheduled event exception.
     * @caching This method **may** cache its result. The result will not be cached if the scheduled event is not cached.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    async editScheduledEventException(guildID, eventID, exceptionID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_SCHEDULED_EVENT_EXCEPTION(guildID, eventID, exceptionID),
            json: {
                is_canceled: options.isCanceled,
                scheduled_end_time: options.scheduledEndTime,
                scheduled_start_time: options.scheduledStartTime,
            },
            reason: options.reason,
        }).then((data) => {
            const exception = this._manager.client.util.convertScheduledEventException(data);
            const event = this._manager.client.guilds.get(guildID)?.scheduledEvents.get(eventID);
            if (event) {
                const existing = event.exceptions.findIndex(e => e.eventExceptionID === exception.eventExceptionID);
                if (existing === -1) {
                    event.exceptions.push(exception);
                }
                else {
                    event.exceptions[existing] = exception;
                }
            }
            return exception;
        });
    }
    /**
     * Edit a soundboard sound.
     * @param guildID The ID of the guild.
     * @param soundID The ID of the soundboard sound to edit.
     * @param options The options for editing the soundboard sound.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#soundboardSounds | Guild#soundboardSounds}
     */
    async editSoundboardSound(guildID, soundID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.SOUNDBOARD_SOUND(guildID, soundID),
            json: {
                emoji_id: options.emojiID,
                emoji_name: options.emojiName,
                name: options.name,
                volume: options.volume,
            },
            reason: options.reason,
        }).then(data => this._manager.client.guilds.get(guildID)?.soundboardSounds.update(data) ?? new Soundboard_1.default(data, this._manager.client));
    }
    /**
     * Edit a sticker.
     * @param guildID The ID of the guild.
     * @param options The options for editing the sticker.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#stickers | Guild#stickers}
     */
    async editSticker(guildID, stickerID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_STICKER(guildID, stickerID),
            json: {
                description: options.description,
                name: options.name,
                tags: options.tags,
            },
            reason: options.reason,
        }).then(data => this._manager.client.guilds.get(guildID)?.stickers.update(data) ?? this._manager.client.util.convertSticker(data));
    }
    /**
     * Edit a guild template.
     * @param guildID The ID of the guild.
     * @param code The code of the template.
     * @param options The options for editing the template.
     * @caching This method **does not** cache its result.
     */
    async editTemplate(guildID, code, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_TEMPLATE(guildID, code),
            json: {
                code,
                description: options.description,
                name: options.name,
            },
        }).then(data => new GuildTemplate_1.default(data, this._manager.client));
    }
    /**
     * Edit a guild member's voice state. `channelID` is required, and the user must already be in that channel. See [Discord's docs](https://discord.com/developers/docs/resources/guild#modify-user-voice-state) for more information.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @param options The options for editing the voice state.
     * @caching This method **does not** cache its result.
     */
    async editUserVoiceState(guildID, memberID, options) {
        options = this._manager.client.util._freeze(options);
        await this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_VOICE_STATE(guildID, memberID),
            json: {
                channel_id: options.channelID,
                suppress: options.suppress,
            },
        });
    }
    /**
     * Edit the welcome screen in a guild.
     * @param guildID The ID of the guild.
     * @param options The options for editing the welcome screen.
     * @caching This method **does not** cache its result.
     */
    async editWelcomeScreen(guildID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_WELCOME_SCREEN(guildID),
            json: {
                description: options.description,
                enabled: options.enabled,
                welcome_channels: options.welcomeChannels.map(ch => ({
                    channel_id: ch.channelID,
                    description: ch.description,
                    emoji_id: ch.emojiID,
                    emoji_name: ch.emojiName,
                })),
            },
            reason: options.reason,
        }).then(data => ({
            description: data.description,
            welcomeChannels: data.welcome_channels.map(channel => ({
                channelID: channel.channel_id,
                description: channel.description,
                emojiID: channel.emoji_id,
                emojiName: channel.emoji_name,
            })),
        }));
    }
    /**
     * Edit the widget of a guild.
     * @param guildID The ID of the guild.
     * @param options The options for editing the widget.
     * @caching This method **does not** cache its result.
     */
    async editWidget(guildID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_WIDGET(guildID),
            json: {
                channel_id: options.channelID,
                enabled: options.enabled,
            },
        }).then(data => ({
            channels: data.channels,
            id: data.id,
            instantInvite: data.instant_invite,
            members: data.members.map(m => ({
                activity: m.activity,
                avatar: m.avatar,
                avatarURL: m.avatar_url,
                discriminator: m.discriminator,
                id: m.id,
                status: m.status,
                tag: m.username,
                username: m.username,
            })),
            name: data.name,
            presenceCount: data.presence_count,
        }));
    }
    /**
     * Get a guild.
     * @param guildID The ID of the guild.
     * @param withCounts If the approximate number of members and online members should be included.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not already cached.
     * @caches {@link Client#guilds | Client#guilds}
     */
    async get(guildID, withCounts) {
        const query = new QueryBuilder_1.default();
        query.setIfPresent("with_counts", withCounts);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD(guildID),
            query,
        }).then(data => this._manager.client.guilds.has(guildID) ? this._manager.client.guilds.update(data, true) : new Guild_1.default(data, this._manager.client, true));
    }
    /**
     * Get the active threads in a guild.
     * @param guildID The ID of the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    async getActiveThreads(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_ACTIVE_THREADS(guildID),
        }).then(data => ({
            members: data.members.map(member => ({
                flags: member.flags,
                id: member.id,
                joinTimestamp: new Date(member.join_timestamp),
                userID: member.user_id,
            })),
            threads: data.threads.map(rawThread => this._manager.client.util.updateThread(rawThread)),
        }));
    }
    /**
     * Get a guild's audit log.
     * @param guildID The ID of the guild.
     * @param options The options for getting the audit logs.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#autoModerationRules | Guild#autoModerationRules}<br>{@link Guild#scheduledEvents | Guild#scheduledEvents}<br>{@link Guild#integrations | Guild#integrations}<br>{@link Guild#threads | Guild#threads}<br>{@link Client#users | Client#users}
     */
    async getAuditLog(guildID, options) {
        const guild = this._manager.client.guilds.get(guildID);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("action_type", options?.actionType);
        query.setIfPresent("before", options?.before);
        query.setIfPresent("limit", options?.limit);
        query.setIfPresent("user_id", options?.userID);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_AUDIT_LOG(guildID),
            query,
        }).then(data => ({
            applicationCommands: data.application_commands.map(command => new ApplicationCommand_1.default(command, this._manager.client)),
            autoModerationRules: data.auto_moderation_rules.map(rule => guild?.autoModerationRules.update(rule) ?? new AutoModerationRule_1.default(rule, this._manager.client)),
            entries: data.audit_log_entries.map(entry => new AuditLogEntry_1.default(entry, this._manager.client)),
            guildScheduledEvents: data.guild_scheduled_events.map(event => guild?.scheduledEvents.update(event) ?? new GuildScheduledEvent_1.default(event, this._manager.client)),
            integrations: data.integrations.map(integration => guild?.integrations.update(integration, guildID) ?? new Integration_1.default(integration, this._manager.client, guildID)),
            threads: data.threads.map(rawThread => this._manager.client.util.updateThread(rawThread)),
            users: data.users.map(user => this._manager.client.users.update(user)),
            webhooks: data.webhooks.map(webhook => new Webhook_1.default(webhook, this._manager.client)),
        }));
    }
    /**
     * Get an auto moderation rule for a guild.
     * @param guildID The ID of the guild.
     * @param ruleID The ID of the rule to get.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#autoModerationRules | Guild#autoModerationRules}
     */
    async getAutoModerationRule(guildID, ruleID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_AUTOMOD_RULE(guildID, ruleID),
        }).then(data => this._manager.client.guilds.get(guildID)?.autoModerationRules.update(data) ?? new AutoModerationRule_1.default(data, this._manager.client));
    }
    /**
     * Get the auto moderation rules for a guild.
     * @param guildID The ID of the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#autoModerationRules | Guild#autoModerationRules}
     */
    async getAutoModerationRules(guildID) {
        const guild = this._manager.client.guilds.get(guildID);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_AUTOMOD_RULES(guildID),
        }).then(data => data.map(rule => guild?.autoModerationRules.update(rule) ?? new AutoModerationRule_1.default(rule, this._manager.client)));
    }
    /**
     * Get a ban.
     * @param guildID The ID of the guild.
     * @param userID The ID of the user to get the ban of.
     * @caching This method **does** cache part of its result.
     * @caches {@link Client#users | Client#users}
     */
    async getBan(guildID, userID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_BAN(guildID, userID),
        }).then(data => ({
            reason: data.reason,
            user: this._manager.client.users.update(data.user),
        }));
    }
    /**
     * Get the bans in a guild.
     * @param guildID The ID of the guild.
     * @param options The options for getting the bans.
     * @caching This method **does** cache part of its result.
     * @caches {@link Client#users | Client#users}
     */
    async getBans(guildID, options) {
        const _getBans = async (_options) => {
            const query = new QueryBuilder_1.default();
            query.setIfPresent("after", _options?.after);
            query.setIfPresent("before", _options?.before);
            query.setIfPresent("limit", _options?.limit);
            return this._manager.authRequest({
                method: "GET",
                path: Routes.GUILD_BANS(guildID),
                query,
            }).then(data => data.map(ban => ({
                reason: ban.reason,
                user: this._manager.client.users.update(ban.user),
            })));
        };
        const limit = options?.limit ?? 1000;
        let chosenOption;
        if (options?.after) {
            chosenOption = "after";
        }
        else if (options?.before) {
            chosenOption = "before";
        }
        else {
            chosenOption = "after";
        }
        let optionValue = options?.[chosenOption] ?? undefined;
        let bans = [];
        while (bans.length < limit) {
            const limitLeft = limit - bans.length;
            const limitToFetch = Math.min(limitLeft, 1000);
            this._manager.client.emit("debug", `Getting ${limitLeft} more ban${limitLeft === 1 ? "" : "s"} for ${guildID}: ${optionValue ?? ""}`);
            const bansChunk = await _getBans({
                limit: limitToFetch,
                [chosenOption]: optionValue,
            });
            if (bansChunk.length === 0) {
                break;
            }
            bans = bans.concat(bansChunk);
            optionValue = bansChunk.at(-1).user.id;
            if (bansChunk.length < 1000) {
                break;
            }
        }
        return bans;
    }
    /**
     * Get the channels in a guild. Does not include threads.
     * @param guildID The ID of the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#channels | Guild#channels}
     */
    async getChannels(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_CHANNELS(guildID),
        }).then(data => data.map(d => this._manager.client.util.updateChannel(d)));
    }
    /**
     * Get an emoji in a guild.
     * @param guildID The ID of the guild.
     * @param emojiID The ID of the emoji to get.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#emojis | Guild#emojis}
     */
    async getEmoji(guildID, emojiID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_EMOJI(guildID, emojiID),
        }).then(data => this._manager.client.guilds.get(guildID)?.emojis.update(data) ?? this._manager.client.util.convertGuildEmoji(data));
    }
    /**
     * Get the emojis in a guild.
     * @param guildID The ID of the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#emojis | Guild#emojis} (will be completely cleared and refilled)
     */
    async getEmojis(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_EMOJIS(guildID),
        }).then((data) => {
            const guild = this._manager.client.guilds.get(guildID);
            guild?.emojis.clear();
            return data.map(emoji => guild?.emojis.update(emoji) ?? this._manager.client.util.convertGuildEmoji(emoji));
        });
    }
    /**
     * Get the integrations in a guild.
     * @param guildID The ID of the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#integrations | Guild#integrations}
     */
    async getIntegrations(guildID) {
        const guild = this._manager.client.guilds.get(guildID);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_INTEGRATIONS(guildID),
        }).then(data => data.map(integration => guild?.integrations.update(integration, guildID) ?? new Integration_1.default(integration, this._manager.client, guildID)));
    }
    /**
     * Get the invites of a guild.
     * @param guildID The ID of the guild to get the invites of.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#invites | Guild#invites}
     */
    async getInvites(guildID) {
        const guild = this._manager.client.guilds.get(guildID);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_INVITES(guildID),
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        }).then(data => data.map(invite => guild?.invites.update(invite) ?? Invite_1.default.withMetadata(invite, this._manager.client)));
    }
    /**
     * Get guild join requests.
     * @param guildID The ID of the guild.
     * @param options The options for getting join requests.
     * @caching This method **may** cache its result. The results will not be cached if the guild is not cached.
     * @caches {@link Guild#joinRequests | Guild#joinRequests}
     */
    async getJoinRequests(guildID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("after", options.after);
        query.setIfPresent("before", options.before);
        query.setIfPresent("limit", options.limit);
        query.set("status", options.status);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_JOIN_REQUESTS(guildID),
            query,
        }).then((data) => {
            const guild = this._manager.client.guilds.get(guildID);
            return {
                guildJoinRequests: data.guild_join_requests.map(request => guild?.joinRequests.update(request) ?? new GuildJoinRequest_1.default(request, this._manager.client)),
                total: data.total,
            };
        });
    }
    /**
     * Get a guild member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#members | Guild#members}
     */
    async getMember(guildID, memberID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_MEMBER(guildID, memberID),
        }).then(data => this._manager.client.util.updateMember(guildID, memberID, data));
    }
    /**
     * Get a guild's members. This requires the `GUILD_MEMBERS` intent.
     * @param guildID The ID of the guild.
     * @param options The options for getting the members.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#members | Guild#members}}
     */
    async getMembers(guildID, options) {
        const query = new QueryBuilder_1.default();
        query.setIfPresent("after", options?.after);
        query.setIfPresent("limit", options?.limit);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_MEMBERS(guildID),
            query,
        }).then(data => data.map(d => this._manager.client.util.updateMember(guildID, d.user.id, d)));
    }
    /**
     * Get a guild's new member welcome info.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    async getNewMemberWelcome(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_NEW_MEMBER_WELCOME(guildID),
        }).then(data => data === null ? null : {
            enabled: data.enabled,
            guildID: data.guild_id,
            newMemberActions: data.new_member_actions.map(action => action === null ? null : {
                actionType: action.action_type,
                channelID: action.channel_id,
                description: action.description,
                emoji: action.emoji,
                icon: action.icon,
                title: action.title,
            }),
            resourceChannels: data.resource_channels.map(channel => channel === null ? null : {
                channelID: channel.channel_id,
                description: channel.description,
                emoji: channel.emoji,
                icon: channel.icon,
                title: channel.title,
            }),
            welcomeMessage: {
                authorIDs: data.welcome_message.author_ids,
                message: data.welcome_message.message,
            },
        });
    }
    /**
     * Get a guild's onboarding info.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    async getOnboarding(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_ONBOARDING(guildID),
        }).then(data => ({
            defaultChannelIDs: data.default_channel_ids,
            enabled: data.enabled,
            guildID: data.guild_id,
            mode: data.mode,
            prompts: data.prompts.map(p => ({
                id: p.id,
                inOnboarding: p.in_onboarding,
                options: p.options.map(o => ({
                    channelIDs: o.channel_ids,
                    description: o.description,
                    emoji: o.emoji,
                    id: o.id,
                    roleIDs: o.role_ids,
                    title: o.title,
                })),
                required: p.required,
                singleSelect: p.single_select,
                title: p.title,
            })),
        }));
    }
    /**
     * Get a preview of a guild. If the client is not already in this guild, the guild must be lurkable.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    async getPreview(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_PREVIEW(guildID),
        }).then(data => new GuildPreview_1.default(data, this._manager.client));
    }
    /**
     * Get the prune count of a guild.
     * @param guildID The ID of the guild.
     * @param options The options for getting the prune count.
     * @caching This method **does not** cache its result.
     */
    async getPruneCount(guildID, options) {
        const query = new QueryBuilder_1.default();
        query.setIfPresent("days", options?.days);
        query.setIfPresent("include_roles", options?.includeRoles?.join(","));
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_PRUNE(guildID),
            query,
        }).then(data => data.pruned);
    }
    /**
     * Get a role in a guild.
     * @param guildID The ID of the guild.
     * @param roleID The ID of the role to get.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#roles | Guild#roles}
     */
    async getRole(guildID, roleID) {
        const guild = this._manager.client.guilds.get(guildID);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_ROLE(guildID, roleID),
        }).then(data => guild?.roles.update(data, guildID) ?? new Role_1.default(data, this._manager.client, guildID));
    }
    /**
     * Get the member count of the roles in a guild. The result is a key-value map of role id to member count.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    async getRoleMemberCounts(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_ROLE_MEMBER_COUNTS(guildID),
        });
    }
    /**
     * Get the roles in a guild.
     * @param guildID The ID of the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#roles | Guild#roles}
     */
    async getRoles(guildID) {
        const guild = this._manager.client.guilds.get(guildID);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_ROLES(guildID),
        }).then(data => data.map(role => guild?.roles.update(role, guildID) ?? new Role_1.default(role, this._manager.client, guildID)));
    }
    /**
     * Get a scheduled event.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event to get.
     * @param withUserCount If the number of users subscribed to the event should be included.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#scheduledEvents | Guild#scheduledEvents}
     */
    async getScheduledEvent(guildID, eventID, withUserCount) {
        const guild = this._manager.client.guilds.get(guildID);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("with_user_count", withUserCount);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_SCHEDULED_EVENT(guildID, eventID),
            query,
        }).then(data => guild?.scheduledEvents.update(data) ?? new GuildScheduledEvent_1.default(data, this._manager.client));
    }
    /**
     * Get users subscribed to an exception for a scheduled event.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param options The options for getting the users.
     * @caching This method **does** cache part of its result. Members will not be cached if the guild is not cached.
     * @caches {@link Client#users | Client#users}<br>{@link Guild#members | Guild#members}
     */
    async getScheduledEventExceptionUsers(guildID, eventID, exceptionID, options) {
        const guild = this._manager.client.guilds.get(guildID);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("after", options?.after);
        query.setIfPresent("before", options?.before);
        query.setIfPresent("limit", options?.limit);
        query.setIfPresent("with_member", options?.withMember);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_SCHEDULED_EVENT_EXCEPTION_USERS(guildID, eventID, exceptionID),
            query,
        }).then(data => data.map(d => ({
            guildScheduledEvent: guild?.scheduledEvents.get(d.guild_scheduled_event_id),
            guildScheduledEventExceptionID: d.guild_scheduled_event_exception_id,
            guildScheduledEventID: d.guild_scheduled_event_id,
            member: d.member ? this._manager.client.util.updateMember(guildID, d.member.user.id, d.member) : undefined,
            response: d.response,
            user: this._manager.client.users.update(d.user),
            userID: d.user_id,
        })));
    }
    /**
     * Get a guild's scheduled events.
     * @param guildID The ID of the guild.
     * @param withUserCount If the number of users subscribed to the event should be included.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#scheduledEvents | Guild#scheduledEvents}
     */
    async getScheduledEvents(guildID, withUserCount) {
        const guild = this._manager.client.guilds.get(guildID);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("with_user_count", withUserCount);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_SCHEDULED_EVENTS(guildID),
            query,
        }).then(data => data.map(d => guild?.scheduledEvents.update(d) ?? new GuildScheduledEvent_1.default(d, this._manager.client)));
    }
    /**
     * Get user counts for a scheduled event and optionally specific exceptions.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event.
     * @param options The options for getting the user counts.
     * @caching This method **may** cache the event user count. The count will not be cached if the scheduled event is not cached.
     * @caches {@link GuildScheduledEvent#userCount | GuildScheduledEvent#userCount}
     */
    async getScheduledEventUserCounts(guildID, eventID, options) {
        const query = new QueryBuilder_1.default();
        for (const exceptionID of options?.guildScheduledEventExceptionIDs ?? []) {
            query.append("guild_scheduled_event_exception_ids", exceptionID);
        }
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_SCHEDULED_EVENT_USER_COUNTS(guildID, eventID),
            query,
        }).then((data) => {
            const event = this._manager.client.guilds.get(guildID)?.scheduledEvents.get(eventID);
            if (event) {
                event.userCount = data.guild_scheduled_event_count;
            }
            return {
                guildScheduledEventCount: data.guild_scheduled_event_count,
                guildScheduledEventExceptionCounts: data.guild_scheduled_event_exception_counts,
            };
        });
    }
    /**
     * Get the users subscribed to a scheduled event.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event.
     * @param options The options for getting the users.
     * @caching This method **does** cache part of its result. Members will not be cached if the guild is not cached.
     * @caches {@link Client#users | Client#users}<br>{@link Guild#members | Guild#members}
     */
    async getScheduledEventUsers(guildID, eventID, options) {
        const guild = this._manager.client.guilds.get(guildID);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("after", options?.after);
        query.setIfPresent("before", options?.before);
        query.setIfPresent("limit", options?.limit);
        query.setIfPresent("with_member", options?.withMember);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_SCHEDULED_EVENT_USERS(guildID, eventID),
            query,
        }).then(data => data.map(d => ({
            guildScheduledEvent: guild?.scheduledEvents.get(d.guild_scheduled_event_id),
            guildScheduledEventExceptionID: d.guild_scheduled_event_exception_id,
            guildScheduledEventID: d.guild_scheduled_event_id,
            member: d.member ? this._manager.client.util.updateMember(guildID, d.member.user.id, d.member) : undefined,
            response: d.response,
            user: this._manager.client.users.update(d.user),
            userID: d.user_id,
        })));
    }
    /**
     * Get a soundboard sound.
     * @param guildID The ID of the guild.
     * @param soundID The ID of the soundboard sound to get.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#soundboardSounds | Guild#soundboardSounds}
     */
    async getSoundboardSound(guildID, soundID) {
        const guild = this._manager.client.guilds.get(guildID);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.SOUNDBOARD_SOUND(guildID, soundID),
        }).then(data => guild?.soundboardSounds.update(data) ?? new Soundboard_1.default(data, this._manager.client));
    }
    /**
     * Get a guild's soundboard sounds.
     * @param guildID The ID of the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#soundboardSounds | Guild#soundboardSounds}
     */
    async getSoundboardSounds(guildID) {
        const guild = this._manager.client.guilds.get(guildID);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.SOUNDBOARD_SOUNDS(guildID),
        }).then(data => data.items.map(d => guild?.soundboardSounds.update(d) ?? new Soundboard_1.default(d, this._manager.client)));
    }
    /**
     * Get a sticker. Response will include a user if the client has the `MANAGE_EMOJIS_AND_STICKERS` permissions.
     * @param guildID The ID of the guild.
     * @param stickerID The ID of the sticker to get.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#stickers | Guild#stickers}
     */
    async getSticker(guildID, stickerID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_STICKER(guildID, stickerID),
        }).then(data => this._manager.client.guilds.get(guildID)?.stickers.update(data) ?? this._manager.client.util.convertSticker(data));
    }
    /**
     * Get a guild's stickers. Stickers will include a user if the client has the `MANAGE_EMOJIS_AND_STICKERS` permissions.
     * @param guildID The ID of the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#stickers | Guild#stickers} (will be completely cleared and refilled)
     */
    async getStickers(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_STICKERS(guildID),
        }).then((data) => {
            const guild = this._manager.client.guilds.get(guildID);
            guild?.stickers.clear();
            return data.map(sticker => guild?.stickers.update(sticker) ?? this._manager.client.util.convertSticker(sticker));
        });
    }
    /**
     * Get a guild template.
     * @param code The code of the template to get.
     * @caching This method **does not** cache its result.
     */
    async getTemplate(code) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_TEMPLATE_CODE(code),
        }).then(data => new GuildTemplate_1.default(data, this._manager.client));
    }
    /**
     * Get a guild's templates.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    async getTemplates(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_TEMPLATES(guildID),
        }).then(data => data.map(d => new GuildTemplate_1.default(d, this._manager.client)));
    }
    /**
     * Get the vanity url of a guild.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    async getVanityURL(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_VANITY_URL(guildID),
        });
    }
    /**
     * Get the list of usable voice regions for a guild. This will return VIP servers when the guild is VIP-enabled.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    async getVoiceRegions(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_VOICE_REGIONS(guildID),
        });
    }
    /**
     * Get the voice state of a member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member. Use `@me` for the bot user.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#voiceStates | Guild#voiceStates}
     */
    async getVoiceState(guildID, memberID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_VOICE_STATE(guildID, memberID),
        }).then(data => this._manager.client.guilds.get(guildID)?.voiceStates.update(data) ?? new VoiceState_1.default(data, this._manager.client));
    }
    /**
     * Get the welcome screen for a guild.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    async getWelcomeScreen(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_WELCOME_SCREEN(guildID),
        }).then(data => ({
            description: data.description,
            welcomeChannels: data.welcome_channels.map(channel => ({
                channelID: channel.channel_id,
                description: channel.description,
                emojiID: channel.emoji_id,
                emojiName: channel.emoji_name,
            })),
        }));
    }
    /**
     * Get the widget of a guild.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    async getWidget(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_WIDGET(guildID),
        }).then(data => ({
            channels: data.channels,
            id: data.id,
            instantInvite: data.instant_invite,
            members: data.members.map(m => ({
                activity: m.activity,
                avatar: m.avatar,
                avatarURL: m.avatar_url,
                discriminator: m.discriminator,
                id: m.id,
                status: m.status,
                tag: m.username,
                username: m.username,
            })),
            name: data.name,
            presenceCount: data.presence_count,
        }));
    }
    /**
     * Get the widget image of a guild.
     * @param guildID The ID of the guild.
     * @param style The style of the image.
     * @caching This method **does not** cache its result.
     */
    async getWidgetImage(guildID, style) {
        const query = new QueryBuilder_1.default();
        query.setIfPresent("style", style);
        return this._manager.request({
            method: "GET",
            path: Routes.GUILD_WIDGET_IMAGE(guildID),
            query,
        });
    }
    /**
     * Get the raw JSON widget of a guild.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    async getWidgetJSON(guildID) {
        return this._manager.request({
            method: "GET",
            path: Routes.GUILD_WIDGET_JSON(guildID),
        });
    }
    /**
     * Get a guild's widget settings.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    async getWidgetSettings(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_WIDGET(guildID),
        }).then(data => ({
            channelID: data.channel_id,
            enabled: data.enabled,
        }));
    }
    /**
     * Search a guild's members.
     * @param guildID The ID of the guild.
     * @param options The options to search with.
     * @param retryOnIndexNotAvailable If the search should be retried if Discord replies with an index unavailable response. This will retry at most one time, waiting for `retry_after` or 15-45 seconds.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#members | Guild#members}
     */
    async memberSearch(guildID, options, retryOnIndexNotAvailable = true) {
        /* eslint-disable @typescript-eslint/explicit-function-return-type */
        const formatRange = (data) => ({
            range: data.range === undefined ? undefined : {
                gte: data.range.gte,
                lte: data.range.lte,
            },
        });
        const formatOrQuery = (data) => ({
            or_query: data.orQuery,
        });
        const formatOrQueryRange = (data) => ({
            or_query: data.orQuery,
            range: data.range === undefined ? undefined : {
                gte: data.range.gte,
                lte: data.range.lte,
            },
        });
        const formatAndOrQuery = (data) => ({
            and_query: data.andQuery,
            or_query: data.orQuery,
        });
        const formatSearchFilter = (data) => ({
            did_rejoin: data.didRejoin,
            guild_joined_at: data.guildJoinedAt === undefined ? undefined : formatRange(data.guildJoinedAt),
            is_pending: data.isPending,
            join_source_type: data.joinSourceType === undefined ? undefined : formatOrQuery(data.joinSourceType),
            role_ids: data.roleIDs === undefined ? undefined : formatAndOrQuery(data.roleIDs),
            safety_signals: data.safetySignals === undefined ? undefined : {
                automod_quarantined_username: data.safetySignals.automodQuarantinedUsername,
                communication_disabled_until: data.safetySignals.communicationDisabledUntil === undefined ? undefined : formatRange(data.safetySignals.communicationDisabledUntil),
                unusual_account_activity: data.safetySignals.unusualAccountActivity,
                unusual_dm_activity_until: data.safetySignals.unusualDmActivityUntil === undefined ? undefined : formatRange(data.safetySignals.unusualDmActivityUntil),
            },
            source_invite_code: data.sourceInviteCode === undefined ? undefined : formatOrQuery(data.sourceInviteCode),
            user_id: data.userID === undefined ? undefined : formatOrQueryRange(data.userID),
            usernames: data.usernames === undefined ? undefined : formatOrQuery(data.usernames),
        });
        const formatPaginationFilter = (data) => ({
            guild_joined_at: data.guildJoinedAt,
            user_id: data.userID,
        });
        /* eslint-enable @typescript-eslint/explicit-function-return-type */
        return this._manager.authRequest({
            method: "POST",
            path: Routes.GUILD_MEMBERS_SEARCH(guildID),
            json: {
                after: options?.after === undefined ? undefined : formatPaginationFilter(options.after),
                and_query: options?.andQuery === undefined ? undefined : formatSearchFilter(options.andQuery),
                before: options?.before === undefined ? undefined : formatPaginationFilter(options.before),
                limit: options?.limit,
                or_query: options?.orQuery === undefined ? undefined : formatSearchFilter(options.orQuery),
                sort: options?.sort,
            },
        }).then(async (data) => {
            if ("retry_after" in data) {
                if (!retryOnIndexNotAvailable) {
                    throw new Error(`Member search for guild ${guildID} failed due to the index not being available.`);
                }
                let retryAfter = data.retry_after;
                if (retryAfter === 0) {
                    retryAfter = Math.floor(Math.random() * 30) + 15;
                }
                this._manager.client.emit("debug", `Retrying member search for ${guildID} in ${retryAfter} seconds...`);
                await (0, promises_1.setTimeout)(retryAfter * 1000);
                return this.memberSearch(guildID, options, false);
            }
            return {
                guildID: data.guild_id,
                members: data.members.map(m => ({
                    integrationType: m.integration_type,
                    inviterID: m.inviter_id,
                    joinSourceType: m.join_source_type,
                    member: this._manager.client.util.updateMember(guildID, m.member.user.id, m.member),
                    sourceInviteCode: m.source_invite_code,
                })),
                pageResultCount: data.page_result_count,
                totalResultCount: data.total_result_count,
            };
        });
    }
    /**
     * Remove a ban.
     * @param guildID The ID of the guild.
     * @param userID The ID of the user to remove the ban from.
     * @param reason The reason for removing the ban.
     * @caching This method **does not** cache its result.
     */
    async removeBan(guildID, userID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.GUILD_BAN(guildID, userID),
            reason,
        });
    }
    /**
     * Remove a member from a guild.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the user to remove.
     * @param reason The reason for the removal.
     * @caching This method **does not** cache its result.
     */
    async removeMember(guildID, memberID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.GUILD_MEMBER(guildID, memberID),
            reason,
        });
    }
    /**
     * Remove a role from a member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to remove.
     * @param reason The reason for removing the role.
     * @caching This method **does not** cache its result.
     */
    async removeMemberRole(guildID, memberID, roleID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.GUILD_MEMBER_ROLE(guildID, memberID, roleID),
            reason,
        });
    }
    /**
     * Search the username & nicknames of members in a guild. See {@link REST/Guilds#memberSearch | memberSearch} for a more detailed search.
     * @param guildID The ID of the guild.
     * @param options The options to search with.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#members | Guild#members}
     */
    async searchMembers(guildID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.set("query", options.query);
        query.setIfPresent("limit", options.limit);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_SEARCH_MEMBERS(guildID),
            query,
        }).then(data => data.map(d => this._manager.client.util.updateMember(guildID, d.user.id, d)));
    }
    /**
     * Search messages in a guild.
     * @param guildID The ID of the guild.
     * @param options The options to search with.
     * @param retryOnIndexNotAvailable If the search should be retried if Discord replies with an index unavailable response. This will retry at most one time, waiting for `retry_after` or 15-45 seconds.
     * @caching This method **may** cache its result. The messages, channels, and threads will not be cached if the guild is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link Guild#channels | Guild#channels}<br>{@link Guild#threads | Guild#threads}
     */
    async searchMessages(guildID, options, retryOnIndexNotAvailable = true) {
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
        query.setIfPresent("content", options?.content);
        query.setIfPresent("offset", options?.offset);
        query.setIfPresent("min_id", options?.minID);
        query.setIfPresent("max_id", options?.maxID);
        query.setIfPresent("pinned", options?.pinned);
        query.setIfPresent("command_id", options?.commandID);
        query.setIfPresent("command_name", options?.commandName);
        query.setIfPresent("include_nsfw", options?.includeNSFW);
        query.setIfPresent("sort_by", options?.sortBy);
        query.setIfPresent("sort_order", options?.sortOrder);
        append("author_id", options?.authorIDs);
        append("channel_id", options?.channelIDs);
        append("has", options?.has);
        append("mentions", options?.mentions);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_MESSAGES_SEARCH(guildID),
            query,
        }).then(async (data) => {
            if ("retry_after" in data) {
                if (!retryOnIndexNotAvailable) {
                    throw new Error(`Message search for guild ${guildID} failed due to the index not being available.`);
                }
                let retryAfter = data.retry_after;
                if (retryAfter === 0) {
                    retryAfter = Math.floor(Math.random() * 30) + 15;
                }
                this._manager.client.emit("debug", `Retrying message search for guild ${guildID} in ${retryAfter} seconds...`);
                await (0, promises_1.setTimeout)(retryAfter * 1000);
                return this.searchMessages(guildID, options, false);
            }
            const guild = this._manager.client.guilds.get(guildID);
            return {
                analyticsID: data.analytics_id,
                channels: data.channels?.map(c => guild?.channels.update(c) ?? Channel_1.default.from(c, this._manager.client)),
                doingDeepHistoricalIndex: data.doing_deep_historical_index,
                documentsIndexed: data.documents_indexed,
                members: data.members?.map(m => ({
                    flags: m.flags,
                    id: m.id,
                    joinTimestamp: new Date(m.join_timestamp),
                    member: m.member && guild?.members.update(m.member, guildID),
                    userID: m.user_id,
                })),
                messages: data.messages.map(messages => messages.map(message => this._manager.client.util.updateMessage(message))),
                threads: data.threads?.map(thread => this._manager.client.util.updateThread(thread)),
                totalResults: data.total_results,
            };
        });
    }
    /**
     * Sync a guild template.
     * @param guildID The ID of the guild.
     * @param code The code of the template to sync.
     * @caching This method **does not** cache its result.
     */
    async syncTemplate(guildID, code) {
        return this._manager.authRequest({
            method: "PUT",
            path: Routes.GUILD_TEMPLATE(guildID, code),
        }).then(data => new GuildTemplate_1.default(data, this._manager.client));
    }
}
exports.default = Guilds;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpbGRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3JvdXRlcy9HdWlsZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMEJBQTBCO0FBQzFCLG1EQUFrRDtBQUVsRCxrR0FBa0U7QUFDbEUsd0ZBQXdEO0FBQ3hELGtHQUFrRTtBQUNsRSw0RUFBNEM7QUFDNUMsd0VBQXdDO0FBQ3hDLDhGQUE4RDtBQUM5RCxzRkFBc0Q7QUFDdEQsb0dBQW9FO0FBQ3BFLHdGQUF3RDtBQUN4RCxvRkFBb0Q7QUFDcEQsMEVBQXVFO0FBQ3ZFLHNFQUFzQztBQUN0QyxrRkFBa0Q7QUFDbEQsa0ZBQWtEO0FBQ2xELDRFQUE0QztBQUM1QyxnRkFBZ0Q7QUFDaEQsK0RBQXlDO0FBT3pDLHFJQUFxSTtBQUNySSxNQUFxQixNQUFNO0lBQ2YsUUFBUSxDQUFjO0lBQzlCLFlBQVksT0FBb0I7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxLQUFLLENBQUMsaUJBQWlCLENBQUMsT0FBZSxFQUFFLFNBQWlCLEVBQUUsT0FBbUQ7UUFDM0csT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBbUM7WUFDL0QsTUFBTSxFQUFFLE9BQU87WUFDZixJQUFJLEVBQUUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7WUFDbkQsSUFBSSxFQUFFO2dCQUNGLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtnQkFDdEIsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLGVBQWU7YUFDNUM7U0FDSixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFN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