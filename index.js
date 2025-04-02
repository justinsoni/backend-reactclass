const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require("./routes/itemroutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-url.onrender.com'], // Add your frontend Render URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://justin:justin123@todo.han2ehj.mongodb.net/?retryWrites=true&w=majority&appName=todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Database connection error:", err));

// Use routes
app.use("/api", itemRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Todo API is running!");
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});