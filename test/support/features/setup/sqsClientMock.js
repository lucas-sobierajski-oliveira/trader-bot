const uuidv4 = require('uuid').v4;

const sqsMessages = [];

module.exports = () => {
    return {
        async send(message, extraParams = {}) {
            const MessageId = uuidv4();
            sqsMessages.push({
                messageBody: message,
                ...extraParams,
                MessageId
            });

            return { MessageId };
        },
        async getMessages(param, value) {
            return sqsMessages;
        }
    };
};
