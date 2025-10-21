const express = require("express");
const cors = require("cors");
const db = require("./model/db/database.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.get("/api/v1/user/Login", (req, res) => {
  db.query("select * from user", (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

app.post("/api/v1/user/Register", (req, res) => {
  const { id, email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.send("tidak boleh kosong");
  }

  db.query(
    "insert into user (id, email, username, password) values(?, ?, ?, ?)",
    [id, email, username, password],
    (err, save) => {
      if (err) throw err;

      res.send("okee");
    }
  );
});

app.patch("/api/v1/user/patch/:id", (req, res) => {
  const patchById = parseInt(req.params.id);

  const searchUserPatch = () => {
    const user = mockDb.find((u) => u.id === patchById);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "invalid get data" });
    }
  };

  searchUserPatch();
});

app.delete("/api/v1/user/delete/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  // untuk menyimpan data user baru
  let dataUserbaru;

  const deleteUser = () => {
    const dl = mockDb.splice(0, userId);
    if (dl) {
      res.status(202).send({ message: "berhasil hapus user", statusCode: 201 });
    }
  };

  deleteUser();

  // console.log(dataUserbaru);
});

app.listen(3000, function () {
  console.log("server berjalan pada port 3000");
});
