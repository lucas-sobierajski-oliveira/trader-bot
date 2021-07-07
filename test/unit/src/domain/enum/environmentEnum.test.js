const enumContainer = require('src/domain/enum/environmentEnum');
const Enum = enumContainer();

describe('Domain :: Enum :: EnvironmentEnum', () => {
    describe('#values()', () => {
        it('should return the enum values', () => {
            const values = Enum.values();
            expect(values).toEqual(expect.arrayContaining(['develop', 'homolog', 'production']));
        });
    });

    describe('#keys()', () => {
        it('should return the enum keys', () => {
            const keys = Enum.keys();
            expect(keys).toEqual(expect.arrayContaining(['DEV', 'HOMOLOG', 'PRODUCTION']));
        });
    });
});
