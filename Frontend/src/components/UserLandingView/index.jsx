import React, { useEffect, useState, useCallback } from "react";
import apiStatusConstants from "../../utils/apiStatusConstants";
import useListingStore from "../../store/listingsStore";
import useFilterStore from "../../store/filterStore";

import Navbar from "../CommonViews/Navbar";
import FilterSection from "./FilterView";
import SuccessView from "./SuccessView";
import LoadingView from "../CommonViews/LoadingView";
import FailureView from "../CommonViews/FailureView";

const UserLandingView = () => {
  const {
    apiResponse,
    pagination,
    currentPage,
    fetchListings,
    setCurrentPage,
  } = useListingStore();

  const { filterData } = useFilterStore();

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await fetchListings(filterData, currentPage, 6);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []); // Run only on mount

  // Handle page changes
  useEffect(() => {
    if (apiResponse.status !== apiStatusConstants.initial) {
      fetchListings(filterData, currentPage, 6);
    }
  }, [currentPage, filterData]);

  const renderListings = () => {
    switch (apiResponse.status) {
      case apiStatusConstants.inProgress:
        return <LoadingView />;
      case apiStatusConstants.success:
        return (
          <SuccessView
            apiResponse={apiResponse}
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            setCurrentPage={setCurrentPage}
          />
        );
      case apiStatusConstants.failure:
        return <FailureView />;
      default:
        return null;
    }
  };

  const [maxHeight, setMaxHeight] = useState("calc(100vh - 6.5rem)");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 450) {
        setMaxHeight("calc(100vh - 4rem)"); // Mobile
      } else {
        setMaxHeight("calc(100vh - 6.5rem)"); // Desktop
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-200 items-center">
      <Navbar />
      <div className="w-full mt-16 md:p-5">
        <div style={{ height: maxHeight }} className="grid md:grid-cols-10">
          <div
            style={{ maxHeight: maxHeight }}
            className="md:col-span-3  md:bg-gray-300 rounded-sm md:shadow-md"
          >
            <FilterSection currentPageChange={() => setCurrentPage(1)} />
          </div>
          <div
            style={{ maxHeight: maxHeight }}
            className="md:col-span-7 bg-white rounded-l p-3 md:p-4"
          >
            {renderListings()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLandingView;
