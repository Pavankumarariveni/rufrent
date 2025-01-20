// Dropdown.js
import React from "react";
import tailwindStyles from "../../../utils/tailwindStyles";

const Dropdown = ({ label, value, onChange, options }) => (
  <select
    value={value}
    onChange={onChange}
    className={`${tailwindStyles.paragraph} w-full md:flex-1 px-4 py-2 border border-[#B9E5E8] rounded-md focus:outline-none focus:border-[#4A628A]`}
  >
    <option value="">{label}</option>
    {options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ))}
  </select>
);

export default Dropdown;
