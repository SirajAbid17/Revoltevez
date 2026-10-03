const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, default: "Anonymous" },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true, // ⭐ ONE EMAIL = ONE FEEDBACK
      index: true,
    },
    role: { type: String, trim: true, default: "Verified Rider" },
    avatar: { type: String, default: "" },
    provider: {
      type: String,
      enum: ["google", "email", "other"],
      default: "google",
    },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    message: { type: String, required: true, trim: true, maxlength: 500 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    reply: { type: String, default: "" },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);