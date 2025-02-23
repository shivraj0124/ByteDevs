import React, { useEffect,useState } from "react";
import axios from 'axios'
const staticData = [
  {
    name: "Sale",
    id: 12,
    type: "Push",
    status: "Accepted",
    channel: "android",
  },
  { name: "Sale2", id: 123, type: "Inapp", status: "Rejected", channel: "iOS" },
  {
    name: "Sale34",
    id: 45,
    type: "Email",
    status: "Accepted",
    channel: "android",
  },
  {
    name: "Discount",
    id: 67,
    type: "Push",
    status: "Rejected",
    channel: "android",
  },
  { name: "Promo", id: 89, type: "Email", status: "Accepted", channel: "web" },
];

const CampaignTable = () => {
  const [data, setData] = useState(staticData);
  const [filter, setFilter] = useState("All");
  const [events, setEvents] = useState();


  const fetchEvents = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5001/api/manager/getEvents/${id}`,{filter:filter});
      setEvents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };
  const filterData = (status) => {
    setFilter(status);
  };
  
  const toggleStatus =async (id) => {
    const response = await axios.put(`http://localhost:5001/api/manager/toggleApproval/${id}`,{filter:filter});
    fetchEvents(localStorage.getItem("userId"));
  };

  useEffect(() => {
      fetchEvents(localStorage.getItem("userId"));
    },[filter])
    function formatDate(inputDate) {
      const date = new Date(inputDate);
      const year = date.getFullYear();
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  
      return `${year}-${day}-${month}`;
    } // Ou
  // const fetchDetails =async()
  return (
    <div className="p-6  min-h-screen text-white">
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
            filter === "Accepted"
              ? "bg-green-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
          onClick={() => filterData("Accepted")}
        >
          Accepted
        </button>
        <button
          className={`px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 ${
            filter === "Rejected" ? "bg-red-700" : "bg-red-600 hover:bg-red-700"
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
              <th className="p-4 text-left">Sr. No.</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Images</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Comedian</th>
              <th className="p-4 text-left">Venue</th>
              <th className="p-4 text-left">AvailableTickets</th>
              <th className="p-4 text-left">Actions</th>
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
                <td className="p-4">{campaign?.description}</td>
               
                <td className="p-4">{campaign?.comedian?.name}</td>
                <td className="p-4">{campaign?.venue?.name}</td>
                <td className="p-4">{campaign?.availableTickets}</td>
                <td className="p-4 text-center">
                  <button
                    className={`cursor-pointer px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                      campaign.isApproved === false
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                    onClick={() => toggleStatus(campaign._id)}
                  >
                    {campaign.isApproved === false ? "Accept" : "Reject"}
                  </button>
                </td>
              </tr>
            ))}
            {events?.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-400">
                  No Events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignTable;
