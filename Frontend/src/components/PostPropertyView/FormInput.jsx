import React from "react";
import SearchableDropdown from "./SearchDropdownView";

const FormInput = ({ input, formData, handleInputChange, errors, loading }) => {
  if (input.type === "dropdown") {
    return (
      <SearchableDropdown
        name={input.name}
        options={input.options}
        value={formData[input.name]}
        onChange={handleInputChange}
        placeholder={`Select ${input.label}`}
        isLoading={loading[input.name]}
        displayKey={input.displayKey || "name"}
        valueKey="id"
      />
    );
  }

  if (input.type === "file") {
    return (
      <input
        type="file"
        onChange={handleInputChange}
        multiple
        accept="image/*"
        className="w-full p-2 border rounded-md"
      />
    );
  }

  return (
    <input
      type={input.type}
      name={input.name}
      value={formData[input.name] || ""}
      onChange={handleInputChange}
      className={`w-full p-2 border rounded-md ${
        (input.name === "floorNumber" || input.name === "flatNumber") &&
        formData.propertyType === 3
          ? "opacity-50 bg-gray-200 cursor-not-allowed"
          : ""
      }`}
      placeholder={`Enter ${input.label}`}
      disabled={
        (input.name === "floorNumber" || input.name === "flatNumber") &&
        formData.propertyType === 3
      }
    />
  );
};

export default FormInput;
