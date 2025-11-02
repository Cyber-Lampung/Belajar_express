const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const db = require("./model/db/database.js");
const jwt = require("jsonwebtoken");
const brycpt = require("bcrypt");
const checkuser = require("./service/logic/service_logic_updateUser.js");
// const logicAksesApi = require("./service/logic/service_logic_AksesApi.js");
const admin = require("./service/routing/RoutingRoute.js");
const verifyTokenheader = require("./service/logic/verifyTokenUser.js");
// const helmet = require("helmet");

// token authentication

const verifyToken = "tokenharusdiverifykasi";

const app = express();
app.use(cors());
app.use(express.json());
// app.use(helmet());

app.use(express.static("public"));

// untuk random user id
const id = uuidv4();

app.get("/api/test/admin", (req, res) => {
  db.query("select * from admin", (err, result) => {
    if (err) throw err;

    res.json(result);
  });
});

app.get("/api/test/user", (req, res) => {
  db.query("select * from user", (err, result) => {
    if (err) throw err;

    res.json(result);
  });
});

// api login vps account

app.post("/api/v1/user/Login", (req, res, next) => {
  // mengambil data dari request user

  const { email, password } = req.body;

  // payload for jwt

  const payload = {
    userId: "hayo mau ngapain didecode",
    passId: "kamu mau nyari apa sih ?",
  };

  // membuat session untuk Register

  const tokenSession = jwt.sign(payload, verifyToken, {
    expiresIn: "1h",
  });

  db.query("select * from user", async (err, result) => {
    if (err) throw err;

    // medapatkan user kedalam database
    const findUser = result.find((u) => u.email === email);

    // validation user find / search user
    if (findUser) {
      const comparePassword = await brycpt.compare(password, findUser.password);

      // validation jika findUser dan compaerPassword sama sama true
      const validationUser = findUser && comparePassword;

      if (validationUser) {
        // simpan user session dalam header
        req.headers.authorization = tokenSession;
      }
    } else {
      return res.status(404).send({
        message: "user tidak ditemukan",
        validate: false,
        status: 404,
      });
    }

    const token = req.headers.authorization;

    const verif = verifyTokenheader(req, res, next, token);

    if (!verif) {
      res
        .status(401)
        .send({ message: "invalid login", validate: false, status: 401 });
    } else {
      res
        .status(200)
        .send({ message: "berhasil login", validate: true, userId: true });
    }
  });
});

// user Register
app.post("/api/v1/user/Register", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.send("tidak boleh kosong");
  }

  const payload = { email: email, username: username };
  const secretRegisterUser = "RegisterduluCihuy";

  // meng enkripsi password user

  const saltPassword = 10;

  const enkripsiPassword = await brycpt.hash(password, saltPassword);

  const session = jwt.sign(payload, secretRegisterUser, { algorithm: "HS256" });

  db.query(
    "insert into user (id, email, username, password, session) values(?, ?, ?, ?, ?)",
    [id, email, username, enkripsiPassword, session],
    (err, save) => {
      if (err) throw err;

      if (save.affectedRows > 0) {
        res.status(201).json({ massage: "berhasil create user", status: true });
      }
    }
  );
});

// edit user profile
app.patch("/api/v1/user/patch/:username", (req, res, next) => {
  const user = req.params.username;

  const { email, username, password } = req.body;

  const fields = [];
  const values = [];

  // console.log(values); => debug

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

// delete user profile => test delet profile
app.delete("/api/v1/user/delete/:username", (req, res) => {
  const user = req.params.username;

  db.query("select * from user", (err, del) => {
    if (err) throw err;

    const find = del.find((u) => u.username === user);

    if (find) {
      db.query("delete from user where username = ?", [user], (err, del) => {
        if (err) throw err;

        return res.status(200).send({
          message: "berhasil hapus user",
          valid: true,
          id: id,
        });
      });
    } else {
      return res.status(404).send({
        message: "user tidak ditemukan",
        valid: false,
        statusCode: 404,
      });
    }
  });
});

// test api for admin login

app.post("/admin", (req, res) => {
  const { email, password } = req.body;

  db.query("select * from admin", (err, result) => {
    if (err) throw err;

    const findAdmin = result.find(
      (admin) => admin.email === email && admin.password == password
    );

    if (findAdmin) {
      res.status(200).send({
        message: "berhasil login",
        status: 200,
        valid: true,
        session: findAdmin.session,
      });
    } else {
      return res
        .status(404)
        .send({ message: "user tidak ditemukan", status: 404, valid: false });
    }
  });
});

app.listen(3000, function () {
  console.log("server berjalan pada port 3000");
});
