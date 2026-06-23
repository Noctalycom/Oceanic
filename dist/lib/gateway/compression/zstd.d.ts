/// <reference types="node" />
/// <reference types="node" />
import Compression from "./base";
import type Shard from "../Shard";
import * as zstd from "zstd-napi";
export default class ZstdCompression extends Compression {
    _decompressQueue: Promise<void>;
    stream: zstd.DecompressStream;
    constructor(shard: Shard);
    decompress(data: Buffer): Promise<Buffer | null>;
}
