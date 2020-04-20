const response = require('../responseFactory');
const DBRequests = require('../db/functions/deviceInfo');
const errorHandler = require('../functions/errorHandler');

exports.getDevicesInfo = function (req, res, next) {
    DBRequests.getDevicesInfo()
        .then((docs) => {
            res.send(response.responseWithDataSuccess(docs));
        })
        .catch((err) => {
            errorHandler.errorHandler(err, res);
        })
};
