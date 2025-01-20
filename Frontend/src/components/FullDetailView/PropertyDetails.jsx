// import React from "react";

// import { Heart } from "lucide-react";

// import useActionsListingsStore from "../../store/userActionsListingsStore";

// import ImageGallery from "./ImageGallery";
// import images from "./models/imagesModel";
// import { useRoleStore } from "../../store/roleStore";

// const PropertyDetails = ({ propertyData, onConnect, isFavoured }) => {
//   const {
//     postFavourites,
//     removeFavourites,
//     fetchActionsListings,
//     actionsListings,
//   } = useActionsListingsStore();
//   const { userData } = useRoleStore();

//   const {
//     prop_type,
//     home_type,
//     community_name,
//     prop_desc,
//     address,
//     open_area,
//     eat_pref,
//     parking_count,
//     deposit,
//     nbaths,
//     rental_high,
//     rental_low,
//   } = propertyData;

//   const handleaddFavouriteClick = async () => {
//     const userId = userData.id;
//     const fieldValues = `${userId},${propertyData.id},${28}`;

//     try {
//       const result = await postFavourites(fieldValues); // Call the postFavourites function
//       if (result.status == 200) {
//         fetchActionsListings(userId);
//       }
//     } catch (error) {
//       console.error("Failed to update favourites:", error);
//     }
//   };

//   const handleremoveFavouriteClick = async () => {
//     const action = actionsListings.find(
//       (actions) => actions.id == propertyData.id
//     );
//     console.log("action...", action);
//     const actionId = action.action_id;
//     const userId = userData.id;
//     try {
//       const result = await removeFavourites(actionId);
//       console.log("remove", result); // Call the postFavourites function
//       if (result.status == 200) {
//         await fetchActionsListings(userId);
//       }
//     } catch (error) {
//       console.error("Failed to update favourites:", error);
//     }
//   };
//   return (
//     <div className="mt-16 container mx-auto p-4">
//       <ImageGallery allImages={images} />
//       <div className="bg-gray-200 p-6 rounded-lg shadow-md mt-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold">{community_name}</h2>
//           <button
//             onClick={
//               !isFavoured ? handleaddFavouriteClick : handleremoveFavouriteClick
//             }
//           >
//             {isFavoured ? (
//               <Heart color="red" fill="red" size={30} />
//             ) : (
//               <Heart size={30} />
//             )}
//           </button>
//         </div>
//         <ul className="text-gray-600 space-y-2 mb-4">
//           <li>Location: {address}</li>
//           <li>Property Description: {prop_desc}</li>
//           <li>Property Type: {prop_type}</li>
//           <li>
//             Price: {rental_low} - {rental_high}
//           </li>
//           <li>Bedrooms: {home_type}</li>
//           <li>Bathrooms: {nbaths}</li>
//           <li>Open Area: {open_area}</li>
//           <li>Eat Preference: {eat_pref}</li>
//           <li>Parking: {parking_count} Vehicle</li>
//           <li>Deposit Duration: {deposit} Months</li>
//         </ul>
//         <div className="flex justify-between items-center mt-6">
//           <button
//             onClick={onConnect}
//             className="bg-purple-600 text-white px-4 py-4 rounded-lg"
//           >
//             Connect To RM
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyDetails;

import React from "react";
import { Heart } from "lucide-react";
import useActionsListingsStore from "../../store/userActionsListingsStore";
import ImageGallery from "./ImageGallery";
import images from "./models/imagesModel";
import { useRoleStore } from "../../store/roleStore";

const PropertyDetails = ({
  propertyData,
  onConnect,
  isFavoured,
  showRmNumber,
}) => {
  console.log("RM Details..", showRmNumber);
  const {
    postFavourites,
    removeFavourites,
    fetchActionsListings,
    actionsListings,
  } = useActionsListingsStore();
  const { userData } = useRoleStore();

  const {
    prop_type,
    home_type,
    community_name,
    prop_desc,
    address,
    open_area,
    eat_pref,
    parking_count,
    deposit,
    nbaths,
    rental_high,
    rental_low,
  } = propertyData;

  const handleaddFavouriteClick = async () => {
    const userId = userData.id;
    const fieldValues = `${userId},${propertyData.id},${28}`;

    try {
      const result = await postFavourites(fieldValues);
      if (result.status === 200) {
        await fetchActionsListings(userId); // Ensure to await the fetch
      }
    } catch (error) {
      console.error("Failed to update favourites:", error);
    }
  };

  const handleremoveFavouriteClick = async () => {
    const action = actionsListings.find(
      (actions) => actions.id === propertyData.id
    );
    if (!action) {
      console.error("Action not found for the property.");
      return;
    }

    const actionId = action.action_id;

    try {
      await removeFavourites(actionId);
    } catch (error) {
      console.error("Failed to update favourites:", error);
    }
  };

  return (
    <div className="mt-16 container mx-auto p-4">
      <ImageGallery allImages={images} />
      <div className="bg-gray-200 p-6 rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{community_name}</h2>
          <button
            onClick={
              !isFavoured ? handleaddFavouriteClick : handleremoveFavouriteClick
            }
          >
            {isFavoured ? (
              <Heart color="red" fill="red" size={30} />
            ) : (
              <Heart size={30} />
            )}
          </button>
        </div>
        <ul className="text-gray-600 space-y-2 mb-4">
          <li>Location: {address}</li>
          <li>Property Description: {prop_desc}</li>
          <li>Property Type: {prop_type}</li>
          <li>
            Price: {rental_low} - {rental_high}
          </li>
          <li>Bedrooms: {home_type}</li>
          <li>Bathrooms: {nbaths}</li>
          <li>Open Area: {open_area}</li>
          <li>Eat Preference: {eat_pref}</li>
          <li>Parking: {parking_count} Vehicle</li>
          <li>Deposit Duration: {deposit} Months</li>
        </ul>
        <div className="mt-6">
          {showRmNumber ? (
            <div>
              <i className="flex justify-self-end">
                We have received your request. Here are your RM (Relationship
                Manager) Details.
              </i>
              <div className="flex flex-col items-center justify-self-end bg-purple-500 font-semibold text-gray-900 px-5 py-2 rounded-lg">
                <h2>{showRmNumber.user_name},</h2>
                <h2>{showRmNumber.RM_mobile_no}</h2>
              </div>
            </div>
          ) : (
            <button
              onClick={() => onConnect(propertyData.id)}
              className="bg-purple-600 text-white px-4 py-4 rounded-lg flex justify-self-end"
            >
              Connect To RM
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
