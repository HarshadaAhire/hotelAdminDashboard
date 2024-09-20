import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import { FaFilter, FaFileAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMore, setShowMore] = useState({});
  const bookingsPerPage = 3;

  useEffect(() => {
    getBookingData();
  }, []);

  const getBookingData = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/bookings");
      setBookings(response.data.data);
    } catch (error) {
      const errorMessage =
        "Unable to fetch booking data. Please try again later.";
      toast.error(error.response?.data.message || errorMessage);
    }
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (indexOfLastBooking < bookings.length) setCurrentPage(currentPage + 1);
  };

  const toggleShowMore = (id) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [id]: !prevShowMore[id],
    }));
  };

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
          <h2 className="text-2xl font-semibold mb-4 font-poppins">
            History Booking
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-end mb-4 space-x-4 font-poppins">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center mb-2">
              <FaFilter className="mr-2" /> Date Filter
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center mb-2">
              <FaFileAlt className="mr-2" /> Generate Report
            </button>
          </div>

          {/* Table */}
          <div className="bg-gray-50 shadow-md rounded-3xl overflow-x-auto p-4 font-poppins">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  {[
                    "ID",
                    "Image",
                    "Room Name",
                    "Bed Type",
                    "Room Floor",
                    "Room Facility",
                    "Book Date",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 border-b-2 border-gray-200 bg-white text-left text-lg font-bold text-black"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentBookings.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-4 whitespace-nowrap text-purple-500">
                      {row.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <img
                        src={row.documentId}
                        alt={row.roomName}
                        className="h-16 w-24 rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <a href="#" className="text-black font-semibold">
                        {row.roomName}
                      </a>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-400">
                      {row.bedType}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-400">
                      {row.roomFloor}
                    </td>
                    <td className="px-4 py-4 whitespace-normal break-words max-w-xs text-gray-400">
                      {showMore[row.id]
                        ? row.roomFacility
                        : row.roomFacility.split(" ").slice(0, 7).join(" ")}
                      {row.roomFacility.split(" ").length > 7 && (
                        <span
                          className="text-blue-600 cursor-pointer ml-2"
                          onClick={() => toggleShowMore(row.id)}
                        >
                          {showMore[row.id] ? "Show Less" : "Show More"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-black font-semibold">
                      {row.bookDate}
                      <br />
                      <span className="text-gray-400 text-sm">08:29 AM</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between mt-4 font-poppins">
            <p className="text-black">
              Showing {indexOfFirstBooking + 1} to{" "}
              {Math.min(indexOfLastBooking, bookings.length)} of{" "}
              {bookings.length} entries
            </p>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-3 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gray-200"
                }`}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={`px-4 py-3 rounded-lg ${
                  indexOfLastBooking >= bookings.length
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-200"
                }`}
                onClick={handleNextPage}
                disabled={indexOfLastBooking >= bookings.length}
              >
                Next
              </button>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Bookings;
