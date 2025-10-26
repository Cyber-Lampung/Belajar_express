const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const db = require("./model/db/database.js");
const checkuser = require("./service/logic/service_logic_updateUser.js");
//const logicAksesApi = require("./service/logic/service_logic_AksesApi.js");

console.log(checkuser);

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

// untuk random user id
const id = uuidv4();

app.get("/api/v1/user/Login", (req, res) => {
  db.query("select * from user", (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

app.post("/api/v1/user/Register", (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.send("tidak boleh kosong");
  }

  db.query(
    "insert into user (id, email, username, password) values(?, ?, ?, ?)",
    [id, email, username, password],
    (err, save) => {
      if (err) throw err;

      if (save.affectedRows > 0) {
        res.status(201).json({ massage: "berhasil create user", status: true });
      }
    }
  );
});

app.patch("/api/v1/user/patch/:username", (req, res, next) => {
  const user = req.params.username;

  const { email, username, password } = req.body;

  const fields = [];
  const values = [];
  console.log(values);

  if (email) {
    fields.push("email = ?");
    values.push(email);
  }

  if (username) {
    fields.push("username = ?");
    values.push(username);
  }

  if (password) {
    fields.push("password = ?");
    values.push(password);
  }

  checkuser(user, (err, result) => {
    if (err) return res.status(500).json({ message: "Error checking user" });
    if (result.length === 0)
      return res.status(404).json({ message: "User tidak ditemukan" });

    const sql = `UPDATE user SET ${fields.join(", ")} WHERE username = ?`;
    values.push(user);

    db.query(sql, values, (err, result) => {
      if (err) return res.status(500).json({ message: "Gagal update user" });
      res.json({ message: "User berhasil diupdate", result });
    });
  });
});

app.delete("/api/v1/user/delete/:username", (req, res) => {
  const username = req.params.username;
  console.log(username);

  db.query("delete from user where username = ?", [username], (err, del) => {
    if (err) throw err;

    if (del.affectedRows > 0) {
      res.status(204).json({ message: "user berhasil dihapus", status: 204 });
    } else {
      res.status(404).json({ message: "not found user", status: 404 });
    }
  });
});

app.listen(3000, function () {
  console.log("server berjalan pada port 3000");
});
