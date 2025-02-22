import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, CalendarDays, PlusCircle, Users, FileText } from "lucide-react";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      path: "/AdminDashBoard_Lay",
      icon: <Home className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      path: "AdminTable",
      icon: <CalendarDays className="w-5 h-5" />,
      label: "Manage Events",
    },
    {
      path: "AdminVenue",
      icon: <PlusCircle className="w-5 h-5" />,
      label: "Add Venue",
    },
    // {
    //   path: "/admin-users",
    //   icon: <Users className="w-5 h-5" />,
    //   label: "Manage Users",
    // },
    // {
    //   path: "/admin-reports",
    //   icon: <FileText className="w-5 h-5" />,
    //   label: "Reports",
    // },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800/30 backdrop-blur-sm border-r border-slate-700/30 h-screen p-4">
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
      </div>
    </div>
  );
};

export default AdminSidebar;
