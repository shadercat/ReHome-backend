const express = require('express');
const accessModule = require('../pipelines/access');
const deviceModule = require('../pipelines/interactionDevice');
const router = express.Router();

router.post('/adddevice', accessModule.onlyAuthorizedUserDoor, deviceModule.addDevice);

router.post('/updatedevice', accessModule.onlyAuthorizedUserDoor, deviceModule.updateDeviceName);

router.delete('/deldevice', accessModule.onlyAuthorizedUserDoor, deviceModule.deleteDevice);


module.exports = router;