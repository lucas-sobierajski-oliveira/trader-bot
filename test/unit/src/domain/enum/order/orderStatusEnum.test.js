const enumContainer = require('src/domain/enum/order/orderStatusEnum');
const Enum = enumContainer();

describe('Domain :: Enum :: order :: orderStatusEnum', () => {
    describe('#values()', () => {
        it('should return the enum values', () => {
            const values = Enum.values();
            expect(values).toEqual(expect.arrayContaining([
                'CONFIRMATION',
                'CANCELLATION_REQUESTED',
                'DISPATCH',
                'INTEGRATION',
                'READY_TO_DELIVER'
            ]));
        });
    });

    describe('#keys()', () => {
        it('should return the enum keys', () => {
            const keys = Enum.keys();
            expect(keys).toEqual(expect.arrayContaining([
                'CONFIRMATION',
                'CANCELLATION_REQUESTED',
                'DISPATCH',
                'INTEGRATION',
                'READY_TO_DELIVER'
            ]));
        });
    });
});
