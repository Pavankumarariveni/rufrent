/* eslint-disable react/prop-types */
// /**
//  * SearchableDropdown Component
//  * A customizable dropdown with search functionality.
//  *
//  * @param {Object[]} options - List of dropdown options.
//  * @param {string|number} value - Selected option value.
//  * @param {function} onChange - Callback when the selected value changes.
//  * @param {string} placeholder - Placeholder text for the input.
//  * @param {boolean} isLoading - Whether the dropdown is loading options.
//  * @param {boolean} disabled - Whether the dropdown is disabled.
//  * @param {string} error - Error message to display.
//  * @param {string} helperText - Helper text to display.
//  * @param {string} displayKey - Key in options object for display text.
//  * @param {string} valueKey - Key in options object for value.
//  * @param {string} name - Name attribute for the input field.
//  */

// import React, { useState, useEffect, useRef } from "react";

// const SearchableDropdown = ({
//   options,
//   value,
//   onChange,
//   placeholder,
//   isLoading,
//   disabled,
//   error,
//   helperText,
//   displayKey,
//   valueKey,
//   name,
// }) => {
//   // State to control dropdown visibility
//   const [isOpen, setIsOpen] = useState(false);
//   // State to track the current search term
//   const [searchTerm, setSearchTerm] = useState("");
//   // State to determine if input has been interacted with
//   const [touched, setTouched] = useState(false);
//   // State to track the currently highlighted option index
//   const [highlightedIndex, setHighlightedIndex] = useState(-1);
//   // Reference to the dropdown container
//   const dropdownRef = useRef(null);
//   // Reference to the input field
//   const inputRef = useRef(null);

//   // Identify the selected option based on the value
//   const selectedOption = options.find(
//     (opt) => opt[valueKey]?.toString() === value?.toString()
//   );

//   // Update the search term based on the selected option when not touched
//   useEffect(() => {
//     if (selectedOption && !touched) {
//       setSearchTerm(selectedOption[displayKey] || "");
//     }
//   }, [selectedOption, displayKey, touched]);

//   // Filter options based on the search term
//   const filteredOptions = searchTerm
//     ? options.filter((option) =>
//         option[displayKey].toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : options;

//   // Close the dropdown when clicking outside of it
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//         setTouched(false);
//         setSearchTerm(selectedOption ? selectedOption[displayKey] : "");
//         setHighlightedIndex(-1);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [selectedOption, displayKey]);

//   // Handle input field changes
//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//     setTouched(true);
//     setIsOpen(true);
//     setHighlightedIndex(-1);
//   };

//   // Handle option click events
//   const handleOptionClick = (option) => {
//     setTouched(false);
//     setSearchTerm(option[displayKey]);
//     setIsOpen(false);
//     setHighlightedIndex(-1);
//     onChange({ target: { name, value: option[valueKey] } });
//   };

//   // Handle keyboard navigation within the dropdown
//   const handleKeyDown = (e) => {
//     if (!isOpen) {
//       if (e.key === "ArrowDown" || e.key === "Enter") {
//         setIsOpen(true);
//         setHighlightedIndex(0);
//         e.preventDefault();
//       }
//       return;
//     }

//     switch (e.key) {
//       case "ArrowDown":
//         setHighlightedIndex((prev) =>
//           prev + 1 >= filteredOptions.length ? 0 : prev + 1
//         );
//         e.preventDefault();
//         break;
//       case "ArrowUp":
//         setHighlightedIndex((prev) =>
//           prev - 1 < 0 ? filteredOptions.length - 1 : prev - 1
//         );
//         e.preventDefault();
//         break;
//       case "Enter":
//         if (
//           highlightedIndex >= 0 &&
//           highlightedIndex < filteredOptions.length
//         ) {
//           handleOptionClick(filteredOptions[highlightedIndex]);
//         }
//         e.preventDefault();
//         break;
//       case "Escape":
//         setIsOpen(false);
//         setHighlightedIndex(-1);
//         inputRef.current?.blur();
//         break;
//       default:
//         break;
//     }
//   };

//   // Open dropdown and set touched state on input focus
//   const handleFocus = () => {
//     setIsOpen(true);
//     setTouched(true);
//   };

//   // Clear the search term and reset the state
//   const handleClear = (e) => {
//     e.stopPropagation();
//     setSearchTerm("");
//     setTouched(false);
//     onChange({ target: { name, value: "" } });
//     setIsOpen(false);
//     setHighlightedIndex(-1);
//   };

//   // Ensure the highlighted option is visible in the dropdown
//   useEffect(() => {
//     if (isOpen && highlightedIndex >= 0) {
//       const optionElement = document.getElementById(
//         `option-${highlightedIndex}`
//       );
//       if (optionElement) {
//         optionElement.scrollIntoView({ block: "nearest" });
//       }
//     }
//   }, [highlightedIndex, isOpen]);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* Input field */}
//       <div className="relative">
//         <input
//           ref={inputRef}
//           type="text"
//           className={`w-full p-2 pr-8 border rounded-md ${
//             error ? "border-red-500" : "border-gray-300"
//           } ${disabled ? "bg-gray-100" : ""}`}
//           placeholder={placeholder}
//           value={searchTerm}
//           onChange={handleInputChange}
//           onFocus={handleFocus}
//           onKeyDown={handleKeyDown}
//           disabled={disabled}
//         />
//         {searchTerm && (
//           <button
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             onClick={handleClear}
//             type="button"
//           >
//             ×
//           </button>
//         )}
//       </div>

//       {/* Loading spinner */}
//       {isLoading && (
//         <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
//           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
//         </div>
//       )}

//       {/* Dropdown options */}
//       {isOpen && !disabled && (
//         <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-40 overflow-auto">
//           {filteredOptions.length > 0 ? (
//             filteredOptions.map((option, index) => (
//               <div
//                 id={`option-${index}`}
//                 key={option[valueKey]}
//                 className={`p-2 cursor-pointer ${
//                   option[valueKey]?.toString() === value?.toString()
//                     ? "bg-blue-50"
//                     : ""
//                 } ${
//                   index === highlightedIndex
//                     ? "bg-blue-100"
//                     : "hover:bg-gray-100"
//                 }`}
//                 onClick={() => handleOptionClick(option)}
//               >
//                 {option[displayKey]}
//               </div>
//             ))
//           ) : (
//             <div className="p-2 text-gray-500">No results found</div>
//           )}
//         </div>
//       )}

//       {/* Error and helper text */}
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//       {helperText && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
//     </div>
//   );
// };

// export default SearchableDropdown;

import React, { useState, useEffect, useRef } from "react";

const SearchableDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  isLoading,
  disabled,
  error,
  helperText,
  displayKey,
  valueKey,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [touched, setTouched] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Identify the selected option based on the value
  const selectedOption = options.find(
    (opt) => opt[valueKey]?.toString() === value?.toString()
  );

  // Reset searchTerm when value changes
  useEffect(() => {
    if (selectedOption) {
      setSearchTerm(selectedOption[displayKey] || "");
    } else {
      setSearchTerm(""); // Reset searchTerm if no selected option
    }
  }, [selectedOption, displayKey, value]); // Add value to dependencies

  // Filter options based on the search term
  const filteredOptions = searchTerm
    ? options.filter((option) =>
        option[displayKey].toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setTouched(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle input field changes
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setTouched(true);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  // Handle option click events
  const handleOptionClick = (option) => {
    setTouched(false);
    setSearchTerm(option[displayKey]);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onChange({ target: { name, value: option[valueKey] } });
  };

  // Handle keyboard navigation within the dropdown
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        setHighlightedIndex(0);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) =>
          prev + 1 >= filteredOptions.length ? 0 : prev + 1
        );
        e.preventDefault();
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) =>
          prev - 1 < 0 ? filteredOptions.length - 1 : prev - 1
        );
        e.preventDefault();
        break;
      case "Enter":
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        }
        e.preventDefault();
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  // Open dropdown and set touched state on input focus
  const handleFocus = () => {
    setIsOpen(true);
    setTouched(true);
  };

  // Clear the search term and reset the state
  const handleClear = (e) => {
    e.stopPropagation();
    setSearchTerm("");
    setTouched(false);
    onChange({ target: { name, value: "" } });
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  // Ensure the highlighted option is visible in the dropdown
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0) {
      const optionElement = document.getElementById(
        `option-${highlightedIndex}`
      );
      if (optionElement) {
        optionElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className={`w-full p-2 pr-8 border rounded-md ${
            error ? "border-red-500" : "border-gray-300"
          } ${disabled ? "bg-gray-100" : ""}`}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        {searchTerm && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={handleClear}
            type="button"
          >
            ×
          </button>
        )}
      </div>

      {isLoading && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        </div>
      )}

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-40 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                id={`option-${index}`}
                key={option[valueKey]}
                className={`p-2 cursor-pointer ${
                  option[valueKey]?.toString() === value?.toString()
                    ? "bg-blue-50"
                    : ""
                } ${
                  index === highlightedIndex
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option[displayKey]}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {helperText && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
    </div>
  );
};

export default SearchableDropdown;
