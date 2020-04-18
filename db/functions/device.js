const deviceModel = require('../models/device');

exports.createNewDevice = function (data) {
    return new deviceModel(data).save();
};

exports.getDevice = function (query) {
    return deviceModel.findOne(query).lean();
};

exports.updateDevice = function (query, data) {
    return deviceModel.findOneAndUpdate(query, data, {new: true});
};

exports.findAndDeleteDevice = function (query) {
    return deviceModel.findOneAndDelete(query);
};