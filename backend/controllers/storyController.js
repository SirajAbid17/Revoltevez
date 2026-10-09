const Story = require("../models/Story");



exports.getPublicStories = async (req, res) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 0;
    const q = Story.find({ status: "published" })
      .sort({ featured: -1, date: -1, createdAt: -1 })
      .select("-content");

    if (limit > 0) q.limit(limit);

    const stories = await q.lean();
    res.json(stories);
  } catch (err) {
    console.error("getPublicStories:", err);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
};

exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate(
      "author",
      "name photoURL"
    );
    if (!story) return res.status(404).json({ error: "Story not found" });

    const isAdmin = req.dbUser?.role === "admin";
    if (story.status !== "published" && !isAdmin) {
      return res.status(403).json({ error: "Story not available" });
    }

    story.views = (story.views || 0) + 1;
    await story.save();

    res.json(story);
  } catch (err) {
    console.error("getStoryById:", err);
    res.status(500).json({ error: "Failed to fetch story" });
  }
};



exports.getAllStoriesAdmin = async (req, res) => {
  try {
    const stories = await Story.find()
      .sort({ createdAt: -1 })
      .populate("author", "name email");
    res.json(stories);
  } catch (err) {
    console.error("getAllStoriesAdmin:", err);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
};

exports.createStory = async (req, res) => {
  try {
    const { title, category, description, content, featured, status } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Cover image is required" });
    }

    const imageUrl = req.file.path || req.file.secure_url || req.file.location;

    const story = await Story.create({
      title,
      category,
      description,
      content: content || "",
      image: imageUrl,
      featured: featured === "true" || featured === true,
      status: status === "draft" ? "draft" : "published",
      author: req.dbUser?._id,
    });

    res.status(201).json(story);
  } catch (err) {
    console.error("createStory:", err);
    res.status(400).json({ error: err.message || "Failed to create story" });
  }
};

exports.updateStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });

    const { title, category, description, content, featured, status } = req.body;

    if (title       !== undefined) story.title       = title;
    if (category    !== undefined) story.category    = category;
    if (description !== undefined) story.description = description;
    if (content     !== undefined) story.content     = content;
    if (featured    !== undefined) story.featured    = featured === "true" || featured === true;
    if (status      !== undefined) story.status      = status === "draft" ? "draft" : "published";

    if (req.file) {
      story.image = req.file.path || req.file.secure_url || req.file.location;
    }

    await story.save();
    res.json(story);
  } catch (err) {
    console.error("updateStory:", err);
    res.status(400).json({ error: err.message || "Failed to update story" });
  }
};

exports.deleteStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });
    res.json({ success: true, id: story._id });
  } catch (err) {
    console.error("deleteStory:", err);
    res.status(500).json({ error: "Failed to delete story" });
  }
};