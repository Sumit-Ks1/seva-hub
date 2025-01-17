import { Input } from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { verifysession } from "../../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Dashboards/Common/Loader";
import axios from "axios";

export default function OrgSignup() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loader, setLoader] = useState(false);

  const [description, setDescription] = useState("");
  const [started_at, setStarted_at] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // if (localStorage.getItem("token")) {
  //     verifysession();
  // }

  let login = async (event) => {
    event.preventDefault();
    setLoader(true);
    let data = {
      email: email,
      password: pass,
      name: name,
      started_at: started_at,
      description: description,
      phone: phone,
    };

    // console.log(data);
    // await axios.get("http://localhost:8000/api/v1/organisation", data, { headers: { 'Content-Type': 'application/json' } })
    //     .then((response) => {
    //         console.log(response);
    //     }).catch((error) => {
    //         console.log("this is chatched error");
    //         console.error(error);
    //     })
    const API_URL = import.meta.env.VITE_API_URL || '/api';

    axios
      .post(`${API_URL}/v1/organisation/register`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("response", response);
        // localStorage.setItem("token", response.data.data.token);
        // localStorage.setItem("admin", JSON.stringify(response.data.data.user));
        setLoader(false);

        navigate("/auth/ngo-login");
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
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changePass = (event) => {
    setPass(event.target.value);
  };
  const changeName = (event) => {
    setName(event.target.value);
  };

  const iemail = {
    name: "email",
    type: "email",
    placeholder: "XYZ@gmail.com",
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
  const iname = {
    name: "name",
    type: "text",
    placeholder: "Devyanshu Negi",
    req: true,
    onChange: changeName,
  };
  const iphone = {
    name: "phone",
    type: "number",
    placeholder: "1234567890",
    req: true,
    onChange: (event) => setPhone(event.target.value),
  };
  const iage = {
    name: "Started at",
    type: "date",
    placeholder: "",
    req: true,
    onChange: (event) => setStarted_at(event.target.value),
  };
  const idescription = {
    name: "description",
    type: "text",
    placeholder: "Description",
    req: true,
    onChange: (event) => setDescription(event.target.value),
  };
  // const ioccupation = {
  //     name: "occupation",
  //     type: "text",
  //     placeholder: "Student",
  //     req: false,
  //     onChange: changeOccupation,
  // };

  return (
    <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700 absolute top-[15vh]">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          Register your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={login}>
          <Input field={iemail} />
          <Input field={password} />
          <Input field={iname} />
          <Input field={iphone} />
          <Input field={iage} />
          <Input field={idescription} />
          {/* <Input field={ioccupation} /> */}
          {/* <div>
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-white">Gender</label>
                        <select
                            name="gender"
                            id="gender"
                            className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                            required
                            value={gender}
                            onChange={handleGenderChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div> */}

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
            Already have registered?{" "}
            <Link
              to="/auth/ngo-login"
              className="font-medium hover:underline text-blue-500"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
