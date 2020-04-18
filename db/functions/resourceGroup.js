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

exports.addDeviceToResourceGroup = function (query, device_id) {
    return resourceGroupModel.findOneAndUpdate(query, {$push: {devices: device_id}}, {new: true});
};

exports.deleteDeviceFromResourceGroup = function (query, device_id) {
    return resourceGroupModel.findOneAndUpdate(query, {$pull: {devices: device_id}}, {new: true});
};

