// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// import apiStatusConstants from "../utils/apiStatusConstants";
// import { fetchAllProperties } from "../services/newapiservices";

// // Create a base store without persistence
// const createBaseStore = (set, get) => ({
//   // Non-persisted state
//   apiResponse: {
//     status: apiStatusConstants.initial,
//     data: [],
//     errorMsg: null,
//   },
//   pagination: {
//     totalPages: 0,
//     totalRecords: 0,
//   },
//   currentPage: 1,
//   pageLimit: 6,
//   filterData: {},

//   // Persisted state will be handled separately
//   listings: [],

//   // Actions
//   setListings: (listings) => set({ listings }),

//   setCurrentPage: async (page) => {
//     set({ currentPage: page });
//     const state = get();

//     try {
//       const result = await fetchAllProperties(state.filterData, {
//         page,
//         limit: state.pageLimit,
//       });

//       if (result.status) {
//         set({
//           listings: result.data.results,
//           apiResponse: {
//             status: apiStatusConstants.success,
//             data: result.data.results,
//             errorMsg: null,
//           },
//           pagination: {
//             totalPages: result.data.pagination.totalPages,
//             totalRecords: result.data.pagination.totalRecords,
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching page:", error);
//     }
//   },

//   fetchListings: async (filterData, page = 1, pageLimit = 6) => {
//     set({
//       apiResponse: {
//         status: apiStatusConstants.inProgress,
//         data: [],
//         errorMsg: null,
//       },
//       filterData,
//       currentPage: page,
//     });

//     try {
//       const result = await fetchAllProperties(filterData, {
//         page,
//         limit: pageLimit,
//       });

//       if (result.status) {
//         set({
//           listings: result.data.results,
//           apiResponse: {
//             status: apiStatusConstants.success,
//             data: result.data.results,
//             errorMsg: null,
//           },
//           pagination: {
//             totalPages: result.data.pagination.totalPages,
//             totalRecords: result.data.pagination.totalRecords,
//           },
//         });
//       } else {
//         set({
//           listings: [],
//           apiResponse: {
//             status: apiStatusConstants.failure,
//             data: [],
//             errorMsg: result || "Failed to fetch properties",
//           },
//           pagination: {
//             totalPages: 0,
//             totalRecords: 0,
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Error in fetching properties:", error);
//       set({
//         listings: [],
//         apiResponse: {
//           status: apiStatusConstants.failure,
//           data: [],
//           errorMsg: "Failed to fetch properties",
//         },
//         pagination: {
//           totalPages: 0,
//           totalRecords: 0,
//         },
//       });
//     }
//   },

//   // Add clear action
//   clearListings: () => {
//     set({
//       listings: [],
//       apiResponse: {
//         status: apiStatusConstants.initial,
//         data: [],
//         errorMsg: null,
//       },
//       pagination: {
//         totalPages: 0,
//         totalRecords: 0,
//       },
//       currentPage: 1,
//       filterData: {},
//     });
//   },

//   // Add reset action
//   resetStore: () => {
//     set(
//       {
//         listings: [],
//         apiResponse: {
//           status: apiStatusConstants.initial,
//           data: [],
//           errorMsg: null,
//         },
//         pagination: {
//           totalPages: 0,
//           totalRecords: 0,
//         },
//         currentPage: 1,
//         filterData: {},
//       },
//       true
//     ); // true parameter forces state reset
//   },
// });

// // Create the store with persistence only for listings
// const useListingStore = create(
//   persist(
//     (set, get) => ({
//       ...createBaseStore(set, get),
//     }),
//     {
//       name: "listings-storage",
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({ listings: state.listings }), // Only persist listings
//     }
//   )
// );

// export default useListingStore;

import { create } from "zustand";
import CryptoJS from "crypto-js";

import apiStatusConstants from "../utils/apiStatusConstants";
import { fetchAllProperties } from "../services/newapiservices";

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

// Create a base store without persistence
const createBaseStore = (set, get) => ({
  // Non-persisted state
  apiResponse: {
    status: apiStatusConstants.initial,
    data: [],
    errorMsg: null,
  },
  pagination: {
    totalPages: 0,
    totalRecords: 0,
  },

  currentPage: 1,
  pageLimit: 6,
  filterData: {},

  // Listings will be loaded and managed with encryption
  listings: [],

  // Actions
  setListings: (listings) => {
    const encryptedData = encryptData(listings); // Encrypt listings before saving
    localStorage.setItem("listings", encryptedData); // Save to localStorage
    set({ listings }); // Update the state
  },
  setCurrentPage: async (page) => {
    set({ currentPage: page }); // Update the current page

    const state = get();

    try {
      // Fetch data for the new page
      const result = await fetchAllProperties(state.filterData, {
        page,
        limit: state.pageLimit,
      });

      if (result.status) {
        const listings = result.data.results;

        // Encrypt and save new listings to localStorage
        const encryptedData = encryptData(listings);
        localStorage.setItem("listings", encryptedData);

        // Update the state with new listings
        set({
          listings,
          apiResponse: {
            status: apiStatusConstants.success,
            data: listings,
            errorMsg: null,
          },
          pagination: {
            totalPages: result.data.pagination.totalPages,
            totalRecords: result.data.pagination.totalRecords,
          },
        });
      } else {
        console.error("Failed to fetch data:", result);
        set({
          apiResponse: {
            status: apiStatusConstants.failure,
            data: [],
            errorMsg: result || "Failed to fetch properties",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching page data:", error);
      set({
        apiResponse: {
          status: apiStatusConstants.failure,
          data: [],
          errorMsg: "Failed to fetch properties",
        },
      });
    }
  },

  fetchListings: async (filterData, page = 1, pageLimit = 6) => {
    set({
      apiResponse: {
        status: apiStatusConstants.inProgress,
        data: [],
        errorMsg: null,
      },
      filterData,
      currentPage: page,
    });

    try {
      const result = await fetchAllProperties(filterData, {
        page,
        limit: pageLimit,
      });

      if (result.status) {
        const listings = result.data.results;

        // Encrypt and save to localStorage
        const encryptedData = encryptData(listings);
        localStorage.setItem("listings", encryptedData);

        set({
          listings,
          apiResponse: {
            status: apiStatusConstants.success,
            data: listings,
            errorMsg: null,
          },
          pagination: {
            totalPages: result.data.pagination.totalPages,
            totalRecords: result.data.pagination.totalRecords,
          },
        });
      } else {
        set({
          apiResponse: {
            status: apiStatusConstants.failure,
            data: [],
            errorMsg: result || "Failed to fetch properties",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
      set({
        apiResponse: {
          status: apiStatusConstants.failure,
          data: [],
          errorMsg: "Failed to fetch properties",
        },
      });
    }
  },

  loadListings: () => {
    const encryptedData = localStorage.getItem("listings");
    if (encryptedData) {
      const decryptedData = decryptData(encryptedData); // Decrypt data when loading
      if (decryptedData) {
        set({ listings: decryptedData }); // Update the state with decrypted data
      }
    }
  },

  clearListings: () => {
    localStorage.removeItem("listings"); // Remove from localStorage
    set({
      listings: [],
      apiResponse: {
        status: apiStatusConstants.initial,
        data: [],
        errorMsg: null,
      },
      pagination: {
        totalPages: 0,
        totalRecords: 0,
      },
      currentPage: 1,
      filterData: {},
    });
  },

  resetStore: () => {
    localStorage.removeItem("listings"); // Clear from localStorage
    set(
      {
        listings: [],
        apiResponse: {
          status: apiStatusConstants.initial,
          data: [],
          errorMsg: null,
        },
        pagination: {
          totalPages: 0,
          totalRecords: 0,
        },
        currentPage: 1,
        filterData: {},
      },
      true
    );
  },
});

// Create the store
const useListingStore = create((set, get) => ({
  ...createBaseStore(set, get),

  // Automatically load listings from localStorage on initialization
  initializeStore: () => {
    get().loadListings(); // Load encrypted data from localStorage
  },
}));

// Call `initializeStore` when the store is created
useListingStore.getState().initializeStore();

export default useListingStore;
