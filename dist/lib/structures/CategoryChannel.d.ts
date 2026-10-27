/** @module CategoryChannel */
import { type ChannelTypes } from "../Constants";
import Collection from "../util/Collection";
import TypedCollection from "../util/TypedCollection";
import GuildChannel from "./GuildChannel";
import Permission from "./Permission";
import PermissionOverwrite from "./PermissionOverwrite";
import type Member from "./Member";
import type Client from "../Client";
import type * as Types from "../types/namespaced";
/** Represents a guild category channel. */
export default class CategoryChannel extends GuildChannel {
    /** The permission overwrites of this channel. */
    permissionOverwrites: TypedCollection<Types.Channels.RawOverwrite, PermissionOverwrite>;
    /** The position of this channel on the sidebar. */
    position: number;
    type: ChannelTypes.GUILD_CATEGORY;
    constructor(data: Types.Channels.RawCategoryChannel, client: Client);
    /** The channels in this category. The returned collection is disposable. */
    get channels(): Collection<string, GuildChannel>;
    protected update(data: Partial<Types.Channels.RawCategoryChannel>): void;
    /**
     * Delete a permission overwrite on this channel.
     * @param overwriteID The ID of the permission overwrite to delete.
     * @param reason The reason for deleting the permission overwrite.
     */
    deletePermission(overwriteID: string, reason?: string): Promise<void>;
    /**
     * Edit a permission overwrite on this channel.
     * @param overwriteID The ID of the permission overwrite to edit.
     * @param options The options for editing the permission overwrite.
     */
    editPermission(overwriteID: string, options: Types.Channels.EditPermissionOptions): Promise<void>;
    /**
     * Get the permissions of a member. If providing an id, the member must be cached.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member: string | Member): Permission;
    toJSON(): Types.JSON.JSONCategoryChannel;
}
