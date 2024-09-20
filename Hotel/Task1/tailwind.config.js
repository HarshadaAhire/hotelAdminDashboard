/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Correctly placed inside extend
      },
      colors: {
        "calendar-hover-bg": "#E5E7EB", // Light gray background for hover state
        "calendar-hover-text": "#4F46E5", // Purple text color for hover state
      },
    },
  },
  plugins: [],
};
