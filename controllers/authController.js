const bcrypt = require('bcrypt');
const User = require('../models/User');
const { signToken } = require('../utils/jwtUtils');

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existing = await User.findByEmail(email);
        if (existing) return res.status(400).json({ message: 'Email in use' });

        const hash = await bcrypt.hash(password, 12);
        const userId = await User.create(email, hash);
        const token = signToken({ id: userId, email });
        res.status(201).json({ token });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        if (!user)
            return res.status(401).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(401).json({ message: 'Invalid credentials' });

        const token = signToken({ id: user.id, email: user.email });
        res.json({ token });
    } catch (err) {
        next(err);
    }
};
