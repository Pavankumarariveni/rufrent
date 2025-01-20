import React, { useState, useEffect } from "react";
import PropertyCard from "../CommonViews/PropertyCardView";

import tailwindStyles from "../../utils/tailwindStyles";
import useActionsListingsStore from "../../store/userActionsListingsStore";

const RecentlyViewedView = () => {
  const { actionsListings } = useActionsListingsStore();
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentlyViewed = () => {
      setLoading(true); // Start loading
      try {
        // Filter for "Viewed" properties and remove duplicates
        const viewedProperties = actionsListings.filter(
          (action) => action.status_code_id === 27
        );

        const uniqueProperties = [];
        const propertyIds = new Set();

        viewedProperties.forEach((property) => {
          if (!propertyIds.has(property.property_id)) {
            propertyIds.add(property.property_id);
            uniqueProperties.push(property);
          }
        });

        setRecentProperties(uniqueProperties);
      } catch (err) {
        console.error("Error processing recently viewed properties:", err);
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchRecentlyViewed();
  }, [actionsListings]);

  if (loading) {
    return (
      <div className={`${tailwindStyles.mainBackground} min-h-screen`}>
        <main className="container mx-auto p-4 mt-20 text-center">
          <p>Loading recently viewed properties...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${tailwindStyles.mainBackground} min-h-screen`}>
        <main className="p-10 pt-24 min-h-screen">
          <p className="text-red-500">{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className={`${tailwindStyles.mainBackground} min-h-screen`}>
      <main className="p-10 pt-24 min-h-screen">
        <div className="flex flex-wrap justify-center">
          {recentProperties.length > 0 ? (
            recentProperties.map((property) => (
              <PropertyCard key={property.property_id} property={property} />
            ))
          ) : (
            <p className="flex items-center justify-center min-h-[70vh] font-bold text-2xl">
              No Recent Views Found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecentlyViewedView;
