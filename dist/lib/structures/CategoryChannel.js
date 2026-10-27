"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module CategoryChannel */
const Constants_1 = require("../Constants");
const Collection_1 = tslib_1.__importDefault(require("../util/Collection"));
const Errors_1 = require("../util/Errors");
const TypedCollection_1 = tslib_1.__importDefault(require("../util/TypedCollection"));
const GuildChannel_1 = tslib_1.__importDefault(require("./GuildChannel"));
const Permission_1 = tslib_1.__importDefault(require("./Permission"));
const PermissionOverwrite_1 = tslib_1.__importDefault(require("./PermissionOverwrite"));
/** Represents a guild category channel. */
class CategoryChannel extends GuildChannel_1.default {
    /** The permission overwrites of this channel. */
    permissionOverwrites;
    /** The position of this channel on the sidebar. */
    position;
    constructor(data, client) {
        super(data, client);
        this.permissionOverwrites = new TypedCollection_1.default(PermissionOverwrite_1.default, client);
        this.position = data.position;
        this.update(data);
    }
    /** The channels in this category. The returned collection is disposable. */
    get channels() {
        return new Collection_1.default(this.guild.channels.filter(channel => channel.parentID === this.id).map(channel => [channel.id, channel]));
    }
    update(data) {
        super.update(data);
        if (data.position !== undefined) {
            this.position = data.position;
        }
        if (data.permission_overwrites !== undefined) {
            for (const id of this.permissionOverwrites.keys()) {
                if (!data.permission_overwrites.some(overwrite => overwrite.id === id)) {
                    this.permissionOverwrites.delete(id);
                }
            }
            for (const overwrite of data.permission_overwrites) {
                this.permissionOverwrites.update(overwrite);
            }
        }
    }
    /**
     * Delete a permission overwrite on this channel.
     * @param overwriteID The ID of the permission overwrite to delete.
     * @param reason The reason for deleting the permission overwrite.
     */
    async deletePermission(overwriteID, reason) {
        return this.client.rest.channels.deletePermission(this.id, overwriteID, reason);
    }
    /**
     * Edit a permission overwrite on this channel.
     * @param overwriteID The ID of the permission overwrite to edit.
     * @param options The options for editing the permission overwrite.
     */
    async editPermission(overwriteID, options) {
        return this.client.rest.channels.editPermission(this.id, overwriteID, options);
    }
    /**
     * Get the permissions of a member. If providing an id, the member must be cached.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member) {
        if (typeof member === "string") {
            const guildMember = this.guild.members.get(member);
            if (!guildMember) {
                throw new Errors_1.UncachedError(`Cannot use ${this.constructor.name}#permissionsOf with an ID when the member is not cached.`);
            }
            member = guildMember;
        }
        let permission = this.guild.permissionsOf(member).allow;
        if (permission & Constants_1.Permissions.ADMINISTRATOR) {
            return new Permission_1.default(Constants_1.AllPermissions);
        }
        let overwrite = this.permissionOverwrites.get(this.guildID);
        if (overwrite) {
            permission = (permission & ~overwrite.deny) | overwrite.allow;
        }
        let deny = 0n;
        let allow = 0n;
        for (const id of member.roles) {
            if ((overwrite = this.permissionOverwrites.get(id))) {
                deny |= overwrite.deny;
                allow |= overwrite.allow;
            }
        }
        permission = (permission & ~deny) | allow;
        overwrite = this.permissionOverwrites.get(member.id);
        if (overwrite) {
            permission = (permission & ~overwrite.deny) | overwrite.allow;
        }
        return new Permission_1.default(permission);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            channels: this.channels.map(channel => channel.id),
            permissionOverwrites: this.permissionOverwrites.map(overwrite => overwrite.toJSON()),
            position: this.position,
            type: this.type,
        };
    }
}
exports.default = CategoryChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlDaGFubmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvQ2F0ZWdvcnlDaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhCQUE4QjtBQUM5Qiw0Q0FBOEU7QUFDOUUsNEVBQTRDO0FBQzVDLDJDQUErQztBQUMvQyxzRkFBc0Q7QUFFdEQsMEVBQTBDO0FBQzFDLHNFQUFzQztBQUN0Qyx3RkFBd0Q7QUFNeEQsMkNBQTJDO0FBQzNDLE1BQXFCLGVBQWdCLFNBQVEsc0JBQVk7SUFDckQsaURBQWlEO0lBQ2pELG9CQUFvQixDQUFvRTtJQUN4RixtREFBbUQ7SUFDbkQsUUFBUSxDQUFTO0lBRWpCLFlBQVksSUFBdUMsRUFBRSxNQUFjO1FBQy9ELEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUkseUJBQWUsQ0FBQyw2QkFBbUIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsNEVBQTRFO0lBQzVFLElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxvQkFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JKLENBQUM7SUFFa0IsTUFBTSxDQUFDLElBQWdEO1FBQ3RFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFD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