// ./routes/auth.router.js


const express = require('express');
const router = express.Router();


const authController = require('../controllers/auth.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);


router.post("/send-account-activation-email", authMiddleware.protectRoute, authController.sendAccountActivationEmail);
router.post("/verify-account", authMiddleware.protectRoute, authController.verifyAccount);


// router.post("/forgot-username" , authController.forgotUsername);


router.post("/send-reset-password-otp", authController.sendResetPasswordOTP);
router.post("/reset-password", authController.resetPassword);


module.exports = router;