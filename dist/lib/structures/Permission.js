"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module Permission */
const Constants_1 = require("../Constants");
/** Represents a permission. */
class Permission {
    _json;
    /** The allowed permissions for this permission instance. */
    allow;
    /** The denied permissions for this permission instance. */
    deny;
    constructor(allow, deny = 0n) {
        this.allow = BigInt(allow);
        this.deny = BigInt(deny);
        Object.defineProperty(this, "#json", {
            value: undefined,
            enumerable: false,
            writable: true,
            configurable: false,
        });
    }
    /** A key-value map of permission to if it's been allowed or denied (not present if neither) */
    get json() {
        if (this._json) {
            return this._json;
        }
        else {
            const json = {};
            for (const perm of Object.keys(Constants_1.Permissions)) {
                if (this.allow & Constants_1.Permissions[perm]) {
                    json[perm] = true;
                }
                else if (this.deny & Constants_1.Permissions[perm]) {
                    json[perm] = false;
                }
            }
            return (this._json = json);
        }
    }
    /**
     * Check if this permissions instance has the given permissions allowed
     * @param permissions The permissions to check for.
     */
    has(...permissions) {
        for (const perm of permissions) {
            if (typeof perm === "bigint") {
                if ((this.allow & perm) !== perm) {
                    return false;
                }
            }
            else if (!(this.allow & Constants_1.Permissions[perm])) {
                return false;
            }
        }
        return true;
    }
    toJSON() {
        return {
            allow: this.allow.toString(),
            deny: this.deny.toString(),
        };
    }
    toString() {
        return `[${this.constructor.name} +${this.allow} -${this.deny}]`;
    }
}
exports.default = Permission;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVybWlzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1Blcm1pc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBeUI7QUFDekIsNENBQW1GO0FBSW5GLCtCQUErQjtBQUMvQixNQUFxQixVQUFVO0lBQ25CLEtBQUssQ0FBaUU7SUFDOUUsNERBQTREO0lBQzVELEtBQUssQ0FBUztJQUNkLDJEQUEyRDtJQUMzRCxJQUFJLENBQVM7SUFDYixZQUFZLEtBQXNCLEVBQUUsT0FBd0IsRUFBRTtRQUMxRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDakMsS0FBSyxFQUFFLFNBQVM7WUFDaEIsVUFBVSxFQUFFLEtBQUs7WUFDakIsUUFBUSxFQUFFLElBQUk7WUFDZCxZQUFZLEVBQUUsS0FBSztTQUN0QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsK0ZBQStGO0lBQy9GLElBQUksSUFBSTtRQUNKLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFBTSxDQUFDO1lBQ0osTUFBTSxJQUFJLEdBQXVELEVBQUUsQ0FBQztZQUNwRSxLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQVcsQ0FBb0MsRUFBRSxDQUFDO2dCQUM3RSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsdUJBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixDQUFDO3FCQUFNLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyx1QkFBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLENBQUM7WUFDTCxDQUFDO1lBRUQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSCxHQUFHLENBQUMsR0FBRyxXQUE0QztRQUMvQyxLQUFLLE1BQU0sSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQzdCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO29CQUMvQixPQUFPLEtBQUssQ0FBQztnQkFDakIsQ0FBQztZQUNMLENBQUM7aUJBQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyx1QkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDM0MsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQztRQUNMLENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU87WUFDSCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDNUIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1NBQzdCLENBQUM7SUFDTixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztJQUNyRSxDQUFDO0NBQ0o7QUEvREQsNkJBK0RDIn0=