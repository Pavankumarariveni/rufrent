import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import tailwindStyles from "../../utils/tailwindStyles";
import AuthModal from "../CommonViews/AuthModalView";

const PropertyListingCard = ({ property }) => {
  const navigate = useNavigate();
  const [locationDetails, setLocationDetails] = useState({
    city: null,
    block: null,
    division: null,
    region: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        const response = await axios.get(property.pincode_url);
        const postOfficeData = response.data[0]?.PostOffice;
        if (postOfficeData && postOfficeData.length > 0) {
          const firstOffice = postOfficeData[0];
          setLocationDetails({
            city: firstOffice.Name || "Unknown City",
            block: firstOffice.Block || "Unknown Block",
            division: firstOffice.Division || "Unknown Division",
            region: firstOffice.Region || "Unknown Region",
          });
        } else {
          setLocationDetails({
            city: "Unknown City",
            block: "Unknown Block",
            division: "Unknown Division",
            region: "Unknown Region",
          });
        }
      } catch (error) {
        console.error("Error fetching location details:", error);
        setLocationDetails({
          city: "Error Fetching City",
          block: "Error Fetching Block",
          division: "Error Fetching Division",
          region: "Error Fetching Region",
        });
      }
    };

    if (property.pincode_url) {
      fetchLocationDetails();
    }
  }, [property]);

  const onClickViewDetails = () => {
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      openModal();
    } else {
      navigate(`/user/getAllProperties/${property.id}`);
    }
  };

  return (
    <>
      <div
        className={`${tailwindStyles.card} flex flex-col md:flex-row p-4 rounded shadow-sm w-full`}
      >
        <div className={`${tailwindStyles.demoImage}`}>300 X 170</div>

        <div className="md:ml-4 flex-grow">
          <h2
            className={`${tailwindStyles.heading} text-sm md:text-xl font-semibold`}
          >
            {property.community_name} | {property.prop_type} |{" "}
            {property.home_type} | {property.prop_desc}
          </h2>

          <p className={`${tailwindStyles.paragraph}`}>
            Area: {locationDetails.city || "NA"}
          </p>

          <div className="mt-2 flex space-x-4 justify-end">
            <button
              className={`${tailwindStyles.secondaryButton} py-2 px-4 rounded`}
              onClick={onClickViewDetails}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default PropertyListingCard;
