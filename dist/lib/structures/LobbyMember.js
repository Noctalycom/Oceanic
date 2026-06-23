"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module LobbyMember */
const Base_1 = tslib_1.__importDefault(require("./Base"));
class LobbyMember extends Base_1.default {
    flags;
    lobbyID;
    metadata;
    constructor(data, client, lobbyID) {
        super(data.id, client);
        this.flags = data.flags;
        this.lobbyID = lobbyID;
        this.metadata = data.metadata;
    }
    /**
     * Remove this member from the lobby.
     */
    async remove() {
        return this.client.rest.lobbies.removeMember(this.lobbyID, this.id);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            flags: this.flags,
            lobbyID: this.lobbyID,
            metadata: this.metadata
        };
    }
}
exports.default = LobbyMember;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9iYnlNZW1iZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9Mb2JieU1lbWJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsMERBQTBCO0FBSTFCLE1BQXFCLFdBQVksU0FBUSxjQUFJO0lBQ3pDLEtBQUssQ0FBVTtJQUNmLE9BQU8sQ0FBUztJQUNoQixRQUFRLENBQWlDO0lBQ3pDLFlBQVksSUFBa0MsRUFBRSxNQUFjLEVBQUUsT0FBZTtRQUMzRSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFUSxNQUFNO1FBQ1gsT0FBTztZQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixLQUFLLEVBQUssSUFBSSxDQUFDLEtBQUs7WUFDcEIsT0FBTyxFQUFHLElBQUksQ0FBQyxPQUFPO1lBQ3RCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUMxQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBMUJELDhCQTBCQyJ9