const mysql = require("mysql");
const fs = require("fs");

const db = mysql.createConnection({
  host: "gateway01.ap-northeast-1.prod.aws.tidbcloud.com",
  port: 4000,
  user: "2Fpn1n3RZSHNNkL.root",
  password: "pFk3fPGqWgIUjUKD",
  database: "test",
  ssl: fs.readFileSync("model/db/isrgrootx1.pem"),
});

db.connect((err) => {
  if (err) throw err;

  console.log("berhasil connect");
});

module.exports = db;
