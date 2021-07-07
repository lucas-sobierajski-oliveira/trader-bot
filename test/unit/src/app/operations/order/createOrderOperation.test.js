const Operation = require('src/app/operations/order/createOrderOperation');

describe('app :: operations :: order :: createOrderOperation', () => {
    describe('#execute', () => {
        let dbCreateOrderService, operation,
            exception, databaseFactory,
            dbGetOrderService, httpConstants, factoryPayload;

        beforeEach(() => {
            httpConstants = {
                code:{
                    BAD_REQUEST:'BAD REQUEST'
                }
            };

            factoryPayload = { data:{ id:1 } };

            dbGetOrderService = {
                findOne: jest.fn().mockReturnValue(null)
            };
            dbCreateOrderService = { execute: jest.fn().mockReturnValue({}) };
            databaseFactory = {
                buildPayload: jest.fn().mockReturnValue(factoryPayload)
            };

            exception = {
                notFound: jest.fn()
            };

            operation = Operation({
                dbGetOrderService,
                dbCreateOrderService,
                databaseFactory,
                exception,
                httpConstants
            });
        });

        it('Should call execute only', async () => {
            const data = { order:{ id:1 } };

            await operation.execute(data);


            expect(dbGetOrderService.findOne).toHaveBeenCalledWith({
                order_id_quiq:data.order.id
            });
            expect(exception.notFound).not.toHaveBeenCalled();

            expect(databaseFactory.buildPayload).toHaveBeenCalledWith(data);
            expect(dbCreateOrderService.execute).toHaveBeenCalledWith(factoryPayload);

        });
    });

    describe('#execute faill', () => {
        let dbCreateOrderService, operation,
            exception, databaseFactory,
            dbGetOrderService, finded, httpConstants;

        beforeEach(() => {
            finded = { order:{ id:111 } };

            httpConstants = {
                code:{
                    BAD_REQUEST:'BAD REQUEST'
                }
            };

            dbGetOrderService = {
                findOne: jest.fn().mockReturnValue(finded)
            };
            dbCreateOrderService = { execute: jest.fn().mockReturnValue({}) };
            databaseFactory = {
                buildPayload: jest.fn().mockReturnValue({})
            };

            exception = {
                notFound: jest.fn().mockReturnValue(new Error())
            };

            operation = Operation({
                dbGetOrderService,
                dbCreateOrderService,
                databaseFactory,
                exception,
                httpConstants
            });
        });

        it('Should call execute only', async () => {
            const data = { order:{ id:1 } };

            try {
                await operation.execute(data);

            } catch (err) {
                expect(dbGetOrderService.findOne).toHaveBeenCalledWith({
                    order_id_quiq:data.order.id
                });
                expect(exception.notFound).toHaveBeenCalledWith(
                    `Order with id ${data.order.id}, is already registered in the database and cannot be inserted again.`,
                    httpConstants.code.BAD_REQUEST);

                expect(databaseFactory.buildPayload).not.toHaveBeenCalled();
                expect(dbCreateOrderService.execute).not.toHaveBeenCalled();
            }
        });
    });
});
