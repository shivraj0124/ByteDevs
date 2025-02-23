const express = require("express");
const router = express.Router();
const Event = require("../Models/EventModels");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const Venue = require("../Models/VenueModel");
dotenv.config();
const API_KEY = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

async function classifyComedyGenre(title, description) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
  Classify the comedy show into one of the following genres: 
  - Stand-up
  - Improv
  - Satire
  - Sketch
  - Dark Comedy
  - Marathi Comedy
  - Storytelling Comedy
  - Mimicry & Impression
  - Observational Comedy
  - Roast Comedy

  Title: "${title}"
  Description: "${description}"

  Only return the genre name without explanation.
  `;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const genre = response.text().trim();

    return genre;
  } catch (error) {
    console.error("Error generating content:", error);
    return "Error in classification";
  }
}

router.post("/create", async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      comedian,
      venue,
      ticketPrice,
      maxTickets,
      images,
    } = req.body;
    console.log(title,
      description,
      date,
      time,
      comedian,
      venue,
      ticketPrice,
      maxTickets,
      images)
    const genre = await classifyComedyGenre(title, description);
    console.log(genre);
    const newEvent = new Event({
      title,
      description,
      date,
      time:"",
      comedian,
      venue,
      ticketPrice,
      maxTickets,
      availableTickets: maxTickets,
      images,
      genre,
    });
    console.log(newEvent);

    await newEvent.save();
    console.log(newEvent);
    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating event", error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      venue,
      ticketPrice,
      maxTickets,
      images,
    } = req.body;
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
    res
      .status(500)
      .json({ message: "Error updating event", error: err.message });
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
    res
      .status(500)
      .json({ message: "Error deleting event", error: err.message });
  }
});

router.post("/myEvents/:id", async (req, res) => {
  const id = req.params.id;
  const { filter } = req.body;
  console.log(filter)
  try {
    if (filter === "All") {
      const venues = await Event.find({ comedian: id }).populate("venue");
      res.json(venues);
    } else if (filter === "Accepted") {
      const venues = await Event.find({ comedian: id, isApproved: true }).populate("venue");
      res.json(venues);
    } else if (filter === "Not Accepted") {
      const venues = await Event.find({ comedian: id, isApproved: false }).populate("venue");
      res.send(venues);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching venues", error: err.message });
  }
});

router.get("/getAllVenues", async (req, res) => {
  try {
    
      const venues = await Venue.find({isApproved: true });
      res.send(venues);
   
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching venues", error: err.message });
  }
});

module.exports = router;
