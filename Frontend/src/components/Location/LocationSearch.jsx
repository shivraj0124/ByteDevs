import React, { useState } from "react";
import axios from "axios";

const LocationSearch = ({ onSelectLocation }) => {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState([]);

  // Fetch latitude & longitude from Nominatim API
  const searchLocation = async () => {
    if (!query) return;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: query,
            format: "json",
            limit: 5, // Get up to 5 results
          },
        },

      );
      alert("hello")
      setLocations(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <div>
      <h2>Search Location</h2>
      <input
        type="text"
        placeholder="Enter location name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchLocation}>Search</button>

      {locations.length > 0 && (
        <ul>
          {locations.map((loc, index) => (
            <li key={index} onClick={() => onSelectLocation(loc)}>
              {loc.display_name} (Lat: {loc.lat}, Lon: {loc.lon})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
