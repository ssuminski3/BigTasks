const jwt = require('jsonwebtoken');

function getUserSub(req) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return null;

        const token = authHeader.split(' ')[1];  // "Bearer <token>"

        const decoded = jwt.decode(token);
        return decoded?.sub || null;
    } catch (err) {
        console.error('Error decoding token:', err);
        return null;
    }
}

module.exports = { getUserSub };
