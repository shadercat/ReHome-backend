const deviceModel = require('../models/device');

exports.createNewDevice = function (data) {
    return new deviceModel(data).save();
};

exports.getDevice = function (query) {
    return deviceModel.findOne(query).lean();
};

exports.getInsensitiveDeviceData = function (query) {
    return deviceModel.findOne(query).select({owner: 0, _id: 0, __v: 0, updatedAt: 0})
        .populate({path: 'deviceType', select: {_id: 0, __v: 0, updatedAt: 0}});
};

exports.updateDevice = function (query, data) {
    return deviceModel.findOneAndUpdate(query, data, {new: true});
};

exports.findAndDeleteDevice = function (query) {
    return deviceModel.findOneAndDelete(query);
};

exports.findDevicesInsensitiveData = function (query, page) {
    let skipped = (parseInt(page) - 1) * 20;
    return deviceModel.find(query).select({owner: 0, _id: 0, __v: 0, updatedAt: 0})
        .skip(skipped)
        .limit(20)
        .populate({
            path: 'deviceType',
            select: {
                _id: 0,
                name: 1,
                code: 1
            }
        });
};