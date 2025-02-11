const db = require("../connectionDb");
const response = require("../response");

exports.getUser = (req, res) => {
  const sql = "select * from mahasiswa";
  db.query(sql, (error, result) => {
    if (error) {
      response(404, "Page Not Found", "Failed Get Data", res);
    }
    response(200, result, "Get Data From Mahasiswa", res);
  });
};

exports.addUser = (req, res) => {
  const { Username, Password, Nama, NoHp } = req.body;
  const sql = `insert into users (username, password, nama, No_HP) values ('${Username}', '${Password}', '${Nama}', '${NoHp}')`;

  db.query(sql, [Username, Password, Nama, NoHp], (error, field) => {
    if (error) {
      console.log("disini errornya bang", error);
    }
    const data = {
      AddStatus: field.affectedRows,
      InsertId: field.insertId,
    };
    response(200, data, "Add Data Success", res);
    console.log(field);
  });
};
