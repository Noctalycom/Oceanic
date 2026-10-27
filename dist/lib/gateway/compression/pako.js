"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pako_1 = require("pako");
const Errors_1 = require("../../util/Errors");
const base_1 = tslib_1.__importDefault(require("./base"));
class PakoCompression extends base_1.default {
    _sharedZLib;
    constructor(shard) {
        super(shard);
        this._sharedZLib = new pako_1.Inflate({ chunkSize: 128 * 1024 });
    }
    async decompress(data) {
        if (data.length >= 4 && data.readUInt32BE(data.length - 4) === 0xFFFF) {
            // a sync flush moves everything decompressed so far into chunks
            this._sharedZLib.push(data, pako_1.Z_SYNC_FLUSH);
            if (this._sharedZLib.err) {
                this.shard.client.emit("error", new Errors_1.GatewayError(`zlib error ${this._sharedZLib.err}: ${this._sharedZLib.msg}`, 0));
                return null;
            }
            data = Buffer.concat(this._sharedZLib.chunks);
            this._sharedZLib.chunks = [];
            return data;
        }
        else {
            this._sharedZLib.push(data, false);
            return null;
        }
    }
}
exports.default = PakoCompression;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFrby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9nYXRld2F5L2NvbXByZXNzaW9uL3Bha28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQTZDO0FBRTdDLDhDQUFpRDtBQUVqRCwwREFBZ0M7QUFJaEMsTUFBcUIsZUFBZ0IsU0FBUSxjQUFVO0lBQ25ELFdBQVcsQ0FBVTtJQUNyQixZQUFZLEtBQVk7UUFDcEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLFNBQVMsRUFBRSxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFZO1FBQ3pCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQ3BFLGdFQUFnRTtZQUNoRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsbUJBQVksQ0FBQyxDQUFDO1lBQzFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLHFCQUFZLENBQUMsY0FBYyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BILE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFFRCxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUU3QixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO2FBQU0sQ0FBQztZQUNKLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNuQyxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztDQUNKO0FBekJELGtDQXlCQyJ9