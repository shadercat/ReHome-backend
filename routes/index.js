const express = require('express');
const openInfo = require('../pipelines/openData');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/models/devices', openInfo.getDevicesInfo);

router.get('/recommendations', openInfo.getRecommendations);

router.get('/recommendations/find', openInfo.findRecommendation);

router.get('/recommendation/:codeWord/:lang', openInfo.getRecommendationLang);

router.get('/recommendation/:id', openInfo.getRecommendation);


module.exports = router;
