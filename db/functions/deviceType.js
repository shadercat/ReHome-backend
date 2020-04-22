const deviceTypeModel = require('../models/deviceType');

exports.createNewDeviceType = function (info) {
    return new deviceTypeModel(info).save();
};

exports.updateDeviceType = function (query, data) {
    return deviceTypeModel.findOneAndUpdate(query, data, {new: true});
};

exports.deleteDeviceType = function (query) {
    return deviceTypeModel.deleteOne(query);
};

exports.getDevicesType = function (page) {
    let skipped = (parseInt(page) - 1) * 20;
    return deviceTypeModel.find()
        .select({triggers: 0, _id: 0, updatedAt: 0, __v: 0})
        .skip(skipped)
        .limit(20);
};

exports.findAndGetDeviceType = function (query) {
    return deviceTypeModel.findOne(query);
};

exports.findAndGetInsensitiveDeviceType = function (query) {
    return deviceTypeModel.findOne(query).select({_id: 0, __v: 0, updatedAt: 0});
};

exports.safeDeleteDeviceType = function (query) {
    let deletedInfo = {
        name: "Deleted",
        description: "Deleted",
        triggers: []
    };
    return deviceTypeModel.findOneAndUpdate(query, deletedInfo, {new: true});
};