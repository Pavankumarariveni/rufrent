import { useEffect, useState } from "react";

import apiStatusConstants from "../../utils/apiStatusConstants";

import LoadingView from "../CommonViews/LoadingView";
import FailureView from "../CommonViews/FailureView";

import MyListingCardView from "./MyListingCardView";

import propertyData from "./models/myPropertyModel";

import { useRoleStore } from "../../store/roleStore";

import { fetchUserListings } from "../../services/newapiservices";
import tailwindStyles from "../../utils/tailwindStyles";

const MyListingsView = () => {
  const { userData } = useRoleStore();
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: [],
    errorMsg: null,
  });

  const userId = userData.id;
  useEffect(() => {
    const getUserListings = async () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        data: [],
        errorMsg: null,
      });
      try {
        const listings = await fetchUserListings(userId);
        if (listings.status) {
          setApiResponse({
            status: apiStatusConstants.success,
            data: listings.data.results,
            errorMsg: null,
          });
        } else {
          setApiResponse({
            status: apiStatusConstants.failure,
            data: [],
            errorMsg: result || "Failed to fetch Listings",
          });
        }
      } catch (error) {
        console.error("Error in fetching properties:", error);
        setApiResponse({
          status: apiStatusConstants.failure,
          data: [],
          errorMsg: "Failed to fetch Listings",
        });
      }
    };

    getUserListings();
  }, []);

  const renderListingView = () => {
    switch (apiResponse.status) {
      case apiStatusConstants.inProgress:
        return <LoadingView />;
      case apiStatusConstants.success:
        return (
          <>
            {apiResponse.data.length > 0 ? (
              apiResponse.data.map((each) => {
                console.log(each);
                return <MyListingCardView key={each.id} property={each} />;
              })
            ) : (
              <div className="flex items-center justify-center min-h-[70vh] font-bold text-2xl">
                Your Listings Not-Found
              </div>
            )}
          </>
        );

      case apiStatusConstants.failure:
        return <FailureView />;
      default:
        return <div>No Listings Available</div>;
    }
  };

  return (
    <>
      <div
        className={`${tailwindStyles.mainBackground} min-h-screen p-10 pt-24`}
      >
        {renderListingView()}
      </div>
    </>
  );
};

export default MyListingsView;
