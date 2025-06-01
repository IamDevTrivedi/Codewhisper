// ./routes/health.router.js


const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health.controller');
const logger = require('../lib/logger.lib');

// Basic health check
router.get('/', healthController.basicHealthCheck);

// Advanced health checks
router.get('/detailed', healthController.detailedHealthCheck);
router.get('/memory', healthController.memoryCheck);
router.get('/database', healthController.databaseCheck);

module.exports = router;