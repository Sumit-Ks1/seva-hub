import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

SidebarAdmin.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      svg: PropTypes.element.isRequired,
    }),
  ).isRequired,
};

function SidebarAdmin({ links }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle screen resize
  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth >= 768) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);
    return () => window.removeEventListener("resize", setWindowDimensions);
  }, []);

  // Handle menu toggle
  const toggleMenu = () => setIsOpen(!isOpen);

  // Logout function
  const logout = () => {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:8000/api/v1/",
      withCredentials: true,
    });
    axiosInstance
      .post("http://localhost:8000/api/v1/organisation/logout", {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Error logging out", error);
      });
    navigate("/");
  };

  return (
    <div className="mr-8">
      <button
        className={`fixed z-50 top-4 left-4 bg-gray-600 p-3 rounded-full shadow-lg md:hidden transition-all transform ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
        onClick={toggleMenu}
      >
        <svg
          className={`w-6 h-6 ${isOpen ? "block" : "hidden"}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
        <svg
          className={`w-6 h-6 ${isOpen ? "hidden" : "block"}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      <div
        className={`fixed top-0 left-0 w-64 bg-gray-800 text-gray-100 h-screen transition-transform ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <Link
            to="/admin-dashboard"
            className="py-5 px-4 bg-black text-xl flex items-center gap-2 hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              />
            </svg>
            Dashboard
          </Link>

          <div className="flex-1 space-y-2 py-4 px-4">
            {links.map((link) => (
              <Link
                to={link.url}
                key={link.text}
                className={`py-2 px-4 flex items-center gap-2 rounded-md text-xl ${
                  location.pathname === link.url
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-600 hover:text-white"
                }`}
              >
                {link.svg}
                {link.text}
              </Link>
            ))}
          </div>

          <div className="p-4 mt-auto">
            <button
              onClick={logout}
              className="w-full flex gap-2 justify-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SidebarAdmin };
