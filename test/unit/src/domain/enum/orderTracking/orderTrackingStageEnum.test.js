const Enum = require('src/domain/enum/orderTraking/orderTrackingStageEnum')();

describe('Domain :: Enum :: OrderTracking :: OrderTrackingStageEnum', () => {
    describe('#values()', () => {
        it('should return the enum values', () => {
            const values = Enum.values();
            expect(values).toEqual(expect.arrayContaining(['POS_CONNECTOR']));
        });
    });

    describe('#keys()', () => {
        it('should return the enum keys', () => {
            const keys = Enum.keys();
            expect(keys).toEqual(expect.arrayContaining(['POS_CONNECTOR']));
        });
    });
});
