import React from "react";
import PropertyListingCard from "./userLandingCardView";
import PaginationControls from "./PaginationControls";

const SuccessView = ({ apiResponse }) => {
  return (
    <div className="w-full overflow-y-auto max-h-full scroll-smooth [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-gray-300 [&::-webkit-scrollbar-thumb]:bg-blue-300">
      <div className="space-y-4">
        {apiResponse.data.length > 0 ? (
          apiResponse.data.map((property) => (
            <PropertyListingCard key={property.id} property={property} />
          ))
        ) : (
          <div className="flex items-center justify-center min-h-[70vh] font-bold text-2xl">
            <img
              className="h-72"
              src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-illustration-download-in-svg-png-gif-file-formats--office-computer-digital-work-business-pack-illustrations-7265556.png"
            />
          </div>
        )}
      </div>
      <PaginationControls />
    </div>
  );
};

export default SuccessView;
