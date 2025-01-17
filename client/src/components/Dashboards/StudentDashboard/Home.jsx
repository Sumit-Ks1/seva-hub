import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// List Component for displaying upcoming events
const UpcomingEvents = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([{}]);
  const API_URL = import.meta.env.VITE_API_URL || '/api';
  useEffect(() => {

    // Change to user controller new
    return () => {
      axios
        .get(`${API_URL}/v1/events/getUpcomingEvents`,{
          headers: { "Content-Type": "application/json" },
          withCredentials: true,})
        .then((response) => {
          setEvents(response.data.data);
          console.log("Events: ", response.data.data[0]);
        });
    };
  }, [navigate]);

  // const PartcipateEvent = (eventId) => {
  //   console.log(eventId)
  //   const axiosInstance = axios.create({
  //     baseURL: "http://localhost:8000/api/v1/",
  //     withCredentials: true,
  //   });
  //   // eventId=eventId.toString();
  //   axiosInstance
  //     .post("http://localhost:8000/api/v1/users/Participate-Event", eventId, {
  //       headers: { "Content-Type": "application/json" },
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // };

  const participateEvent = (eventId) => {
    // upcomin_Voluteered and upcoming_Participated track will be made in User model i.e updation
    // const axiosInstance = axios.create({
    //   baseURL: "http://localhost:8000/api/v1/",
    //   withCredentials: true,
    // });
    const API_URL = import.meta.env.VITE_API_URL || '/api';

    axios
      .post(`${API_URL}/v1/users/participate-Event`, {eventId} ,{
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        // ParticipateEvent(eventId);
        window.location.reload(); // Refresh page to reflect updated status
      })
      .catch((error) => {
        console.error("Error Participating", error);

      });
    
  };

  return (
    <div className="w-full  p-6 rounded-xl shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 drop-shadow-2xl overflow-y-auto">
      <h5 className="text-3xl font-semibold text-white mb-6">
        Upcoming Events
      </h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => {
          return (
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
                <button onClick={() => participateEvent(event._id)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Participate
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Home Page Component
function Home() {
  const [responsedata, setResponsedata] = useState({});
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || '/api';
  useEffect(() => {

    const axiosInstance = axios.create({
    baseURL: `${API_URL}/v1/`,
      withCredentials: true,
    });

    axiosInstance
      .get("users/current-user", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        setResponsedata(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
        navigate("/auth/user-login");
      });
  }, []);

  return (
    <div className="w-full h-screen flex flex-col  items-center gap-8 overflow-y-auto pt-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-5xl font-extrabold text-white mb-8">
        Welcome, <span className="text-blue-500">{responsedata.name}</span>!
      </h1>

      <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
        {/* User Profile Card */}
        <div className="bg-neutral-800 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-blue-400 text-6xl">👤</span>
            <h2 className="text-white text-3xl font-bold">User Profile</h2>
          </div>
          <div className="text-gray-300 text-lg">
            <p>
              <strong className="text-white">Name:</strong> {responsedata.name}
            </p>
            <p>
              <strong className="text-white">Age:</strong> {responsedata.age}
            </p>
            <p>
              <strong className="text-white">Gender:</strong>{" "}
              {responsedata.gender}
            </p>
            <p>
              <strong className="text-white">Occupation:</strong>{" "}
              {responsedata.occupation}
            </p>
          </div>
        </div>

        {/* Activities Card */}
        <div className="bg-neutral-800 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-green-400 text-6xl">🏅</span>
            <h2 className="text-white text-3xl font-bold">Activities</h2>
          </div>
          <div className="text-gray-300 text-lg">
            <div>
              <p className="text-xl text-blue-400 font-semibold">
                Past Participation:
              </p>
              {responsedata.past_Participated?.length > 0 ? (
                <ul className="list-disc list-inside ml-4">
                  {responsedata.past_Participated.map((item, index) => (
                    <li key={index} className="text-lg">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No participation yet.</p>
              )}
            </div>
            <div className="mt-4">
              <p className="text-xl text-blue-400 font-semibold">
                Past Volunteering:
              </p>
              {responsedata.past_Volunteered?.length > 0 ? (
                <ul className="list-disc list-inside ml-4">
                  {responsedata.past_Volunteered.map((item, index) => (
                    <li key={index} className="text-lg">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No volunteering yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="w-full   mt-8">
        <UpcomingEvents />
      </div>
    </div>
  );
}

export default Home;
