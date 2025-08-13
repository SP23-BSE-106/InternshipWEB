const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routers/userRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Parse JSON body

app.get("/", (req, res) => res.send("API is running..."));
app.use("/api/users", userRoutes);

app.use(errorHandler); // Error handling middleware

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
