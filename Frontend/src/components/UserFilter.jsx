import React, { useState } from "react";

function UserFilter() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);

  const handleFetch = async () => {
    try {
      const response = await fetch(
        `https://api.example.com/data?date=${date}&location=${location}`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full justify-center items-center p-4 rounded-lg">
      <h1>Search Events</h1>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-white">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border text-white border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-white">
            Enter Location
          </label>
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border text-white border-gray-300 rounded-lg p-2"
          />
        </div>
      </div>
      <button
        onClick={handleFetch}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Fetch Data
      </button>
      {data && (
        <pre className="mt-4 p-2 rounded-lg shadow">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default UserFilter;
