const eventEnum = require('src/domain/enum/receiver/eventEnum')();

describe('Domain :: Enum :: eventEnum', () => {
    describe('#values()', () => {
        it('should return the enum values', () => {
            const values = eventEnum.values();
            expect(values).toEqual(
                expect.arrayContaining([
                    'PLACED',
                    'CONFIRMED',
                    'IN_PREPARATION',
                    'READY_TO_DELIVER',
                    'IN_TRANSIT',
                    'DELIVERED',
                    'CONCLUDED',
                    'CANCELED',
                    'REJECTED'
                ])
            );
        });
    });

    describe('#keys()', () => {
        it('should return the enum keys', () => {
            const keys = eventEnum.keys();
            expect(keys).toEqual(
                expect.arrayContaining([
                    'PLACED',
                    'CONFIRMED',
                    'IN_PREPARATION',
                    'READY_TO_DELIVER',
                    'IN_TRANSIT',
                    'DELIVERED',
                    'CONCLUDED',
                    'CANCELED',
                    'REJECTED'
                ])
            );
        });
    });
});
