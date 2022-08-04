const express = require("express")

const Order = require("./../models/order")

const app = express()

app.get("/", async (req, res) => {

    try {
        let orders = await Order.find()
        res.status(200).send(orders)
    } catch (e) {
        res.status(400).send({ message: "error fetching orders" })
    }

})

app.get("/:id", async (req, res) => {

    try {

        let orderId = req.params.id
        let order = await Order.findOne({ _id: orderId })

        if (order) {
            res.status(200).send(order)
        }
        else {
            res.status(404).send({ message: "order not found !" })
        }

    } catch (error) {
        res.status(400).send({ message: "error fetching order" })
    }

})

app.post("/", async (req, res) => {

    try {
        let data = req.body

        let order = new Order({
            address: data.address,
            products: data.products,
            totalPrice: data.totalPrice
        })

        await order.save()

        res.status(201).send({ message: "order added succesfully" })

    } catch (e) {
        res.status(400).send({ message: "order not saved " })
    }

})

app.patch("/:id", async (req, res) => {
    try {
        let orderId = req.params.id
        let data = req.body
        let order = await Order.findOneAndUpdate({ _id: orderId }, data)

        if (order) {
            res.status(200).send({ message: "order updated succesfully" })
        }
        else {
            res.status(404).send({ message: "order not found !" })
        }

    } catch (error) {
        res.status(400).send({ message: "error fetching order" })
    }


})

app.delete("/:id", async (req, res) => {
    try {
        let orderId = req.params.id

        let order = await Order.findOneAndDelete({ _id: orderId })

        if (order) {
            res.status(200).send({ message: "order deleted succesfully" })
        }
        else {
            res.status(404).send({ message: "order not found !" })
        }

    } catch (error) {
        res.status(400).send({ message: "error fetching order" })
    }

})


module.exports = app