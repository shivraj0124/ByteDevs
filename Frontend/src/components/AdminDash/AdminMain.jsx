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
  Legend
} from "recharts";

const AdminDashboard = () => {
  const stats = [
    { icon: "🎭", label: "Total Comedians", value: 320 },
    { icon: "📅", label: "Total Shows", value: 1254 },
    { icon: "👥", label: "Total Users", value: 45218 },
    { icon: "💰", label: "Total Revenue", value: "$1.2M" },
  ];

  const earningsData = [
    { month: "Jan", earnings: 12000 },
    { month: "Feb", earnings: 15000 },
    { month: "Mar", earnings: 18000 },
    { month: "Apr", earnings: 20000 },
  ];

  const userDemographics = [
    { ageGroup: "18-25", value: 40, color: "#60A5FA" },
    { ageGroup: "26-35", value: 35, color: "#34D399" },
    { ageGroup: "36+", value: 25, color: "#F472B6" },
  ];

  const mostRatedComedians = [
    { name: "John Doe", rating: 4.9 },
    { name: "Jane Smith", rating: 4.8 },
    { name: "Tom Hardy", rating: 4.7 },
    { name: "Emma Watson", rating: 4.6 },
  ];

  return (
    <div className="flex-grow p-4">
      {/* Performance Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/30 flex items-center"
          >
            <div className="mr-4 text-2xl">{stat.icon}</div>
            <div>
              <div className="text-gray-400">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-100">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-4">
        {/* Earnings Trends */}
        <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/30">
          <h3 className="text-lg font-semibold mb-4 text-gray-100">Earnings Trends</h3>
          <BarChart width={300} height={200} data={earningsData}>
            <XAxis dataKey="month" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip contentStyle={{ backgroundColor: "rgba(30, 41, 59, 0.8)" }} />
            <Bar dataKey="earnings" fill="#60A5FA" />
          </BarChart>
        </div>

        {/* User Demographics */}
        <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/30">
          <h3 className="text-lg font-semibold mb-4 text-gray-100">User Demographics</h3>
          <PieChart width={250} height={250}>
            <Pie
              data={userDemographics}
              cx={130}
              cy={115}
              innerRadius={60}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {userDemographics.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "rgba(30, 41, 59, 0.8)" }} />
            <Legend />
          </PieChart>
        </div>

        {/* Most Rated Comedians */}
        <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/30">
          <h3 className="text-lg font-semibold mb-4  text-gray-100">Most Rated Comedians</h3>
          <BarChart width={300} height={200} data={mostRatedComedians}>
            <XAxis dataKey="name" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" domain={[4.5, 4]} />
            <Tooltip contentStyle={{ backgroundColor: "rgba(30, 41, 59, 0.8)" }} />
            <Legend />
            <Bar className="mt-5 text-left" dataKey="rating" fill="#FBBF24" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
