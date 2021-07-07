const enumContainer = require('src/domain/enum/order/arrayFieldEnum');
const Enum = enumContainer();

describe('Domain :: Enum :: order :: orderStatusEnum', () => {
    describe('#values()', () => {
        it('should return the enum values', () => {
            const values = Enum.values();
            expect(values).toEqual(expect.arrayContaining([
                'status_record'
            ]));
        });
    });

    describe('#keys()', () => {
        it('should return the enum keys', () => {
            const keys = Enum.keys();
            expect(keys).toEqual(expect.arrayContaining([
                'STATUS_RECORD'
            ]));
        });
    });
});
