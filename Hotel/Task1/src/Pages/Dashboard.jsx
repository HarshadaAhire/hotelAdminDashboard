import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
// import { userData } from "../Helper";
import {
  FaCalendarAlt,
  FaCheck,
  FaDoorOpen,
  FaDoorClosed,
} from "react-icons/fa";
import Calendar from "react-calendar";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "react-calendar/dist/Calendar.css"; // Ensure this import remains

function Dashboard() {
  // Dummy data for the graph
  const data = [
    { name: "01", checkin: 400, checkout: 240 },
    { name: "02", checkin: 300, checkout: 139 },
    { name: "03", checkin: 200, checkout: 980 },
    { name: "04", checkin: 278, checkout: 390 },
    { name: "05", checkin: 189, checkout: 480 },
  ];

  // Calendar state
  const [value, setValue] = useState(new Date());

  // Dummy data for guest booking and feedback
  const bookings = [
    {
      name: "Samantha Humble",
      date: "October 3rd, 2020",
      room: "Room A-21",
      people: "3-5 Person",
      img: "https://via.placeholder.com/50",
    },
    {
      name: "Louise Marquee",
      date: "October 3rd, 2020",
      room: "Room A-21",
      people: "3-5 Person",
      img: "https://via.placeholder.com/50",
    },
    {
      name: "Richard Smile",
      date: "October 3rd, 2020",
      room: "Room A-21",
      people: "3-5 Person",
      img: "https://via.placeholder.com/50",
    },
  ];

  const reviews = [
    {
      name: "Keanu Repes",
      date: "April 26th, 2020, 12:42 AM",
      feedback:
        "I have been there many times. Rooms, Food and Service are excellent. We did lots of excursions and all the places were accessible from the hotel.",
      img: "https://via.placeholder.com/50",
      rating: 4,
    },
    {
      name: "Keanu Repes",
      date: "April 26th, 2020, 12:42 AM",
      feedback:
        "I have been there many times. Rooms, Food and Service are excellent. We did lots of excursions and all the places were accessible from the hotel.",
      img: "https://via.placeholder.com/50",
      rating: 4,
    },
  ];

  return (
    <>
      <Navbar />
      <Box height={20} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            m: 2,
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            boxShadow: "0 5px 8px rgba(0,0,0,0.1)",
          }}
        >
          {/* Dashboard Title */}
          <h2
            className="text-2xl md:text-3xl  font-bold font-poppins
            mb-6"
          >
            {/* Welcome {username} */}
          </h2>

          {/* Responsive Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 font-poppins">
            {[
              {
                label: "New Bookings",
                icon: <FaCalendarAlt />,
                iconColor: "bg-pink-700",
              },
              {
                label: "Schedule Room",
                icon: <FaCheck />,
                iconColor: "bg-green-500",
              },
              {
                label: "Check In",
                icon: <FaDoorOpen />,
                iconColor: "bg-yellow-500",
              },
              {
                label: "Check Out",
                icon: <FaDoorClosed />,
                iconColor: "bg-red-500",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 md:p-6 bg-white rounded-3xl shadow-md text-gray-800 h-36 flex flex-col justify-between hover:bg-purple-500 hover:text-white transition-all duration-300 font-poppins"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h6 className="text-sm md:text-xl text-gray-500 mb-2 md:mb-5 text-center font-poppins">
                      {item.label}
                    </h6>
                    <h4 className="text-xl md:text-3xl font-bold font-poppins">
                      {index * 100 + 50}
                    </h4>
                  </div>
                  <div
                    className={`text-2xl md:text-3xl p-2 rounded-3xl ${item.iconColor} text-white flex justify-center items-center font-poppins`}
                    style={{ width: "40px", height: "40px" }}
                  >
                    {item.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8 font-poppins">
            {/* Calendar Section */}
            <div
              className="w-full lg:w-1/3 p-4 md:p-6 bg-white rounded-3xl shadow-lg"
              style={{ height: "400px" }}
            >
              <Calendar
                onChange={setValue}
                value={value}
                className="w-full border-none rounded-md text-black font-semibold text-lg md:text-xl"
              />
            </div>

            {/* Graph Section */}
            <div
              className="w-full lg:w-2/3 p-4 md:p-6 bg-gray-100 rounded-lg shadow-lg font-poppins"
              style={{ height: "400px" }}
            >
              <div className="flex justify-between items-center mb-4">
                <h6 className="font-bold text-gray-700 text-sm md:text-base">
                  Reservation Statistics
                </h6>
                <div className="text-gray-700 text-sm md:text-base">
                  <span className="mr-2 md:mr-4">
                    Check-in:{" "}
                    <span className="font-bold text-blue-600">350</span>
                  </span>
                  <span>
                    Check-out:{" "}
                    <span className="font-bold text-green-600">200</span>
                  </span>
                </div>
              </div>

              <hr className="border-t-2 border-gray-300 mb-4  Font-Poppins" />

              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey="checkin"
                    stroke="#8884d8"
                    strokeWidth={5}
                    dot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="checkout"
                    stroke="#82ca9d"
                    strokeWidth={5}
                    dot={{ r: 5 }}
                  />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* New Bookings and Guest Feedback Section */}
          <div className="flex flex-col lg:flex-row gap-8 mt-8 font-poppins">
            {/* New Bookings Section */}
            <div
              className="w-full lg:w-1/3 p-4 md:p-6 bg-white rounded-3xl shadow-lg"
              style={{ height: "400px" }}
            >
              <h3 className="text-lg font-bold mb-4">Newest Bookings</h3>
              <div className="h-full overflow-y-auto">
                <div className="grid grid-cols-1 gap-4">
                  {bookings.map((booking, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-gray-100 rounded-lg"
                    >
                      <img
                        src={booking.img}
                        alt={booking.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-bold">{booking.name}</h4>
                        <p className="text-sm text-gray-500">{booking.date}</p>
                        <p className="text-sm text-gray-500">
                          {booking.room} • {booking.people}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Guest Feedback Section */}
            <div
              className="w-full lg:w-2/3 p-4 md:p-6 bg-white rounded-3xl shadow-lg"
              style={{ height: "400px" }}
            >
              <h3 className="text-lg font-bold mb-4">Guest Feedback</h3>
              <div className="h-full overflow-y-auto">
                {reviews.map((review, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center mb-2">
                      <img
                        src={review.img}
                        alt={review.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-bold">{review.name}</h4>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      {review.feedback}
                    </p>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500">
                          ★
                        </span>
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <span key={i} className="text-gray-300">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
