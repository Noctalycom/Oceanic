import BaseEntitlement from "./BaseEntitlement";
import type Client from "../Client";
import type * as Types from "../types/namespaced";
/** Represents a test entitlement. */
export default class TestEntitlement extends BaseEntitlement {
    constructor(data: Types.Applications.RawTestEntitlement, client: Client);
    /** Delete this entitlement. */
    delete(): Promise<void>;
    toJSON(): Types.JSON.JSONTestEntitlement;
}
