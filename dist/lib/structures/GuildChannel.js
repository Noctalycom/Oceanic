"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module GuildChannel */
const Errors_1 = require("../util/Errors");
const Channel_1 = tslib_1.__importDefault(require("./Channel"));
/** Represents a guild channel. */
class GuildChannel extends Channel_1.default {
    _cachedGuild;
    _cachedParent;
    /** The id of the guild this channel is in. */
    guildID;
    /** The name of this channel. */
    name;
    /** The ID of the parent of this channel, if applicable. */
    parentID;
    constructor(data, client) {
        super(data, client);
        this.guildID = data.guild_id;
        this.name = data.name;
        this.parentID = data.parent_id;
    }
    /** The guild associated with this channel. This will throw an error if the guild is not cached. */
    get guild() {
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
    /**
     * The parent of this channel, if applicable.
     *
     * If the channel is an {@link AnnouncementThread}, {@link PublicThread}, or {@link PrivateThread}, this will be a {@link TextChannel}, {@link AnnouncementChannel}, {@link ForumChannel}, or {@link MediaChannel}.
     *
     * If the channel is a {@link TextChannel}, {@link VoiceChannel}, {@link AnnouncementChannel}, {@link ForumChannel}, or {@link MediaChannel}, this will be a {@link CategoryChannel}.
     * @returns If undefined, no attempt was made to resolve the parent channel. If null, the parent channel was attempted to be resolved but was not found in the client's cache.
     */
    get parent() {
        if (this.parentID !== null) {
            if (this._cachedParent !== null) {
                if (this._cachedParent)
                    return this._cachedParent;
                this._cachedParent = this.client.getChannel(this.parentID);
                this._cachedParent ??= null;
                return this._cachedParent;
            }
            return null;
        }
        return undefined;
    }
    update(data) {
        super.update(data);
        if (data.guild_id !== undefined) {
            this.guildID = data.guild_id;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.parent_id !== undefined) {
            this.parentID = data.parent_id;
        }
    }
    /**
     * Edit this channel.
     * @param options The options for editing the channel.
     */
    async edit(options) {
        // edit is called down the chain
        return this.client.rest.channels.edit(this.id, options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            guildID: this.guildID,
            name: this.name,
            parentID: this.parentID,
            type: this.type,
        };
    }
}
exports.default = GuildChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpbGRDaGFubmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvR3VpbGRDaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQiwyQ0FBK0M7QUFFL0MsZ0VBQWdDO0FBV2hDLGtDQUFrQztBQUNsQyxNQUFxQixZQUFhLFNBQVEsaUJBQU87SUFDckMsWUFBWSxDQUFTO0lBQ3JCLGFBQWEsQ0FBNkU7SUFDbEcsOENBQThDO0lBQzlDLE9BQU8sQ0FBUztJQUNoQixnQ0FBZ0M7SUFDaEMsSUFBSSxDQUFTO0lBQ2IsMkRBQTJEO0lBQzNELFFBQVEsQ0FBZ0I7SUFFeEIsWUFBWSxJQUFvQyxFQUFFLE1BQWM7UUFDNUQsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsbUdBQW1HO0lBQ25HLElBQUksS0FBSztRQUNMLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQy9CLE1BQU0sSUFBSSxzQkFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLGtEQUFrRCxDQUFDLENBQUM7WUFDeEcsQ0FBQztZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDaEMsTUFBTSxJQUFJLHNCQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUkscURBQXFELENBQUMsQ0FBQztZQUMzRyxDQUFDO1lBRUQsTUFBTSxJQUFJLHNCQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksd0JBQXdCLENBQUMsQ0FBQztRQUM5RSxDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsSUFBSSxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3pCLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxJQUFJLENBQUMsYUFBYTtvQkFBRSxPQUFPLElBQUksQ0FBQyxhQUF1RCxDQUFDO2dCQUM1RixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFxRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQy9ILElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDO2dCQUM1QixPQUFPLElBQUksQ0FBQyxhQUE4RCxDQUFDO1lBQy9FLENBQUM7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVrQixNQUFNLENBQUMsSUFBNkM7UUFDbkUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2pDLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFCLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ25DLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUEyRDtRQUNsRSxnQ0FBZ0M7UUFDaEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUErQixJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBNkIsQ0FBQztJQUN0SCxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDbEIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXpGRCwrQkF5RkMifQ==