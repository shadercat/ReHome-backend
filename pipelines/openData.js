const response = require('../responseFactory');
const DBRequests = require('../db/functions/deviceInfo');
const createError = require('http-errors');
const mError = require('../constants/Errors');


exports.getDevicesInfo = function (req, res, next) {
    DBRequests.getDevicesInfo()
        .then((docs) => {
            res.send(response.responseWithDataSuccess(docs));
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};
