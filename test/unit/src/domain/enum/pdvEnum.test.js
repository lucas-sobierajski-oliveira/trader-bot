const enumContainer = require('src/domain/enum/pdvEnum');
const Enum = enumContainer();

describe('Domain :: Enum :: pdvEnum', () => {
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
