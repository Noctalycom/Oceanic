"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module REST/Webhooks */
const Message_1 = tslib_1.__importDefault(require("../structures/Message"));
const Webhook_1 = tslib_1.__importDefault(require("../structures/Webhook"));
const QueryBuilder_1 = tslib_1.__importDefault(require("../util/QueryBuilder"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
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
                name: options.name,
            },
            reason: options.reason,
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
            reason,
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
            path: Routes.WEBHOOK_MESSAGE(webhookID, token, messageID),
            query,
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
            path: Routes.WEBHOOK(webhookID, token),
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
                name: options.name,
            },
            reason: options.reason,
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
        query.setIfPresent("thread_id", options.threadID);
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
                        poll_media: a.pollMedia,
                    })),
                    duration: options.poll.duration,
                    layout_type: options.poll.layoutType,
                    question: options.poll.question,
                } : undefined,
            },
            query,
            files: options.files ?? undefined,
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
                name: options.name,
            },
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
                        poll_media: a.pollMedia,
                    })),
                    duration: options.poll.duration,
                    layout_type: options.poll.layoutType,
                    question: options.poll.question,
                } : undefined,
                thread_name: options.threadName,
                tts: options.tts,
                username: options.username,
            },
            files: options.files,
        }).then(res => res === null ? undefined : new Message_1.default(res, this._manager.client));
    }
    async executeGithub(webhookID, token, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("wait", options.wait);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.WEBHOOK_PLATFORM(webhookID, token, "github"),
            query,
            json: options,
        }).then(res => res === null ? undefined : new Message_1.default(res, this._manager.client));
    }
    async executeSlack(webhookID, token, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("wait", options.wait);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.WEBHOOK_PLATFORM(webhookID, token, "slack"),
            query,
            json: options,
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
            path: Routes.WEBHOOK(webhookID, token),
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
            path: Routes.CHANNEL_WEBHOOKS(channelID),
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
            path: Routes.GUILD_WEBHOOKS(guildID),
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
            path: Routes.WEBHOOK_MESSAGE(webhookID, token, messageID),
            query,
        }).then(data => new Message_1.default(data, this._manager.client));
    }
}
exports.default = Webhooks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViaG9va3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcm91dGVzL1dlYmhvb2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRCQUE0QjtBQUM1Qiw0RUFBNEM7QUFDNUMsNEVBQTRDO0FBQzVDLGdGQUFnRDtBQUNoRCwrREFBeUM7QUFLekMsMklBQTJJO0FBQzNJLE1BQXFCLFFBQVE7SUFDakIsUUFBUSxDQUFjO0lBQzlCLFlBQVksT0FBb0I7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFpQixFQUFFLE9BQTRDO1FBQ3hFLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELElBQUksTUFBMEIsQ0FBQztRQUMvQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNqQixNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQy9FLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUE0QjtZQUN4RCxNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1lBQ3hDLElBQUksRUFBRTtnQkFDRixNQUFNO2dCQUNOLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTthQUNyQjtZQUNELE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtTQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxpQkFBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1B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