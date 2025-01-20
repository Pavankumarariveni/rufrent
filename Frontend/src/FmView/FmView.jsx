import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { minDate, maxDate, currentTime } from "./utils/getDateTime";
import axios from "axios";
import tailwindStyles from "../utils/tailwindStyles";
import { apiUrl } from "../config/apiRoute";

import { FaUserAlt } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useRoleStore } from "../store/roleStore";

const FMView = () => {
  const id = useRoleStore((state) => state.id);
  const userName = useRoleStore((state) => state.userName);
  const role = useRoleStore((state) => state.role);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const [requestFmDetails, setRequestFmDetails] = useState([]);
  const [fmStatuses, setFmStatuses] = useState([]); // State to store rmStatuses

  const [selectedDate, setSelectedDate] = useState(minDate);
  const [selectedTime, setSelectedTime] = useState(currentTime);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState(null);
  // const [formData, setFormData]=useState([1])

  useEffect(() => {
    const fetchFmDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetching requests
        const response = await axios.get(`${apiUrl}/fmRequests?fm_id=${id}`); //todo need to modify for passing rm_id dynamically

        if (response.status) {
          const fmRequests = response.data;
          setRequestFmDetails(fmRequests);
        } else {
          setRequestFmDetails([]);
        }

        // Fetching rmStatuses
        const statusResponse = await axios.get(`${apiUrl}/fmStatus`);

        if (statusResponse.data) {
          setFmStatuses(statusResponse.data);
        } else {
          console.log("No rmStatuses found in response:", statusResponse.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchFmDashboardData();
  }, []);

  const handleSave = async (transactionId) => {
    const updatedRequest = requestFmDetails.find(
      (item) => item.transaction_id === transactionId
    );

    if (!updatedRequest) return;

    try {
      const payload = {
        id: transactionId,
        cur_stat_code: parseInt(updatedStatus),
      };

      console.log("Payload to be sent:", payload);

      const response = await axios.put(
        `${apiUrl}/updatetranscationsstatus`,
        payload
      );

      if (response.status === 201) {
        console.log(response.status);
        alert("Request updated successfully!");
      } else {
        alert("Failed to update request. Try again.");
      }
    } catch (err) {
      console.error("Error updating request:", err);
      alert("An error occurred while updating the request.");
    }
  };

  const clearRole = useRoleStore((state) => state.clearRole);
  const back = useNavigate();
  const onclickLogout = () => {
    Cookies.remove("jwtToken");
    clearRole();
    back("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <header className="bg-gray-800 text-white p-3 pl-8 md:pr-10 fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="container md:mx-auto flex justify-between items-center">
          <Link to="/user">
            <div>
              <img
                src="/public/RUFRENT2.png"
                alt="logo"
                className={`${tailwindStyles.logo}`}
              />
            </div>
          </Link>
          <h1 className="text-lg lg:text-xl font-bold">FM Dashboard</h1>
          <div
            onClick={toggleDropdown}
            className="text-2xl cursor-pointer"
            style={{ color: "#FFC156" }}
          >
            <FaUserAlt />
          </div>
        </div>
        {isOpen && (
          <div className="absolute right-0 mt-0 w-48 bg-white text-black border border-gray-200 rounded-lg shadow-lg z-10">
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                {userName || "Profile"} , {role}
              </li>

              <li
                onClick={onclickLogout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </header>

      <ul className="mx-auto px-2 md:px-10 mt-20 mb-20 w-full">
        <section className="hidden lg:block bg-blue-300 p-2 shadow rounded-t-lg text-gray-900">
          <div className="flex justify-around items-center py-4">
            <div className="hidden lg:block font-bold">Property</div>
            <div className="hidden lg:block font-bold">Owner</div>
            <div className="hidden lg:block font-bold">Tenant</div>
            <div className="hidden lg:block font-bold">Status</div>
            <div className="hidden lg:block font-bold">Schedule</div>
            <div className="hidden lg:block font-bold">Time</div>

            <div className="hidden lg:block font-bold">Action</div>
          </div>
        </section>

        {requestFmDetails.map((each, index) => (
          <li
            key={each.transaction_id}
            className={`p-4 ${index % 2 === 0 ? "bg-green-50" : "bg-gray-50"}`}
          >
            <div className="sm:gap-4 md:grid-cols-3 lg:flex lg:justify-around items-start lg:items-center px-4 py-4">
              <div>
                <p>
                  <strong className="lg:hidden">Property:</strong>{" "}
                  {each.community_name}
                </p>
              </div>
              <div className="border-b sm:border-gray-300 rounded-lg md:border-none ml-12">
                <p>
                  <strong className="lg:hidden">Owner:</strong>{" "}
                  {each.owner_name}
                  <br />
                  <span className="text-lg">
                    {each.owner_mobile || "xxxxxx"}
                  </span>
                </p>
              </div>
              <div className="border-b sm:border-gray-300 rounded-lg md:border-none lg:mb-0">
                <p>
                  <strong className="lg:hidden">Tenant:</strong>{" "}
                  {each.tenant_name}
                  <br />
                  <span className="text-lg">
                    {each.tenant_mobile || "xxxxxx"}
                  </span>
                </p>
              </div>
              <div className="border-b sm:border-gray-300 rounded-lg md:border-none lg:mb-0 flex flex-col lg:flex-row">
                <p>
                  <strong className="lg:hidden">Status:</strong>
                  <select
                    className="border border-gray-300 rounded-lg p-1 lg:w-32"
                    value={each.curr_stat_code_id}
                    onChange={(e) => {
                      setUpdatedStatus(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    {fmStatuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.status_code}
                      </option>
                    ))}
                  </select>
                </p>
              </div>

              <div className="border-b sm:border-gray-300 rounded-lg md:border-none lg:mb-0 flex flex-col lg:flex-row gap-2">
                <p>
                  <strong className="lg:hidden">Schedule:</strong>
                  {each.schedule_date}
                </p>
              </div>
              <div className="border-b sm:border-gray-300 rounded-lg md:border-none lg:mb-0 flex flex-col lg:flex-row gap-2">
                <p>
                  <strong className="lg:hidden">Time:</strong>
                  {each.schedule_time}
                </p>
              </div>

              <button
                className="bg-blue-500 text-white py-1 w-16 rounded ml-28 lg:ml-10 mt-2 lg:mt-0 lg:w-13"
                onClick={() => handleSave(each.transaction_id)}
              >
                Save
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FMView;
