import React from "react";
import EventCard from "./EventCard";

function RandomEvents() {
  return (
    <div>
      <h1 className=" text-white my-3">Upcomming Events</h1>
      <div className=" grid md:grid-cols-4 gap-4 p-4">
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
}

export default RandomEvents;
