const express = require("express");
const router = express.Router();
const Item = require("../models/item");

router.post("/", async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json({ message: "Item created successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/get", async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;