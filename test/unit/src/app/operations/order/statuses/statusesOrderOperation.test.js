const Operation = require('src/app/operations/order/statuses/statusesOrderOperation');

describe('app :: operations :: order :: Statuses :: statusesOrderOperation', () => {
    describe('#execute ', () => {
        let dbUpdateOrderService, operation, quiqGatewayFactory, quiqGatewayQueueService;

        beforeEach(() => {
            dbUpdateOrderService = { updateArrayField: jest.fn().mockReturnValue({}), update: jest.fn() };
            quiqGatewayFactory = {
                buildPayload: jest.fn().mockReturnValue({
                    orderId: expect.any(String),
                    event: expect.any(String),
                    timestamp: expect.any(String),
                    pdv: 'GENERIC'
                })
            };
            quiqGatewayQueueService = {
                sendMessage: jest.fn()
            };

            operation = Operation({
                dbUpdateOrderService,
                quiqGatewayFactory,
                quiqGatewayQueueService
            });
        });

        it('Should call execute', async () => {
            const data = {
                dbObject: {
                    order_id_quiq: '123'
                },
                status: 'CONFIRMED'
            };

            const query = { order_id_quiq: data.dbObject.order_id_quiq };

            await operation.execute({ data });

            expect(dbUpdateOrderService.updateArrayField).toHaveBeenCalledWith(query, data.status);

            expect(dbUpdateOrderService.update).toHaveBeenCalledWith(query, { current_status: data.status });
            expect(quiqGatewayFactory.buildPayload).toHaveBeenCalledWith(data);
            expect(quiqGatewayQueueService.sendMessage).toHaveBeenCalledWith({
                orderId: expect.any(String),
                event: expect.any(String),
                timestamp: expect.any(String),
                pdv: 'GENERIC'
            });
        });
    });
});
