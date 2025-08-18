import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

const router = express.Router();

// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password || !displayName) {
      return res.status(400).json({ msg: "Email, password, and display name are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = new User({ email, password, displayName });
    await user.save();

    res.status(201).json({ msg: "Signup successful", user: { email: user.email, displayName: user.displayName } });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ msg: "Signup failed", error: err.message });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });

    res.json({ msg: "Login successful", token });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
});

export default router;
