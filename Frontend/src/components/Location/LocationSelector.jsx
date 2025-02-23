
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import axios from "axios";
import myHook from "../Contexts/Context"
import "leaflet/dist/leaflet.css";

const LocationSelector = ({ onSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [latLon,setLatLon] = useState()
  const {setLocationDetails}=myHook()
  // Function to handle map click
  const LocationMarker = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setSelectedLocation({ lat, lng });

        try {
          // Fetch detailed address using Nominatim Reverse Geocoding API
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
              lat,
              lon: lng,
              format: "json",
            },
          });
          
          const locationDetails = response.data;
          setSelectedLocation({ lat, lng, });
          setLocationDetails(locationDetails);
          setAddress(locationDetails);
          console.log(locationDetails.display_name)
          console.log(locationDetails.address)
          setLatLon({latitude:locationDetails.lat, longitude:locationDetails.lon})
          // onSelect({ lat, lng, address: locationDetails.display_name });
          setLocationDetails(locationDetails)
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      },
    });

    return selectedLocation ? (
      <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
        <Popup>{address || "Fetching address..."}</Popup>
      </Marker>
    ) : null;
  };

  return (
    <MapContainer center={[19.076, 72.8777]} zoom={12} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
};

export default LocationSelector;
