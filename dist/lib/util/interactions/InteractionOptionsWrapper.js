"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module InteractionOptionsWrapper */
const Constants_1 = require("../../Constants");
const Errors_1 = require("../Errors");
/** A wrapper for interaction options. */
class InteractionOptionsWrapper {
    /** The raw options from Discord.  */
    raw;
    /** The resolved data for this options instance. */
    resolved;
    constructor(data, resolved) {
        this.raw = data;
        this.resolved = resolved;
    }
    _getOption(name, required = false, type) {
        const opt = this.getOptions().find(o => o.name === name && o.type === type);
        if (!opt && required) {
            throw new Errors_1.WrapperError(`Missing required option: ${name}`);
        }
        else {
            return opt;
        }
    }
    getAttachment(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getAttachment with null resolved. If this is on an autocomplete interaction, use getAttachmentOption instead.");
        }
        let val;
        if (!(val = this.getAttachmentOption(name, required)?.value)) {
            return undefined;
        }
        const a = this.resolved.attachments.get(val);
        if (!a && required) {
            throw new Errors_1.WrapperError(`Attachment not present for required option: ${name}`);
        }
        return a;
    }
    getAttachmentOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.ATTACHMENT);
    }
    getBoolean(name, required) {
        return this.getBooleanOption(name, required)?.value;
    }
    getBooleanOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.BOOLEAN);
    }
    getChannel(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getChannel with null resolved. If this is on an autocomplete interaction, use getChannelOption instead.");
        }
        let val;
        if (!(val = this.getChannelOption(name, required)?.value)) {
            return undefined;
        }
        const ch = this.resolved.channels.get(val);
        if (!ch && required) {
            throw new Errors_1.WrapperError(`Channel not present for required option: ${name}`);
        }
        return ch;
    }
    getChannelOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.CHANNEL);
    }
    getCompleteChannel(name, required) {
        const resolved = this.getChannel(name, required);
        if (!resolved) {
            return undefined; // required will be handled in getChannel
        }
        const channel = resolved.completeChannel ?? (resolved.type === Constants_1.ChannelTypes.DM ? resolved : undefined);
        if (!channel && required) {
            throw new Errors_1.WrapperError(`Failed to resolve complete channel for required option: ${name}`);
        }
        return channel;
    }
    getFocused(required) {
        const opt = this.getOptions().find(o => o.focused === true);
        if (!opt && required) {
            throw new Errors_1.WrapperError("Missing required focused option");
        }
        else {
            return opt;
        }
    }
    getInteger(name, required) {
        return this.getIntegerOption(name, required)?.value;
    }
    getIntegerOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.INTEGER);
    }
    getMember(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getMember with null resolved. If this is on an autocomplete interaction, use getUserOption instead.");
        }
        let val;
        if (!(val = this.getUserOption(name, required)?.value)) {
            return undefined;
        }
        const ch = this.resolved.members.get(val);
        if (!ch && required) {
            throw new Errors_1.WrapperError(`Member not present for required option: ${name}`);
        }
        return ch;
    }
    getMentionable(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getMentionable with null resolved. If this is on an autocomplete interaction, use getAttachmentOption instead.");
        }
        let val;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        if (!(val = this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.MENTIONABLE)?.value)) {
            return undefined;
        }
        const role = this.resolved.roles.get(val);
        const user = this.resolved.users.get(val);
        if ((!role && !user) && required) {
            throw new Errors_1.WrapperError(`Value not present for required option: ${name}`);
        }
        return role ?? user;
    }
    getMentionableOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.MENTIONABLE);
    }
    getNumber(name, required) {
        return this.getNumberOption(name, required)?.value;
    }
    getNumberOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.NUMBER);
    }
    /** Get the options received in this interaction, excluding subcommands and subcommand groups. */
    getOptions() {
        let baseOptions;
        const sub = this.getSubCommand(false) ?? [];
        switch (sub.length) {
            case 0: {
                baseOptions = this.raw;
                break;
            }
            case 1: {
                baseOptions = this.raw.find(o => o.name === sub[0] && o.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND)?.options;
                break;
            }
            case 2: {
                baseOptions = this.raw.find(o => o.name === sub[0] && o.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP)?.options?.find(o2 => o2.name === sub[1] && o2.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND)?.options;
                break;
            }
        }
        return baseOptions ?? [];
    }
    getRole(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getRole with null resolved. If this is on an autocomplete interaction, use getRoleOption instead.");
        }
        let val;
        if (!(val = this.getRoleOption(name, required)?.value)) {
            return undefined;
        }
        const ch = this.resolved.roles.get(val);
        if (!ch && required) {
            throw new Errors_1.WrapperError(`Role not present for required option: ${name}`);
        }
        return ch;
    }
    getRoleOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.ROLE);
    }
    getString(name, required) {
        return this.getStringOption(name, required)?.value;
    }
    getStringOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.STRING);
    }
    getSubCommand(required) {
        const opt = this.raw.find(o => o.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND || o.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (opt?.options) {
            // nested
            if (opt.options.length === 1 && opt.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP) {
                const sub = opt.options.find(o => o.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND);
                return sub?.options ? [opt.name, sub.name] : [opt.name];
            }
            else {
                return [opt.name];
            }
        }
        else {
            if (required) {
                throw new Errors_1.WrapperError("Missing required option: SubCommand/SubCommandGroup.");
            }
            else {
                return undefined;
            }
        }
    }
    getUser(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getUser with null resolved. If this is on an autocomplete interaction, use getUseOption instead.");
        }
        let val;
        if (!(val = this.getUserOption(name, required)?.value)) {
            return undefined;
        }
        const ch = this.resolved.users.get(val);
        if (!ch && required) {
            throw new Errors_1.WrapperError(`User not present for required option: ${name}`);
        }
        return ch;
    }
    getUserOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.USER);
    }
}
exports.default = InteractionOptionsWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb25PcHRpb25zV3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi91dGlsL2ludGVyYWN0aW9ucy9JbnRlcmFjdGlvbk9wdGlvbnNXcmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQXdDO0FBQ3hDLCtDQUE4RTtBQUM5RSxzQ0FBeUM7QUFTekMseUNBQXlDO0FBQ3pDLE1BQXFCLHlCQUF5QjtJQUMxQyxxQ0FBcUM7SUFDckMsR0FBRyxDQUErQztJQUNsRCxtREFBbUQ7SUFDbkQsUUFBUSxDQUFzRTtJQUM5RSxZQUFZLElBQWtELEVBQUUsUUFBNkU7UUFDekksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVPLFVBQVUsQ0FBNEcsSUFBWSxFQUFFLFFBQVEsR0FBRyxLQUFLLEVBQUUsSUFBbUM7UUFDN0wsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFrQixDQUFDO1FBQzdGLElBQUksQ0FBQyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7WUFDbkIsTUFBTSxJQUFJLHFCQUFZLENBQUMsNEJBQTRCLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0QsQ0FBQzthQUFNLENBQUM7WUFDSixPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUM7SUFDTCxDQUFDO0lBU0QsYUFBYSxDQUFDLElBQVksRUFBRSxRQUFrQjtRQUMxQyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDekIsTUFBTSxJQUFJLFNBQVMsQ0FBQyw4SEFBOEgsQ0FBQyxDQUFDO1FBQ3hKLENBQUM7UUFDRCxJQUFJ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