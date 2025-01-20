export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      scrollbar: ["rounded"],
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};

// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}", // Covers all src folder files
//     "./public/index.html", // Covers public files
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
