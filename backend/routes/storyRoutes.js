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

/* ---------- PUBLIC ---------- */
router.get("/", getPublicStories);

/* ---------- ADMIN (must be before /:id) ---------- */
router.get("/admin/all", authenticate, requireRole("admin"), getAllStoriesAdmin);

/* ---------- PARAM ---------- */
router.get("/:id", getStoryById);

/* ---------- MUTATIONS (admin only) ---------- */
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