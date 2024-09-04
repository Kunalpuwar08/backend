const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email Already Exist" });
    }

    user = new User({ name, email, password });
    await user.save();
    res.json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Cred" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Password Is incorrect" });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SEC, { expiresIn: "1h" });
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
