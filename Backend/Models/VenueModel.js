const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  displayName: { type: String, required: true},
  city: { type: String },
  state: { type: String },
  capacity: { type: Number, required: true },
  images: { type: String }, 
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isApproved: { type: Boolean, default: false }, // Admin approval
},{
  timestamps: true,
});
venueSchema.index({ location: "2dsphere" }); // Index for geolocation queries

module.exports = mongoose.model("Venue", venueSchema);
