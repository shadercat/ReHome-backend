const response = require('../responseFactory');
const mError = require('../constants/Errors');
const userDBRequests = require('../db/functions/admin');
const dataExtractor = require('../functions/dataExtractor');
const createError = require('http-errors');


exports.getIsAuthorizedAsAdmin = function (req, res, next) {
    if (req.session.user && req.session.user.isAdmin) {
        res.send(response.responseOperationSuccess());
    } else {
        res.send(response.responseOperationFail(mError.UNAUTHORIZED));
    }
};

exports.loginAsAdmin = function (req, res, next) {
    if (req.session.user && req.session.user.isAdmin)
        return res.send(response.responseOperationFail(mError.ALREADY_LOGIN));
    userDBRequests.checkAndGetAdmin(req.body)
        .then((doc) => {
            if (doc) {
                req.session.user = {db_id: doc._id, email: doc.email, isAdmin: true};
                res.send(response.responseOperationSuccess());
            } else {
                res.send(response.responseOperationFail(mError.USER_DATA_WRONG));
            }
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.logoutAdmin = function (req, res, next) {
    if (req.session.user && req.session.user.isAdmin) {
        req.session.destroy();
        res.send(response.responseOperationSuccess());
    } else {
        next(createError(401, mError.UNAUTHORIZED));
    }
};

exports.registerNewAdmin = function (req, res, next) {
    userDBRequests.createAdmin(dataExtractor.adminCreation(req.body))
        .then((result) => {
            res.send(response.responseOperationSuccess());
        })
        .catch((err) => {
            if (err.code === 11000) {
                res.send(response.responseOperationFail(mError.ALREADY_REGISTERED));
            } else {
                next(createError(500, mError.DATABASE_FAIL, err))
            }
        })
};

exports.getAdminData = function (req, res, next) {
    userDBRequests.getInsensitiveAdminData({email: req.session.user.email}).lean()
        .then((doc) => {
            res.send(response.responseWithDataSuccess(doc));
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err))
        });
};



