import React from "react";
import tailwindStyles from "../../utils/tailwindStyles";

const MyListingCardView = ({ property }) => {
  const convertDate = (userDate) => {
    const date = new Date(userDate);
    const offsetHours = 5; // 5 hours
    const offsetMinutes = 30; // 30 minutes

    // Adjust the date
    date.setHours(date.getUTCHours() + offsetHours);
    date.setMinutes(date.getUTCMinutes() + offsetMinutes);

    // Custom format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const customReadableDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return customReadableDate;
  };
  return (
    <div
      className={`${tailwindStyles.whiteCard} shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row md:space-x-6 p-4 md:p-6 w-full max-w-4xl mx-auto mb-6 relative`}
    >
      {/* Top-left Status Badge */}
      <div
        className={`absolute top-0 left-0 px-3 py-1 z-20 text-lg md:text-xl font-medium shadow-md ${
          property.current_status === "Review"
            ? "bg-yellow-200 text-yellow-800 border-2 border-yellow-500 rounded-tl-lg"
            : property.current_status === "Invalid-Input"
              ? "bg-red-200 text-red-800 border-2 border-red-500 rounded-tl-lg"
              : "bg-green-200 text-green-800 border-2 border-green-500 rounded-tl-lg"
        }`}
      >
        {property.current_status}
      </div>

      {/* Left Side: Skeleton Images */}
      <div className="flex flex-col w-full md:w-1/2 space-y-4 animate-pulse">
        {/* Skeleton for Main Image */}
        <div className="w-full h-50 md:h-80 bg-gray-200 rounded-lg"></div>

        {/* Skeleton for Thumbnails */}
        <div className="flex space-x-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-lg"
            ></div>
          ))}
        </div>
      </div>

      {/* Right Side: Property Details */}
      <div className="flex flex-col md:w-1/2 space-y-2">
        <div className="flex justify-end ">
          {/* <span className="font-medium text-sm">Posted At: </span> */}
          <i className="text-sm font-semibold text-gray-600">
            {convertDate(property.property_added_at)}
          </i>
        </div>
        {/* Community Name and Home Type */}
        <h2 className={`${tailwindStyles.heading} text-xl font-semibold`}>
          {property.builder_name} | {property.community_name} |{" "}
          {property.home_type}
        </h2>

        {/* Detailed Information */}
        <div className="space-y-1 text-sm">
          <p className={`${tailwindStyles.paragraph}`}>{property.address}</p>
          <p>
            <span className="font-medium">Property Description: </span>
            {property.prop_desc}
          </p>
          <p>
            <span className="font-medium">Price Range:</span> ₹
            {property.rental_low} - ₹{property.rental_high}
          </p>
          <p>
            <span className="font-medium">Deposit:</span>{" "}
            {property.deposit ? `${property.deposit} Month` : "NA"}
          </p>
          <p>
            <span className="font-medium">Bathrooms:</span> {property.nbaths}
          </p>
          <p>
            <span className="font-medium">Balconies:</span> {property.nbalcony}
          </p>
          <p>
            <span className="font-medium">Parking:</span>{" "}
            {property.parking_count} Vehicles
          </p>
          <p>
            <span className="font-medium">Maintenance:</span>{" "}
            {property.maintenance_type}
          </p>

          <p>
            <span className="font-medium">Tower:</span> {property.tower_no}
          </p>
          <p>
            <span className="font-medium">Floor Number:</span>{" "}
            {property.floor_no || "NA"}
          </p>
          <p>
            <span className="font-medium">Flat:</span>{" "}
            {property.flat_no || "NA"}
          </p>

          <p>
            <span className="font-medium">Food Preference:</span>{" "}
            {property.eat_pref}
          </p>
        </div>

        {/* Links */}
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Map:</span>{" "}
            <a
              href={property.map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Location
            </a>
          </p>
        </div>
      </div>

      {/* Bottom-right Edit Button */}
      {/* {property.current_status == "Invalid-Input" && (
        <button
          onClick={() => alert("Edit button clicked!")}
          className="absolute bottom-2 right-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
        >
          Edit
        </button>
      )} */}
    </div>
  );
};

export default MyListingCardView;
// import React, { useState } from "react";
// import tailwindStyles from "../../utils/tailwindStyles";

// const MyListingCardView = ({ property }) => {
//   // Sample demo images
//   const sampleImages = [
//     "https://via.placeholder.com/400x300?text=Main+Image+1",
//     "https://via.placeholder.com/400x300?text=Main+Image+2",
//     "https://via.placeholder.com/400x300?text=Main+Image+3",
//     "https://via.placeholder.com/400x300?text=Main+Image+4",
//     "https://via.placeholder.com/400x300?text=Main+Image+5",
//     "https://via.placeholder.com/400x300?text=Main+Image+5",
//   ];

//   const [mainImage, setMainImage] = useState(sampleImages[0]); // Initialize with the first sample image

//   const convertDate = (userDate) => {
//     const date = new Date(userDate);
//     const offsetHours = 5; // 5 hours
//     const offsetMinutes = 30; // 30 minutes

//     // Adjust the date
//     date.setHours(date.getUTCHours() + offsetHours);
//     date.setMinutes(date.getUTCMinutes() + offsetMinutes);

//     // Custom format
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");

//     const customReadableDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
//     return customReadableDate;
//   };

//   return (
//     <div
//       className={`${tailwindStyles.whiteCard} shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row md:space-x-6 p-4 md:p-6 w-full max-w-4xl mx-auto mb-6 relative`}
//     >
//       {/* Top-left Status Badge */}
//       <div
//         className={`absolute top-0 left-0 px-3 py-1 z-20 text-lg md:text-xl font-medium shadow-md ${
//           property.current_status === "Review"
//             ? "bg-yellow-200 text-yellow-800 border-2 border-yellow-500 rounded-tl-lg"
//             : property.current_status === "Invalid-Input"
//               ? "bg-red-200 text-red-800 border-2 border-red-500 rounded-tl-lg"
//               : "bg-green-200 text-green-800 border-2 border-green-500 rounded-tl-lg"
//         }`}
//       >
//         {property.current_status}
//       </div>

//       {/* Left Side: Main Image */}
//       <div className="flex flex-col w-full md:w-1/2 space-y-4">
//         {/* Main Image */}
//         <img
//           src={mainImage}
//           alt={mainImage} // Use the state for the main image
//           className="w-full h-80 md:h-80 object-cover rounded-lg" // Ensure the image is responsive
//         />

//         {/* Thumbnails with scrolling */}
//         <div className="flex overflow-x-auto space-x-2 pb-2">
//           {sampleImages.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Thumbnail ${index + 1}`}
//               className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg cursor-pointer"
//               onClick={() => setMainImage(image)} // Change main image on click
//             />
//           ))}
//         </div>
//       </div>

//       {/* Right Side: Property Details */}
//       <div className="flex flex-col md:w-1/2 space-y-2">
//         <div className="flex justify-end ">
//           <i className="text-sm font-semibold text-gray-600">
//             {convertDate(property.property_added_at)}
//           </i>
//         </div>
//         <h2 className={`${tailwindStyles.heading} text-xl font-semibold`}>
//           {property.builder_name} | {property.community_name} |{" "}
//           {property.home_type}
//         </h2>

//         {/* Detailed Information */}
//         <div className="space-y-1 text-sm">
//           <p className={`${tailwindStyles.paragraph}`}>{property.address}</p>
//           <p>
//             <span className="font-medium">Property Description: </span>
//             {property.prop_desc}
//           </p>
//           <p>
//             <span className="font-medium">Price Range:</span> ₹
//             {property.rental_low} - ₹{property.rental_high}
//           </p>
//           <p>
//             <span className="font-medium">Deposit:</span>{" "}
//             {property.deposit ? `${property.deposit} Month` : "NA"}
//           </p>
//           <p>
//             <span className="font-medium">Bathrooms:</span> {property.nbaths}
//           </p>
//           <p>
//             <span className="font-medium">Balconies:</span> {property.nbalcony}
//           </p>
//           <p>
//             <span className="font-medium">Parking:</span>{" "}
//             {property.parking_count} Vehicles
//           </p>
//           <p>
//             <span className="font-medium">Maintenance:</span>{" "}
//             {property.maintenance_type}
//           </p>
//           <p>
//             <span className="font-medium">Tower:</span> {property.tower_no}
//           </p>
//           <p>
//             <span className="font-medium">Floor Number:</span>{" "}
//             {property.floor_no || "NA"}
//           </p>
//           <p>
//             <span className="font-medium">Flat:</span>{" "}
//             {property.flat_no || "NA"}
//           </p>
//           <p>
//             <span className="font-medium">Food Preference:</span>{" "}
//             {property.eat_pref}
//           </p>
//         </div>

//         {/* Links */}
//         <div className="space-y-2 text-sm">
//           <p>
//             <span className="font-medium">Map:</span>{" "}
//             <a
//               href={property.map_url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 underline"
//             >
//               View Location
//             </a>
//           </p>
//         </div>
//       </div>

//       {/* Bottom-right Edit Button */}
//       {/* {property.current_status == "Invalid-Input" && (
//         <button
//           onClick={() => alert("Edit button clicked!")}
//           className="absolute bottom-2 right-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
//         >
//           Edit
//         </button>
//       )} */}
//     </div>
//   );
// };

// export default MyListingCardView;
