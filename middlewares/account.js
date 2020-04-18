const response = require('../responseFactory');
const mError = require('../constants/Errors');
const userDBRequests = require('../db/functions/user');
const errorHandler = require('../functions/errorHandler');

exports.getIsAuthorized = function (req, res, next) {
    if (req.session.user && !req.session.user.isAdmin) {
        res.send(response.responseOperationSuccess());
    } else {
        res.send(response.responseOperationFail(mError.UNAUTHORIZED));
    }
};

exports.login = function (req, res, next) {
    if (req.session.user)
        return res.send(response.responseOperationFail(mError.ALREADY_LOGIN));
    userDBRequests.checkAndGetUser(req.body)
        .then((doc) => {
            if (doc) {
                req.session.user = {db_id: doc._id, email: doc.email, isAdmin: false};
                res.send(response.responseOperationSuccess());
            } else {
                res.send(response.responseOperationFail(mError.USER_DATA_WRONG));
            }
        })
        .catch((error) => {
            errorHandler.errorHandler(error, res);
        })
};

exports.logout = function (req, res, next) {
    if (req.session.user && !req.session.user.isAdmin) {
        req.session.destroy();
        res.send(response.responseOperationSuccess());
    } else {
        res.status(401).send(response.responseOperationFail(mError.UNAUTHORIZED));
    }
};

exports.registerNewUser = function (req, res, next) {
    userDBRequests.createUser(req.body)
        .then((result) => {
            res.send(response.responseOperationSuccess());
        })
        .catch((error) => {
            if (error.code === 11000) {
                res.send(response.responseOperationFail(mError.ALREADY_REGISTERED));
            } else {
                errorHandler.errorHandler(error, response);
            }
        })
};