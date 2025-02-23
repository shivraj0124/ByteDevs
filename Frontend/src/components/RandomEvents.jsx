import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import axios from "axios";
function RandomEvents() {
  const [cards, setCards] = useState([]);
  const [query, setQuery] = useState("");
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/Events");
      console.log(response);
      setCards(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEvents2 = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/addSearch",
        {
          name: query,
        }
      );
      console.log(response);
      setCards(response?.data?.events);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="h-max py-5">
      <div className="flex flex-col justify-between items-center p-4">
        <h1 className="text-white my-3 text-3xl">Upcoming Events</h1>
       
       <div className="flex  gap-1">
           <input
            type="text"
            placeholder="Search Artist"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-600 rounded-lg p-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            aria-label="Location input"
          />
          <button
            onClick={() => fetchEvents2(query)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 border border-transparent cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>
      <div className=" grid md:grid-cols-4 gap-4 p-4 py-10">
        {cards?.map((data, index) => {
          return (
            <div key={index}>
              <EventCard data={data} />
            </div>
          );
        })}
        
      </div>
      {
          !cards && <span className="text-center text-white ">
            No Events Found
          </span>
        }
    </div>
  );
}

export default RandomEvents;
