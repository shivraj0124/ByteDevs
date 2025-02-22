import React, { useState } from "react";

const staticData = [
  { name: "Sale", id: 12, type: "Push", status: "Accepted", channel: "android" },
  { name: "Sale2", id: 123, type: "Inapp", status: "Rejected", channel: "iOS" },
  { name: "Sale34", id: 45, type: "Email", status: "Accepted", channel: "android" },
  { name: "Discount", id: 67, type: "Push", status: "Rejected", channel: "android" },
  { name: "Promo", id: 89, type: "Email", status: "Accepted", channel: "web" },
];

const CampaignTable = () => {
  const [data, setData] = useState(staticData);
  const [filter, setFilter] = useState("All");

  const filterData = (status) => {
    setFilter(status);
  };

  const toggleStatus = (id) => {
    setData((prevData) =>
      prevData.map((campaign) =>
        campaign.id === id
          ? { ...campaign, status: campaign.status === "Accepted" ? "Rejected" : "Accepted" }
          : campaign
      )
    );
  };

  const filteredData =
    filter === "All" ? data : data.filter((campaign) => campaign.status === filter);

  return (
    <div className="p-6 bg-black min-h-screen text-white">
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
            filter === "Rejected" ? "bg-red-700" : "bg-red-600 hover:bg-red-700"
          }`}
          onClick={() => filterData("Rejected")}
        >
          Rejected
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-900 text-white text-md">
              <th className="p-4 text-left">Campaign Name</th>
              <th className="p-4 text-left">Campaign Id</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Channel</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((campaign, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600 transition duration-200`}
              >
                <td className="p-4 font-medium">{campaign.name}</td>
                <td className="p-4">{campaign.id}</td>
                <td className="p-4">{campaign.type}</td>
                <td
                  className={`p-4 font-semibold ${
                    campaign.status === "Rejected" ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {campaign.status}
                </td>
                <td className="p-4">{campaign.channel}</td>
                <td className="p-4 text-center">
                  <button
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                      campaign.status === "Rejected"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                    onClick={() => toggleStatus(campaign.id)}
                  >
                    {campaign.status === "Rejected" ? "Accept" : "Reject"}
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-400">
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

export default CampaignTable;
