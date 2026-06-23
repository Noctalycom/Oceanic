"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Routes = tslib_1.__importStar(require("../util/Routes"));
const Webhook_1 = tslib_1.__importDefault(require("../structures/Webhook"));
const Message_1 = tslib_1.__importDefault(require("../structures/Message"));
const QueryBuilder_1 = tslib_1.__importDefault(require("../util/QueryBuilder"));
/** Various methods for interacting with webhooks. Located at {@link Client#rest | Client#rest}{@link RESTManager#webhooks | .webhooks}. */
class Webhooks {
    _manager;
    constructor(manager) {
        this._manager = manager;
    }
    /**
     * Create a channel webhook.
     * @param channelID The ID of the channel to create the webhook in.
     * @param options The options to create the webhook with.
     * @caching This method **does not** cache its result.
     */
    async create(channelID, options) {
        options = this._manager.client.util._freeze(options);
        let avatar;
        if (options.avatar) {
            avatar = this._manager.client.util._convertImage(options.avatar, "avatar");
        }
        return this._manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_WEBHOOKS(channelID),
            json: {
                avatar,
                name: options.name
            },
            reason: options.reason
        }).then(data => new Webhook_1.default(data, this._manager.client));
    }
    /**
     * Delete a webhook.
     * @param webhookID The ID of the webhook.
     * @param reason The reason for deleting the webhook.
     * @caching This method **does not** cache its result.
     */
    async delete(webhookID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.WEBHOOK(webhookID),
            reason
        });
    }
    /**
     * Delete a webhook message.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message.
     * @param options The options for deleting the message.
     * @caching This method **does not** cache its result.
     */
    async deleteMessage(webhookID, token, messageID, options) {
        const query = new QueryBuilder_1.default();
        query.setIfPresent("thread_id", options?.threadID);
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.WEBHOOK_MESSAGE(webhookID, token, messageID)
        });
    }
    /**
     * Delete a webhook via its token.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @caching This method **does not** cache its result.
     */
    async deleteToken(webhookID, token) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.WEBHOOK(webhookID, token)
        });
    }
    /**
     * Edit a webhook.
     * @param webhookID The ID of the webhook.
     * @param options The options for editing the webhook.
     * @caching This method **does not** cache its result.
     */
    async edit(webhookID, options) {
        options = this._manager.client.util._freeze(options);
        let avatar;
        if (options.avatar) {
            avatar = this._manager.client.util._convertImage(options.avatar, "avatar");
        }
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.WEBHOOK(webhookID),
            json: {
                avatar,
                channel_id: options.channelID,
                name: options.name
            },
            reason: options.reason
        }).then(data => new Webhook_1.default(data, this._manager.client));
    }
    /**
     * Edit a webhook message.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     * @caching This method **does not** cache its result.
     */
    async editMessage(webhookID, token, messageID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("thread_id", options?.threadID);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.WEBHOOK_MESSAGE(webhookID, token, messageID),
            json: {
                allowed_mentions: this._manager.client.util.formatAllowedMentions(options.allowedMentions),
                attachments: options.attachments,
                components: options.components ? this._manager.client.util.componentsToRaw(options.components) : undefined,
                content: options.content,
                embeds: options.embeds ? this._manager.client.util.embedsToRaw(options.embeds) : undefined,
                flags: options.flags,
                poll: options.poll ? {
                    allow_multiselect: options.poll.allowMultiselect,
                    answers: options.poll.answers.map(a => ({
                        poll_media: a.pollMedia
                    })),
                    duration: options.poll.duration,
                    layout_type: options.poll.layoutType,
                    question: options.poll.question
                } : undefined
            },
            query,
            files: options.files ?? undefined
        }).then(data => new Message_1.default(data, this._manager.client));
    }
    /**
     * Edit a webhook via its token.
     * @param webhookID The ID of the webhook.
     * @param options The options for editing the webhook.
     * @caching This method **does not** cache its result.
     */
    async editToken(webhookID, token, options) {
        options = this._manager.client.util._freeze(options);
        let avatar;
        if (options.avatar) {
            avatar = this._manager.client.util._convertImage(options.avatar, "avatar");
        }
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.WEBHOOK(webhookID, token),
            json: {
                avatar,
                name: options.name
            }
        }).then(data => new Webhook_1.default(data, this._manager.client));
    }
    async execute(webhookID, token, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("wait", options.wait);
        query.setIfPresent("with_components", options.withComponents);
        query.setIfPresent("thread_id", options.threadID);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.WEBHOOK(webhookID, token),
            query,
            json: {
                allowed_mentions: this._manager.client.util.formatAllowedMentions(options.allowedMentions),
                attachments: options.attachments,
                avatar_url: options.avatarURL,
                components: options.components ? this._manager.client.util.componentsToRaw(options.components) : undefined,
                content: options.content,
                embeds: options.embeds ? this._manager.client.util.embedsToRaw(options.embeds) : undefined,
                flags: options.flags,
                poll: options.poll ? {
                    allow_multiselect: options.poll.allowMultiselect,
                    answers: options.poll.answers.map(a => ({
                        poll_media: a.pollMedia
                    })),
                    duration: options.poll.duration,
                    layout_type: options.poll.layoutType,
                    question: options.poll.question
                } : undefined,
                thread_name: options.threadName,
                tts: options.tts,
                username: options.username
            },
            files: options.files
        }).then(res => res === null ? undefined : new Message_1.default(res, this._manager.client));
    }
    async executeGithub(webhookID, token, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("wait", options?.wait);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.WEBHOOK_PLATFORM(webhookID, token, "github"),
            query,
            json: options
        }).then(res => res === null ? undefined : new Message_1.default(res, this._manager.client));
    }
    async executeSlack(webhookID, token, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("wait", options?.wait);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.WEBHOOK_PLATFORM(webhookID, token, "slack"),
            query,
            json: options
        }).then(res => res === null ? undefined : new Message_1.default(res, this._manager.client));
    }
    /**
     * Get a webhook by ID (and optionally token).
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @caching This method **does not** cache its result.
     */
    async get(webhookID, token) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.WEBHOOK(webhookID, token)
        }).then(data => new Webhook_1.default(data, this._manager.client));
    }
    /**
     * Get the webhooks in the specified channel.
     * @param channelID The ID of the channel to get the webhooks of.
     * @caching This method **does not** cache its result.
     */
    async getForChannel(channelID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_WEBHOOKS(channelID)
        }).then(data => data.map(d => new Webhook_1.default(d, this._manager.client)));
    }
    /**
     * Get the webhooks in the specified guild.
     * @param guildID The ID of the guild to get the webhooks of.
     * @caching This method **does not** cache its result.
     */
    async getForGuild(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_WEBHOOKS(guildID)
        }).then(data => data.map(d => new Webhook_1.default(d, this._manager.client)));
    }
    /**
     * Get a webhook message.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message.
     * @param threadID The ID of the thread the message is in.
     * @caching This method **does not** cache its result.
     */
    async getMessage(webhookID, token, messageID, threadID) {
        const query = new QueryBuilder_1.default();
        query.setIfPresent("thread_id", threadID);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.WEBHOOK_MESSAGE(webhookID, token, messageID)
        }).then(data => new Message_1.default(data, this._manager.client));
    }
}
exports.default = Webhooks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViaG9va3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcm91dGVzL1dlYmhvb2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLCtEQUF5QztBQUN6Qyw0RUFBNEM7QUFDNUMsNEVBQTRDO0FBRTVDLGdGQUFnRDtBQUVoRCwySUFBMkk7QUFDM0ksTUFBcUIsUUFBUTtJQUNqQixRQUFRLENBQWM7SUFDOUIsWUFBWSxPQUFvQjtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQWlCLEVBQUUsT0FBNEM7UUFDeEUsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsSUFBSSxNQUEwQixDQUFDO1FBQy9CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0UsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQTRCO1lBQ3hELE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDMUMsSUFBSSxFQUFJO2dCQUNKLE1BQU07Z0JBQ04sSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO2FBQ3JCO1lBQ0QsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1NBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLGlCQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMs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