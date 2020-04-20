const responses = require('../responseFactory');
const mError = require('../constants/Errors');

exports.errorRouteHandler = function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.send(responses.responseOperationFail(err.message || mError.SERVER_ERROR));
};