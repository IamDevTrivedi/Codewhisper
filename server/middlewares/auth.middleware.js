const jwt = require('jsonwebtoken');
const logger = require('../lib/logger.lib');

const authMiddleware = {

    protectRoute: (req, res, next) => {

        logger.info('authmiddleware.protectRoute called');

        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ success: false, message: 'User is not Authorized' });
        }

        try {
            const decorded = jwt.verify(token, process.env.JWT_SECRET);

            if (decorded.id) {
                req.body.id = decorded.id;
            }
            else {
                return res.status(401).json({ success: false, message: 'User is not Authorized' });
            }
            next();
        } catch (error) {
            return res.status(401).json({ sucesss: false, message: 'Internal Server Error at AuthMiddleware' });
        }
    }
}

module.exports = authMiddleware;