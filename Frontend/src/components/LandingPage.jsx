import React from "react";
import Navbar from "./Navbar";
import UserFilter from "./UserFilter";
import EventCard from "./EventCard";
import RandomEvents from "./RandomEvents";

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

      <div className=" h-screen w-screen flex flex-col justify-center items-center">
        <UserFilter />
      </div>

      <div className=" h-screen w-screen flex flex-col justify-center items-center">
        <RandomEvents />
      </div>
    </div>
  );
}

export default LandingPage;
