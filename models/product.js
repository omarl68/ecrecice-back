const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        idCategory: {
            type: String,
            required: true
        },
    }
)

const Product = mongoose.model("product", productSchema)

module.exports = Product