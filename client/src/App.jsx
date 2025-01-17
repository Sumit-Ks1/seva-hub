import "./App.css";
import { Route, Routes } from "react-router-dom";
import About from "./components/LandingSite/About/index";
import Contact from "./components/LandingSite/Contact/index";
import LandingSite from "./components/LandingSite/Index";
import LandingPage from "./components/LandingSite/LandingPage/index";
import Auth from "./components/LandingSite/AuthPage/Index";
import SignIn from "./components/LandingSite/AuthPage/SignIn";
import SignUp from "./components/LandingSite/AuthPage/SignUp";
import AdminSignIn from "./components/LandingSite/AuthPage/AdminSignIn";
import Index from "./components/Dashboards/StudentDashboard/Index";
import Home from "./components/Dashboards/StudentDashboard/Home";
import PastEvents from "./components/Dashboards/StudentDashboard/PastEvents";
import Suggestions from "./components/Dashboards/StudentDashboard/Suggestions";
import Complaints from "./components/Dashboards/StudentDashboard/Complaints";
import AdminIndex from "./components/Dashboards/AdminDashboard/Index";
import AdminHome from "./components/Dashboards/AdminDashboard/Home/Home";
import RegisterStudent from "./components/Dashboards/AdminDashboard/RegisterStudent";
import AdminPastEvents from "./components/Dashboards/AdminDashboard/PastEvents";
import AdminComplaints from "./components/Dashboards/AdminDashboard/Complaints";
import AdminInvoices from './components/Dashboards/AdminDashboard/Invoices';
import AdminSuggestions from './components/Dashboards/AdminDashboard/Suggestions';
import AdminSettings from './components/Dashboards/AdminDashboard/Settings';
import OrgSignup from "./components/LandingSite/AuthPage/OrgSignUp";
import AddEvent from "./components/Dashboards/AdminDashboard/AddEvent";
import Donations from "./components/Dashboards/StudentDashboard/Donations";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingSite />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="auth" element={<Auth />}>
            <Route index element={<SignIn />} />
            <Route path="user-signup" element={<SignUp />} />
            <Route path="user-login" element={<SignIn />} />
            {/* <Route path="request" element={<SignUp />} /> */}
            <Route path="ngo-signup" element={<OrgSignup />} />
            <Route path="ngo-login" element={<AdminSignIn />} />
          </Route>
        </Route>
        <Route path="/student-dashboard" element={<Index />}>
          <Route index element={<Home />} />
          <Route path="past-events" element={<PastEvents/>} />
          <Route path="complaints" element={<Complaints/>} />
          <Route path="suggestions" element={<Suggestions/>} />
          <Route path="upcoming-events" element={<Donations/>} />
        </Route>
        <Route path="/admin-dashboard" element={<AdminIndex />}>
          <Route index element={<AdminHome />} />
          <Route path='register-student' element={<RegisterStudent />} />
          <Route path="past-events" element={<AdminPastEvents />} />
          <Route path="complaints" element={<AdminComplaints />} />
          <Route path="upcoming-events" element={<AdminInvoices/>} />
          <Route path="all-events" element={<AdminSuggestions/>} />
          <Route path="settings" element={<AdminSettings/>} />
          <Route path="add-event" element={<AddEvent />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
