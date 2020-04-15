const mongoose = require('mongoose');

const Device = new mongoose.Schema({
    deviceCode: {
        type: String,
        unique: true,
        required: true
    },
    deviceStatus: {
        type: mongoose.Schema.Types.Mixed
    },
    deviceName: {
        type: String,
        default: "Device"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    triggers: {
        type: [{type: mongoose.Schema.Types.Mixed}],
        default: []
    }
});

module.exports = mongoose.model('Device', Device);