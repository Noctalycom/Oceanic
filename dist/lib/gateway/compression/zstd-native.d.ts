/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import Compression from "./base";
import type Shard from "../Shard";
import { type ZstdDecompress } from "node:zlib";
export default class ZstdNativeCompression extends Compression {
    _decompressQueue: Promise<void>;
    stream: ZstdDecompress;
    constructor(shard: Shard);
    decompress(data: Buffer): Promise<Buffer | null>;
}
