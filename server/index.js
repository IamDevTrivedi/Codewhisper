// ./index.js



// basics Packages
const express = require('express');
const http = require('http'); // Import the http module
const { Server } = require('socket.io'); // Import socket.io
const app = express();
const server = http.createServer(app); // Create the server

// Third-party middleware imports
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Environment variable configuration
const dotenv = require('dotenv');
dotenv.config();

// Database connection setup
const connectDB = require('./config/db.config');
connectDB();

// Custom library imports
const logger = require('./lib/logger.lib');

// API routes imports
const healthRoutes = require('./routes/heath.router');
const authRoutes = require('./routes/auth.router.js');
const userRoutes = require('./routes/user.router.js');
const roomRoutes = require('./routes/room.router.js');
const geminiRoutes = require('./routes/gemini.router.js');

// Import socket logic

// Environment variables setup
const PORT = process.env.PORT || 5001;
const CORS_ORIGIN = process.env.NODE_ENV === 'production'
  ? process.env.FRONTEND_URL_PROD
  : process.env.FRONTEND_URL;
const BACKEND_URL = process.env.NODE_ENV === 'production'
  ? process.env.BACKEND_URL_PROD
  : process.env.BACKEND_URL;


// Middleware setup
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());



const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true
  }
});

require('./sockets/codeRoom.socket')(io);

// Base URL
app.get("/", (req, res) => {
  logger.get("/");
  res.send("This is the Base URL for the Backend Server For the Project : CodeWhisper");
});

// API routes setup
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/gemini", geminiRoutes);

// Backend Self Ping: to keep the server warm on render
setInterval(async () => {
  const response = await fetch(`${BACKEND_URL}/api/health`);
  logger.ping("Ping Testing made At: ", new Date().toLocaleString());
}, 1000 * 60 * 5); // 5 minutes

// Server initialization
server.listen(PORT, () => {
  logger.info(`✅ Server running on port ${PORT}`);
});