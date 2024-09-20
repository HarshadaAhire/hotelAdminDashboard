import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:1337/api/rooms");
      setRooms(response.data.data);
    } catch (error) {
      const errorMessage = "Unable to fetch room data. Please try again later.";
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || errorMessage);
      } else {
        toast.error(errorMessage);
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
      <div className="h-8" />
      <div className="flex bg-gray-90 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100 font-poppins">
          <h1 className="text-2xl font-semibold mb-4">Rooms</h1>
          <div className="grid gap-8">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h2 className="text-xl font-semibold mb-4 font-poppins">
                    {room.name}
                  </h2>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {Array.isArray(room.images) && room.images.length > 0 ? (
                      room.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${room.name} ${index + 1}`}
                          className="rounded-lg w-full h-40 object-cover"
                        />
                      ))
                    ) : (
                      <p>No images available</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold font-poppins">
                      Room Facilities
                    </h3>
                    <p className="text-gray-600 font-poppins">
                      {Array.isArray(room.facilities) &&
                      room.facilities.length > 0
                        ? room.facilities.join(", ") // Join facilities into a string
                        : "No facilities available"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex justify-center items-center mr-4">
                      <i className="fas fa-key text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-600 font-semibold font-poppins">
                        Booking ID #{room.bookingId}
                      </p>
                      <p className="font-semibold">{room.roomNumber}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4 text-gray-600 font-poppins">
                    <div className="flex items-center">
                      <i className="fas fa-users mr-2"></i>
                      <p>{room.capacity} Person</p>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-bed mr-2"></i>
                      <p>{room.bedType}</p>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-calendar-alt mr-2"></i>
                      <p>
                        {Array.isArray(room.availableDates)
                          ? room.availableDates.join(" - ")
                          : "No available dates"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No rooms available</div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default Rooms;
