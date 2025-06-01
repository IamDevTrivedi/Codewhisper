// ./lib/logger.lib.js


const logger = {
    info: (message, metadata) => console.log(`[INFO] ${message}`, metadata || ""),
    error: (message, metadata) => console.error(`[ERROR] ${message}`, metadata || ""),
    debug: (message, metadata) => console.debug(`[DEBUG] ${message}`, metadata || ""),
    warn: (message, metadata) => console.warn(`[WARN] ${message}`, metadata || ""),
    env: (message, metadata) => console.log(`[ENV VAR] ${message}`, metadata || ""),
    ping: (message, metadata) => console.log(`[PING] ${message}`, metadata || ""),

    // Logs GET requests
    get: (url, metadata) => {
        console.log(`[GET] Request to ${url}`, metadata || "");
    },

    // Logs POST requests
    post: (url, metadata) => {
        console.log(`[POST] Request to ${url}`, metadata || "");
    }
};

module.exports = logger;