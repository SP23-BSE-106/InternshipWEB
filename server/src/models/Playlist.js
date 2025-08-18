import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String },
  tracks: [
    {
      title: String,
      artist: String,
      coverUrl: String
    }
  ]
}, { timestamps: true });

export const Playlist = mongoose.model("Playlist", playlistSchema);
