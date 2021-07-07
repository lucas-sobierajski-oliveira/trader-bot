const quiqGatewayFactory = require('src/domain/factories/quiq/quiqGatewayFactory');
const pdvEnum = require('src/domain/enum/pdvEnum')();
describe('Domain :: factories :: quiq :: quiqGatewayFactory', () => {
    factory = quiqGatewayFactory({ pdvEnum });

    it('Should build correct payload', () => {
        const data = {
            dbObject: { order_id_quiq: '' },
            status: 'CONFIRMATION'
        };
        const payload = factory.buildPayload(data);

        expect(payload).toEqual({
            orderId: expect.any(String),
            event: 'CONFIRMATION',
            timestamp: expect.any(String),
            pdv: pdvEnum.GENERIC
        });
    });
});
