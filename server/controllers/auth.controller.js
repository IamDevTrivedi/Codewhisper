// ./controllers/auth.controller.js


// customs imports
const logger = require('../lib/logger.lib');
const { validateEmail, validatePassword } = require('../lib/validators.lib');
const generateTokenAndSetCookie = require('../lib/token.lib');
const transporter = require('../config/nodemailer.config');
const { generateWelcomeEmail, generateOtpEmail, generateResetOtpEmail } = require("../lib/templates.lib.js");
const generateOtp = require("../lib/otp.lib.js");

// models imports
const User = require('../models/user.model');

// npm imports
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();



// complete Auth Controller
const authController = {

    // #region Register
    register: async (req, res) => {

        // Log the request
        logger.post("/api/auth/register");

        // Extract the user data
        const { firstName, lastName, email, password } = req.body;

        // check if all the fields are present
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all the fields" });
        }

        // Validate the user data
        if (!validateEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Validate the password
        if (!validatePassword(password)) {
            return res.status(400).json({ success: false, message: "Password Should be atleast 6 digit long containing Lowercase , Uppercase , Special character and Number atleast ones" });
        }

        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ success: false, message: "Account already Create using this Email" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword
            });

            // Save the user to the database
            await newUser.save();


            // Create a JWT token
            const token = await generateTokenAndSetCookie(res, newUser._id);


            // Sending a Welcome Email to the user
            const welcomeMailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: "Welcome to Our Platform!",
                html: generateWelcomeEmail({
                    name: `${firstName} ${lastName}`,
                    year: new Date().getFullYear()
                })
            };

            try {
                await transporter.sendMail(welcomeMailOptions);
            } catch (error) {
                logger.error("Nodemailer error in register: ", error);
            }

            return res.status(201).json({
                success: true,
                token,
                user: {
                    _id: newUser._id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email
                },
                message: "Account created successfully"
            });

        } catch (error) {
            logger.error("Error in register: ", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },


    // #region Login
    login: async (req, res) => {

        // Log the request
        logger.post("/api/auth/login");


        // Extract the user data
        const { email, password } = req.body;

        // check if all the fields are present
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all the fields" });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        try {

            // Check if the user exists
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ success: false, message: "Invalid credentials" });
            }

            // Compare the password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: "Invalid credentials" });
            }

            // Create a JWT token
            const token = await generateTokenAndSetCookie(res, user._id);

            return res.status(200).json({
                success: true,
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                },
                message: "Logged in successfully"
            });

        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },


    // #region Logout
    logout: async (req, res) => {

        // Log the request
        logger.post("/api/auth/logout");

        // Clear the cookie
        res.clearCookie("token");

        // Send the response
        return res.status(200).json({ success: true, message: "Logged out successfully" });
    },



    sendAccountActivationEmail: async (req, res) => {

        // Log the request
        logger.post("/api/auth/send-account-activation-email");

        // Extract the user data
        const { id } = req.body;

        try {

            // Check if the user exists
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }


            if (user.isAccountVerified) {
                return res.status(400).json({ success: false, message: "Account already verified" });
            }


            // Generate an OTP
            const otp = generateOtp();

            // Set the OTP and its expiry time
            user.verifyOtp = otp;
            user.verifyOtpExpiresAt = Date.now() + 600000; // 10 minutes

            // Save the user to the database
            await user.save();

            // Sending the OTP to the user
            const otpMailOptions = {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: "Account Activation OTP",
                html: generateOtpEmail({
                    otp,
                    validity: 10,
                    year: new Date().getFullYear()
                })
            };

            try {
                await transporter.sendMail(otpMailOptions);
            } catch (error) {
                logger.error("Nodemailer error in sendAccountActivationEmail: ", error);
            }
            return res.status(200).json({ success: true, message: "OTP sent successfully" });

        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },



    verifyAccount: async (req, res) => {

        // Log the request
        logger.post("/api/auth/verify-account");

        // Extract the user data
        const { id, otp } = req.body;

        try {

            // Check if the user exists
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            // Check if the OTP is valid
            if (user.verifyOtp !== otp || user.verifyOtpExpiresAt < Date.now()) {
                return res.status(400).json({ success: false, message: "Invalid OTP" });
            }

            // Update the account verification status
            user.isAccountVerified = true;

            // Clear the OTP and its expiry time
            user.verifyOtp = '';
            user.verifyOtpExpiresAt = 0;

            // Save the user to the database
            await user.save();

            return res.status(200).json({ success: true, message: "Account verified successfully" });

        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }

    },



    sendResetPasswordOTP: async (req, res) => {

        // Log the request
        logger.post("/api/auth/send-reset-password-otp");

        // Extract the user data
        const { email } = req.body;

        // check if all the fields are present
        if (!email) {
            return res.status(400).json({ success: false, message: "Please enter all the fields" });
        }

        try {

            // Check if the user exists
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            // Generate an OTP
            const otp = generateOtp();

            // Set the OTP and its expiry time
            user.resetOtp = otp;
            user.resetOtpExpiresAt = Date.now() + 600000; // 10 minutes


            // Sending the OTP to the user
            const otpMailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: "Reset Password OTP",
                html: generateResetOtpEmail({
                    otp,
                    validity: 10,
                    year: new Date().getFullYear()
                })
            };

            try {
                await transporter.sendMail(otpMailOptions);
            } catch (error) {
                logger.error("Nodemailer error in sendResetPasswordOTP: ", error);
                return res.status(500).json({ success: false, message: "Internal server error" });
            }

            // Save the user to the database
            await user.save();

            // Send the response
            return res.status(200).json({ success: true, message: "OTP sent successfully" });

        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }

    },



    resetPassword: async (req, res) => {

        // Log the request
        logger.post("/api/auth/reset-password");

        // Extract the user data
        const { email, otp, password } = req.body;

        // check if all the fields are present
        if (!email || !otp || !password) {
            return res.status(400).json({ success: false, message: "Please enter all the fields" });
        }

        try {

            // Check if the user exists
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            // Check if the OTP is valid
            if (user.resetOtp !== otp || user.resetOtpExpiresAt < Date.now()) {
                return res.status(400).json({ success: false, message: "Invalid OTP" });
            }

            if (!validatePassword(password)) {
                return res.status(400).json({ success: false, message: "Password Should be atleast 6 digit long containing Lowercase , Uppercase , Special character and Number atleast ones" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Update the password
            user.password = hashedPassword;

            // Clear the OTP and its expiry time
            user.resetOtp = '';
            user.resetOtpExpiresAt = 0;

            // Save the user to the database
            await user.save();

            return res.status(200).json({ success: true, message: "Password reset successfully" });

        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }


};

module.exports = authController;