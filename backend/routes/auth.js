const express = require("express");
const clerkAuth = require("../middleware/clerkAuth");
const authenticate = require("../middleware/authenticate");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/session", clerkAuth, authController.createSession);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.getSession);
router.post("/refresh", authenticate, authController.refreshSession);

module.exports = router;