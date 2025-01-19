import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create a custom API client
const createAPIClient = (baseURL) => {
  return axios.create({
    baseURL: `${baseURL}/v1/`,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
};

// UserProfile Component
const UserProfile = ({ userData }) => (
  <div className="bg-neutral-800 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6">
    <div className="flex items-center gap-4">
      <span className="text-blue-400 text-6xl">👤</span>
      <h2 className="text-white text-3xl font-bold">User Profile</h2>
    </div>
    <div className="text-gray-300 text-lg">
      <p><strong className="text-white">Name:</strong> {userData.name}</p>
      <p><strong className="text-white">Age:</strong> {userData.age}</p>
      <p><strong className="text-white">Gender:</strong> {userData.gender}</p>
      <p><strong className="text-white">Occupation:</strong> {userData.occupation}</p>
    </div>
  </div>
);

// Activities Component
const Activities = ({ pastParticipated, pastVolunteered }) => (
  <div className="bg-neutral-800 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6">
    <div className="flex items-center gap-4">
      <span className="text-green-400 text-6xl">🏅</span>
      <h2 className="text-white text-3xl font-bold">Activities</h2>
    </div>
    <div className="text-gray-300 text-lg">
      <ActivitySection 
        title="Past Participation" 
        items={pastParticipated} 
      />
      <ActivitySection 
        title="Past Volunteering" 
        items={pastVolunteered} 
        className="mt-4"
      />
    </div>
  </div>
);

const ActivitySection = ({ title, items, className = "" }) => (
  <div className={className}>
    <p className="text-xl text-blue-400 font-semibold">{title}:</p>
    {items?.length > 0 ? (
      <ul className="list-disc list-inside ml-4">
        {items.map((item, index) => (
          <li key={index} className="text-lg">{item}</li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-400">No {title.toLowerCase()} yet.</p>
    )}
  </div>
);

// UpcomingEvents Component
const UpcomingEvents = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || '/api';
  const apiClient = createAPIClient(API_URL);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get('events/getUpcomingEvents');
        setEvents(response.data.data);
      } catch (error) {
        setError('Failed to fetch events');
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const participateEvent = async (eventId) => {
    try {
      await apiClient.post('users/participate-Event', { eventId });
      // Instead of page reload, update the state
      setEvents(events.map(event => 
        event._id === eventId 
          ? { ...event, isParticipating: true }
          : event
      ));
    } catch (error) {
      console.error("Error Participating", error);
      // Handle error appropriately
    }
  };

  if (loading) return <div className="text-white text-center">Loading events...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="w-full p-6 rounded-xl shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 drop-shadow-2xl overflow-y-auto">
      <h5 className="text-3xl font-semibold text-white mb-6">Upcoming Events</h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard 
            key={event._id} 
            event={event}
            onParticipate={participateEvent}
          />
        ))}
      </div>
    </div>
  );
};

const EventCard = ({ event, onParticipate }) => (
  <div className="p-4 rounded-lg bg-gray-700 shadow-md hover:shadow-xl transition-all duration-200">
    <div className="flex flex-col items-start">
      <div className="text-white mt-2">
        <p className="text-xl text-red-300 font-bold">{event.name}</p>
        <br />
        <p className="text-xl font-semibold">{event.description}</p>
        <p className="text-sm text-gray-400">{event.eventDate}</p>
      </div>
      <button 
        onClick={() => onParticipate(event._id)} 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Participate
      </button>
    </div>
  </div>
);

// Home Component
const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const API_URL = import.meta.env.VITE_API_URL || '/api';
  const apiClient = createAPIClient(API_URL);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get("users/current-user");
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        setError("Failed to load user data");
        navigate("/auth/user-login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!userData) return null;

  return (
    <div className="w-full h-screen flex flex-col items-center gap-8 overflow-y-auto pt-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-5xl font-extrabold text-white mb-8">
        Welcome, <span className="text-blue-500">{userData.name}</span>!
      </h1>

      <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
        <UserProfile userData={userData} />
        <Activities 
          pastParticipated={userData.past_Participated}
          pastVolunteered={userData.past_Volunteered}
        />
      </div>

      <div className="w-full mt-8">
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default Home;