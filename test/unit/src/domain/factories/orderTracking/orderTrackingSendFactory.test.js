const { v4: uuidv4 } = require('uuid');
jest.mock('uuid');

const OrderTrackingSendFactory = require('src/domain/factories/orderTracking/orderTrackingSendFactory');

describe('src :: domain :: factories :: orderTracking :: OrderTrackingSendFactory', () => {
    describe('#buildPayload ', () => {
        let service, orderTrackingStageEnum, orderTrackingOriginEnum;

        describe('Success', () => {
            beforeEach(() => {
                orderTrackingStageEnum = {
                    PDV_GENERIC: 'PDV_GENERIC'
                };

                orderTrackingPosSourceEnum = {
                    GENERIC: 'GENERIC'
                };

                orderTrackingOriginEnum = {
                    IFOOD: 'IFOOD'
                };
                service = OrderTrackingSendFactory({
                    orderTrackingStageEnum,
                    orderTrackingOriginEnum,
                    orderTrackingPosSourceEnum
                });
            });

            it('Should call buildPayload', async () => {
                uuidv4.mockImplementation(() => 'testid');
                const data = {
                    dbPayload: {
                        order_id_quiq: 1,
                        origin: 'IFOOD',
                        trackId: 'UUID'
                    },
                    pdvPayload: {
                        id: 1
                    }
                };

                const result = await service.buildPayload(data);

                expect(result).toHaveProperty('source', data.dbPayload.origin);
                expect(result).toHaveProperty('originOrderId', `${data.dbPayload.order_id_quiq}`);
                expect(result).toHaveProperty('trackId', 'testid');
                expect(result).toHaveProperty('stage', orderTrackingStageEnum.PDV_CONNECTOR);
                expect(result).toHaveProperty('posSource', orderTrackingPosSourceEnum.GENERIC);
                expect(result).toHaveProperty('payload', data.pdvPayload);
            });
        });
    });
});
