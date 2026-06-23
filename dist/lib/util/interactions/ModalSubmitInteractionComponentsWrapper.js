"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module ModalSubmitInteractionComponentsWrapper */
const shared_1 = require("./shared");
const Errors_1 = require("../Errors");
const Constants_1 = require("../../Constants");
const Collection_1 = tslib_1.__importDefault(require("../Collection"));
/** A wrapper for interaction components. */
class ModalSubmitInteractionComponentsWrapper {
    /** The raw components from Discord.  */
    raw;
    resolved;
    constructor(resolved, data) {
        this.raw = data;
        this.resolved = resolved;
    }
    _getComponent(customID, required = false, type) {
        const opt = this.getComponents().find(o => o.customID === customID && o.type === type);
        if (!opt && required) {
            throw new Errors_1.WrapperError(`Missing required component: ${customID}`);
        }
        else {
            return opt;
        }
    }
    getChannelSelectComponent(name, required) {
        return this._getComponent(name, required, Constants_1.ComponentTypes.CHANNEL_SELECT);
    }
    getChannelSelectValues(name, required) {
        const component = this.getChannelSelectComponent(name, required);
        return component?.values && (0, shared_1.mapRawToResolved)("channel", component.values, this.resolved.channels, false);
    }
    /** Get the components in this interaction. */
    getComponents() {
        return this.raw.flatMap(r => r.type === Constants_1.ComponentTypes.ACTION_ROW ? r.components : r.component).filter(Boolean);
    }
    getFileUploadComponent(name, required) {
        return this._getComponent(name, required, Constants_1.ComponentTypes.FILE_UPLOAD);
    }
    getFileUploadValues(name, required) {
        const component = this.getFileUploadComponent(name, required);
        return component?.values && (0, shared_1.mapRawToResolved)("attachment", component.values, this.resolved.attachments, false);
    }
    getMentionableSelectComponent(name, required) {
        return this._getComponent(name, required, Constants_1.ComponentTypes.MENTIONABLE_SELECT);
    }
    getMentionableSelectValues(name, required) {
        const component = this.getMentionableSelectComponent(name, required);
        return component?.values && (0, shared_1.mapRawToResolved)("mentionable", component.values, new Collection_1.default([...this.resolved.users, ...this.resolved.roles]), false);
    }
    getRoleSelectComponent(name, required) {
        return this._getComponent(name, required, Constants_1.ComponentTypes.ROLE_SELECT);
    }
    getRoleSelectValues(name, required) {
        const component = this.getRoleSelectComponent(name, required);
        return component?.values && (0, shared_1.mapRawToResolved)("role", component.values, this.resolved.roles, false);
    }
    getStringSelectComponent(name, required) {
        return this._getComponent(name, required, Constants_1.ComponentTypes.STRING_SELECT);
    }
    getStringSelectValues(name, required) {
        return this.getStringSelectComponent(name, required)?.values;
    }
    getTextInput(name, required) {
        return this.getTextInputComponent(name, required)?.value;
    }
    getTextInputComponent(name, required) {
        return this._getComponent(name, required, Constants_1.ComponentTypes.TEXT_INPUT);
    }
    getUserSelectComponent(name, required) {
        return this._getComponent(name, required, Constants_1.ComponentTypes.USER_SELECT);
    }
    getUserSelectValues(name, required) {
        const component = this.getUserSelectComponent(name, required);
        return component?.values && (0, shared_1.mapRawToResolved)("user", component.values, this.resolved.users, false);
    }
}
exports.default = ModalSubmitInteractionComponentsWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kYWxTdWJtaXRJbnRlcmFjdGlvbkNvbXBvbmVudHNXcmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3V0aWwvaW50ZXJhY3Rpb25zL01vZGFsU3VibWl0SW50ZXJhY3Rpb25Db21wb25lbnRzV3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzREFBc0Q7QUFDdEQscUNBQTRDO0FBRTVDLHNDQUF5QztBQUN6QywrQ0FBMkU7QUFHM0UsdUVBQXVDO0FBSXZDLDRDQUE0QztBQUM1QyxNQUFxQix1Q0FBdUM7SUFDeEQsd0NBQXdDO0lBQ3hDLEdBQUcsQ0FBMkc7SUFDOUcsUUFBUSxDQUF3RDtJQUNoRSxZQUFZLFFBQStELEVBQUUsSUFBOEc7UUFDdkwsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVPLGFBQWEsQ0FBZ0csUUFBZ0IsRUFBRSxRQUFRLEdBQUcsS0FBSyxFQUFFLElBQXlCO1FBQzlLLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBa0IsQ0FBQztRQUN4RyxJQUFJLENBQUMsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ25CLE1BQU0sSUFBSSxxQkFBWSxDQUFDLCtCQUErQixRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7YUFBTSxDQUFDO1lBQ0osT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO0lBQ0wsQ0FBQztJQVNELHlCQUF5QixDQUFDLElBQVksRUFBRSxRQUFrQjtRQUN0RCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSwwQkFBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFTRCxzQkFBc0IsQ0FBQyxJQUFZLEVBQUUsUUFBa0I7UUFDbkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksRUFBRSxRQUFpQixDQUFDLENBQUM7UUFDMUUsT0FBTyxTQUFTLEVBQUUsTUFBTSxJQUFJLElBQUEseUJBQWdCLEVBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0csQ0FBQztJQUVELDhDQUE4QztJQUM5QyxhQUFhO1FBQ1QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssMEJBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQVNELHNCQUFzQixDQUFDLElBQVksRUFBRSxRQUFrQjtRQUNuRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSwwQkFBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFTRCxtQkFBbUIsQ0FBQyxJQUFZLEVBQUUsUUFBa0I7UUFDaEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxRQUFpQixDQUFDLENBQUM7UUFDdkUsT0FBTyxTQUFTLEVBQUUsTUFBTSxJQUFJLElBQUEseUJBQWdCLEVBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkgsQ0FBQztJQVNELDZCQUE2QixDQUFDLElBQVksRUFBRSxRQUFrQjtRQUMxRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSwwQkFBYyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDakYsQ0FBQztJQVNELDBCQUEwQixDQUFDLElBQVksRUFBRSxRQUFrQjtRQUN2RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxFQUFFLFFBQWlCLENBQUMsQ0FBQztRQUM5RSxPQUFPLFNBQVMsRUFBRSxNQUFNLElBQUksSUFBQSx5QkFBZ0IsRUFBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLG9CQUFVLENBQXNCLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoTCxDQUFDO0lBU0Qsc0JBQXNCLENBQUMsSUFBWSxFQUFFLFFBQWtCO1FBQ25ELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLDBCQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQVNELG1CQUFtQixDQUFDLElBQVksRUFBRSxRQUFrQjtRQUNoRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLFFBQWlCLENBQUMsQ0FBQztRQUN2RSxPQUFPLFNBQVMsRUFBRSxNQUFNLElBQUksSUFBQSx5QkFBZ0IsRUFBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBU0Qsd0JBQXdCLENBQUMsSUFBWSxFQUFFLFFBQWtCO1FBQ3JELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLDBCQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQVNELHFCQUFxQixDQUFDLElBQVksRUFBRSxRQUFrQjtRQUNsRCxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsUUFBaUIsQ0FBQyxFQUFFLE1BQU0sQ0FBQztJQUMxRSxDQUFDO0lBU0QsWUFBWSxDQUFDLElBQVksRUFBRSxRQUFrQjtRQUN6QyxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsUUFBaUIsQ0FBQyxFQUFFLEtBQUssQ0FBQztJQUN0RSxDQUFDO0lBU0QscUJBQXFCLENBQUMsSUFBWSxFQUFFLFFBQWtCO1FBQ2xELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLDBCQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQVNELHNCQUFzQixDQUFDLElBQVksRUFBRSxRQUFrQjtRQUNuRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSwwQkFBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFTRCxtQkFBbUIsQ0FBQyxJQUFZLEVBQUUsUUFBa0I7UUFDaEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxRQUFpQixDQUFDLENBQUM7UUFDdkUsT0FBTyxTQUFTLEVBQUUsTUFBTSxJQUFJLElBQUEseUJBQWdCLEVBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkcsQ0FBQztDQUNKO0FBckxELDBEQXFMQyJ9