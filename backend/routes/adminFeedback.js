const express = require("express");
const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");
const feedbackController = require("../controllers/feedbackController");

const router = express.Router();


router.use(authenticate, requireRole("admin"));

router.get("/", feedbackController.getAllFeedback);
router.put("/:id/status", feedbackController.updateFeedbackStatus);
router.put("/:id/reply", feedbackController.replyToFeedback);
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;