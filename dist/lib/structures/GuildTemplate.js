"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module GuildTemplate */
const Errors_1 = require("../util/Errors");
/** Represents a guild template. */
class GuildTemplate {
    _cachedSourceGuild;
    client;
    /** The code of the template. */
    code;
    /** When this template was created. */
    createdAt;
    /** The creator of this template. */
    creator;
    /** The description of this template. */
    description;
    /** If this template has unsynced changes. */
    isDirty;
    /** The name of this template. */
    name;
    /** A snapshot of the guild. */
    serializedSourceGuild;
    /** The ID of the source guild of this template. */
    sourceGuildID;
    /** When this template was last updated. */
    updatedAt;
    /** The amount of times this template has been used. */
    usageCount;
    constructor(data, client) {
        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false,
            writable: false,
            configurable: false,
        });
        this.code = data.code;
        this.createdAt = new Date(data.created_at);
        this.creator = this.client.users.update(data.creator);
        this.description = null;
        this.isDirty = null;
        this.name = data.name;
        this.serializedSourceGuild = data.serialized_source_guild;
        this.sourceGuildID = data.source_guild_id;
        this.updatedAt = new Date(data.updated_at);
        this.usageCount = data.usage_count;
        this.update(data);
    }
    /** The source guild of this template. This will throw an error if the guild is not cached. */
    get sourceGuild() {
        this._cachedSourceGuild ??= this.client.guilds.get(this.sourceGuildID);
        if (!this._cachedSourceGuild) {
            if (this.client.options.restMode) {
                throw new Errors_1.UncachedError(`${this.constructor.name}#sourceGuild is not present when rest mode is enabled.`);
            }
            if (!this.client.shards.connected) {
                throw new Errors_1.UncachedError(`${this.constructor.name}#sourceGuild is not present without a gateway connection.`);
            }
            throw new Errors_1.UncachedError(`${this.constructor.name}#sourceGuild is not present.`);
        }
        return this._cachedSourceGuild;
    }
    update(data) {
        if (data.description !== undefined) {
            this.description = data.description;
        }
        if (data.is_dirty !== undefined) {
            this.isDirty = data.is_dirty;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.serialized_source_guild !== undefined) {
            this.serializedSourceGuild = data.serialized_source_guild;
        }
        if (data.source_guild_id !== undefined) {
            this.sourceGuildID = data.source_guild_id;
        }
        if (data.updated_at !== undefined) {
            this.updatedAt = new Date(data.updated_at);
        }
        if (data.usage_count !== undefined) {
            this.usageCount = data.usage_count;
        }
    }
    /**
     * Delete this template.
     */
    async delete() {
        return this.client.rest.guilds.deleteTemplate(this.sourceGuild.id, this.code);
    }
    /**
     * Edit this template.
     * @param options The options for editing the template.
     */
    async editTemplate(options) {
        return this.client.rest.guilds.editTemplate(this.sourceGuild.id, this.code, options);
    }
    /**
     * Sync this template.
     */
    async syncTemplate() {
        return this.client.rest.guilds.syncTemplate(this.sourceGuild.id, this.code);
    }
    toJSON() {
        return {
            code: this.code,
            createdAt: this.createdAt.getTime(),
            creator: this.creator.toJSON(),
            description: this.description,
            isDirty: this.isDirty,
            name: this.name,
            serializedSourceGuild: this.serializedSourceGuild,
            sourceGuildID: this.sourceGuildID,
            updatedAt: this.updatedAt.getTime(),
            usageCount: this.usageCount,
        };
    }
}
exports.default = GuildTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpbGRUZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0d1aWxkVGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBNEI7QUFDNUIsMkNBQStDO0FBTy9DLG1DQUFtQztBQUNuQyxNQUFxQixhQUFhO0lBQ3RCLGtCQUFrQixDQUFTO0lBQ25DLE1BQU0sQ0FBVTtJQUNoQixnQ0FBZ0M7SUFDaEMsSUFBSSxDQUFTO0lBQ2Isc0NBQXNDO0lBQ3RDLFNBQVMsQ0FBTztJQUNoQixvQ0FBb0M7SUFDcEMsT0FBTyxDQUFPO0lBQ2Qsd0NBQXdDO0lBQ3hDLFdBQVcsQ0FBZ0I7SUFDM0IsNkNBQTZDO0lBQzdDLE9BQU8sQ0FBaUI7SUFDeEIsaUNBQWlDO0lBQ2pDLElBQUksQ0FBUztJQUNiLCtCQUErQjtJQUMvQixxQkFBcUIsQ0FBaUM7SUFDdEQsbURBQW1EO0lBQ25ELGFBQWEsQ0FBUztJQUN0QiwyQ0FBMkM7SUFDM0MsU0FBUyxDQUFPO0lBQ2hCLHVEQUF1RDtJQUN2RCxVQUFVLENBQVM7SUFDbkIsWUFBWSxJQUEwQyxFQUFFLE1BQWM7UUFDbEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ2xDLEtBQUssRUFBRSxNQUFNO1lBQ2IsVUFBVSxFQUFFLEtBQUs7WUFDakIsUUFBUSxFQUFFLEtBQUs7WUFDZixZQUFZLEVBQUUsS0FBSztTQUN0QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDO1FBQzFELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsOEZBQThGO0lBQzlGLElBQUksV0FBVztRQUNYLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUMzQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUMvQixNQUFNLElBQUksc0JBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSx3REFBd0QsQ0FBQyxDQUFDO1lBQzlHLENBQUM7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2hDLE1BQU0sSUFBSSxzQkFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDJEQUEyRCxDQUFDLENBQUM7WUFDakgsQ0FBQztZQUVELE1BQU0sSUFBSSxzQkFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDhCQUE4QixDQUFDLENBQUM7UUFDcEYsQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ25DLENBQUM7SUFFUyxNQUFNLENBQUMsSUFBbUQ7UUFDaEUsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN4QyxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMxQixDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUM5RCxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM5QyxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBcUQ7UUFDcEUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTztZQUNILElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUNuQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDOUIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCO1lBQ2pELGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNqQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQzlCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF6SEQsZ0NBeUhDIn0=