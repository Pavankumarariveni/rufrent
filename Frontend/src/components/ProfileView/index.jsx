import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import tailwindStyles from "../../utils/tailwindStyles";

import { useRoleStore } from "../../store/roleStore";
import useListingStore from "../../store/listingsStore";
import useFilterStore from "../../store/filterStore";
import useActionsListingsStore from "../../store/userActionsListingsStore";

const ProfileView = () => {
  const navigate = useNavigate();
  const resetListings = useListingStore((state) => state.resetStore);
  const resetFilters = useFilterStore((state) => state.resetStore);
  const resetActionsStore = useActionsListingsStore(
    (state) => state.resetStore
  );
  // const resetRole = useRoleStore((state) => state.resetStore);
  const { userData, resetStore } = useRoleStore();

  const handleLogout = () => {
    try {
      // Clear all cookies
      Cookies.remove("jwtToken");

      // Reset all stores
      resetListings();
      resetFilters();
      resetStore();
      resetActionsStore();

      // Clear localStorage
      localStorage.clear();

      // Navigate to login
      navigate("/", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <div className="mt-20 flex flex-col items-center h-[80vh]">
        <div className="p-5">
          <h2>Profile</h2>
          <p>Username: {userData.userName}</p>
          <p>Role: {userData.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className={`${tailwindStyles.thirdButton} px-4 py-2 rounded-md font-bold text-sm`}
        >
          Logout
        </button>
      </div>
    </>
  );
};
export default ProfileView;
