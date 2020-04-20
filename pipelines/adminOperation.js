const response = require('../responseFactory');
const deviceTypeDBRequests = require('../db/functions/deviceType');
const createError = require('http-errors');
const mError = require('../constants/Errors');
const dataExtractor = require('../functions/dataExtractor');


exports.createNewDeviceType = function (req, res, next) {
    deviceTypeDBRequests.createNewDeviceInfo(dataExtractor.deviceType(req.body))
        .then((doc) => {
            res.send(response.responseOperationSuccess());
        })
        .catch((err) => {
            if (err.code === 11000) {
                res.send(response.responseOperationFail(mError.ALREADY_REGISTERED))
            } else {
                next(createError(500, mError.DATABASE_FAIL, err));
            }
        })
};

exports.editDeviceType = function (req, res, next) {
    deviceTypeDBRequests.updateDeviceInfo({code: req.params.code}, dataExtractor.deviceType(req.body))
        .then((doc) => {
            res.send(response.responseOperationSuccess());
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.deleteDeviceType = function (req, res, next) {
    if (req.body.unsafe && req.body.unsafe === 'true') {
        deviceTypeDBRequests.deleteDeviceInfo({code: req.params.code})
            .then((result) => {
                res.send(response.responseOperationSuccess());
            })
            .catch((err) => {
                next(createError(500, mError.DATABASE_FAIL, err));
            })
    } else {
        deviceTypeDBRequests.safeDeleteDeviceInfo({code: req.params.code})
            .then((result) => {
                res.send(response.responseOperationSuccess());
            })
            .catch((err) => {
                next(createError(500, mError.DATABASE_FAIL, err));
            })
    }
};

