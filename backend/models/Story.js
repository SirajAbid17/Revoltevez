const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true, maxlength: 200 },
    category:    { type: String, required: true, trim: true, uppercase: true, maxlength: 60 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    content:     { type: String, default: "", trim: true },
    image:       { type: String, required: true },
    date:        { type: Date, default: Date.now },
    featured:    { type: Boolean, default: false },
    status:      { type: String, enum: ["published", "draft"], default: "published" },
    author:      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    views:       { type: Number, default: 0 },
  },
  { timestamps: true }
);

storySchema.index({ status: 1, featured: -1, date: -1 });

module.exports = mongoose.model("Story", storySchema);