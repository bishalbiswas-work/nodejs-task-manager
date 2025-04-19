const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer '))
        return res.status(401).json({ message: 'Missing token' });

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = { id: payload.id, email: payload.email };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
