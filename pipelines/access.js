const mError = require('../constants/Errors');
const createError = require('http-errors');


exports.onlyAuthorizedUserDoor = function (req, res, next) {
    if (req.session.user && !req.session.user.isAdmin) {
        next();
    } else {
        next(createError(401, mError.UNAUTHORIZED));
    }
};

exports.onlyAuthorizedAdminDoor = function (req, res, next) {
    if (req.session.user && req.session.user.isAdmin) {
        next();
    } else {
        next(createError(401, mError.UNAUTHORIZED));
    }
};