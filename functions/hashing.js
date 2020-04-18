const crypto = require('crypto');

exports.getHash = function (text) {
    return crypto.createHash('sha256')
        .update(text).digest('base64');
};