const fs = require('fs');
const path = require('path');
const db = require('./dbConfig');

async function migrate() {
    console.log("Running database migration...")

    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    const statement = sql.split(';').map(s => s.trim()).filter(Boolean);
    for (const stmt of statement) {
        await db.execute(stmt);
    }
    console.log("Database migration done...")
}

module.exports = migrate;
// migrate()