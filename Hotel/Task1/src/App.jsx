import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import Bookings from "./Pages/Bookings";
// import { Protector } from "./Helpers";

import Guest from "./Pages/Guest";
import Dashboard from "./Pages/Dashboard";
import Staff from "./Pages/Staff";
import Rooms from "./Pages/Roooms";
import Rating from "./Pages/Rating";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Forgot from "./components/Auth/Forgot";
import Logout from "./components/Auth/Logout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Protector Component={Dashboard} />} /> */}
          <Route path="/signIn" element={<Signin />} />
          {/* <Route path="/logout" element={<Logout />} /> */}
          <Route path="/Signup" element={<Signup />} />
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="Guest" exact element={<Guest />} />
          <Route path="/Rating" exact element={<Rating />} />
          <Route path="/Staff" exact element={<Staff />} />
          <Route path="/Bookings" exact element={<Bookings />} />
          <Route path="/Rooms" exact element={<Rooms />} />
          <Route path="/Rating" exact element={<Rating />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
