import React, { useState } from "react";

function UserFilter() {
  const [event, setEvent] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);

  const handleFetch = async () => {
    try {
      // const response = await fetch(`https://api.example.com/data?event=${event}&location=${location}`);
      // const result = await response.json();
      const result = [
        { event: "Comedy Night", location: "New York" }
      
      ];
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-[100%] justify-center items-center p-6 bg-black text-white rounded-lg min-h-screen">
      <h1 className="text-3xl font-bold text-white">Search Events</h1>
      <div className="flex flex-row gap-6 w-full max-w-lg">
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium">Enter Event</label>
          <input
            type="text"
            placeholder="Enter event name"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="border border-gray-500 rounded-lg p-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium">Enter Location</label>
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-500 rounded-lg p-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        onClick={handleFetch}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
      >
        Fetch Data
      </button>
      {data && (
        <div className="mt-6 w-full max-w-2xl bg-gray-900 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Event Results</h2>
          <div className="flex flex-col gap-3">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex justify-between bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                <span className="font-medium">{item.event}</span>
                <span className="text-gray-400">{item.location}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserFilter;
