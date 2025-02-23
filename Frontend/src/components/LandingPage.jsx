import React from "react";
import Navbar from "./Navbar";
import UserFilter from "./UserFilter";
import EventCard from "./EventCard";
import RandomEvents from "./RandomEvents";
import NearbyVenuesSearch from "./Location/NearByVenues";
import Footer from "./Footer";
function LandingPage() {
  return (
    <div className="w-[100%]">
      <div className=" h-screen w-screen flex flex-col justify-center items-center">
        <div className=" w-screen flex flex-col justify-center items-center">
          <h1 className=" text-white text-3xl"> Book Your Laughs Now! 😂</h1>
          <h1 className=" text-white text-lg w-[50%]">
            Find and book the best comedy shows in town. From stand-up legends
            to rising stars, we’ve got your next night of laughter covered!
          </h1>
        </div>
      </div>

      <div className=" w-screen flex flex-col justify-center items-center">
        <NearbyVenuesSearch />
        {/* <UserFilter /> */}
      </div>

      <div className="  w-screen flex flex-col justify-center items-center">
        <RandomEvents />
      </div>
      <div className=" w-screen flex flex-col justify-center items-center">
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
