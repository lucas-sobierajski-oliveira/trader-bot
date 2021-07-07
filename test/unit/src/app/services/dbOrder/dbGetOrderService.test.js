const DbGetOrderService = require('src/app/services/dbOrder/dbGetOrderService');

describe('app :: services :: dbOrder :: dbGetOrderService', () => {
    describe('#findOne', () => {
        describe('success', () => {
            let pdvRepository, dbGetOrderService, toJSON;

            beforeEach(() => {
                toJSON = jest.fn();
                pdvRepository = { findOne: jest.fn().mockReturnValue({ toJSON }) };
                dbGetOrderService = DbGetOrderService({ pdvRepository });
            });

            it('Should call findOne', async () => {
                const query = { order_id_pdv: '123' };
                const fields = { payload_to_pdv: true };

                await dbGetOrderService.findOne(query, fields);

                expect(pdvRepository.findOne).toHaveBeenCalledWith(query, fields);
            });
        });

        describe('Don\'t Finded', () => {
            let pdvRepository, dbGetOrderService;

            beforeEach(() => {
                pdvRepository = { findOne: jest.fn().mockReturnValue(null) };
                dbGetOrderService = DbGetOrderService({ pdvRepository });
            });

            it('Should call findOne', async () => {
                const query = { order_id_pdv: '123' };
                const fields = { payload_to_pdv: true };

                await dbGetOrderService.findOne(query, fields);

                expect(pdvRepository.findOne).toHaveBeenCalledWith(query, fields);
            });
        });
    });

    describe('#find', () => {
        let pdvRepository, dbGetOrderService;

        beforeEach(() => {
            pdvRepository = { find: jest.fn().mockReturnValue([]) };
            dbGetOrderService = DbGetOrderService({ pdvRepository });
        });

        it('Should call find successfully', async () => {
            const query = { ack: false, 'payload_received.order.pdvMerchantId': '1' };
            const fields = { payload_to_pdv: true };
            const response = await dbGetOrderService.find(query, fields);

            expect(pdvRepository.find).toHaveBeenCalledWith(query, fields);
            expect(response).toEqual([]);
        });
    });
});
