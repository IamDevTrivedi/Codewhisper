// ./config/nodemailer.config.js



// Require nodemailer
const nodemailer = require('nodemailer');


// Require logger
const logger = require('../lib/logger.lib.js');


// Load environment variables
const dotenv = require('dotenv');
dotenv.config();


const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465,
    auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000
});


transporter.verify((error, success) => {
    if (error) {
        logger.error('❌ Nodemailer configuration error:', error);
    } else {
        logger.info('✅ Nodemailer is ready to send emails');
    }
});

module.exports = transporter;