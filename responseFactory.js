const error = require('./constants/Errors');

exports.responseOperationSuccess = function () {
    return {
        success: true,
        reason: error.NONE
    }
};

exports.responseOperationFail = function (reason) {
    return {
        success: false,
        reason: reason
    }
};

exports.responseWithDataSuccess = function (data) {
    return {
        success: true,
        reason: error.NONE,
        data: data
    }
};

exports.responseWithDataFail = function (reason) {
    return {
        success: false,
        reason: reason,
        data: undefined
    }
};