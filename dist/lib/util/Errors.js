"use strict";
/** @module Errors */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrozenModificationError = exports.NotImplementedError = exports.RateLimitedError = exports.GatewayError = exports.DependencyError = exports.WrapperError = exports.UncachedError = exports.UncaughtError = void 0;
/** An error that is thrown when we encounter an error, and no `error` listeners are present. */
class UncaughtError extends Error {
    name = "UncaughtError";
    constructor(error) {
        super("Uncaught 'error' event", { cause: error });
    }
}
exports.UncaughtError = UncaughtError;
/** An error ancountered when an object is unexpectedly not cached. */
class UncachedError extends Error {
    name = "UncachedError";
    constructor(...args) {
        let message;
        if (args.length === 1) {
            [message] = args;
        }
        else {
            const [clazz, property, intent, client] = args;
            message = client?.options.restMode ? `${clazz.constructor.name}#${property} is not present in rest mode.` : `${clazz.constructor.name}#${property} is not present if you don't have the ${intent} intent.`;
        }
        super(message);
    }
}
exports.UncachedError = UncachedError;
/** An error encountered within {@link InteractionOptionsWrapper | InteractionOptionsWrapper} & {@link SelectMenuValuesWrapper | SelectMenuValuesWrapper}. */
class WrapperError extends Error {
    name = "WrapperError";
    constructor(message) {
        super(message);
    }
}
exports.WrapperError = WrapperError;
/** An error encountered when a needed dependency is missing. */
class DependencyError extends Error {
    name = "DependencyError";
    constructor(message) {
        super(message);
    }
}
exports.DependencyError = DependencyError;
/** A gateway error. */
class GatewayError extends Error {
    code;
    name = "GatewayError";
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.GatewayError = GatewayError;
class RateLimitedError extends Error {
    delay;
    name = "RateLimitedError";
    constructor(message, delay) {
        super(message);
        this.delay = delay;
    }
}
exports.RateLimitedError = RateLimitedError;
class NotImplementedError extends Error {
    name = "NotImplementedError";
    constructor(message = "Not implemented") {
        super(message);
    }
}
exports.NotImplementedError = NotImplementedError;
class FrozenModificationError extends Error {
    name = "FrozenModificationError";
    property;
    constructor(detail, prop) {
        let message = "An attempt was made to modify a frozen object";
        if (detail) {
            message += `: ${detail}`;
        }
        super(message);
        this.property = prop;
    }
}
exports.FrozenModificationError = FrozenModificationError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3V0aWwvRXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBcUI7OztBQUtyQixnR0FBZ0c7QUFDaEcsTUFBYSxhQUFjLFNBQVEsS0FBSztJQUMzQixJQUFJLEdBQUcsZUFBZSxDQUFDO0lBQ2hDLFlBQVksS0FBcUI7UUFDN0IsS0FBSyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUNKO0FBTEQsc0NBS0M7QUFFRCxzRUFBc0U7QUFDdEUsTUFBYSxhQUFjLFNBQVEsS0FBSztJQUMzQixJQUFJLEdBQUcsZUFBZSxDQUFDO0lBQ2hDLFlBQVksR0FBRyxJQUFpRztRQUM1RyxJQUFJLE9BQWUsQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDcEIsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQzthQUFNLENBQUM7WUFDSixNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQy9DLE9BQU8sR0FBRyxNQUFNLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxRQUFRLCtCQUErQixDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLFFBQVEseUNBQXlDLE1BQU0sVUFBVSxDQUFDO1FBQy9NLENBQUM7UUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkIsQ0FBQztDQUNKO0FBYkQsc0NBYUM7QUFFRCw2SkFBNko7QUFDN0osTUFBYSxZQUFhLFNBQVEsS0FBSztJQUMxQixJQUFJLEdBQUcsY0FBYyxDQUFDO0lBQy9CLFlBQVksT0FBZTtRQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkIsQ0FBQztDQUNKO0FBTEQsb0NBS0M7QUFFRCxnRUFBZ0U7QUFDaEUsTUFBYSxlQUFnQixTQUFRLEtBQUs7SUFDN0IsSUFBSSxHQUFHLGlCQUFpQixDQUFDO0lBQ2xDLFlBQVksT0FBZTtRQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkIsQ0FBQztDQUNKO0FBTEQsMENBS0M7QUFFRCx1QkFBdUI7QUFDdkIsTUFBYSxZQUFhLFNBQVEsS0FBSztJQUNuQyxJQUFJLENBQVM7SUFDSixJQUFJLEdBQUcsY0FBYyxDQUFDO0lBQy9CLFlBQVksT0FBZSxFQUFFLElBQVk7UUFDckMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztDQUNKO0FBUEQsb0NBT0M7QUFFRCxNQUFhLGdCQUFpQixTQUFRLEtBQUs7SUFDdkMsS0FBSyxDQUFTO0lBQ0wsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0lBQ25DLFlBQVksT0FBZSxFQUFFLEtBQWE7UUFDdEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztDQUNKO0FBUEQsNENBT0M7QUFFRCxNQUFhLG1CQUFvQixTQUFRLEtBQUs7SUFDakMsSUFBSSxHQUFHLHFCQUFxQixDQUFDO0lBQ3RDLFlBQVksT0FBTyxHQUFHLGlCQUFpQjtRQUNuQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkIsQ0FBQztDQUNKO0FBTEQsa0RBS0M7QUFFRCxNQUFhLHVCQUF3QixTQUFRLEtBQUs7SUFDckMsSUFBSSxHQUFHLHlCQUF5QixDQUFDO0lBQzFDLFFBQVEsQ0FBa0I7SUFDMUIsWUFBWSxNQUEwQixFQUFFLElBQXFCO1FBQ3pELElBQUksT0FBTyxHQUFHLCtDQUErQyxDQUFDO1FBQzlELElBQUksTUFBTSxFQUFFLENBQUM7WUFDVCxPQUFPLElBQUksS0FBSyxNQUFNLEVBQUUsQ0FBQztRQUM3QixDQUFDO1FBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztDQUNKO0FBWEQsMERBV0MifQ==