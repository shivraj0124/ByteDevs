const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
});

venueSchema.index({ location: "2dsphere" }); // Index for geolocation queries

module.exports = mongoose.model("Map", venueSchema);
