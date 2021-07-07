const DatabaseFactory = require('src/domain/factories/order/databaseFactory');

describe('domain :: factories :: order :: databaseFactory', () => {
    describe('#buildPayload', () => {
        let genericPdvOrderFactory, databaseFactory;

        beforeEach(() => {
            genericPdvOrderFactory = { buildPayload: jest.fn().mockReturnValue({}) };
            databaseFactory = DatabaseFactory({ genericPdvOrderFactory });
        });

        it('Should be successfully called', async () => {
            const data = {
                order: {
                    id: '123',
                    status: 'CONFIRMED',
                    origin: 'IFOOD'
                },
                event: 'PLACED'
            };
            const expected = {
                order_id_quiq: data.order.id,
                current_status: data.event,
                quiq_status: data.order.status,
                origin: data.order.origin,
                payload_received: data,
                payload_to_pdv: {},
                ack: false
            };
            const payload = await databaseFactory.buildPayload(data);

            expect(genericPdvOrderFactory.buildPayload).toHaveBeenCalledWith(data.order);
            expect(payload).toEqual(expected);
        });
    });
});
