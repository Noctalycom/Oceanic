"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRawToResolved = void 0;
const Errors_1 = require("../Errors");
/**
 * Maps raw select menu values to resolved objects.
 *
 * If `ensurePresent` is false, values that aren't in `resolved` will be ignored.
 */
function mapRawToResolved(type, raw, resolved, ensurePresent = false) {
    return raw
        .map((id) => {
        const value = resolved.get(id);
        if (!value && ensurePresent) {
            throw new Errors_1.WrapperError(`Failed to find ${type} in resolved data: ${id}`);
        }
        return value;
    })
        .filter(Boolean);
}
exports.mapRawToResolved = mapRawToResolved;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3V0aWwvaW50ZXJhY3Rpb25zL3NoYXJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBeUM7QUFJekM7Ozs7R0FJRztBQUNILFNBQWdCLGdCQUFnQixDQUM1QixJQUFZLEVBQ1osR0FBa0IsRUFDbEIsUUFBVyxFQUNYLGFBQWEsR0FBRyxLQUFLO0lBRXJCLE9BQU8sR0FBRztTQUNMLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1FBQ1IsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBQzFCLE1BQU0sSUFBSSxxQkFBWSxDQUFDLGtCQUFrQixJQUFJLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLENBQUM7UUFDRCxPQUFPLEtBQU0sQ0FBQztJQUNsQixDQUFDLENBQUM7U0FDRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsQ0FBQztBQWZELDRDQWVDIn0=