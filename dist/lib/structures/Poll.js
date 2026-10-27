"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Poll {
    allowMultiselect;
    answers;
    client;
    expiry;
    layoutType;
    message;
    question;
    results;
    constructor(data, client, message) {
        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false,
            writable: false,
            configurable: false,
        });
        this.allowMultiselect = data.allow_multiselect;
        this.answers = data.answers.map(a => ({
            answerID: a.answer_id,
            pollMedia: a.poll_media,
        }));
        this.expiry = new Date(data.expiry);
        this.layoutType = data.layout_type;
        this.message = message;
        this.question = data.question;
        const res = data.results ?? { answer_counts: [], is_finalized: false };
        this.results = {
            answerCounts: res.answer_counts.map(a => ({
                count: a.count,
                id: a.id,
                meVoted: a.me_voted,
                users: [],
            })),
            isFinalized: res.is_finalized,
        };
        // this makes working with this much easier as a developer. We still have systems in place to insert missing answerCounts, if needs be
        for (const answer of data.answers) {
            if (!this.results.answerCounts.some(a => a.id === answer.answer_id)) {
                this.results.answerCounts.push({
                    count: 0,
                    id: answer.answer_id,
                    meVoted: false,
                    users: [],
                });
            }
        }
    }
    /** The user that created this poll. */
    get creator() {
        return this.message.author;
    }
    /** End this poll now. */
    async expire() {
        await this.client.rest.channels.expirePoll.call(this.client.rest.channels, this.message.channelID, this.message.id);
    }
    /**
     * Get the users that voted on a poll answer.
     * @param answerID The ID of the poll answer to get voters for.
     * @param options The options for getting the voters.
     */
    async getAnswerUsers(answerID, options) {
        return this.client.rest.channels.getPollAnswerUsers.call(this.client.rest.channels, this.message.channelID, this.message.id, answerID, options);
    }
    toJSON() {
        return {
            allowMultiselect: this.allowMultiselect,
            answers: this.answers,
            expiry: this.expiry.getTime(),
            layoutType: this.layoutType,
            question: this.question,
            results: this.results,
        };
    }
}
exports.default = Poll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1BvbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQSxNQUFxQixJQUFJO0lBQ3JCLGdCQUFnQixDQUFVO0lBQzFCLE9BQU8sQ0FBbUM7SUFDMUMsTUFBTSxDQUFVO0lBQ2hCLE1BQU0sQ0FBTztJQUNiLFVBQVUsQ0FBaUI7SUFDM0IsT0FBTyxDQUFVO0lBQ2pCLFFBQVEsQ0FBOEI7SUFDdEMsT0FBTyxDQUE2QjtJQUNwQyxZQUFZLElBQTRCLEVBQUUsTUFBYyxFQUFFLE9BQWdCO1FBQ3RFLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUNsQyxLQUFLLEVBQUUsTUFBTTtZQUNiLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsWUFBWSxFQUFFLEtBQUs7U0FDdEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFNBQVM7WUFDckIsU0FBUyxFQUFFLENBQUMsQ0FBQyxVQUFVO1NBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUs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