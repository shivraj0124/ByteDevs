import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const ManagerDashboard = () => {
  // Updated stats for managers
  const performanceStats = [
    { icon: "💰", label: "Total Revenue", value: "$124,560" },
    { icon: "🎟️", label: "Total Bookings", value: "5,842" },
    { icon: "🎭", label: "Total Shows", value: "87" },
  ];

  const showMetrics = [
    { label: "Upcoming Shows", value: "15", color: "blue" },
    { label: "Total Earnings", value: "$68,200", color: "green" },
    { label: "Venues Managed", value: "12", color: "yellow" },
  ];

  // Data for Revenue Growth (Bar Chart)
  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 15500 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 25000 },
    { month: "Jun", revenue: 30000 },
  ];

  // Data for Show Bookings (Pie Chart)
  const bookingData = [
    { name: "Comedy Clubs", value: 50, color: "#60A5FA" },
    { name: "Theaters", value: 35, color: "#34D399" },
    { name: "Corporate Events", value: 15, color: "#F472B6" },
  ];

  return (
    <div className="flex-grow p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <select className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded p-1 text-gray-300">
            <option>All Venues</option>
            <option>Comedy Clubs</option>
            <option>Theaters</option>
            <option>Corporate Events</option>
          </select>
          <select className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded p-1 text-gray-300">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {performanceStats.map((stat, index) => (
          <div
            key={index}
            className="bg-slate-800/30 backdrop-blur-sm p-4 rounded-lg border border-slate-700/30 flex items-center"
          >
            <div className="mr-4 text-2xl">{stat.icon}</div>
            <div>
              <div className="text-gray-400">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-100">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {showMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-slate-800/30 backdrop-blur-sm p-4 rounded-lg border border-slate-700/30"
          >
            <div className="text-gray-400 mb-2">{metric.label}</div>
            <div className="text-2xl font-bold text-gray-100">
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        {/* Revenue Growth (Bar Chart) */}
        <div className="bg-slate-800/30 backdrop-blur-sm p-4 rounded-lg border border-slate-700/30">
          <h3 className="text-lg font-semibold mb-4 text-gray-100">
            Revenue Growth
          </h3>
          <BarChart width={300} height={200} data={revenueData}>
            <XAxis dataKey="month" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(51, 65, 85, 0.3)",
                borderRadius: "8px",
                color: "#F1F5F9",
              }}
            />
            <Bar dataKey="revenue" fill="#34D399" />
          </BarChart>
        </div>

        {/* Show Bookings Distribution (Pie Chart) */}
        <div className="bg-slate-800/30 backdrop-blur-sm p-4 rounded-lg border border-slate-700/30">
          <h3 className="text-lg font-semibold mb-4 text-gray-100">
            Show Bookings Distribution
          </h3>
          <div className="flex items-center">
            <PieChart width={250} height={250}>
              <Pie
                data={bookingData}
                cx={120}
                cy={120}
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {bookingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(51, 65, 85, 0.3)",
                  borderRadius: "8px",
                  color: "#F1F5F9",
                }}
              />
            </PieChart>
            <div className="text-gray-300">
              {bookingData.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div
                    className="w-4 h-4 mr-2 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
