const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" }, // Can be for event
  comedian: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // OR for comedian
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
},{
  timestamps: true,
});

module.exports = mongoose.model("Review", reviewSchema);
