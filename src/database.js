const mysql = require("mysql2");
require("dotenv").config();
const conn = mysql.createConnection(process.env.DATABASE_URL.toString());

conn.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("db connected");
  }
});

module.exports = conn;
