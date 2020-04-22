const resourceGroupModel = require('../models/resourceGroup');

exports.createResourceGroup = function (data) {
    return new resourceGroupModel(data).save();
};

exports.updateResourceGroup = function (query, data) {
    return resourceGroupModel.findOneAndUpdate(query, data, {new: true});
};

exports.getResourceGroup = function (query) {
    return resourceGroupModel.findOne(query).lean();
};

exports.getResourceGroupInsensitiveData = function (query) {
    return resourceGroupModel.findOne(query).select({_id: 1, name: 1, description: 1, createdAt: 1}).lean();
};

exports.getResourceGroups = function (query, page) {
    let skipped = (parseInt(page) - 1) * 20;
    return resourceGroupModel.find(query)
        .select({owner: 0, updatedAt: 0, __v: 0, devices: 0})
        .skip(skipped)
        .limit(20);
};

exports.getDevicesFromGroup = function (query, page) {
    let skipped = (parseInt(page) - 1) * 20;
    return resourceGroupModel.findOne(query)
        .select({_id: 1, name: 1, description: 1, createdAt: 1})
        .populate({
            path: 'devices',
            select: {
                _id: 0,
                deviceName: 1,
                deviceCode: 1,
                createAt: 1
            },
            populate: {
                path: 'deviceType',
                select: {
                    _id: 0,
                    name: 1
                }
            },
            skip: skipped,
            limit: 20
        });
};

exports.addDeviceToResourceGroup = function (query, device_id) {
    return resourceGroupModel.findOneAndUpdate(query, {$addToSet: {devices: device_id}}, {new: true});
};

exports.deleteDeviceFromResourceGroup = function (query, device_id) {
    return resourceGroupModel.findOneAndUpdate(query, {$pull: {devices: device_id}}, {new: true});
};

