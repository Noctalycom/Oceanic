/** @module MediaChannel */
import ThreadOnlyChannel from "./ThreadOnlyChannel";
import type Client from "../Client";
import type { ChannelTypes } from "../Constants";
import type * as Types from "../types/namespaced";
/** Represents a media channel. */
export default class MediaChannel extends ThreadOnlyChannel {
    type: ChannelTypes.GUILD_MEDIA;
    constructor(data: Types.Channels.RawMediaChannel, client: Client);
    toJSON(): Types.JSON.JSONMediaChannel;
}
