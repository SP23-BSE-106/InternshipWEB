import mongoose from "mongoose";

// Define the schema (structure of a todo document)
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is mandatory
  },
  description: {
    type: String,
    required: true, // Description is mandatory
  },
  isDone: {
    type: Boolean,
    default: false, // Default value is false
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set current date/time
  },
});

// Export the model (capitalized name by convention)
export const Todo = mongoose.model("Todo", todoSchema);
