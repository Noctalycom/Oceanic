/// <reference types="node" />
/// <reference types="node" />
import ZlibSync from "zlib-sync";
import Compressor from "./base";
import type Shard from "../Shard";
export default class ZlibSyncCompressor extends Compressor {
    _sharedZLib: ZlibSync.Inflate;
    constructor(shard: Shard);
    decompress(data: Buffer): Promise<Buffer | null>;
}
