import React from "react";
import ComedianSidebar from "./ComedianSideBar"
import { Outlet, useNavigate } from "react-router-dom";
import {
  Home,
  CalendarDays,
  PlusCircle,
  Menu,
  User,
  Bell,
  Search,
} from "lucide-react";

const DashBoard = () => {
  const Navbar = () => {
    return (
      <nav className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 text-gray-200" />
            <h1 className="text-xl font-bold text-gray-100">Comedy Central</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Bell className="w-6 h-6 text-gray-200 cursor-pointer" />
            <User className="w-6 h-6 text-gray-200 cursor-pointer" />
          </div>
        </div>
      </nav>
    );
  };
  const navigate = useNavigate();

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
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-tr dark:from-[#121e26] dark:via-[#12100E] dark:to-[#113853] from-[#c6deef] via-[#e8e8ec] to-[#a9d0eb]"></div>
      <div className="relative z-10">
        <Navbar />
        <div className="flex">
          {/* Sidebar */}
          {/* <div className="w-64 b    g-slate-800/30 backdrop-blur-sm border-r border-slate-700/30 h-screen p-4">
                <nav>
                {menuItems.map((item, index) => (
                    <div
                    key={index}
                    className="flex items-center p-2 hover:bg-slate-700/30 rounded cursor-pointer text-gray-300 hover:text-white"
                    onClick={() => navigate(item.path)}
                    >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                    </div>
                ))}
                </nav>
            </div> */}
          <ComedianSidebar />
          <div className="flex-grow p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
