import { create } from "zustand";

import {
  fetchCityList,
  fetchBuildersList,
  fetchCommunitiesList,
  fetchStaticData,
} from "../services/newapiservices";

const useFilterStore = create(
  (set) => ({
    // Filter Data State
    filterData: {
      city: "",
      builders: "",
      community: "",
      hometype: "",
      propertydescription: "",
    },

    // Dropdown Data State
    dropdownData: {
      cityList: [],
      builderList: [],
      communityList: [],
      bedroomTypes: [],
      propertyDescriptions: [],
    },

    // Actions
    setFilterData: (data) =>
      new Promise((resolve) => {
        set({ filterData: data });
        resolve();
      }),

    setDropdownData: (data) =>
      set((state) => ({
        dropdownData: { ...state.dropdownData, ...data },
      })),

    // Fetch Actions
    fetchCityList: async () => {
      try {
        const cities = await fetchCityList();
        set((state) => ({
          dropdownData: { ...state.dropdownData, cityList: cities },
        }));
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    },

    fetchBuildersList: async (cityId) => {
      try {
        const builders = await fetchBuildersList({ city_id: cityId });
        set((state) => ({
          dropdownData: { ...state.dropdownData, builderList: builders },
        }));
      } catch (error) {
        console.error("Error fetching builders:", error);
      }
    },

    fetchCommunitiesList: async (builderId) => {
      try {
        const communities = await fetchCommunitiesList({
          builder_id: builderId,
        });
        set((state) => ({
          dropdownData: { ...state.dropdownData, communityList: communities },
        }));
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    },

    fetchStaticDropdownData: async () => {
      try {
        const [bedroomTypes, propertyDescriptions] = await Promise.all([
          fetchStaticData("st_home_type", "id,home_type", { rstatus: 1 }),
          fetchStaticData("st_prop_desc", "id,prop_desc", { rstatus: 1 }),
        ]);

        set((state) => ({
          dropdownData: {
            ...state.dropdownData,
            bedroomTypes,
            propertyDescriptions,
          },
        }));
      } catch (error) {
        console.error("Error fetching static data:", error);
      }
    },

    // Add reset action
    resetStore: () => {
      set(
        {
          filterData: {
            city: "",
            builders: "",
            community: "",
            hometype: "",
            propertydescription: "",
          },
          dropdownData: {
            cityList: [],
            builderList: [],
            communityList: [],
            bedroomTypes: [],
            propertyDescriptions: [],
          },
        },
        true
      );
    },
  }),
  {
    name: "filter-storage",
    getStorage: () => localStorage,
  }
);

export default useFilterStore;
