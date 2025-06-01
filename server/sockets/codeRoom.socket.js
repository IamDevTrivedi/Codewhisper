// ./sockets/codeRoom.socket.js

const logger = require("../lib/logger.lib.js");
const Room = require("../models/room.model.js");

module.exports = (io) => {
    io.on("connection", (socket) => {
        logger.info("A user connected", { socketId: socket.id });

        /**
         * Handle user joining a room
         */
        socket.on("join-room", ({ roomId, username, userId }) => {
            if (!roomId || !username || !userId) {
                logger.warn("Invalid join-room parameters", { roomId, username, userId });
                return;
            }

            socket.join(roomId);
            logger.info(`${username} joined room`, { roomId, userId });

            // Notify other users in the room
            socket.to(roomId).emit("user-joined", { username });
        });

        /**
         * Handle code updates sent to a room
         */
        socket.on("code-update", async ({ roomId, code }) => {
            if (!roomId || typeof code !== "string") {
                logger.warn("Invalid code-update parameters", { roomId, code });
                return;
            }

            const currRoom = await Room.findOne({ roomUUID: roomId });
            if (currRoom) {
                currRoom.roomCode = code;
                await currRoom.save();
            } else {
                logger.warn("Room not found", { roomId });
            }

            // Broadcast the updated code to other users in the room
            socket.to(roomId).emit("receive-code", code);
            logger.debug("Code update broadcasted", { roomId });
        });

        /**
         * Handle user leaving a room
         */
        socket.on("leave-room", ({ roomId, username }) => {
            if (!roomId || !username) {
                logger.warn("Invalid leave-room parameters", { roomId, username });
                return;
            }

            socket.leave(roomId);
            logger.info(`${username} left room`, { roomId });

            // Notify other users in the room
            socket.to(roomId).emit("user-left", { username });
        });

        /**
         * Handle socket disconnection
         */
        socket.on("disconnect", () => {
            logger.info("A user disconnected", { socketId: socket.id });
        });
    });
};
