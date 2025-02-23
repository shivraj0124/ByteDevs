const express = require("express");
const router = express.Router();
const Venue = require("../Models/VenueModel");
const Event = require("../Models/EventModels");
const SearchModel = require("../Models/SearchModel");
const User = require("../Models/UserModel");
router.post("/nearbyVenues", async (req, res) => {
  try {
    const { latitude, longitude, maxDistance = 2000 } = req.query; // Max 15km in meters
    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required" });
    }

    const venues = await Venue.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(maxDistance), // 15km
        },
      },
    });
    console.log(venues);
    res.status(200).json(venues);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching venues", error: error.message });
  }
});

router.get("/nearbyVenues", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const maxDistance = 15000;
    console.log(latitude, longitude);
    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required" });
    }

    // If minCapacity is provided, filter by capacity
    // if (minCapacity) {
    //     query.capacity = { $gte: parseInt(minCapacity) };
    // }

    const venues = await Venue.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(maxDistance),
        },
      },
    });
    console.log(venues);
    // Fetch events for each venue
    const venueIds = venues.map((venue) => venue._id);
    console.log("venueIds", venueIds);
    const events = await Event.find({
      venue: { $in: venueIds },
      isApproved: true,
    })
      .populate("comedian")
      .populate("venue");
    console.log("events", events);

    console.log(events);
    res.send({ success: true, count: venues.length, events });
  } catch (error) {
    console.error("Error fetching nearby venues:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching venues",
      error: error.message,
    });
  }
});

router.get("/Events", async (req, res) => {
  console.log("Hello");
  try {
    const venues = await Event.find({ isApproved: true })
      .populate("comedian")
      .populate("venue");
    res.send(venues);
  } catch (err) {
    res.send({ message: "Error fetching venues", error: err.message });
  }
});

router.post("/addSearch", async (req, res) => {
  const { name } = req.body; // Comedian's name

  try {
    // Save the search entry
    const search = new SearchModel({ name });
    await search.save();

    // Find the comedian by name
    const comedian = await User.findOne({
      name: { $regex: new RegExp(name, "i") },
      role: "comedian",
    });
    if (!comedian) {
      return res.send({ message: "Comedian not found" });
    }

    // Fetch approved events for this comedian
    const events = await Event.find({
      comedian: comedian._id,
      isApproved: true,
    })
      .populate("comedian") // Populate comedian details
      .populate("venue"); // Populate venue details
    console.log(events);
    res.status(200).json({
      message: "Search added successfully",
      events,
    });
  } catch (err) {
    console.error(err);
    res.send({ message: "Server error" });
  }
});

module.exports = router;
