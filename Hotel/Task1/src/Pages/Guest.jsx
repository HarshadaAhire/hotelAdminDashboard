import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

const Guests = () => {
  const [guests, setGuests] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/guests");
        setGuests(response.data.data || response.data);
      } catch (err) {
        setError("Failed to fetch guest data.");
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  const statusClass = (status) => {
    const statusClassMap = {
      Pending: "bg-yellow-200 text-yellow-800",
      Booked: "bg-blue-200 text-blue-800",
      Canceled: "bg-red-200 text-red-800",
      Refund: "bg-green-200 text-green-800",
    };
    return statusClassMap[status] || "bg-gray-200 text-gray-800";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid Date:", dateString);
      return "Invalid Date";
    }
    return date.toLocaleDateString(); // Customize options if needed
  };

  const formatTime = (timeString) => {
    if (!timeString) return "Invalid Time"; // Handle empty or undefined values

    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = (parseInt(hours, 10) + 12).toString(); // Convert to 24-hour format
    } else if (modifier === "AM" && hours === "12") {
      hours = "00"; // Midnight case
    }

    return `${hours.padStart(2, "0")}:${minutes}`;
  };

  const filteredGuests = guests.filter((guest) => {
    const statusMatch =
      activeTab === "All" ||
      guest.guestStatus.trim().toLowerCase() === activeTab.toLowerCase();
    const nameMatch = guest.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return statusMatch && nameMatch;
  });

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-600">{error}</div>;

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <div className="h-8" />
      <div className="flex bg-gray-90 min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 font-poppins">
          <h1 className="text-2xl font-semibold mb-4">Guests</h1>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["All", "Pending", "Booked", "Canceled", "Refund"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-bold transition-colors duration-300 ${
                  activeTab === tab
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search and Report Button */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="relative w-full max-w-xs md:max-w-sm flex-1">
              <input
                type="text"
                placeholder="Search guest by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-full py-2 pl-4 pr-10 w-full focus:outline-none focus:border-blue-400"
              />
            </div>
            <button className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition">
              Generate Report
            </button>
          </div>

          {/* Table */}
          <div className="bg-white shadow-md rounded-3xl overflow-x-auto p-4 font-poppins">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-white">
                  <th className="p-3 text-left font-semibold text-black">
                    Guest
                  </th>
                  <th className="p-3 text-left font-semibold text-black">
                    Date Order
                  </th>
                  <th className="p-3 text-left font-semibold text-black">
                    Check In
                  </th>
                  <th className="p-3 text-left font-semibold text-black">
                    Check Out
                  </th>
                  <th className="p-3 text-left font-semibold text-black">
                    Room Type
                  </th>
                  <th className="p-3 text-left font-semibold text-black">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((guest, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 flex items-center space-x-4">
                      <img
                        src={guest.image}
                        alt={guest.name}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full"
                      />
                      <div>
                        <p className="font-bold text-gray-800">{guest.name}</p>
                      </div>
                    </td>
                    <td className="p-3 text-gray-700">
                      <p className="font-medium">
                        {formatDate(guest.dateOrder)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatTime(guest.timeOrder)}
                      </p>
                    </td>
                    <td className="p-3 text-gray-700">
                      <p className="font-medium">{guest.checkIn}</p>
                      <p className="text-xs text-gray-400">
                        {formatTime(guest.timeCheckIn)}
                      </p>
                    </td>
                    <td className="p-3 text-gray-700">
                      <p className="font-medium">{guest.checkOut}</p>
                      <p className="text-xs text-gray-400">
                        {formatTime(guest.timeCheckOut)}
                      </p>
                    </td>
                    <td className="p-3 text-gray-700">{guest.roomType}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass(
                          guest.guestStatus
                        )}`}
                      >
                        {guest.guestStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default Guests;
