const createError = require('http-errors');
const response = require('../responseFactory');
const mError = require('../constants/Errors');
const userDBRequests = require('../db/functions/user');
const deviceDBRequests = require('../db/functions/device');
const deviceInfoDBRequests = require('../db/functions/deviceType');
const dataExtractor = require('../functions/dataExtractor');

exports.addDevice = function (req, res, next) {
    let dCode = req.body.deviceCode.slice(0, 6);
    deviceInfoDBRequests.findAndGetDeviceType({code: dCode})
        .then((deviceTypeDoc) => {
            if (deviceTypeDoc) {
                deviceDBRequests.createNewDevice(dataExtractor.extractDataForDeviceCreation(req, deviceTypeDoc))
                    .then((deviceDoc) => {
                        userDBRequests.findAndUpdateUserInfo({_id: req.session.user.db_id},
                            {$push: {devices: deviceDoc._id}})
                            .then((result) => {
                                res.send(response.responseOperationSuccess());
                            })
                            .catch((err) => {
                                next(createError(500, mError.DATABASE_FAIL, err));
                            })
                    })
                    .catch((err) => {
                        if (err.code === 11000) {
                            return res.send(response.responseOperationFail(mError.ALREADY_REGISTERED));
                        }
                        next(createError(500, mError.DATABASE_FAIL, err));
                    })
            } else {
                res.send(response.responseOperationFail(mError.USER_DATA_WRONG));
            }
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.editDeviceInfo = function (req, res, next) {
    deviceDBRequests.updateDevice({deviceCode: req.params.deviceCode, owner: req.session.user.db_id},
        dataExtractor.device(req.body))
        .then((doc) => {
            if (doc) {
                res.send(response.responseOperationSuccess());
            } else {
                next(createError(404, mError.NOT_FOUND));
                //res.send(response.responseOperationFail(mError.USER_DATA_WRONG));
            }
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.deleteDevice = function (req, res, next) {
    deviceDBRequests.findAndDeleteDevice({deviceCode: req.params.deviceCode, owner: req.session.user.db_id})
        .then((result) => {
            if (result) {
                userDBRequests.findAndUpdateUserInfo({_id: req.session.user.db_id}, {$pull: {devices: result._id}})
                    .then((doc) => {
                        res.send(response.responseOperationSuccess());
                    });
            } else {
                next(createError(404, mError.NOT_FOUND));
            }
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.getDeviceInfo = function (req, res, next) {
    deviceDBRequests.getInsensitiveDeviceData({deviceCode: req.params.deviceCode, owner: req.session.user.db_id})
        .then((result) => {
            if (result) {
                res.send(response.responseWithDataSuccess(result));
            } else {
                next(createError(404, mError.NOT_FOUND));
            }
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};
