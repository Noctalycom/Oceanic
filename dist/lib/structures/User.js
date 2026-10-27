"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module User */
const Constants_1 = require("../Constants");
const Errors_1 = require("../util/Errors");
const Routes = tslib_1.__importStar(require("../util/Routes"));
const Base_1 = tslib_1.__importDefault(require("./Base"));
const PrimaryGuild_1 = tslib_1.__importDefault(require("./PrimaryGuild"));
/** Represents a user. */
class User extends Base_1.default {
    /** The user's avatar hash. */
    avatar;
    /** The user's banner hash. If this member was received via the gateway, this will never be present. */
    banner;
    /** If this user is a bot. */
    bot;
    /** The user's display name, if set. */
    globalName;
    /** The user's Nitro subscription type. A value of {@link Constants~PremiumTypes.NONE | NONE} can also mean the OAuth request did not include the approved `identify.premium` scope. */
    premiumType;
    /** The primary guild this user is in. */
    primaryGuild;
    /** The user's public [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags). */
    publicFlags;
    /** The user's username. */
    username;
    constructor(data, client) {
        super(data.id, client);
        this.avatar = null;
        this.bot = !!data.bot;
        this.globalName = data.global_name;
        this.primaryGuild = null;
        this.publicFlags = 0;
        this.username = data.username;
        this.update(data);
    }
    /**
     * The primary guild this user is in.
     * @deprecated Use {@link primaryGuild}
     */
    get clan() {
        return this.primaryGuild;
    }
    /** The default avatar value of this user. */
    get defaultAvatar() {
        return Number(BigInt(this.id) >> 22n) % 6;
    }
    /** If this user has migrated to the new username system. */
    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    get isMigrated() {
        return true;
    }
    /** A string that will mention this user. */
    get mention() {
        return `<@${this.id}>`;
    }
    /** This user's unique username, if migrated, else a combination of the user's username and discriminator. */
    get tag() {
        return this.username;
    }
    update(data) {
        if (data.avatar !== undefined) {
            this.avatar = data.avatar;
        }
        if (data.banner !== undefined) {
            this.banner = data.banner;
        }
        if (data.global_name !== undefined) {
            this.globalName = data.global_name;
        }
        if (data.username !== undefined) {
            this.username = data.username;
        }
        if (data.primary_guild !== undefined) {
            this.primaryGuild = data.primary_guild ? new PrimaryGuild_1.default(data.primary_guild, this.client) : null;
        }
        if (data.premium_type !== undefined) {
            this.premiumType = data.premium_type;
        }
    }
    /**
     * The url of this user's avatar decoration. This will always be a png.
     * Discord does not combine the decoration and their current avatar for you. This is ONLY the decoration.
     * @param size The dimensions of the image.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    avatarDecorationURL(_size) {
        return null;
    }
    /**
     * The url of this user's avatar (or default avatar, if they have not set an avatar).
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    avatarURL(format, size) {
        return this.avatar === null ? this.defaultAvatarURL() : this.client.util.formatImage(Routes.USER_AVATAR(this.id, this.avatar), format, size);
    }
    /**
     * The url of this user's banner.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    bannerURL(format, size) {
        return this.banner ? this.client.util.formatImage(Routes.BANNER(this.id, this.banner), format, size) : null;
    }
    /**
     * Create a direct message with this user.
     */
    async createDM() {
        return this.client.rest.channels.createDM(this.id);
    }
    /**
     * Create a test entitlement for this user.
     * @param skuID The ID of the SKU to create an entitlement for.
     * @param applicationID The ID of the application to create the entitlement for. If present, defaults to the logged in client's application id.
     */
    async createTestEntitlement(skuID, applicationID) {
        if (applicationID === undefined && this.client["_application"] === undefined) {
            throw new Errors_1.UncachedError("Client#application is not present, you must provide an applicationID as a second argument. To not need to provide an ID, only call this after at least one shard is READY, or restMode is enabled.");
        }
        return this.client.rest.applications.createTestEntitlement(applicationID ?? this.client.application.id, {
            ownerID: this.id,
            ownerType: Constants_1.EntitlementOwnerTypes.USER,
            skuID,
        });
    }
    /**
     * The url of this user's default avatar.
     */
    defaultAvatarURL() {
        return this.client.util.formatImage(Routes.EMBED_AVATAR(this.defaultAvatar), "png");
    }
    /**
     * Get the entitlements for this guild.
     * @param options The options for getting the entitlements.
     */
    async getEntitlements(options, applicationID) {
        if (applicationID === undefined && this.client["_application"] === undefined) {
            throw new Errors_1.UncachedError("Client#application is not present, you must provide an applicationID as a second argument. To not need to provide an ID, only call this after at least one shard is READY, or restMode is enabled.");
        }
        return this.client.rest.applications.getEntitlements(applicationID ?? this.client.application.id, { userID: this.id, ...options });
    }
    toJSON() {
        return {
            ...super.toJSON(),
            avatar: this.avatar,
            banner: this.banner,
            bot: this.bot,
            globalName: this.globalName,
            premiumType: this.premiumType,
            publicFlags: this.publicFlags,
            username: this.username,
        };
    }
}
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUJBQW1CO0FBQ25CLDRDQUEwRjtBQUMxRiwyQ0FBK0M7QUFDL0MsK0RBQXlDO0FBRXpDLDBEQUEwQjtBQUMxQiwwRUFBMEM7QUFRMUMseUJBQXlCO0FBQ3pCLE1BQXFCLElBQUssU0FBUSxjQUFJO0lBQ2xDLDhCQUE4QjtJQUM5QixNQUFNLENBQWdCO0lBQ3RCLHVHQUF1RztJQUN2RyxNQUFNLENBQWlCO0lBQ3ZCLDZCQUE2QjtJQUM3QixHQUFHLENBQVU7SUFDYix1Q0FBdUM7SUFDdkMsVUFBVSxDQUFnQjtJQUMxQix1TEFBdUw7SUFDdkwsV0FBVyxDQUFnQjtJQUMzQix5Q0FBeUM7SUFDekMsWUFBWSxDQUFzQjtJQUNsQyw0R0FBNEc7SUFDNUcsV0FBVyxDQUFTO0lBQ3BCLDJCQUEyQjtJQUMzQixRQUFRLENBQVM7SUFDakIsWUFBWSxJQUF5QixFQUFFLE1BQWM7UUFDakQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUksSUFBSTtRQUNKLE9BQU8sSUFBSSxD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