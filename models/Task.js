const db = require('../config/dbConfig');

exports.create = async ({ title, description, status, dueDate, userId }) => {
    const [result] = await db.execute(
        `INSERT INTO tasks (title, description, status, due_date, user_id)
     VALUES (?, ?, ?, ?, ?)`,
        [title, description, status, dueDate, userId]
    );
    return result.insertId;
};

exports.findAllByUser = async ({ userId, status, limit, offset }) => {
    let sql = 'SELECT * FROM tasks WHERE user_id = ?';
    const params = [userId];
    if (status) {
        sql += ' AND status = ?';
        params.push(status);
    }
    sql += ' ORDER BY due_date ASC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    const [rows] = await db.execute(sql, params);
    return rows;
};

exports.findById = async (id, userId) => {
    const [rows] = await db.execute(
        'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
        [id, userId]
    );
    return rows[0];
};

exports.update = async (id, userId, { title, description, status, dueDate }) => {
    // Convert undefined to null for optional fields
    const [result] = await db.execute(
        `UPDATE tasks 
         SET title = ?, description = ?, status = ?, due_date = ? 
         WHERE id = ? AND user_id = ?`,
        [
            title ?? null,
            description ?? null,
            status ?? null,
            dueDate ?? null,
            id,
            userId
        ]
    );
    return result.affectedRows;
};


exports.delete = async (id, userId) => {
    const [result] = await db.execute(
        'DELETE FROM tasks WHERE id = ? AND user_id = ?',
        [id, userId]
    );
    return result.affectedRows;
};
