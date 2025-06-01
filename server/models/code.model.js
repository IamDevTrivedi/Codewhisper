const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({

    codeId: {
        type: String,
        required: true,
    },

    code: {
        type: String,
        required: true,
    },

    codeLanguage: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const Code = mongoose.model('Code', codeSchema);