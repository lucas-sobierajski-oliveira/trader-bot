const Enum = require('src/domain/enum/quiq/quiqRestaurantStatusEnum')();

describe('domain :: enum :: quiq :: quiqRestaurantStatusEnum', () => {
    describe('#keys', () => {
        it('Should return the enum keys', () => {
            const keys = Enum.keys();
            const data = ['OPENED', 'CLOSED'];

            expect(keys).toEqual(expect.arrayContaining(data));
        });
    });

    describe('#values', () => {
        it('Should return the enum values', () => {
            const values = Enum.values();
            const data = ['OPENED', 'CLOSED'];

            expect(values).toEqual(expect.arrayContaining(data));
        });
    });
});
