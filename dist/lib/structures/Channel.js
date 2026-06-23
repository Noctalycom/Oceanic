"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Channel */
const Base_1 = tslib_1.__importDefault(require("./Base"));
const Constants_1 = require("../Constants");
/** Represents a channel. */
class Channel extends Base_1.default {
    /** The [type](https://discord.com/developers/docs/resources/channel#channel-object-channel-types) of this channel. */
    type;
    constructor(data, client) {
        super(data.id, client);
        this.type = data.type;
    }
    static from(data, client) {
        switch (data.type) {
            case Constants_1.ChannelTypes.GUILD_TEXT: {
                return new TextChannel(data, client);
            }
            case Constants_1.ChannelTypes.DM: {
                return new PrivateChannel(data, client);
            }
            case Constants_1.ChannelTypes.GUILD_VOICE: {
                return new VoiceChannel(data, client);
            }
            case Constants_1.ChannelTypes.GROUP_DM: {
                return new GroupChannel(data, client);
            }
            case Constants_1.ChannelTypes.GUILD_CATEGORY: {
                return new CategoryChannel(data, client);
            }
            case Constants_1.ChannelTypes.GUILD_ANNOUNCEMENT: {
                return new AnnouncementChannel(data, client);
            }
            case Constants_1.ChannelTypes.ANNOUNCEMENT_THREAD: {
                return new AnnouncementThreadChannel(data, client);
            }
            case Constants_1.ChannelTypes.PUBLIC_THREAD: {
                return new PublicThreadChannel(data, client);
            }
            case Constants_1.ChannelTypes.PRIVATE_THREAD: {
                return new PrivateThreadChannel(data, client);
            }
            case Constants_1.ChannelTypes.GUILD_STAGE_VOICE: {
                return new StageChannel(data, client);
            }
            case Constants_1.ChannelTypes.GUILD_FORUM: {
                return new ForumChannel(data, client);
            }
            case Constants_1.ChannelTypes.GUILD_MEDIA: {
                return new MediaChannel(data, client);
            }
            default: {
                return new Channel(data, client);
            }
        }
    }
    /** A string that will mention this channel. */
    get mention() {
        return `<#${this.id}>`;
    }
    /**
     * Close a direct message, leave a group channel, or delete a guild channel.
     */
    async delete() {
        await this.client.rest.channels.delete(this.id);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            type: this.type
        };
    }
}
exports.default = Channel;
// Yes this sucks, but it works. That's the important part. Circular imports are hell.
/* eslint-disable @typescript-eslint/no-var-requires, unicorn/prefer-module */
const TextChannel = require("./TextChannel").default;
const PrivateChannel = require("./PrivateChannel").default;
const VoiceChannel = require("./VoiceChannel").default;
const CategoryChannel = require("./CategoryChannel").default;
const GroupChannel = require("./GroupChannel").default;
const AnnouncementChannel = require("./AnnouncementChannel").default;
const PublicThreadChannel = require("./PublicThreadChannel").default;
const PrivateThreadChannel = require("./PrivateThreadChannel").default;
const AnnouncementThreadChannel = require("./AnnouncementThreadChannel").default;
const StageChannel = require("./StageChannel").default;
const ForumChannel = require("./ForumChannel").default;
const MediaChannel = require("./MediaChannel").default;
/* eslint-enable @typescript-eslint/no-var-requires, unicorn/prefer-module */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0NoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0JBQXNCO0FBQ3RCLDBEQUEwQjtBQUUxQiw0Q0FBNEM7QUFHNUMsNEJBQTRCO0FBQzVCLE1BQXFCLE9BQVEsU0FBUSxjQUFJO0lBQ3JDLHNIQUFzSDtJQUN0SCxJQUFJLENBQWU7SUFDbkIsWUFBWSxJQUErQixFQUFFLE1BQWM7UUFDdkQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFrRSxJQUErQixFQUFFLE1BQWM7UUFDeEgsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEIsS0FBSyx3QkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sSUFBSSxXQUFXLENBQUMsSUFBcUMsRUFBRSxNQUFNLENBQU0sQ0FBQztZQUMvRSxDQUFDO1lBQ0QsS0FBSyx3QkFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBd0MsRUFBRSxNQUFNLENBQU0sQ0FBQztZQUNyRixDQUFDO1lBQ0QsS0FBSyx3QkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLE9BQU8sSUFBSSxZQUFZLENBQUMsSUFBc0MsRUFBRSxNQUFNLENBQU0sQ0FBQztZQUNqRixDQUFDO1lBQ0QsS0FBSyx3QkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sSUFBSSxZQUFZLENBQUMsSUFBc0MsRUFBRSxNQUFNLENBQU0sQ0FBQztZQUNqRixDQUFDO1lBQ0QsS0FBSyx3QkFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE9BQU8sSUFBSSxlQUFlLENBQUMsSUFBeUMsRUFBRSxNQUFNLENBQU0sQ0FBQztZQUN2RixDQUFDO1lBQ0QsS0FBSyx3QkFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxJQUFJLG1CQUFtQixDQUFDLElBQTZDLEVBQUUsTUFBTSxDQUFNLENBQUM7WUFDL0YsQ0FBQztZQUNELEtBQUssd0JBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLE9BQU8sSUFBSSx5QkFBeUIsQ0FBQyxJQUFtRCxFQUFFLE1BQU0sQ0FBTSxDQUFDO1lBQzNHLENBQUM7WUFDRCxLQUFLLHdCQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDOUIsT0FBTyxJQUFJLG1CQUFtQixDQUFDLElBQTZDLEVBQUUsTUFBTSxDQUFNLENBQUM7WUFDL0YsQ0FBQztZQUNELEtBQUssd0JBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixPQUFPLElBQUksb0JBQW9CLENBQUMsSUFBOEMsRUFBRSxNQUFNLENBQU0sQ0FBQztZQUNqRyxDQUFDO1lBQ0QsS0FBSyx3QkFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDbEMsT0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFzQyxFQUFFLE1BQU0sQ0FBTSxDQUFDO1lBQ2pGLENBQUM7WUFDRCxLQUFLLHdCQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFzQyxFQUFFLE1BQU0sQ0FBTSxDQUFDO1lBQ2pGLENBQUM7WUFDRCxLQUFLLHdCQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFzQyxFQUFFLE1BQU0sQ0FBTSxDQUFDO1lBQ2pGLENBQUM7WUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNOLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBTSxDQUFDO1lBQzFDLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVELCtDQUErQztJQUMvQyxJQUFJLE9BQU87UUFDUCxPQUFPLEtBQUssSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxNQUFNO1FBQ1IsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ2xCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF0RUQsMEJBc0VDO0FBRUQsc0ZBQXNGO0FBQ3RGLDhFQUE4RTtBQUM5RSxNQUFNLFdBQVcsR0FBSSxPQUFPLENBQUMsZUFBZSxDQUFvQyxDQUFDLE9BQU8sQ0FBQztBQUN6RixNQUFNLGNBQWMsR0FBSSxPQUFPLENBQUMsa0JBQWtCLENBQXVDLENBQUMsT0FBTyxDQUFDO0FBQ2xHLE1BQU0sWUFBWSxHQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBcUMsQ0FBQyxPQUFPLENBQUM7QUFDNUYsTUFBTSxlQUFlLEdBQUksT0FBTyxDQUFDLG1CQUFtQixDQUF3QyxDQUFDLE9BQU8sQ0FBQztBQUNyRyxNQUFNLFlBQVksR0FBSSxPQUFPLENBQUMsZ0JBQWdCLENBQXFDLENBQUMsT0FBTyxDQUFDO0FBQzVGLE1BQU0sbUJBQW1CLEdBQUksT0FBTyxDQUFDLHVCQUF1QixDQUE0QyxDQUFDLE9BQU8sQ0FBQztBQUNqSCxNQUFNLG1CQUFtQixHQUFJLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBNEMsQ0FBQyxPQUFPLENBQUM7QUFDakgsTUFBTSxvQkFBb0IsR0FBSSxPQUFPLENBQUMsd0JBQXdCLENBQTZDLENBQUMsT0FBTyxDQUFDO0FBQ3BILE1BQU0seUJBQXlCLEdBQUksT0FBTyxDQUFDLDZCQUE2QixDQUFrRCxDQUFDLE9BQU8sQ0FBQztBQUNuSSxNQUFNLFlBQVksR0FBSSxPQUFPLENBQUMsZ0JBQWdCLENBQXFDLENBQUMsT0FBTyxDQUFDO0FBQzVGLE1BQU0sWUFBWSxHQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBcUMsQ0FBQyxPQUFPLENBQUM7QUFDNUYsTUFBTSxZQUFZLEdBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFxQyxDQUFDLE9BQU8sQ0FBQztBQUM1Riw2RUFBNkUifQ==