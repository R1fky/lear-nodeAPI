const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
// database
const db = require("./connectionDb");
//response
const response = require("./response");

app.use(bodyParser.json());

// route Get Data
app.get("/", (req, res) => {
  const querySql = "select * from mahasiswa";

  db.query(querySql, (error, result) => {
    response(200, result, "Get Data From Table Mahasiswa", res);
  });
});

//find berdasarkan route sama dengan atau opsional
app.get("/find", (req, res) => {
  console.log("find Mahasiswa where NIM", req.query.nim);

  const sql = `select * from mahasiswa where nim = ${req.query.nim}`;
  db.query(sql, (error, result) => {
    response(200, result, "Find NIM mahasiswa", res);
  });
});

//route spesifik req dari params route
app.get("/find/:nim", (req, res) => {
  const sql = `select * from mahasiswa where nim = ?`;
  db.query(sql, [req.params.nim], (error, result) => {
    if (error) {
      return res.status(400).json({ message: "Database Not Found", error: error.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Data Not Found" });
    }
    response(200, result, "Data Found", res);
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  if (username === "Blitz") {
    res.send("Login berhasil");
    console.log({ requestFromOutside: req.body });
  } else {
    res.status(400).send("Failde Username salah");
  }
});

app.listen(port, () => {
  console.log(`App in port http://localhost:${port}/`);
});
