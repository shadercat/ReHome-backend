const mongoose = require('mongoose');
const crypto = require('crypto');

const userModel = require('../models/user');
const error = require('../../constants/Errors');
const functions = require('../../functions/simpleErrorHandler');

exports.createUser = function (userData) {
    userData.password = hash(userData.password);
    return new userModel(userData).save();
};

function hash(text) {
    return crypto.createHash('sha256')
        .update(text).digest('base64');
}

exports.getInsensitiveUserData = function (query) {
    return userModel.findOne(query)
        .select({'password': 0, 'devices': 0, 'resourceGroups': 0}).lean();
};

exports.checkAndGetUser = function (userData) {
    return userModel
        .findOne({email: userData.email})
        .then((doc) => {
            if (doc && doc.password === hash(userData.password)) {
                return Promise.resolve(doc);
            } else {
                return Promise.reject(error.USER_DATA_WRONG);
            }
        })
        .catch((err) => {
            functions.errorLogger(err);
            return Promise.reject(error.DATABASE_FAIL);
        })
};

exports.checkUserPassword = function (userData) {
    userModel.findOne({email: userData.email})
        .then((doc) => {
            if (doc && doc.password === hash(userData.password)) {
                return true;
            } else {
                return false;
            }
        })
        .catch((err) => {
            functions.errorLogger(err);
            return false
        })
};

