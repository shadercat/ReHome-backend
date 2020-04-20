const response = require('../responseFactory');
const userDBRequests = require('../db/functions/deviceInfo');
const createError = require('http-errors');
const mError = require('../constants/Errors');


exports.createNewDeviceInfo = function (req, res, next) {
    userDBRequests.createNewDeviceInfo(req.body)
        .then((doc) => {
            res.send(response.responseOperationSuccess());
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.updateDeviceInfo = function (req, res, next) {
    userDBRequests.updateDeviceInfo({code: req.body.code}, req.body)
        .then((doc) => {
            res.send(response.responseOperationSuccess());
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.deleteDeviceInfo = function (req, res, next) {
    if (req.body.unsafe && req.body.unsafe === 'true') {
        userDBRequests.deleteDeviceInfo({code: req.body.code})
            .then((result) => {
                res.send(response.responseOperationSuccess());
            })
            .catch((err) => {
                next(createError(500, mError.DATABASE_FAIL, err));
            })
    } else {
        userDBRequests.safeDeleteDeviceInfo({code: req.body.code})
            .then((result) => {
                res.send(response.responseOperationSuccess());
            })
            .catch((err) => {
                next(createError(500, mError.DATABASE_FAIL, err));
            })
    }
};

