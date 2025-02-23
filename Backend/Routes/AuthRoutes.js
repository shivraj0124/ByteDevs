const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    console.log(user);

    user = new User({ name, email, password, role });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res
      .status(201)
      .json({
        message: "User registered successfully",
        user: user,
        token: token,
      });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (user.password !== password)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      token,
      user
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Protected Route Example
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
    let token = req.header("Authorization");
  
    console.log("Received Token:", token);
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "No token, authorization denied" });
    }
  
    try {
      token = token.split(" ")[1]; // Remove "Bearer" part
      console.log("Extracted Token:", token);
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token Data:", decoded);
  
      req.user = decoded;
      next();
    } catch (err) {
      console.log("Token Verification Error:", err.message);
      res.status(400).json({ message: "Invalid token" });
    }
  }
  

module.exports = router;
