const mongoose = require('mongoose');

const Device = new mongoose.Schema({
    deviceCode: {
        type: String,
        unique: true,
        required: true
    },
    deviceStatus: {
        status: {
            type: String,
            default: "offline"
        },
        state: {
            type: String,
            default: "unknown"
        },
        other: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
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
    deviceType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeviceType'
    },
    additionalData: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, {timestamps: true});


module.exports = mongoose.model('Device', Device);