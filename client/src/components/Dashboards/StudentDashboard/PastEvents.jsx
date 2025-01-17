import React, { useState, useEffect } from "react";
import axios from "axios";

const PastEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    return () => {
      const API_URL = import.meta.env.VITE_API_URL || '/api';

      const axiosInstance = axios.create({
        baseURL: `${API_URL}/v1/`,
        withCredentials: true,
      });
      // let name;
      axiosInstance
        .get("users/past-Event")
        .then((response) => {
          setEvents(response.data.data);
        });
    };
  }, []);

  const EventCard = ({ event }) => (
    <div
      className="bg-gradient-to-tr from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg transition-all duration-300 transform hover:shadow-2xl hover:scale-105"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <h3 className="text-2xl font-extrabold text-blue-400">{event.name}</h3>
      <p className="text-sm text-gray-400 mt-2">{event.date}</p>
      <p className="text-gray-300 mt-4 text-sm">{event.description}</p>
      {/* <p className="text-blue-500 mt-6 italic text-sm">
        By: {event.organization}
      </p> */}
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-white text-center mb-10">
          Past Events
        </h1>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          onMouseMove={(e) => {
            const cards = document.querySelectorAll(".hover:scale-105");
            cards.forEach((card) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              card.style.transform = `rotateY(${x / 50}deg) rotateX(${-y / 50}deg)`;
            });
          }}
        >
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastEvents;