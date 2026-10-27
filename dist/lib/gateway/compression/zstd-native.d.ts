/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { type ZstdDecompress } from "node:zlib";
import Compressor from "./base";
import type Shard from "../Shard";
export default class ZstdNativeCompressor extends Compressor {
    _decompressQueue: Promise<void>;
    stream: ZstdDecompress;
    constructor(shard: Shard);
    decompress(data: Buffer): Promise<Buffer | null>;
}
