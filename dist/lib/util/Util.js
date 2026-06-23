"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Util */
const Routes_1 = require("./Routes");
const Errors_1 = require("./Errors");
const Constants_1 = require("../Constants");
const Member_1 = tslib_1.__importDefault(require("../structures/Member"));
const Channel_1 = tslib_1.__importDefault(require("../structures/Channel"));
const Message_1 = tslib_1.__importDefault(require("../structures/Message"));
const Entitlement_1 = tslib_1.__importDefault(require("../structures/Entitlement"));
const TestEntitlement_1 = tslib_1.__importDefault(require("../structures/TestEntitlement"));
const node_util_1 = require("node:util");
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
            contents: this._arrayToCSV(data, header)
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
            }
        });
    }
    /** @hidden intended for internal use only */
    _getLimit(name, id) {
        const opt = this._client.options.collectionLimits[name];
        if (typeof opt === "number") {
            return opt;
        }
        return (id === undefined ? undefined : opt[id]) ?? opt.default ?? Infinity;
    }
    /** @hidden intended for internal use only */
    _isModuleInstalled(name) {
        try {
            // eslint-disable-next-line unicorn/prefer-module
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
    componentToParsed(component) {
        switch (component.type) {
            case Constants_1.ComponentTypes.ACTION_ROW: {
                return {
                    components: component.components.map(c => this.componentToParsed(c)),
                    type: component.type
                };
            }
            case Constants_1.ComponentTypes.BUTTON: {
                if (component.style === Constants_1.ButtonStyles.LINK)
                    return component;
                if (component.style === Constants_1.ButtonStyles.PREMIUM) {
                    return {
                        disabled: component.disabled,
                        skuID: component.sku_id,
                        style: component.style,
                        type: component.type
                    };
                }
                return {
                    customID: component.custom_id,
                    disabled: component.disabled,
                    emoji: component.emoji,
                    label: component.label,
                    style: component.style,
                    type: component.type
                };
            }
            case Constants_1.ComponentTypes.TEXT_INPUT: {
                return {
                    customID: component.custom_id,
                    label: component.label,
                    maxLength: component.max_length,
                    minLength: component.min_length,
                    placeholder: component.placeholder,
                    required: component.required,
                    style: component.style,
                    type: component.type,
                    value: component.value
                };
            }
            case Constants_1.ComponentTypes.STRING_SELECT:
            case Constants_1.ComponentTypes.USER_SELECT:
            case Constants_1.ComponentTypes.ROLE_SELECT:
            case Constants_1.ComponentTypes.MENTIONABLE_SELECT:
            case Constants_1.ComponentTypes.CHANNEL_SELECT: {
                const parsedComponent = {
                    customID: component.custom_id,
                    disabled: component.disabled,
                    maxValues: component.max_values,
                    minValues: component.min_values,
                    placeholder: component.placeholder,
                    type: component.type
                };
                if (component.type !== Constants_1.ComponentTypes.STRING_SELECT && component.default_values !== undefined) {
                    parsedComponent.defaultValues = component.default_values;
                }
                if (component.type === Constants_1.ComponentTypes.STRING_SELECT) {
                    return { ...parsedComponent, options: component.options };
                }
                else if (component.type === Constants_1.ComponentTypes.CHANNEL_SELECT) {
                    return { ...parsedComponent, channelTypes: component.channel_types };
                }
                else {
                    return parsedComponent;
                }
            }
            case Constants_1.ComponentTypes.TEXT_DISPLAY: {
                return component;
            }
            case Constants_1.ComponentTypes.THUMBNAIL: {
                return {
                    description: component.description,
                    media: {
                        attachmentID: component.media.attachment_id,
                        contentType: component.media.content_type,
                        height: component.media.height,
                        proxyURL: component.media.proxy_url,
                        url: component.media.url,
                        width: component.media.width
                    },
                    spoiler: component.spoiler,
                    type: component.type
                };
            }
            case Constants_1.ComponentTypes.MEDIA_GALLERY: {
                return {
                    items: component.items.map(i => ({
                        description: i.description,
                        media: {
                            attachmentID: i.media.attachment_id,
                            contentType: i.media.content_type,
                            height: i.media.height,
                            proxyURL: i.media.proxy_url,
                            url: i.media.url,
                            width: i.media.width
                        },
                        spoiler: i.spoiler
                    })),
                    type: component.type
                };
            }
            case Constants_1.ComponentTypes.FILE: {
                return {
                    file: {
                        attachmentID: component.file.attachment_id,
                        contentType: component.file.content_type,
                        height: component.file.height,
                        proxyURL: component.file.proxy_url,
                        url: component.file.url,
                        width: component.file.width
                    },
                    spoiler: component.spoiler,
                    type: component.type
                };
            }
            case Constants_1.ComponentTypes.SEPARATOR: {
                return component;
            }
            case Constants_1.ComponentTypes.CONTAINER: {
                return {
                    accentColor: component.accent_color,
                    components: component.components.map(c => this.componentToParsed(c)),
                    spoiler: component.spoiler,
                    type: component.type
                };
            }
            case Constants_1.ComponentTypes.SECTION: {
                return {
                    type: component.type,
                    accessory: component.accessory ? this.componentToParsed(component.accessory) : undefined,
                    components: component.components.map(c => this.componentToParsed(c))
                };
            }
            case Constants_1.ComponentTypes.LABEL: {
                return {
                    type: component.type,
                    label: component.label,
                    description: component.description,
                    component: this.componentToParsed(component.component)
                };
            }
            case Constants_1.ComponentTypes.FILE_UPLOAD: {
                return {
                    customID: component.custom_id,
                    maxValues: component.max_values,
                    minValues: component.min_values,
                    required: component.required,
                    type: component.type
                };
            }
            default: {
                return component;
            }
        }
    }
    componentToRaw(component) {
        switch (component.type) {
            case Constants_1.ComponentTypes.ACTION_ROW: {
                return {
                    type: component.type,
                    components: component.components.map(c => this.componentToRaw(c))
                };
            }
            case Constants_1.ComponentTypes.BUTTON: {
                if (component.style === Constants_1.ButtonStyles.LINK)
                    return component;
                if (component.style === Constants_1.ButtonStyles.PREMIUM) {
                    return {
                        disabled: component.disabled,
                        sku_id: component.skuID,
                        style: component.style,
                        type: component.type
                    };
                }
                return {
                    custom_id: component.customID,
                    disabled: component.disabled,
                    emoji: component.emoji,
                    label: component.label,
                    style: component.style,
                    type: component.type
                };
            }
            case Constants_1.ComponentTypes.TEXT_INPUT: {
                return {
                    custom_id: component.customID,
                    label: component.label,
                    max_length: component.maxLength,
                    min_length: component.minLength,
                    placeholder: component.placeholder,
                    required: component.required,
                    style: component.style,
                    type: component.type,
                    value: component.value
                };
            }
            case Constants_1.ComponentTypes.STRING_SELECT:
            case Constants_1.ComponentTypes.USER_SELECT:
            case Constants_1.ComponentTypes.ROLE_SELECT:
            case Constants_1.ComponentTypes.MENTIONABLE_SELECT:
            case Constants_1.ComponentTypes.CHANNEL_SELECT: {
                const rawComponent = {
                    custom_id: component.customID,
                    disabled: component.disabled,
                    max_values: component.maxValues,
                    min_values: component.minValues,
                    placeholder: component.placeholder,
                    required: component.required,
                    type: component.type
                };
                if (component.type !== Constants_1.ComponentTypes.STRING_SELECT && component.defaultValues !== undefined) {
                    rawComponent.default_values = component.defaultValues;
                }
                if (component.type === Constants_1.ComponentTypes.STRING_SELECT) {
                    return { ...rawComponent, options: component.options };
                }
                else if (component.type === Constants_1.ComponentTypes.CHANNEL_SELECT) {
                    return { ...rawComponent, channel_types: component.channelTypes };
                }
                else {
                    return rawComponent;
                }
            }
            case Constants_1.ComponentTypes.TEXT_DISPLAY: {
                return component;
            }
            case Constants_1.ComponentTypes.THUMBNAIL: {
                return {
                    description: component.description,
                    media: {
                        attachment_id: component.media.attachmentID,
                        content_type: component.media.contentType,
                        height: component.media.height,
                        proxy_url: component.media.proxyURL,
                        url: component.media.url,
                        width: component.media.width
                    },
                    spoiler: component.spoiler,
                    type: component.type
                };
            }
            case Constants_1.ComponentTypes.MEDIA_GALLERY: {
                return {
                    items: component.items.map(i => ({
                        description: i.description,
                        media: {
                            attachment_id: i.media.attachmentID,
                            content_type: i.media.contentType,
                            height: i.media.height,
                            proxy_url: i.media.proxyURL,
                            url: i.media.url,
                            width: i.media.width
                        },
                        spoiler: i.spoiler
                    })),
                    type: component.type
                };
            }
            case Constants_1.ComponentTypes.FILE: {
                return {
                    file: {
                        attachment_id: component.file.attachmentID,
                        content_type: component.file.contentType,
                        height: component.file.height,
                        proxy_url: component.file.proxyURL,
                        url: component.file.url,
                        width: component.file.width
                    },
                    spoiler: component.spoiler,
                    type: component.type
                };
            }
            case Constants_1.ComponentTypes.SEPARATOR: {
                return component;
            }
            case Constants_1.ComponentTypes.CONTAINER: {
                return {
                    accent_color: component.accentColor,
                    components: component.components.map(c => this.componentToRaw(c)),
                    spoiler: component.spoiler,
                    type: component.type
                };
            }
            case Constants_1.ComponentTypes.SECTION: {
                return {
                    type: component.type,
                    accessory: component.accessory ? this.componentToRaw(component.accessory) : undefined,
                    components: component.components.map(c => this.componentToRaw(c))
                };
            }
            case Constants_1.ComponentTypes.LABEL: {
                return {
                    type: component.type,
                    label: component.label,
                    description: component.description,
                    component: this.componentToRaw(component.component)
                };
            }
            case Constants_1.ComponentTypes.FILE_UPLOAD:
                return {
                    custom_id: component.customID,
                    max_values: component.maxValues,
                    min_values: component.minValues,
                    required: component.required,
                    type: component.type
                };
            default: {
                return component;
            }
        }
    }
    componentsToParsed(components) {
        return components.map(component => this.componentToParsed(component));
    }
    componentsToRaw(components) {
        return components.map(component => this.componentToRaw(component));
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
            user: raw.user ? this._client.users.update(raw.user) : undefined
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
                ["application/json", /^02276220220/]
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
                ["audio/ogg", /^4F676753/]
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
            user: raw.user ? this._client.users.update(raw.user) : undefined
        };
    }
    async detectMissingPrivilegedIntents(intents) {
        const application = this._client["_application"] || await this._client.rest.applications.getClient();
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
        return embeds.map(embed => ({
            author: embed.author === undefined ? undefined : {
                name: embed.author.name,
                iconURL: embed.author.icon_url,
                proxyIconURL: embed.author.proxy_icon_url
            },
            color: embed.color,
            description: embed.description,
            fields: embed.fields?.map(field => ({
                inline: field.inline,
                name: field.name,
                value: field.value
            })),
            flags: embed.flags,
            footer: embed.footer === undefined ? undefined : {
                flags: embed.footer.flags,
                iconURL: embed.footer.icon_url,
                proxyIconURL: embed.footer.proxy_icon_url,
                text: embed.footer.text
            },
            timestamp: embed.timestamp,
            title: embed.title,
            image: embed.image === undefined ? undefined : {
                flags: embed.image.flags,
                height: embed.image.height,
                proxyURL: embed.image.proxy_url,
                url: embed.image.url,
                width: embed.image.width
            },
            provider: embed.provider === undefined ? undefined : {
                name: embed.provider.name,
                url: embed.provider.url
            },
            thumbnail: embed.thumbnail === undefined ? undefined : {
                url: embed.thumbnail.url,
                height: embed.thumbnail.height,
                proxyURL: embed.thumbnail.proxy_url,
                width: embed.thumbnail.width
            },
            url: embed.url,
            type: embed.type,
            video: embed.video === undefined ? undefined : {
                height: embed.video.height,
                proxyURL: embed.video.proxy_url,
                url: embed.video.url,
                width: embed.video.width
            }
        }));
    }
    embedsToRaw(embeds) {
        return embeds.map(embed => ({
            author: embed.author === undefined ? undefined : {
                name: embed.author.name,
                icon_url: embed.author.iconURL,
                url: embed.author.url
            },
            color: embed.color,
            description: embed.description,
            fields: embed.fields?.map(field => ({
                inline: field.inline,
                name: field.name,
                value: field.value
            })),
            footer: embed.footer === undefined ? undefined : {
                text: embed.footer.text,
                icon_url: embed.footer.iconURL
            },
            timestamp: embed.timestamp,
            title: embed.title,
            image: embed.image === undefined ? undefined : { url: embed.image.url },
            thumbnail: embed.thumbnail === undefined ? undefined : { url: embed.thumbnail.url },
            url: embed.url
        }));
    }
    formatAllowedMentions(allowed) {
        const result = { parse: [] };
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
    modalSubmitComponentToParsed(component) {
        switch (component.type) {
            case Constants_1.ComponentTypes.TEXT_INPUT: {
                return {
                    customID: component.custom_id,
                    type: component.type,
                    value: component.value
                };
            }
            case Constants_1.ComponentTypes.STRING_SELECT:
            case Constants_1.ComponentTypes.USER_SELECT:
            case Constants_1.ComponentTypes.ROLE_SELECT:
            case Constants_1.ComponentTypes.MENTIONABLE_SELECT:
            case Constants_1.ComponentTypes.CHANNEL_SELECT:
            case Constants_1.ComponentTypes.FILE_UPLOAD: {
                return {
                    customID: component.custom_id,
                    type: component.type,
                    values: component.values
                };
            }
            default: {
                return component;
            }
        }
    }
    modalSubmitComponentsToParsed(components) {
        return components.map(row => {
            if (row.type === Constants_1.ComponentTypes.ACTION_ROW) {
                return {
                    type: row.type,
                    components: row.components ? row.components.map(component => this.modalSubmitComponentToParsed(component)) : undefined
                };
            }
            else {
                return {
                    type: row.type,
                    component: row.component ? this.modalSubmitComponentToParsed(row.component) : undefined
                };
            }
        });
    }
    optionToParsed(option) {
        return {
            autocomplete: option.autocomplete,
            channelTypes: option.channel_types,
            choices: option.choices,
            description: option.description,
            descriptionLocalizations: option.description_localizations,
            descriptionLocalized: option.description_localized,
            max_length: option.max_length,
            max_value: option.max_value,
            min_length: option.min_length,
            min_value: option.min_value,
            name: option.name,
            nameLocalizations: option.name_localizations,
            nameLocalized: option.name_localized,
            options: option.options?.map(o => this.optionToParsed(o)),
            required: option.required,
            type: option.type
        };
    }
    optionToRaw(option) {
        const opt = option;
        return {
            autocomplete: opt.autocomplete,
            channel_types: opt.channelTypes,
            choices: opt.choices?.map(choice => ({
                name: choice.name,
                name_localizations: choice.nameLocalizations,
                value: choice.value
            })),
            description: opt.description,
            description_localizations: opt.descriptionLocalizations,
            max_length: opt.maxLength,
            max_value: opt.maxValue,
            min_length: opt.minLength,
            min_value: opt.minValue,
            name: opt.name,
            name_localizations: opt.nameLocalizations,
            options: opt.options?.map(o => this.optionToRaw(o)),
            required: opt.required,
            type: opt.type
        };
    }
    /** @internal */
    replacePollAnswer(poll, answerID, count, users) {
        let answerCount = poll.results.answerCounts.find(a => a.id === answerID);
        if (!answerCount) {
            answerCount = {
                count,
                id: answerID,
                users: [],
                meVoted: false
            };
        }
        answerCount.count = count;
        if (users) {
            answerCount.users = users;
            answerCount.meVoted = (this._client["_user"] && users.includes(this._client["_user"]?.id)) ?? false;
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
        if (this._client["_application"] === undefined) {
            return "subscription_id" in data && data.subscription_id ?
                new Entitlement_1.default(data, this._client) :
                new TestEntitlement_1.default(data, this._client);
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
                meVoted: user === this._client["_user"]?.id
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
    updateThread(threadData) {
        const guild = this._client.guilds.get(threadData.guild_id);
        if (guild) {
            return guild.threads.update(threadData);
        }
        return Channel_1.default.from(threadData, this._client);
    }
}
exports.default = Util;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlsL1V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUJBQW1CO0FBQ25CLHFDQUFtQztBQUNuQyxxQ0FBbUQ7QUFHbkQsNENBWXNCO0FBQ3RCLDBFQUEwQztBQUMxQyw0RUFBNEM7QUFDNUMsNEVBQTRDO0FBQzVDLG9GQUFvRDtBQUNwRCw0RkFBNEQ7QUFFNUQseUNBQWtDO0FBRWxDLHVJQUF1STtBQUN2SSxNQUFxQixJQUFJO0lBQ2IsT0FBTyxDQUFTO0lBRXhCLFlBQVksTUFBYztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBSUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFnRTtRQUM3RSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN0RixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFJRCxNQUFNLENBQUMsb0JBQW9CLENBQUMsVUFBMEY7UUFDbEgsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN0RyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMs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