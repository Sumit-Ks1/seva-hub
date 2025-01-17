import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../Common/Loader";
import axios from "axios";

const Invoices = () => {
  // const [loading, setLoading] = useState(false);
  // const [events, setEvents] = useState([{}]);
  // useEffect(() => {
  //   return () => {
  //     axios
  //       .get("http://localhost:8000/api/v1/events/getUpcomingEvents")
  //       .then((response) => {
  //         setEvents(response.data.data);
  //       });
  //   };
  // }, []);
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
        .get("organisation/upcoming-events")
        .then((response) => {
          setEvents(response.data.data);
        });
    };
  }, []);
  return (
    <div className="w-full  p-6 rounded-xl shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 drop-shadow-2xl overflow-y-auto">
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        Upcoming Events
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gray-700 shadow-md hover:shadow-xl transition-all duration-200"
          >
            <div className="flex flex-col items-start">
              <div className="text-white mt-2">
                <p className="text-xl text-red-300 font-bold">{event.name}</p>
                <br />
                <p className="text-xl font-semibold">{event.description}</p>
                <p className="text-sm text-gray-400">{event.eventDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  };
function Suggestions() {
  // const [events, setEvents] = useState([]);
  // useEffect(() => {
  //   return () => {
  //     axios
  //       .get("http://localhost:8000/api/v1/organisation/getAll-events")
  //       .then((response) => {
  //         setEvents(response.data.data);
  //       });
  //   };
  // }, []);
  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <h1 className="text-white font-bold text-5xl">All Events</h1>
      {/* <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl sm:w-[50%] sm:min-w-[450px] w-full mt-5 max-h-96 overflow-auto">
        <span className="text-white font-bold text-xl">All Students</span>
        <ul role="list" className="divide-y divide-gray-700 text-white">
          {suggestions.length === 0
            ? "No Students Suggestion Found"
            : suggestions.map((suggestion) => (
              <>
                {showModal && (
                  <Modal closeModal={toggleModal} suggestion={modalData} />
                )}
                <li
                  className="py-3 px-5 rounded sm:py-4 hover:bg-neutral-700 hover:shadow-xl hover:scale-105  transition-all cursor-pointer"
                  key={suggestion._id}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 hover:scale-125 hover:text-yellow-500 transition-all"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-white">
                        {suggestion.title}
                      </p>
                      <p className="text-sm truncate text-gray-400">
                        {suggestion.description}
                      </p>
                      <button
                        className="text-blue-500 text-sm underline"
                        onClick={() => toggleModal(suggestion)}
                      >
                        Read more
                      </button>
                    </div>
                    <button className="group/show relative z-0"
                      onClick={() => updateSuggestion(suggestion._id)}
                    >
                      {
                        loader ? 
                          <Loader />:
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                            className="w-6 h-6 hover:text-green-600 hover:scale-125 transition-all"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                        />
                      </svg>
                      }
                      <span className="text-sm hidden absolute px-2 -right-10 top-6 bg-black text-center group-hover/show:block rounded">
                        Acknowledge.
                      </span>
                    </button>
                  </div>
                </li>
              </>
              ))}
        </ul>
      </div> */}
      <div className="w-full mt-8">
        <AllEvents />
      </div>
    </div>
  );
}

export default Invoices;
