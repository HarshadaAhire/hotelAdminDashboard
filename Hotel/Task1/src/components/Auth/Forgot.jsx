import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    // Implement your reset password logic here
    console.log("Resetting password for:", { email });
    // For example, you might call an API to send a reset password email
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
        <div className="absolute top-20 left-10 flex flex-col">
          <h1 className="text-4xl text-white font-bold my-4">
            Reset Your Password
          </h1>
          <p className="text-xl text-white font-normal">
            Enter your email to receive a reset link.
          </p>
        </div>
        <img
          src={"./hotel3.jpg"}
          className="w-full h-full object-cover"
          alt="Cover"
        />
      </div>

      <div className="w-full md:w-1/2 h-full bg-[#f5f5f5] flex flex-col p-5 md:p-20 justify-between items-center">
        <h1 className="text-xl text-[#060606] font-semibold text-center md:text-left">
          Welcome To Our Luxury Rooms
        </h1>
        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2 text-center md:text-left">
              Forgot Password
            </h3>
            <p className="text-base mb-2 text-center md:text-left">
              Please enter your email.
            </p>

            <div className="w-full flex flex-col">
              <input
                type="email"
                placeholder="Email"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col my-4">
              <button
                className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center cursor-pointer"
                onClick={handleResetPassword}
              >
                Send Reset Link
              </button>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <p className="text-sm font-normal text-[#060606]">
              Remembered your password?{" "}
              <span
                className="font-semibold cursor-pointer underline"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
