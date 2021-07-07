const PollingOperation = require('src/app/operations/event/pollingOperation');

describe('app :: operations :: event :: pollingOperation', () => {
    describe('#execute', () => {
        let dbGetOrderService, pollingOperation;

        beforeEach(() => {
            dbGetOrderService = { find: jest.fn().mockReturnValue([]) };
            pollingOperation = PollingOperation({ dbGetOrderService });
        });

        it('Should be successfully called', async () => {
            const merchantId = 1;
            const query = { ack: false, 'payload_received.order.pdvMerchantId': merchantId };
            const fields = { payload_to_pdv: true };
            const response = await pollingOperation.execute(merchantId);

            expect(dbGetOrderService.find).toHaveBeenCalledWith(query, fields);
            expect(response).toStrictEqual([]);
        });
    });
});
