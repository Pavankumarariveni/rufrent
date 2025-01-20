import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRoleStore } from "../../store/roleStore";
import useListingStore from "../../store/listingsStore"; // Import the listing store
import apiStatusConstants from "../../utils/apiStatusConstants";

import LoadingView from "../CommonViews/LoadingView";
import FailureView from "../CommonViews/FailureView";

import PropertyDetails from "./PropertyDetails";

import useActionsListingsStore from "../../store/userActionsListingsStore";

import { postRMTask } from "../../services/newapiservices";

const FullDetailView = () => {
  const { userData } = useRoleStore();
  const { actionsListings, userProperties, fetchActionsListings } =
    useActionsListingsStore();
  console.log("full_detail_store_action...", actionsListings);
  console.log("full_detail_store_Properties...", userProperties);

  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  });

  // Access listings from the Zustand store
  const { listings } = useListingStore();
  const { propertyId } = useParams();

  const isFavoured = actionsListings.find(
    (actionProperty) =>
      actionProperty.id == propertyId && actionProperty.status_code_id == 28
  );

  console.log("IsFavoured...", isFavoured);

  useEffect(() => {
    const fetchData = () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        data: null,
        errorMsg: null,
      });

      // Find the property in the listings using propertyId
      const propertyData = listings.find(
        (property) => property.id == propertyId
      );

      if (propertyData) {
        setApiResponse({
          status: apiStatusConstants.success,
          data: propertyData,
          errorMsg: null,
        });
      } else {
        // If not found in listings, check in actionsListings
        const actionPropertyData = actionsListings.find(
          (actionProperty) =>
            actionProperty.id == propertyId &&
            actionProperty.status_code_id === 28
        );

        if (actionPropertyData) {
          setApiResponse({
            status: apiStatusConstants.success,
            data: actionPropertyData,
            errorMsg: null,
          });
        } else {
          setApiResponse({
            status: apiStatusConstants.failure,
            data: null,
            errorMsg: "Property not found",
          });
        }
      }
    };

    fetchData();
  }, [propertyId, listings, actionsListings]); // Add actionsListings as a dependency

  const showRmNumber = userProperties.find(
    (property) => property.prop_id == propertyId
  );

  const connectToRM = async (propertyId) => {
    const id = userData.id;
    try {
      const result = await postRMTask(id, propertyId);
      if (result.status == 200) {
        fetchActionsListings(id);
      }
    } catch (error) {
      console.log("Error in FullDetail:", error.message);
    }
  };

  const renderDetailView = () => {
    switch (apiResponse.status) {
      case apiStatusConstants.inProgress:
        return <LoadingView />;
      case apiStatusConstants.success:
        return (
          <PropertyDetails
            propertyData={apiResponse.data}
            isFavoured={isFavoured}
            showRmNumber={showRmNumber}
            onConnect={connectToRM}
          />
        );
      case apiStatusConstants.failure:
        return <FailureView />;
      default:
        return null;
    }
  };

  return <div className="bg-gray-100 min-h-screen">{renderDetailView()}</div>;
};

export default FullDetailView;
