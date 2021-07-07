const { v4: uuidv4 } = require('uuid');
jest.mock('uuid');

const OrderTrackingReceiveFactory = require('src/domain/factories/orderTracking/orderTrackingReceiveFactory');

describe('src :: domain :: factories :: orderTracking :: OrderTrackingReceiveFactory', () => {
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
                service = OrderTrackingReceiveFactory({
                    orderTrackingStageEnum,
                    orderTrackingOriginEnum,
                    orderTrackingPosSourceEnum
                });
            });

            it('Should call buildPayload', async () => {
                uuidv4.mockImplementation(() => 'testid');
                const data = {
                    ordersPayload: {
                        id: 1,
                        origin: 'IFOOD',
                        trackId: 'UUID'
                    },
                    pdvPayload: {
                        id: 1
                    }
                };

                const result = await service.buildPayload(data);

                expect(result).toHaveProperty('source', data.ordersPayload.origin);
                expect(result).toHaveProperty('originOrderId', `${data.ordersPayload.id}`);
                expect(result).toHaveProperty('trackId', 'testid');
                expect(result).toHaveProperty('stage', orderTrackingStageEnum.PDV_CONNECTOR);
                expect(result).toHaveProperty('posSource', orderTrackingPosSourceEnum.GENERIC);
                expect(result).toHaveProperty('payload');

                expect(result.payload).toHaveProperty('received', data.ordersPayload);
                expect(result.payload).toHaveProperty('sended', data.pdvPayload);
            });
        });
    });
});
