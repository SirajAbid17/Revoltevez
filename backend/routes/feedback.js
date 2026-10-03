const express = require("express");
const feedbackController = require("../controllers/feedbackController");

const router = express.Router();

// Public
router.post("/", feedbackController.submitFeedback);
router.get("/", feedbackController.getApprovedFeedback);
router.get("/mine", feedbackController.getMyFeedback); // ⭐ NEW

module.exports = router;