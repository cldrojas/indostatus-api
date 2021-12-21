const config = require('./config/database');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

conn.connect(function (err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('db connected');
    }
});

module.exports = conn;
