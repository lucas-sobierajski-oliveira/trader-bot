const { SQS } = require('aws-sdk');
jest.mock('aws-sdk');

const SqsClient = require('src/infra/integration/queue/aws/sqs/sqsClient');

describe('Infra :: Integration :: aws :: queue :: sqs :: SqsClient ', () => {
    describe('#getSqs', () => {
        let sqsClient, logger, config;

        beforeEach(() => {
            config = {
                integration: {
                    queues: {
                        aws: {
                            apiVersion: '2021',
                            awsawsRegion: 'US'
                        },
                        sqs: { pdvServiceQueue: { url: 'queueURL' } }
                    }
                }
            };
            logger = {
                error: jest.fn(),
                info: jest.fn()
            };

            sqsClient = SqsClient({
                logger,
                config
            });
        });

        it('Should return instance of the SQS', async () => {
            const instance = await sqsClient.getSqs();
            expect(instance).toBeInstanceOf(SQS);
        });
    });

    describe('#send', () => {
        let sqsClient, logger, config;
        const sendMessage = jest.fn().mockReturnThis(),
            promise = jest.fn().mockReturnValue({
                MessageId: 'messageID'
            });

        beforeEach(() => {
            config = {
                integration: {
                    queues: {
                        aws: {
                            apiVersion: '2021',
                            awsRegion: 'US'
                        },
                        sqs: { pdvServiceQueue: { url: 'queueURL' } }
                    }
                }
            };
            logger = {
                error: jest.fn(),
                info: jest.fn()
            };

            SQS.mockImplementation(() => {
                return {
                    sendMessage,
                    promise
                };
            });

            sqsClient = SqsClient({ logger, config });
        });

        it('Should send message to SQS', async () => {
            const message = 'payload',
                extraParams = { data: 1 };

            const data = await sqsClient.send(message, extraParams);

            expect(data).toHaveProperty('messageId', 'messageID');

            expect(sendMessage).toHaveBeenCalledWith({
                ...extraParams,
                MessageBody: JSON.stringify(message)
            });
            expect(promise).toHaveBeenCalledTimes(1);

            expect(logger.info).toHaveBeenCalledWith('Information sent to SQS');
        });
    });

    describe('#send', () => {
        let sqsClient, logger, config;
        const error = new Error('SQS Error');
        const sendMessage = jest.fn().mockReturnThis(),
            promise = jest.fn().mockImplementation(() => Promise.reject(error));

        beforeEach(() => {
            config = {
                integration: {
                    queues: {
                        aws: {
                            apiVersion: '2021',
                            awsRegion: 'US'
                        },
                        sqs: { pdvServiceQueue: { url: 'queueURL' } }
                    }
                }
            };
            logger = {
                error: jest.fn(),
                info: jest.fn()
            };

            SQS.mockImplementation(() => {
                return {
                    sendMessage,
                    promise
                };
            });

            sqsClient = SqsClient({ logger, config });
        });

        it('Should log error and return error', async () => {
            const message = 'payload';

            const data = await sqsClient.send(message);

            expect(data).toHaveProperty('error', error);

            expect(sendMessage).toHaveBeenCalledWith({
                MessageBody: JSON.stringify(message)
            });
            expect(promise).toHaveBeenCalledTimes(1);
            expect(logger.info).not.toHaveBeenCalled();

            expect(logger.error).toHaveBeenCalledWith(error);
        });
    });

    describe('#remove ', () => {
        let sqsClient, logger, config;
        const removeBatch = jest.fn();

        beforeEach(() => {
            config = {
                integration: {
                    queues: {
                        aws: {
                            apiVersion: '2021',
                            awsRegion: 'US'
                        },
                        sqs: { pdvServiceQueue: { url: 'queueURL' } }
                    }
                }
            };
            logger = {
                error: jest.fn(),
                info: jest.fn()
            };

            sqsClient = SqsClient({ logger, config });
            sqsClient.removeBatch = removeBatch;
        });

        it('Should log error and return error', async () => {
            const receiptsHandleArray = ['recipt'];
            const QueueUrl = config.integration.queues.sqs.pdvServiceQueue.url;

            await sqsClient.remove(receiptsHandleArray);

            expect(removeBatch).toHaveBeenCalledWith(QueueUrl, [receiptsHandleArray]);
            expect(logger.info).not.toHaveBeenCalled();
            expect(logger.error).not.toHaveBeenCalled();
        });
    });

    describe('#removeBatch', () => {
        let sqsClient, logger, config, send, deleteMessage;
        const error = new Error('SEND Error');

        beforeEach(() => {
            config = {
                integration: {
                    queues: {
                        aws: {
                            apiVersion: '2021',
                            awsRegion: 'US'
                        },
                        sqs: { pdvServiceQueue: { url: 'queueURL' } }
                    }
                }
            };
            logger = {
                error: jest.fn(),
                info: jest.fn()
            };

            send = jest
                .fn()
                .mockImplementation(() => Promise.reject(error))
                .mockReturnValueOnce();

            deleteMessage = jest.fn().mockReturnValue({
                send
            });

            SQS.mockImplementation(() => {
                return {
                    deleteMessage
                };
            });

            sqsClient = SqsClient({ logger, config });
        });

        it('Should return false when not receive reciptsHandleArray', async () => {
            const QueueUrl = 'queueURL';

            const data = await sqsClient.removeBatch(QueueUrl);

            expect(data).toBe(false);

            expect(deleteMessage).not.toHaveBeenCalled();

            expect(send).not.toHaveBeenCalled();

            expect(logger.error).not.toHaveBeenCalled();
        });

        it('Should return false when reciptsHandleArray is not a array', async () => {
            const QueueUrl = 'queueURL',
                receiptsHandleArray = {};

            const data = await sqsClient.removeBatch(QueueUrl, receiptsHandleArray);

            expect(data).toBe(false);

            expect(deleteMessage).not.toHaveBeenCalled();

            expect(send).not.toHaveBeenCalled();

            expect(logger.error).not.toHaveBeenCalled();
        });

        it('Should 1 processed and 0 failed', async () => {
            const QueueUrl = 'queueURL',
                receiptsHandleArray = ['item'];

            const data = await sqsClient.removeBatch(QueueUrl, receiptsHandleArray);

            expect(data).toHaveProperty('processed', receiptsHandleArray);
            expect(data).toHaveProperty('failed', []);

            expect(deleteMessage).toHaveBeenCalledWith({
                QueueUrl,
                ReceiptHandle: receiptsHandleArray[0]
            });

            expect(send).toHaveBeenCalledTimes(1);

            expect(logger.error).not.toHaveBeenCalled();
        });

        it('Should 1 processed and 1 failed', async () => {
            const QueueUrl = 'queueURL',
                receiptsHandleArray = ['item', 'item2'];

            const data = await sqsClient.removeBatch(QueueUrl, receiptsHandleArray);

            expect(data).toHaveProperty('processed', [receiptsHandleArray[0]]);

            expect(data).toHaveProperty('failed', [{ message: receiptsHandleArray[1], err: error }]);

            expect(deleteMessage).toHaveBeenCalledWith({
                QueueUrl,
                ReceiptHandle: receiptsHandleArray[0]
            });

            expect(send).toHaveBeenCalledTimes(2);

            expect(logger.error).toHaveBeenCalledTimes(1);
        });
    });
});
