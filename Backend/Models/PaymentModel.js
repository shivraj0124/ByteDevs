const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  transactionId: { type: String },
  createdAt: { type: Date, default: Date.now },
},{
  timestamps: true,
});

module.exports = mongoose.model("Payment", paymentSchema);
