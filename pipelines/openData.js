const response = require('../responseFactory');
const deviceTypeDBRequests = require('../db/functions/deviceType');
const recommendationDBRequests = require('../db/functions/recommendation');
const createError = require('http-errors');
const dataExtractor = require('../functions/dataExtractor');
const mError = require('../constants/Errors');


exports.getDevicesInfo = function (req, res, next) {
    deviceTypeDBRequests.getDevicesType(req.query.page)
        .then((docs) => {
            res.send(response.responseWithDataSuccess(docs));
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.getRecommendations = function (req, res, next) {
    recommendationDBRequests.getRecommendationsPage({language: (req.query.lang || 'en')}, req.query.page)
        .then((doc) => {
            res.send(response.responseWithDataSuccess(doc));
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.getRecommendation = function (req, res, next) {
    recommendationDBRequests.getRecommendation({_id: req.params.id})
        .then((doc) => {
            if (doc) {
                res.send(response.responseWithDataSuccess(doc));
            } else {
                next(createError(404, mError.NOT_FOUND));
            }
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.getRecommendationLang = function (req, res, next) {
    recommendationDBRequests.getRecommendation({codeWord: req.params.codeWord, language: req.params.lang})
        .then((doc) => {
            if (doc) {
                res.send(response.responseWithDataSuccess(doc));
            } else {
                next(createError(404, mError.NOT_FOUND));
            }
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};

exports.findRecommendation = function (req, res, next) {
    recommendationDBRequests.getRecommendationsPage(dataExtractor.recommendationQuery(req.query), req.query.page)
        .then((doc) => {
            res.send(response.responseWithDataSuccess(doc));
        })
        .catch((err) => {
            next(createError(500, mError.DATABASE_FAIL, err));
        })
};
