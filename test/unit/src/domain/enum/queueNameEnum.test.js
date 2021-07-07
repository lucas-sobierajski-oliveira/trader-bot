const queueNameEnum = require('src/domain/enum/queueNameEnum')();

describe('Domain :: Enum :: ExceptionsEnum', () => {
    describe('#values() method', () => {
        it('should return the enum values', () => {
            const values = queueNameEnum.values();

            expect(values).toEqual(expect.arrayContaining(['update-orders']));
        });
    });

    describe('#keys() method', () => {
        it('should return the enum keys', () => {
            const keys = queueNameEnum.keys();

            expect(keys).toEqual(expect.arrayContaining(['UPDATE_STATUS_ORDER']));
        });
    });
});
