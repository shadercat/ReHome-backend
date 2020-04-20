const response = require('../responseFactory');
const mError = require('../constants/Errors');
const userDBRequests = require('../db/functions/user');
const deviceDBRequests = require('../db/functions/device');
const deviceInfoDBRequests = require('../db/functions/deviceInfo');
const errorHandler = require('../functions/errorHandler');

exports.addDevice = function (req, res, next) {
    let dCode = req.body.deviceCode.slice(0, 6);
    deviceInfoDBRequests.findAndGetDeviceInfo({code: dCode})
        .then((doc) => {
            if (doc) {
                deviceDBRequests.createNewDevice(extractDeviceData(req, doc))
                    .then((deviceDoc) => {
                        userDBRequests.findAndUpdateUserInfo({_id: req.session.user.db_id},
                            {$push: {devices: deviceDoc._id}})
                            .then((result) => {
                                res.send(response.responseOperationSuccess());
                            })
                            .catch((error) => {
                                errorHandler.errorHandler(error, res);
                            })
                    })
                    .catch((error) => {
                        if (error.code === 11000) {
                            return res.send(response.responseOperationFail(mError.ALREADY_REGISTERED));
                        }
                        errorHandler.errorHandler(error, res);
                    })
            } else {
                res.send(response.responseOperationFail(mError.USER_DATA_WRONG));
            }
        })
        .catch((error) => {
            errorHandler.errorHandler(error, res);
        })
};

function extractDeviceData(reqInfo, deviceInfo) {
    return {
        deviceCode: reqInfo.body.deviceCode,
        deviceName: reqInfo.body.deviceName,
        owner: reqInfo.session.user.db_id,
        deviceType: deviceInfo._id
    };
}

exports.updateDeviceName = function (req, res, next) {
    deviceDBRequests.updateDevice({deviceCode: req.body.deviceCode, owner: req.session.user.db_id},
        {deviceName: req.body.deviceName})
        .then((doc) => {
            if (doc) {
                res.send(response.responseOperationSuccess());
            } else {
                res.send(response.responseOperationFail(mError.USER_DATA_WRONG));
            }
        })
        .catch((err) => {
            errorHandler.errorHandler(err, res);
        })
};

exports.deleteDevice = function (req, res, next) {
    deviceDBRequests.findAndDeleteDevice({deviceCode: req.body.deviceCode, owner: req.session.user.db_id})
        .then((result) => {
            if (result) {
                console.log(result);
                userDBRequests.findAndUpdateUserInfo({_id: req.session.user.db_id}, {$pull: {devices: result._id}})
                    .then((doc) => {
                        res.send(response.responseOperationSuccess());
                    });
            } else {
                res.send(response.responseOperationFail(mError.OPERATION_DENIED));
            }
        })
        .catch((error) => {
            errorHandler.errorHandler(error, res);
        })
};

exports.getDeviceInfo = function (req, res, next) {
    deviceDBRequests.getInsensitiveDeviceData({deviceCode: req.body.code, owner: req.session.user.db_id})
        .then((result) => {
            if (result) {
                res.send(response.responseWithDataSuccess(result));
            } else {
                res.send(response.responseWithDataFail(mError.NOT_FOUND));
            }
        })
        .catch((error) => {
            errorHandler.errorHandler(error, res);
        })
};
