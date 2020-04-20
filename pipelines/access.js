const response = require('../responseFactory');
const mError = require('../constants/Errors');

exports.onlyAuthorizedUserDoor = function (req, res, next) {
    if (req.session.user && !req.session.user.isAdmin) {
        next();
    } else {
        res.status(401).send(response.responseOperationFail(mError.UNAUTHORIZED));
    }
};

exports.onlyAuthorizedAdminDoor = function (req, res, next) {
    if (req.session.user && req.session.user.isAdmin) {
        next();
    } else {
        res.status(401).send(response.responseOperationFail(mError.UNAUTHORIZED));
    }
};