const express = require('express');
const accessModule = require('../pipelines/access');
const groupModel = require('../pipelines/resourseGroup');

const router = express.Router();

router.post('/create', accessModule.onlyAuthorizedUserDoor, groupModel.createResourceGroup);

router.post('/:id/edit', accessModule.onlyAuthorizedUserDoor, groupModel.editResourceGroup);

router.get('/:id', accessModule.onlyAuthorizedUserDoor, groupModel.getResourceGroup);

router.post('/:id/devices/add', accessModule.onlyAuthorizedUserDoor, groupModel.addDeviceToResourceGroup);

router.delete('/:id/devices/:deviceCode/delete', accessModule.onlyAuthorizedUserDoor, groupModel.deleteDeviceFromResourceGroup);

router.get('/:id/devices', accessModule.onlyAuthorizedUserDoor, groupModel.getGroupsDevices);


module.exports = router;
