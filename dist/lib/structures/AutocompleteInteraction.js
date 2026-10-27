"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module AutocompleteInteraction */
const Constants_1 = require("../Constants");
const Errors_1 = require("../util/Errors");
const InteractionOptionsWrapper_1 = tslib_1.__importDefault(require("../util/interactions/InteractionOptionsWrapper"));
const GuildChannel_1 = tslib_1.__importDefault(require("./GuildChannel"));
const Interaction_1 = tslib_1.__importDefault(require("./Interaction"));
const Permission_1 = tslib_1.__importDefault(require("./Permission"));
/** Represents an autocomplete interaction. */
class AutocompleteInteraction extends Interaction_1.default {
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
        this.data = {
            guildID: data.data.guild_id,
            id: data.data.id,
            name: data.data.name,
            options: new InteractionOptionsWrapper_1.default(data.data.options ?? [], null),
            type: data.data.type,
        };
        this.entitlements = data.entitlements?.map(entitlement => client.util.updateEntitlement(entitlement)) ?? [];
        this.guildID = (data.guild_id ?? null);
        this.guildLocale = data.guild_locale;
        this.guildPartial = data.guild;
        this.locale = data.locale;
        this.member = (data.member === undefined ? null : this.client.util.updateMember(data.guild_id, data.member.user.id, data.member));
        this.memberPermissions = (data.member === undefined ? null : new Permission_1.default(data.member.permissions));
        this.user = client.users.update(data.user ?? data.member.user);
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
    /** Whether this interaction belongs to a cached guild channel. The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inCachedGuildChannel() {
        return this.channel instanceof GuildChannel_1.default;
    }
    /** Whether this interaction belongs to a private channel (PrivateChannel or uncached). The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inPrivateChannel() {
        return this.guildID === null;
    }
    /**
     * Acknowledge this interaction with a set of choices. This is an initial response, and more than one initial response cannot be used.
     * @param choices The choices to send.
     */
    async result(choices) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT, data: { choices } }, true);
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
exports.default = AutocompleteInteraction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0b2NvbXBsZXRlSW50ZXJhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9BdXRvY29tcGxldGVJbnRlcmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBc0M7QUFDdEMsNENBQTZHO0FBQzdHLDJDQUErQztBQUMvQyx1SEFBdUY7QUFFdkYsMEVBQTBDO0FBQzFDLHdFQUF3QztBQUN4QyxzRUFBc0M7QUFXdEMsOENBQThDO0FBQzlDLE1BQXFCLHVCQUErSixTQUFRLHFCQUFXO0lBQzNMLGNBQWMsQ0FBa0U7SUFDaEYsWUFBWSxDQUEyRTtJQUMvRixvUUFBb1E7SUFDcFEsY0FBYyxDQUFhO0lBQzNCLHVOQUF1TjtJQUN2TixtQkFBbUIsQ0FBUztJQUM1Qix1UkFBdVI7SUFDdlIsNEJBQTRCLENBQWtEO0lBQzlFLDREQUE0RDtJQUM1RCxTQUFTLENBQVM7SUFDbEIsa0RBQWtEO0lBQ2xELE9BQU8sQ0FBMkI7SUFDbEMsZ0RBQWdEO0lBQ2hELElBQUksQ0FBaUQ7SUFDckQsb0dBQW9HO0lBQ3BHLFlBQVksQ0FBdUM7SUFDbkQseUVBQXlFO0lBQ3pFLE9BQU8sQ0FBNEU7SUFDbkYsZ0pBQWdKO0lBQ2hKLFdBQVcsQ0FBaUY7SUFDNUYsdUVBQXVFO0lBQ3ZFLFlBQVksQ0FBNEk7SUFDeEosZ0dBQWdHO0lBQ2hHLE1BQU0sQ0FBUztJQUNmLDhGQUE4RjtJQUM5RixNQUFNLENBQTRFO0lBQ2xGLGlIQUFpSDtJQUNqSCxpQkFBaUIsQ0FBb0Y7SUFFckcsOENBQThDO0lBQzlDLElBQUksQ0FBTztJQUNYLFlBQVksSUFBbUQsRUFBRSxNQUFjO1FBQzNFLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEIsdUVBQXVFO1FBQ3ZFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxvQkFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksR0FBRyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUN0RCxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixDQUFDO1FBQ3hFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVcsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRztZQUNSLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFDM0IsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQ3BCLE9BQU8sRUFBRSxJQUFJLG1DQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUM7WUFDckUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtTQUN2QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUE4RSxDQUFDO1FBQ3BILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQThGLENBQUM7UUFDdkgsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU8sQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBOEUsQ0FBQztRQUNoTixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLG9CQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBc0YsQ0FBQztRQUMzTCxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsa0RBQWtEO0lBQ2xELElBQUksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFtRSxDQUFDO0lBQzVJLENBQUM7SUFFRCxvSEFBb0g7SUFDcEgsSUFBSSxLQUFLO1FBQ0wsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3RELElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNyQixNQUFNLElBQUksc0JBQWEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUVELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQStFLENBQUMsQ0FBQztJQUNsSyxDQUFDO0lBRUQsZ1BBQWdQO0lBQ2hQLG9CQUFvQjtRQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLFlBQVksc0JBQVksQ0FBQztJQUNoRCxDQUFDO0lBRUQsd1FBQXdRO0lBQ3hRLGdCQUFnQjtRQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBcUQ7UUFDOUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsTUFBTSxJQUFJLFNBQVMsQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1FBQ3BGLENBQUM7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0NBQXdCLENBQUMsdUNBQXVDLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3TCxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO1lBQzVDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7WUFDN0MsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLDRCQUE0QjtZQUMvRCxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVM7WUFDbEMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUU7WUFDN0IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1NBQzNCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFuSEQsMENBbUhDIn0=