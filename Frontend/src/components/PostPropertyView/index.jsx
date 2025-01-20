import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useRoleStore } from "../../store/roleStore";

import {
  fetchCityList,
  fetchBuildersList,
  fetchCommunitiesList,
  fetchStaticData,
  uploadProperty,
} from "../../services/newapiservices";

import ProgressBar from "./ProgressBar";
import LoadingView from "../CommonViews/LoadingView";
import PropertyForm from "./PropertyForm";

const staticDataConfig = [
  { propertyType: ["st_prop_type", "id,prop_type"] },
  { bedrooms: ["st_home_type", "id,home_type"] },
  { bathrooms: ["st_baths", "id,nbaths"] },
  { balcony: ["st_balcony", "id,nbalcony"] },
  { tenantType: ["st_tenant", "id,tenant_type"] },
  { foodPreference: ["st_tenant_eat_pref", "id,eat_pref"] },
  { parking: ["st_parking_count", "id,parking_count"] },
  { propertyDescription: ["st_prop_desc", "id,prop_desc"] },
  { maintenance: ["st_maintenance", "id,maintenance_type"] },
];

const PostPropertiesView = () => {
  const navigate = useNavigate();

  const { userData } = useRoleStore();
  const userId = userData.id;
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    city: "",
    builder: "",
    community: "",
    propertyType: "",
    towerNumber: "",
    floorNumber: "",
    flatNumber: "",
    bedrooms: "",
    bathrooms: "",
    propertyDescription: "",
    balcony: "",
    tenantType: "",
    foodPreferences: "",
    rental_low: "",
    rental_high: "",
    parking: "",
    maintenance: "",
    images: [],
  });
  const [dropdownData, setDropdownData] = useState({
    cityList: [],
    builderList: [],
    communityList: [],
    propertyType: [],
    bedrooms: [],
    bathrooms: [],
    balcony: [],
    tenantType: [],
    foodPreference: [],
    parking: [],
    propertyDescription: [],
    maintenance: [],
  });
  // const [loading, setLoading] = useState({
  //   city: false,
  //   builder: false,
  //   community: false,
  // });
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCityList();
        setDropdownData((prev) => ({ ...prev, cityList: response }));

        await Promise.all(
          staticDataConfig.map(async (each) => {
            const value = Object.values(each)[0];
            const key = Object.keys(each)[0];
            const data = await fetchStaticData(value[0], value[1], {
              rstatus: 1,
            });
            setDropdownData((prev) => ({ ...prev, [key]: data }));
          })
        );
      } catch (err) {
        console.error("Error fetching static data:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBuildersList({
          city_id: formData.city,
        });
        setDropdownData((prev) => ({ ...prev, builderList: response }));
      } catch (err) {
        console.error("Error fetching static data:", err);
      }
    };
    fetchData();
  }, [formData.city]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCommunitiesList({
          builder_id: formData.builder,
        });
        setDropdownData((prev) => ({ ...prev, communityList: response }));
      } catch (err) {
        console.error("Error fetching static data:", err);
      }
    };
    fetchData();
  }, [formData.builder]);

  const handleInputChange = (e) => {
    const { name, type, value, files, checked } = e.target;
    if (type === "file") {
      const fileList = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...fileList],
      }));
      const previews = fileList.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);
    } else if (name === "city") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        builder: "",
        community: "",
      }));
      setDropdownData((prev) => ({
        ...prev,
        builderList: [],
        communityList: [],
      }));
    } else if (name === "builder") {
      setFormData((prev) => ({ ...prev, [name]: value, community: "" }));
      setDropdownData((prev) => ({ ...prev, communityList: [] }));
    } else {
      if (name === "maintenance") {
        const selectedOption = e.target.checked ? e.target.dataset.id : null;
        setFormData((prev) => ({ ...prev, maintenance: selectedOption }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const openImageModal = (image) => setModalImage(image);
  const closeImageModal = () => setModalImage(null);

  const validatePanel = (panelFields) => {
    const panelErrors = {};
    panelFields.forEach((field) => {
      const value = formData[field.name];
      if (
        formData.propertyType === 3 &&
        (field.name === "floorNumber" || field.name === "flatNumber")
      ) {
        return;
      }
      if (field.type === "dropdown" && !value) {
        panelErrors[field.name] =
          `Please select a valid ${field.label.toLowerCase()}.`;
      } else if ((field.type === "text" || field.type === "number") && !value) {
        panelErrors[field.name] = `${field.label} must be a number.`;
      }
    });
    return panelErrors;
  };

  const handleNext = () => {
    const panelFields = panels[currentStep - 1];
    const panelErrors = validatePanel(panelFields);
    if (Object.keys(panelErrors).length > 0) {
      setErrors(panelErrors);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await uploadProperty(`
        ${userId},
        ${formData.propertyType},
            ${formData.bedrooms},
            ${formData.propertyDescription},
            ${formData.community},
            ${formData.bathrooms},
            ${formData.balcony},
            ${formData.tenantType},
            ${formData.foodPreferences},
            ${formData.rental_low},
            ${formData.rental_high},
            ${formData.parking},
            ${formData.maintenance},
            ${parseInt(formData.towerNumber)},
            ${formData.floorNumber || "NULL"},
            ${parseInt(formData.flatNumber) || "NULL"},
            ${parseInt(1)}`);
      console.log("Response:", response);
      alert("Form submitted successfully!");
      navigate("/user");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const panels = [
    [
      {
        label: "City",
        name: "city",
        options: dropdownData.cityList,
        type: "dropdown",
        displayKey: "name",
      },
      {
        label: "Builder",
        name: "builder",
        options: dropdownData.builderList,
        type: "dropdown",
        displayKey: "name",
      },
      {
        label: "Community",
        name: "community",
        options: dropdownData.communityList,
        type: "dropdown",
        displayKey: "name",
      },
      {
        label: "Property Type",
        name: "propertyType",
        options: dropdownData.propertyType,
        type: "dropdown",
        displayKey: "prop_type",
      },
      {
        label: "Property Description",
        name: "propertyDescription",
        options: dropdownData.propertyDescription,
        type: "dropdown",
        displayKey: "prop_desc",
      },
      {
        label: "Home-Type",
        name: "bedrooms",
        options: dropdownData.bedrooms,
        type: "dropdown",
        displayKey: "home_type",
      },
    ],
    [
      { label: "Tower/Unit Number", name: "towerNumber", type: "text" },
      { label: "Floor Number", name: "floorNumber", type: "number" },
      { label: "Flat Number", name: "flatNumber", type: "text" },
      {
        label: "Bathrooms",
        name: "bathrooms",
        options: dropdownData.bathrooms,
        type: "dropdown",
        displayKey: "nbaths",
      },
      {
        label: "Balcony Count",
        name: "balcony",
        options: dropdownData.balcony,
        type: "dropdown",
        displayKey: "nbalcony",
      },
      {
        label: "Parking",
        name: "parking",
        options: dropdownData.parking,
        type: "dropdown",
        displayKey: "parking_count",
      },
    ],
    [
      { label: "Monthly Rental", name: "monthly_rental", type: "group" },
      { label: "Min", name: "rental_low", type: "number" },
      { label: "Max", name: "rental_high", type: "number" },
      {
        label: "Tenant Type",
        name: "tenantType",
        options: dropdownData.tenantType,
        type: "dropdown",
        displayKey: "tenant_type",
      },
      {
        label: "Food Preferences",
        name: "foodPreferences",
        options: dropdownData.foodPreference,
        type: "dropdown",
        displayKey: "eat_pref",
      },
      {
        label: "Maintenance",
        name: "maintenance",
        type: "radio",
        options: [
          { label: "Included", value: "included", id: 1 },
          { label: "Not Included", value: "not_included", id: 2 },
        ],
      },
      { label: "Upload Images", name: "images", type: "file" },
    ],
  ];

  const totalSteps = panels.length;

  return (
    <>
      {pageLoading ? (
        <LoadingView />
      ) : (
        <div className="max-w-4xl mx-auto mt-24">
          <h2 className="text-center text-2xl font-semibold mb-4">
            Add Property
          </h2>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
            <PropertyForm
              panels={panels}
              currentStep={currentStep}
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
              loading={false}
              imagePreviews={imagePreviews}
              handleRemoveImage={handleRemoveImage}
              openImageModal={openImageModal}
              handleSubmit={handleSubmit}
              handleNext={handleNext}
              totalSteps={totalSteps}
              setCurrentStep={setCurrentStep}
            />
          </div>
        </div>
      )}
      {modalImage && (
        <div className="fixed inset-0 top-10 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-gray-600 rounded-lg p-4 shadow-lg relative w-3/4 h-3/4 flex items-center justify-center">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
            <img
              src={modalImage}
              alt="Modal View"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostPropertiesView;
