const crypt = require('../../functions/hashing');
const userModel = require('../models/user');

exports.createUser = function (userData) {
    userData.password = crypt.getHash(userData.password);
    return new userModel(userData).save();
};

exports.getInsensitiveUserData = function (query) {
    return userModel.findOne(query)
        .select({'password': 0, 'devices': 0, 'resourceGroups': 0, '__v': 0, 'updatedAt': 0}).lean();
};

exports.checkAndGetUser = function (userData) {
    return userModel
        .findOne({email: userData.email})
        .then((doc) => {
            if (doc && doc.password === crypt.getHash(userData.password)) {
                return Promise.resolve(doc);
            } else {
                return Promise.resolve(undefined);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        })
};

exports.checkUserPassword = function (userData) {
    userModel.findOne({email: userData.email})
        .then((doc) => {
            return Promise.resolve(doc && doc.password === crypt.getHash(userData.password));
        })
        .catch((err) => {
            return Promise.reject(err);
        })
};

exports.findAndUpdateUserInfo = function (query, data) {
    return userModel.findOneAndUpdate(query, data, {new: true});
};

