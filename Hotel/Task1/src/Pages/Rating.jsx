import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

function ReviewList() {
  const [activeTab, setActiveTab] = useState("all");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getRatingData();
  }, []);

  const getRatingData = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/ratings");
      const updatedReviews = response.data.data.map((review) => ({
        ...review,
        reviewStatus: review.rating < 3 ? "deleted" : "published",
      }));
      setReviews(updatedReviews);
    } catch (error) {
      const errorMessage =
        "Unable to fetch rating data. Please try again later.";
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || errorMessage);
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const filteredReviews = reviews.filter((review) => {
    if (activeTab === "all") return true;
    return review.reviewStatus === activeTab;
  });

  return (
    <>
      <Navbar />
      <div className="h-8" />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-90 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-5 bg-gray-100 font-poppins overflow-y-auto">
          <h1 className="text-2xl font-semibold">Guest Reviews</h1>
          <div className="bg-white shadow-md rounded-3xl p-4 max-w-full mx-auto">
            <div className="flex flex-wrap border-b mb-4 space-x-4">
              {["all", "published", "deleted"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 border-b-2 ${
                    activeTab === tab
                      ? "border-purple-500 text-purple-500 font-bold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Reviews
                </button>
              ))}
            </div>
            <div className="space-y-4 overflow-x-auto">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex gap-4 p-4 border rounded-lg flex-col md:flex-row md:justify-between"
                  >
                    <img
                      src={review.img}
                      alt={review.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-lg">{review.name}</div>
                          <div className="text-sm text-gray-400">
                            Posted on {review.date} at{" "}
                            {new Date(review.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                        <div className="flex items-center mt-2 md:mt-0">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927C9.383 2.109 10.617 2.109 10.951 2.927l1.618 4.268a1 1 0 00.95.69h4.55c.968 0 1.371 1.24.588 1.81l-3.682 2.615a1 1 0 00-.363 1.118l1.618 4.268c.334.818-.654 1.497-1.341.987L10 14.347l-3.589 2.637c-.687.51-1.675-.17-1.341-.987l1.618-4.268a1 1 0 00-.363-1.118L2.643 9.695c-.783-.57-.38-1.81.588-1.81h4.55a1 1 0 00.95-.69L9.049 2.927z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mt-2">{review.review}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No reviews found for this status.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ReviewList;
