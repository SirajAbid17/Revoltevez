const express = require("express");
const authenticate = require("../middleware/authenticate");
const authController = require("../controllers/authController");

const router = express.Router();

// Create JWT session (Clerk verify + JWT cookie)
router.post("/session", authenticate, authController.createSession);

// Logout (clear cookie)
router.post("/logout", authController.logout);

// Get current session
router.get("/me", authenticate, authController.getSession);

// Refresh JWT
router.post("/refresh", authenticate, authController.refreshSession);

module.exports = router;