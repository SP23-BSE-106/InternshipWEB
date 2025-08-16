import mongoose from "mongoose";
import express from "express";
import { Todo } from "./models/todo.js"; // Import Todo model

// Connect to MongoDB
await mongoose
  .connect("mongodb://localhost:27017/todo")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// ✅ Route 1: Homepage
app.get("/", (req, res) => {
  res.send("🚀 Todo API is running...");
});

// ✅ Route 2: Add sample todos (to check if MongoDB saves properly)
app.get("/add-sample", async (req, res) => {
  try {
    await Todo.insertMany([
      { title: "Learn Node.js", description: "Study Node.js basics" },
      { title: "Build a Todo App", description: "Create a simple todo app" },
    ]);
    res.send("✅ Sample todos added to MongoDB!");
  } catch (err) {
    console.error("❌ Error inserting sample todos:", err);
    res.status(500).send("Error inserting sample todos");
  }
});

// ✅ Route 3: Get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send("❌ Error fetching todos");
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
