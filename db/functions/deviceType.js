const deviceTypeModel = require('../models/deviceType');

exports.createNewDeviceInfo = function (info) {
    return new deviceTypeModel(info).save();
};

exports.updateDeviceInfo = function (query, data) {
    return deviceTypeModel.findOneAndUpdate(query, data, {new: true});
};

exports.deleteDeviceInfo = function (query) {
    return deviceTypeModel.deleteOne(query);
};

exports.getDevicesInfo = function () {
    return deviceTypeModel.find()
        .select({triggers: 0, _id: 0});
};

exports.findAndGetDeviceInfo = function (query) {
    return deviceTypeModel.findOne(query);
};

exports.safeDeleteDeviceInfo = function (query) {
    let deletedInfo = {
        name: "Deleted",
        description: "Deleted",
        triggers: []
    };
    return deviceTypeModel.findOneAndUpdate(query, deletedInfo, {new: true});
};