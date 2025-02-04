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

app.get("/hello", (req, res) => {
  const name = "rifky";
  res.send(`Hello world to ${name}`);
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

app.put("/login", (req, res) => {
  console.log({ updateData: req.body });
  res.send("Update data berhasil");
});

app.listen(port, () => {
  console.log(`App in port http://localhost:${port}/`);
});
