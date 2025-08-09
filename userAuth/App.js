const express = require("express")
const cors = require("cors")
const JWT = require("jsonwebtoken")
const router = express.Router()


const app = express()
app.use(express.json())
app.use(cors())

app.get("/", () => {
    res.send("home page")
})

app.get("/api/v2/user", () => {
    
})