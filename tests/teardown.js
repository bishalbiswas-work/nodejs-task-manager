const db = require('../config/dbConfig');
module.exports = async () => {
    // drop all data & close pool
    await db.execute('DROP TABLE IF EXISTS tasks;');
    await db.execute('DROP TABLE IF EXISTS users;');
    await db.end();
};
