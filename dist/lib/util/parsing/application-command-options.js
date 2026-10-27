"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRaw = exports.fromRaw = void 0;
function fromRaw(option) {
    return {
        autocomplete: option.autocomplete,
        channelTypes: option.channel_types,
        choices: option.choices,
        description: option.description,
        descriptionLocalizations: option.description_localizations,
        descriptionLocalized: option.description_localized,
        fileTypes: option.file_types,
        maxLength: option.max_length,
        maxValue: option.max_value,
        minLength: option.min_length,
        minValue: option.min_value,
        name: option.name,
        nameLocalizations: option.name_localizations,
        nameLocalized: option.name_localized,
        options: option.options?.map(o => fromRaw(o)),
        required: option.required,
        type: option.type,
    };
}
exports.fromRaw = fromRaw;
function toRaw(option) {
    const opt = option;
    return {
        autocomplete: opt.autocomplete,
        channel_types: opt.channelTypes,
        choices: opt.choices?.map(choice => ({
            name: choice.name,
            name_localizations: choice.nameLocalizations,
            value: choice.value,
        })),
        description: opt.description,
        description_localizations: opt.descriptionLocalizations,
        description_localized: opt.descriptionLocalized,
        file_types: opt.fileTypes,
        max_length: opt.maxLength,
        max_value: opt.maxValue,
        min_length: opt.minLength,
        min_value: opt.minValue,
        name: opt.name,
        name_localizations: opt.nameLocalizations,
        name_localized: opt.nameLocalized,
        options: opt.options?.map(o => toRaw(o)),
        required: opt.required,
        type: opt.type,
    };
}
exports.toRaw = toRaw;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24tY29tbWFuZC1vcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3V0aWwvcGFyc2luZy9hcHBsaWNhdGlvbi1jb21tYW5kLW9wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBZ0IsT0FBTyxDQUFDLE1BQXNEO0lBQzFFLE9BQU87UUFDSCxZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVk7UUFDakMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxhQUFhO1FBQ2xDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztRQUN2QixXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVc7UUFDL0Isd0JBQXdCLEVBQUUsTUFBTSxDQUFDLHlCQUF5QjtRQUMxRCxvQkFBb0IsRUFBRSxNQUFNLENBQUMscUJBQXFCO1FBQ2xELFNBQVMsRUFBRSxNQUFNLENBQUMsVUFBVTtRQUM1QixTQUFTLEVBQUUsTUFBTSxDQUFDLFVBQVU7UUFDNUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxTQUFTO1FBQzFCLFNBQVMsRUFBRSxNQUFNLENBQUMsVUFBVTtRQUM1QixRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQVM7UUFDMUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxrQkFBa0I7UUFDNUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxjQUFjO1FBQ3BDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7UUFDekIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO0tBQzJHLENBQUM7QUFDckksQ0FBQztBQXBCRCwwQkFvQkM7QUFFRCxTQUFnQixLQUFLLENBQUMsTUFBb0Q7SUFDdEUsTUFBTSxHQUFHLEdBQUcsTUFBNkQsQ0FBQztJQUMxRSxPQUFPO1FBQ0gsWUFBWSxFQUFFLEdBQUcsQ0FBQyxZQUFZO1FBQzlCLGFBQWEsRUFBRSxHQUFHLENBQUMsWUFBWTtRQUMvQixPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtZQUNqQixrQkFBa0IsRUFBRSxNQUFNLENBQUMsaUJBQWlCO1lBQzVDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztTQUN0QixDQUFDLENBQUM7UUFDSCxXQUFXLEVBQUUsR0FBRyxDQUFDLFdBQVc7UUFDNUIseUJBQXlCLEVBQUUsR0FBRyxDQUFDLHdCQUF3QjtRQUN2RCxxQkFBcUIsRUFBRSxHQUFHLENBQUMsb0JBQW9CO1FBQy9DLFVBQVUsRUFBRSxHQUFHLENBQUMsU0FBUztRQUN6QixVQUFVLEVBQUUsR0FBRyxDQUFDLFNBQVM7UUFDekIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxRQUFRO1FBQ3ZCLFVBQVUsRUFBRSxHQUFHLENBQUMsU0FBUztRQUN6QixTQUFTLEVBQUUsR0FBRyxDQUFDLFFBQVE7UUFDdkIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO1FBQ2Qsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLGlCQUFpQjtRQUN6QyxjQUFjLEVBQUUsR0FBRyxDQUFDLGFBQWE7UUFDakMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQWlELENBQUMsQ0FBQztRQUN4RixRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7UUFDdEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO0tBQ2dFLENBQUM7QUFDdkYsQ0FBQztBQXpCRCxzQkF5QkMifQ==