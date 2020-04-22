const express = require('express');
const accountModule = require('../pipelines/account');
const accessModule = require('../pipelines/access');
const userModule = require('../pipelines/user');
const groupModel = require('../pipelines/resourseGroup');

const router = express.Router();

router.get('/authorized', accountModule.getIsAuthorized);

router.post('/login', accountModule.login);

router.post('/logout', accountModule.logout);

router.post('/create', accountModule.registerNewUser);

router.post('/edit', accessModule.onlyAuthorizedUserDoor, userModule.editUserData);

router.get('/devices', accessModule.onlyAuthorizedUserDoor, userModule.getUserDevices);

router.get('/resourcegroups', accessModule.onlyAuthorizedUserDoor, groupModel.getUserResourceGroups);

router.get('/', accessModule.onlyAuthorizedUserDoor, userModule.getUserData);

module.exports = router;
