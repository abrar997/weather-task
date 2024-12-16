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
        conditionBg: "#3a383a84",
        conditionBgMobile: "#4f4f4f84",
      },
    },
  },
  plugins: [],
};
