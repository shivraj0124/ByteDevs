const express = require("express");
const router = express.Router();
const Venue = require("../Models/VenueModel");
const Event = require("../Models/EventModels");
// const { verifyToken } = require("../middleware/auth"); // Ensure JWT Authentication

router.post("/create", async (req, res) => {
  try {
    const { name,  capacity, images, managerId,address,displayName,city,state ,latitude, longitude } = req.body;

    const newVenue = new Venue({
      name,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      capacity,
      images,
      state,
      city,
      displayName,
      manager: managerId,
    });
    console.log(newVenue)

    await newVenue.save();
    console.log(newVenue)
    res.send({ message: "Venue created successfully", newVenue });
    console.log(newVenue)
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating venue", error: err.message });
  }
});

router.get("/my-venues/:id", async (req, res) => {
  const id = req.params.id;
  const { filter } = req.body;
  try {
    if (filter === "All") {
      const venues = await Venue.find({ manager: id });
      res.json(venues);
    } else if (filter === "approved") {
      const venues = await Venue.find({ manager: id, isApproved: true });
      res.json(venues);
    } else if (filter === "unapproved") {
      const venues = await Venue.find({ manager: id, isApproved: false });
      res.json(venues);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching venues", error: err.message });
  }
});

// router.get("/getEvents/:id", async (req, res) => {
//     const id = req.params.id;
//     const { filter } = req.body;

//     try {
//       if (filter === "All") {
//         const venues = await Venue.find({ manager: id });
//         res.json(venues);
//       }else if(filter === "approved"){
//           const venues = await Venue.find({ manager: id ,isApproved: true });
//           res.json(venues);
//       }else if(filter === "unapproved"){
//           const venues = await Venue.find({ manager: id ,isApproved: false });
//           res.json(venues);
//       }
//     } catch (err) {
//       res
//         .status(500)
//         .json({ message: "Error fetching venues", error: err.message });
//     }
//   });

router.put("/update/:id", async (req, res) => {
  try {
    const { name, location, capacity, images } = req.body;
    const venueId = req.params.id;

    const venue = await Venue.findOne({ _id: venueId, manager: req.user.id });
    if (!venue) {
      return res
        .status(404)
        .json({ message: "Venue not found or unauthorized" });
    }

    venue.name = name || venue.name;
    venue.location = location || venue.location;
    venue.capacity = capacity || venue.capacity;
    venue.images = images || venue.images;

    await venue.save();
    res.json({ message: "Venue updated successfully", venue });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating venue", error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const venueId = req.params.id;

    const venue = await Venue.findOne({ _id: venueId, manager: req.user.id });
    if (!venue) {
      return res
        .status(404)
        .json({ message: "Venue not found or unauthorized" });
    }

    await Venue.findByIdAndDelete(venueId);
    res.json({ message: "Venue deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting venue", error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { name, location, capacity, images } = req.body;
    const venueId = req.params.id;

    const venue = await Venue.findOne({ _id: venueId, manager: req.user.id });
    if (!venue) {
      return res
        .status(404)
        .json({ message: "Venue not found or unauthorized" });
    }

    venue.name = name || venue.name;
    venue.location = location || venue.location;
    venue.capacity = capacity || venue.capacity;
    venue.images = images || venue.images;

    await venue.save();
    res.json({ message: "Venue updated successfully", venue });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating venue", error: err.message });
  }
});

router.put("/approveEvent/:id", async (req, res) => {
  try {
    const eventId = req.params.id;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { isApproved: true },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event approved", event: updatedEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating event", error: error.message });
  }
});

router.put("/toggleApproval/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    console.log(eventId)
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.isApproved = !event.isApproved;
    await event.save();

    res.status(200).json({ message: "Event approval status updated", event });
  } catch (error) {
    res.status(500).json({ message: "Error updating venue", error: error.message });
  }
});

router.post("/getEvents/:managerId", async (req, res) => {
  try {
    const managerId = req.params.managerId;
    const {filter}=req.body
    console.log(filter);
    // Step 1: Find all venues managed by the given managerId
    const venues = await Venue.find({ manager: managerId }).select("_id");

    if (!venues.length) {
      return res
        .status(404)
        .json({ message: "No venues found for this manager" });
    }

    // Step 2: Get event IDs linked to those venues
    const venueIds = venues.map((venue) => venue._id);

    // Step 3: Find events associated with the retrieved venue
    //  IDs
    if (filter === "All") {
      const events = await Event.find({ venue: { $in: venueIds } }).populate("comedian").populate("venue")

      res.status(200).json(events);
    } else if (filter === "Accepted") {
      const events = await Event.find({
        venue: { $in: venueIds },
        isApproved: true,
      }).populate("comedian").populate("venue")

      res.status(200).json(events);
    }else if (filter === "Not Accepted") {
        const events = await Event.find({
          venue: { $in: venueIds },
          isApproved: false,
        }).populate("comedian").populate("venue")
  
        res.status(200).json(events);
      }

  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
});



module.exports = router;
