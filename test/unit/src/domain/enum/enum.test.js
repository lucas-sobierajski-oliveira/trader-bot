const Enum = require('src/domain/enum/enum');

describe('Domain :: Enum :: Enum', () => {
    describe('#values() method', () => {
        it('should return the enum values', () => {
            const myEnum = Enum({
                SOME_VALUE: 'someValue',
                ANOTHER_VALUE: 'anotherValue'
            });

            const enumValues = myEnum.values();

            expect(enumValues.length).toEqual(2);
            expect(enumValues).toEqual(expect.arrayContaining(['someValue', 'anotherValue']));
        });
    });

    describe('#keys() method', () => {
        it('should return the enum keys', () => {
            const myEnum = Enum({
                SOME_VALUE: 'someValue',
                ANOTHER_VALUE: 'anotherValue'
            });

            const enumValues = myEnum.keys();

            expect(enumValues.length).toEqual(2);
            expect(enumValues).toEqual(expect.arrayContaining(['SOME_VALUE', 'ANOTHER_VALUE']));
        });
    });

    describe('#key() method', () => {
        it('should return the enum object', () => {
            const myEnum = Enum({
                SOME_VALUE: 'someValue',
                ANOTHER_VALUE: 'anotherValue'
            });

            const enumObject = myEnum.key(myEnum.SOME_VALUE);

            expect(enumObject).toEqual('SOME_VALUE');
        });
    });
});
