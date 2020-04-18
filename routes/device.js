const express = require('express');
const accessMiddleware = require('../middlewares/access');
const deviceMiddleware = require('../middlewares/interactionDevice');
const router = express.Router();

router.post('/adddevice', accessMiddleware.onlyAuthorizedUserDoor, deviceMiddleware.addDevice);

router.post('/updatedevice', accessMiddleware.onlyAuthorizedUserDoor, deviceMiddleware.updateDeviceName);

router.delete('/deldevice', accessMiddleware.onlyAuthorizedUserDoor, deviceMiddleware.deleteDevice);


module.exports = router;