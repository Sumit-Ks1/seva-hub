import { HeroSVG } from "./HeroSVG";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <main className="relative flex flex-col-reverse lg:flex-row items-center justify-center text-white  px-6 lg:px-16">
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start space-y-8 lg:space-y-12 text-center lg:text-left">
        <h1 className="font-bold text-5xl sm:text-6xl md:text-7xl text-blue-500">
          Seva <span className="text-blue-300">Hub</span>
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl text-white/80">
          A central platform for NGOs and volunteers to collaborate and make a
          difference.
        </p>
        <div className="flex flex-col justify-center gap-3 items-center w-full sm:w-auto">
          <Link
            to="/auth/user-login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 sm:px-16 rounded-lg transition ease-in-out duration-200 text-lg sm:text-xl w-full"
          >
            Volunteer Login
          </Link>
          <p className="text-lg text-white/70">OR</p>
          <Link
            to="/auth/ngo-login"
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 sm:px-16 rounded-lg transition ease-in-out duration-200 text-lg sm:text-xl w-full"
          >
            NGO Login
          </Link>
        </div>
      </div>

      <div className="lg:w-1/2 w-full mb-16 lg:mb-0">
        <HeroSVG />
      </div>
    </main>
  );
}

export { HeroSection };
