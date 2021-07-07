const sqsManagerService = require('src/app/services/sqsManagerService');

describe('src :: app :: services :: sqsManagerService', () => {
    describe('#removeByReceiptHandle ', () => {
        let service, sqsClient, logger, exception;
        describe('Success', () => {
            beforeEach(() => {
                sqsClient = {
                    remove: jest.fn().mockReturnValue({ failed: [] })
                };
                logger = { info: jest.fn() };
                exception = {
                    notFound: jest.fn().mockReturnValue(new Error())
                };
                service = sqsManagerService({ sqsClient, logger, exception });
            });

            it('Should call sqsClient', async () => {
                const ReceiptHandle = '123123123';
                await service.removeByReceiptHandle({ ReceiptHandle });
                expect(sqsClient.remove).toHaveBeenCalledWith(ReceiptHandle);
                expect(exception.notFound).not.toHaveBeenCalled();
            });
        });

        describe('Fail', () => {
            beforeEach(() => {
                sqsClient = {
                    remove: jest.fn().mockReturnValue({ failed: ['', ''] })
                };
                logger = { info: jest.fn() };
                exception = {
                    notFound: jest.fn().mockReturnValue(new Error())
                };
                service = sqsManagerService({ sqsClient, logger, exception });
            });

            it('Should call sqsClient', async () => {
                const ReceiptHandle = '123123123';
                try {
                    await service.removeByReceiptHandle({ ReceiptHandle });
                } catch (error) {
                    expect(sqsClient.remove).toHaveBeenCalledWith(ReceiptHandle);
                    expect(error).toEqual(new Error());
                }
            });
        });
    });
});
