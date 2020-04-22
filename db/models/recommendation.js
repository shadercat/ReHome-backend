const mongoose = require('mongoose');

const Recommendation = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    codeWord: {
        type: String,
        required: true
    },
    text: {
        type: String,
        default: " "
    },
    language: {
        type: String,
        default: "none"
    },
    target: {
        type: [{type: String}],
        default: ['all']
    },
    additionalData: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, {timestamps: true});

module.exports = mongoose.model("Recommendation", Recommendation);