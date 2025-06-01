// ./lib/token.lib.js

const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = async (res, userId) => {
    try {
        // Generate JWT token
        const token = jwt.sign(
            { id: userId },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Common cookie options
        const cookieOptions = {
            httpOnly: true, // Prevents JavaScript access to the cookie
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            path: '/', // Makes cookie available for all routes
        };

        // Production-specific options
        if (process.env.NODE_ENV === "production") {
            Object.assign(cookieOptions, {
                secure: true, // Only sent over HTTPS
                sameSite: 'none', // Allows cross-origin requests
                domain: process.env.COOKIE_DOMAIN || undefined, // Optional: specify domain if needed
            });
        } else {
            // Development options
            Object.assign(cookieOptions, {
                secure: false, // Allow HTTP in development
                sameSite: 'lax', // More permissive in development
            });
        }

        // Set the cookie
        res.cookie("token", token, cookieOptions);

        // Also set a non-httpOnly cookie for client-side auth checks
        // This is useful for UI state management
        res.cookie("auth_status", "true", {
            ...cookieOptions,
            httpOnly: false,
        });

        return token;
    } catch (error) {
        console.error("Token generation error:", error);
        throw new Error("Failed to generate authentication token");
    }
};

module.exports = generateTokenAndSetCookie;