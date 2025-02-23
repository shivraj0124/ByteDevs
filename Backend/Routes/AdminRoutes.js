const express = require("express");
const router = express.Router();
const Venue = require("../Models/VenueModel");
const User = require("../Models/UserModel");
const Event = require("../Models/EventModels");

router.get("/getVenues", async (req, res) => {
  const { filter } = req.body;
  try {
    if (filter === "All") {
      const venues = await Venue.find();
      res.json(venues);
    } else if (filter === "approved") {
      const venues = await Venue.find({ isApproved: true });
      res.json(venues);
    } else if (filter === "unapproved") {
      const venues = await Venue.find({ isApproved: false });
      res.json(venues);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching venues", error: err.message });
  }
});
    

// router.put("/approveVenue/:id", async (req, res) => {
//   try {
//     const venueId = req.params.id;

//     const updatedVenue = await Venue.findByIdAndUpdate(
//       venueId,
//       { isApproved: true },
//       { new: true }
//     );

//     if (!updatedVenue) {
//       return res.status(404).json({ message: "Venue not found" });
//     }

//     res.status(200).json({ message: "Venue approved", venue: updatedVenue });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error updating event", error: error.message });
//   }
// });

router.put("/toggleApproval/:id", async (req, res) => {
  try {
    const venueId = req.params.id;
    console.log(venueId)
    const venue = await Venue.findById(venueId);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    venue.isApproved = !venue.isApproved;
    await venue.save();

    res.status(200).json({ message: "Venue approval status updated", venue });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating venue", error: error.message });
  }
});


router.get("/getCustomers", async (req, res) => {
 
  try {
    
      const customer = await User.find({ role: "customer" });
      res.send(customer);

  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching venues", error: err.message });
  }
});

router.get("/getArtist", async (req, res) => {
 
  try {
      const customer = await User.find({ role: "comedian" });
      res.send(customer);

  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching venues", error: err.message });
  }
});

router.get("/getManagers", async (req, res) => {
 
  try {
      const customer = await User.find({ role: "manager" });
      res.send(customer);

  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching venues", error: err.message });
  }
});


router.get("/getEvents", async (req, res) => {
  const { filter } = req.body;
  try {
    if (filter === "All") {
      const venues = await Event.find();
      res.send(venues);
    } else if (filter === "approved") {
      const venues = await Event.find({isApproved: true });
      res.send(venues);
    } else if (filter === "unapproved") {
      const venues = await Event.find({isApproved: false });
      res.send(venues);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching venues", error: err.message });
  }
});



module.exports = router;
