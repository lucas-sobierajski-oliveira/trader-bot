const Service = require('src/app/services/dbOrder/dbCreateOrderService');

describe('app :: services :: dbOrder :: dbCreateOrderService', () => {
    describe('#execute', () => {
        describe('success', () => {
            let pdvRepository, service, toJSON;

            beforeEach(() => {
                toJSON = jest.fn().mockReturnValue({});
                pdvRepository = { create: jest.fn().mockReturnValue({ toJSON }) };
                service = Service({ pdvRepository });
            });

            it('Should call execute', async () => {
                const data = { order_id_pdv: '123' };

                await service.execute(data);

                expect(pdvRepository.create).toHaveBeenCalledWith(data);
                expect(toJSON).toHaveBeenCalled();
            });
        });
    });
});
