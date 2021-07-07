const Enum = require('src/domain/enum/error/detailEnum')();

describe('domain :: enum :: error :: detailEnum', () => {
    describe('#keys', () => {
        it('Should return the enum keys', () => {
            const keys = Enum.keys();
            const data = ['INVALID_TOKEN', 'AUTHENTICATION_FAILED'];

            expect(keys).toEqual(expect.arrayContaining(data));
        });
    });

    describe('#values', () => {
        it('Should return the enum values', () => {
            const values = Enum.values();
            const data = ['Invalid token', 'Authentication failed'];

            expect(values).toEqual(expect.arrayContaining(data));
        });
    });
});
