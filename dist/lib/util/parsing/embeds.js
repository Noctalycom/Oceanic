"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRaw = exports.fromRaw = void 0;
function fromRaw(embed) {
    return {
        author: embed.author === undefined ? undefined : {
            name: embed.author.name,
            iconURL: embed.author.icon_url,
            proxyIconURL: embed.author.proxy_icon_url,
            url: embed.author.url,
        },
        color: embed.color,
        description: embed.description,
        fields: embed.fields?.map(field => ({
            inline: field.inline,
            name: field.name,
            value: field.value,
        })),
        flags: embed.flags,
        footer: embed.footer === undefined ? undefined : {
            flags: embed.footer.flags,
            iconURL: embed.footer.icon_url,
            proxyIconURL: embed.footer.proxy_icon_url,
            text: embed.footer.text,
        },
        timestamp: embed.timestamp,
        title: embed.title,
        image: embed.image === undefined ? undefined : {
            flags: embed.image.flags,
            height: embed.image.height,
            proxyURL: embed.image.proxy_url,
            url: embed.image.url,
            width: embed.image.width,
        },
        provider: embed.provider === undefined ? undefined : {
            name: embed.provider.name,
            url: embed.provider.url,
        },
        thumbnail: embed.thumbnail === undefined ? undefined : {
            url: embed.thumbnail.url,
            height: embed.thumbnail.height,
            proxyURL: embed.thumbnail.proxy_url,
            width: embed.thumbnail.width,
        },
        url: embed.url,
        type: embed.type,
        video: embed.video === undefined ? undefined : {
            height: embed.video.height,
            proxyURL: embed.video.proxy_url,
            url: embed.video.url,
            width: embed.video.width,
        },
    };
}
exports.fromRaw = fromRaw;
function toRaw(embed) {
    return {
        author: embed.author === undefined ? undefined : {
            name: embed.author.name,
            icon_url: embed.author.iconURL,
            url: embed.author.url,
        },
        color: embed.color,
        description: embed.description,
        fields: embed.fields?.map(field => ({
            inline: field.inline,
            name: field.name,
            value: field.value,
        })),
        footer: embed.footer === undefined ? undefined : {
            text: embed.footer.text,
            icon_url: embed.footer.iconURL,
        },
        timestamp: embed.timestamp,
        title: embed.title,
        image: embed.image === undefined ? undefined : { url: embed.image.url },
        thumbnail: embed.thumbnail === undefined ? undefined : { url: embed.thumbnail.url },
        url: embed.url,
    };
}
exports.toRaw = toRaw;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3V0aWwvcGFyc2luZy9lbWJlZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBZ0IsT0FBTyxDQUFDLEtBQThCO0lBQ2xELE9BQU87UUFDSCxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUN2QixPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQzlCLFlBQVksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWM7WUFDekMsR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRztTQUN4QjtRQUNELEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztRQUNsQixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7UUFDOUIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07WUFDcEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO1lBQ2hCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztTQUNyQixDQUFDLENBQUM7UUFDSCxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7UUFDbEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzdDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDekIsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUTtZQUM5QixZQUFZLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxjQUFjO1lBQ3pDLElBQUksRUFBRSxLQUFL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