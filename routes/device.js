const express = require('express');
const accessModule = require('../pipelines/access');
const deviceModule = require('../pipelines/interactionDevice');
const router = express.Router();

router.post('/register', accessModule.onlyAuthorizedUserDoor, deviceModule.addDevice);

router.post('/:deviceCode/update', accessModule.onlyAuthorizedUserDoor, deviceModule.editDeviceInfo);

router.delete('/:deviceCode/delete', accessModule.onlyAuthorizedUserDoor, deviceModule.deleteDevice);

router.get('/:deviceCode', accessModule.onlyAuthorizedUserDoor, deviceModule.getDeviceInfo);

module.exports = router;