const crypt = require('../../functions/hashing');
const adminModel = require('../models/admin');

exports.createAdmin = function (adminData) {
    adminData.password = crypt.getHash(adminData.password);
    return new adminModel(adminData).save();
};

exports.getInsensitiveAdminData = function (query) {
    return adminModel.findOne(query)
        .select({'password': 0}).lean();
};

exports.checkAndGetAdmin = function (adminData) {
    return adminModel
        .findOne({email: adminData.email})
        .then((doc) => {
            if (doc && doc.password === crypt.getHash(adminData.password)) {
                return Promise.resolve(doc);
            } else {
                return Promise.resolve(undefined);
            }
        })
};

