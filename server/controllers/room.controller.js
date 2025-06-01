// ./controllers/room.controller.js


const logger = require('../lib/logger.lib.js');
const Room = require('../models/room.model.js');
const User = require('../models/user.model.js');
const { v4 } = require("uuid");
const languages = require('../Constants/languages.js');


const roomController = {

    createRoom: async (req, res) => {

        logger.post("/api/room/create");

        const { roomName, roomLanguage } = req.body;
        const creatorId = req.body.id;

        try {

            const creator = await User.findOne({ _id: creatorId });

            if (!creatorId) {
                return res.status(400).json({
                    success: false,
                    message: 'User is not authenticated'
                });
            }

            if (!roomName || !roomLanguage) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields'
                });
            }

            const roomUUID = v4();


            const selectedLanguage = languages.find(lang => lang.roomLanguage === roomLanguage);
            logger.debug(roomLanguage);
            logger.debug(JSON.stringify(selectedLanguage, null, 2));

            const newRoom = new Room({
                roomName,
                roomLanguage,
                memberName: [`${creator.firstName} ${creator.lastName}`],
                memberId: [creator._id],
                roomUUID,
                roomCode: selectedLanguage.helloWorld
            })

            await newRoom.save();

            return res.status(201).json({
                success: true,
                message: 'Room created successfully',
                data: newRoom
            });


        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },


    joinRoom: async (req, res) => {

        logger.post("/api/room/join");
        const { roomUUID } = req.body;
        const userId = req.body.id;


        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User is not authenticated'
            });
        }

        if (!roomUUID) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }


        try {

            const existingRoom = await Room.findOne({ roomUUID });

            if (!existingRoom) {
                return res.status(404).json({
                    success: false,
                    message: 'Room not found'
                });
            }

            const user = await User.findOne({ _id: userId });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            const memberName = existingRoom.memberName;
            const memberId = existingRoom.memberId;

            // if (members.includes(`${user.firstName} ${user.lastName}`)) {
            //     return res.status(400).json({
            //         success: false,
            //         message: 'User already in the room'
            //     });
            // }

            memberName.push(`${user.firstName} ${user.lastName}`);
            memberId.push(user._id);


            await existingRoom.save();

            return res.status(200).json({
                success: true,
                message: 'User joined room successfully',
                data: existingRoom
            });


        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }


    },


    leaveRoom: async (req, res) => {
        logger.post("/api/room/leave");

        const { roomUUID } = req.body;
        const userId = req.body.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User is not authenticated'
            });
        }


        if (!roomUUID) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }


        try {

            const existingRoom = await Room.findOne({
                roomUUID
            });

            if (!existingRoom) {
                return res.status(404).json({
                    success: false,
                    message: 'Room not found'
                });
            }

            const user = await User.findOne({
                _id: userId
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            let memberName = existingRoom.memberName;
            memberName.pop(`${user.firstName} ${user.lastName}`);

            let memberId = existingRoom.memberId;
            memberId.pop(user._id);

            await existingRoom.save();

            return res.status(200).json({
                success: true,
                message: 'User left room successfully',
                data: existingRoom
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }


    },



    getRoomData: async (req, res) => {

        const { roomUUID } = req.body;
        const userId = req.body.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User is not authenticated'
            });
        }

        if (!roomUUID) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        try {

            const existingRoom = await Room.findOne({
                roomUUID
            });
            const userId = req.body.id;

            if (!existingRoom) {
                return res.status(404).json({
                    success: false,
                    message: 'Room not found'
                });
            }

            if (!existingRoom.memberId.includes(userId)) {
                return res.status(400).json({
                    success: false,
                    message: 'User not in the room'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Room data fetched successfully',
                data: existingRoom
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },


}


module.exports = roomController;