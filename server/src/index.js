import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.js";
import playlistRoutes from "./routes/playlists.js";
import browseRoutes from "./routes/browse.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// routes
app.use("/auth", authRoutes);
app.use("/playlists", playlistRoutes);
app.use("/browse", browseRoutes); // Added browse routes

app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
