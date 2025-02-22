const express = require("express");
const router = express.Router();
const Venue = require("../Models/VenueModel");
router.get("/getVenues", async (req, res) => {
    const { filter } = req.body;
    try {
      if (filter === "All") {
        const venues = await Venue.find();
        res.json(venues);
      } else if (filter === "approved") {
        const venues = await Venue.find({isApproved: true });
        res.json(venues);
      } else if (filter === "unapproved") {
        const venues = await Venue.find({isApproved: false });
        res.json(venues);
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching venues", error: err.message });
    }
  });

router.put("/approveVenue/:id", async (req, res) => {
  try {
    const venueId = req.params.id;

    const updatedVenue = await Venue.findByIdAndUpdate(
      venueId,
      { isApproved: true },
      { new: true }
    );

    if (!updatedVenue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.status(200).json({ message: "Venue approved", venue: updatedVenue });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating event", error: error.message });
  }
});

module.exports = router;