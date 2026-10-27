"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module PrimaryGuild */
const Routes = tslib_1.__importStar(require("../util/Routes"));
/** Represents a primary guild. */
class PrimaryGuild {
    /** The badge hash of this clan. */
    badge;
    client;
    identityEnabled;
    identityGuildID;
    /** The tag of this clan, shown beside messages. */
    tag;
    constructor(data, client) {
        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false,
            writable: false,
            configurable: false,
        });
        this.badge = data.badge;
        this.identityEnabled = data.identity_enabled;
        this.identityGuildID = data.identity_guild_id;
        this.tag = data.tag;
        this.update(data);
    }
    update(data) {
        if (data.badge !== undefined) {
            this.badge = data.badge;
        }
        if (data.identity_enabled !== undefined) {
            this.identityEnabled = data.identity_enabled;
        }
        if (data.identity_guild_id !== undefined) {
            this.identityGuildID = data.identity_guild_id;
        }
        if (data.tag !== undefined) {
            this.tag = data.tag;
        }
    }
    /**
     * The url of this guild's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    badgeURL(format, size) {
        if (this.identityGuildID === null || this.badge === null)
            return null;
        return this.client.util.formatImage(Routes.CLAN_ICON(this.identityGuildID, this.badge), format, size);
    }
    toJSON() {
        return {
            badge: this.badge,
            identityEnabled: this.identityEnabled,
            identityGuildID: this.identityGuildID,
            tag: this.tag,
        };
    }
}
exports.default = PrimaryGuild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpbWFyeUd1aWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvUHJpbWFyeUd1aWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQiwrREFBeUM7QUFNekMsa0NBQWtDO0FBQ2xDLE1BQXFCLFlBQVk7SUFDN0IsbUNBQW1DO0lBQ25DLEtBQUssQ0FBZ0I7SUFDckIsTUFBTSxDQUFVO0lBQ2hCLGVBQWUsQ0FBaUI7SUFDaEMsZUFBZSxDQUFnQjtJQUMvQixtREFBbUQ7SUFDbkQsR0FBRyxDQUFnQjtJQUNuQixZQUFZLElBQXlCLEVBQUUsTUFBYztRQUNqRCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDbEMsS0FBSyxFQUFFLE1BQU07WUFDYixVQUFVLEVBQUUsS0FBSztZQUNqQixRQUFRLEVBQUUsS0FBSztZQUNmLFlBQVksRUFBRSxLQUFLO1NBQ3RCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUM5QyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRVMsTUFBTSxDQUFDLElBQWtDO1FBQy9DLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pELENBQUM7UUFFRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRCxDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN4QixDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxRQUFRLENBQUMsTUFBb0IsRUFBRSxJQUFhO1FBQ3hDLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDdEUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1NBQ2hCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUExREQsK0JBMERDIn0=