// menginstall dependencis terlebih dahulu yaitu express dengan npm install express

const express = require("express")
const RouterExpress = require("./Router_Express")

const app = express()

//? method get untuk meminta dari server sebuah path
app.get("/admin", (req, res) => {
    res.send("Ini adalah Method Get")
})

// ? method post biasanya untuk mengecek apakah ada kiriman dari user jika ada maka bisa mengirim response contoh :
app.post("/user", (req, res) => {
    const { username, password } = req.body

    console.log(username, password)
})

// ini untuk mengambil parameter yang ada diurl contoh http://localhost:3000/user/admin => maka hasilnya user : "admin" dan datanya berupa JSON
app.get("/user/:id", (req, res) => {
    res.send(req.params)
})

// ? next parameter next() untuk mencari apakah pada function pertama ada yang akan meresponse jika tidak maka akan dilanjutkan ke function berikutnya

app.get("/param/a", (req, res, next) => {
    // res.send("hello from a")
    console.log("permintaan a ada di console")

    next()
}, (req, res) => {
    res.send("hello ini dari function next parameter b")
})


// ? next() bisa untuk menangani beberapa permintaan sekaligus untuk menangani permintaan
const paramA = function(req, res, next) {
    console.log("param1 ")
    next()
}

const paramB = function(res, res, next){
    console.log("param2")
    next()
}

app.get("/permintaan/C", [paramA, paramB], (req, res, next) => {
    console.log("ini permintaan c")
    next()
}, function(req, res){
    res.send("ini adalah hasil dari next route")
})

// application route bisa digunakan untuk membuat beberapa method sekaligus Contoh : 

app.route("/book")
.get((req, res) => {
    res.send("ini permintaan route dari /book dengan method get")
})
.post((req, res) => {
    res.send("ini permintaan dari route /book dengan method post")
})
.put((req, res) => {
    res.send("ini permintaan route dari /book dengan method put")
})

// ini adalah sebuah method untuk mengambil config dari file lain
app.use("/Router", RouterExpress)

app.listen(3000)