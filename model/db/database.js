const mysql = require("mysql");
const fs = require("fs");

const db = mysql.createPool({
  host: "gateway01.ap-northeast-1.prod.aws.tidbcloud.com",
  port: 4000,
  user: "2Fpn1n3RZSHNNkL.root",
  password: "pFk3fPGqWgIUjUKD",
  database: "test",
  ssl: fs.readFileSync("model/db/isrgrootx1.pem"),
  connectionLimit: 10, // jumlah maksimum koneksi
});

db.on("error", (err) => {
  if (err) throw err;

  console.log("berhasil tersambung");
});

module.exports = db;
