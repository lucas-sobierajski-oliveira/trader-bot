const Enum = require('src/domain/enum/exceptionsEnum')();

describe('Domain :: Enum :: ExceptionsEnum', () => {
    describe('#values() method', () => {
        it('should return the enum values', () => {
            const values = Enum.values();

            expect(values).toEqual(
                expect.arrayContaining(['business', 'contract', 'integration', 'operation', 'notFound', 'database'])
            );
        });
    });

    describe('#keys() method', () => {
        it('should return the enum keys', () => {
            const keys = Enum.keys();

            expect(keys).toEqual(
                expect.arrayContaining(['BUSINESS', 'CONTRACT', 'INTEGRATION', 'OPERATION', 'NOT_FOUND', 'DATABASE'])
            );
        });
    });
});
