"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module AutoModerationRule */
const Errors_1 = require("../util/Errors");
const Base_1 = tslib_1.__importDefault(require("./Base"));
/** Represents an auto moderation rule. */
class AutoModerationRule extends Base_1.default {
    _cachedGuild;
    /** The actions that will execute when this rule is triggered. */
    actions;
    /** The creator of this rule. */
    creator;
    /** The ID of the creator of this rule. */
    creatorID;
    /** If this rule is enabled. */
    enabled;
    /** The [event type](https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types) of this rule. */
    eventType;
    /** The channels that are exempt from this rule. */
    exemptChannels;
    /** The roles that are exempt from this rule. */
    exemptRoles;
    /** The id of the guild this rule is in. */
    guildID;
    /** The name of this rule */
    name;
    /** The metadata of this rule's trigger.  */
    triggerMetadata;
    /** This rule's [trigger type](https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types). */
    triggerType;
    constructor(data, client) {
        super(data.id, client);
        this.actions = data.actions.map(a => ({
            metadata: {
                channelID: a.metadata.channel_id,
                customMessage: a.metadata.custom_message,
                durationSeconds: a.metadata.duration_seconds,
            },
            type: a.type,
        }));
        this.creator = client.users.get(data.creator_id);
        this.creatorID = data.creator_id;
        this.enabled = data.enabled;
        this.eventType = data.event_type;
        this.exemptChannels = data.exempt_channels;
        this.exemptRoles = data.exempt_roles;
        this.guildID = data.guild_id;
        this.name = data.name;
        this.triggerMetadata = {
            allowList: data.trigger_metadata.allow_list,
            keywordFilter: data.trigger_metadata.keyword_filter,
            mentionRaidProtectionEnabled: data.trigger_metadata.mention_raid_protection_enabled,
            mentionTotalLimit: data.trigger_metadata.mention_total_limit,
            presets: data.trigger_metadata.presets,
            regexPatterns: data.trigger_metadata.regex_patterns,
        };
        this.triggerType = data.trigger_type;
        this.update(data);
    }
    /** The guild this rule is in. This will throw an error if the guild is not cached. */
    get guild() {
        this._cachedGuild ??= this.client.guilds.get(this.guildID);
        if (!this._cachedGuild) {
            throw new Errors_1.UncachedError(this, "guild", "GUILDS", this.client);
        }
        return this._cachedGuild;
    }
    update(data) {
        if (data.actions !== undefined) {
            this.actions = data.actions.map(a => ({
                metadata: {
                    channelID: a.metadata.channel_id,
                    customMessage: a.metadata.custom_message,
                    durationSeconds: a.metadata.duration_seconds,
                },
                type: a.type,
            }));
        }
        if (data.enabled !== undefined) {
            this.enabled = data.enabled;
        }
        if (data.event_type !== undefined) {
            this.eventType = data.event_type;
        }
        if (data.exempt_channels !== undefined) {
            this.exemptChannels = data.exempt_channels;
        }
        if (data.exempt_roles !== undefined) {
            this.exemptRoles = data.exempt_roles;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.trigger_metadata !== undefined) {
            this.triggerMetadata = {
                allowList: data.trigger_metadata.allow_list,
                keywordFilter: data.trigger_metadata.keyword_filter,
                mentionTotalLimit: data.trigger_metadata.mention_total_limit,
                presets: data.trigger_metadata.presets,
                regexPatterns: data.trigger_metadata.regex_patterns,
            };
        }
        if (data.trigger_type !== undefined) {
            this.triggerType = data.trigger_type;
        }
    }
    /**
     * Delete this auto moderation rule.
     * @param reason The reason for deleting this rule.
     */
    async deleteAutoModerationRule(reason) {
        return this.client.rest.guilds.deleteAutoModerationRule(this.guildID, this.id, reason);
    }
    /**
     * Edit this auto moderation rule.
     * @param options The options for editing the rule.
     */
    async edit(options) {
        return this.client.rest.guilds.editAutoModerationRule(this.guildID, this.id, options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            actions: this.actions,
            creatorID: this.creatorID,
            enabled: this.enabled,
            eventType: this.eventType,
            exemptChannels: this.exemptChannels,
            exemptRoles: this.exemptRoles,
            guildID: this.guildID,
            name: this.name,
            triggerMetadata: this.triggerMetadata,
            triggerType: this.triggerType,
        };
    }
}
exports.default = AutoModerationRule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0b01vZGVyYXRpb25SdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvQXV0b01vZGVyYXRpb25SdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUNqQywyQ0FBK0M7QUFFL0MsMERBQTBCO0FBUTFCLDBDQUEwQztBQUMxQyxNQUFxQixrQkFBbUIsU0FBUSxjQUFJO0lBQ3hDLFlBQVksQ0FBUztJQUM3QixpRUFBaUU7SUFDakUsT0FBTyxDQUFtRDtJQUMxRCxnQ0FBZ0M7SUFDaEMsT0FBTyxDQUFRO0lBQ2YsMENBQTBDO0lBQzFDLFNBQVMsQ0FBUztJQUNsQiwrQkFBK0I7SUFDL0IsT0FBTyxDQUFVO0lBQ2pCLDRJQUE0STtJQUM1SSxTQUFTLENBQTJCO0lBQ3BDLG1EQUFtRDtJQUNuRCxjQUFjLENBQWdCO0lBQzlCLGdEQUFnRDtJQUNoRCxXQUFXLENBQWdCO0lBQzNCLDJDQUEyQztJQUMzQyxPQUFPLENBQVM7SUFDaEIsNEJBQTRCO0lBQzVCLElBQUksQ0FBUztJQUNiLDRDQUE0QztJQUM1QyxlQUFlLENBQXVDO0lBQ3RELDJJQUEySTtJQUMzSSxXQUFXLENBQTZCO0lBQ3hDLFlBQVksSUFBZ0QsRUFBRSxNQUFjO1FBQ3hFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLFFBQVEsRUFBRTtnQkFDTixTQUFTLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVO2dCQUNoQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjO2dCQUN4QyxlQUFlLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0I7YUFDL0M7WUFDRCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElB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