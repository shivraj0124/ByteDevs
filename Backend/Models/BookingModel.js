const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Customer ID
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    }, // Event ID
    ticketsBooked: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    bookingDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
