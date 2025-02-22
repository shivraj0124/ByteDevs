import React from "react";
import Navbar from "./Navbar";
import UserFilter from "./UserFilter";

function LandingPage() {
  return (
    <div>
      <div className=" h-screen w-screen flex flex-col justify-center items-center">
        <div className=" w-screen">
          <h1 className=" text-white">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </h1>
        </div>
      </div>

      <div className=" w-full flex justify-between items-center">
        <UserFilter />
      </div>

      <div></div>
    </div>
  );
}

export default LandingPage;
