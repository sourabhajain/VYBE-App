// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// --- Optional: existing register + login (keeps working if you want JWT style)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ displayName: name, email, password: hashedPassword });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.displayName,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.password && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.displayName,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || "dev_secret", { expiresIn: "30d" });

// --- NEW: ensureUser (for Firebase clients)
// Client will call this after sign-in to ensure a server-side user exists
export const ensureUser = async (req, res) => {
  try {
    // verifyUser middleware will have created req.user and req.userId
    if (!req.user) return res.status(400).json({ message: "No user data" });
    const user = req.user;
    res.json({ user });
  } catch (err) {
    console.error("ensureUser error", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Optional: get current user for JWT workflow - keep if using JWT
export const getMe = (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not authorized" });
  res.json(req.user);
};
