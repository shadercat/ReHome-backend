const pick = require('lodash.pick');

exports.deviceType = function (source) {
    return pick(source, ['name', 'description', 'code']);
};

exports.deviceTypeTriggers = function (source) {
    return pick(source, ['triggers']);
};

exports.device = function (source) {
    return pick(source, ['deviceName', 'additionalData']);
};

exports.user = function (source) {
    return pick(source, ['email', 'name', 'additionalData']);
};

exports.userCreation = function (source) {
    return pick(source, ['email', 'password', 'name', 'additionalData']);
};

exports.resourceGroup = function (source) {
    return pick(source, ['name', 'description']);
};

exports.admin = function (source) {
    return pick(source, ['email']);
};

exports.adminCreation = function (source) {
    return pick(source, ['email', 'password', 'accessType', 'additionalData']);
};

exports.extractDataForDeviceCreation = function (reqInfo, deviceInfo) {
    return {
        deviceCode: reqInfo.body.deviceCode,
        deviceName: reqInfo.body.deviceName,
        owner: reqInfo.session.user.db_id,
        deviceType: deviceInfo._id
    };
};