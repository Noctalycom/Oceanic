"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module ModalSubmitInteractionComponentsWrapper */
const Constants_1 = require("../../Constants");
const Collection_1 = tslib_1.__importDefault(require("../Collection"));
const Errors_1 = require("../Errors");
const shared_1 = require("./shared");
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
    getCheckboxComponent(name, required) {
        return this._getComponent(name, required, Constants_1.ComponentTypes.CHECKBOX);
    }
    getCheckboxGroupComponent(name, required) {
        return this._getComponent(name, required, Constants_1.ComponentTypes.CHECKBOX_GROUP);
    }
    getCheckboxGroupValues(name, required) {
        return this.getCheckboxGroupComponent(name, required)?.values;
    }
    getCheckboxValue(name, required) {
        return this.getCheckboxComponent(name, required)?.value;
    }
    /** Get the components in this interaction. */
    getComponents() {
        return this.raw
            .flatMap(r => r.type === Constants_1.ComponentTypes.ACTION_ROW ? r.components : r.component)
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            .filter(c => c !== undefined);
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
    getRadioGroupComponent(name, required) {
        return this._getComponent(name, required, Constants_1.ComponentTypes.RADIO_GROUP);
    }
    getRadioGroupValue(name, required) {
        return this.getRadioGroupComponent(name, required)?.value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kYWxTdWJtaXRJbnRlcmFjdGlvbkNvbXBvbmVudHNXcmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3V0aWwvaW50ZXJhY3Rpb25zL01vZGFsU3VibWl0SW50ZXJhY3Rpb25Db21wb25lbnRzV3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzREFBc0Q7QUFDdEQsK0NBQTJFO0FBQzNFLHVFQUF1QztBQUN2QyxzQ0FBeUM7QUFFekMscUNBQTRDO0FBUTVDLDRDQUE0QztBQUM1QyxNQUFxQix1Q0FBdUM7SUFDeEQsd0NBQXdDO0lBQ3hDLEdBQUcsQ0FBMkc7SUFDOUcsUUFBUSxDQUF3RDtJQUNoRSxZQUFZLFFBQStELEVBQUUsSUFBOEc7UUFDdkwsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVPLGFBQWEsQ0FBZ0csUUFBZ0IsRUFBRSxRQUFRLEdBQUcsS0FBSyxFQUFFLElBQXlCO1FBQzlLLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBa0IsQ0FBQztRQUN4RyxJQUFJLENBQUMsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ25CLE1BQU0sSUFBSSxxQkFBWSxDQUFDLCtCQUErQixRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7YUFBTSxDQUFDO1lBQ0osT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO0lBQ0wsQ0FBQztJQVNELHlCQUF5QixDQUFDLElBQVksRUFBRSxRQUFrQjtRQUN0RCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSwwQkFBYyxDQUFDLGNB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