const express = require("express")

const Category = require("./../models/category")

const app = express()

app.get("/", async (req, res) => {
    try {
        let categories = await Category.find();
        res.status(200).send(categories);
    } catch (error) {
        res
            .status(400)
            .send({ message: "error fetching categories !", error: error });
    }
});


app.get("/:id", async(req, res) => {

    try {
        let categoryId = req.params.id


        let category = await Category.findOne({ _id: categoryId });
        if (category) res.status(200).send(category);
        else res.status(404).send({ message: "Category not found !" });
    }
    catch (error) {
        res
            .status(400)
            .send({ message: "Error fetching category !", error: error });
    }
});

app.post("/", async (req, res) => {
    try {
        let data = req.body;


        let category = new Category({
            name: data.name,
        });

        await category.save();

        res.status(201).send({ message: "category saved !" });
    } catch (error) {
        res.status(400).send({ message: "category not saved !", error: error });
    }
})

app.patch('/:id', async (req, res) => {
    try {
        let categoryId = req.params.id
        let data = req.body

        let categories = await Category.findOneAndUpdate({ _id: categoryId }, data)

        if (categories)
            res.status(200).send({ message: "Categories updated !" })
        else
            res.status(404).send({ message: "Categories not found !" })

    } catch (error) {
        res.status(400).send({ message: "Error updating Training !", error: error })
    }

})
app.delete('/:id', async (req, res) => {
    try {
        let categoryId = req.params.id

        let categories = await Category.findOneAndDelete({ _id: categoryId })

        if (categories)
            res.status(200).send({ message: "Categories deleted !" })
        else
            res.status(404).send({ message: "Categories not found !" })

    } catch (error) {
        res.status(400).send({ message: "Error deleting Categories !", error: error })
    }
})

module.exports = app