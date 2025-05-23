const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

exports.signToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
