const response = require('../responseFactory');
const userDBRequests = require('../db/functions/deviceInfo');
const errorHandler = require('../functions/errorHandler');


exports.createNewDeviceInfo = function (req, res, next) {
    userDBRequests.createNewDeviceInfo(req.body)
        .then((doc) => {
            res.send(response.responseOperationSuccess());
        })
        .catch((err) => {
            errorHandler.errorHandler(err, res);
        })
};

exports.updateDeviceInfo = function (req, res, next) {
    userDBRequests.updateDeviceInfo({code: req.body.code}, req.body)
        .then((doc) => {
            res.send(response.responseOperationSuccess());
        })
        .catch((err) => {
            errorHandler.errorHandler(err, res);
        })
};

exports.deleteDeviceInfo = function (req, res, next) {
    if (req.body.unsafe && req.body.unsafe === 'true') {
        userDBRequests.deleteDeviceInfo({code: req.body.code})
            .then((result) => {
                res.send(response.responseOperationSuccess());
            })
            .catch((err) => {
                errorHandler.errorHandler(err, res);
            })
    } else {
        userDBRequests.safeDeleteDeviceInfo({code: req.body.code})
            .then((result) => {
                res.send(response.responseOperationSuccess());
            })
            .catch((err) => {
                errorHandler.errorHandler(err, res);
            })
    }
};

