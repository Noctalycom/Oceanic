/** @module RESTManager */
import Applications from "../routes/Applications";
import Channels from "../routes/Channels";
import Guilds from "../routes/Guilds";
import Interactions from "../routes/Interactions";
import Lobbies from "../routes/Lobbies";
import Miscellaneous from "../routes/Miscellaneous";
import OAuth from "../routes/OAuth";
import Users from "../routes/Users";
import Webhooks from "../routes/Webhooks";
import RequestHandler from "./RequestHandler";
import type Client from "../Client";
import type * as Types from "../types/namespaced";
/** A manager for all rest actions. */
export default class RESTManager {
    private _client;
    applications: Applications;
    channels: Channels;
    guilds: Guilds;
    handler: RequestHandler;
    interactions: Interactions;
    lobbies: Lobbies;
    misc: Miscellaneous;
    oauth: OAuth;
    users: Users;
    webhooks: Webhooks;
    constructor(client: Client, options?: Types.Client.RESTOptions);
    get client(): Client;
    get options(): Types.Client.RESTOptions;
    /** Alias for {@link RequestHandler#authRequest | RequestHandler#authRequest} */
    authRequest<T = unknown>(options: Omit<Types.RequestHandler.RequestOptions, "auth">): Promise<T>;
    /**
     * Get the gateway information related to your bot client.
     */
    getBotGateway(): Promise<Types.Gateway.GetBotGatewayResponse>;
    /**
     * Get the gateway information.
     */
    getGateway(): Promise<Types.Gateway.GetGatewayResponse>;
    /** Alias for {@link RequestHandler#request | RequestHandler#request} */
    request<T = unknown>(options: Types.RequestHandler.RequestOptions): Promise<T>;
}
