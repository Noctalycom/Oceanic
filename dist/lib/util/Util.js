"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Util */
const node_util_1 = require("node:util");
const Constants_1 = require("../Constants");
const Channel_1 = tslib_1.__importDefault(require("../structures/Channel"));
const Entitlement_1 = tslib_1.__importDefault(require("../structures/Entitlement"));
const Member_1 = tslib_1.__importDefault(require("../structures/Member"));
const Message_1 = tslib_1.__importDefault(require("../structures/Message"));
const Subscription_1 = tslib_1.__importDefault(require("../structures/Subscription"));
const TestEntitlement_1 = tslib_1.__importDefault(require("../structures/TestEntitlement"));
const Errors_1 = require("./Errors");
const application_command_options_1 = require("./parsing/application-command-options");
const embeds_1 = require("./parsing/embeds");
const message_components_1 = require("./parsing/message-components");
const modal_components_1 = require("./parsing/modal-components");
const Routes_1 = require("./Routes");
/** A general set of utilities. These are intentionally poorly documented, as they serve almost no usefulness to outside developers. */
class Util {
    _client;
    constructor(client) {
        this._client = client;
    }
    static rawEmbeds(embeds) {
        const data = Util.prototype.embedsToParsed(Array.isArray(embeds) ? embeds : [embeds]);
        return Array.isArray(embeds) ? data : data[0];
    }
    static rawMessageComponents(components) {
        const data = Util.prototype.componentsToParsed(Array.isArray(components) ? components : [components]);
        return Array.isArray(components) ? data : data[0];
    }
    static rawModalComponents(components) {
        const data = Util.prototype.componentsToParsed(Array.isArray(components) ? components : [components]);
        return Array.isArray(components) ? data : data[0];
    }
    /** @hidden intentionally not documented - this is an internal function */
    _arrayToCSV(data, header) {
        return Buffer.from([header, ...data].filter(Boolean).join("\n"), "utf8");
    }
    /** @hidden intentionally not documented - this is an internal function */
    _arrayToCSVFile(data, name, header) {
        return {
            name: `${name}.csv`,
            field: name,
            contents: this._arrayToCSV(data, header),
            index: undefined,
        };
    }
    /** @hidden intentionally not documented - this is an internal function */
    _convertImage(image, name) {
        try {
            return this.convertImage(image);
        }
        catch (err) {
            throw new TypeError(`Invalid ${name} provided. Ensure you are providing a valid, fully-qualified base64 url.`, { cause: err });
        }
    }
    /** @hidden intended for internal use only */
    _convertSound(sound, name) {
        try {
            return this.convertSound(sound);
        }
        catch (err) {
            throw new TypeError(`Invalid ${name} provided. Ensure you are providing a valid, fully-qualified base64 url.`, { cause: err });
        }
    }
    /** @internal */
    _freeze(obj, detail) {
        let message = "This is an error in the library and should be reported.";
        if (detail) {
            message += `Detail: ${detail}`;
        }
        if (typeof obj !== "object" || obj === null || node_util_1.types.isProxy(obj)) {
            return obj;
        }
        return new Proxy(obj, {
            set: (target, prop, value, receiver) => {
                this._client.emit("error", new Errors_1.FrozenModificationError(message, prop));
                return Reflect.set(target, prop, value, receiver);
            },
        });
    }
    /** @hidden intended for internal use only */
    _getLimit(name, id) {
        const opt = this._client.options.collectionLimits[name];
        if (typeof opt === "number") {
            return opt;
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return (id === undefined ? undefined : opt[id]) ?? opt.default ?? Infinity;
    }
    /** @hidden intended for internal use only */
    _isModuleInstalled(name) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            require(name);
            return true;
        }
        catch {
            return false;
        }
    }
    _setLimit(values, defaultValue = Infinity) {
        if (values === undefined) {
            return defaultValue;
        }
        if (typeof values === "object") {
            return { default: defaultValue, ...values };
        }
        return values;
    }
    componentsToParsed(components) {
        return components.map(component => this.componentToParsed(component));
    }
    componentsToRaw(components) {
        return components.map(component => this.componentToRaw(component));
    }
    componentToParsed(component) {
        return (0, message_components_1.fromRaw)(component);
    }
    componentToRaw(component) {
        return (0, message_components_1.toRaw)(component);
    }
    convertApplicationEmoji(raw) {
        return this.convertGuildEmoji(raw);
    }
    convertGuildEmoji(raw) {
        return {
            animated: raw.animated,
            available: raw.available,
            id: raw.id,
            managed: raw.managed,
            name: raw.name,
            requireColons: raw.require_colons,
            roles: raw.roles,
            user: raw.user ? this._client.users.update(raw.user) : undefined,
        };
    }
    convertImage(img) {
        if (Buffer.isBuffer(img)) {
            const b64 = img.toString("base64");
            let mime;
            const magicMap = [
                // 47 49 46 38
                ["image/gif", /^47494638/],
                // 89 50 4E 47
                ["image/png", /^89504E47/],
                // FF D8 FF
                ["image/jpeg", /^FFD8FF/],
                // 52 49 46 46 ?? ?? ?? ?? 57 45 42 50
                ["image/webp", /^52494646\d{8}57454250/],
                // 02 27 62 20 22 0 - lottie JSON (assuming all files will start with {"v":")
                ["application/json", /^02276220220/],
            ];
            for (const format of magicMap) {
                if (format[1].test(this.getMagic(img, 16))) {
                    mime = format[0];
                    break;
                }
            }
            if (!mime) {
                throw new TypeError(`Failed to determine image format. (magic: ${this.getMagic(img, 16)})`);
            }
            img = `data:${mime};base64,${b64}`;
        }
        return img;
    }
    convertScheduledEventException(raw) {
        return {
            eventExceptionID: raw.event_exception_id,
            eventID: raw.event_id,
            isCanceled: raw.is_canceled,
            scheduledEndTime: raw.scheduled_end_time === null ? null : new Date(raw.scheduled_end_time),
            scheduledStartTime: raw.scheduled_start_time === null ? null : new Date(raw.scheduled_start_time),
        };
    }
    convertSound(audio) {
        if (Buffer.isBuffer(audio)) {
            const b64 = audio.toString("base64");
            let mime;
            const magicMap = [
                // 49 44 33
                ["audio/mpeg", /^494433/],
                // FF FB
                ["audio/mpeg", /^FFFB/],
                // 4F 67 67 53
                ["audio/ogg", /^4F676753/],
            ];
            for (const format of magicMap) {
                if (format[1].test(this.getMagic(audio, 16))) {
                    mime = format[0];
                    break;
                }
            }
            if (!mime) {
                throw new TypeError(`Failed to determine sound format. (magic: ${this.getMagic(audio, 16)})`);
            }
            audio = `data:${mime};base64,${b64}`;
        }
        return audio;
    }
    convertSticker(raw) {
        return {
            asset: raw.asset,
            available: raw.available,
            description: raw.description,
            formatType: raw.format_type,
            guildID: raw.guild_id,
            id: raw.id,
            name: raw.name,
            packID: raw.pack_id,
            sortValue: raw.sort_value,
            tags: raw.tags,
            type: raw.type,
            user: raw.user ? this._client.users.update(raw.user) : undefined,
        };
    }
    async detectMissingPrivilegedIntents(intents) {
        const application = this._client["_application"] ?? await this._client.rest.applications.getClient();
        intents ??= this._client.shards.options.intents;
        this._client["_application"] ??= application;
        const missing = [];
        const check = (intent, allowed) => {
            if ((intents & intent) === intent && !allowed.some(flag => (application.flags & flag) === flag)) {
                missing.push(Constants_1.Intents[intent]);
            }
        };
        for (const [intent, allowed] of Constants_1.PrivilegedIntentMapping) {
            check(intent, allowed);
        }
        return missing;
    }
    embedsToParsed(embeds) {
        return embeds.map(embed => (0, embeds_1.fromRaw)(embed));
    }
    embedsToRaw(embeds) {
        return embeds.map(embed => (0, embeds_1.toRaw)(embed));
    }
    formatAllowedMentions(allowed) {
        const result = {
            parse: [],
            replied_user: undefined,
            roles: undefined,
            users: undefined,
        };
        if (!allowed) {
            return this.formatAllowedMentions(this._client.options.allowedMentions);
        }
        if (allowed.everyone === true) {
            result.parse.push("everyone");
        }
        if (allowed.roles === true) {
            result.parse.push("roles");
        }
        else if (Array.isArray(allowed.roles)) {
            result.roles = allowed.roles;
        }
        if (allowed.users === true) {
            result.parse.push("users");
        }
        else if (Array.isArray(allowed.users)) {
            result.users = allowed.users;
        }
        if (allowed.repliedUser === true) {
            result.replied_user = true;
        }
        return result;
    }
    formatImage(url, format, size) {
        if (!format || !Constants_1.ImageFormats.includes(format.toLowerCase())) {
            format = url.includes("/a_") ? "gif" : this._client.options.defaultImageFormat;
        }
        if (!size || !Constants_1.MEDIA_PROXY_SIZES.includes(size)) {
            size = this._client.options.defaultImageSize;
        }
        return `${Routes_1.CDN_URL}${url}.${format}?size=${size}`;
    }
    getMagic(file, len = 4) {
        return [...new Uint8Array(file.subarray(0, len))].map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
    }
    modalSubmitComponentsToParsed(components) {
        return components.map(component => (0, modal_components_1.fromRaw)(component));
    }
    modalSubmitComponentsToRaw(components) {
        return components.map(component => (0, modal_components_1.toRaw)(component));
    }
    optionToParsed(option) {
        return (0, application_command_options_1.fromRaw)(option);
    }
    optionToRaw(option) {
        return (0, application_command_options_1.toRaw)(option);
    }
    /** @internal */
    replacePollAnswer(poll, answerID, count, users) {
        let answerCount = poll.results.answerCounts.find(a => a.id === answerID);
        answerCount ??= {
            count,
            id: answerID,
            users: [],
            meVoted: false,
        };
        answerCount.count = count;
        if (users) {
            answerCount.users = users;
            answerCount.meVoted = (this._client["_user"] && users.includes(this._client["_user"].id)) ?? false;
        }
    }
    updateChannel(channelData) {
        guild: if (channelData.guild_id) {
            const guild = this._client.guilds.get(channelData.guild_id);
            if (guild) {
                if (Constants_1.ThreadChannelTypes.includes(channelData.type)) {
                    if (!channelData.parent_id) {
                        break guild;
                    }
                    return guild.threads.update(channelData);
                }
                else {
                    return guild.channels.update(channelData);
                }
            }
        }
        switch (channelData.type) {
            case Constants_1.ChannelTypes.DM: return this._client.privateChannels.update(channelData);
            case Constants_1.ChannelTypes.GROUP_DM: return this._client.groupChannels.update(channelData);
            default: return Channel_1.default.from(channelData, this._client);
        }
    }
    /** @internal */
    updateEntitlement(data) {
        if (data.application_id !== this._client["_application"]?.id) {
            return "subscription_id" in data && data.subscription_id
                ? new Entitlement_1.default(data, this._client)
                : new TestEntitlement_1.default(data, this._client);
        }
        else {
            return this._client.application.entitlements.update(data);
        }
    }
    /** @internal */
    updateMember(guildID, memberID, member) {
        const guild = this._client.guilds.get(guildID);
        if (guild && this._client["_user"] && this._client.user.id === memberID) {
            if (guild["_clientMember"]) {
                guild["_clientMember"]["update"](member);
            }
            else {
                guild["_clientMember"] = guild.members.update({ ...member, id: memberID }, guildID);
            }
            return guild["_clientMember"];
        }
        return guild ? guild.members.update({ ...member, id: memberID }, guildID) : new Member_1.default({ ...member, id: memberID }, this._client, guildID);
    }
    /** @internal */
    updateMessage(data) {
        const channel = this._client.getChannel(data.channel_id);
        if (channel && "messages" in channel) {
            return channel.messages.update(data);
        }
        return new Message_1.default(data, this._client);
    }
    /** @internal */
    updatePollAnswer(poll, answerID, count, user) {
        let answerCount = poll.results.answerCounts.find(a => a.id === answerID);
        if (!answerCount) {
            if (count === -1) {
                return;
            }
            answerCount = {
                count,
                id: answerID,
                users: user ? [user] : [],
                meVoted: user === this._client["_user"]?.id,
            };
            poll.results.answerCounts.push(answerCount);
            return;
        }
        answerCount.count += count;
        if (user) {
            if (count === 1 && !answerCount.users.includes(user)) {
                answerCount.users.push(user);
                answerCount.meVoted = user === this._client["_user"]?.id;
            }
            else if (count === -1 && answerCount.users.includes(user)) {
                answerCount.users.splice(answerCount.users.indexOf(user), 1);
                if (user === this._client["_user"]?.id) {
                    answerCount.meVoted = false;
                }
            }
        }
    }
    /** @internal */
    updateSubscription(data) {
        if (this._client["_application"] === undefined) {
            return new Subscription_1.default(data, this._client);
        }
        else {
            return this._client.application.subscriptions.update(data);
        }
    }
    /** @internal */
    updateThread(threadData) {
        const guild = this._client.guilds.get(threadData.guild_id);
        if (guild) {
            return guild.threads.update(threadData);
        }
        return Channel_1.default.from(threadData, this._client);
    }
}
exports.default = Util;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlsL1V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUJBQW1CO0FBQ25CLHlDQUFrQztBQUVsQyw0Q0FVc0I7QUFDdEIsNEVBQTRDO0FBQzVDLG9GQUFvRDtBQUNwRCwwRUFBMEM7QUFDMUMsNEVBQTRDO0FBQzVDLHNGQUFzRDtBQUN0RCw0RkFBNEQ7QUFFNUQscUNBQW1EO0FBQ25ELHVGQUEySTtBQUMzSSw2Q0FBZ0Y7QUFDaEYscUVBQW9IO0FBQ3BILGlFQUEwSDtBQUMxSCxxQ0FBbUM7QUFNbkMsdUlBQXVJO0FBQ3ZJLE1BQXFCLElBQUk7SUFDYixPQUFPLENBQVM7SUFFeEIsWUFBWSxNQUFjO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFJRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQWdFO1FBQzdFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUlELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxVQUEwRjtRQUNsSCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3RHLE9BQU8sS0FBSyxDQUFDLE9BQU8s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