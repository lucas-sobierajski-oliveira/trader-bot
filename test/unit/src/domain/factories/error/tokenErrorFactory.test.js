const tokenErrorFactory = require('src/domain/factories/error/tokenErrorFactory')();
const detailEnum = require('src/domain/enum/error/detailEnum')();
const actionEnum = require('src/domain/enum/event/actionEnum')();

describe('domain :: factories :: error :: tokenErrorFactory', () => {
    describe('#buildError', () => {
        it('Should be successfully called', async () => {
            const expected = new Error('Generic PDV Service error on validation action');
            const error = tokenErrorFactory.buildError(detailEnum.INVALID_TOKEN);

            expect(error).toEqual(expected);
        });

        it('Should be successfully called', async () => {
            const expected = new Error('Generic PDV Service error on authentication action');
            const error = tokenErrorFactory.buildError(detailEnum.AUTHENTICATION_FAILED, actionEnum.AUTHENTICATION);

            expect(error).toEqual(expected);
        });
    });
});
