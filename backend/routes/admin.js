const express = require("express");
const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");
const User = require("../models/User");

const router = express.Router();

/**
 * POST /api/admin/promote
 */
router.post("/promote", authenticate, requireRole("admin"), async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: "Email required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    user.role = "admin";
    await user.save();

    res.json({
      success: true,
      message: `${email} promoted to admin`,
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/admin/demote
 */
router.post("/demote", authenticate, requireRole("admin"), async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    user.role = "user";
    await user.save();

    res.json({
      success: true,
      message: `${email} demoted to user`,
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/admin/users
 */
router.get("/users", authenticate, requireRole("admin"), async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ success: true, count: users.length, users });
});

module.exports = router;