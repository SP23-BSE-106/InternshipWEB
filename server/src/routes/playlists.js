import express from "express";
import jwt from "jsonwebtoken";
import { Playlist } from "../models/PlayList.js";

const router = express.Router();

// Middleware: verify token
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get all playlists
router.get("/", auth, async (req, res) => {
  const lists = await Playlist.find({ userId: req.user.id });
  res.json(lists);
});

// Create playlist
router.post("/", auth, async (req, res) => {
  const { name, description } = req.body;
  const playlist = new Playlist({ userId: req.user.id, name, description, tracks: [] });
  await playlist.save();
  res.status(201).json(playlist);
});

export default router;
