const deviceInfoModel = require('../models/deviceInfo');

exports.createNewDeviceInfo = function (info) {
    return new deviceInfoModel(info).save();
};

exports.updateDeviceInfo = function (query, data) {
    return deviceInfoModel.findOneAndUpdate(query, data, {new: true});
};

exports.deleteDeviceInfo = function (query) {
    return deviceInfoModel.deleteOne(query);
};

exports.getDevicesInfo = function () {
    return deviceInfoModel.find()
        .select({triggers: 0, _id: 0});
};

exports.findAndGetDeviceInfo = function (query) {
    return deviceInfoModel.findOne(query);
};

exports.safeDeleteDeviceInfo = function (query) {
    let deletedInfo = {
        name: "Deleted",
        description: "Deleted",
        triggers: []
    };
    return deviceInfoModel.findOneAndUpdate(query, deletedInfo, {new: true});
};