const express = require("express");
const cors = require("cors");
const mockDb = require("./model/mock/user.json");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/v1/user/Login", (req, res) => {
  res.json(mockDb);
});

app.post("/api/v1/user/Register", (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.send("tidak boleh kosong");
  }

  mockDb.find((u) => {
    if (u.email === email) {
      res.send("email sudah ada");
    } else {
      mockDb.push({
        email: email,
        username: username,
        password: password,
      });

      res.status(201).send("berhasil create account");
    }
  });
});

app.delete("/api/v1/user/delete/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  mockDb.find((id) => {
    if (id.id == userId) {
      console.log(id);
    } else {
      console.log("gagal get data");
    }
  });
});

app.listen(3000, function () {
  console.log("server berjalan pada port 3000");
});
