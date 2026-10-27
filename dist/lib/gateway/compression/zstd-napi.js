"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const zstd = tslib_1.__importStar(require("zstd-napi"));
const Errors_1 = require("../../util/Errors");
const base_1 = tslib_1.__importDefault(require("./base"));
class ZstdCompressor extends base_1.default {
    _decompressQueue;
    stream;
    constructor(shard) {
        super(shard);
        this._decompressQueue = Promise.resolve();
        this.stream = new zstd.DecompressStream();
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
exports.default = ZstdCompressor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoienN0ZC1uYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL2dhdGV3YXkvY29tcHJlc3Npb24venN0ZC1uYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFrQztBQUVsQyw4Q0FBaUQ7QUFFakQsMERBQWdDO0FBSWhDLE1BQXFCLGNBQWUsU0FBUSxjQUFVO0lBQ2xELGdCQUFnQixDQUFnQjtJQUNoQyxNQUFNLENBQXdCO0lBQzlCLFlBQVksS0FBWTtRQUNwQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFZO1FBQ3pCLElBQUksTUFBTSxHQUFrQixJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDMUQsTUFBTSxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNoQyxNQUFNLE1BQU0sR0FBa0IsRUFBRSxDQUFDO2dCQUNqQyxNQUFNLE1BQU0sR0FBRyxDQUFDLEtBQWEsRUFBUSxFQUFFO29CQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QixDQUFDLENBQUM7Z0JBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxLQUFLLEVBQUUsQ0FBQzt3QkFDUixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUkscUJBQVksQ0FBQyw4QkFBOEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEcsTUFBTSxHQUFHLElBQUksQ0FBQzt3QkFDZCxPQUFPLEVBQUUsQ0FBQzt3QkFDVixPQUFPO29CQUNYLENBQUM7b0JBRUQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzVELE9BQU8sRUFBRSxDQUFDO2dCQUNkLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQzVCLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQXJDRCxpQ0FxQ0MifQ==