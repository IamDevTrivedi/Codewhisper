const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({

    // User's name
    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
    },

    // User's unique email
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    // OTP for email verification
    verifyOtp: {
        type: String,
        default: ''
    },
    // Expiry time for the verification OTP
    verifyOtpExpiresAt: {
        type: Number,
        default: 0
    },
    // Flag to check if the account is verified
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    // OTP for password reset
    resetOtp: {
        type: String,
        default: ''
    },
    // Expiry time for the reset OTP
    resetOtpExpiresAt: {
        type: Number,
        default: 0
    },

    // Timestamps for document creation and updates
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update the updatedAt field before saving the document
UserSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);