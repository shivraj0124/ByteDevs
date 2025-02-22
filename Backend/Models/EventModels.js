const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  comedian: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Comedian ID
  venue: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true }, // Selected venue
  ticketPrice: [
    {
      typeOfSeat: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  maxTickets: { type: Number, required: true },
  availableTickets: { type: Number, required: true },
  images: [{ type: String }], 
  isApproved: { type: Boolean, default: false }, // Approval by Venue Manager
},{
  timestamps: true,
});

module.exports = mongoose.model("Event", eventSchema);
