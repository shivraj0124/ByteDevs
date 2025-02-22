import React, { useState, useEffect } from "react";

const AdminTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        const response = await fetch("/api/events"); // Update with actual API
        const result = await response.json();
        setData(result || []); // Ensure it's an array
        setFilteredData(result || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
        setFilteredData([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!Array.isArray(data)) {
      setFilteredData([]);
      return;
    }

    setFilteredData(
      data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  return (
    <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/30">
      <h3 className="text-lg font-semibold mb-4 text-gray-100">Manage Events</h3>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-3 pr-4 py-2 mb-4 w-full bg-slate-700 text-gray-200 placeholder-gray-400 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-700 text-gray-300">
              <th className="p-2">Event Name</th>
              <th className="p-2">Date</th>
              <th className="p-2">Venue</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredData) && filteredData.length > 0 ? (
              filteredData.map((event, index) => (
                <tr key={index} className="border-b border-slate-600">
                  <td className="p-2 text-gray-100">{event.name}</td>
                  <td className="p-2 text-gray-100">{event.date}</td>
                  <td className="p-2 text-gray-100">{event.venue}</td>
                  <td className="p-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg ml-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-400">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
