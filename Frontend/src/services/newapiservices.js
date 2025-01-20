import axios from "axios";
import { getRecords, addNewRecord } from "../config/apiRoute";
import { apiUrl } from "../config/apiRoute";

// User Landing View Listings Api [1]
export const fetchAllProperties = async (
  filters = {},
  pagination = { page: 1, limit: 5 }
) => {
  try {
    const { page, limit } = pagination;
    const params = {
      ...filters,
      page,
      limit,
      current_status: 3,
    };

    const url = `${apiUrl}/showPropDetails`;
    const response = await axios.get(url, { params });
    return response;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return error;
  }
};

export const fetchFromAPI = async (urlProp) => {
  try {
    const url = `${apiUrl}${urlProp}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return error;
  }
};

// Post Property View Api's [5]
export const fetchCityList = async () => {
  return getRecords("st_city", "id,name", { rstatus: 1 });
};

export const fetchBuildersList = async (additionalParams) => {
  return getRecords("st_builder", "id,name", {
    ...additionalParams,
    rstatus: 1,
  });
};

export const fetchCommunitiesList = async (additionalParams) => {
  return getRecords("st_community", "id,name", {
    ...additionalParams,
    rstatus: 1,
  });
};

export const fetchStaticData = async (
  tableName,
  fieldNames,
  additionalParams = {}
) => {
  return getRecords(tableName, fieldNames, additionalParams);
};

export const uploadProperty = async (fieldValues) => {
  // return await axios.post(`${apiUrl}/upload-property`, propertyData);
  const tableName = "dy_property";
  const fieldNames =
    "user_id,prop_type_id,home_type_id,prop_desc_id,community_id,no_baths,no_balconies,tenant_type_id,tenant_eat_pref_id,rental_low,rental_high,parking_count_id,maintenance_id,tower_no,floor_no,flat_no,current_status";

  // const formattedFieldValues = fieldValues
  //   .map((value) =>
  //     value === null || value === undefined ? "NULL" : `'${value}'`
  //   )
  //   .join(",");
  // Sending a POST request to the server with the data (table name, field names, and values)
  return addNewRecord(
    tableName, // The name of the table where the record is to be added
    fieldNames, // The names of the fields to be inserted
    fieldValues // The values for each field in the record
  );
};

// My Listings View Api's [1]
export const fetchUserListings = async (userId) => {
  try {
    const url = `${apiUrl}/usermylistings?user_id=${userId}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error("Error fetching Listings:", error);
    return error || "Fetch Failed";
  }
};

export const postRMTask = async (userId, propertyId) => {
  try {
    const response = await axios.post(`${apiUrl}/addRmTask`, {
      user_id: userId,
      property_id: propertyId,
    });
    return response;
  } catch (error) {
    console.log("Error At Connect To RM:", error.message);
    return error;
  }
};
