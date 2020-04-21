const response = require('../responseFactory');
const deviceTypeDBRequests = require('../db/functions/deviceType');
const createError = require('http-errors');
const mError = require('../constants/Errors');
const dataExtractor = require('../functions/dataExtractor');


exports.createNewDeviceType = function (req, res, next) {
    deviceTypeDBRequests.createNewDeviceType(dataExtractor.deviceType(req.body))
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
    deviceTypeDBRequests.updateDeviceType({code: req.params.code}, dataExtractor.deviceType(req.body))
        .then((doc) => {
            res.send(response.responseOperationSuccess());
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.deleteDeviceType = function (req, res, next) {
    if (req.body.unsafe && req.body.unsafe === 'true') {
        deviceTypeDBRequests.deleteDeviceType({code: req.params.code})
            .then((result) => {
                res.send(response.responseOperationSuccess());
            })
            .catch((err) => {
                next(createError(500, mError.DATABASE_FAIL, err));
            })
    } else {
        deviceTypeDBRequests.safeDeleteDeviceType({code: req.params.code})
            .then((result) => {
                res.send(response.responseOperationSuccess());
            })
            .catch((err) => {
                next(createError(500, mError.DATABASE_FAIL, err));
            })
    }
};

exports.getDeviceTypeInfo = function (req, res, next) {
    deviceTypeDBRequests.findAndGetInsensitiveDeviceType({code: req.params.code})
        .then((deviceTypeDoc) => {
            if (deviceTypeDoc) {
                res.send(response.responseWithDataSuccess(deviceTypeDoc));
            } else {
                next(createError(404, mError.NOT_FOUND))
            }
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.editDeviceTypeTriggers = function (req, res, next) {
    //TODO this parser for postman requests, because postman can`t send json objects
    req.body.triggers = JSON.parse(req.body.triggers);
    deviceTypeDBRequests.updateDeviceType({code: req.params.code}, dataExtractor.deviceTypeTriggers(req.body))
        .then((result) => {
            res.send(response.responseOperationSuccess());
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

