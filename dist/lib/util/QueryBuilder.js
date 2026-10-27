"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder extends URLSearchParams {
    set(name, value) {
        if (value === undefined) {
            if (this.has(name)) {
                this.delete(name);
            }
        }
        else {
            // `value` is intentionally `unknown` - every real call site passes a string/number/boolean
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            super.set(name, String(value));
        }
    }
    setIfPresent(name, value) {
        if (value !== undefined) {
            this.set(name, value);
        }
    }
}
exports.default = QueryBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVlcnlCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3V0aWwvUXVlcnlCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBcUIsWUFBYSxTQUFRLGVBQWU7SUFDNUMsR0FBRyxDQUFDLElBQVksRUFBRSxLQUFjO1FBQ3JDLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3RCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLENBQUM7UUFDTCxDQUFDO2FBQU0sQ0FBQztZQUNKLDJGQUEyRjtZQUMzRixnRUFBZ0U7WUFDaEUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbkMsQ0FBQztJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsSUFBWSxFQUFFLEtBQWM7UUFDckMsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUIsQ0FBQztJQUNMLENBQUM7Q0FDSjtBQWxCRCwrQkFrQkMifQ==