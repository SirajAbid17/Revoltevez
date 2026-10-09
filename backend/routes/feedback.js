const express = require("express");
const feedbackController = require("../controllers/feedbackController");

const router = express.Router();


router.post("/", feedbackController.submitFeedback);
router.get("/", feedbackController.getApprovedFeedback);
router.get("/mine", feedbackController.getMyFeedback); 

module.exports = router;