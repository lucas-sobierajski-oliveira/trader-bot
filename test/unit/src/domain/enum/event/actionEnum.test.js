const Enum = require('src/domain/enum/event/actionEnum')();

describe('domain :: enum :: event :: actionEnum', () => {
    describe('#keys', () => {
        it('Should return the enum keys', () => {
            const keys = Enum.keys();
            const data = ['AUTHENTICATION', 'POLLING'];

            expect(keys).toEqual(expect.arrayContaining(data));
        });
    });

    describe('#values', () => {
        it('Should return the enum values', () => {
            const values = Enum.values();
            const data = ['authentication', 'polling'];

            expect(values).toEqual(expect.arrayContaining(data));
        });
    });
});
