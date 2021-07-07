const OrderTrackingQueueService = require('src/app/services/orderTracking/orderTrackingQueueService');

describe('src :: app :: services :: orderTracking :: OrderTrackingQueueService', () => {
    describe('#sendMessage ', () => {
        let service, sqsClient, config;

        describe('Success', () => {
            beforeEach(() => {
                sqsClient = { send: jest.fn() };
                config = {
                    integration: {
                        queues: {
                            sqs: {
                                quiqOrderTrackingService: {
                                    url: 'queueURL'
                                }
                            }
                        }
                    }
                };
                service = OrderTrackingQueueService({ sqsClient, config });
            });

            it('Should call sqsClient ', async () => {
                const data = {
                    MessageBody: 'messagebody',
                    MessageGroupId: 'groupId',
                    MessageDeduplicationId: 'duplicationId'
                };

                await service.sendMessage(data);

                expect(sqsClient.send).toHaveBeenCalledWith(data.MessageBody, {
                    MessageGroupId: data.MessageGroupId,
                    MessageDeduplicationId: data.MessageDeduplicationId,
                    QueueUrl: config.integration.queues.sqs.quiqOrderTrackingService.url
                });
            });
        });
    });
});
