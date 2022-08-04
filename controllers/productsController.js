const express = require("express")

const Product = require("./../models/product")
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express()

const storage = multer.diskStorage({
    destination: "./assets/images/products",
  
    filename: function (req, file, cb) {
      let name = req.body.name.replace(" ", "").toLowerCase();
  
      cb(null, name + "-" + Date.now() + path.extname(file.originalname));
    },
  });
  
  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
  
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype == true && extname == true) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  }
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  });

app.get("/", async (req, res) => {

    try {
        let products = await Product.find()
        res.status(200).send(products)
    } catch (e) {
        res.status(400).send({ message: "error fetching products" })
    }

})

app.get("/:id", async (req, res) => {

    try {

        let productId = req.params.id
        let product = await Product.findOne({ _id: productId })

        if (product) {
            res.status(200).send(product)
        }
        else {
            res.status(404).send({ message: "product not found !" })
        }

    } catch (error) {
        res.status(400).send({ message: "error fetching product" })
    }

})

app.post("/", [upload.single('picture')], async (req, res) => {

    try {
        let data = req.body
        let file = req.file
        let product = new Product({
            name: data.name,
            price: data.price,
            description: data.description,
            idCategory: data.idCategory,
            image: file.filename

        })

        await product.save()

        res.status(201).send({ message: "product added succesfully" })

    } catch (e) {
        res.status(400).send({ message: "product not saved " })
    }

})

app.patch("/:id", [upload.single("picture")], async (req, res) => {
    try {
        let productId = req.params.id
        let data = req.body

        if (req.file) {
            data.image = req.file.filename;
            let product = await Product.findOne({ _id: productId });
            fs.unlinkSync("assets/images/products/" + product.image);
          }

        let product = await Product.findOneAndUpdate({ _id: productId }, data)

        if (product) {
            res.status(200).send({ message: "product updated succesfully" })
        }
        else {
            res.status(404).send({ message: "product not found !" })
        }

    } catch (error) {
        res.status(400).send({ message: "error fetching product" })
    }


})

app.delete("/:id", async (req, res) => {
    try {
        let productId = req.params.id

        let product = await Product.findOneAndDelete({ _id: productId })

        if (product) {
            res.status(200).send({ message: "product deleted succesfully" })
        }
        else {
            res.status(404).send({ message: "product not found !" })
        }

    } catch (error) {
        res.status(400).send({ message: "error fetching product" })
    }

})

module.exports = app