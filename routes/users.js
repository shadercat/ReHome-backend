const express = require('express');
const accountMiddleware = require('../middlewares/account');
const accessMiddleware = require('../middlewares/access');
const userMiddleware = require('../middlewares/user');
const router = express.Router();

router.get('/authorized', accountMiddleware.getIsAuthorized);

router.post('/login', accountMiddleware.login);

router.post('/logout', accountMiddleware.logout);

router.post('/registration', accountMiddleware.registerNewUser);

router.get('/userdata', accessMiddleware.onlyAuthorizedUserDoor, userMiddleware.getUserData);

module.exports = router;
