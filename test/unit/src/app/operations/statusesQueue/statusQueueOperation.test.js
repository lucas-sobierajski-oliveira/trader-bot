const Operation = require('src/app/operations/statusesQueue/statusesQueueOperation');

describe('App :: operation :: statusesQueue :: statusesQueueOperation', () => {
    describe('#execute', () => {
        let dbGetOrderService, operation, exception, statusesQueueClient, mockDbReturn;

        beforeEach(() => {
            mockDbReturn = { id:'1' };
            dbGetOrderService = { findOne: jest.fn().mockReturnValue(mockDbReturn) };
            statusesQueueClient = { addJob: jest.fn() };
            exception = {
                notFound: jest.fn()
            };
            httpConstants = {
                code: {
                    BAD_REQUEST:'BAD_REQUEST'
                }
            };

            operation = Operation({
                dbGetOrderService,
                exception,
                statusesQueueClient,
                httpConstants
            });
        });


        it('Execute', async () => {
            const data = { order_id_quiq:'123', newStatus:'CONFIRMED' };

            await operation.execute(data);

            expect(dbGetOrderService.findOne).toHaveBeenCalledWith({ order_id_quiq:data.order_id_quiq });
            expect(statusesQueueClient.addJob).toHaveBeenCalledWith({ dbObject:mockDbReturn, status:data.newStatus });

            expect(exception.notFound).not.toHaveBeenCalled();
        });
    });
    describe('#execute faill', () => {
        let dbGetOrderService, operation, exception, statusesQueueClient;

        beforeEach(() => {
            dbGetOrderService = { findOne: jest.fn().mockReturnValue(null) };
            statusesQueueClient = { addJob: jest.fn() };
            exception = {
                notFound: jest.fn().mockReturnValue(new Error())
            };
            httpConstants = {
                code: {
                    BAD_REQUEST:'BAD_REQUEST'
                }
            };

            operation = Operation({
                dbGetOrderService,
                exception,
                statusesQueueClient,
                httpConstants
            });
        });


        it('Execute faill dbobject not find', async () => {
            const data = { order_id_quiq:'123', newStatus:'CONFIRMED' };

            try {
                await operation.execute(data);

            } catch (err) {
                expect(dbGetOrderService.findOne).toHaveBeenCalledWith({ order_id_quiq:data.order_id_quiq });
                expect(statusesQueueClient.addJob).not.toHaveBeenCalled();

                expect(exception.notFound).toHaveBeenCalledWith(
                    `Order with id ${data.order_id_quiq}, not found on database or cannot be processed`,
                    httpConstants.code.BAD_REQUEST
                );
            }
        });
    });
});
