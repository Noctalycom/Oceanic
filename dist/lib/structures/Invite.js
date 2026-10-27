"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Invite */
const Constants_1 = require("../Constants");
const Channel_1 = tslib_1.__importDefault(require("./Channel"));
const Guild_1 = tslib_1.__importDefault(require("./Guild"));
const GuildChannel_1 = tslib_1.__importDefault(require("./GuildChannel"));
const GuildScheduledEvent_1 = tslib_1.__importDefault(require("./GuildScheduledEvent"));
const InviteGuild_1 = tslib_1.__importDefault(require("./InviteGuild"));
const InviteRole_1 = tslib_1.__importDefault(require("./InviteRole"));
const PartialApplication_1 = tslib_1.__importDefault(require("./PartialApplication"));
/** Represents an invite. */
class Invite {
    _cachedChannel;
    /** The approximate number of total members in the guild this invite leads to. */
    approximateMemberCount;
    /** The approximate number of online members in the guild this invite leads to. */
    approximatePresenceCount;
    /** The ID of the channel this invite leads to. */
    channelID;
    client;
    /** The code of this invite. */
    code;
    /** When this invite was created. */
    createdAt;
    /** The date at which this invite expires. */
    expiresAt;
    /** This invite's [flags](https://discord.com/developers/docs/resources/invite#invite-object-invite-flags). */
    flags;
    /** The guild this invite leads to or `null` if this invite leads to a Group DM. */
    guild;
    /** The ID of the guild this invite leads to or `null` if this invite leads to a Group DM. */
    guildID;
    /** The scheduled event associated with this invite. */
    guildScheduledEvent;
    /** The user that created this invite. */
    inviter;
    /** The time after which this invite expires. */
    maxAge;
    /** The maximum number of times this invite can be used, */
    maxUses;
    /** The roles assigned to the user upon accepting the invite . */
    roles;
    /** @deprecated The stage instance in the invite this channel is for. */
    stageInstance;
    /** The embedded application this invite will open. */
    targetApplication;
    /** The [target type](https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types) of this invite. */
    targetType;
    /** The user whose stream to display for this voice channel stream invite. */
    targetUser;
    /** If this invite only grants temporary membership. */
    temporary;
    /** The [type](https://discord.com/developers/docs/resources/invite#invite-object-invite-types) of this invite. */
    type;
    /** The number of times this invite has been used. */
    uses;
    constructor(data, client) {
        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false,
            writable: false,
            configurable: false,
        });
        this.channelID = (data.channel_id ?? data.channel?.id) ?? null;
        this.code = data.code;
        this.flags = data.flags ?? 0;
        this.guild = null;
        this.guildID = data.guild_id ?? null;
        this.expiresAt = (data.expires_at ? new Date(data.expires_at) : undefined);
        this.targetType = data.target_type;
        this.type = data.type;
        this.update(data);
    }
    static withCounts(data, client) {
        return new Invite(data, client);
    }
    static withCountsAndScheduledEvent(data, client) {
        return new Invite(data, client);
    }
    static withMetadata(data, client) {
        return new Invite(data, client);
    }
    static withScheduledEvent(data, client) {
        return new Invite(data, client);
    }
    /** The channel this invite leads to. If the channel is not cached, this will be a partial with only `id`, `name`, and `type`. */
    get channel() {
        if (this.channelID !== null) {
            if (this._cachedChannel instanceof Channel_1.default) {
                return this._cachedChannel;
            }
            const cachedChannel = this.client.getChannel(this.channelID);
            return cachedChannel ? (this._cachedChannel = cachedChannel) : this._cachedChannel;
        }
        return this._cachedChannel === null ? this._cachedChannel : (this._cachedChannel = null);
    }
    update(data) {
        if (data.approximate_member_count !== undefined) {
            this.approximateMemberCount = data.approximate_member_count;
        }
        if (data.approximate_presence_count !== undefined) {
            this.approximatePresenceCount = data.approximate_presence_count;
        }
        if (data.flags !== undefined) {
            this.flags = data.flags;
        }
        if (data.guild) {
            if (this.guild === null) {
                this.guild = new InviteGuild_1.default(data.guild, this.client);
            }
            else {
                this.guild["update"](data.guild);
            }
            if (this.client.guilds.has(data.guild.id)) {
                this.client.guilds.update(data.guild);
            }
        }
        if (this.channelID === null) {
            this._cachedChannel = null;
        }
        else {
            let channel;
            channel = this.client.getChannel(this.channelID);
            if (data.channel !== undefined) {
                if (channel && channel instanceof Channel_1.default) {
                    channel["update"](data.channel);
                }
                else {
                    channel = data.channel;
                }
            }
            this._cachedChannel = channel;
        }
        if (data.inviter !== undefined) {
            this.inviter = this.client.users.update(data.inviter);
        }
        if (data.roles !== undefined) {
            this.roles = data.roles.map(role => new InviteRole_1.default(role, this.client, data.guild_id, this.guild));
        }
        if (data.stage_instance !== undefined) {
            this.stageInstance = {
                members: data.stage_instance.members.map(member => this.client.util.updateMember(this.guildID, member.user.id, member)),
                participantCount: data.stage_instance.participant_count,
                speakerCount: data.stage_instance.speaker_count,
                topic: data.stage_instance.topic,
            };
        }
        if (data.target_application !== undefined) {
            this.targetApplication = new PartialApplication_1.default(data.target_application, this.client);
        }
        if (data.guild_scheduled_event !== undefined) {
            this.guildScheduledEvent = this.guild instanceof Guild_1.default ? this.guild.scheduledEvents.update(data.guild_scheduled_event) : new GuildScheduledEvent_1.default(data.guild_scheduled_event, this.client);
        }
        if (data.target_user !== undefined) {
            this.targetUser = this.client.users.update(data.target_user);
        }
        if ("created_at" in data) {
            if (data.created_at !== undefined) {
                this.createdAt = new Date(data.created_at);
            }
            if (data.uses !== undefined) {
                this.uses = data.uses;
            }
            if (data.max_uses !== undefined) {
                this.maxUses = data.max_uses;
            }
            if (data.max_age !== undefined) {
                this.maxAge = data.max_age;
            }
            if (data.temporary !== undefined) {
                this.temporary = data.temporary;
            }
        }
    }
    /**
     * Delete this invite.
     * @param reason The reason for deleting this invite.
     */
    async deleteInvite(reason) {
        return this.client.rest.channels.deleteInvite(this.code, reason);
    }
    /** Get the target users for this invite. Requires being the inviter or having the `MANAGE_GUILD` or `VIEW_AUDIT_LOG` permission. */
    async getTargetUsers() {
        return this.client.rest.channels.getInviteTargetUsers(this.code);
    }
    /** et the target users job status for this invite. Requires being the inviter or having the `MANAGE_GUILD` or `VIEW_AUDIT_LOG` permission. */
    async getTargetUsersJobStatus() {
        return this.client.rest.channels.getInviteTargetUsersJobStatus(this.code);
    }
    /** Whether this invite belongs to a cached channel. The only difference on using this method over a simple if statement is to easily update all the invite properties typing definitions based on the channel it belongs to. */
    inCachedChannel() {
        return this.channel instanceof Channel_1.default;
    }
    inCachedGuildChannel() {
        return this.channel instanceof GuildChannel_1.default;
    }
    inDMChannel() {
        return this.channel !== null && Constants_1.DMInviteChannelTypes.includes(this.channel.type);
    }
    toJSON() {
        return {
            approximateMemberCount: this.approximateMemberCount,
            approximatePresenceCount: this.approximatePresenceCount,
            channelID: this.channelID ?? undefined,
            code: this.code,
            createdAt: this.createdAt?.getTime(),
            expiresAt: this.expiresAt?.getTime(),
            guild: this.guild?.toJSON(),
            guildID: this.guildID ?? undefined,
            guildScheduledEvent: this.guildScheduledEvent?.toJSON(),
            inviter: this.inviter?.toJSON(),
            maxAge: this.maxAge,
            maxUses: this.maxUses,
            roles: this.roles?.map(role => role.toJSON()),
            stageInstance: this.stageInstance ? {
                members: this.stageInstance.members.map(member => member.id),
                participantCount: this.stageInstance.participantCount,
                speakerCount: this.stageInstance.speakerCount,
                topic: this.stageInstance.topic,
            } : undefined,
            targetApplication: this.targetApplication?.toJSON(),
            targetType: this.targetType,
            targetUser: this.targetUser?.toJSON(),
            temporary: this.temporary,
            uses: this.uses,
        };
    }
    /**
     * Update the target users for this invite. Requires being the inviter or having the `MANAGE_GUILD` permission.
     * @param users The IDs of the users to allow accepting the invite.
     */
    async updateInviteTargetUsers(users) {
        return this.client.rest.channels.updateInviteTargetUsers(this.code, users);
    }
}
exports.default = Invite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvSW52aXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFCQUFxQjtBQUNyQiw0Q0FBOEY7QUFFOUYsZ0VBQWdDO0FBQ2hDLDREQUE0QjtBQUM1QiwwRUFBMEM7QUFDMUMsd0ZBQXdEO0FBQ3hELHdFQUF3QztBQUN4QyxzRUFBc0M7QUFDdEMsc0ZBQXNEO0FBTXRELDRCQUE0QjtBQUM1QixNQUFxQixNQUFNO0lBQ2YsY0FBYyxDQUFrRztJQUN4SCxpRkFBaUY7SUFDakYsc0JBQXNCLENBQVU7SUFDaEMsa0ZBQWtGO0lBQ2xGLHdCQUF3QixDQUFVO0lBQ2xDLGtEQUFrRDtJQUNsRCxTQUFTLENBQWdCO0lBQ3pCLE1BQU0sQ0FBVTtJQUNoQiwrQkFBK0I7SUFDL0IsSUFBSSxDQUFTO0lBQ2Isb0NBQW9DO0lBQ3BDLFNBQVMsQ0FBUTtJQUNqQiw2Q0FBNkM7SUFDN0MsU0FBUyxDQUFRO0lBQ2pCLDhHQUE4RztJQUM5RyxLQUFLLENBQVM7SUFDZCxtRkFBbUY7SUFDbkYsS0FBSyxDQUFxQjtJQUMxQiw2RkFBNkY7SUFDN0YsT0FBTyxDQUFnQjtJQUN2Qix1REFBdUQ7SUFDdkQsbUJBQW1CLENBQXVCO0lBQzFDLHlDQUF5QztJQUN6QyxPQUFPLENBQVE7SUFDZixnREFBZ0Q7SUFDaEQsTUFBTSxDQUFVO0lBQ2hCLDJEQUEyRDtJQUMzRCxPQUFPLENBQVU7SUFDakIsaUVBQWlFO0lBQ2pFLEtBQUssQ0FBcUI7SUFDMUIsd0VBQXdFO0lBQ3hFLGFBQWEsQ0FBcUM7SUFDbEQsc0RBQXNEO0lBQ3RELGlCQUFpQixDQUFzQjtJQUN2QyxnSUFBZ0k7SUFDaEksVUFBVSxDQUFxQjtJQUMvQiw2RUFBNkU7SUFDN0UsVUFBVSxDQUFRO0lBQ2xCLHVEQUF1RDtJQUN2RCxTQUFTLENBQVc7SUFDcEIsa0hBQWtIO0lBQ2xILElBQUksQ0FBYztJQUNsQixx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