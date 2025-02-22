const express = require("express");
const router = express.Router();
const Event = require("../Models/EventModels");

router.post("/create", async (req, res) => {
  try {
    const { title, description, date, time, comedian, venue, ticketPrice, maxTickets, images } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      comedian,
      venue,
      ticketPrice,
      maxTickets,
      availableTickets: maxTickets,
      images,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (err) {
    res.status(500).json({ message: "Error creating event", error: err.message });
  }
});



router.put("/update/:id", async (req, res) => {
  try {
    const { title, description, date, time, venue, ticketPrice, maxTickets, images } = req.body;
    const eventId = req.params.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.time = time || event.time;
    event.venue = venue || event.venue;
    event.ticketPrice = ticketPrice || event.ticketPrice;
    event.maxTickets = maxTickets || event.maxTickets;
    event.availableTickets = maxTickets || event.availableTickets;
    event.images = images || event.images;

    await event.save();
    res.json({ message: "Event updated successfully", event });
  } catch (err) {
    res.status(500).json({ message: "Error updating event", error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Event.findByIdAndDelete(eventId);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting event", error: err.message });
  }
});

router.get("/myEvents/:id", async (req, res) => {
  const id = req.params.id;
  const { filter } = req.body;
  try {
    if (filter === "All") {
      const venues = await Event.find({ comedian: id });
      res.json(venues);
    } else if (filter === "approved") {
      const venues = await Event.find({ comedian: id, isApproved: true });
      res.json(venues);
    } else if (filter === "unapproved") {
      const venues = await Event.find({ comedian: id, isApproved: false });
      res.send(venues);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching venues", error: err.message });
  }
});



module.exports = router;
