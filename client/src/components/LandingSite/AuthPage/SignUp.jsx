import { Input } from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { verifysession } from "../../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Dashboards/Common/Loader";
import axios from "axios";
// import { UserContext } from "../../contexts/UserContext";
// import { useContext } from "react";
// import useUser from "../../contexts/useUser";
// import qs from "qs";
export default function SignUp() {
  // const { user, setUser } = useUser();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  // if (localStorage.getItem("token")) {
  //   verifysession();
  // }

  async function login(event) {
    event.preventDefault();
    setLoader(true);
    const data = {
      email: email,
      password: pass,
      name,
      phone_No: phone,
      age,
      gender,
      occupation: occupation,
    };

    // console.log("Data-",data);
    const API_URL = import.meta.env.VITE_API_URL || '/api';

    axios
      .post(`${API_URL}/v1/users/register`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("Response-",response);
        console.log("response da data -", response.data);
        console.log("response da data da data-", response.data.data);
        setLoader(false);
        navigate("/auth/user-login");
      })
      .catch((error) => {
        console.log("this is chatched error");
        console.error(error);
        console.log("status code is ", error.response.status);
        const statusCode = error.response.status;

        if (statusCode == 400) {
          // Empty field
          setError("Cannot Be Empty");
        } else if (statusCode == 409) {
          // User already exist
          setError("User Already Exist");
        }

        setLoader(false);
        toast.error(error, {
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
    // let response = await fetch("api/v1/users/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({data})
    // });

    // let result = await response.json();

    //   // let studentResult = await student.json();
    //   // if (studentResult.success) {
    //   //   localStorage.setItem("student", JSON.stringify(studentResult.student));
    //   //   navigate("/student-dashboard");
    //   // } else {
    //   //   // console.log(studentResult.errors)
    //   // }
    //   setLoader(false);
    //   result.status === 201 && navigate("/student-dashboard");
    // } else {
    //   setLoader(false);
    //   // alert(result.errors[0].msg);
    //   toast.error(
    //     result.errors[0].msg, {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   })
    // }
  }

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changePass = (event) => {
    setPass(event.target.value);
  };
  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeOccupation = (event) => {
    setOccupation(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
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
  const iname = {
    name: "name",
    type: "text",
    placeholder: "John Doe",
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
    name: "age",
    type: "number",
    placeholder: "Age",
    req: true,
    onChange: (event) => setAge(event.target.value),
  };
  const ioccupation = {
    name: "occupation",
    type: "text",
    placeholder: "Student",
    req: false,
    onChange: changeOccupation,
  };

  return (
    <div className="border border-gray-300 p-4 shadow-spread-white w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 absolute top-[15vh] mb-3">
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
          <Input field={ioccupation} />
          <div>
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-white"
            >
              Gender
            </label>
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
          </div>

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
            Already have an account{" "}
            <Link
              to="/auth/user-login"
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
