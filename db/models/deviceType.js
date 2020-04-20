const mongoose = require('mongoose');

const DeviceType = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "ЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪЪ"
    },
    triggers: {
        type: [{type: mongoose.Schema.Types.Mixed}],
        default: []
    }
}, {timestamps: true});

module.exports = mongoose.model('DeviceType', DeviceType);