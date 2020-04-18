const mongoose = require('mongoose');
const ResourceGroup = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        default: ""
    },
    devices: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Device'}],
        default: []
    }
}, {timestamps: true});

module.exports = mongoose.model('ResourceGroup', ResourceGroup);