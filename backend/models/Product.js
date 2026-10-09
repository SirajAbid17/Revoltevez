const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: "N/A" },
    tagline: { type: String, trim: true, default: "N/A" },
    image: { type: String, required: true, trim: true },
    imagePublicId: { type: String, default: "" }, 
    topSpeed: { type: String, trim: true, default: "N/A" },
    range: { type: String, trim: true, default: "N/A" },
    battery: { type: String, trim: true, default: "N/A" },
    price: { type: String, trim: true, default: "N/A" },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
    views: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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

module.exports = mongoose.model("Product", productSchema);