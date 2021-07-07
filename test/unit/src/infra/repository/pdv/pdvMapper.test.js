const Mapper = require('src/infra/repository/pdv/pdvMapper');

describe('infra :: repository :: pdv :: pdvMapper ', () => {
    describe('#toEntity and toDatabase', () => {
        let mapper, pdvEntity;

        beforeEach(() => {
            pdvEntity = jest.fn().mockImplementation(() => {
                return {
                    attributes: {
                        order_id_pdv: '1123',
                        payload: {}
                    }
                };
            });

            mapper = Mapper({
                pdvEntity
            });
        });

        it('Should call toEntity', async () => {
            const data = {
                id: '1123',
                payload: {}
            };

            const entity = mapper.toEntity(data);
            expect(entity).toBeDefined();
        });

        it('Should call toDatabase', async () => {
            const data = {
                id: '1123',
                payload: {}
            };
            const entity = mapper.toDatabase(data);
            expect(entity).toBeDefined();
            expect(pdvEntity).toHaveBeenCalledWith(data);
        });
    });
});
