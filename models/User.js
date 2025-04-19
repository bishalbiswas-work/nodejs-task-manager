const db = require('../config/dbConfig');

exports.create = async (email, passwordHash) => {
    const [result] = await db.execute(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, passwordHash]
    );
    return result.insertId;
};

exports.findByEmail = async (email) => {
    const [rows] = await db.execute(
        'SELECT id, email, password FROM users WHERE email = ?',
        [email]
    );
    return rows[0];
};

exports.findById = async (id) => {
    const [rows] = await db.execute(
        'SELECT id, email FROM users WHERE id = ?',
        [id]
    );
    return rows[0];
};
