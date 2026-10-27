"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module TextableVoiceChannel */
const TypedCollection_1 = tslib_1.__importDefault(require("../util/TypedCollection"));
const Member_1 = tslib_1.__importDefault(require("./Member"));
const TextableChannel_1 = tslib_1.__importDefault(require("./TextableChannel"));
/** Represents a textable voice channel. */
class TextableVoiceChannel extends TextableChannel_1.default {
    /** The bitrate of the stage channel. */
    bitrate;
    /** The id of the voice region of the channel, `null` is automatic. */
    rtcRegion;
    /** The maximum number of members in this voice channel, `0` is unlimited. */
    userLimit;
    /** The [video quality mode](https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes) of this channel. */
    videoQualityMode;
    voiceMembers;
    constructor(data, client) {
        super(data, client);
        this.bitrate = data.bitrate;
        this.rtcRegion = data.rtc_region;
        this.userLimit = data.user_limit;
        this.videoQualityMode = data.video_quality_mode;
        this.voiceMembers = new TypedCollection_1.default(Member_1.default, client, this.client.util._getLimit("voiceMembers", this.id));
        this.update(data);
    }
    /** The voice states related to this channel. */
    get voiceStates() {
        return (this["_cachedGuild"]?.voiceStates.filter(state => state.channelID === this.id) ?? []);
    }
    update(data) {
        super.update(data);
        if (data.bitrate !== undefined) {
            this.bitrate = data.bitrate;
        }
        if (data.rtc_region !== undefined) {
            this.rtcRegion = data.rtc_region;
        }
        if (data.user_limit !== undefined) {
            this.userLimit = data.user_limit;
        }
        if (data.video_quality_mode !== undefined) {
            this.videoQualityMode = data.video_quality_mode;
        }
    }
    /**
     * Join this stage channel.
     * @param options The options to join the channel with.
     */
    join(options) {
        return this.client.joinVoiceChannel({
            ...options,
            voiceAdapterCreator: this.guild.voiceAdapterCreator,
            guildID: this.guildID,
            channelID: this.id,
        });
    }
    /** Leave this stage channel. */
    leave() {
        this.client.leaveVoiceChannel(this.guildID);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            bitrate: this.bitrate,
            rtcRegion: this.rtcRegion,
            type: this.type,
            userLimit: this.userLimit,
            videoQualityMode: this.videoQualityMode,
            voiceMembers: this.voiceMembers.map(member => member.id),
        };
    }
}
exports.default = TextableVoiceChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dGFibGVWb2ljZUNoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9UZXh0YWJsZVZvaWNlQ2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsc0ZBQXNEO0FBRXRELDhEQUE4QjtBQUM5QixnRkFBZ0Q7QUFVaEQsMkNBQTJDO0FBQzNDLE1BQXFCLG9CQUFnRyxTQUFRLHlCQUFrQjtJQUMzSSx3Q0FBd0M7SUFDeEMsT0FBTyxDQUFTO0lBQ2hCLHNFQUFzRTtJQUN0RSxTQUFTLENBQWdCO0lBRXpCLDZFQUE2RTtJQUM3RSxTQUFTLENBQVM7SUFDbEIsMElBQTBJO0lBQzFJLGdCQUFnQixDQUFvQjtJQUNwQyxZQUFZLENBQXFFO0lBQ2pGLFlBQVksSUFBcUUsRUFBRSxNQUFjO1FBQzdGLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNoRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUkseUJBQWUsQ0FBQyxnQkFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELGdEQUFnRDtJQUNoRCxJQUFJLFdBQVc7UUFDWCxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQXlCLENBQUM7SUFDMUgsQ0FBQztJQUVrQixNQUFNLENBQUMsSUFBOEU7UUFDcEcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2hDLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3JDLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3JDLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ3BELENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxDQUFDLE9BQW1HO1FBQ3BHLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztZQUNoQyxHQUFHLE9BQU87WUFFVixtQkFBbUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQjtZQUNuRCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxnQ0FBZ0M7SUFDaEMsS0FBSztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFUSxNQUFNO1FBQ1gsT0FBTztZQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3ZDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7U0FDM0QsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXhFRCx1Q0F3RUMifQ==