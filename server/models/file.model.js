const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            required: true
        },

        fileExtension: {
            type: String,
            required: true
        },

        fileFullName: {
            type: String,
            required: true
        },

        fileId: {
            type: String,
            required: true
        },

        fileLanguage: {
            type: String,
            required: true
        },

        fileContent: {
            type: String,
            required: true
        },

        fileOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

const File = mongoose.model('File', fileSchema);

module.exports = File;