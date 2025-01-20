import React, { useState, useEffect, useCallback } from "react";
import { FaFilter } from "react-icons/fa6";
import tailwindStyles from "../../utils/tailwindStyles";
import useFilterStore from "../../store/filterStore";
import useListingStore from "../../store/listingsStore";

const FilterSection = ({ currentPageChange }) => {
  const [isShow, setIsShow] = useState(false);

  // Get states and actions from both stores
  const {
    dropdownData,
    setFilterData,
    fetchCityList,
    fetchBuildersList,
    fetchCommunitiesList,
    fetchStaticDropdownData,
    filterData,
  } = useFilterStore();

  // Initialize local filters state from filterStore
  const [filters, setFilters] = useState(filterData);

  // Single effect for filter data sync
  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([fetchCityList(), fetchStaticDropdownData()]);
    };
    initializeData();
  }, []);

  const { fetchListings } = useListingStore();

  // Fetch builders when city changes
  useEffect(() => {
    if (filters.city) {
      fetchBuildersList(filters.city);
    }
  }, [filters.city]);

  // Fetch communities when builder changes
  useEffect(() => {
    if (filters.builders) {
      fetchCommunitiesList(filters.builders);
    }
  }, [filters.builders]);

  // Memoize handlers
  const handleApplyFilters = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        // Reset to page 1 when applying filters
        currentPageChange();

        // Update filter store
        await setFilterData(filters);

        // Fetch listings with new filters
        await fetchListings(filters, 1, 6);

        setIsShow(false);
      } catch (error) {
        console.error("Error applying filters:", error);
      }
    },
    [filters, currentPageChange, setFilterData, fetchListings]
  );

  const handleClearFilters = useCallback(async () => {
    const emptyFilters = {
      city: "",
      builders: "",
      community: "",
      hometype: "",
      propertydescription: "",
    };

    try {
      // Reset local state
      setFilters(emptyFilters);

      // Reset filter store
      await setFilterData(emptyFilters);

      // Reset page
      currentPageChange();

      // Clear and fetch new listings
      await fetchListings(emptyFilters, 1, 6);

      // Close mobile filter if open
      setIsShow(false);
    } catch (error) {
      console.error("Error clearing filters:", error);
    }
  }, [setFilterData, fetchListings, currentPageChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "city" ? { builders: "", community: "" } : {}),
      ...(name === "builders" ? { community: "" } : {}),
    }));
  };

  const renderCityRadios = (name, options, label) => (
    <div className="mb-4">
      <label className="block font-medium mb-2">{label}</label>
      <div className="space-y-2">
        {Array.isArray(options) &&
          options.map((option) => (
            <label
              key={option.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={filters["city"] == option.id}
                onClick={handleChange}
                className="checked:bg-blue-600"
              />
              <span>{option.name}</span>
            </label>
          ))}
      </div>
    </div>
  );

  const renderDropdown = (name, options, label) => (
    <div className="mb-4">
      <label className="block font-medium mb-2">{label}</label>
      <select
        name={name}
        value={filters[name]}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      >
        <option value="">{`Select ${label}`}</option>
        {Array.isArray(options) &&
          options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name || option.home_type || option.prop_desc}
            </option>
          ))}
      </select>
    </div>
  );

  const renderFilterForm = () => (
    <form
      className="space-y-4 overflow-y-auto h-full scroll-smooth [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-gray-300 [&::-webkit-scrollbar-thumb]:bg-blue-300"
      style={{ maxHeight: "calc(100% - 50px)" }}
    >
      {renderCityRadios("city", dropdownData.cityList, "City")}
      {renderDropdown("builders", dropdownData.builderList, "Builder")}
      {renderDropdown("community", dropdownData.communityList, "Community")}
      {renderDropdown("hometype", dropdownData.bedroomTypes, "Home Type")}
      {renderDropdown(
        "propertydescription",
        dropdownData.propertyDescriptions,
        "Property Description"
      )}

      <div className="flex space-x-2">
        <button
          onClick={handleClearFilters}
          type="button"
          className={`${tailwindStyles.secondaryButton} py-2 px-4 rounded w-full`}
        >
          Clear
        </button>
        <button
          onClick={handleApplyFilters}
          type="submit"
          className={`${tailwindStyles.secondaryButton} py-2 px-4 rounded w-full`}
        >
          Apply
        </button>
      </div>
    </form>
  );

  return (
    <div className="w-full h-auto md:h-full">
      <button
        className="md:hidden fixed left-2 z-200 mt-2"
        onClick={() => setIsShow(!isShow)}
      >
        <div className="bg-gray-400 rounded-full h-10 w-10 flex items-center justify-center">
          <FaFilter className="w-5 h-5 text-blue-600" />
        </div>
      </button>

      <div className={`hidden md:block w-full h-full rounded-lg px-4`}>
        <h2 className="text-lg font-semibold mb-4 mt-2">Filters</h2>
        {renderFilterForm()}
      </div>

      {isShow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed top-0 left-0 sm:w-3/4 md:w-2/4 h-full bg-white shadow-lg z-50 p-4">
            <button
              className="absolute top-4 right-4 text-lg"
              onClick={() => setIsShow(false)}
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            {renderFilterForm()}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
