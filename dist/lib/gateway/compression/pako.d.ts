/// <reference types="node" />
/// <reference types="node" />
import { Inflate } from "pako";
import Compressor from "./base";
import type Shard from "../Shard";
export default class PakoCompression extends Compressor {
    _sharedZLib: Inflate;
    constructor(shard: Shard);
    decompress(data: Buffer): Promise<Buffer | null>;
}
