import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "./Input";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from "react-toastify";

function AddEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [organizedBy, setOrganizedBy] = useState("");
  const [loader, setLoader] = useState(false);
  const [responsedata, setResponsedata] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      const API_URL = import.meta.env.VITE_API_URL || '/api';

      const axiosInstance = axios.create({
        baseURL: `${API_URL}/v1/`,
        withCredentials: true,
      });
      axiosInstance
        .get("organisation/current-org", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          setResponsedata(response.data.data);
          setOrganizedBy(response.data.data.name);
        })
        .catch((error) => {
          console.log("Error in not getting cookiee");
          console.log(error);
          navigate("/auth/ngo-login");
        });
    };
  }, []);

  const addEvent = async (event) => {
    event.preventDefault();
    setLoader(true);
    const data = {
      name,
      organizedBy,
      description,
      date,
      location,
      time,
    };
    const axiosInstance = axios.create({
      baseURL: "http://localhost:8000/api/v1/",
      withCredentials: true,
    });

    axiosInstance
      .post("http://localhost:8000/api/v1/organisation/add-event", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.success("Event published successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/admin-dashboard");
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-full mt-12 bg-gray-900 p-4">
      <div className="w-full max-w-lg bg-gray-800 border-gray-700 rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-white text-center">
          Add a New Event
        </h1>
        <form className="space-y-4" onSubmit={addEvent}>
          <Input
            field={{
              name: "name",
              placeholder: "Enter event name",
              req: true,
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value),
            }}
          />
          <Input
            field={{
              name: "description",
              placeholder: "Enter event description",
              req: true,
              type: "text",
              value: description,
              onChange: (e) => setDescription(e.target.value),
            }}
          />
          <Input
            field={{
              name: "date",
              placeholder: "Select event date",
              req: true,
              type: "date",
              value: date,
              onChange: (e) => setDate(e.target.value),
            }}
          />
          <Input
            field={{
              name: "time",
              placeholder: "Select event time",
              req: true,
              type: "time",
              value: time,
              onChange: (e) => setTime(e.target.value),
            }}
          />
          <Input
            field={{
              name: "location",
              placeholder: "Enter event location",
              req: true,
              type: "text",
              value: location,
              onChange: (e) => setLocation(e.target.value),
            }}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 transition duration-200"
            disabled={loader}
          >
            {loader ? (
              <div className="flex justify-center items-center">
                <Loader /> Verifying...
              </div>
            ) : (
              <span>Add Event</span>
            )}
          </button>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}

export default AddEvent;
