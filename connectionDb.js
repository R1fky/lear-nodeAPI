const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kampus_api", //nama_database yang akan di koneksi
});

module.exports = db;
