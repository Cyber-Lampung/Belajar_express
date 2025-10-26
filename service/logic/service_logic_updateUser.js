const db = require("../../model/db/database.js");

let checkuser = (username, callback) => {
  console.log(username);
  db.query(
    "select * from user where username = ?",
    [username],
    (err, result) => {
      if (err) throw err;

      callback(null, result);
    }
  );
};

module.exports = checkuser;
