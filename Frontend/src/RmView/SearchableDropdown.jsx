/* eslint-disable react/prop-types */
// import React, { useState, useRef, useEffect } from "react";

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
//   valueKey = "id",
//   name,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [touched, setTouched] = useState(false);
//   const [highlightedIndex, setHighlightedIndex] = useState(-1);
//   const dropdownRef = useRef(null);
//   const inputRef = useRef(null);

//   const selectedOption = options.find(
//     (opt) => opt[valueKey]?.toString() === value?.toString()
//   );

//   useEffect(() => {
//     if (selectedOption && !touched) {
//       setSearchTerm(selectedOption[displayKey] || "");
//     }
//   }, [selectedOption, displayKey, touched]);

//   const filteredOptions = searchTerm
//     ? options.filter((option) =>
//         option[displayKey].toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : options;

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//         setTouched(false);
//         if (selectedOption) {
//           setSearchTerm(selectedOption[displayKey] || "");
//         } else {
//           setSearchTerm("");
//         }
//         setHighlightedIndex(-1);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [selectedOption, displayKey]);

//   const handleInputChange = (e) => {
//     const newSearchTerm = e.target.value;
//     setSearchTerm(newSearchTerm);
//     setTouched(true);
//     setIsOpen(true);
//     setHighlightedIndex(-1);
//   };

//   const handleOptionClick = (option) => {
//     setTouched(false);
//     setSearchTerm(option[displayKey]);
//     setIsOpen(false);
//     setHighlightedIndex(-1);
//     onChange({ target: { name, value: option[valueKey] } });
//   };

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
//         e.preventDefault();
//         setHighlightedIndex((prevIndex) => {
//           const nextIndex = prevIndex + 1;
//           return nextIndex >= filteredOptions.length ? 0 : nextIndex;
//         });
//         break;

//       case "ArrowUp":
//         e.preventDefault();
//         setHighlightedIndex((prevIndex) => {
//           const nextIndex = prevIndex - 1;
//           return nextIndex < 0 ? filteredOptions.length - 1 : nextIndex;
//         });
//         break;

//       case "Enter":
//         e.preventDefault();
//         if (
//           highlightedIndex >= 0 &&
//           highlightedIndex < filteredOptions.length
//         ) {
//           handleOptionClick(filteredOptions[highlightedIndex]);
//         }
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

//   const handleFocus = () => {
//     setIsOpen(true);
//     setTouched(true);
//   };

//   const handleClear = (e) => {
//     e.stopPropagation();
//     setSearchTerm("");
//     setTouched(false);
//     onChange({ target: { name, value: "" } });
//     setIsOpen(false);
//     setHighlightedIndex(-1);
//   };

//   // Scroll highlighted option into view
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

//       {isLoading && (
//         <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
//           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
//         </div>
//       )}

//       {isOpen && !disabled && (
//         <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
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

//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//       {helperText && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
//     </div>
//   );
// };

// export default SearchableDropdown;
import React, { useState, useRef, useEffect } from "react";

/**
 * SearchableDropdown Component
 *
 * A customizable dropdown component with search functionality and keyboard navigation.
 *
 * Props:
 * - options: Array of options to display in the dropdown
 * - value: Currently selected value
 * - onChange: Callback triggered when the selected value changes
 * - placeholder: Placeholder text for the input field
 * - isLoading: Boolean to show a loading spinner
 * - disabled: Boolean to disable the input field
 * - error: Error message to display below the dropdown
 * - helperText: Helper text to display below the dropdown
 * - displayKey: Key to use for displaying option labels
 * - valueKey: Key to use for identifying option values (default is "id")
 * - name: Name attribute for the input field (used in the onChange callback)
 */
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
  transactionId,
  currentStatusId,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Controls dropdown visibility
  const [searchTerm, setSearchTerm] = useState(""); // Current search term
  const [touched, setTouched] = useState(false); // Tracks if the input has been interacted with
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Index of the currently highlighted option
  const dropdownRef = useRef(null); // Ref for dropdown container
  const inputRef = useRef(null); // Ref for input field

  // Find the currently selected option
  const selectedOption = options.find(
    (opt) => opt[valueKey]?.toString() === value?.toString(),
  );

  // Set the search term based on the selected option
  useEffect(() => {
    if (selectedOption && !touched) {
      setSearchTerm(selectedOption[displayKey] || "");
    }
  }, [selectedOption, displayKey, touched]);

  // Filter options based on the search term
  const filteredOptions = searchTerm
    ? options.filter((option) =>
        option[displayKey].toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : options;

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setTouched(false);
        setSearchTerm(selectedOption ? selectedOption[displayKey] : "");
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedOption, displayKey]);

  // Handle changes to the input field
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setTouched(true);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  // Handle clicking on an option
  const handleOptionClick = (option) => {
    setTouched(false);
    setSearchTerm(option[displayKey]);
    setIsOpen(false);
    setHighlightedIndex(-1);
    const value = `${option[valueKey]}`;
    onChange(transactionId, name, value);
  };

  // Handle keyboard navigation
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
          prev + 1 >= filteredOptions.length ? 0 : prev + 1,
        );
        e.preventDefault();
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) =>
          prev - 1 < 0 ? filteredOptions.length - 1 : prev - 1,
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

  // Handle input focus
  const handleFocus = () => {
    setIsOpen(true);
    setTouched(true);
  };

  // Clear the search term
  const handleClear = (e) => {
    e.stopPropagation();
    setSearchTerm("");
    setTouched(false);
    onChange({ target: { name, value: "" } });
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  // Scroll the highlighted option into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0) {
      const optionElement = document.getElementById(
        `option-${highlightedIndex}`,
      );
      if (optionElement) {
        optionElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Input field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className={`w-full px-2 py-1  border rounded-md ${
            error ? "border-red-500" : "border-gray-300"
          } ${disabled ? "bg-gray-100" : ""}`}
          placeholder={placeholder}
          value={searchTerm || value}
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

      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Dropdown options */}

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-40 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map(
              (option, index) =>
                // <div
                //   id={`option-${index}`}
                //   key={option[valueKey]}
                //   className={`p-1 cursor-pointer ${
                //     option[valueKey]?.toString() === value?.toString()
                //       ? "bg-blue-50"
                //       : ""
                //   } ${
                //     index === highlightedIndex
                //       ? "bg-blue-100"
                //       : "hover:bg-gray-100"
                //   }`}
                //   onClick={() => handleOptionClick(option)}
                // >
                //   {option[displayKey]}
                // </div>
                option.id >= currentStatusId && (
                  <div
                    id={`option-${index}`}
                    key={option[valueKey]}
                    className={`p-1 cursor-pointer ${
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
                ),
            )
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}

      {/* Error and helper text */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {helperText && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
    </div>
  );
};

export default SearchableDropdown;
