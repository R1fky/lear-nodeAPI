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

// menambahkan data mahasiswa
app.post("/add/mahasiswa", (req, res) => {
  // mengambil data dari body
  const { nama_mhs, nim, kelas } = req.body;

  const sql = `insert into mahasiswa (nama_mhs, nim, kelas) values ('${nama_mhs}', ${nim}, '${kelas}')`;
  db.query(sql, [nama_mhs, nim, kelas], (error, result) => {
    // validasi salah satu jika null
    if ((!nama_mhs, !nim, !kelas)) {
      return res.status(400).json({ message: "Kolom Data tidak Boleh Kosong" });
    }
    if (error) {
      response(500, "error", "Internal Server Error", res);
    }

    const data = {
      isDataAdd: result.affectedRows,
      insertId: result.insertId,
    };

    if (result?.affectedRows) {
      response(200, data, "Add Data Success", res);
    }
  });
});

// edit data mahasiswa
app.put("/update/mahasiswa", (req, res) => {
  const { namaMhs, nim, Kelas } = req.body;

  const sql = `update mahasiswa set nama_mhs = '${namaMhs}', kelas = '${Kelas}' where nim = ${nim}`;

  db.query(sql, [namaMhs, Kelas, nim], (error, result) => {
    if (error) throw error;

    const data = {
      isDataUpdate: result.affectedRows,
      message: result.message,
    };

    if (result?.affectedRows) {
      response(200, data, "Data Update Successfuly", res);
    }
  });
});
// delete data mahasiswa

app.delete("/delete/mahasiswa", (req, res) => {
  const nim = req.body;
  console.log(nim);

  response(200, "Delete Data", "Deleted Data Success", res);

  // const sql = `delete from mahasiswa where nim = ${nim}`;

  // db.query(sql, [nim], (error, result) => {
  //   console.log(result);
  //
  // });
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
