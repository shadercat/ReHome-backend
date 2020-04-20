const express = require('express');
const accountModule = require('../pipelines/account');
const accessModule = require('../pipelines/access');
const userModule = require('../pipelines/user');
const router = express.Router();

router.get('/authorized', accountModule.getIsAuthorized);

router.post('/login', accountModule.login);

router.post('/logout', accountModule.logout);

router.post('/signup', accountModule.registerNewUser);

router.get('/userdata', accessModule.onlyAuthorizedUserDoor, userModule.getUserData);

module.exports = router;
