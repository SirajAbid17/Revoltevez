const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: { type: String, required: true, trim: true },
    productImage: { type: String, default: "" },
    productPrice: { type: String, default: "N/A" },

    userName: { type: String, required: true, trim: true },
    whatsapp: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },

    status: {
      type: String,
      enum: ["pending", "contacted", "confirmed", "cancelled"],
      default: "pending",
    },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);