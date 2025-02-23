import React, { useEffect,useState } from "react";
import axios from "axios";
const staticData = [
  { name: "Sale", status: "Accepted", channel: "android" },
  { name: "Sale2", status: "Rejected", channel: "iOS" },
  { name: "Sale34", status: "Accepted", channel: "android" },
  { name: "Discount", status: "Rejected", channel: "android" },
  { name: "Promo", status: "Accepted", channel: "web" },
];

const ComedianTable = () => {
  const [filter, setFilter] = useState("All");
  const [events, setEvents] = useState();

  const fetchVenues = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5001/api/artist/myEvents/${id}`,{filter:filter});
      setEvents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };
  const filterData = (status) => {
    setFilter(status);
    console.log(filter)
  };


  useEffect(() => {
    fetchVenues(localStorage.getItem("userId"));
  },[filter])
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based

    return `${year}-${day}-${month}`;
  } // Output: 2025-22-02

  return (
    <div className="p-6 min-h-screen text-white">
      <div className="mb-6 flex space-x-4 mt-2">
        <button
          className={`px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 ${
            filter === "All" ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={() => filterData("All")}
        >
          All
        </button>
        <button
          className={`px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 ${
            filter === "Accepted" ? "bg-green-700" : "bg-green-600 hover:bg-green-700"
          }`}
          onClick={() => filterData("Accepted")}
        >
          Accepted
        </button>
        <button
          className={`px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 ${
            filter === "Not Accepted" ? "bg-red-700" : "bg-red-600 hover:bg-red-700"
          }`}
          onClick={() => filterData("Not Accepted")}
        >
          Not Accepted
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-900 text-white text-md">
              <th className="p-4 text-left">Sr. No</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Venue</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {events?.map((campaign, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600 transition duration-200 text-left`}
              >
                <td className="p-4 font-medium">{index+1}</td>
                <td className="p-4 font-medium">{campaign.title}</td>
                <td className="p-4 font-medium"><img className="h-[40px] w-[40px]" src={campaign.images}/></td>
                <td className="p-4 font-medium">{campaign.description}</td>
                <td className="p-4 font-medium">{formatDate(campaign.date)}</td>
                <td className="p-4 font-medium">{campaign.venue.name}</td>
                <td
                  className={`p-4 font-semibold ${
                    campaign.isApproved === false ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {campaign.isApproved === false ? 'Not Accepted' : 'Accepted'}
                </td>
              </tr>
            ))}
            {events?.length === 0 && (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-400">
                  No campaigns found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComedianTable;
