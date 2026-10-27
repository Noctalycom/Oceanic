"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_zlib_1 = require("node:zlib");
const Errors_1 = require("../../util/Errors");
const base_1 = tslib_1.__importDefault(require("./base"));
class ZlibNativeCompressor extends base_1.default {
    _chunks;
    _decompressQueue;
    stream;
    constructor(shard) {
        super(shard);
        this._chunks = [];
        this._decompressQueue = Promise.resolve();
        this.stream = (0, node_zlib_1.createInflate)();
        this.stream.on("error", (err) => {
            this.shard.client.emit("error", new Errors_1.GatewayError(`zlib error: ${String(err)}`, 0));
        });
    }
    async decompress(data) {
        const isComplete = data.length >= 4 && data.readUInt32BE(data.length - 4) === 0xFFFF;
        let result = null;
        this._decompressQueue = this._decompressQueue.then(async () => new Promise((resolve) => {
            const onData = (chunk) => {
                this._chunks.push(chunk);
            };
            this.stream.on("data", onData);
            this.stream.write(data, (error) => {
                this.stream.off("data", onData);
                if (error) {
                    this.shard.client.emit("error", new Errors_1.GatewayError(`Failed to decompress zlib: ${String(error)}`, 0));
                    result = null;
                    resolve();
                    return;
                }
                if (isComplete) {
                    result = this._chunks.length === 0 ? null : Buffer.concat(this._chunks);
                    this._chunks = [];
                }
                resolve();
            });
        }));
        await this._decompressQueue;
        return result;
    }
}
exports.default = ZlibNativeCompressor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemxpYi1uYXRpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvZ2F0ZXdheS9jb21wcmVzc2lvbi96bGliLW5hdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBd0Q7QUFFeEQsOENBQWlEO0FBRWpELDBEQUFnQztBQUloQyxNQUFxQixvQkFBcUIsU0FBUSxjQUFVO0lBQ3hELE9BQU8sQ0FBZ0I7SUFDdkIsZ0JBQWdCLENBQWdCO0lBQ2hDLE1BQU0sQ0FBVTtJQUNoQixZQUFZLEtBQVk7UUFDcEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUEseUJBQWEsR0FBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxxQkFBWSxDQUFDLGVBQWUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUFDLElBQVk7UUFDekIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQztRQUNyRixJQUFJLE1BQU0sR0FBa0IsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN6RixNQUFNLE1BQU0sR0FBRyxDQUFDLEtBQWEsRUFBUSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxLQUFLLEVBQUUsQ0FBQztvQkFDUixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUkscUJBQVksQ0FBQyw4QkFBOEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEcsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDZCxPQUFPLEVBQUUsQ0FBQztvQkFDVixPQUFPO2dCQUNYLENBQUM7Z0JBQ0QsSUFBSSxVQUFVLEVBQUUsQ0FBQztvQkFDYixNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN4RSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFDRCxPQUFPLEVBQUUsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNKLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQzVCLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQXhDRCx1Q0F3Q0MifQ==