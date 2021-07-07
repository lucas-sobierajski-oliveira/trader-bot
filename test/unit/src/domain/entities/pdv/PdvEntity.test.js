const jestStructure = require('jest-structure');
const uuid = require('uuid');

const PdvEntity = require('src/domain/entities/pdv/PdvEntity')();

describe('domain :: entities :: pdv :: PdvEntity', () => {
    describe('#new instance ', () => {
        beforeEach(() => {
            expect.extend(jestStructure);
        });

        it('Should return an instance of the entity', async () => {
            const pdvEntity = new PdvEntity({
                order_id_quiq: '112121',
                current_status: 'PLACED',
                quiq_status: 'CONFIRMED',
                origin: 'IFOOD',
                payload_received: {},
                payload_to_pdv: {},
                status_record: [
                    { created_at: 'TODAY', status: 'CANCELED' },
                    { created_at: 'TODAY', status: 'CANCELED' }
                ],
                ack: false
            });
            const { valid, error } = pdvEntity.validate();

            expect(pdvEntity).toBeValidStructure();
            expect(valid).toBe(true);
            expect(error).toBe(undefined);
            expect(pdvEntity.order_id_quiq).toBe('112121');
            expect(uuid.validate(pdvEntity.order_id_pdv)).toBe(true);
        });
    });
});
