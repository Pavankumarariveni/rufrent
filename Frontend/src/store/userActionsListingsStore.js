import { create } from "zustand";
import CryptoJS from "crypto-js";
import apiStatusConstants from "../utils/apiStatusConstants";
import { fetchFromAPI } from "../services/newapiservices"; // Assuming
import { addNewRecord, deleteRecord } from "../config/apiRoute";

// Encryption & Decryption Utilities
const secretKey = `${import.meta.env.VITE_CRYPTO_SECRET_KEY}`; // Replace with your secret key

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decryptData = (data) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Decryption failed:", error);
    return null; // Return null if decryption fails
  }
};

// Store definition
const useActionsListingsStore = create((set, get) => ({
  actionsListings: [],
  userProperties: [],
  apiResponse: {
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  },

  // Fetch actions and user properties from the API
  fetchActionsListings: async (id) => {
    set({
      apiResponse: {
        status: apiStatusConstants.inProgress,
        data: null,
        errorMsg: null,
      },
    });

    const userId = id; // Get user ID from userRoleStore
    const url = `/actions?user_id=${userId}`;

    try {
      const result = await fetchFromAPI(url);

      if (result?.results && result?.userProperties) {
        const { results, userProperties } = result;

        // Encrypt and store data in localStorage
        const encryptedActionsListings = encryptData(results);
        const encryptedUserProperties = encryptData(userProperties);
        localStorage.setItem("actionsListings", encryptedActionsListings);
        localStorage.setItem("userProperties", encryptedUserProperties);

        set({
          actionsListings: results,
          userProperties,
          apiResponse: {
            status: apiStatusConstants.success,
            data: { results, userProperties },
            errorMsg: null,
          },
        });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching actions listings:", error);
      set({
        apiResponse: {
          status: apiStatusConstants.failure,
          data: null,
          errorMsg: error.message || "Failed to fetch actions listings",
        },
      });
    }
  },

  // Load data from localStorage
  loadActionsListings: () => {
    const encryptedActionsListings = localStorage.getItem("actionsListings");
    const encryptedUserProperties = localStorage.getItem("userProperties");

    if (encryptedActionsListings && encryptedUserProperties) {
      const decryptedActionsListings = decryptData(encryptedActionsListings);
      const decryptedUserProperties = decryptData(encryptedUserProperties);

      if (decryptedActionsListings && decryptedUserProperties) {
        set({
          actionsListings: decryptedActionsListings,
          userProperties: decryptedUserProperties,
        });
      }
    }
  },

  // Clear all stored data
  clearActionsListings: () => {
    localStorage.removeItem("actionsListings");
    localStorage.removeItem("userProperties");
    set({
      actionsListings: [],
      userProperties: [],
      apiResponse: {
        status: apiStatusConstants.initial,
        data: null,
        errorMsg: null,
      },
    });
  },

  // Reset the entire store
  resetStore: () => {
    localStorage.removeItem("actionsListings");
    localStorage.removeItem("userProperties");
    set(
      {
        actionsListings: [],
        userProperties: [],
        apiResponse: {
          status: apiStatusConstants.initial,
          data: null,
          errorMsg: null,
        },
      },
      true
    );
  },

  // Initialize the store by loading from localStorage
  initializeStore: () => {
    get().loadActionsListings();
  },
  // Post favourites function
  postFavourites: async (fieldValues) => {
    const tableName = "dy_user_actions";
    const fieldNames = "user_id, property_id, status_code";

    try {
      const response = await addNewRecord(tableName, fieldNames, fieldValues);
      if (response) {
        console.log(response);
        return response; // Return the response for further handling if needed
      } else {
        throw new Error("Failed to upload favourites");
      }
    } catch (error) {
      console.error("Error uploading favourites:", error);
    }
  },

  removeFavourites: async (actionid) => {
    const tableName = "dy_user_actions";
    const whereCondition = `id=${actionid}`;

    try {
      const response = await deleteRecord(tableName, whereCondition);
      if (response) {
        // Update the actionsListings state to remove the favorite
        set((state) => ({
          actionsListings: state.actionsListings.filter(
            (action) => action.action_id !== actionid
          ),
        }));
        console.log("store..remove", response);
        return response; // Return the response for further handling if needed
      } else {
        throw new Error("Failed to upload favourites");
      }
    } catch (error) {
      console.error("Error uploading favourites:", error);
    }
  },
}));

// Call `initializeStore` when the store is created
useActionsListingsStore.getState().initializeStore();

export default useActionsListingsStore;
