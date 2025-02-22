import React from "react";
import EventCard from "./EventCard";

function RandomEvents() {
  return (
    <div>
      <div className=" flex flex-row justify-between items-center p-4">
        <h1 className=" text-white my-3">Upcomming Events</h1>
        <input
          type="text"
          className=" font-normal text-white p-[6px] px-4 rounded-lg bg-gray-600 w-[25%]"
          placeholder="artist name"
        />
      </div>
      <div className=" grid md:grid-cols-4 gap-4 p-4">
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
}

export default RandomEvents;
