const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("todo", itemSchema);