const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const requireRole  = require("../middleware/requireRole");
const upload = require("../middleware/uploadStory");

const {
  getPublicStories,
  getStoryById,
  getAllStoriesAdmin,
  createStory,
  updateStory,
  deleteStory,
} = require("../controllers/storyController");


router.get("/", getPublicStories);


router.get("/admin/all", authenticate, requireRole("admin"), getAllStoriesAdmin);


router.get("/:id", getStoryById);


router.post(
  "/",
  authenticate,
  requireRole("admin"),
  upload.single("image"),
  createStory
);

router.put(
  "/:id",
  authenticate,
  requireRole("admin"),
  upload.single("image"),
  updateStory
);

router.delete("/:id", authenticate, requireRole("admin"), deleteStory);

module.exports = router;