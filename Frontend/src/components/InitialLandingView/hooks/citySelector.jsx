// CitySelector.js
import React from "react";

const CitySelector = ({ cities, selectedCity, setSelectedCity }) => (
  <div className="flex flex-col">
    {cities.map((each) => (
      <div key={each.id}>
        <input
          id={`city-${each.id}`}
          onClick={() => setSelectedCity(each.id)}
          value={each.id}
          type="radio"
        />
        <label
          htmlFor={`city-${each.id}`}
          className="text-lg pl-2 text-white font-semibold"
        >
          {each.name}
        </label>
      </div>
    ))}
  </div>
);

export default CitySelector;
