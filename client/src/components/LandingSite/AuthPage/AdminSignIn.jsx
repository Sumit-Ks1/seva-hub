import { Input } from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Dashboards/Common/Loader";
import axios from "axios";

export default function AdminSignIn() {
  let navigate = useNavigate();

  let login = async (event) => {
    event.preventDefault();
    setLoader(true);
    let data = {
      email: inputEmail,
      password: pass,
    };
    const API_URL = import.meta.env.VITE_API_URL || '/api';

    const axiosInstance = axios.create({
      baseURL: `${API_URL}/v1/`,
      withCredentials: true,
    });
    axiosInstance
      .post("organisation/login", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        // console.log("response", response);
        // setUser(response.data.data.user);
        // localStorage.setItem("token", response.data.data.accessToken);
        // localStorage.setItem("admin", JSON.stringify(response.data.data.organisation));
        // console.log("response.data.data.user", response.data.data.user);
        // console.log("response.data.data.token", response.data.data.token);

        navigate("/admin-dashboard");
      })
      .catch((error) => {
        console.log("error", error);
        const statusCode = error.response.status;
        let errorMessage = error.response.data.message;

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
      });
    setLoader(false);
  };

  const [loader, setLoader] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [pass, setPass] = useState("");

  const changeEmail = (event) => {
    setInputEmail(event.target.value);
  };
  const changePass = (event) => {
    setPass(event.target.value);
  };

  const email = {
    name: "email",
    type: "email",
    placeholder: "abc@email.com",
    req: true,
    value: inputEmail,
    onChange: changeEmail,
  };
  const password = {
    name: "password",
    type: "password",
    placeholder: "••••••••",
    req: true,
    onChange: changePass,
    value: pass,
  };

  return (
    <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 align-middle">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          Organisation Sign-In
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={login}>
          <Input field={email} />
          <Input field={password} />
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-300">
                  Remember me
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white hover:bg-blue-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-700 focus:ring-blue-800"
          >
            {loader ? (
              <>
                <Loader /> Verifying...
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <p className="text-sm font-light text-gray-400">
            You&apos;re not registered ?{" "}
            <Link
              to="/auth/ngo-signup"
              className="font-medium hover:underline text-blue-500"
            >
              Register Here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
