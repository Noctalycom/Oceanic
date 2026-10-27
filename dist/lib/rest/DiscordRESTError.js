"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** A REST error received from Discord. */
class DiscordRESTError extends Error {
    code;
    method;
    name = "DiscordRESTError";
    resBody;
    response;
    constructor(res, resBody, method, stack) {
        super();
        this.code = Number(resBody.code);
        Object.defineProperties(this, {
            method: {
                value: method,
                enumerable: false,
            },
            response: {
                value: res,
                enumerable: false,
            },
            resBody: {
                value: resBody,
                enumerable: false,
            },
        });
        let message = "message" in resBody ? `${resBody.message} on ${this.method} ${this.path}` : `Unknown Error on ${this.method} ${this.path}`;
        if ("errors" in resBody) {
            message += `\n ${DiscordRESTError.flattenErrors(resBody.errors).join("\n ")}`;
        }
        else {
            const errors = DiscordRESTError.flattenErrors(resBody);
            if (errors.length !== 0) {
                message += `\n ${errors.join("\n ")}`;
            }
        }
        this.message = message;
        if (stack) {
            this.stack = `${this.name}: ${this.message}\n${stack}`;
        }
        else {
            Error.captureStackTrace(this, DiscordRESTError);
        }
    }
    static flattenErrors(errors, keyPrefix = "") {
        let messages = [];
        for (const fieldName in errors) {
            if (!Object.hasOwn(errors, fieldName) || fieldName === "message" || fieldName === "code") {
                continue;
            }
            if (typeof errors[fieldName] === "object" && errors[fieldName] !== null) {
                if ("_errors" in errors[fieldName]) {
                    messages = messages.concat(errors[fieldName]._errors.map((err) => `${keyPrefix}${fieldName}: ${err.message}`));
                }
                else if (Array.isArray(errors[fieldName])) {
                    messages = messages.concat(errors[fieldName].map(str => `${keyPrefix}${fieldName}: ${typeof str === "object" && "message" in str ? str.message : str}`));
                }
                else {
                    messages = messages.concat(DiscordRESTError.flattenErrors(errors[fieldName], `${keyPrefix}${fieldName}.`));
                }
            }
        }
        return messages;
    }
    get headers() {
        return this.response.headers;
    }
    get path() {
        return new URL(this.response.url).pathname;
    }
    get status() {
        return this.response.status;
    }
    get statusText() {
        return this.response.statusText;
    }
    toJSON() {
        return {
            message: this.message,
            method: this.method,
            name: this.name,
            resBody: this.resBody,
            stack: this.stack ?? "",
        };
    }
}
exports.default = DiscordRESTError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY29yZFJFU1RFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9yZXN0L0Rpc2NvcmRSRVNURXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSwwQ0FBMEM7QUFDMUMsTUFBcUIsZ0JBQWlCLFNBQVEsS0FBSztJQUMvQyxJQUFJLENBQVM7SUFDYixNQUFNLENBQWM7SUFDWCxJQUFJLEdBQUcsa0JBQWtCLENBQUM7SUFDbkMsT0FBTyxDQUFrQztJQUN6QyxRQUFRLENBQVk7SUFDcEIsWUFBWSxHQUFhLEVBQUUsT0FBZ0MsRUFBRSxNQUFrQixFQUFFLEtBQWM7UUFDM0YsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRTtZQUMxQixNQUFNLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLE1BQU07Z0JBQ2IsVUFBVSxFQUFFLEtBQUs7YUFDcEI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsVUFBVSxFQUFFLEtBQUs7YUFDcEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsVUFBVSxFQUFFLEtBQUs7YUFDcEI7U0FDSixDQUFDLENBQUM7UUFFSCxJQUFJLE9BQU8sR0FBRyxTQUFTLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFJLE9BQStCLENBQUMsT0FBTyxPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkssSUFBSSxRQUFRLElBQUksT0FBTyxFQUFFLENBQUM7WUFDdEIsT0FBTyxJQUFJLE1BQU0sZ0JBQWdCLENBQUMsYUFBYSxDQUFF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