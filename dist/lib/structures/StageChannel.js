"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module StageChannel */
const TextableVoiceChannel_1 = tslib_1.__importDefault(require("./TextableVoiceChannel"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/** Represents a guild stage channel. */
class StageChannel extends TextableVoiceChannel_1.default {
    constructor(data, client) {
        super(data, client);
    }
    /**
     * Create a stage instance on this channel.
     * @param options The options for creating the stage instance.
     */
    async createStageInstance(options) {
        return this.client.rest.channels.createStageInstance(this.id, options);
    }
    /**
     * Delete the stage instance on this channel.
     * @param reason The reason for deleting the stage instance.
     */
    async deleteStageInstance(reason) {
        return this.client.rest.channels.deleteStageInstance(this.id, reason);
    }
    /**
     * Edit the stage instance on this channel.
     * @param options The options for editing the stage instance.
     */
    async editStageInstance(options) {
        return this.client.rest.channels.editStageInstance(this.id, options);
    }
    /**
     * Get the stage instance associated with this channel.
     */
    async getStageInstance() {
        return this.client.rest.channels.getStageInstance(this.id);
    }
    toJSON() {
        return super.toJSON();
    }
}
exports.default = StageChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhZ2VDaGFubmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvU3RhZ2VDaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQiwwRkFBMEQ7QUFNMUQsNkRBQTZEO0FBQzdELGFBQWE7QUFFYix3Q0FBd0M7QUFDeEMsTUFBcUIsWUFBYSxTQUFRLDhCQUFrQztJQUV4RSxZQUFZLElBQW9DLEVBQUUsTUFBYztRQUM1RCxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsbUJBQW1CLENBQUMsT0FBZ0Q7UUFDdEUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLG1CQUFtQixDQUFDLE1BQWU7UUFDckMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE9BQThDO1FBQ2xFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPLEtBQUssQ0FBQyxNQUFNLEVBQWlDLENBQUM7SUFDekQsQ0FBQztDQUNKO0FBeENELCtCQXdDQyJ9