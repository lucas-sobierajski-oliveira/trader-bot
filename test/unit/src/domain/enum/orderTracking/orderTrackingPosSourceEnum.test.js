const Enum = require('src/domain/enum/orderTraking/orderTrackingPosSourceEnum')();

describe('Domain :: Enum :: OrderTracking :: OrderTrackingStageEnum', () => {
    describe('#values()', () => {
        it('should return the enum values', () => {
            const values = Enum.values();
            expect(values).toEqual(expect.arrayContaining(['GENERIC']));
        });
    });

    describe('#keys()', () => {
        it('should return the enum keys', () => {
            const keys = Enum.keys();
            expect(keys).toEqual(expect.arrayContaining(['GENERIC']));
        });
    });
});
