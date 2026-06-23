"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Invite */
const Channel_1 = tslib_1.__importDefault(require("./Channel"));
const PartialApplication_1 = tslib_1.__importDefault(require("./PartialApplication"));
const InviteGuild_1 = tslib_1.__importDefault(require("./InviteGuild"));
const InviteRole_1 = tslib_1.__importDefault(require("./InviteRole"));
const GuildChannel_1 = tslib_1.__importDefault(require("./GuildChannel"));
const Constants_1 = require("../Constants");
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
            configurable: false
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
        let guild;
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
            this.roles = data.roles?.map(role => new InviteRole_1.default(role, this.client, data.guild_id, this.guild));
        }
        if (data.stage_instance !== undefined) {
            this.stageInstance = {
                members: data.stage_instance.members.map(member => this.client.util.updateMember(guild.id, member.user.id, member)),
                participantCount: data.stage_instance.participant_count,
                speakerCount: data.stage_instance.speaker_count,
                topic: data.stage_instance.topic
            };
        }
        if (data.target_application !== undefined) {
            this.targetApplication = new PartialApplication_1.default(data.target_application, this.client);
        }
        if (data.guild_scheduled_event !== undefined) {
            this.guildScheduledEvent = guild.scheduledEvents.update(data.guild_scheduled_event);
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
                topic: this.stageInstance.topic
            } : undefined,
            targetApplication: this.targetApplication?.toJSON(),
            targetType: this.targetType,
            targetUser: this.targetUser?.toJSON(),
            temporary: this.temporary,
            uses: this.uses
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvSW52aXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFCQUFxQjtBQUNyQixnRUFBZ0M7QUFJaEMsc0ZBQXNEO0FBQ3RELHdFQUF3QztBQUN4QyxzRUFBc0M7QUFDdEMsMEVBQTBDO0FBRzFDLDRDQUE4RjtBQUU5Riw0QkFBNEI7QUFDNUIsTUFBcUIsTUFBTTtJQUNmLGNBQWMsQ0FBa0c7SUFDeEgsaUZBQWlGO0lBQ2pGLHNCQUFzQixDQUFVO0lBQ2hDLGtGQUFrRjtJQUNsRix3QkFBd0IsQ0FBVTtJQUNsQyxrREFBa0Q7SUFDbEQsU0FBUyxDQUFnQjtJQUN6QixNQUFNLENBQVU7SUFDaEIsK0JBQStCO0lBQy9CLElBQUksQ0FBUztJQUNiLG9DQUFvQztJQUNwQyxTQUFTLENBQVE7SUFDakIsNkNBQTZDO0lBQzdDLFNBQVMsQ0FBUTtJQUNqQiw4R0FBOEc7SUFDOUcsS0FBSyxDQUFTO0lBQ2QsbUZBQW1GO0lBQ25GLEtBQUssQ0FBcUI7SUFDMUIsNkZBQTZGO0lBQzdGLE9BQU8sQ0FBZ0I7SUFDdkIsdURBQXVEO0lBQ3ZELG1CQUFtQixDQUF1QjtJQUMxQyx5Q0FBeUM7SUFDekMsT0FBTyxDQUFRO0lBQ2YsZ0RBQWdEO0lBQ2hELE1BQU0sQ0FBVTtJQUNoQiwyREFBMkQ7SUFDM0QsT0FBTyxDQUFVO0lBQ2pCLGlFQUFpRTtJQUNqRSxLQUFLLENBQXFCO0lBQzFCLHdFQUF3RTtJQUN4RSxhQUFhLENBQXFDO0lBQ2xELHNEQUFzRDtJQUN0RCxpQkFBaUIsQ0FBc0I7SUFDdkMsZ0lBQWdJO0lBQ2hJLFVBQVUsQ0FBcUI7SUFDL0IsNkVBQTZFO0lBQzdFLFVBQVUsQ0FBUTtJQUNsQix1REFBdUQ7SUFDdkQsU0FBUyxDQUFXO0lBQ3BCLGtIQUFrSDtJQUNsSCxJQUFJLENBQWM7SUFDbEIscURBQXFEO0lBQ3JELElBQUksQ0FBcUI7SUFD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