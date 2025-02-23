import { useState } from "react";
import LocationSelector from "./LocationSelector";
import axios from "axios";
import myHook from "../Contexts/Context";
import "leaflet/dist/leaflet.css";

const CreateVenue = () => {
  const [venueName, setVenueName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState(null);
  const { locationDetails, setLocationDetails } = myHook();
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) return;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "kjhack");

    try {
      const response1 = await axios.post(
        "https://api.cloudinary.com/v1_1/dnxwlb64j/image/upload",
        formData
      );
      console.log(response1.data.secure_url);
      setUploadedImageUrl(response1.data.secure_url);
      const url = response1.data.secure_url;
      console.log("locationDetails", locationDetails);

      const venueData = {
        name: venueName,
        latitude: locationDetails?.lat,
        longitude: locationDetails?.lon,
        capacity: capacity,
        images: url,
        state: locationDetails?.address?.state
          ? locationDetails?.address?.state
          : " ",
        city: locationDetails?.address?.city
          ? locationDetails?.address?.city
          : " ",
        displayName: locationDetails?.display_name
          ? locationDetails?.display_name
          : " ",
        managerId: localStorage.getItem("userId"),
      };
      console.log(venueData);

      const response = await axios.post(
        "http://localhost:5000/api/manager/create",
        venueData
      );
      alert("Venue created successfully!");
      console.log(response);
    } catch (error) {
      console.error("Error creating venue:", error);
      alert("Failed to create venue.");
    }
  };

  return (
    <div className="text-white flex justify-center items-center h-max py-5 min-h-screen inset-0 bg-gradient-to-tr dark:from-[#121e26] dark:via-[#12100E] dark:to-[#113853] from-[#c6deef] via-[#e8e8ec] to-[#a9d0eb]  ">
      <div>
        <h2 className="text-2xl underline pb-8">Create Venue</h2>
        <form
          onSubmit={handleSubmit}
          className="text-white w-[100%] flex flex-col justify-left items-center"
        >
          <div className="flex flex-col w-[100%] justify-left items-left">
            <label>Venue Name</label>
            <input
              type="text"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              placeholder="Venue Name"
              required
              className="border border-gray-600 rounded-lg p-2 bg-gray-800 text-white"
            />
          </div>

          <div className="flex flex-col w-[100%] justify-left items-left">
            <label>Capacity</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Capacity"
              required
              className="border border-gray-600 rounded-lg p-2 bg-gray-800 text-white"
            />
          </div>

          <div className="flex flex-col w-[100%] justify-left items-left">
            <label>Upload Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="border border-gray-600 rounded-lg p-2 bg-gray-800 text-white"
            />
          </div>

          {/* <div className="p-4 bg-red-500 mt-10">
          <span className="p-1 px-4 border" onClick={()=>{
            setOpen(true)
          }}>Select Location</span>
          {/* <LocationSelector onLocationSelect={setLocation} /> 

          {location && (
            <p>
              Selected Location: {location.latitude}, {location.longitude}
            </p>
          )}
        </div> */}

          {/* {open && ( */}
          <div
            className={`flex flex-col p-4 gap-2 w-[100%] justify-center items-center`}
          >
            <h1>Select Your Location</h1>
            <div className="border w-[400px]">
              <LocationSelector onLocationSelect={setLocation} />
            </div>
          </div>

          <button type="submit" className="bg-blue-500 p-2 px-4">
            Create Venue
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateVenue;
