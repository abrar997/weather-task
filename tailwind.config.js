/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: '"Poppins", serif',
        secondary: '"Inter", sans-serif',
      },
      colors: {
        conditionBg: "#352f3574",
      },
    },
  },
  plugins: [],
};
