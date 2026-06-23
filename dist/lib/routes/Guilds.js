"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ApplicationCommand_1 = tslib_1.__importDefault(require("../structures/ApplicationCommand"));
const AuditLogEntry_1 = tslib_1.__importDefault(require("../structures/AuditLogEntry"));
const AutoModerationRule_1 = tslib_1.__importDefault(require("../structures/AutoModerationRule"));
const Guild_1 = tslib_1.__importDefault(require("../structures/Guild"));
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
const promises_1 = require("node:timers/promises");
/** Various methods for interacting with guilds. Located at {@link Client#rest | Client#rest}{@link RESTManager#guilds | .guilds}. */
class Guilds {
    _manager;
    constructor(manager) {
        this._manager = manager;
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
                roles: options.roles
            }
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
            reason
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
                include_roles: options?.includeRoles
            },
            reason: options?.reason
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
                user_ids: options.userIDs
            },
            reason: options.reason
        }).then(data => ({
            bannedUsers: data.banned_users,
            failedUsers: data.failed_users
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
                        duration_seconds: a.metadata.durationSeconds
                    },
                    type: a.type
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
                    regex_patterns: options.triggerMetadata.regexPatterns
                } : undefined,
                trigger_type: options.triggerType
            },
            reason: options.reason
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
            reason: options?.reason
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
                    name: tag.name
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
                video_quality_mode: options.videoQualityMode
            },
            reason: options.reason
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
                roles: options.roles
            },
            reason: options.reason
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
                    tertiary_color: options.colors?.tertiaryColor
                } : undefined,
                hoist: options?.hoist,
                icon,
                mentionable: options?.mentionable,
                name: options?.name,
                permissions: options?.permissions,
                unicode_emoji: options?.unicodeEmoji
            },
            reason: options?.reason
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
                scheduled_start_time: options.scheduledStartTime
            },
            reason: options.reason
        }).then(data => this._manager.client.guilds.get(guildID)?.scheduledEvents.update(data) ?? new GuildScheduledEvent_1.default(data, this._manager.client));
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
                volume: options.volume
            },
            reason: options.reason
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
            reason: options.reason
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
                name: options.name
            }
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
            reason
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
            reason
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
            reason
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
            reason
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
            reason
        });
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
            reason
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
            reason
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
            path: Routes.GUILD_TEMPLATE(guildID, code)
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
                verification_level: options.verificationLevel
            },
            reason: options.reason
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
                        duration_seconds: a.metadata.durationSeconds
                    },
                    type: a.type
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
                    regex_patterns: options.triggerMetadata.regexPatterns
                } : undefined
            },
            reason: options.reason
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
                position: o.position ?? null
            }))
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
            reason: options.reason
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
                request_to_speak_timestamp: options.requestToSpeakTimestamp
            }
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
                roles: options.roles
            },
            reason: options.reason
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
                invites_disabled_until: options.invitesDisabledUntil
            },
            reason: options.reason
        }).then(data => ({
            dmsDisabledUntil: data.dms_disabled_until,
            invitesDisabledUntil: data.invites_disabled_until
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
                roles: options.roles
            },
            reason: options.reason
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
            method: "PATCH",
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
                        title: o.title
                    })),
                    required: p.required,
                    single_select: p.singleSelect,
                    title: p.title
                })),
                mode: options.mode
            },
            reason: options.reason
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
                    title: o.title
                })),
                required: p.required,
                singleSelect: p.single_select,
                title: p.title
            }))
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
                colors: options?.colors || options?.color ? {
                    primary_color: options.colors?.primaryColor ?? options.color,
                    secondary_color: options.colors?.secondaryColor,
                    tertiary_color: options.colors?.tertiaryColor
                } : undefined,
                hoist: options.hoist,
                icon,
                mentionable: options.mentionable,
                name: options.name,
                permissions: options.permissions,
                unicode_emoji: options.unicodeEmoji
            },
            reason: options.reason
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
                position: o.position
            })),
            reason
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
                scheduled_start_time: options.scheduledStartTime
            },
            reason: options.reason
        }).then(data => this._manager.client.guilds.get(guildID)?.scheduledEvents.update(data) ?? new GuildScheduledEvent_1.default(data, this._manager.client));
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
                volume: options.volume
            },
            reason: options.reason
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
                tags: options.tags
            },
            reason: options.reason
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
            method: "POST",
            path: Routes.GUILD_TEMPLATE(guildID, code),
            json: {
                code,
                description: options.description,
                name: options.name
            }
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
                suppress: options.suppress
            }
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
                    emoji_name: ch.emojiName
                }))
            },
            reason: options.reason
        }).then(data => ({
            description: data.description,
            welcomeChannels: data.welcome_channels.map(channel => ({
                channelID: channel.channel_id,
                description: channel.description,
                emojiID: channel.emoji_id,
                emojiName: channel.emoji_name
            }))
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
            method: "POST",
            path: Routes.GUILD_WIDGET(guildID),
            json: {
                channel_id: options.channelID,
                enabled: options.enabled
            }
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
                username: m.username
            })),
            name: data.name,
            presenceCount: data.presence_count
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
            query
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
            path: Routes.GUILD_ACTIVE_THREADS(guildID)
        }).then(data => ({
            members: data.members.map(member => ({
                flags: member.flags,
                id: member.id,
                joinTimestamp: new Date(member.join_timestamp),
                userID: member.user_id
            })),
            threads: data.threads.map(rawThread => this._manager.client.util.updateThread(rawThread))
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
            query
        }).then(data => ({
            applicationCommands: data.application_commands.map(command => new ApplicationCommand_1.default(command, this._manager.client)),
            autoModerationRules: data.auto_moderation_rules.map(rule => guild?.autoModerationRules.update(rule) ?? new AutoModerationRule_1.default(rule, this._manager.client)),
            entries: data.audit_log_entries.map(entry => new AuditLogEntry_1.default(entry, this._manager.client)),
            guildScheduledEvents: data.guild_scheduled_events.map(event => guild?.scheduledEvents.update(event) ?? new GuildScheduledEvent_1.default(event, this._manager.client)),
            integrations: data.integrations.map(integration => guild?.integrations.update(integration, guildID) ?? new Integration_1.default(integration, this._manager.client, guildID)),
            threads: data.threads.map(rawThread => this._manager.client.util.updateThread(rawThread)),
            users: data.users.map(user => this._manager.client.users.update(user)),
            webhooks: data.webhooks.map(webhook => new Webhook_1.default(webhook, this._manager.client))
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
            path: Routes.GUILD_AUTOMOD_RULE(guildID, ruleID)
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
            path: Routes.GUILD_AUTOMOD_RULES(guildID)
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
            path: Routes.GUILD_BAN(guildID, userID)
        }).then(data => ({
            reason: data.reason,
            user: this._manager.client.users.update(data.user)
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
                query
            }).then(data => data.map(ban => ({
                reason: ban.reason,
                user: this._manager.client.users.update(ban.user)
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
                [chosenOption]: optionValue
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
            path: Routes.GUILD_CHANNELS(guildID)
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
            path: Routes.GUILD_EMOJI(guildID, emojiID)
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
            path: Routes.GUILD_EMOJIS(guildID)
        }).then(data => {
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
            path: Routes.GUILD_INTEGRATIONS(guildID)
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
            path: Routes.GUILD_INVITES(guildID)
        }).then(data => data.map(invite => guild?.invites.update(invite) ?? Invite_1.default.withMetadata(invite, this._manager.client)));
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
            path: Routes.GUILD_MEMBER(guildID, memberID)
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
            query
        }).then(data => data.map(d => this._manager.client.util.updateMember(guildID, d.user.id, d)));
    }
    /**
     * Get a guild's onboarding info.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    async getOnboarding(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_ONBOARDING(guildID)
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
                    title: o.title
                })),
                required: p.required,
                singleSelect: p.single_select,
                title: p.title
            }))
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
            path: Routes.GUILD_PREVIEW(guildID)
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
            query
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
            path: Routes.GUILD_ROLE(guildID, roleID)
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
            path: Routes.GUILD_ROLE_MEMBER_COUNTS(guildID)
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
            path: Routes.GUILD_ROLES(guildID)
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
            query
        }).then(data => guild?.scheduledEvents.update(data) ?? new GuildScheduledEvent_1.default(data, this._manager.client));
    }
    /**
     * Get the users subscribed to a scheduled event.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event.
     * @param options The options for getting the users.
     * @caching This method **does** cache part its result. Members will not be cached if the guild is not cached.
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
            path: Routes.GUILD_SCHEDULED_EVENT_USERS(guildID, eventID)
        }).then(data => data.map(d => ({
            guildScheduledEvent: guild?.scheduledEvents.get(d.guild_scheduled_event_id),
            guildScheduledEventID: d.guild_scheduled_event_id,
            user: this._manager.client.users.update(d.user),
            member: d.member ? this._manager.client.util.updateMember(guildID, d.member.user.id, d.member) : undefined
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
            query
        }).then(data => data.map(d => guild?.scheduledEvents.update(d) ?? new GuildScheduledEvent_1.default(d, this._manager.client)));
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
            path: Routes.SOUNDBOARD_SOUND(guildID, soundID)
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
            path: Routes.SOUNDBOARD_SOUNDS(guildID)
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
            path: Routes.GUILD_STICKER(guildID, stickerID)
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
            path: Routes.GUILD_STICKERS(guildID)
        }).then(data => {
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
            path: Routes.GUILD_TEMPLATE_CODE(code)
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
            path: Routes.GUILD_TEMPLATES(guildID)
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
            path: Routes.GUILD_VANITY_URL(guildID)
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
            path: Routes.GUILD_VOICE_REGIONS(guildID)
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
            path: Routes.GUILD_VOICE_STATE(guildID, memberID)
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
            path: Routes.GUILD_WELCOME_SCREEN(guildID)
        }).then(data => ({
            description: data.description,
            welcomeChannels: data.welcome_channels.map(channel => ({
                channelID: channel.channel_id,
                description: channel.description,
                emojiID: channel.emoji_id,
                emojiName: channel.emoji_name
            }))
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
            path: Routes.GUILD_WIDGET(guildID)
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
                username: m.username
            })),
            name: data.name,
            presenceCount: data.presence_count
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
            query
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
            path: Routes.GUILD_WIDGET_JSON(guildID)
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
            path: Routes.GUILD_WIDGET(guildID)
        }).then(data => ({
            channelID: data.channel_id,
            enabled: data.enabled
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
        /* eslint-disable @typescript-eslint/explicit-function-return-type, unicorn/consistent-function-scoping */
        const formatRange = (data) => ({
            range: data.range === undefined ? undefined : {
                gte: data.range.gte,
                lte: data.range.lte
            }
        });
        const formatOrQuery = (data) => ({
            or_query: data.orQuery
        });
        const formatOrQueryRange = (data) => ({
            or_query: data.orQuery,
            range: data.range === undefined ? undefined : {
                gte: data.range.gte,
                lte: data.range.lte
            }
        });
        const formatAndOrQuery = (data) => ({
            and_query: data.andQuery,
            or_query: data.orQuery
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
                unusual_dm_activity_until: data.safetySignals.unusualDmActivityUntil === undefined ? undefined : formatRange(data.safetySignals.unusualDmActivityUntil)
            },
            source_invite_code: data.sourceInviteCode === undefined ? undefined : formatOrQuery(data.sourceInviteCode),
            user_id: data.userID === undefined ? undefined : formatOrQueryRange(data.userID),
            usernames: data.usernames === undefined ? undefined : formatOrQuery(data.usernames)
        });
        const formatPaginationFilter = (data) => ({
            guild_joined_at: data.guildJoinedAt,
            user_id: data.userID
        });
        /* eslint-enable @typescript-eslint/explicit-function-return-type, unicorn/consistent-function-scoping */
        return this._manager.authRequest({
            method: "POST",
            path: Routes.GUILD_MEMBERS_SEARCH(guildID),
            json: {
                after: options?.after === undefined ? undefined : formatPaginationFilter(options.after),
                and_query: options?.andQuery === undefined ? undefined : formatSearchFilter(options.andQuery),
                before: options?.before === undefined ? undefined : formatPaginationFilter(options.before),
                limit: options?.limit,
                or_query: options?.orQuery === undefined ? undefined : formatSearchFilter(options.orQuery),
                sort: options?.sort
            }
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
                    sourceInviteCode: m.source_invite_code
                })),
                pageResultCount: data.page_result_count,
                totalResultCount: data.total_result_count
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
            reason
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
            reason
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
            reason
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
            query
        }).then(data => data.map(d => this._manager.client.util.updateMember(guildID, d.user.id, d)));
    }
    /**
     * Sync a guild template.
     * @param guildID The ID of the guild.
     * @param code The code of the template to sync.
     * @caching This method **does not** cache its result.
     */
    async syncTemplate(guildID, code) {
        return this._manager.authRequest({
            method: "POST",
            path: Routes.GUILD_TEMPLATE(guildID, code)
        }).then(data => new GuildTemplate_1.default(data, this._manager.client));
    }
}
exports.default = Guilds;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpbGRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3JvdXRlcy9HdWlsZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsa0dBQWtFO0FBQ2xFLHdGQUF3RDtBQUN4RCxrR0FBa0U7QUFDbEUsd0VBQXdDO0FBQ3hDLHNGQUFzRDtBQUN0RCxvR0FBb0U7QUFDcEUsd0ZBQXdEO0FBQ3hELG9GQUFvRDtBQUNwRCwwRUFBdUU7QUFFdkUsc0VBQXNDO0FBQ3RDLGtGQUFrRDtBQUNsRCxrRkFBa0Q7QUFDbEQsNEVBQTRDO0FBQzVDLGdGQUFnRDtBQUNoRCwrREFBeUM7QUFDekMsbURBQWtEO0FBRWxELHFJQUFxSTtBQUNySSxNQUFxQixNQUFNO0lBQ2YsUUFBUSxDQUFjO0lBQzlCLFlBQVksT0FBb0I7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBZSxFQUFFLE1BQWMsRUFBRSxPQUFzQztRQUNuRixPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFpQztZQUM3RCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7WUFDNUMsSUFBSSxFQUFJO2dCQUNKLFlBQVksRUFBRSxPQUFPLENBQUMsV0FBVztnQkFDakMsSUFBSSxFQUFVLE9BQU8sQ0FBQyxJQUFJO2dCQUMxQixJQUFJLEVBQVUsT0FBTyxDQUFDLElBQUk7Z0JBQzFCLElBQUksRUFBVSxPQUFPLENBQUMsSUFBSTtnQkFDMUIsS0FBSyxFQUFTLE9BQU8sQ0FBQyxLQUFLO2FBQzlCO1NBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0csQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQWUsRUFBRSxRQUFnQixFQUFFLE1BQWMsRUFBRSxNQUFlO1FBQ2xGLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQU87WUFDbEMsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO1lBQzNELE1BQU07U0FDVCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQWUsRUFBRSxPQUF3QztRQUN0RSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUE2QjtZQUN6RCxNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztZQUNuQyxJQUFJLEVBQUk7Z0JBQ0osSUFBSSxFQUFpQixPQUFPLEVBQUUsSUFBSTtnQkFDbEMsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLGlCQUFpQjtnQkFDL0MsYUFBYSxFQUFRLE9BQU8sRUFBRSxZQUFZO2FBQzdDO1lBQ0QsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNO1NBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZSxFQUFFLE9BQW9DO1FBQy9ELE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQWtDO1lBQzlELE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO1lBQ3RDLElBQUksRUFBSTtnQkFDSixzQkFBc0IsRUFBRSxPQUFPLENBQUMsb0JBQW9CO2dCQUNwRCxRQUFRLEVBQWdCLE9BQU8sQ0FBQyxPQUFPO2FBQzFDO1lBQ0QsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1NBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2IsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQzlCLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWTtTQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsd0JBQXdCLENBQUMsT0FBZSxFQUFFLE9BQTZEO1FBQ3pHLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQTZDO1lBQ3pFLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFJLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7WUFDM0MsSUFBSSxFQUFJO2dCQUNKLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQy9CLFFBQVEsRUFBRTt3QkFDTixVQUFVLEVBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTO3dCQUN0QyxjQUFjLEVBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhO3dCQUMxQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWU7cUJBQy9DO29CQUNELElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtpQkFDZixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxFQUFXLE9BQU8sQ0FBQyxPQUFPO2dCQUNqQyxVQUFVLEVBQVEsT0FBTyxDQUFDLFNBQVM7Z0JBQ25DLGVBQWUsRUFBRyxPQUFPLENBQUMsY0FBYztnQkFDeEMsWUFBWSxFQUFNLE9BQU8sQ0FBQyxXQUFXO2dCQUNyQyxJQUFJLEVBQWMsT0FBTyxDQUFDLElBQUk7Z0JBQzlCLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxVQUFVLEVBQXVCLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUztvQkFDbEUsY0FBYyxFQUFtQixPQUFPLENBQUMsZUFBZSxDQUFDLGFBQWE7b0JBQ3RFLCtCQUErQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsNEJBQTRCO29CQUNyRixtQkFBbUIsRUFBYyxPQUFPLENBQUMsZUFBZSxDQUFDLGlCQUFpQjtvQkFDMUUsT0FBTyxFQUEwQixPQUFPLENBQUMsZUFBZSxDQUFDLE9BQU87b0JBQ2hFLGNBQWMsRUFBbUIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxhQUFhO2lCQUN6RSxDQUFDLENBQUMsQ0FBQyxTQUFTO2dCQUNiLFlBQVksRUFBRSxPQUFPLENBQUMsV0FBVzthQUNwQztZQUNELE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtTQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSw0QkFBa0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3RKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQWUsRUFBRSxNQUFjLEVBQUUsT0FBdUM7UUFDcEYsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsSUFBSSxvQkFBb0IsR0FBdUIsT0FBTyxFQUFFLG9CQUFvQixDQUFDO1FBQzdFLElBQUksT0FBTyxFQUFFLGlCQUFpQixLQUFLLFNBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLHNCQUFzQixDQUFDLEVBQUUsQ0FBQztZQUM5RixvQkFBb0IsR0FBRyxPQUFPLENBQUMsaUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzlELENBQUM7UUFDRCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFPO1lBQ2xDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztZQUN6QyxJQUFJLEVBQUksRUFBRSxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBRTtZQUN4RCxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU07U0FDMUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxhQUFhLENBQXVELE9BQWUsRUFBRSxJQUFPLEVBQUUsT0FBd0Q7UUFDeEosT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBaUM7WUFDN0QsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7WUFDdEMsSUFBSSxFQUFJO2dCQUNKLGNBQWMsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3RFLFFBQVEsRUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ3pCLFVBQVUsRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUk7b0JBQzNCLFNBQVMsRUFBRyxHQUFHLENBQUMsU0FBUztvQkFDekIsSUFBSSxFQUFRLEdBQUcsQ0FBQyxJQUFJO2lCQUN2QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWE7Z0JBQzNCLE9BQU8sRUFBd0IsT0FBTyxDQUFDLE9BQU87Z0JBQzlDLDZCQUE2QixFQUFFLE9BQU8sQ0FBQywwQkFBMEI7Z0JBQ2pFLG9CQUFvQixFQUFXLE9BQU8sQ0FBQyxrQkFBa0I7Z0JBQ3pELHNCQUFzQixFQUFTLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CO2dCQUN6TCxrQkFBa0IsRUFBYSxPQUFPLENBQUMsZ0JBQWdCO2dCQUN2RCxJQUFJLEVBQTJCLE9BQU8sQ0FBQyxJQUFJO2dCQUMzQyxJQUFJLEVBQTJCLE9BQU8sQ0FBQyxJQUFJO2dCQUMzQyxTQUFTLEVBQXNCLE9BQU8sQ0FBQyxRQUFRO2dCQUMvQyxxQkFBcUIsRUFBVSxPQUFPLENBQUMsb0JBQW9CO2dCQUMzRCxRQUFRLEVBQXVCLE9BQU8sQ0FBQyxRQUFRO2dCQUMvQyxtQkFBbUIsRUFBWSxPQUFPLENBQUMsZ0JBQWdCO2dCQUN2RCxVQUFVLEVBQXFCLE9BQU8sQ0FBQyxTQUFTO2dCQUNoRCxLQUFLLEVBQTBCLE9BQU8sQ0FBQyxLQUFLO2dCQUM1QyxJQUFJO2dCQUNKLFVBQVUsRUFBcUIsT0FBTyxDQUFDLFNBQVM7Z0JBQ2hELGtCQUFrQixFQUFhLE9BQU8sQ0FBQyxnQkFBZ0I7YUFDMUQ7WUFDRCxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07U0FDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQVUsQ0FBQztJQUM1RSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFlLEVBQUUsT0FBNkM7UUFDNUUsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsSUFBSSxLQUF5QixDQUFDO1FBQzlCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2hCLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUUsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQTZCO1lBQ3pELE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1lBQ3BDLElBQUksRUFBSTtnQkFDSixLQUFLO2dCQUNMLElBQUksRUFBRyxPQUFPLENBQUMsSUFBSTtnQkFDbkIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO2FBQ3ZCO1lBQ0QsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1NBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDeEksQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBZSxFQUFFLE9BQXdDO1FBQ3RFLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELElBQUksSUFBd0IsQ0FBQztRQUM3QixJQUFJLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUNoQixJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUF1QjtZQUNuRCxNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztZQUNuQyxJQUFJLEVBQUk7Z0JBQ0osTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLGFBQWEsRUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLFlBQVksSUFBSSxPQUFPLENBQUMsS0FBSztvQkFDOUQsZUFBZSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsY0FBYztvQkFDL0MsY0FBYyxFQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsYUFBYTtpQkFDakQsQ0FBQyxDQUFDLENBQUMsU0FBUztnQkFDYixLQUFLLEVBQVUsT0FBTyxFQUFFLEtBQUs7Z0JBQzdCLElBQUk7Z0JBQ0osV0FBVyxFQUFJLE9BQU8sRUFBRSxXQUFXO2dCQUNuQyxJQUFJLEVBQVcsT0FBTyxFQUFFLElBQUk7Z0JBQzVCLFdBQVcsRUFBSSxPQUFPLEVBQUUsV0FBVztnQkFDbkMsYUFBYSxFQUFFLE9BQU8sRUFBRSxZQUFZO2FBQ3ZDO1lBQ0QsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNO1NBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLElBQUksY0FBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzVJLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQUMsT0FBZSxFQUFFLE9BQTBEO1FBQ2xHLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELElBQUksS0FBeUIsQ0FBQztRQUM5QixJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNoQixLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUEwQztZQUN0RSxNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBSSxNQUFNLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDO1lBQzlDLElBQUksRUFBSTtnQkFDSixVQUFVLEVBQVksT0FBTyxDQUFDLFNBQVM7Z0JBQ3ZDLFdBQVcsRUFBVyxPQUFPLENBQUMsV0FBVztnQkFDekMsZUFBZSxFQUFPLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7Z0JBQ3hHLFdBQVcsRUFBVyxPQUFPLENBQUMsVUFBVTtnQkFDeEMsS0FBSztnQkFDTCxJQUFJLEVBQWtCLE9BQU8sQ0FBQyxJQUFJO2dCQUNsQyxhQUFhLEVBQVMsT0FBTyxDQUFDLFlBQVk7Z0JBQzFDLGtCQUFrQixFQUFJLE9BQU8sQ0FBQyxnQkFBZ0I7Z0JBQzlDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxrQkFBa0I7YUFDbkQ7WUFDRCxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07U0FDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLDZCQUFtQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbkosQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxPQUFlLEVBQUUsT0FBa0Q7UUFDM0YsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsSUFBSSxLQUF5QixDQUFDO1FBQzlCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2hCLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUUsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQStCO1lBQzNELE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7WUFDekMsSUFBSSxFQUFJO2dCQUNKLFFBQVEsRUFBSSxPQUFPLENBQUMsT0FBTztnQkFDM0IsVUFBVSxFQUFFLE9BQU8sQ0FBQyxTQUFTO2dCQUM3QixJQUFJLEVBQVEsT0FBTyxDQUFDLElBQUk7Z0JBQ3hCLEtBQUs7Z0JBQ0wsTUFBTSxFQUFNLE9BQU8sQ0FBQyxNQUFNO2FBQzdCO1lBQ0QsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1NBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLG9CQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMzSSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFlLEVBQUUsT0FBMEM7UUFDM0UsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hFLElBQUksSUFBd0IsQ0FBQztRQUM3QixRQUFRLEtBQUssRUFBRSxDQUFDO1lBQ1osaUNBQWlDO1lBQ2pDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLEdBQUcsV0FBVyxDQUFDO2dCQUFDLE1BQU07WUFDOUIsQ0FBQztZQUNELFNBQVM7WUFDVCxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxHQUFHLGtCQUFrQixDQUFDO2dCQUFDLE1BQU07WUFDckMsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUYsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBMEI7WUFDdEQsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7WUFDdEMsSUFBSTtZQUNKLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtTQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2SSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBZSxFQUFFLE9BQWtEO1FBQ3BGLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQXVDO1lBQ25FLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO1lBQ3ZDLElBQUksRUFBSTtnQkFDSixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7Z0JBQ2hDLElBQUksRUFBUyxPQUFPLENBQUMsSUFBSTthQUM1QjtTQUNKLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLHVCQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLHdCQUF3QixDQUFDLE9BQWUsRUFBRSxNQUFjLEVBQUUsTUFBZTtRQUMzRSxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFPO1lBQ2xDLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLElBQUksRUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztZQUNsRCxNQUFNO1NBQ1QsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBZSxFQUFFLE9BQWUsRUFBRSxNQUFlO1FBQy9ELE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQU87WUFDbEMsTUFBTSxFQUFFLFFBQVE7WUFDaEIsSUFBSSxFQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztZQUM1QyxNQUFNO1NBQ1QsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUFlLEVBQUUsYUFBcUIsRUFBRSxNQUFlO1FBQzNFLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQU87WUFDbEMsTUFBTSxFQUFFLFFBQVE7WUFDaEIsSUFBSSxFQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDO1lBQ3hELE1BQU07U0FDVCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFlLEVBQUUsTUFBYyxFQUFFLE1BQWU7UUFDN0QsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBTztZQUNsQyxNQUFNLEVBQUUsUUFBUTtZQUNoQixJQUFJLEVBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1lBQzFDLE1BQU07U0FDVCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLG9CQUFvQixDQUFDLE9BQWUsRUFBRSxPQUFlLEVBQUUsTUFBZTtRQUN4RSxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFPO1lBQ2xDLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLElBQUksRUFBSSxNQUFNLENBQUMscUJBQXFCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztZQUN0RCxNQUFNO1NBQ1QsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxPQUFlLEVBQUUsT0FBZSxFQUFFLE1BQWU7UUFDekUsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBTztZQUNsQyxNQUFNLEVBQUUsUUFBUTtZQUNoQixJQUFJLEVBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7WUFDakQsTUFBTTtTQUNULENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQWUsRUFBRSxTQUFpQixFQUFFLE1BQWU7UUFDbkUsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBTztZQUNsQyxNQUFNLEVBQUUsUUFBUTtZQUNoQixJQUFJLEVBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1lBQ2hELE1BQU07U0FDVCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQWUsRUFBRSxJQUFZO1FBQzlDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQU87WUFDbEMsTUFBTSxFQUFFLFFBQVE7WUFDaEIsSUFBSSxFQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQztTQUMvQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFlLEVBQUUsT0FBc0M7UUFDOUQsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsSUFBSSxNQUEwQixFQUFFLGVBQW1DLEVBQUUsSUFBd0IsRUFBRSxNQUEwQixDQUFDO1FBQzFILElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0UsQ0FBQztRQUNELElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzFCLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUMzRyxDQUFDO1FBQ0QsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNqQixNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQy9FLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUF3QjtZQUNwRCxNQUFNLEVBQUUsT0FBTztZQUNmLElBQUksRUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUM3QixJQUFJLEVBQUk7Z0JBQ0osY0FBYyxFQUFpQixPQUFPLENBQUMsWUFBWTtnQkFDbkQsV0FBVyxFQUFvQixPQUFPLENBQUMsVUFBVTtnQkFDakQsTUFBTTtnQkFDTiw2QkFBNkIsRUFBRSxPQUFPLENBQUMsMkJBQTJCO2dCQUNsRSxXQUFXLEVBQW9CLE9BQU8sQ0FBQyxXQUFXO2dCQUNsRCxnQkFBZ0IsRUFBZSxlQUFlO2dCQUM5Qyx1QkFBdUIsRUFBUSxPQUFPLENBQUMscUJBQXFCO2dCQUM1RCxRQUFRLEVBQXVCLE9BQU8sQ0FBQyxRQUFRO2dCQUMvQyxJQUFJO2dCQUNKLElBQUksRUFBMkIsT0FBTyxDQUFDLElBQUk7Z0JBQzNDLGdCQUFnQixFQUFlLE9BQU8sQ0FBQyxlQUFlO2dCQUN0RCw0QkFBNEIsRUFBRyxPQUFPLENBQUMseUJBQXlCO2dCQUNoRSx5QkFBeUIsRUFBTSxPQUFPLENBQUMsc0JBQXNCO2dCQUM3RCxNQUFNLEVBQXlCLE9BQU8sQ0FBQyxNQUFNO2dCQUM3QyxnQkFBZ0IsRUFBZSxPQUFPLENBQUMsY0FBYztnQkFDckQsd0JBQXdCLEVBQU8sT0FBTyxDQUFDLHFCQUFxQjtnQkFDNUQsTUFBTTtnQkFDTixvQkFBb0IsRUFBVyxPQUFPLENBQUMsa0JBQWtCO2dCQUN6RCxpQkFBaUIsRUFBYyxPQUFPLENBQUMsZUFBZTtnQkFDdEQsa0JBQWtCLEVBQWEsT0FBTyxDQUFDLGlCQUFpQjthQUMzRDtZQUNELE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtTQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksZUFBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzdKLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsS0FBSyxDQUFDLHNCQUFzQixDQUFDLE9BQWUsRUFBRSxNQUFjLEVBQUUsT0FBMkQ7UUFDckgsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBNkM7WUFDekUsTUFBTSxFQUFFLE9BQU87WUFDZixJQUFJLEVBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7WUFDbEQsSUFBSSxFQUFJO2dCQUNKLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2hDLFFBQVEsRUFBRTt3QkFDTixVQUFVLEVBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTO3dCQUN0QyxjQUFjLEVBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhO3dCQUMxQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWU7cUJBQy9DO29CQUNELElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtpQkFDZixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxFQUFXLE9BQU8sQ0FBQyxPQUFPO2dCQUNqQyxVQUFVLEVBQVEsT0FBTyxDQUFDLFNBQVM7Z0JBQ25DLGVBQWUsRUFBRyxPQUFPLENBQUMsY0FBYztnQkFDeEMsWUFBWSxFQUFNLE9BQU8sQ0FBQyxXQUFXO2dCQUNyQyxJQUFJLEVBQWMsT0FBTyxDQUFDLElBQUk7Z0JBQzlCLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxVQUFVLEVBQXVCLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUztvQkFDbEUsY0FBYyxFQUFtQixPQUFPLENBQUMsZUFBZSxDQUFDLGFBQWE7b0JBQ3RFLCtCQUErQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsNEJBQTRCO29CQUNyRixtQkFBbUIsRUFBYyxPQUFPLENBQUMsZUFBZSxDQUFDLGlCQUFpQjtvQkFDMUUsT0FBTyxFQUEwQixPQUFPLENBQUMsZUFBZSxDQUFDLE9BQU87b0JBQ2hFLGNBQWMsRUFBbUIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxhQUFhO2lCQUN6RSxDQUFDLENBQUMsQ0FBQyxTQUFTO2FBQ2hCO1lBQ0QsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1NBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLDRCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdkosQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLG9CQUFvQixDQUFDLE9BQWUsRUFBRSxPQUF3RDtRQUNoRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFPO1lBQ2xDLE1BQU0sRUFBRSxPQUFPO1lBQ2YsSUFBSSxFQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO1lBQ3RDLElBQUksRUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdEIsRUFBRSxFQUFRLENBQUMsQ0FBQyxFQUFFO2dCQUNkLCtDQUErQztnQkFDL0Msd0NBQXdDO2dCQUN4QyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJO2FBQy9CLENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsaUJBQWlCLENBQUMsT0FBZSxFQUFFLE9BQThDO1FBQ25GLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUU1QixJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQ1QsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFFRCxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQ1QsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUEwQjtZQUN0RCxNQUFNLEVBQUUsT0FBTztZQUNmLElBQUksRUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7WUFDM0MsSUFBSSxFQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNoRSxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07U0FDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLHlCQUF5QixDQUFDLE9BQWUsRUFBRSxPQUFzRDtRQUNuRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFPO1lBQ2xDLE1BQU0sRUFBRSxPQUFPO1lBQ2YsSUFBSSxFQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO1lBQ2hELElBQUksRUFBSTtnQkFDSixVQUFVLEVBQWtCLE9BQU8sQ0FBQyxTQUFTO2dCQUM3QyxRQUFRLEVBQW9CLE9BQU8sQ0FBQyxRQUFRO2dCQUM1QywwQkFBMEIsRUFBRSxPQUFPLENBQUMsdUJBQXVCO2FBQzlEO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBZSxFQUFFLE9BQWUsRUFBRSxPQUEyQztRQUN6RixPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUE2QjtZQUN6RCxNQUFNLEVBQUUsT0FBTztZQUNmLElBQUksRUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7WUFDNUMsSUFBSSxFQUFJO2dCQUNKLElBQUksRUFBRyxPQUFPLENBQUMsSUFBSTtnQkFDbkIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO2FBQ3ZCO1lBQ0QsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1NBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDeEksQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLG1CQUFtQixDQUFDLE9BQWUsRUFBRSxPQUFnRDtRQUN2RixPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFrQztZQUM5RCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDO1lBQzlDLElBQUksRUFBSTtnQkFDSixrQkFBa0IsRUFBTSxPQUFPLENBQUMsZ0JBQWdCO2dCQUNoRCxzQkFBc0IsRUFBRSxPQUFPLENBQUMsb0JBQW9CO2FBQ3ZEO1lBQ0QsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1NBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2IsZ0JBQWdCLEVBQU0sSUFBSSxDQUFDLGtCQUFrQjtZQUM3QyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCO1NBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQWUsRUFBRSxRQUFnQixFQUFFLE9BQXVDO1FBQ3ZGLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQTBCO1lBQ3RELE1BQU0sRUFBRSxPQUFPO1lBQ2YsSUFBSSxFQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztZQUM5QyxJQUFJLEVBQUk7Z0JBQ0osVUFBVSxFQUFvQixPQUFPLENBQUMsU0FBUztnQkFDL0MsNEJBQTRCLEVBQUUsT0FBTyxDQUFDLDBCQUEwQjtnQkFDaEUsSUFBSSxFQUEwQixPQUFPLENBQUMsSUFBSTtnQkFDMUMsS0FBSyxFQUF5QixPQUFPLENBQUMsS0FBSztnQkFDM0MsSUFBSSxFQUEwQixPQUFPLENBQUMsSUFBSTtnQkFDMUMsSUFBSSxFQUEwQixPQUFPLENBQUMsSUFBSTtnQkFDMUMsS0FBSyxFQUF5QixPQUFPLENBQUMsS0FBSzthQUM5QztZQUNELE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtTQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFlLEVBQUUsT0FBMkM7UUFDN0UsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBNkI7WUFDekQsTUFBTSxFQUFFLE9BQU87WUFDZixJQUFJLEVBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztZQUN4QyxJQUFJLEVBQUk7Z0JBQ0osT0FBTyxFQUFjLE9BQU8sQ0FBQyxPQUFPO2dCQUNwQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsaUJBQWlCO2dCQUM5QyxPQUFPLEVBQWMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM1QyxFQUFFLEVBQVksQ0FBQyxDQUFDLEVBQUU7b0JBQ2xCLFlBQVksRUFBRSxDQUFDLENBQUMsWUFBWTtvQkFDNUIsT0FBTyxFQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDOUIsV0FBVyxFQUFFLENBQUMsQ0FBQyxVQUFVO3dCQUN6QixXQUFXLEVBQUUsQ0FBQyxDQUFDLFdBQVc7d0JBQzFCLEtBQUssRUFBUSxDQUFDLENBQUMsS0FBSzt3QkFDcEIsRUFBRSxFQUFXLENBQUMsQ0FBQyxFQUFFO3dCQUNqQixRQUFRLEVBQUssQ0FBQyxDQUFDLE9BQU87d0JBQ3RCLEtBQUssRUFBUSxDQUFDLENBQUMsS0FBSztxQkFDdkIsQ0FBQyxDQUFDO29CQUNILFFBQVEsRUFBTyxDQUFDLENBQUMsUUFBUTtvQkFDekIsYUFBYSxFQUFFLENBQUMsQ0FBQyxZQUFZO29CQUM3QixLQUFLLEVBQVUsQ0FBQyxDQUFDLEtBQUs7aUJBQ3pCLENBQUMsQ0FBQztnQkFDSCxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7YUFDckI7WUFDRCxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07U0FDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDYixpQkFBaUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CO1lBQzNDLE9BQU8sRUFBWSxJQUFJLENBQUMsT0FBTztZQUMvQixPQUFPLEVBQVksSUFBSSxDQUFDLFFBQVE7WUFDaEMsSUFBSSxFQUFlLElBQUksQ0FBQyxJQUFJO1lBQzVCLE9BQU8sRUFBWSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RDLEVBQUUsRUFBWSxDQUFDLENBQUMsRUFBRTtnQkFDbEIsWUFBWSxFQUFFLENBQUMsQ0FBQyxhQUFhO2dCQUM3QixPQUFPLEVBQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM5QixVQUFVLEVBQUcsQ0FBQyxDQUFDLFdBQVc7b0JBQzFCLFdBQVcsRUFBRSxDQUFDLENBQUMsV0FBVztvQkFDMUIsS0FBSyxFQUFRLENBQUMsQ0FBQyxLQUFLO29CQUNwQixFQUFFLEVBQVcsQ0FBQyxDQUFDLEVBQUU7b0JBQ2pCLE9BQU8sRUFBTSxDQUFDLENBQUMsUUFBUTtvQkFDdkIsS0FBSyxFQUFRLENBQUMsQ0FBQyxLQUFLO2lCQUN2QixDQUFDLENBQUM7Z0JBQ0gsUUFBUSxFQUFNLENBQUMsQ0FBQyxRQUFRO2dCQUN4QixZQUFZLEVBQUUsQ0FBQyxDQUFDLGFBQWE7Z0JBQzdCLEtBQUssRUFBUyxDQUFDLENBQUMsS0FBSzthQUN4QixDQUFDLENBQUM7U0FDTixDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQWUsRUFBRSxNQUFjLEVBQUUsT0FBcUM7UUFDakYsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsSUFBSSxJQUF3QixDQUFDO1FBQzdCLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN6RSxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBdUI7WUFDbkQsTUFBTSxFQUFFLE9BQU87WUFDZixJQUFJLEVBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1lBQzFDLElBQUksRUFBSTtnQkFDSixNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsYUFBYSxFQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsWUFBWSxJQUFJLE9BQU8sQ0FBQyxLQUFLO29CQUM5RCxlQUFlLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxjQUFjO29CQUMvQyxjQUFjLEVBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxhQUFhO2lCQUNqRCxDQUFDLENBQUMsQ0FBQyxTQUFTO2dCQUNiLEtBQUssRUFBVSxPQUFPLENBQUMsS0FBSztnQkFDNUIsSUFBSTtnQkFDSixXQUFXLEVBQUksT0FBTyxDQUFDLFdBQVc7Z0JBQ2xDLElBQUksRUFBVyxPQUFPLENBQUMsSUFBSTtnQkFDM0IsV0FBVyxFQUFJLE9BQU8sQ0FBQyxXQUFXO2dCQUNsQyxhQUFhLEVBQUUsT0FBTyxDQUFDLFlBQVk7YUFDdEM7WUFDRCxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07U0FDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksSUFBSSxjQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDNUksQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUFlLEVBQUUsT0FBbUQsRUFBRSxNQUFlO1FBQ3pHLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBOEI7WUFDMUQsTUFBTSxFQUFFLE9BQU87WUFDZixJQUFJLEVBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7WUFDbkMsSUFBSSxFQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0QixFQUFFLEVBQVEsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRO2FBQ3ZCLENBQUMsQ0FBQztZQUNILE1BQU07U0FDVCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLGNBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNILENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE9BQWUsRUFBRSxnQkFBd0IsRUFBRSxPQUF3RDtRQUN4SCxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxJQUFJLEtBQXlCLENBQUM7UUFDOUIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDaEIsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1RSxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBMEM7WUFDdEUsTUFBTSxFQUFFLE9BQU87WUFDZixJQUFJLEVBQUksTUFBTSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQztZQUMvRCxJQUFJLEVBQUk7Z0JBQ0osVUFBVSxFQUFZLE9BQU8sQ0FBQyxTQUFTO2dCQUN2QyxXQUFXLEVBQVcsT0FBTyxDQUFDLFdBQVc7Z0JBQ3pDLGVBQWUsRUFBTyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTO2dCQUN4RyxXQUFXLEVBQVcsT0FBTyxDQUFDLFVBQVU7Z0JBQ3hDLEtBQUs7Z0JBQ0wsSUFBSSxFQUFrQixPQUFPLENBQUMsSUFBSTtnQkFDbEMsYUFBYSxFQUFTLE9BQU8sQ0FBQyxZQUFZO2dCQUMxQyxNQUFNLEVBQWdCLE9BQU8sQ0FBQyxNQUFNO2dCQUNwQyxrQkFBa0IsRUFBSSxPQUFPLENBQUMsZ0JBQWdCO2dCQUM5QyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsa0JBQWtCO2FBQ25EO1lBQ0QsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1NBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSw2QkFBbUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25KLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsS0FBSyxDQUFDLG1CQUFtQixDQUFDLE9BQWUsRUFBRSxPQUFlLEVBQUUsT0FBZ0Q7UUFDeEcsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBK0I7WUFDM0QsTUFBTSxFQUFFLE9BQU87WUFDZixJQUFJLEVBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7WUFDakQsSUFBSSxFQUFJO2dCQUNKLFFBQVEsRUFBSSxPQUFPLENBQUMsT0FBTztnQkFDM0IsVUFBVSxFQUFFLE9BQU8sQ0FBQyxTQUFTO2dCQUM3QixJQUFJLEVBQVEsT0FBTyxDQUFDLElBQUk7Z0JBQ3hCLE1BQU0sRUFBTSxPQUFPLENBQUMsTUFBTTthQUM3QjtZQUNELE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtTQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxvQkFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDM0ksQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBZSxFQUFFLFNBQWlCLEVBQUUsT0FBd0M7UUFDMUYsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBMEI7WUFDdEQsTUFBTSxFQUFFLE9BQU87WUFDZixJQUFJLEVBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1lBQ2hELElBQUksRUFBSTtnQkFDSixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7Z0JBQ2hDLElBQUksRUFBUyxPQUFPLENBQUMsSUFBSTtnQkFDekIsSUFBSSxFQUFTLE9BQU8sQ0FBQyxJQUFJO2FBQzVCO1lBQ0QsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1NBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZJLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQWUsRUFBRSxJQUFZLEVBQUUsT0FBcUQ7UUFDbkcsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBdUM7WUFDbkUsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDO1lBQzVDLElBQUksRUFBSTtnQkFDSixJQUFJO2dCQUNKLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztnQkFDaEMsSUFBSSxFQUFTLE9BQU8sQ0FBQyxJQUFJO2FBQzVCO1NBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksdUJBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsa0JBQWtCLENBQUMsT0FBZSxFQUFFLFFBQWdCLEVBQUUsT0FBK0M7UUFDdkcsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBTztZQUNsQyxNQUFNLEVBQUUsT0FBTztZQUNmLElBQUksRUFBSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztZQUNuRCxJQUFJLEVBQUk7Z0JBQ0osVUFBVSxFQUFFLE9BQU8sQ0FBQyxTQUFTO2dCQUM3QixRQUFRLEVBQUksT0FBTyxDQUFDLFFBQVE7YUFDL0I7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsaUJBQWlCLENBQUMsT0FBZSxFQUFFLE9BQThDO1FBQ25GLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQWdDO1lBQzVELE1BQU0sRUFBRSxPQUFPO1lBQ2YsSUFBSSxFQUFJLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUM7WUFDNUMsSUFBSSxFQUFJO2dCQUNKLFdBQVcsRUFBTyxPQUFPLENBQUMsV0FBVztnQkFDckMsT0FBTyxFQUFXLE9BQU8sQ0FBQyxPQUFPO2dCQUNqQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2pELFVBQVUsRUFBRyxFQUFFLENBQUMsU0FBUztvQkFDekIsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXO29CQUMzQixRQUFRLEVBQUssRUFBRSxDQUFDLE9BQU87b0JBQ3ZCLFVBQVUsRUFBRyxFQUFFLENBQUMsU0FBUztpQkFDNUIsQ0FBQyxDQUFDO2FBQ047WUFDRCxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07U0FDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDYixXQUFXLEVBQU0sSUFBSSxDQUFDLFdBQVc7WUFDakMsZUFBZSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRCxTQUFTLEVBQUksT0FBTyxDQUFDLFVBQVU7Z0JBQy9CLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztnQkFDaEMsT0FBTyxFQUFNLE9BQU8sQ0FBQyxRQUFRO2dCQUM3QixTQUFTLEVBQUksT0FBTyxDQUFDLFVBQVU7YUFDbEMsQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQWUsRUFBRSxPQUFvQztRQUNsRSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUF5QjtZQUNyRCxNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztZQUNwQyxJQUFJLEVBQUk7Z0JBQ0osVUFBVSxFQUFFLE9BQU8sQ0FBQyxTQUFTO2dCQUM3QixPQUFPLEVBQUssT0FBTyxDQUFDLE9BQU87YUFDOUI7U0FDSixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNiLFFBQVEsRUFBTyxJQUFJLENBQUMsUUFBUTtZQUM1QixFQUFFLEVBQWEsSUFBSSxDQUFDLEVBQUU7WUFDdEIsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ2xDLE9BQU8sRUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xDLFFBQVEsRUFBTyxDQUFDLENBQUMsUUFBUTtnQkFDekIsTUFBTSxFQUFTLENBQUMsQ0FBQyxNQUFNO2dCQUN2QixTQUFTLEVBQU0sQ0FBQyxDQUFDLFVBQVU7Z0JBQzNCLGFBQWEsRUFBRSxDQUFDLENBQUMsYUFBYTtnQkFDOUIsRUFBRSxFQUFhLENBQUMsQ0FBQyxFQUFFO2dCQUNuQixNQUFNLEVBQVMsQ0FBQyxDQUFDLE1BQU07Z0JBQ3ZCLEdBQUcsRUFBWSxDQUFDLENBQUMsUUFBUTtnQkFDekIsUUFBUSxFQUFPLENBQUMsQ0FBQyxRQUFRO2FBQzVCLENBQUMsQ0FBQztZQUNILElBQUksRUFBVyxJQUFJLENBQUMsSUFBSTtZQUN4QixhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDckMsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFlLEVBQUUsVUFBb0I7UUFDM0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxzQkFBWSxFQUFFLENBQUM7UUFDakMsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBd0I7WUFDcEQsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDN0IsS0FBSztTQUNSLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxlQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDN0osQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQWU7UUFDbEMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBdUc7WUFDbkksTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQztTQUMvQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNiLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pDLEtBQUssRUFBVSxNQUFNLENBQUMsS0FBSztnQkFDM0IsRUFBRSxFQUFhLE1BQU0sQ0FBQyxFQUFFO2dCQUN4QixhQUFhLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztnQkFDOUMsTUFBTSxFQUFTLE1BQU0sQ0FBQyxPQUFPO2FBQ2hDLENBQUMsQ0FBQztZQUNILE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDNUYsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFlLEVBQUUsT0FBMkM7UUFDMUUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxNQUFNLEtBQUssR0FBRyxJQUFJLHNCQUFZLEVBQUUsQ0FBQztRQUNqQyxLQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdkQsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1QyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBNkI7WUFDekQsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7WUFDdkMsS0FBSztTQUNSLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2IsbUJBQW1CLEVBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksNEJBQWtCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckgsbUJBQW1CLEVBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSw0QkFBa0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzSixPQUFPLEVBQWUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksdUJBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6RyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSw2QkFBbUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1SixZQUFZLEVBQVUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLElBQUksSUFBSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMzSyxPQUFPLEVBQWUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RHLEtBQUssRUFBaUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JGLFFBQVEsRUFBYyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksaUJBQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqRyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMscUJBQXFCLENBQUMsT0FBZSxFQUFFLE1BQWM7UUFDdkQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBNkM7WUFDekUsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7U0FDckQsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksNEJBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN0SixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsc0JBQXNCLENBQUMsT0FBZTtRQUN4QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQW9EO1lBQ2hGLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7U0FDOUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksNEJBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JJLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQWUsRUFBRSxNQUFjO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQXNCO1lBQ2xELE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztTQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixJQUFJLEVBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZSxFQUFFLE9BQXFDO1FBQ2hFLE1BQU0sUUFBUSxHQUFHLEtBQUssRUFBRSxRQUFzQyxFQUFvQyxFQUFFO1lBQ2hHLE1BQU0sS0FBSyxHQUFHLElBQUksc0JBQVksRUFBRSxDQUFDO1lBQ2pDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDL0MsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQTZCO2dCQUN6RCxNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2xDLEtBQUs7YUFDUixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzdCLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtnQkFDbEIsSUFBSSxFQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQzthQUN0RCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDO1FBRUYsTUFBTSxLQUFLLEdBQUcsT0FBTyxFQUFFLEtBQUssSUFBSSxJQUFJLENBQUM7UUFDckMsSUFBSSxZQUFnQyxDQUFDO1FBQ3JDLElBQUksT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO1lBQ2pCLFlBQVksR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQzthQUFNLElBQUksT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO1lBQ3pCLFlBQVksR0FBRyxRQUFRLENBQUM7UUFDNUIsQ0FBQzthQUFNLENBQUM7WUFDSixZQUFZLEdBQUcsT0FBTyxDQUFDO1FBQzNCLENBQUM7UUFDRCxJQUFJLFdBQVcsR0FBRyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxTQUFTLENBQUM7UUFFdkQsSUFBSSxJQUFJLEdBQTRCLEVBQUUsQ0FBQztRQUN2QyxPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxFQUFFLENBQUM7WUFDekIsTUFBTSxTQUFTLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLFNBQVMsWUFBWSxTQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxPQUFPLEtBQUssV0FBVyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEksTUFBTSxTQUFTLEdBQUcsTUFBTSxRQUFRLENBQUM7Z0JBQzdCLEtBQUssRUFBVyxZQUFZO2dCQUM1QixDQUFDLFlBQVksQ0FBQyxFQUFFLFdBQVc7YUFDOUIsQ0FBQyxDQUFDO1lBRUgsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUN6QixNQUFNO1lBQ1YsQ0FBQztZQUVELElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlCLFdBQVcsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUV4QyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUM7Z0JBQzFCLE1BQU07WUFDVixDQUFDO1FBQ0wsQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBZTtRQUM3QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUF3QztZQUNwRSxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztTQUN6QyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQWUsRUFBRSxPQUFlO1FBQzNDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQTZCO1lBQ3pELE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztTQUMvQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3hJLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBZTtRQUMzQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFvQztZQUNoRSxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztTQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1gsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RCxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2hILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFlO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBcUM7WUFDakUsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztTQUM3QyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLHFCQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5SixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFpRixPQUFlO1FBQzVHLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBaUM7WUFDN0QsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7U0FDeEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQTJCLElBQUksZ0JBQU0sQ0FBQyxZQUFZLENBQUssTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQWUsRUFBRSxRQUFnQjtRQUM3QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUEwQjtZQUN0RCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUM7U0FDakQsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQWUsRUFBRSxPQUF3QztRQUN0RSxNQUFNLEtBQUssR0FBRyxJQUFJLHNCQUFZLEVBQUUsQ0FBQztRQUNqQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQWlDO1lBQzdELE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQ3JDLEtBQUs7U0FDUixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBZTtRQUMvQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUE2QjtZQUN6RCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO1NBQzNDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2IsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQjtZQUMzQyxPQUFPLEVBQVksSUFBSSxDQUFDLE9BQU87WUFDL0IsT0FBTyxFQUFZLElBQUksQ0FBQyxRQUFRO1lBQ2hDLElBQUksRUFBZSxJQUFJLENBQUMsSUFBSTtZQUM1QixPQUFPLEVBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0QyxFQUFFLEVBQVksQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xCLFlBQVksRUFBRSxDQUFDLENBQUMsYUFBYTtnQkFDN0IsT0FBTyxFQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDOUIsVUFBVSxFQUFHLENBQUMsQ0FBQyxXQUFXO29CQUMxQixXQUFXLEVBQUUsQ0FBQyxDQUFDLFdBQVc7b0JBQzFCLEtBQUssRUFBUSxDQUFDLENBQUMsS0FBSztvQkFDcEIsRUFBRSxFQUFXLENBQUMsQ0FBQyxFQUFFO29CQUNqQixPQUFPLEVBQU0sQ0FBQyxDQUFDLFFBQVE7b0JBQ3ZCLEtBQUssRUFBUSxDQUFDLENBQUMsS0FBSztpQkFDdkIsQ0FBQyxDQUFDO2dCQUNILFFBQVEsRUFBTSxDQUFDLENBQUMsUUFBUTtnQkFDeEIsWUFBWSxFQUFFLENBQUMsQ0FBQyxhQUFhO2dCQUM3QixLQUFLLEVBQVMsQ0FBQyxDQUFDLEtBQUs7YUFDeEIsQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBZTtRQUM1QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUErQjtZQUMzRCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztTQUN4QyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxzQkFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFlLEVBQUUsT0FBMkM7UUFDNUUsTUFBTSxLQUFLLEdBQUcsSUFBSSxzQkFBWSxFQUFFLENBQUM7UUFDakMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFDLEtBQUssQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBc0I7WUFDbEQsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7WUFDbkMsS0FBSztTQUNSLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZSxFQUFFLE1BQWM7UUFDekMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUF1QjtZQUNuRCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7U0FDN0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLGNBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxPQUFlO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQXlCO1lBQ3JELE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUM7U0FDbkQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFlO1FBQzFCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBOEI7WUFDMUQsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7U0FDdEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksSUFBSSxjQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzSCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUFlLEVBQUUsT0FBZSxFQUFFLGFBQXNCO1FBQzVFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsTUFBTSxLQUFLLEdBQUcsSUFBSSxzQkFBWSxFQUFFLENBQUM7UUFDakMsS0FBSyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNyRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUEwQztZQUN0RSxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMscUJBQXFCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztZQUN0RCxLQUFLO1NBQ1IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksNkJBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNoSCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxPQUFlLEVBQUUsT0FBZSxFQUFFLE9BQTZEO1FBQ3hILE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsTUFBTSxLQUFLLEdBQUcsSUFBSSxzQkFBWSxFQUFFLENBQUM7UUFDakMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5QyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQXFEO1lBQ2pGLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO1NBQy9ELENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzQixtQkFBbUIsRUFBSSxLQUFLLEVBQUUsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUM7WUFDN0UscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLHdCQUF3QjtZQUNqRCxJQUFJLEVBQW1CLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNoRSxNQUFNLEVBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDN0gsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNULENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsa0JBQWtCLENBQUMsT0FBZSxFQUFFLGFBQXNCO1FBQzVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsTUFBTSxLQUFLLEdBQUcsSUFBSSxzQkFBWSxFQUFFLENBQUM7UUFDakMsS0FBSyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNyRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFpRDtZQUM3RSxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDO1lBQzlDLEtBQUs7U0FDUixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksNkJBQW1CLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pILENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsa0JBQWtCLENBQUMsT0FBZSxFQUFFLE9BQWU7UUFDckQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUErQjtZQUMzRCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztTQUNwRCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLG9CQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN4RyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsbUJBQW1CLENBQUMsT0FBZTtRQUNyQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQWtEO1lBQzlFLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7U0FDNUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLG9CQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZILENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQWUsRUFBRSxTQUFpQjtRQUMvQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUEwQjtZQUN0RCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7U0FDbkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkksQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFlO1FBQzdCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQWlDO1lBQzdELE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO1NBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDWCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZELEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3JILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLElBQVk7UUFDMUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBdUM7WUFDbkUsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQztTQUMzQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSx1QkFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQWU7UUFDOUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBOEM7WUFDMUUsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7U0FDMUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLHVCQUFhLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFlO1FBQzlCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQW9DO1lBQ2hFLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7U0FDM0MsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQWU7UUFDakMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBaUM7WUFDN0QsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztTQUM5QyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFlLEVBQUUsUUFBZ0I7UUFDakQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBNEI7WUFDeEQsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUM7U0FDdEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLG9CQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN0SSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFlO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQWdDO1lBQzVELE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUM7U0FDL0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDYixXQUFXLEVBQU0sSUFBSSxDQUFDLFdBQVc7WUFDakMsZUFBZSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRCxTQUFTLEVBQUksT0FBTyxDQUFDLFVBQVU7Z0JBQy9CLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztnQkFDaEMsT0FBTyxFQUFNLE9BQU8sQ0FBQyxRQUFRO2dCQUM3QixTQUFTLEVBQUksT0FBTyxDQUFDLFVBQVU7YUFDbEMsQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBZTtRQUMzQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUF5QjtZQUNyRCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztTQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNiLFFBQVEsRUFBTyxJQUFJLENBQUMsUUFBUTtZQUM1QixFQUFFLEVBQWEsSUFBSSxDQUFDLEVBQUU7WUFDdEIsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ2xDLE9BQU8sRUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xDLFFBQVEsRUFBTyxDQUFDLENBQUMsUUFBUTtnQkFDekIsTUFBTSxFQUFTLENBQUMsQ0FBQyxNQUFNO2dCQUN2QixTQUFTLEVBQU0sQ0FBQyxDQUFDLFVBQVU7Z0JBQzNCLGFBQWEsRUFBRSxDQUFDLENBQUMsYUFBYTtnQkFDOUIsRUFBRSxFQUFhLENBQUMsQ0FBQyxFQUFFO2dCQUNuQixNQUFNLEVBQVMsQ0FBQyxDQUFDLE1BQU07Z0JBQ3ZCLEdBQUcsRUFBWSxDQUFDLENBQUMsUUFBUTtnQkFDekIsUUFBUSxFQUFPLENBQUMsQ0FBQyxRQUFRO2FBQzVCLENBQUMsQ0FBQztZQUNILElBQUksRUFBVyxJQUFJLENBQUMsSUFBSTtZQUN4QixhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDckMsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQWUsRUFBRSxLQUFxQztRQUN2RSxNQUFNLEtBQUssR0FBRyxJQUFJLHNCQUFZLEVBQUUsQ0FBQztRQUNqQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFTO1lBQ2pDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7WUFDMUMsS0FBSztTQUNSLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFlO1FBQy9CLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQXlCO1lBQ2pELE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7U0FDNUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsaUJBQWlCLENBQUMsT0FBZTtRQUNuQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFpQztZQUM3RCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztTQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNiLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMxQixPQUFPLEVBQUksSUFBSSxDQUFDLE9BQU87U0FDMUIsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBZSxFQUFFLE9BQTBDLEVBQUUsd0JBQXdCLEdBQUcsSUFBSTtRQUMzRywwR0FBMEc7UUFDMUcsTUFBTSxXQUFXLEdBQUcsQ0FBSSxJQUE0QyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRztnQkFDbkIsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzthQUN0QjtTQUNKLENBQUMsQ0FBQztRQUNILE1BQU0sYUFBYSxHQUFHLENBQUksSUFBeUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNyRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDekIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxrQkFBa0IsR0FBRyxDQUFJLElBQThDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0UsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3RCLEtBQUssRUFBSyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRztnQkFDbkIsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzthQUN0QjtTQUNKLENBQUMsQ0FBQztRQUNILE1BQU0sZ0JBQWdCLEdBQUcsQ0FBSSxJQUE0QyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNFLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixRQUFRLEVBQUcsSUFBSSxDQUFDLE9BQU87U0FDMUIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLElBQXFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbkUsVUFBVSxFQUFRLElBQUksQ0FBQyxTQUFTO1lBQ2hDLGVBQWUsRUFBRyxJQUFJLENBQUMsYUFBYSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNoRyxVQUFVLEVBQVEsSUFBSSxDQUFDLFNBQVM7WUFDaEMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGNBQWMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDcEcsUUFBUSxFQUFVLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDekYsY0FBYyxFQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCw0QkFBNEIsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLDBCQUEwQjtnQkFDM0UsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUM7Z0JBQ2xLLHdCQUF3QixFQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCO2dCQUN2RSx5QkFBeUIsRUFBSyxJQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQzthQUM3SjtZQUNELGtCQUFrQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztZQUMxRyxPQUFPLEVBQWEsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMzRixTQUFTLEVBQVcsSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDL0YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxzQkFBc0IsR0FBRyxDQUFDLElBQStDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDakYsZUFBZSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ25DLE9BQU8sRUFBVSxJQUFJLENBQUMsTUFBTTtTQUMvQixDQUFDLENBQUM7UUFDSCx5R0FBeUc7UUFDekcsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBa0Y7WUFDOUcsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUksTUFBTSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQztZQUM1QyxJQUFJLEVBQUk7Z0JBQ0osS0FBSyxFQUFNLE9BQU8sRUFBRSxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQzNGLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO2dCQUM3RixNQUFNLEVBQUssT0FBTyxFQUFFLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFDN0YsS0FBSyxFQUFNLE9BQU8sRUFBRSxLQUFLO2dCQUN6QixRQUFRLEVBQUcsT0FBTyxFQUFFLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztnQkFDM0YsSUFBSSxFQUFPLE9BQU8sRUFBRSxJQUFJO2FBQzNCO1NBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEVBQUU7WUFDakIsSUFBSSxhQUFhLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO29CQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixPQUFPLCtDQUErQyxDQUFDLENBQUM7Z0JBQ3ZHLENBQUM7Z0JBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDbEMsSUFBSSxVQUFVLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ25CLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3JELENBQUM7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSw4QkFBOEIsT0FBTyxPQUFPLFVBQVUsYUFBYSxDQUFDLENBQUM7Z0JBQ3hHLE1BQU0sSUFBQSxxQkFBVSxFQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDcEMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEQsQ0FBQztZQUVELE9BQU87Z0JBQ0gsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN0QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM1QixlQUFlLEVBQUcsQ0FBQyxDQUFDLGdCQUFnQjtvQkFDcEMsU0FBUyxFQUFTLENBQUMsQ0FBQyxVQUFVO29CQUM5QixjQUFjLEVBQUksQ0FBQyxDQUFDLGdCQUFnQjtvQkFDcEMsTUFBTSxFQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO29CQUM3RixnQkFBZ0IsRUFBRSxDQUFDLENBQUMsa0JBQWtCO2lCQUN6QyxDQUFDLENBQUM7Z0JBQ0gsZUFBZSxFQUFHLElBQUksQ0FBQyxpQkFBaUI7Z0JBQ3hDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxrQkFBa0I7YUFDNUMsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBZSxFQUFFLE1BQWMsRUFBRSxNQUFlO1FBQzVELE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQU87WUFDbEMsTUFBTSxFQUFFLFFBQVE7WUFDaEIsSUFBSSxFQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztZQUN6QyxNQUFNO1NBQ1QsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBZSxFQUFFLFFBQWdCLEVBQUUsTUFBZTtRQUNqRSxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFPO1lBQ2xDLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLElBQUksRUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUM7WUFDOUMsTUFBTTtTQUNULENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQWUsRUFBRSxRQUFnQixFQUFFLE1BQWMsRUFBRSxNQUFlO1FBQ3JGLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQU87WUFDbEMsTUFBTSxFQUFFLFFBQVE7WUFDaEIsSUFBSSxFQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztZQUMzRCxNQUFNO1NBQ1QsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBZSxFQUFFLE9BQTBDO1FBQzNFLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE1BQU0sS0FBSyxHQUFHLElBQUksc0JBQVksRUFBRSxDQUFDO1FBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBaUM7WUFDN0QsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQztZQUM1QyxLQUFLO1NBQ1IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEcsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFlLEVBQUUsSUFBWTtRQUM1QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUF1QztZQUNuRSxNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7U0FDL0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksdUJBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FDSjtBQTV4REQseUJBNHhEQyJ9