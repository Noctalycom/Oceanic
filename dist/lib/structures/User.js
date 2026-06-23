"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module User */
const Base_1 = tslib_1.__importDefault(require("./Base"));
const PrimaryGuild_1 = tslib_1.__importDefault(require("./PrimaryGuild"));
const Constants_1 = require("../Constants");
const Routes = tslib_1.__importStar(require("../util/Routes"));
const Errors_1 = require("../util/Errors");
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
    /**
     * The url of this user's avatar decoration. This will always be a png.
     * Discord does not combine the decoration and their current avatar for you. This is ONLY the decoration.
     * @param size The dimensions of the image.
     */
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
            skuID
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
            publicFlags: this.publicFlags,
            username: this.username
        };
    }
}
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUJBQW1CO0FBQ25CLDBEQUEwQjtBQUkxQiwwRUFBMEM7QUFFMUMsNENBQXVFO0FBQ3ZFLCtEQUF5QztBQUV6QywyQ0FBK0M7QUFFL0MseUJBQXlCO0FBQ3pCLE1BQXFCLElBQUssU0FBUSxjQUFJO0lBQ2xDLDhCQUE4QjtJQUM5QixNQUFNLENBQWdCO0lBQ3RCLHVHQUF1RztJQUN2RyxNQUFNLENBQWlCO0lBQ3ZCLDZCQUE2QjtJQUM3QixHQUFHLENBQVU7SUFDYix1Q0FBdUM7SUFDdkMsVUFBVSxDQUFnQjtJQUMxQix5Q0FBeUM7SUFDekMsWUFBWSxDQUFzQjtJQUNsQyw0R0FBNEc7SUFDNUcsV0FBVyxDQUFTO0lBQ3BCLDJCQUEyQjtJQUMzQixRQUFRLENBQVM7SUFDakIsWUFBWSxJQUF5QixFQUFFLE1BQWM7UUFDakQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVrQixNQUFNLENBQUMsSUFBa0M7UUFDeEQsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzVC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