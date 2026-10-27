"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module REST/Interactions */
const Constants_1 = require("../Constants");
const QueryBuilder_1 = tslib_1.__importDefault(require("../util/QueryBuilder"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
/** Various methods for interacting with interactions. Located at {@link Client#rest | Client#rest}{@link RESTManager#interactions | .interactions}. */
class Interactions {
    _manager;
    constructor(manager) {
        this._manager = manager;
    }
    /**
     * Create a followup message.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @param options The options for creating the followup message.
     * @caching This method **does not** cache its result.
     */
    async createFollowupMessage(applicationID, interactionToken, options) {
        return this._manager.webhooks.execute(applicationID, interactionToken, options);
    }
    async createInteractionResponse(interactionID, interactionToken, options, withResponse = false) {
        options = this._manager.client.util._freeze(options);
        let data;
        switch (options.type) {
            case Constants_1.InteractionResponseTypes.PONG:
            case Constants_1.InteractionResponseTypes.PREMIUM_REQUIRED:
            case Constants_1.InteractionResponseTypes.LAUNCH_ACTIVITY: {
                break;
            }
            case Constants_1.InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE:
            case Constants_1.InteractionResponseTypes.UPDATE_MESSAGE: {
                data = {
                    allowed_mentions: this._manager.client.util.formatAllowedMentions(options.data.allowedMentions),
                    attachments: options.data.attachments,
                    content: options.data.content,
                    components: options.data.components ? this._manager.client.util.componentsToRaw(options.data.components) : undefined,
                    embeds: options.data.embeds ? this._manager.client.util.embedsToRaw(options.data.embeds) : undefined,
                    flags: options.data.flags,
                    poll: options.data.poll ? {
                        allow_multiselect: options.data.poll.allowMultiselect,
                        answers: options.data.poll.answers.map(a => ({
                            poll_media: a.pollMedia,
                        })),
                        duration: options.data.poll.duration,
                        layout_type: options.data.poll.layoutType,
                        question: options.data.poll.question,
                    } : undefined,
                };
                break;
            }
            case Constants_1.InteractionResponseTypes.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT: {
                data = {
                    choices: options.data.choices.map(d => ({
                        name: d.name,
                        name_localizations: d.nameLocalizations,
                        value: d.value,
                    })),
                };
                break;
            }
            case Constants_1.InteractionResponseTypes.MODAL: {
                data = {
                    custom_id: options.data.customID,
                    components: this._manager.client.util.componentsToRaw(options.data.components),
                    title: options.data.title,
                };
                break;
            }
            default: {
                data = options.data;
                break;
            }
        }
        const query = new QueryBuilder_1.default();
        if (withResponse)
            query.set("with_response", "true");
        return this._manager.authRequest({
            method: "POST",
            path: Routes.INTERACTION_CALLBACK(interactionID, interactionToken),
            route: "/interactions/:id/:token/callback",
            json: {
                data,
                type: options.type,
            },
            query,
            files: "data" in options && options.data && "files" in options.data ? options.data.files : undefined,
        }).then((d) => {
            if (withResponse) {
                return {
                    interaction: {
                        activityInstanceID: d.interaction.activity_instance_id,
                        id: d.interaction.id,
                        responseMessageEphemeral: d.interaction.response_message_ephemeral,
                        responseMessageID: d.interaction.response_message_id,
                        responseMessageLoading: d.interaction.response_message_loading,
                        type: d.interaction.type,
                    },
                    resource: d.resource ? {
                        type: d.resource.type,
                        activityInstance: d.resource.activity_instance,
                        message: d.resource.message ? this._manager.client.util.updateMessage(d.resource.message) : undefined,
                    } : undefined,
                };
            }
            return null;
        });
    }
    /**
     * Delete a follow-up message.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @param messageID The ID of the message.
     * @caching This method **does not** cache its result.
     */
    async deleteFollowupMessage(applicationID, interactionToken, messageID) {
        await this._manager.webhooks.deleteMessage(applicationID, interactionToken, messageID);
    }
    /**
     * Delete the original interaction response.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @caching This method **does not** cache its result.
     */
    async deleteOriginalMessage(applicationID, interactionToken) {
        await this.deleteFollowupMessage(applicationID, interactionToken, "@original");
    }
    /**
     * Edit a followup message.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @param messageID The ID of the message.
     * @param options The options for editing the followup message.
     * @caching This method **does not** cache its result.
     */
    async editFollowupMessage(applicationID, interactionToken, messageID, options) {
        return this._manager.webhooks.editMessage(applicationID, interactionToken, messageID, options);
    }
    /**
     * Edit an original interaction response.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @param options The options for editing the original message.
     * @caching This method **does not** cache its result.
     */
    async editOriginalMessage(applicationID, interactionToken, options) {
        return this.editFollowupMessage(applicationID, interactionToken, "@original", options);
    }
    /**
     * Get a followup message.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @param messageID The ID of the message.
     * @caching This method **does not** cache its result.
     */
    async getFollowupMessage(applicationID, interactionToken, messageID) {
        return this._manager.webhooks.getMessage(applicationID, interactionToken, messageID);
    }
    /**
     * Get an original interaction response.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @caching This method **does not** cache its result.
     */
    async getOriginalMessage(applicationID, interactionToken) {
        return this.getFollowupMessage(applicationID, interactionToken, "@original");
    }
}
exports.default = Interactions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3JvdXRlcy9JbnRlcmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0NBQWdDO0FBQ2hDLDRDQUF3RDtBQUN4RCxnRkFBZ0Q7QUFDaEQsK0RBQXlDO0FBTXpDLHVKQUF1SjtBQUN2SixNQUFxQixZQUFZO0lBQ3JCLFFBQVEsQ0FBYztJQUM5QixZQUFZLE9BQW9CO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMscUJBQXFCLENBQXNFLGFBQXFCLEVBQUUsZ0JBQXdCLEVBQUUsT0FBOEM7UUFDNUwsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUksYUFBYSxFQUFFLGdCQUFnQixFQUFFLE9BQW1ELENBQUMsQ0FBQztJQUNuSSxDQUFDO0lBWUQsS0FBSyxDQUFDLHlCQUF5QixDQUF5SSxhQUFxQixFQUFFLGdCQUF3QixFQUFFLE9BQStDLEVBQUUsWUFBWSxHQUFHLEtBQUs7UUFDMVIsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsSUFBSSxJQUFhLENBQUM7UUFDbEIsUUFBUSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsS0FBSyxvQ0FBd0IsQ0FBQyxJQUFJLENBQUM7WUFDbkMsS0FBSyxvQ0FBd0IsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQyxLQUFLLG9DQUF3QixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLE1BQU07WUFDVixDQUFDO1lBQ0QsS0FBSyxvQ0FBd0IsQ0FBQywyQkFBMkIsQ0FBQztZQUMxRCxLQUFLLG9DQUF3QixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQUks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