import React from "react";

function Navbar() {
  return (
    <div className=" h-[8vh] flex flex-row justify-between items-center px-10">
      <div className=" text-white">
        <h1>LOGO</h1>
      </div>
      <div className="text-white">
        <ul className="flex flex-row space-x-5">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
