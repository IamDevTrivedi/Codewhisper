// ./config/db.config.js

// Import mongoose for database connection
const mongoose = require('mongoose');

// Import logger for logging messages
const logger = require('../lib/logger.lib');

// Database connection function
const connectDB = async () => {
    try {
        // Ensure MongoDB URL is defined
        if (!process.env.MONGODB_URL) {
            throw new Error('MONGODB_URL is not defined in environment variables');
        }

        // Connect to MongoDB
        const connection = await mongoose.connect(process.env.MONGODB_URL);

        logger.info(`✅ Database connected successfully`);
    } catch (error) {
        // Log detailed error message
        logger.error(`❌ Database connection failed: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

// Export the connection function
module.exports = connectDB;