/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// PropertyCard.js
import React from "react";
import { Link } from "react-router-dom";
import tailwindStyles from "../../utils/tailwindStyles";

const PropertyCard = ({ property }) => {
  return (
    <div
      className={`${tailwindStyles.whiteCard} shadow-md rounded-lg p-4 m-2 w-64`}
    >
      <div className="h-32 rounded-md mb-4">
        <img className="w-full h-32" src={property.imageUrl} />
      </div>{" "}
      {/* Placeholder for property image */}
      <h3 className={`${tailwindStyles.heading} text-lg font-semibold mb-2`}>
        {property.community_name} | {property.home_type}
      </h3>
      <p className={`${tailwindStyles.paragraph} text-sm mb-4`}>
        {property.address}
      </p>
      <p className={`${tailwindStyles.heading} font-bold mb-2`}>
        Rs {property.rental_high || "NA"}/month
      </p>
      <Link to={`/user/getAllProperties/${property.id}`}>
        <button
          className={`${tailwindStyles.secondaryButton} py-1 px-4 rounded `}
        >
          View Details
        </button>
      </Link>
    </div>
  );
};

export default PropertyCard;
