const exceptionsEnum = require('src/domain/enum/exceptionsEnum')();
const Exception = require('src/infra/error/exception')({ exceptionsEnum });
const { BUSINESS, CONTRACT, INTEGRATION, OPERATION, NOT_FOUND, DATABASE } = exceptionsEnum;

describe('App :: Infra :: Error :: Exception', () => {
    const errorInstance = new Error('This is a simple error');
    const errorMessage = 'This is a simple error';

    describe('#Throw an exception by it\'s type', () => {
        it(`Should return a BUSINESS error with an error instance
        when invoke the exception with message and error type `, () => {
            const error = Exception[BUSINESS](errorInstance, BUSINESS);

            expect(error).not.toEqual(null);
            expect(error.errorType).toEqual(BUSINESS);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(errorMessage);
        });

        it(`Should return a BUSINESS error with a message with
        a non instance of an error when invoke the exception with message and error type`, () => {
            const error = Exception[BUSINESS](errorMessage, BUSINESS);

            expect(error).not.toEqual(null);
            expect(error.errorType).toEqual(BUSINESS);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(errorMessage);
        });

        it(`Should return a BUSINESS error with a message
        when invoke the exception  with message`, () => {
            const error = Exception[BUSINESS](errorInstance);

            expect(error).not.toEqual(null);
            expect(error.errorType).toEqual(BUSINESS);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(errorMessage);
        });

        it(`Should return a BUSINESS error with a message with
        a non instance of an error when invoke the exception with message`, () => {
            const error = Exception[BUSINESS](errorMessage, BUSINESS);

            expect(error).not.toEqual(null);
            expect(error.errorType).toEqual(BUSINESS);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(errorMessage);
        });

        it('Should return a CONTRACT error with a message', () => {
            const error = Exception[CONTRACT]({ error: errorInstance });

            expect(error).not.toEqual(null);
            expect(error.errorType).toEqual(CONTRACT);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(errorMessage);
        });

        it('Should return a CONTRACT error with a message with a non instance of an error', () => {
            const error = Exception[CONTRACT]({ error: errorMessage });

            expect(error).not.toEqual(null);
            expect(error.errorType).toEqual(CONTRACT);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(errorMessage);
        });

        it('Should return a CONTRACT error with a message and error instance and details ', () => {
            const error = Exception[CONTRACT]({ error: errorInstance });

            expect(error).not.toEqual(null);

            expect(error.errorType).toEqual(CONTRACT);

            expect(error).toBeInstanceOf(Error);

            expect(error.message).toEqual(errorMessage);

            expect(error.details).toEqual([]);
        });

        it('Should return a INTEGRATION error with a message', () => {
            const error = Exception[INTEGRATION](errorInstance);

            expect(error).not.toEqual(null);
            expect(error.errorType).toEqual(INTEGRATION);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(errorMessage);
        });

        it('Should return a INTEGRATION error with a message with a non instance of an error', () => {
            const error = Exception[INTEGRATION](errorMessage);

            expect(error).not.toEqual(null);
            expect(error.errorType).toEqual(INTEGRATION);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(errorMessage);
        });

        it('Should return a OPERATION error with a message', () => {
            const error = Exception[OPERATION](errorInstance);

            expect(error).not.toEqual(null);
            expect(error.errorType).toEqual(OPERATION);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(errorMessage);
        });

        it('Should return a OPERATION error with a message with a non instance of an error', () => {
            const error = Exception[OPERATION](errorMessage);

            expect(error).not.toEqual(null);
            expect(error.errorType).toEqual(OPERATION);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(errorMessage);
        });

        it('Should return a NOT_FOUND error with a message', () => {
            const error = Exception[NOT_FOUND](errorInstance, NOT_FOUND);

            expect(error).not.toEqual(null);
            expect(error.errorType).toEqual(NOT_FOUND);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(errorMessage);
        });

        it('Should return a NOT_FOUND error with a message with a non instance of an error', () => {
            const error = Exception[NOT_FOUND](errorMessage);

            expect(error).not.toEqual(null);
            expect(error.errorType).toEqual(NOT_FOUND);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(errorMessage);
        });

        it('Should return a DATABASE error with a message with a non instance of an error ', () => {
            const error = Exception[DATABASE](errorMessage);

            expect(error).not.toEqual(null);
            expect(error.errorType).toEqual(DATABASE);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(errorMessage);
        });

        it('Should return a DATABASE error with a message ', () => {
            const error = Exception[DATABASE](errorInstance);

            expect(error).not.toEqual(null);
            expect(error.errorType).toEqual(DATABASE);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(errorMessage);
        });
    });
});
