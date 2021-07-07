const Enum = require('src/domain/enum/orderTraking/orderTrackingOriginEnum')();

describe('Domain :: Enum :: OrderTracking :: OrderTrackingOriginEnum', () => {
    describe('#values()', () => {
        it('should return the enum values', () => {
            const values = Enum.values();
            expect(values).toEqual(expect.arrayContaining(['IFOOD', 'RAPPI', 'UBER_EATS', 'GOOGLE']));
        });
    });

    describe('#keys()', () => {
        it('should return the enum keys', () => {
            const keys = Enum.keys();
            expect(keys).toEqual(expect.arrayContaining(['IFOOD', 'RAPPI', 'UBER_EATS', 'GOOGLE']));
        });
    });
});
