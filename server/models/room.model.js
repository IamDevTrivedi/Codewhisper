// ./models/room.model.js


const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({

    roomName: {
        type: String,
        required: true,
    },

    roomLanguage: {
        type: String,
        required: true
    },

    memberName: {
        type: Array,
        required: true
    },

    memberId: {
        type: Array,
        required: true
    },

    roomUUID: {
        type: String,
        required: true,
        unique: true
    },

    roomCode: {
        type: String,
        required: true
    },

});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;