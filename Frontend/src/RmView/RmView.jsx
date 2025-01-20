// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { minDate, maxDate, currentTime } from "../utils/getDateTime";
// import axios from "axios";
// import tailwindStyles from "../utils/tailwindStyles";
// import { apiUrl } from "../config/apiRoute";
// import { FaUserAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { useRoleStore } from "../store/roleStore";

// const RMView = () => {
//   const id = useRoleStore((state) => state.id);
//   const userName = useRoleStore((state) => state.userName);
//   const role = useRoleStore((state) => state.role);

//   const [isOpen, setIsOpen] = useState(false);
//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const [requestRmDetails, setRequestRmDetails] = useState([]);
//   const [rmCommunities, setRmCommunities] = useState([]);
//   const [rmStatuses, setRmStatuses] = useState([]); // State to store rmStatuses
//   const [fieldManagers, setFieldManagers] = useState([]); // State for FM names

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // const [formData, setFormData]=useState([1])

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRmDashboardData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`${apiUrl}/requests?rm_id=${id}`);

//         if (response.status) {
//           setRequestRmDetails(response.data?.request || []);
//           setRmCommunities(response.data?.community_name || []);
//         }

//         const statusResponse = await axios.get(`${apiUrl}/rmstatus`);
//         setRmStatuses(statusResponse.data || []);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRmDashboardData();
//   }, [id]);

//   useEffect(() => {
//     if (rmCommunities.length === 0) return;

//     const fetchFmData = async () => {
//       const currentCommId =
//         requestRmDetails[0]?.current_community_id ||
//         rmCommunities[0]?.community_id;

//       setLoading(true);
//       setError(null);
//       try {
//         const fmResponse = await axios.get(
//           `${apiUrl}/FmList?community_id=${currentCommId}`
//         );
//         setFieldManagers(fmResponse.data?.fm_data || []);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFmData();
//   }, [rmCommunities]);

//   const handleInputChange = (transactionId, field, value) => {
//     setRequestRmDetails((prevDetails) =>
//       prevDetails.map((item) =>
//         item.transaction_id === transactionId
//           ? { ...item, [field]: value }
//           : item
//       )
//     );
//   };

//   const handleSave = async (transactionId) => {
//     const updatedRequest = requestRmDetails.find(
//       (item) => item.transaction_id === transactionId
//     );

//     if (!updatedRequest) return;

//     try {
//       const payload = {
//         id: transactionId,
//         cur_stat_code: parseInt(updatedRequest.current_status),
//         schedule_time: updatedRequest.requestedTime,
//         schedule_date: updatedRequest.requestScheduled,
//         fm_id: parseInt(updatedRequest.field_manager),
//       };

//       const response = await axios.put(
//         `${apiUrl}/updatetranscationsstatus`,
//         payload
//       );

//       if (response.status === 201) {
//         alert("Request updated successfully!");
//       } else {
//         alert("Failed to update request. Try again.");
//       }
//     } catch (err) {
//       alert("An error occurred while updating the request.");
//     }
//   };

//   const clearRole = useRoleStore((state) => state.clearRole);
//   const clearId = useRoleStore((state) => state.clearId);

//   const onClickLogout = () => {
//     Cookies.remove("jwtToken");
//     clearRole();
//     clearId();
//     navigate("/");
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   return (
//     <>
//       <header className="bg-gray-800 text-white p-3 pl-8 md:pr-10 fixed top-0 left-0 w-full z-50 shadow-md">
//         <div className="container md:mx-auto flex justify-between items-center">
//           <Link to="/user">
//             <div>
//               <img
//                 src="https://media-hosting.imagekit.io//3be5dd5979af4971/RUFRENT2.png?Expires=1733978587&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=uwUG94CUqahQzPbx7V0sDfnXr353w5iEvEw1XtG-MENcOJ9iUYPYR8q~pLla-1~0DgawjK~ZoG-T8hfLbGyePiI3j~ioFu90yOLepFXOII9sIWjzkgMP3OtFP4gn9NVnYAGjdsYvxZXtMw1~YRM2I1pzx6L2hgobXyMcBOj68~K40q69sE4xnxwwwAwlB5b0n1QkXWNX-S86Rsl30Vpdu3r81AxuKQxnN6RpcZYL34cYi2amhdV-70fxSwzSHEI82m9Z3uNPKmvs1J3VD4KAdbhk88fp27pqP7aM-0Y3Uy71-yb31symtxZmiwu2NofqyQdXoyBUUbNFzdZwVOuV8A__"
//                 alt="logo"
//                 className={`${tailwindStyles.logo}`}
//               />
//             </div>
//           </Link>
//           <h1 className="text-lg lg:text-xl font-bold">RM Dashboard</h1>
//           <div
//             onClick={toggleDropdown}
//             className="text-2xl cursor-pointer"
//             style={{ color: "#FFC156" }}
//           >
//             <FaUserAlt />
//           </div>
//         </div>
//         {isOpen && (
//           <div className="absolute right-0 mt-0 w-48 bg-white text-black border border-gray-200 rounded-lg shadow-lg z-10">
//             <ul className="py-2">
//               <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                 {userName || "Profile"} , {role}
//               </li>

//               <li
//                 onClick={onClickLogout}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               >
//                 Logout
//               </li>
//             </ul>
//           </div>
//         )}
//       </header>

//       <div className="flex flex-col px-5 py-3 md:flex-row sm:items-left md:items-center justify-between sticky top-16 md:top-16 bg-gray-400">
//         <div className="flex items-center">
//           <label className="py-1 px-1">Select Community</label>
//           <select
//             className="py-1 flex self-center px-1 border-2 rounded mb-2 ml-2"
//             onChange={(e) =>
//               handleInputChange(null, "current_community_id", e.target.value)
//             }
//           >
//             <option value="" disabled>
//               Select Community
//             </option>
//             {rmCommunities.map((eachCommunitie) => (
//               <option
//                 key={eachCommunitie.community_id}
//                 value={eachCommunitie.community_id}
//               >
//                 {eachCommunitie.community_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <input
//           type="search"
//           placeholder="Search Requests"
//           className="px-1 border-2 rounded"
//         />
//       </div>

//       <ul className="mx-auto px-2 md:px-10 mt-20 mb-20">
//         <section className="hidden lg:block bg-green-300 p-2 shadow rounded-t-lg text-gray-900">
//           <div className="grid sm:gap-4 md:grid-cols-3 lg:gap-2 lg:grid-cols-8 items-start lg:items-center py-4">
//             <div className="hidden lg:block font-bold ml-3">Property</div>
//             <div className="hidden lg:block font-bold ml-3">Owner</div>
//             <div className="hidden lg:block font-bold ml-3">Tenant</div>
//             <div className="hidden lg:block font-bold ml-2">Status</div>
//             <div className="hidden lg:block font-bold ml-4">Schedule</div>
//             <div className="hidden lg:block font-bold ml-4">Time</div>
//             <div className="hidden lg:block font-bold text-center">
//               Field Manager
//             </div>
//             <div className="hidden lg:block font-bold ml-11">Action</div>
//           </div>
//         </section>

//         {requestRmDetails.map((each, index) => {
//           const isEditable =
//             each.current_status === "7" || each.current_status === "9";

//           return (
//             <li
//               key={each.transaction_id}
//               className={`p-4 ${index % 2 === 0 ? "bg-blue-50" : "bg-gray-50"}`}
//             >
//               <div className="grid sm:gap-4 md:grid-cols-3 lg:gap-2 lg:grid-cols-8 items-start lg:items-center py-4">
//                 <div>
//                   <p>
//                     <strong className="lg:hidden">Property:</strong>{" "}
//                     {each.community_name}
//                   </p>
//                 </div>
//                 <div className="border-b sm:border-gray-300 rounded-lg md:border-none">
//                   <p>
//                     <strong className="lg:hidden">Owner:</strong>{" "}
//                     {each.owner_name}
//                     <br />
//                     <span className="text-lg">
//                       {each.owner_mobile || "xxxxxx"}
//                     </span>
//                   </p>
//                 </div>
//                 <div className="border-b sm:border-gray-300 rounded-lg md:border-none lg:mb-0">
//                   <p>
//                     <strong className="lg:hidden">Tenant:</strong>{" "}
//                     {each.tenant_name}
//                     <br />
//                     <span className="text-lg">
//                       {each.tenant_mobile || "xxxxxx"}
//                     </span>
//                   </p>
//                 </div>
//                 <div className="border-b sm:border-gray-300 rounded-lg md:border-none lg:mb-0 flex flex-col lg:flex-row gap-2 ">
//                   <p>
//                     <strong className="lg:hidden">Status:</strong>
//                     <select
//                       className="border border-gray-300 rounded-lg p-1 lg:w-24 "
//                       value={each.current_status || ""}
//                       onChange={(e) =>
//                         handleInputChange(
//                           each.transaction_id,
//                           "current_status",
//                           e.target.value
//                         )
//                       }
//                     >
//                       <option value="" disabled>
//                         Select Status
//                       </option>

//                       {rmStatuses.map((status) => (
//                         <option key={status.id} value={status.id}>
//                           {status.status_code}
//                         </option>
//                       ))}
//                     </select>
//                   </p>
//                 </div>

//                 <div className="border-b sm:border-gray-300 rounded-lg md:border-none lg:mb-0 flex flex-col lg:flex-row gap-2">
//                   <p>
//                     <strong className="lg:hidden">Schedule:</strong>

//                     <input
//                       type="date"
//                       className={`border border-gray-300 rounded-lg h-8 ${!isEditable && "bg-gray-200 cursor-not-allowed"}`}
//                       min={minDate}
//                       max={maxDate}
//                       value={each.requestScheduled || each.schedule_date}
//                       onChange={(e) =>
//                         isEditable &&
//                         handleInputChange(
//                           each.transaction_id,
//                           "requestScheduled",
//                           e.target.value
//                         )
//                       }
//                       disabled={!isEditable}
//                     />
//                   </p>
//                 </div>
//                 <div className="border-b sm:border-gray-300 rounded-lg md:border-none lg:mb-0 flex flex-col lg:flex-row gap-2">
//                   <p>
//                     <strong className="lg:hidden">Time:</strong>
//                     <input
//                       type="time"
//                       className={`border border-gray-300 rounded-lg h-8 ${!isEditable && "bg-gray-200 cursor-not-allowed"}`}
//                       value={each.requestedTime || each.schedule_time}
//                       onChange={(e) =>
//                         isEditable &&
//                         handleInputChange(
//                           each.transaction_id,
//                           "requestedTime",
//                           e.target.value
//                         )
//                       }
//                       disabled={!isEditable}
//                     />
//                   </p>
//                 </div>
//                 <div className="border-b sm:border-gray-300 rounded-lg md:border-none lg:mb-0 flex flex-col lg:flex-row gap-2">
//                   <select
//                     className="border border-gray-300 rounded-lg p-1"
//                     value={each.field_manager || ""}
//                     onChange={(e) =>
//                       handleInputChange(
//                         each.transaction_id,
//                         "field_manager",
//                         e.target.value
//                       )
//                     }
//                   >
//                     <option value="">Select FM</option>
//                     {fieldManagers.map((fm) => (
//                       <option key={fm.fm_id} value={fm.fm_id}>
//                         {fm.fm_name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <button
//                   className="bg-green-500 text-white py-1 w-16 rounded ml-28 lg:ml-10 mt-2 lg:mt-0 lg:w-13"
//                   onClick={() => handleSave(each.transaction_id)}
//                 >
//                   Save
//                 </button>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </>
//   );
// };

// export default RMView;
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { minDate, maxDate, currentTime } from "./utils/getDateTime";
import tailwindStyles from "../utils/tailwindStyles";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useRoleStore } from "../store/roleStore";
import {
  getAllTransactionBasedOnId,
  listOfFmBasedOnCommunityId,
  updateTransaction,
  getRecords,
} from "../config/apiRoute";
import SearchableDropdown from "./SearchableDropdown";

const timeSlots = [
  { id: "8:00AM", slot: "8:00 AM" },
  { id: "8:15AM", slot: "8:15 AM" },
  { id: "8:30AM", slot: "8:30 AM" },
  { id: "8:45AM", slot: "8:45 AM" },
  { id: "9:00AM", slot: "9:00 AM" },
  { id: "9:15AM", slot: "9:15 AM" },
  { id: "9:30AM", slot: "9:30 AM" },
  { id: "9:45AM", slot: "9:45 AM" },
  { id: "10:00AM", slot: "10:00 AM" },
  { id: "10:15AM", slot: "10:15 AM" },
  { id: "10:30AM", slot: "10:30 AM" },
  { id: "10:45AM", slot: "10:45 AM" },
  { id: "11:00AM", slot: "11:00 AM" },
  { id: "11:15AM", slot: "11:15 AM" },
  { id: "11:30AM", slot: "11:30 AM" },
  { id: "11:45AM", slot: "11:45 AM" },
  { id: "12:00PM", slot: "12:00 PM" },
  { id: "12:15PM", slot: "12:15 PM" },
  { id: "12:30PM", slot: "12:30 PM" },
  { id: "12:45PM", slot: "12:45 PM" },
  { id: "1:00PM", slot: "1:00 PM" },
  { id: "1:15PM", slot: "1:15 PM" },
  { id: "1:30PM", slot: "1:30 PM" },
  { id: "1:45PM", slot: "1:45 PM" },
  { id: "2:00PM", slot: "2:00 PM" },
  { id: "2:15PM", slot: "2:15 PM" },
  { id: "2:30PM", slot: "2:30 PM" },
  { id: "2:45PM", slot: "2:45 PM" },
  { id: "3:00PM", slot: "3:00 PM" },
  { id: "3:15PM", slot: "3:15 PM" },
  { id: "3:30PM", slot: "3:30 PM" },
  { id: "3:45PM", slot: "3:45 PM" },
  { id: "4:00PM", slot: "4:00 PM" },
  { id: "4:15PM", slot: "4:15 PM" },
  { id: "4:30PM", slot: "4:30 PM" },
  { id: "4:45PM", slot: "4:45 PM" },
  { id: "5:00PM", slot: "5:00 PM" },
  { id: "5:15PM", slot: "5:15 PM" },
  { id: "5:30PM", slot: "5:30 PM" },
  { id: "5:45PM", slot: "5:45 PM" },
  { id: "6:00PM", slot: "6:00 PM" },
  { id: "6:15PM", slot: "6:15 PM" },
  { id: "6:30PM", slot: "6:30 PM" },
  { id: "6:45PM", slot: "6:45 PM" },
  { id: "7:00PM", slot: "7:00 PM" },
  { id: "7:15PM", slot: "7:15 PM" },
  { id: "7:30PM", slot: "7:30 PM" },
  { id: "7:45PM", slot: "7:45 PM" },
  { id: "8:00PM", slot: "8:00 PM" },
];

const RMView = () => {
  const { userData, resetStore } = useRoleStore();
  const id = userData.id;
  const userName = userData.userName;
  const role = userData.role;

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const [requestRmDetails, setRequestRmDetails] = useState([]);
  const [rmCommunities, setRmCommunities] = useState([]);
  const [rmStatuses, setRmStatuses] = useState([]); // State to store rmStatuses
  const [fieldManagers, setFieldManagers] = useState([]); // State for FM names

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRmDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const responseData = await getAllTransactionBasedOnId(id); // Replace null with fmId if needed

        // Ensure responseData is an object with a 'result' property that is an array
        const result = responseData?.result || [];

        // Set the data correctly based on the API response structure
        setRequestRmDetails(result);

        // Extract community_name from the result array
        const communities = result
          .map((item) => item.community_name)
          .filter(Boolean);
        setRmCommunities(communities);

        // Extract unique statuses from the result array
        // const statuses = [
        //   ...new Set(result.map((item) => item.curr_stat_code).filter(Boolean)), // Ensure uniqueness and no empty values
        // ];
        setRmStatuses(responseData.status);

        // console.log("Statuses for dropdown:", statuses);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchRmDashboardData();
  }, [id]);

  useEffect(() => {
    if (rmCommunities.length === 0) return; // Ensure communities exist before fetching FM data

    const fetchFmData = async () => {
      const currentCommId =
        requestRmDetails[0]?.current_community_id ||
        rmCommunities[0]?.community_id;

      setLoading(true);
      setError(null);

      try {
        // Fetch FM data based on the current community ID
        const fmData = await listOfFmBasedOnCommunityId(currentCommId);

        // Update state with the fetched FM data
        setFieldManagers(fmData?.result || []); // Use `result` as per the provided example
      } catch (err) {
        // Handle errors
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        // Stop loading indicator
        setLoading(false);
      }
    };

    fetchFmData();
  }, [rmCommunities, requestRmDetails]);

  const handleInputChange = (transactionId, field, value) => {
    setRequestRmDetails((prevDetails) =>
      prevDetails.map((item) =>
        item.transaction_id === transactionId
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const handleSave = async (transactionId) => {
    const updatedRequest = requestRmDetails.find(
      (item) => item.transaction_id === transactionId
    );

    if (!updatedRequest) return;

    try {
      const payload = {
        transactionId,
        cur_stat_code: parseInt(updatedRequest.current_status),
        schedule_time: updatedRequest.requestedTime,
        schedule_date: updatedRequest.requestScheduled,
        fm_id: parseInt(updatedRequest.field_manager),
      };
      console.log("payload", payload);

      // Use the provided function to update the transaction
      const response = await updateTransaction(payload);

      // Handle the response
      if (response) {
        alert("Request updated successfully!");
      } else {
        alert("Failed to update request. Try again.");
      }
    } catch {
      alert("An error occurred while updating the request.");
    }
  };

  const onClickLogout = () => {
    Cookies.remove("jwtToken");
    resetStore();
    localStorage.clear();
    navigate("/");
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
          <h1 className="text-lg lg:text-xl font-bold">RM Dashboard</h1>
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
                onClick={onClickLogout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </header>

      <div className="flex flex-col px-5 py-3 md:flex-row sm:items-left md:items-center justify-between sticky top-16 md:top-16 bg-gray-400">
        <div className="flex items-center">
          <label className="py-1 px-1">Select Community</label>
          <select
            className="py-1 flex self-center px-1 border-2 rounded mb-2 ml-2"
            onChange={(e) =>
              handleInputChange(null, "current_community_id", e.target.value)
            }
          >
            <option value="" disabled>
              Select Community
            </option>
            {rmCommunities.map((eachCommunity, index) => (
              <option
                key={`${eachCommunity.community_id}-${index}`}
                value={eachCommunity.community_id}
              >
                {eachCommunity.community_name || "Unnamed Community"}
              </option>
            ))}
          </select>
        </div>

        <input
          type="search"
          placeholder="Search Requests"
          className="px-1 border-2 rounded"
        />
      </div>

      <ul className="mx-auto px-2 md:px-10 mt-20 mb-20">
        <section className="hidden lg:block bg-green-300 p-2 shadow rounded-t-lg text-gray-900">
          <div className="grid sm:gap-4 md:grid-cols-3 lg:gap-2 lg:grid-cols-8 items-start lg:items-center py-4">
            <div className="hidden lg:block font-bold ml-3">Property</div>
            <div className="hidden lg:block font-bold ml-3">Owner</div>
            <div className="hidden lg:block font-bold ml-3">Tenant</div>
            <div className="hidden lg:block font-bold ml-2">Status</div>
            <div className="hidden lg:block font-bold ml-4">Schedule</div>
            <div className="hidden lg:block font-bold ml-4">Time</div>
            <div className="hidden lg:block font-bold text-center">
              Field Manager
            </div>
            <div className="hidden lg:block font-bold ml-11">Action</div>
          </div>
        </section>

        {requestRmDetails.map((each, index) => {
          const isEditable =
            each.current_status === "7" || each.current_status === "9";

          return (
            <li
              key={each.transaction_id}
              className={`p-4 ${index % 2 === 0 ? "bg-blue-50" : "bg-gray-50"}`}
            >
              <div className="grid sm:gap-4 md:grid-cols-3 lg:gap-2 lg:grid-cols-8 items-start lg:items-center py-4">
                <div>
                  <p>
                    <strong className="lg:hidden">Property:</strong>{" "}
                    {each.community_name}
                  </p>
                </div>
                <div className="border-b sm:border-gray-300 rounded-lg md:border-none">
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
                <div className="border-b sm:border-gray-300 rounded-lg md:border-none lg:mb-0 flex flex-col lg:flex-row gap-2">
                  <p>
                    <strong className="lg:hidden">Status:</strong>

                    <SearchableDropdown
                      name="current_status"
                      options={rmStatuses || []} // Ensure rmStatuses is an array
                      value={each.curr_stat_code || ""}
                      onChange={handleInputChange}
                      placeholder="Search Status"
                      displayKey="status_code"
                      valueKey="id"
                      transactionId={each.transaction_id}
                      currentStatusId={each.curr_stat_code_id}
                    />
                  </p>
                </div>

                <div className="border-b sm:border-gray-300 rounded-lg md:border-none lg:mb-0 flex flex-col lg:flex-row gap-2">
                  <p>
                    <strong className="lg:hidden">Schedule:</strong>

                    <input
                      type="date"
                      className={`border border-gray-300 rounded-lg h-8 ${!isEditable && "bg-gray-200 cursor-not-allowed"}`}
                      min={minDate}
                      max={maxDate}
                      value={each.requestScheduled || each.schedule_date}
                      onChange={(e) =>
                        isEditable &&
                        handleInputChange(
                          each.transaction_id,
                          "requestScheduled",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  </p>
                </div>
                <div className="border-b sm:border-gray-300 rounded-lg md:border-none lg:mb-0 flex flex-col lg:flex-row gap-2">
                  <p>
                    <strong className="lg:hidden">Time:</strong>
                    <SearchableDropdown
                      name={"requestedTime"}
                      options={timeSlots}
                      value={each.schedule_time || ""}
                      onChange={handleInputChange}
                      placeholder={`Set Time`}
                      displayKey="slot"
                      valueKey="id"
                      transactionId={each.transaction_id}
                      disabled={!isEditable}
                    />
                  </p>
                </div>
                <div className="border-b sm:border-gray-300 rounded-lg md:border-none lg:mb-0 flex flex-col lg:flex-row gap-2">
                  <select
                    className="border border-gray-300 rounded-lg p-1"
                    value={each.field_manager || ""}
                    onChange={(e) =>
                      handleInputChange(
                        each.transaction_id,
                        "field_manager",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select FM</option>
                    {fieldManagers.map((fm) => (
                      <option key={fm.fm_id} value={fm.fm_id}>
                        {fm.fm_name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="bg-green-500 text-white py-1 w-16 rounded ml-28 lg:ml-10 mt-2 lg:mt-0 lg:w-13"
                  onClick={() => handleSave(each.transaction_id)}
                >
                  Save
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RMView;
