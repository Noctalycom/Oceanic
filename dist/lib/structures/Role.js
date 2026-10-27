"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Role */
const Errors_1 = require("../util/Errors");
const Base_1 = tslib_1.__importDefault(require("./Base"));
/** Represents a role in a guild. */
class Role extends Base_1.default {
    _cachedGuild;
    /** The primary color of this role. */
    color;
    /** The id of the guild this role is in. */
    guildID;
    /** The icon has of this role. */
    icon;
    /** If this role is managed by an integration. */
    managed;
    /** The name of this role. */
    name;
    /** The allowed permissions of this role, as a bigint. */
    permissionsAllow;
    /** The position of this role. */
    position;
    /** The secondary color of this role, or 0 if it has none. */
    secondaryColor;
    constructor(data, client, guildID) {
        super(data.id, client);
        this.color = data.color;
        this.guildID = guildID;
        this.icon = null;
        this.managed = data.managed;
        this.name = data.name;
        this.permissionsAllow = BigInt(data.permissions);
        this.position = data.position;
        this.secondaryColor = data.colors.secondary_color ?? 0;
        this.update(data);
    }
    /** The guild this role is in. This will throw an error if the guild is not cached. */
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
    /** A string that will mention this role. */
    get mention() {
        return `<@&${this.id}>`;
    }
    update(data) {
        if (data.color !== undefined) {
            this.color = data.color;
        }
        if (data.colors !== undefined) {
            this.secondaryColor = data.colors.secondary_color ?? 0;
        }
        if (data.icon !== undefined) {
            this.icon = data.icon ?? null;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.permissions !== undefined) {
            this.permissionsAllow = BigInt(data.permissions);
        }
        if (data.position !== undefined) {
            this.position = data.position;
        }
    }
    /**
     * Delete this role.
     * @param reason The reason for deleting the role.
     */
    async delete(reason) {
        return this.client.rest.guilds.deleteRole(this.guildID, this.id, reason);
    }
    /**
     * Edit this role.
     * @param options The options for editing the role.
     */
    async edit(options) {
        return this.client.rest.guilds.editRole(this.guildID, this.id, options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            color: this.color,
            guildID: this.guildID,
            icon: this.icon,
            managed: this.managed,
            name: this.name,
            permissions: { allow: this.permissionsAllow.toString(), deny: "0" },
            permissionsAllow: this.permissionsAllow.toString(),
            position: this.position,
            secondaryColor: this.secondaryColor,
        };
    }
}
exports.default = Role;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1JvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUJBQW1CO0FBQ25CLDJDQUErQztBQUUvQywwREFBMEI7QUFNMUIsb0NBQW9DO0FBQ3BDLE1BQXFCLElBQUssU0FBUSxjQUFJO0lBQzFCLFlBQVksQ0FBUztJQUM3QixzQ0FBc0M7SUFDdEMsS0FBSyxDQUFTO0lBQ2QsMkNBQTJDO0lBQzNDLE9BQU8sQ0FBUztJQUNoQixpQ0FBaUM7SUFDakMsSUFBSSxDQUFnQjtJQUNwQixpREFBaUQ7SUFDakQsT0FBTyxDQUFVO0lBQ2pCLDZCQUE2QjtJQUM3QixJQUFJLENBQVM7SUFDYix5REFBeUQ7SUFDekQsZ0JBQWdCLENBQVM7SUFDekIsaUNBQWlDO0lBQ2pDLFFBQVEsQ0FBUztJQUNqQiw2REFBNkQ7SUFDN0QsY0FBYyxDQUFTO0lBQ3ZCLFlBQVksSUFBMEIsRUFBRSxNQUFjLEVBQUUsT0FBZTtRQUNuRSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVB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