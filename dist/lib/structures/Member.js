"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Member */
const Errors_1 = require("../util/Errors");
const Routes = tslib_1.__importStar(require("../util/Routes"));
const Base_1 = tslib_1.__importDefault(require("./Base"));
/** Represents a member of a guild. */
class Member extends Base_1.default {
    _cachedGuild;
    /** The member's avatar hash, if they have set a guild avatar. */
    avatar;
    /** When the member's [timeout](https://support.discord.com/hc/en-us/articles/4413305239191-Time-Out-FAQ) will expire, if active. */
    communicationDisabledUntil;
    /** The id of the guild this member is for. */
    guildID;
    /** The date at which this member joined the guild. */
    joinedAt;
    /** The timestamp (`Date.now()`) at which this member was last created or updated in the cache. Not included in {@link Member#toJSON | toJSON}, as that would break the change detection of events that compare JSON. */
    lastSeen;
    /** This member's nickname, if any. */
    nick;
    /** The roles this member has. */
    roles;
    /** The user associated with this member. */
    user;
    constructor(data, client, guildID) {
        let user;
        let id;
        if (!data.user && data.id) {
            user = client.users.get(id = data.id);
        }
        else if (data.user) {
            id = (user = client.users.update(data.user)).id;
        }
        if (!user) {
            throw new TypeError(`Member received without a user${id === undefined ? " or id." : `: ${id}`}`);
        }
        super(user.id, client);
        this.avatar = null;
        this.communicationDisabledUntil = null;
        this.guildID = guildID;
        this.joinedAt = null;
        this.lastSeen = Date.now();
        this.nick = null;
        this.roles = [];
        this.user = user;
        this.update(data);
    }
    /** If the user associated with this member is a bot. */
    get bot() {
        return this.user.bot;
    }
    /** The discriminator of the user associated with this member. Discriminators are no longer cached, so this is always "0". */
    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    get discriminator() {
        return "0";
    }
    /** The nick of this member if set, the display name of this member's user if set, or their username. */
    get displayName() {
        return this.nick ?? this.user.globalName ?? this.username;
    }
    /** The guild this member is for. This will throw an error if the guild is not cached. */
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
    /** A string that will mention this member. */
    get mention() {
        return this.user.mention;
    }
    /** The permissions of this member. */
    get permissions() {
        return this.guild.permissionsOf(this);
    }
    /** The user associated with this member's public [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags). */
    get publicFlags() {
        return this.user.publicFlags;
    }
    /** If this user associated with this member is an official discord system user. System users are no longer cached, so this is always false. */
    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    get system() {
        return false;
    }
    /** The 4 digits after this user's username, if they have not been migrated. If migrated, this will be a single "0". */
    get tag() {
        return this.user.tag;
    }
    /** The username associated with this member's user. */
    get username() {
        return this.user.username;
    }
    /** The voice state of this member. */
    get voiceState() {
        return this.guild.voiceStates.get(this.id) ?? null;
    }
    update(data) {
        this.lastSeen = Date.now();
        if (data.avatar !== undefined) {
            this.avatar = data.avatar;
        }
        if (data.communication_disabled_until !== undefined) {
            this.communicationDisabledUntil = data.communication_disabled_until === null ? null : new Date(data.communication_disabled_until);
        }
        if (data.joined_at !== undefined) {
            this.joinedAt = data.joined_at === null ? null : new Date(data.joined_at);
        }
        if (data.nick !== undefined) {
            this.nick = data.nick;
        }
        if (data.roles !== undefined) {
            this.roles = data.roles;
        }
        if (data.user !== undefined) {
            this.user = this.client.users.update(data.user);
        }
    }
    /**
     * Add a role to this member.
     * @param roleID The ID of the role to add.
     */
    async addRole(roleID, reason) {
        await this.client.rest.guilds.addMemberRole(this.guildID, this.id, roleID, reason);
    }
    /**
     * The url of this member's avatar decoration (or their user avatar decoration). This will always be a png.
     * Discord does not combine the decoration and their current avatar for you. This is ONLY the decoration.
     * @param size The dimensions of the image.
     */
    avatarDecorationURL(size) {
        return this.user.avatarDecorationURL(size);
    }
    /**
     * The url of this user's guild avatar (or their user avatar if no guild avatar is set, or their default avatar if none apply).
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    avatarURL(format, size) {
        return this.avatar === null ? this.user.avatarURL(format, size) : this.client.util.formatImage(Routes.GUILD_AVATAR(this.guildID, this.id, this.avatar), format, size);
    }
    /**
     * Create a ban for this member.
     * @param options The options for the ban.
     */
    async ban(options) {
        await this.client.rest.guilds.createBan(this.guildID, this.id, options);
    }
    /**
     * The url of this user's banner. Guild banners are no longer cached.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    bannerURL(format, size) {
        return this.user.bannerURL(format, size);
    }
    /**
     * Edit this member. Use {@link Guild#editCurrentMember | Guild#editCurrentMember} if you wish to update the nick of this client using the `CHANGE_NICKNAME` permission.
     * @param options The options for editing the member.
     */
    async edit(options) {
        return this.client.rest.guilds.editMember(this.guildID, this.id, options);
    }
    /**
     * Edit this guild member's voice state. `channelID` is required, and the user must already be in that channel. See [Discord's docs](https://discord.com/developers/docs/resources/guild#modify-user-voice-state) for more information.
     * @param options The options for editing the voice state.
     */
    async editVoiceState(options) {
        return this.client.rest.guilds.editUserVoiceState(this.guildID, this.id, options);
    }
    /**
     * Remove a member from the guild.
     * @param reason The reason for the kick.
     */
    async kick(reason) {
        await this.client.rest.guilds.removeMember(this.guildID, this.id, reason);
    }
    /**
     * Remove a role from this member.
     * @param roleID The ID of the role to remove.
     * @param reason The reason for removing the role.
     */
    async removeRole(roleID, reason) {
        await this.client.rest.guilds.removeMemberRole(this.guildID, this.id, roleID, reason);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            avatar: this.avatar,
            communicationDisabledUntil: this.communicationDisabledUntil?.getTime() ?? null,
            guildID: this.guildID,
            joinedAt: this.joinedAt?.getTime() ?? null,
            nick: this.nick,
            roles: this.roles,
            user: this.user.toJSON(),
        };
    }
    /**
     * Remove a ban for this member.
     * @param reason The reason for removing the ban.
     */
    async unban(reason) {
        await this.client.rest.guilds.removeBan(this.guildID, this.id, reason);
    }
}
exports.default = Member;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvTWVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFCQUFxQjtBQUNyQiwyQ0FBK0M7QUFDL0MsK0RBQXlDO0FBRXpDLDBEQUEwQjtBQVUxQixzQ0FBc0M7QUFDdEMsTUFBcUIsTUFBTyxTQUFRLGNBQUk7SUFDNUIsWUFBWSxDQUFTO0lBQzdCLGlFQUFpRTtJQUNqRSxNQUFNLENBQWdCO0lBQ3RCLG9JQUFvSTtJQUNwSSwwQkFBMEIsQ0FBYztJQUN4Qyw4Q0FBOEM7SUFDOUMsT0FBTyxDQUFTO0lBQ2hCLHNEQUFzRDtJQUN0RCxRQUFRLENBQWM7SUFDdEIsd05BQXdOO0lBQ3hOLFFBQVEsQ0FBUztJQUNqQixzQ0FBc0M7SUFDdEMsSUFBSSxDQUFnQjtJQUNwQixpQ0FBaUM7SUFDakMsS0FBSyxDQUFnQjtJQUNyQiw0Q0FBNEM7SUFDNUMsSUFBSSxDQUFPO0lBQ1gsWUFBWSxJQUEwRSxFQUFFLE1BQWMsRUFBRSxPQUFlO1FBQ25ILElBQUksSUFBc0IsQ0FBQztRQUMzQixJQUFJLEVBQXNCLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3hCLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLENBQUM7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQixFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3BELENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDUixNQUFNLElBQUksU0FBUyxDQUFD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QUksQ0FBQyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVELHNDQUFzQztJQUN0QyxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ3ZELENBQUM7SUFFa0IsTUFBTSxDQUFDLElBQStEO1FBQ3JGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLDRCQUE0QixLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsNEJBQTRCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3RJLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDNUIs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