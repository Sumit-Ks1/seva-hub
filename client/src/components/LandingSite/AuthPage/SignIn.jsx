import { Input } from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { verifysession } from "../../../utils/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Dashboards/Common/Loader";
import axios from "axios";
// import { UserContext } from "../../contexts/UserContext";
// import { useContext } from "react";

export default function SignIn() {
  // const { user, setUser } = useContext(UserContext);
  let navigate = useNavigate();
  const [error, setError] = useState("");

  // if (localStorage.getItem("token")) {
  //   verifysession();
  // }

  let login = async (event) => {
    event.preventDefault();
    setLoader(true);
    let data = {
      email: email,
      password: pass,
    };
    const API_URL = import.meta.env.VITE_API_URL || '/api';

    const axiosInstance = axios.create({
      baseURL: `${API_URL}/v1/`,
      withCredentials: true,
    });
    axiosInstance
      .post("users/login", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        // setUser(response.data.data.user);
        // localStorage.setItem("token", response.data.data.token);
        // localStorage.setItem("student", JSON.stringify(response.data.data.user));
        // console.log("response.data.data.user", response.data.data.user);
        // console.log("response.data.data.token", response.data.data.token);
        console.log("Respone -", response);

        navigate("/student-dashboard");
      })
      .catch((error) => {
        const statusCode = error.response.status;
        let errorMessage = error.response.data.message;

        if (statusCode == 401) {
          // Empty field
          setError("Invalid credentials");
        } else if (statusCode == 404) {
          // User already exist
          setError("User Does not Exist");
        }
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

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loader, setLoader] = useState(false);

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changePass = (event) => {
    setPass(event.target.value);
  };

  const iemail = {
    name: "email",
    type: "email",
    placeholder: "abc@gmail.com",
    req: true,
    onChange: changeEmail,
  };
  const password = {
    name: "password",
    type: "password",
    placeholder: "••••••••",
    req: true,
    onChange: changePass,
  };

  return (
    <div className="border border-gray-300 p-4 shadow-spread-white w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 ">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={login}>
          <Input field={iemail} />
          <Input field={password} />
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
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
            className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
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
            Don't have an account yet?{" "}
            <Link
              to="/auth/user-signup"
              className="font-medium hover:underline text-blue-500"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
