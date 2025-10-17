// ./config/nodemailer.config.js

// Require nodemailer
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

// Require logger
const logger = require("../lib/logger.lib.js");

// Load environment variables
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

transporter.verify((error, success) => {
  if (error) {
    logger.error("❌ Nodemailer configuration error:", error);
  } else {
    logger.info("✅ Nodemailer is ready to send emails");
  }
});

module.exports = transporter;
