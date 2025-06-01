// ./routes/user.router.js

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.post("/get-user-details", authMiddleware.protectRoute, userController.getUserDetails);
router.post("/add-file", authMiddleware.protectRoute, userController.addFile);
router.post("/get-files", authMiddleware.protectRoute, userController.getFiles);
router.post("/delete-file", authMiddleware.protectRoute, userController.deleteFile);
router.post("/update-file", authMiddleware.protectRoute, userController.updateFile);
router.post("/rename-file", authMiddleware.protectRoute, userController.renameFile);


module.exports = router;