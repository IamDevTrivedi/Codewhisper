// ./routes/room.router.js

const express = require('express');
const router = express.Router();

const roomController = require('../controllers/room.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');


router.post('/create', authMiddleware.protectRoute, roomController.createRoom);
router.post('/join', authMiddleware.protectRoute, roomController.joinRoom);
router.post('/leave', authMiddleware.protectRoute, roomController.leaveRoom);
router.post('/get-room-data', authMiddleware.protectRoute, roomController.getRoomData);






module.exports = router;