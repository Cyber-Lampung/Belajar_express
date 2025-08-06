const express = require("express")
const router = express.Router()

const TimeLog = function(req, res, next) {
    console.log({"Time" : Date.now})
    next()
}

router.get("/about", (req, res) => {
    res.send("ini dari file Router.Express.js")
})


// untuk mengirim config file ini kedalam file lain 
module.exports = router;