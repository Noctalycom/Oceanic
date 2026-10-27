"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRaw = exports.fromRaw = void 0;
const Constants_1 = require("../../Constants");
const FROM_RAW = {
    [Constants_1.ComponentTypes.ACTION_ROW]: component => ({
        components: component.components.map(c => fromRaw(c)),
        type: component.type,
    }),
    [Constants_1.ComponentTypes.BUTTON]: (component) => {
        if (component.style === Constants_1.ButtonStyles.LINK)
            return component;
        if (component.style === Constants_1.ButtonStyles.PREMIUM) {
            return {
                disabled: component.disabled,
                skuID: component.sku_id,
                style: component.style,
                type: component.type,
            };
        }
        return {
            customID: component.custom_id,
            disabled: component.disabled,
            emoji: component.emoji,
            label: component.label,
            style: component.style,
            type: component.type,
        };
    },
    [Constants_1.ComponentTypes.STRING_SELECT]: component => ({
        customID: component.custom_id,
        disabled: component.disabled,
        maxValues: component.max_values,
        minValues: component.min_values,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type,
        options: component.options,
    }),
    [Constants_1.ComponentTypes.TEXT_INPUT]: component => ({
        customID: component.custom_id,
        label: component.label,
        maxLength: component.max_length,
        minLength: component.min_length,
        placeholder: component.placeholder,
        required: component.required,
        style: component.style,
        type: component.type,
        value: component.value,
    }),
    [Constants_1.ComponentTypes.USER_SELECT]: component => ({
        customID: component.custom_id,
        defaultValues: component.default_values,
        disabled: component.disabled,
        maxValues: component.max_values,
        minValues: component.min_values,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.ROLE_SELECT]: component => ({
        customID: component.custom_id,
        defaultValues: component.default_values,
        disabled: component.disabled,
        maxValues: component.max_values,
        minValues: component.min_values,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.MENTIONABLE_SELECT]: component => ({
        customID: component.custom_id,
        defaultValues: component.default_values,
        disabled: component.disabled,
        maxValues: component.max_values,
        minValues: component.min_values,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.CHANNEL_SELECT]: component => ({
        customID: component.custom_id,
        channelTypes: component.channel_types,
        defaultValues: component.default_values,
        disabled: component.disabled,
        maxValues: component.max_values,
        minValues: component.min_values,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.TEXT_DISPLAY]: component => ({
        content: component.content,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.THUMBNAIL]: component => ({
        description: component.description,
        media: {
            attachmentID: component.media.attachment_id,
            contentType: component.media.content_type,
            height: component.media.height,
            proxyURL: component.media.proxy_url,
            url: component.media.url,
            width: component.media.width,
        },
        spoiler: component.spoiler,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.MEDIA_GALLERY]: component => ({
        items: component.items.map(i => ({
            description: i.description,
            media: {
                attachmentID: i.media.attachment_id,
                contentType: i.media.content_type,
                height: i.media.height,
                proxyURL: i.media.proxy_url,
                url: i.media.url,
                width: i.media.width,
            },
            spoiler: i.spoiler,
        })),
        type: component.type,
    }),
    [Constants_1.ComponentTypes.FILE]: component => ({
        file: {
            attachmentID: component.file.attachment_id,
            contentType: component.file.content_type,
            height: component.file.height,
            proxyURL: component.file.proxy_url,
            url: component.file.url,
            width: component.file.width,
        },
        spoiler: component.spoiler,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.SEPARATOR]: component => ({
        divider: component.divider,
        spacing: component.spacing,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.CONTENT_INVENTORY_ENTRY]: component => component,
    [Constants_1.ComponentTypes.CONTAINER]: component => ({
        accentColor: component.accent_color,
        components: component.components.map(c => fromRaw(c)),
        spoiler: component.spoiler,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.SECTION]: component => ({
        type: component.type,
        accessory: fromRaw(component.accessory),
        components: component.components.map(c => fromRaw(c)),
    }),
    [Constants_1.ComponentTypes.LABEL]: component => ({
        type: component.type,
        label: component.label,
        description: component.description,
        component: fromRaw(component.component),
    }),
    [Constants_1.ComponentTypes.FILE_UPLOAD]: component => ({
        customID: component.custom_id,
        fileTypes: component.file_types,
        id: component.id,
        maxValues: component.max_values,
        minValues: component.min_values,
        required: component.required,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.RADIO_GROUP]: component => ({
        customID: component.custom_id,
        required: component.required,
        options: component.options.map(o => ({
            default: o.default,
            description: o.description,
            label: o.label,
            value: o.value,
        })),
        type: component.type,
    }),
    [Constants_1.ComponentTypes.CHECKBOX]: component => ({
        customID: component.custom_id,
        default: component.default,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.CHECKBOX_GROUP]: component => ({
        customID: component.custom_id,
        maxValues: component.max_values,
        minValues: component.min_values,
        options: component.options.map(o => ({
            default: o.default,
            description: o.description,
            label: o.label,
            value: o.value,
        })),
        required: component.required,
        type: component.type,
    }),
};
function fromRaw(component) {
    return FROM_RAW[component.type](component);
}
exports.fromRaw = fromRaw;
const TO_RAW = {
    [Constants_1.ComponentTypes.ACTION_ROW]: component => ({
        type: component.type,
        components: component.components.map(c => toRaw(c)),
    }),
    [Constants_1.ComponentTypes.BUTTON]: (component) => {
        if (component.style === Constants_1.ButtonStyles.LINK)
            return component;
        if (component.style === Constants_1.ButtonStyles.PREMIUM) {
            return {
                disabled: component.disabled,
                sku_id: component.skuID,
                style: component.style,
                type: component.type,
            };
        }
        return {
            custom_id: component.customID,
            disabled: component.disabled,
            emoji: component.emoji,
            label: component.label,
            style: component.style,
            type: component.type,
        };
    },
    [Constants_1.ComponentTypes.STRING_SELECT]: component => ({
        custom_id: component.customID,
        disabled: component.disabled,
        max_values: component.maxValues,
        min_values: component.minValues,
        placeholder: component.placeholder,
        required: component.required,
        options: component.options,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.TEXT_INPUT]: component => ({
        custom_id: component.customID,
        label: component.label,
        max_length: component.maxLength,
        min_length: component.minLength,
        placeholder: component.placeholder,
        required: component.required,
        style: component.style,
        type: component.type,
        value: component.value,
    }),
    [Constants_1.ComponentTypes.USER_SELECT]: component => ({
        custom_id: component.customID,
        disabled: component.disabled,
        max_values: component.maxValues,
        min_values: component.minValues,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.ROLE_SELECT]: component => ({
        custom_id: component.customID,
        disabled: component.disabled,
        max_values: component.maxValues,
        min_values: component.minValues,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.MENTIONABLE_SELECT]: component => ({
        custom_id: component.customID,
        disabled: component.disabled,
        max_values: component.maxValues,
        min_values: component.minValues,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.CHANNEL_SELECT]: component => ({
        channel_types: component.channelTypes,
        custom_id: component.customID,
        disabled: component.disabled,
        max_values: component.maxValues,
        min_values: component.minValues,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.TEXT_DISPLAY]: component => ({
        content: component.content,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.THUMBNAIL]: component => ({
        description: component.description,
        media: {
            attachment_id: component.media.attachmentID,
            content_type: component.media.contentType,
            height: component.media.height,
            proxy_url: component.media.proxyURL,
            url: component.media.url,
            width: component.media.width,
        },
        spoiler: component.spoiler,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.MEDIA_GALLERY]: component => ({
        items: component.items.map(i => ({
            description: i.description,
            media: {
                attachment_id: i.media.attachmentID,
                content_type: i.media.contentType,
                height: i.media.height,
                proxy_url: i.media.proxyURL,
                url: i.media.url,
                width: i.media.width,
            },
            spoiler: i.spoiler,
        })),
        type: component.type,
    }),
    [Constants_1.ComponentTypes.FILE]: component => ({
        file: {
            attachment_id: component.file.attachmentID,
            content_type: component.file.contentType,
            height: component.file.height,
            proxy_url: component.file.proxyURL,
            url: component.file.url,
            width: component.file.width,
        },
        spoiler: component.spoiler,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.SEPARATOR]: component => ({
        divider: component.divider,
        spacing: component.spacing,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.CONTENT_INVENTORY_ENTRY]: component => component,
    [Constants_1.ComponentTypes.CONTAINER]: component => ({
        accent_color: component.accentColor,
        components: component.components.map(c => toRaw(c)),
        spoiler: component.spoiler,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.SECTION]: component => ({
        type: component.type,
        accessory: toRaw(component.accessory),
        components: component.components.map(c => toRaw(c)),
    }),
    [Constants_1.ComponentTypes.LABEL]: component => ({
        type: component.type,
        label: component.label,
        description: component.description,
        component: toRaw(component.component),
    }),
    [Constants_1.ComponentTypes.FILE_UPLOAD]: component => ({
        custom_id: component.customID,
        file_types: component.fileTypes,
        id: component.id,
        max_values: component.maxValues,
        min_values: component.minValues,
        required: component.required,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.RADIO_GROUP]: component => ({
        custom_id: component.customID,
        required: component.required,
        options: component.options.map(o => ({
            default: o.default,
            description: o.description,
            label: o.label,
            value: o.value,
        })),
        type: component.type,
    }),
    [Constants_1.ComponentTypes.CHECKBOX]: component => ({
        custom_id: component.customID,
        default: component.default,
        type: component.type,
    }),
    [Constants_1.ComponentTypes.CHECKBOX_GROUP]: component => ({
        custom_id: component.customID,
        max_values: component.maxValues,
        min_values: component.minValues,
        options: component.options.map(o => ({
            default: o.default,
            description: o.description,
            label: o.label,
            value: o.value,
        })),
        required: component.required,
        type: component.type,
    }),
};
function toRaw(component) {
    return TO_RAW[component.type](component);
}
exports.toRaw = toRaw;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1jb21wb25lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3V0aWwvcGFyc2luZy9tZXNzYWdlLWNvbXBvbmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0NBQStEO0FBSS9ELE1BQU0sUUFBUSxHQUFrSTtJQUM1SSxDQUFDLDBCQUFjLENBQUMsVUFBVSxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLFVBQVUsRUFBRSxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQVUsQ0FBQztRQUM5RCxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7S0FDdkIsQ0FBQztJQUNGLENBQUMsMEJBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ25DLElBQUksU0FBUyxDQUFDLEtBQUssS0FBSyx3QkFBWSxDQUFDLElBQUk7WUFBRSxPQUFPLFNBQVMsQ0FBQztRQUU1RCxJQUFJLFNBQVMsQ0FBQyxLQUFLLEtBQUssd0JBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQyxPQUFPO2dCQUNILFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUTtnQkFDNUIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxNQUFNO2dCQUN2QixLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7Z0JBQ3RCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSTthQUN2QixDQUFDO1FBQ04sQ0FBQztRQUVELE9BQU87WUFDSCxRQUFRLEVBQUUsU0FBUyxDQUFDLFNBQVM7WUFDN0IsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRO1lBQzVCLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSztZQUN0QixLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7WUFDdEIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLO1lBQ3RCLElBQUksRUFBRSxT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