import React from "react";
import { useNavigate } from "react-router-dom";
import ComedianSidebar from "./ComedianSideBar";
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
import {
  Home,
  CalendarDays,
  PlusCircle,
  Menu,
  User,
  Bell,
  Search,
} from "lucide-react";
const ComedianMain = () => {
  const performanceStats = [
    { icon: "🎭", label: "Total Shows", value: 124 },
    { icon: "👥", label: "Total Audience", value: 15842 },
    { icon: "⭐", label: "Average Rating", value: "4.8/5" },
  ];

  const showMetrics = [
    { label: "Shows This Month", value: "12/15", color: "green" },
    { label: "Upcoming Shows", value: "8", color: "blue" },
    { label: "New Material (mins)", value: "45", color: "yellow" },
  ];

  const genreData = [
    { category: "Observational", percentage: 35, color: "#60A5FA" },
    { category: "Political", percentage: 20, color: "#34D399" },
    { category: "Dark Humor", percentage: 25, color: "#F472B6" },
    { category: "Improv", percentage: 20, color: "#FBBF24" },
  ];

  const audienceData = [
    { name: "18-25", value: 30, color: "#60A5FA" },
    { name: "26-35", value: 45, color: "#34D399" },
    { name: "36+", value: 25, color: "#F472B6" },
  ];
  return (
    <div className="flex-grow p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <select className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded p-1 text-gray-300">
            <option>All Venues</option>
            <option>Comedy Clubs</option>
            <option>Theaters</option>
          </select>
          <select className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded p-1 text-gray-300">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Yearly</option>
          </select>
        </div>
        <div className="flex items-center space-x-2"></div>
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
        {/* Comedy Genre Distribution */}
        <div className="bg-slate-800/30 backdrop-blur-sm p-4 rounded-lg border border-slate-700/30">
          <h3 className="text-lg font-semibold mb-4 text-gray-100">
            Comedy Genre Distribution
          </h3>
          <div className="flex items-center">
            <BarChart width={300} height={200} data={genreData}>
              <XAxis dataKey="category" stroke="#94A3B8" />
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
              <Bar dataKey="percentage">
                {genreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
            <div className="text-gray-300">
              {genreData.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div
                    className="w-4 h-4 mr-2 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>
                    {item.category}: {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audience Demographics */}
        <div className="bg-slate-800/30 backdrop-blur-sm p-4 rounded-lg border border-slate-700/30">
          <h3 className="text-lg font-semibold mb-4 text-gray-100">
            Audience Demographics
          </h3>
          <div className="flex items-center">
            <PieChart width={250} height={250}>
              <Pie
                data={audienceData}
                cx={120}
                cy={120}
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {audienceData.map((entry, index) => (
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
              {audienceData.map((item, index) => (
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

export default ComedianMain;
