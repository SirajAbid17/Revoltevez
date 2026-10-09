const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const chatController = require("../controllers/chatController");


router.post("/chat", authenticate, chatController.handleChat);
router.delete("/chat/:sessionId", authenticate, chatController.clearSession);


router.get(
  "/chat/keys-stats",
  authenticate,
  chatController.getKeysStats
);

router.post(
  "/chat/reset-keys",
  authenticate,
  chatController.resetKeys
);

module.exports = router;