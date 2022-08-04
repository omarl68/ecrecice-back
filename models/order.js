const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true
        },
        products:[mongoose.Schema.Types.Mixed],

        totalPrice: {
            type: Number,
            required: true
        }

    }
)

const Order = mongoose.model("orders", orderSchema)

module.exports = Order

