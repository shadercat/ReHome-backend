const express = require('express');
const accessModule = require('../pipelines/access');
const adminModule = require('../pipelines/admin');
const adminOperationModule = require('../pipelines/adminOperation');
const router = express.Router();

router.post('/login', adminModule.loginAsAdmin);

router.get('/authorized', adminModule.getIsAuthorizedAsAdmin);

router.post('/reg', adminModule.registerNewAdmin);

router.post('/logout', adminModule.logoutAdmin);

router.get('/admindata', accessModule.onlyAuthorizedAdminDoor, adminModule.getAdminData);

router.post('/newdevice', accessModule.onlyAuthorizedAdminDoor, adminOperationModule.createNewDeviceInfo);

router.delete('/deldevice', accessModule.onlyAuthorizedAdminDoor, adminOperationModule.deleteDeviceInfo);

router.post('/updatedevice', accessModule.onlyAuthorizedAdminDoor, adminOperationModule.updateDeviceInfo);

module.exports = router;