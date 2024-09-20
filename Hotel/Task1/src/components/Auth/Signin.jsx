import React from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogin = () => {
    // Redirect to dashboard when login button is clicked
    navigate("/dashboard");
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row">
      {/* Left side image section */}
      <div className="relative w-full lg:w-1/2 h-1/3 lg:h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] lg:left-[5%] flex flex-col p-4 lg:p-0">
          <h1 className="text-2xl lg:text-4xl text-white font-bold my-4">
            Discover the perfect balance of hospitality, luxury, and comfort.
          </h1>
          <p className="text-base lg:text-xl text-white font-normal">
            We are focused on providing clients with the highest level of
            comfort and excellent affordable rates.
          </p>
        </div>
        <img
          src={"./pres.jpg"}
          className="w-full h-full object-cover"
          alt="Cover"
        />
      </div>

      {/* Right side form section */}
      <div className="w-full lg:w-1/2 h-2/3 lg:h-full bg-[#f5f5f5] flex flex-col p-8 lg:p-20 justify-between items-center">
        <h1 className="text-lg lg:text-xl text-[#060606] font-semibold">
          Welcome To Our Luxury Rooms
        </h1>

        <div className="w-full flex flex-col max-w-[400px] lg:max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-2xl lg:text-3xl font-semibold mb-2">Login</h3>
            <p className="text-sm lg:text-base mb-2">
              Welcome Back! Please enter your details.
            </p>

            <div className="w-full flex flex-col">
              <input
                type="email"
                placeholder="Email"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              />
            </div>

            <div className="w-full flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <p className="text-xs lg:text-sm">Remember me for 30 days</p>
              </div>
              <p
                className="text-xs lg:text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2"
                onClick={() => navigate("/forgot")} // Navigate to Forgot Password
              >
                Forgot Password?
              </p>
            </div>

            <div className="w-full flex flex-col my-4">
              <button
                className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-3 lg:p-4 text-center flex items-center justify-center cursor-pointer"
                onClick={handleLogin} // Call handleLogin on click
              >
                Log in
              </button>

              <button
                className="w-full text-[#060606] my-2 font-semibold bg-white border border-black rounded p-3 lg:p-4 text-center flex items-center justify-center cursor-pointer"
                onClick={() => navigate("/signup")} // Navigate to Sign Up
              >
                Register
              </button>
            </div>

            <div className="w-full flex items-center justify-center relative py-2">
              <div className="w-full h-[1px] bg-black/40"></div>
              <p className="text-base lg:text-lg absolute text-black/80 bg-[#f5f5f5] px-2">
                or
              </p>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <p className="text-xs lg:text-sm font-normal text-[#060606]">
              Don't have an account?{" "}
              <span
                className="font-semibold cursor-pointer underline"
                onClick={() => navigate("/signup")} // Navigate to Sign Up
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
