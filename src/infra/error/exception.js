const { NotFound, MakeErrorClass } = require('fejl');

class Business extends MakeErrorClass('Business') { }
class Contract extends MakeErrorClass('Contract') { }
class Integration extends MakeErrorClass('Integration') { }
class Operation extends MakeErrorClass('Operation') { }
class Database extends MakeErrorClass('Database') { }

module.exports = ({ exceptionsEnum }) => ({
    [exceptionsEnum.BUSINESS]: (error, errorType) => {
        if (!(error instanceof Error)) {
            error = new Business(error);
        }

        error.errorType = errorType || exceptionsEnum.BUSINESS;
        error.statusCode = 422;

        return error;
    },
    [exceptionsEnum.CONTRACT]: ({ error, errorType, details = [] }) => {
        if (!(error instanceof Error)) {
            error = new Contract(error);
        }

        error.errorType = errorType || exceptionsEnum.CONTRACT;
        error.details = details;
        error.statusCode = 400;

        return error;
    },
    [exceptionsEnum.INTEGRATION]: (error, errorType) => {
        if (!(error instanceof Error)) {
            error = new Integration(error);
        }

        error.errorType = errorType || exceptionsEnum.INTEGRATION;

        return error;
    },
    [exceptionsEnum.OPERATION]: (error, errorType) => {
        if (!(error instanceof Error)) {
            error = new Operation(error);
        }

        error.errorType = errorType || exceptionsEnum.OPERATION;

        return error;
    },
    [exceptionsEnum.NOT_FOUND]: (error, errorType) => {
        if (!(error instanceof Error)) {
            error = new NotFound(error);
        }

        const type = errorType || exceptionsEnum.NOT_FOUND;
        error.errorType = type;
        error.statusCode = type;

        return error;
    },
    [exceptionsEnum.DATABASE]: (error, errorType) => {
        if (!(error instanceof Error)) {
            error = new Database(error);
        }

        error.errorType = errorType || exceptionsEnum.DATABASE;

        return error;
    }
});
