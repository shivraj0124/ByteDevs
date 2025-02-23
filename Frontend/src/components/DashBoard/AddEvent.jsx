import { useState, useEffect } from "react";
import axios from "axios";

const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [comedian, setComedian] = useState(localStorage.getItem("userId"));
  const [venue, setVenue] = useState("");
  const [ticketPrice, setTicketPrice] = useState([{ typeOfSeat: "", price: "" }]);
  const [maxTickets, setMaxTickets] = useState("");
  const [availableTickets, setAvailableTickets] = useState("");
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [venues, setVenues] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/artist/getAllVenues");
      setVenues(response.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...ticketPrice];
    updatedTickets[index][field] = value;
    setTicketPrice(updatedTickets);
  };

  const addTicketPrice = () => {
    setTicketPrice([...ticketPrice, { typeOfSeat: "", price: "" }]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // const handleImageUpload = async () => {
    
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "kjhack");

    try {
      const response1= await axios.post(
        "https://api.cloudinary.com/v1_1/dnxwlb64j/image/upload",
        formData
      );
      console.log(response1.data.secure_url)
      setUploadedImageUrl(response1.data.secure_url);
      const url=response1.data.secure_url
   
      const response = await axios.post("http://localhost:5001/api/artist/create", {
        title,
        description,
        date,
        time,
        comedian,
        venue,
        ticketPrice,
        maxTickets,
        availableTickets,
        images: url,
      });
      setMessage("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      setMessage("Error creating event.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Create Event</h2>
      {message && <p className="mb-2 text-green-400">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event Title" required className="border border-gray-600 rounded-lg p-2 bg-gray-800 text-white" />

        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event Description" required className="border border-gray-600 rounded-lg p-2 bg-gray-800 text-white"></textarea>

        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="border border-gray-600 rounded-lg p-2 bg-gray-800 text-white" />

        <select value={venue} onChange={(e) => setVenue(e.target.value)} required className="border border-gray-600 rounded-lg p-2 bg-gray-800 text-white">
          <option value="">Select Venue</option>
          {venues.map((venue) => (
            <option key={venue._id} value={venue._id}>{venue.name}</option>
          ))}
        </select>

        {ticketPrice.map((ticket, index) => (
          <div key={index} className="flex gap-2">
            <input type="text" placeholder="Seat Type" value={ticket.typeOfSeat} onChange={(e) => handleTicketChange(index, "typeOfSeat", e.target.value)} className="border border-gray-600 rounded-lg p-2 bg-gray-800 text-white" />
            <input type="number" placeholder="Price" value={ticket.price} onChange={(e) => handleTicketChange(index, "price", e.target.value)} className="border border-gray-600 rounded-lg p-2 bg-gray-800 text-white" />
          </div>
        ))}
        <button type="button" onClick={addTicketPrice} className="bg-blue-600 p-2 rounded-lg">+ Add Ticket Type</button>

        <input type="number" value={maxTickets} onChange={(e) => setMaxTickets(e.target.value)} placeholder="Max Tickets" required className="border border-gray-600 rounded-lg p-2 bg-gray-800 text-white" />

        <input type="number" value={availableTickets} onChange={(e) => setAvailableTickets(e.target.value)} placeholder="Available Tickets" required className="border border-gray-600 rounded-lg p-2 bg-gray-800 text-white" />

        <input type="file" onChange={handleImageChange} className="border border-gray-600 rounded-lg p-2 bg-gray-800 text-white" />

        <button type="submit" className="bg-green-600 p-2 rounded-lg hover:bg-green-700">Create Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
