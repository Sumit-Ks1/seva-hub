import { useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Suggestions() {
  const registerSuggestions = async (e) => {
    e.preventDefault();
    const student = JSON.parse(localStorage.getItem("student"));
    // const response = await fetch(
    //   "http://localhost:3000/api/suggestion/register",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       student: student._id,
    //       hostel: student.hostel,
    //       title,
    //       description: desc,
    //     }),
    //   },
    // );

    // const data = await response.json();
    // if (data.success) {
    //   toast.success("🎉 Suggestion registered successfully!", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     draggable: true,
    //   });
    // } else {
    //   toast.error("❌ Suggestion registration failed.", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     draggable: true,
    //   });
    // }
  };

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const suggestionTitle = {
    name: "suggestion title",
    placeholder: "Enter a title for your suggestion",
    req: true,
    type: "text",
    value: title,
    onChange: (e) => setTitle(e.target.value),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full">
        <h1 className="text-white text-4xl font-bold text-center mb-8">
          Suggestions
        </h1>
        <form
          onSubmit={registerSuggestions}
          className="bg-neutral-900 rounded-lg shadow-2xl p-8 space-y-6"
        >
          <Input field={suggestionTitle} />
          <div>
            <label
              htmlFor="suggestion"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Your Suggestion Description
            </label>
            <textarea
              name="suggestion"
              id="suggestion"
              placeholder="Share your thoughts here..."
              className="w-full bg-gray-800 text-white text-sm border border-gray-600 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-800 transition duration-200"
          >
            Submit Suggestion
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Suggestions;
