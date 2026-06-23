/** @module Channel */
import Base from "./Base";
import type * as Types from "../types/namespaced";
import { ChannelTypes } from "../Constants";
import type Client from "../Client";
/** Represents a channel. */
export default class Channel extends Base {
    /** The [type](https://discord.com/developers/docs/resources/channel#channel-object-channel-types) of this channel. */
    type: ChannelTypes;
    constructor(data: Types.Channels.RawChannel, client: Client);
    static from<T extends Types.Channels.AnyChannel = Types.Channels.AnyChannel>(data: Types.Channels.RawChannel, client: Client): T;
    /** A string that will mention this channel. */
    get mention(): string;
    /**
     * Close a direct message, leave a group channel, or delete a guild channel.
     */
    delete(): Promise<void>;
    toJSON(): Types.JSON.JSONChannel;
}
