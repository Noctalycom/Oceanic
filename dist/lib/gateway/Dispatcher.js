"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Dispatcher */
const DefaultDispatchEvents = tslib_1.__importStar(require("./events"));
class Dispatcher {
    manager;
    events = new Map();
    constructor(manager) {
        Object.defineProperty(this, "manager", {
            value: manager,
            writable: false,
            enumerable: false,
            configurable: false,
        });
        const options = this.manager.options.dispatcher;
        const type = options.blacklist !== null ? "blacklist" : (options.whitelist !== null ? "whitelist" : "none");
        for (const [event, fn] of Object.entries(DefaultDispatchEvents)) {
            if (type === "none"
                || (type === "whitelist" && options.whitelist?.includes(event))
                || (type === "blacklist" && !options.blacklist?.includes(event))) {
                this.register(event, fn);
            }
        }
    }
    handle(data, shard) {
        const event = data.t;
        if (!this.events.has(event))
            return;
        const arr = this.events.get(event);
        for (const fn of arr)
            fn(data.d, shard);
    }
    register(event, fn, replace = false) {
        if (!this.events.has(event))
            this.events.set(event, []);
        const arr = this.events.get(event);
        if (replace && arr.length !== 0)
            arr.splice(0, arr.length);
        arr.push(fn);
    }
    unregister(event, fn) {
        if (!this.events.has(event))
            return;
        const arr = this.events.get(event);
        if (fn) {
            const index = arr.indexOf(fn);
            if (index !== -1)
                arr.splice(index, 1);
        }
        else
            arr.splice(0, arr.length);
    }
}
exports.default = Dispatcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9nYXRld2F5L0Rpc3BhdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQXlCO0FBQ3pCLHdFQUFrRDtBQVdsRCxNQUFxQixVQUFVO0lBQ25CLE9BQU8sQ0FBZ0I7SUFDL0IsTUFBTSxHQUFHLElBQUksR0FBRyxFQUEwQyxDQUFDO0lBQzNELFlBQVksT0FBcUI7UUFDN0IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ25DLEtBQUssRUFBRSxPQUFPO1lBQ2QsUUFBUSxFQUFFLEtBQUs7WUFDZixVQUFVLEVBQUUsS0FBSztZQUNqQixZQUFZLEVBQUUsS0FBSztTQUN0QixDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDaEQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1RyxLQUFLLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBNkMsRUFBRSxDQUFDO1lBQzFHLElBQUksSUFBSSxLQUFLLE1BQU07bUJBQ1osQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO21CQUM1RCxDQUFDLElBQUksS0FBSyxXQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ25FLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVPLE1BQU0sQ0FBQyxJQUF3QyxFQUFFLEtBQVk7UUFDakUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTztRQUNwQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUUsQ0FBQztRQUNwQyxLQUFLLE1BQU0sRUFBRSxJQUFJLEdBQUc7WUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsUUFBUSxDQUEwQixLQUFRLEVBQUUsRUFBdUIsRUFBRSxPQUFPLEdBQUcsS0FBSztRQUNoRixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBRSxDQUFDO1FBQ3BDLElBQUksT0FBTyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQVcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxVQUFVLENBQTBCLEtBQVEsRUFBRSxFQUF3QjtRQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTztRQUNwQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUUsQ0FBQztRQUNwQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ0wsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFXLENBQUMsQ0FBQztZQUN2QyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUM7Z0JBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQzs7WUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNKO0FBN0NELDZCQTZDQyJ9