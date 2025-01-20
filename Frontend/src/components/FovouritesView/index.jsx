import React, { useEffect, useState } from "react";
import PropertyCard from "../CommonViews/PropertyCardView";

import tailwindStyles from "../../utils/tailwindStyles";

import useActionsListingsStore from "../../store/userActionsListingsStore";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { actionsListings } = useActionsListingsStore(); // Get data from the store

  useEffect(() => {
    const getFavorites = () => {
      try {
        // Filter for favorites based on `status_code_id`
        const favoriteProperties = actionsListings.filter(
          (action) => action.status_code_id === 28
        );

        setFavorites(favoriteProperties);
      } catch (err) {
        console.error("Error processing favorites:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getFavorites();
  }, [actionsListings]); // Depend on actionsListings to update if the store changes

  if (loading) {
    return (
      <div className={`${tailwindStyles.mainBackground} min-h-screen`}>
        <main className="container mx-auto p-4 mt-20 text-center">
          <p>Loading favorites...</p>
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
    <div className={`${tailwindStyles.mainBackground}`}>
      <main className="p-10 pt-24 min-h-screen">
        {/* <h1 className={`${tailwindStyles.heading} text-2xl font-bold mb-6`}>
          My Favorites
        </h1> */}
        <div className="flex flex-wrap justify-center">
          {favorites.length > 0 ? (
            favorites.map((property) => (
              <PropertyCard key={property.action_id} property={property} />
            ))
          ) : (
            <p className="flex items-center justify-center min-h-[70vh] font-bold text-2xl">
              No Favorites Found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default FavoritesPage;
