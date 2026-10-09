const Booking = require("../models/Booking");
const Product = require("../models/Product");


exports.createBooking = async (req, res, next) => {
  try {
    const { productId, userName, whatsapp, location } = req.body;

    
    if (!productId || !userName?.trim() || !whatsapp?.trim() || !location?.trim()) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    
    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    const booking = await Booking.create({
      productId: product._id,
      productName: product.name,
      productImage: product.image,
      productPrice: product.price,
      userName: userName.trim(),
      whatsapp: whatsapp.trim(),
      location: location.trim(),
    });

    console.log(`📅 New booking: ${booking.userName} → ${booking.productName}`);

    res.status(201).json({
      success: true,
      message: "Booking submitted successfully",
      booking,
    });
  } catch (err) {
    next(err);
  }
};


exports.getAllBookings = async (req, res, next) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status && status !== "all") filter.status = status;

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });

    const counts = {
      pending: await Booking.countDocuments({ status: "pending" }),
      contacted: await Booking.countDocuments({ status: "contacted" }),
      confirmed: await Booking.countDocuments({ status: "confirmed" }),
      cancelled: await Booking.countDocuments({ status: "cancelled" }),
      total: await Booking.countDocuments({}),
    };

    res.json({ success: true, count: bookings.length, bookings, counts });
  } catch (err) {
    next(err);
  }
};


exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const allowed = ["pending", "contacted", "confirmed", "cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, error: "Booking not found" });
    }

    res.json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};


exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, error: "Booking not found" });
    }

    await booking.deleteOne();
    res.json({ success: true, message: "Booking deleted" });
  } catch (err) {
    next(err);
  }
};