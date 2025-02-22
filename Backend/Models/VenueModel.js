const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  images: [{ type: String }], 
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isApproved: { type: Boolean, default: false }, // Admin approval
},{
  timestamps: true,
});

module.exports = mongoose.model("Venue", venueSchema);
