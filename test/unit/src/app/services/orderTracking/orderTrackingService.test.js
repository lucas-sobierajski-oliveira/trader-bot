const { v4: uuidv4 } = require('uuid');
jest.mock('uuid');

const OrderTrackingService = require('src/app/services/orderTracking/orderTrackingService');

describe('src :: app :: services :: orderTracking :: OrderTrackingService', () => {
    describe('#sendInputOrderData ', () => {
        let service, orderTrackingQueueService, orderTrackingReceiveFactory, orderTrackingSendFactory;
        const factoryData = {
            originOrderId: 'originOrderId'
        };
        describe('Success', () => {
            beforeEach(() => {
                orderTrackingQueueService = {
                    sendMessage: jest.fn().mockReturnValue(factoryData)
                };
                orderTrackingReceiveFactory = {
                    buildPayload: jest.fn().mockReturnValue(factoryData)
                };
                orderTrackingSendFactory = {
                    buildPayload: jest.fn()
                };

                service = OrderTrackingService({
                    orderTrackingQueueService,
                    orderTrackingReceiveFactory,
                    orderTrackingSendFactory
                });
            });

            it('Should call orderTrackingReceiveFactory and queueService', async () => {
                uuidv4.mockImplementation(() => 'testid');

                const data = {
                    ordersPayload: {
                        id: 1
                    },
                    pdvPayload: {
                        id: 1
                    }
                };

                await service.sendInputOrderData(data);

                expect(orderTrackingReceiveFactory.buildPayload).toHaveBeenCalledWith(data);

                expect(orderTrackingQueueService.sendMessage).toHaveBeenCalledWith({
                    MessageBody: factoryData,
                    MessageGroupId: factoryData.originOrderId,
                    MessageDeduplicationId: 'testid'
                });

                expect(orderTrackingSendFactory.buildPayload).not.toHaveBeenCalled();
            });
        });
    });
    describe('#sendOutputOrderData', () => {
        let service, orderTrackingQueueService, orderTrackingSendFactory, orderTrackingReceiveFactory;
        const factoryData = {
            originOrderId: 'originOrderId'
        };
        describe('Success', () => {
            beforeEach(() => {
                orderTrackingQueueService = {
                    sendMessage: jest.fn().mockReturnValue(factoryData)
                };
                orderTrackingSendFactory = {
                    buildPayload: jest.fn().mockReturnValue(factoryData)
                };
                orderTrackingReceiveFactory = {
                    buildPayload: jest.fn()
                };

                service = OrderTrackingService({
                    orderTrackingQueueService,
                    orderTrackingSendFactory,
                    orderTrackingReceiveFactory
                });
            });

            it('Should call orderTrackingSendFactory and queueService ', async () => {
                uuidv4.mockImplementation(() => 'testid');

                const data = {
                    dbPayload: {
                        id: 1
                    },
                    pdvPayload: {
                        id: 1
                    }
                };

                await service.sendOutputOrderData(data);

                expect(orderTrackingSendFactory.buildPayload).toHaveBeenCalledWith(data);

                expect(orderTrackingQueueService.sendMessage).toHaveBeenCalledWith({
                    MessageBody: factoryData,
                    MessageGroupId: factoryData.originOrderId,
                    MessageDeduplicationId: 'testid'
                });

                expect(orderTrackingReceiveFactory.buildPayload).not.toHaveBeenCalled();
            });
        });
    });
});
