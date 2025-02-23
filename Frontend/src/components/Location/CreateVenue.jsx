import { useState } from "react";
import LocationSelector from "./LocationSelector";
import axios from "axios";
import myHook from "../Contexts/Context"
import "leaflet/dist/leaflet.css";

const CreateVenue = () => {
  const [venueName, setVenueName] = useState("");
  const [location, setLocation] = useState(null);
  const { locationDetails,setLocationDetails}=myHook()
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("locationDetails",locationDetails)
    

    const venueData = {
      name: venueName,
      latitude: locationDetails?.lat,
      longitude: locationDetails?.lon,
      capacity:100,
      images:[''],
      state:locationDetails?.address?.state ? locationDetails?.address?.state:"",
      city:locationDetails?.address?.city ? locationDetails?.address?.city:"",
      displayName:locationDetails?.display_name ? locationDetails?.display_name :"",
      managerId:'67b9890da86003b37d574b75',
      };
    console.log(venueData)

    try {
      const response = await axios.post("http://localhost:5000/api/manager/create", venueData);
      alert("Venue created successfully!");
      console.log(response)
    } catch (error) {
      console.error("Error creating venue:", error);
      alert("Failed to create venue.");
    }
  };

  return (
    <div>
      <h2>Create Venue</h2>
      <form onSubmit={handleSubmit}>
        <label>Venue Name:</label>
        <input
          type="text"
          value={venueName}
          onChange={(e) => setVenueName(e.target.value)}
          required
        />
        <div className="p-4 bg-red-500 mt-10">
        <h3>Select Location:</h3>
        <LocationSelector onLocationSelect={setLocation} />

        {location && (
          <p>
            Selected Location: {location.latitude}, {location.longitude}
          </p>
        )}
        </div>

        <button type="submit" className="bg-blue-600 p-2  absolute left-0 top-0">Create Venue</button>
      </form>
    </div>
  );
};

export default CreateVenue;
