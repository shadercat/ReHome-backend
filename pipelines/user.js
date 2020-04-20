const response = require('../responseFactory');
const userDBRequests = require('../db/functions/user');
const errorHandler = require('../functions/errorHandler');


exports.getUserData = function (req, res, next) {
    userDBRequests.getInsensitiveUserData({email: req.session.user.email}).lean()
        .then((doc) => {
            res.send(response.responseWithDataSuccess(doc));
        })
        .catch((err) => {
            errorHandler.errorHandler(err, res);
        });
};


