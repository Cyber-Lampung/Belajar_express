const mysql = require("mysql");

const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  username: "sql12796398",
  password: "DM5raeWkhf",
  database: "sql12796398",
});

db.connect((err) => {
  if (err) throw err;

  console.log("berhasil connect");
});
