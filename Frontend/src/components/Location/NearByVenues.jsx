import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../EventCard";

const NearbyVenuesSearch = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [venues, setVenues] = useState([]);
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState([]);

  // Fetch nearby venues from backend
  const fetchVenues = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/nearbyVenues",
        {
          params: { latitude, longitude },
        }
      );
      setVenues(response.data.events);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  // Get user's current location on first visit
  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");

    if (storedLocation) {
      const parsedLocation = JSON.parse(storedLocation);
      setUserLocation(parsedLocation);
      fetchVenues(parsedLocation.latitude, parsedLocation.longitude);
    } else {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const locationData = { latitude, longitude };
            setUserLocation(locationData);
            localStorage.setItem("userLocation", JSON.stringify(locationData));
            fetchVenues(latitude, longitude);
          },
          (error) => console.error("Error getting location:", error)
        );
      }
    }
  }, []);

  // Search for a location using Nominatim API
  const searchLocation = async () => {
    if (!query) return;

    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: { q: query, format: "json", limit: 5 },
        }
      );
      setLocations(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // Handle location selection
  const handleLocationSelect = (loc) => {
    const latitude = parseFloat(loc.lat);
    const longitude = parseFloat(loc.lon);
    setUserLocation({ latitude, longitude });
    console.log(latitude, longitude);
    // localStorage.setItem("userLocation", JSON.stringify({ latitude, longitude }));
    setLocations([]); // Clear search results
    fetchVenues(latitude, longitude);
  };

  return (
    <div className="text-white bg-black h-max w-[100%]">
      <h2 className="text-2xl mt-5">NearBy Events</h2>

      <div>
        {/* <input
          type="text"
          placeholder="Enter location name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="text-white placeholder:text-white"
        /> */}
        <div className="flex items-center justify-center gap-4 mt-2">
          {/* Input Field */}
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Enter location"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border border-gray-600 rounded-lg p-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              aria-label="Location input"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={() => searchLocation(query)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 border border-transparent cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex w-[100%]  justify-center items-center">
        {locations.length > 0 && (
          <ul className="border border-blue-500 w-max text-center mt-5 p-2">
            {locations.map((loc, index) => (
              <li
                className="text-center cursor-pointer"
                key={index}
                onClick={() => {
                  handleLocationSelect(loc);
                }}
              >
                {loc.display_name} 
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* <h3>Nearby Venues:</h3> */}
      {venues.length > 0 ? (
        <div className="mt-6 w-[100%] p-4 ">
          {/* <h2 className="text-lg font-semibold mb-4">Event Results</h2> */}
          <div className="grid grid-cols-4 gap-3 w-[100%]">
            {venues.map((item, index) => (
              <EventCard data={item} />
            ))}
          </div>
        </div>
      ) : (
        <p>No venues found.</p>
      )}
    </div>
  );
};

export default NearbyVenuesSearch;
