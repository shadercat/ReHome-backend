const recommendationModel = require('../models/recommendation');

exports.createNewRecommendation = function (data) {
    return new recommendationModel(data).save();
};

exports.getRecommendation = function (query) {
    return recommendationModel.findOne(query);
};

exports.getRecommendations = function (query) {
    return recommendationModel.find(query);
};

exports.getRecommendationsPage = function (query, page) {
    let skipped = (parseInt(page) - 1) * 20;
    return recommendationModel.find(query).skip(skipped).limit(20);
};

exports.editRecommendation = function (query, data) {
    return recommendationModel.findOneAndUpdate(query, data);
};

exports.deleteRecommendation = function (query) {
    return recommendationModel.findOneAndDelete(query);
};



