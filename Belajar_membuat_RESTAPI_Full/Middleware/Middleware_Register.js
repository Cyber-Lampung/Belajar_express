const express = require("express")
const router = express.Router()
const cors = require("cors")

router.use(express.json())

router.get("/Register", (req, res, next) => {

    const { id, email, username, password } = req.body

    console.log(id,email,username,password)

    

})

module.exports = router;