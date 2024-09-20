import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployeeData();
  }, []);

  const getEmployeeData = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/employees");
      setEmployees(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorMessage =
        "Unable to fetch employee data. Please try again later.";
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || errorMessage);
      } else {
        toast.error(errorMessage);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
          <h2 className="text-2xl font-semibold mb-8 font-poppins">
            Employee List
          </h2>
          <div className="bg-grey shadow-md rounded-3xl overflow-x-auto p-4 font-poppins">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border-b-2 text-left text-sm md:text-base">
                    Employee Name
                  </th>
                  <th className="py-2 px-4 border-b-2 text-left text-sm md:text-base">
                    Job Desk
                  </th>
                  <th className="py-2 px-4 border-b-2 text-left text-sm md:text-base">
                    Contact
                  </th>
                  <th className="py-2 px-4 border-b-2 text-left text-sm md:text-base">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b flex items-center">
                      <img
                        src={
                          employee.imgUrl || "https://via.placeholder.com/50"
                        }
                        alt={employee.name}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        <div className="text-sm font-bold">{employee.name}</div>
                        <div className="text-xs text-gray-500">
                          Join on {employee.joinDate}
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b text-sm md:text-base">
                      {employee.jobDesk}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span className="text-blue-600 text-sm md:text-base">
                        {employee.contact}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`text-sm font-bold ${
                          employee.empStatus === "ACTIVE"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {employee.empStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default EmployeeTable;
