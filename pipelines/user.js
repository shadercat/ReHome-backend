const response = require('../responseFactory');
const userDBRequests = require('../db/functions/user');
const createError = require('http-errors');
const mError = require('../constants/Errors');


exports.getUserData = function (req, res, next) {
    userDBRequests.getInsensitiveUserData({email: req.session.user.email}).lean()
        .then((doc) => {
            res.send(response.responseWithDataSuccess(doc));
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        });
};


