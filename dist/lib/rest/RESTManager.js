"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module RESTManager */
const Applications_1 = tslib_1.__importDefault(require("../routes/Applications"));
const Channels_1 = tslib_1.__importDefault(require("../routes/Channels"));
const Guilds_1 = tslib_1.__importDefault(require("../routes/Guilds"));
const Interactions_1 = tslib_1.__importDefault(require("../routes/Interactions"));
const Lobbies_1 = tslib_1.__importDefault(require("../routes/Lobbies"));
const Miscellaneous_1 = tslib_1.__importDefault(require("../routes/Miscellaneous"));
const OAuth_1 = tslib_1.__importDefault(require("../routes/OAuth"));
const Users_1 = tslib_1.__importDefault(require("../routes/Users"));
const Webhooks_1 = tslib_1.__importDefault(require("../routes/Webhooks"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
const RequestHandler_1 = tslib_1.__importDefault(require("./RequestHandler"));
/** A manager for all rest actions. */
class RESTManager {
    _client;
    applications;
    channels;
    guilds;
    handler;
    interactions;
    lobbies;
    misc;
    oauth;
    users;
    webhooks;
    constructor(client, options) {
        this.applications = new Applications_1.default(this);
        this.channels = new Channels_1.default(this);
        this._client = client;
        this.guilds = new Guilds_1.default(this);
        this.handler = new RequestHandler_1.default(this, options);
        this.interactions = new Interactions_1.default(this);
        this.lobbies = new Lobbies_1.default(this);
        this.misc = new Miscellaneous_1.default(this);
        this.oauth = new OAuth_1.default(this);
        this.users = new Users_1.default(this);
        this.webhooks = new Webhooks_1.default(this);
    }
    get client() {
        return this._client;
    }
    get options() {
        return this.handler.options;
    }
    /** Alias for {@link RequestHandler#authRequest | RequestHandler#authRequest} */
    async authRequest(options) {
        return this.handler.authRequest(options);
    }
    /**
     * Get the gateway information related to your bot client.
     */
    async getBotGateway() {
        return this.authRequest({
            method: "GET",
            path: Routes.GATEWAY_BOT,
        }).then(data => ({
            url: data.url,
            shards: data.shards,
            sessionStartLimit: {
                total: data.session_start_limit.total,
                remaining: data.session_start_limit.remaining,
                resetAfter: data.session_start_limit.reset_after,
                maxConcurrency: data.session_start_limit.max_concurrency,
            },
        }));
    }
    /**
     * Get the gateway information.
     */
    async getGateway() {
        return this.request({
            method: "GET",
            path: Routes.GATEWAY,
        });
    }
    /** Alias for {@link RequestHandler#request | RequestHandler#request} */
    async request(options) {
        return this.handler.request(options);
    }
}
exports.default = RESTManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUkVTVE1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcmVzdC9SRVNUTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsa0ZBQWtEO0FBQ2xELDBFQUEwQztBQUMxQyxzRUFBc0M7QUFDdEMsa0ZBQWtEO0FBQ2xELHdFQUF3QztBQUN4QyxvRkFBb0Q7QUFDcEQsb0VBQW9DO0FBQ3BDLG9FQUFvQztBQUNwQywwRUFBMEM7QUFDMUMsK0RBQXlDO0FBRXpDLDhFQUE4QztBQUs5QyxzQ0FBc0M7QUFDdEMsTUFBcUIsV0FBVztJQUNwQixPQUFPLENBQVM7SUFDeEIsWUFBWSxDQUFlO0lBQzNCLFFBQVEsQ0FBVztJQUNuQixNQUFNLENBQVM7SUFDZixPQUFPLENBQWlCO0lBQ3hCLFlBQVksQ0FBZTtJQUMzQixPQUFPLENBQVU7SUFDakIsSUFBSSxDQUFnQjtJQUNwQixLQUFLLENBQVE7SUFDYixLQUFLLENBQVE7SUFDYixRQUFRLENBQVc7SUFDbkIsWUFBWSxNQUFjLEVBQUUsT0FBa0M7UUFDMUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLHNCQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtCQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHdCQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxzQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSx1QkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxlQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGVBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksa0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxnRkFBZ0Y7SUFDaEYsS0FBSyxDQUFDLFdBQVcsQ0FBYyxPQUEwRDtRQUNyRixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFJLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUF5QztZQUM1RCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBRSxNQUFNLENBQUMsV0FBVztTQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNiLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixpQkFBaUIsRUFBRTtnQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUs7Z0JBQ3JDLFNBQVMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUztnQkFDN0MsVUFBVSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXO2dCQUNoRCxjQUFjLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWU7YUFDM0Q7U0FDSixDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFtQztZQUNsRCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsd0VBQXdFO0lBQ3hFLEtBQUssQ0FBQyxPQUFPLENBQWMsT0FBNEM7UUFDbkUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBSSxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBQ0o7QUF4RUQsOEJBd0VDIn0=