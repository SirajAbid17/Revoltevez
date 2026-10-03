const Feedback = require("../models/Feedback");

// ============================================
// PUBLIC — Check if logged-in user already submitted
// GET /api/feedback/mine?email=xxx
// ============================================
exports.getMyFeedback = async (req, res, next) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required",
      });
    }

    const feedback = await Feedback.findOne({
      email: email.toLowerCase().trim(),
    });

    res.json({
      success: true,
      hasSubmitted: !!feedback,
      feedback: feedback || null,
    });
  } catch (err) {
    next(err);
  }
};

// ============================================
// PUBLIC — Submit new feedback (ONE PER EMAIL)
// POST /api/feedback
// ============================================
exports.submitFeedback = async (req, res, next) => {
  try {
    const { name, email, role, rating, message, avatar, provider } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email and message are required",
      });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: "Rating must be between 1 and 5",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address",
      });
    }

    // ⭐ CHECK: one email = one feedback
    const existing = await Feedback.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        error: "You have already submitted feedback. Only one submission per account is allowed.",
        existingFeedback: existing,
      });
    }

    const feedback = await Feedback.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role: role?.trim() || "Verified Rider",
      rating: Number(rating),
      message: message.trim(),
      avatar: avatar || "",
      provider: provider || "google",
      status: "pending",
    });

    console.log(`📝 Feedback from ${feedback.email} (avatar: ${feedback.avatar ? "yes" : "no"})`);

    res.status(201).json({
      success: true,
      message: "Thank you! Your feedback is pending approval.",
      feedback,
    });
  } catch (err) {
    // Duplicate key error (race condition safeguard)
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "You have already submitted feedback.",
      });
    }
    next(err);
  }
};

// ============================================
// PUBLIC — Get approved feedback
// GET /api/feedback
// ============================================
exports.getApprovedFeedback = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: feedbacks.length,
      feedbacks,
    });
  } catch (err) {
    next(err);
  }
};

// ============================================
// ADMIN — Get all
// GET /api/admin/feedback
// ============================================
exports.getAllFeedback = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = status && status !== "all" ? { status } : {};

    const feedbacks = await Feedback.find(query).sort({ createdAt: -1 });

    const [pending, approved, rejected, total] = await Promise.all([
      Feedback.countDocuments({ status: "pending" }),
      Feedback.countDocuments({ status: "approved" }),
      Feedback.countDocuments({ status: "rejected" }),
      Feedback.countDocuments(),
    ]);

    res.json({
      success: true,
      count: feedbacks.length,
      counts: { pending, approved, rejected, total },
      feedbacks,
    });
  } catch (err) {
    next(err);
  }
};

// ============================================
// ADMIN — Update status
// PUT /api/admin/feedback/:id/status
// ============================================
exports.updateFeedbackStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status" });
    }

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ success: false, error: "Feedback not found" });
    }

    res.json({ success: true, message: `Feedback ${status}`, feedback });
  } catch (err) {
    next(err);
  }
};

// ============================================
// ADMIN — Reply
// PUT /api/admin/feedback/:id/reply
// ============================================
exports.replyToFeedback = async (req, res, next) => {
  try {
    const { reply } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { reply: reply || "" },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ success: false, error: "Feedback not found" });
    }

    res.json({ success: true, message: "Reply saved", feedback });
  } catch (err) {
    next(err);
  }
};

// ============================================
// ADMIN — Delete
// DELETE /api/admin/feedback/:id
// ============================================
exports.deleteFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({ success: false, error: "Feedback not found" });
    }

    res.json({ success: true, message: "Feedback deleted" });
  } catch (err) {
    next(err);
  }
};