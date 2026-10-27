"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Time {
    client;
    /** When the first shard connect happened, reset if all shards disconnect. */
    connect = null;
    /** When all shards disconnected, reset on any shard connect. */
    disconnect = null;
    /** When the first shard ready happened, reset if all shards disconnect. */
    ready = null;
    /** When the most recent shard connect happened. */
    shardConnect = null;
    /** When the most recent shard disconnect happened. */
    shardDisconnect = null;
    /** When the most recent shard pre-ready happened. */
    shardPreReady = null;
    /** When the most recent shard ready happened. */
    shardReady = null;
    /** When the most recent shard resume happened. */
    shardResume = null;
    /** When the client started. */
    start = null;
    constructor(client) {
        Object.defineProperty(this, "client", {
            value: client,
            writable: false,
            enumerable: false,
            configurable: false,
        });
    }
    /** @internal */
    _setConnect(value) {
        this.shardConnect = value;
        this.disconnect = null;
        this.connect ??= value;
    }
    /** @internal */
    _setDisconnect(value) {
        this.shardDisconnect = value;
        const noneReady = this.client.shards.every(shard => !shard.ready);
        if (noneReady) {
            this.connect = null;
            this.disconnect = value;
            this.ready = null;
            this.start = null;
        }
    }
    /** @internal */
    _setPreReady(value) {
        this.shardPreReady = value;
    }
    /** @internal */
    _setReady(value) {
        this.shardReady = value;
        this.ready ??= value;
    }
    /** @internal */
    _setResume(value) {
        this.shardResume = value;
    }
    /** @internal */
    _setStart(value) {
        this.start ??= value;
    }
    reset() {
        this.connect = null;
        this.disconnect = null;
        this.ready = null;
        this.start = null;
        this.shardConnect = null;
        this.shardDisconnect = null;
        this.shardPreReady = null;
        this.shardReady = null;
        this.shardResume = null;
    }
    /** @internal */
    set(type, value) {
        switch (type) {
            case "connect": {
                this._setConnect(value);
                return;
            }
            case "disconnect": {
                this._setDisconnect(value);
                return;
            }
            case "preReady": {
                this._setPreReady(value);
                return;
            }
            case "ready": {
                this._setReady(value);
                return;
            }
            case "resume": {
                this._setResume(value);
                return;
            }
            case "start": {
                this._setStart(value);
                return;
            }
        }
    }
}
exports.default = Time;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlsL1RpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxNQUFxQixJQUFJO0lBQ2IsTUFBTSxDQUFVO0lBQ3hCLDZFQUE2RTtJQUM3RSxPQUFPLEdBQWtCLElBQUksQ0FBQztJQUM5QixnRUFBZ0U7SUFDaEUsVUFBVSxHQUFrQixJQUFJLENBQUM7SUFDakMsMkVBQTJFO0lBQzNFLEtBQUssR0FBa0IsSUFBSSxDQUFDO0lBQzVCLG1EQUFtRDtJQUNuRCxZQUFZLEdBQWtCLElBQUksQ0FBQztJQUNuQyxzREFBc0Q7SUFDdEQsZUFBZSxHQUFrQixJQUFJLENBQUM7SUFDdEMscURBQXFEO0lBQ3JELGFBQWEsR0FBa0IsSUFBSSxDQUFDO0lBQ3BDLGlEQUFpRDtJQUNqRCxVQUFVLEdBQWtCLElBQUksQ0FBQztJQUNqQyxrREFBa0Q7SUFDbEQsV0FBVyxHQUFrQixJQUFJLENBQUM7SUFDbEMsK0JBQStCO0lBQy9CLEtBQUssR0FBa0IsSUFBSSxDQUFDO0lBQzVCLFlBQVksTUFBYztRQUN0QixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDbEMsS0FBSyxFQUFFLE1BQU07WUFDYixRQUFRLEVBQUUsS0FBSztZQUNmLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFlBQVksRUFBRSxLQUFLO1NBQ3RCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxnQkFBZ0I7SUFDUixXQUFXLENBQUMsS0FBYTtRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0JBQWdCO0lBQ1IsY0FBYyxDQUFDLEtBQWE7UUFDaEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsTUFB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