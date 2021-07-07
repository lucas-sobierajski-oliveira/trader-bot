const Service = require('src/app/services/dbOrder/dbUpdateOrderService');

describe('app :: services :: dbOrder :: dbOrderUpdateService', () => {
    describe('#updateArrayField', () => {
        describe('success', () => {
            let pdvRepository, service, arrayFieldEnum;

            beforeEach(() => {
                arrayFieldEnum = { STATUS_RECORD:'status_record' };
                pdvRepository = { updateArrayField: jest.fn().mockReturnValue({}),
                    update:jest.fn() };
                service = Service({ pdvRepository, arrayFieldEnum });
            });

            it('Should call updateArrayField', async () => {
                const query = { order_id_pdv: '123' };
                const item = { status: true };

                await service.updateArrayField(query, item);

                expect(pdvRepository.updateArrayField).toHaveBeenCalledWith(
                    query,
                    arrayFieldEnum.STATUS_RECORD,
                    { status_record: item }
                );
            });

            it('Should call update', async () => {
                const query = { order_id_pdv: '123' };
                const field = { status: true };

                await service.update(query, field);

                expect(pdvRepository.update).toHaveBeenCalledWith(query, field);
            });
        });
    });
});
