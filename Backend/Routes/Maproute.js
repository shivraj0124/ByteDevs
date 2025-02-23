const express = require("express");
const router = express.Router();
const Venue = require("../Models/Maps");

router.post("/venues", async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;
    const newVenue = new Venue({
      name,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    await newVenue.save();
    res.status(201).json({ message: "Venue created successfully", venue: newVenue });
  } catch (error) {
    res.status(500).json({ message: "Error creating venue", error: error.message });
  }
});


router.get("/nearbyVenues", async (req, res) => {
    try {
      const { latitude, longitude, maxDistance = 2000 } = req.query; // Max 15km in meters
      if (!latitude || !longitude) {
        return res.status(400).json({ message: "Latitude and longitude are required" });
      }
        
      const venues = await Venue.find({
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
            $maxDistance: parseInt(maxDistance), // 15km
          },
        },
      });
      console.log(venues)
      res.status(200).json(venues);
    } catch (error) {
      res.status(500).json({ message: "Error fetching venues", error: error.message });
    }
  });
  
module.exports = router;
