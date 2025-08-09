const express = require("express")
const cors = require("cors")
const router = express.Router()
const Register = require("./Middleware/Middleware_Register")

const port = 3000;
const hostname = "127.0.0.1";

const app = express()

app.use(cors())
app.use(express.json())

app.use("/Register", Register)


app.listen(port, hostname, () => {
    console.log("Berhasil listering in port : ", port)
})