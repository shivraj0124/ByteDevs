import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="relative ">
      <div className="absolute inset-0 bg-gradient-to-tr dark:from-[#121e26] dark:via-[#12100E] dark:to-[#113853] from-[#c6deef] via-[#e8e8ec] to-[#a9d0eb]  "></div>
      <div className="relative z-10">
        <div className=" w-full">
          <Navbar />
        </div>
        <div className=" h-full w-full grid grid-cols-1 sm:grid-cols-[80px_auto]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
