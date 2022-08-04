const express = require("express")
const cors = require("cors")
// import database connection
const mongoose = require("./config/db")


// creation d'un objet express .
const app = express()
const port = 3000

const categoriesController = require("./controllers/categoriesController")
const productsController = require("./controllers/productsController")
const ordersController = require("./controllers/ordersController")
// autorisé les données de type JSON
app.use(express.json())
// autorisé les données de type files
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('./assets/images'));
app.use(express.static('./assets/images/products'));
// autorisé l'accee d'un serveur
app.use(cors())

app.use("/categories", categoriesController)
app.use("/products", productsController)
app.use("/orders", ordersController)
// create server
app.listen(port, () => { console.log(`🟢 Server started on port ${port}`); })