/// <reference types="node" />
import type { RESTMethod } from "../Constants";
import type * as Types from "../types/namespaced";
/** An HTTP error received from Discord. */
export default class DiscordHTTPError extends Error {
    method: RESTMethod;
    name: string;
    resBody: Record<string, unknown> | null;
    response: Response;
    constructor(res: Response, resBody: unknown, method: RESTMethod, stack?: string);
    get headers(): Headers;
    get path(): string;
    get status(): number;
    get statusText(): string;
    toJSON(): Types.JSON.JSONDiscordHTTPError;
}
