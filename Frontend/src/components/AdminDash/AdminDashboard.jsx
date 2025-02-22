import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary"; // Import the error boundary
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
            <h1 className="text-xl font-bold text-gray-100">Admin Panel</h1>
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
 

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-tr dark:from-[#121e26] dark:via-[#12100E] dark:to-[#113853] from-[#c6deef] via-[#e8e8ec] to-[#a9d0eb]"></div>
      <div className="relative z-10">
        <Navbar />
        <div className="flex">
          <AdminSidebar />
          <div className="flex-grow p-4">
         

<ErrorBoundary>
  <Outlet />
</ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
