import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const EventForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "Push",
    channel: "android",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Created:", formData);
    alert("Event Created Successfully!");
    navigate("/"); // Navigate back to Campaign Table
  };

  return (
    <div className="p-10 bg-black min-h-screen text-white flex flex-col  items-center">
      <h2 className="text-2xl font-bold mb-6">Add New Venue</h2>
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <div className="mb-4">
          <label className="block text-gray-400 mb-2 text-left">Event Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2 text-left">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring focus:ring-blue-500"
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-400 mb-2 text-left">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg"
          >
            <option value="Push">Push</option>
            <option value="Inapp">In-App</option>
            <option value="Email">Email</option>
          </select>
        </div> */}
        <div className="mb-4">
          <label className="block text-gray-400 mb-2 text-left">Channel</label>
          <select
            name="channel"
            value={formData.channel}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg"
          >
            <option value="android">Android</option>
            <option value="iOS">iOS</option>
            <option value="web">Web</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-lg"
          >
            Add Venue
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
