"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
// @ts-ignore only in node >=22.15.0
const node_zlib_1 = require("node:zlib");
const Errors_1 = require("../../util/Errors");
const base_1 = tslib_1.__importDefault(require("./base"));
class ZstdNativeCompressor extends base_1.default {
    _decompressQueue;
    stream;
    constructor(shard) {
        super(shard);
        this._decompressQueue = Promise.resolve();
        this.stream = (0, node_zlib_1.createZstdDecompress)({ chunkSize: 65535 });
        // @ts-ignore only in node >=22.15.0
        this.stream.on("error", (err) => {
            this.shard.client.emit("error", new Errors_1.GatewayError(`zstd error: ${String(err)}`, 0));
        });
    }
    async decompress(data) {
        let result = null;
        this._decompressQueue = this._decompressQueue.then(async () => {
            await new Promise((resolve) => {
                const chunks = [];
                const onData = (chunk) => {
                    chunks.push(chunk);
                };
                this.stream.on("data", onData);
                // @ts-ignore only in node >=22.15.0
                this.stream.write(data, "binary", (error) => {
                    this.stream.off("data", onData);
                    if (error) {
                        this.shard.client.emit("error", new Errors_1.GatewayError(`Failed to decompress zstd: ${String(error)}`, 0));
                        result = null;
                        resolve();
                        return;
                    }
                    result = chunks.length === 0 ? null : Buffer.concat(chunks);
                    resolve();
                });
            });
        });
        await this._decompressQueue;
        return result;
    }
}
exports.default = ZstdNativeCompressor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoienN0ZC1uYXRpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvZ2F0ZXdheS9jb21wcmVzc2lvbi96c3RkLW5hdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4S0FBOEs7QUFDOUssb0NBQW9DO0FBQ3BDLHlDQUFzRTtBQUV0RSw4Q0FBaUQ7QUFFakQsMERBQWdDO0FBSWhDLE1BQXFCLG9CQUFxQixTQUFRLGNBQVU7SUFDeEQsZ0JBQWdCLENBQWdCO0lBQ2hDLE1BQU0sQ0FBaUI7SUFDdkIsWUFBWSxLQUFZO1FBQ3BCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFBLGdDQUFvQixFQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDekQsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxxQkFBWSxDQUFDLGVBQWUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUFDLElBQVk7UUFDekIsSUFBSSxNQUFNLEdBQWtCLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUMxRCxNQUFNLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ2hDLE1BQU0sTUFBTSxHQUFrQixFQUFFLENBQUM7Z0JBQ2pDLE1BQU0sTUFBTSxHQUFHLENBQUMsS0FBYSxFQUFRLEVBQUU7b0JBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQztnQkFFRixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQy9CLG9DQUFvQztnQkFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ2hDLElBQUksS0FBSyxFQUFFLENBQUM7d0JBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLHFCQUFZLENBQUMsOEJBQThCLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BHLE1BQU0sR0FBRyxJQUFJLENBQUM7d0JBQ2QsT0FBTyxFQUFFLENBQUM7d0JBQ1YsT0FBTztvQkFDWCxDQUFDO29CQUVELE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM1RCxPQUFPLEVBQUUsQ0FBQztnQkFDZCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUM1QixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0o7QUExQ0QsdUNBMENDIn0=