const Operation = require('src/app/operations/order/getOrderOperation');

describe('app :: operations :: order :: getOrderOperation', () => {
    describe('#execute', () => {
        let dbGetOrderService, operation;

        beforeEach(() => {
            dbGetOrderService = { findOne: jest.fn().mockReturnValue({}) };
            operation = Operation({ dbGetOrderService });
        });

        it('Should call execute', async () => {
            const order_id_quiq = '123', merchantId=1;

            await operation.execute({
                order_id_quiq,
                merchantId
            });

            expect(dbGetOrderService.findOne).toHaveBeenCalledWith(
                {   order_id_quiq,
                    'payload_received.order.pdvMerchantId': merchantId
                },
                { payload_to_pdv: true }
            );
        });
    });
});
