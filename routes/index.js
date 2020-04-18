const express = require('express');
const openInfo = require('../middlewares/openData');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/devices', openInfo.getDevicesInfo);

module.exports = router;
