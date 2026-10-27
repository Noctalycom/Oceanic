"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module REST/Users */
const ExtendedUser_1 = tslib_1.__importDefault(require("../structures/ExtendedUser"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
/** Various methods for interacting with users. Located at {@link Client#rest | Client#rest}{@link RESTManager#users | .users}. */
class Users {
    _manager;
    constructor(manager) {
        this._manager = manager;
    }
    /** Alias for {@link REST/Channels#createDM | Channels#createDM}. */
    get createDM() {
        return this._manager.channels.createDM.bind(this._manager.channels);
    }
    /**
     * Edit the currently authenticated user.
     * @param options The options to edit with.
     * @caching This method **does not** cache its result.
     */
    async editSelf(options) {
        options = this._manager.client.util._freeze(options);
        let avatar = options.avatar;
        let banner = options.banner;
        if (avatar) {
            avatar = this._manager.client.util._convertImage(avatar, "avatar");
        }
        if (banner) {
            banner = this._manager.client.util._convertImage(banner, "banner");
        }
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.USER("@me"),
            json: {
                avatar,
                banner,
                username: options.username,
            },
        }).then(data => new ExtendedUser_1.default(data, this._manager.client));
    }
    /**
     * Get a user.
     * @param userID the ID of the user
     * @caching This method **does** cache its result.
     * @caches {@link Client#users | Client#users}
     */
    async get(userID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.USER(userID),
        }).then(data => this._manager.client.users.update(data));
    }
    /**
     * Leave a guild.
     * @param guildID The ID of the guild to leave.
     * @caching This method **does not** cache its result.
     */
    async leaveGuild(guildID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.OAUTH_GUILD(guildID),
        });
    }
}
exports.default = Users;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcm91dGVzL1VzZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlCQUF5QjtBQUN6QixzRkFBc0Q7QUFDdEQsK0RBQXlDO0FBT3pDLGtJQUFrSTtBQUNsSSxNQUFxQixLQUFLO0lBQ2QsUUFBUSxDQUFjO0lBQzlCLFlBQVksT0FBb0I7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVELG9FQUFvRTtJQUNwRSxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBd0M7UUFDbkQsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM1QixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRTVCLElBQUksTUFBTSxFQUFFLENBQUM7WUFDVCxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdkUsQ0FBQztRQUVELElBQUksTUFBTSxFQUFFLENBQUM7WUFDVCxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdkUsQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQTJCO1lBQ3ZELE1BQU0sRUFBRSxPQUFPO1lBQ2YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3hCLElBQUksRUFBRTtnQkFDRixNQUFNO2dCQUNOLE1BQU07Z0JBQ04sUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2FBQzdCO1NBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksc0JBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBYztRQUNwQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFzQjtZQUNsRCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFlO1FBQzVCLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQU87WUFDbEMsTUFBTSxFQUFFLFFBQVE7WUFDaEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1NBQ3BDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQWpFRCx3QkFpRUMifQ==