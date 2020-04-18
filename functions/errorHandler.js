const responses = require('../responseFactory');
const mError = require('../constants/Errors');

exports.errorHandler = function (error, response) {
    console.log(error);
    response.status(500);
    response.send(responses.responseOperationFail(mError.SERVER_ERROR));
};

exports.errorLogger = function (error) {
    console.log(error);
};