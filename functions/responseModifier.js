exports.setResponseHeaders = function (req, res, next) {
    let requestOrigin = process.env.CREDENTIAL_SITE;
    res.append('Access-Control-Allow-Origin', req.headers.origin);
    res.append('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.append('Access-Control-Allow-Credentials', 'true');
    next();
};