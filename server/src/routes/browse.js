import express from "express";

const router = express.Router();

// Mock data for demonstration
const trendingItems = [
  { id: 1, title: "Trending Song 1", artist: "Artist 1" },
  { id: 2, title: "Trending Song 2", artist: "Artist 2" },
];

const popularArtists = [
  { id: 1, name: "Artist 1" },
  { id: 2, name: "Artist 2" },
];

// Get trending items
router.get("/trending", (req, res) => {
  res.json(trendingItems);
});

// Get popular artists
router.get("/popular-artists", (req, res) => {
  res.json(popularArtists);
});

export default router;
