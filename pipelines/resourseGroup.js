const createError = require('http-errors');
const mError = require('../constants/Errors');
const response = require('../responseFactory');
const groupDBRequests = require('../db/functions/resourceGroup');
const userDBRequests = require('../db/functions/user');
const deviceDBRequests = require('../db/functions/device');
const dataExtractor = require('../functions/dataExtractor');

exports.createResourceGroup = function (req, res, next) {
    let group = dataExtractor.resourceGroup(req.body);
    group.owner = req.session.user.db_id;
    groupDBRequests.createResourceGroup(group)
        .then((groupDoc) => {
            userDBRequests.findAndUpdateUserInfo({_id: req.session.user.db_id},
                {$push: {resourceGroups: groupDoc._id}})
                .then((userDoc) => {
                    res.send(response.responseOperationSuccess());
                })
                .catch((err) => {
                    next(createError(500, mError.DATABASE_FAIL, err));
                })
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.editResourceGroup = function (req, res, next) {
    groupDBRequests.updateResourceGroup({_id: req.params.id, owner: req.session.user.db_id},
        dataExtractor.resourceGroup(req.body))
        .then((result) => {
            if (result) {
                res.send(response.responseOperationSuccess());
            } else {
                next(createError(404, mError.NOT_FOUND));
            }
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.getResourceGroup = function (req, res, next) {
    groupDBRequests.getResourceGroupInsensitiveData({_id: req.params.id, owner: req.session.user.db_id})
        .then((doc) => {
            if (doc) {
                res.send(response.responseWithDataSuccess(doc));
            } else {
                next(createError(404, mError.NOT_FOUND));
            }
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.getUserResourceGroups = function (req, res, next) {
    groupDBRequests.getResourceGroups({owner: req.session.user.db_id}, req.query.page)
        .then((doc) => {
            res.send(response.responseWithDataSuccess(doc));
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.addDeviceToResourceGroup = function (req, res, next) {
    deviceDBRequests.getDevice({deviceCode: req.body.deviceCode, owner: req.session.user.db_id})
        .then((deviceDoc) => {
            if (deviceDoc) {
                groupDBRequests.addDeviceToResourceGroup({_id: req.params.id, owner: req.session.user.db_id},
                    deviceDoc._id)
                    .then((groupDoc) => {
                        if (groupDoc) {
                            res.send(response.responseOperationSuccess());
                        } else {
                            next(createError(404, mError.NOT_FOUND));
                        }
                    })
                    .catch((err) => {
                        next(createError(500, mError.DATABASE_FAIL, err));
                    })
            } else {
                next(createError(404, mError.NOT_FOUND));
            }
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.deleteDeviceFromResourceGroup = function (req, res, next) {
    deviceDBRequests.getDevice({deviceCode: req.params.deviceCode, owner: req.session.user.db_id})
        .then((deviceDoc) => {
            if (deviceDoc) {
                groupDBRequests.deleteDeviceFromResourceGroup({_id: req.params.id, owner: req.session.user.db_id},
                    deviceDoc._id)
                    .then((groupDoc) => {
                        if (groupDoc) {
                            res.send(response.responseOperationSuccess());
                        } else {
                            next(createError(404, mError.NOT_FOUND));
                        }
                    })
                    .catch((err) => {
                        next(createError(500, mError.DATABASE_FAIL, err));
                    })
            } else {
                next(createError(404, mError.NOT_FOUND));
            }
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.getGroupsDevices = function (req, res, next) {
    groupDBRequests.getDevicesFromGroup({_id: req.params.id, owner: req.session.user.db_id},
        req.query.page)
        .then((doc) => {
            if (doc) {
                res.send(response.responseWithDataSuccess(doc));
            } else {
                next(createError(404, mError.NOT_FOUND));
            }
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.deleteResourceGroup = function (req, res, next) {
    groupDBRequests.deleteResourceGroup({owner: req.session.user.db_id, _id: req.params.id})
        .then((doc) => {
            if (doc) {
                res.send(response.responseOperationSuccess());
            } else {
                next(createError(404, mError.NOT_FOUND));
            }
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};
