const express = require('express');
const accessModule = require('../pipelines/access');
const adminModule = require('../pipelines/admin');
const adminOperationModule = require('../pipelines/adminOperation');
const router = express.Router();

router.post('/login', adminModule.loginAsAdmin);

router.get('/authorized', adminModule.getIsAuthorizedAsAdmin);

router.post('/create', adminModule.registerNewAdmin);

router.post('/logout', adminModule.logoutAdmin);

router.post('/device/create', accessModule.onlyAuthorizedAdminDoor, adminOperationModule.createNewDeviceType);

router.post('/device/:code/triggers/edit', accessModule.onlyAuthorizedAdminDoor, adminOperationModule.editDeviceTypeTriggers);

router.delete('/device/:code/delete', accessModule.onlyAuthorizedAdminDoor, adminOperationModule.deleteDeviceType);

router.post('/device/:code/edit', accessModule.onlyAuthorizedAdminDoor, adminOperationModule.editDeviceType);

router.get('/device/:code', accessModule.onlyAuthorizedAdminDoor, adminOperationModule.getDeviceTypeInfo);

router.get('/', accessModule.onlyAuthorizedAdminDoor, adminModule.getAdminData);

module.exports = router;