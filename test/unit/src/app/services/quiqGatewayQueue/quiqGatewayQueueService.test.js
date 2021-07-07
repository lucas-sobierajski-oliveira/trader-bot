const quiqGatewayQueueService = require('src/app/services/quiqGatewayQueue/quiqGatewayQueueService');

describe('App :: services :: quiqGatewayQueue :: quiqGatewayQueueService', () => {
    let quiqGatewayQueue;
    const sqsClient = {
            send: jest.fn()
        },
        config = {
            integration: {
                queues: {
                    sqs: {
                        quiqGatewayQueue: {
                            url: 'url'
                        }
                    }
                }
            }
        };

    beforeEach(() => {
        quiqGatewayQueue = quiqGatewayQueueService({
            sqsClient,
            config
        });
    });
    it('Should send queue calling sqsClient', () => {
        const data = {
            orderId: 'orderId'
        };
        quiqGatewayQueue.sendMessage(data);

        const params = {
            MessageDeduplicationId: expect.any(String),
            MessageGroupId: 'orderId',
            QueueUrl: 'url'
        };
        expect(sqsClient.send).toHaveBeenCalledWith(data, params);
    });
});
