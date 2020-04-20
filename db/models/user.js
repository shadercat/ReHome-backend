const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: "Username"
    },
    subscriptionType: {
        type: String,
        default: "default"
    },
    devices: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Device'}],
        default: []
    },
    resourceGroups: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'ResourceGroup'}],
        default: []
    },
    additionalData: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, {timestamps: true});

module.exports = mongoose.model('User', User);