/// <reference types="node" />
/** @module Base */
import { inspect } from "node:util";
import type Client from "../Client";
import type * as Types from "../types/namespaced";
/** A base class which most other classes extend. */
export default abstract class Base {
    client: Client;
    id: string;
    constructor(id: string, client: Client);
    static generateID(timestamp?: number | Date): string;
    static getCreatedAt(id: string): Date;
    static getDiscordEpoch(id: string): number;
    get createdAt(): Date;
    protected update(data: unknown): void;
    /** @hidden */
    [inspect.custom](): this;
    toJSON(): Types.JSON.JSONBase;
    toString(): string;
}
