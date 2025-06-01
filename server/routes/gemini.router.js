// ./routes/gemini.router.js

const express = require('express');
const router = express.Router();

const geminiController = require('../controllers/gemini.controller.js');

router.post('/ask-regular', geminiController.getRegularResponse);
router.post('/ask-file/', geminiController.getFileResponse);

module.exports = router;