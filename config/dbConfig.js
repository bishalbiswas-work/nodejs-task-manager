require('dotenv').config()
const mysql2 = require('mysql2/promise')
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env


const pool = mysql2.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})
pool.close = () => pool.end();

module.exports = pool;
