const mongoose = require('mongoose');

const Admin = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accessType: {
        type: String,
        default: "default"
    },
    additionalData: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, {timestamps: true});

module.exports = mongoose.model('Admin', Admin);