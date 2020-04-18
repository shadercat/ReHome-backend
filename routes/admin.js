const express = require('express');
const accessMiddleware = require('../middlewares/access');
const adminMiddleware = require('../middlewares/admin');
const adminOperationMiddleware = require('../middlewares/adminOperation');
const router = express.Router();

router.post('/login', adminMiddleware.loginAsAdmin);

router.get('/authorized', adminMiddleware.getIsAuthorizedAsAdmin);

router.post('/reg', adminMiddleware.registerNewAdmin);

router.post('/logout', adminMiddleware.logoutAdmin);

router.get('/admindata', accessMiddleware.onlyAuthorizedAdminDoor, adminMiddleware.getAdminData);

router.post('/newdevice', accessMiddleware.onlyAuthorizedAdminDoor, adminOperationMiddleware.createNewDeviceInfo);

router.delete('/deldevice', accessMiddleware.onlyAuthorizedAdminDoor, adminOperationMiddleware.deleteDeviceInfo);

router.post('/updatedevice', accessMiddleware.onlyAuthorizedAdminDoor, adminOperationMiddleware.updateDeviceInfo);

module.exports = router;