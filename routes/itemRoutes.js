const express = require("express");
const router = express.Router();
const Todo = require("../models/item"); // Assuming your model is in the models directory

// Get all todos
router.get("/get", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new todo
router.post("/", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed || false,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a todo by ID
router.put("/:id", async (req, res) => {
  try {
    // Validate request body
    if (!req.body || (Object.keys(req.body).length === 0)) {
      return res.status(400).json({ message: "Update data cannot be empty" });
    }

    // Validate ID format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid todo ID format" });
    }

    console.log("Update request received for ID:", req.params.id);
    console.log("Update data:", req.body);
    
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Update only allowed fields
    if (req.body.text !== undefined) todo.text = req.body.text;
    if (req.body.completed !== undefined) todo.completed = req.body.completed;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Error updating todo", error: error.message });
  }
});

// Delete a todo by ID
router.delete("/:id", async (req, res) => {
  try {
    // Validate ID format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid todo ID format" });
    }

    console.log("Delete request received for ID:", req.params.id);
    
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await todo.deleteOne();
    res.json({ message: "Todo deleted successfully", deletedTodo: todo });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Error deleting todo", error: error.message });
  }
});

module.exports = router;