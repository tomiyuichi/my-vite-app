const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "myviteapp_user",
    password: "myviteapp_user",
    database: "myviteapp",
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to the MariaDB database');
    }
});

module.exports = db;