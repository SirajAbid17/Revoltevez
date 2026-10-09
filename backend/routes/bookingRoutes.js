const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");
const ctrl = require("../controllers/bookingController");


router.post("/bookings", ctrl.createBooking);


router.get(
  "/admin/bookings",
  authenticate,
  requireRole("admin"),
  ctrl.getAllBookings
);

router.put(
  "/admin/bookings/:id/status",
  authenticate,
  requireRole("admin"),
  ctrl.updateBookingStatus
);

router.delete(
  "/admin/bookings/:id",
  authenticate,
  requireRole("admin"),
  ctrl.deleteBooking
);

module.exports = router;