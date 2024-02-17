/** @type {import('tailwindcss').Config} */
const {
  iconsPlugin,
  getIconCollections,
} = require("@egoist/tailwindcss-icons");
import animations from "@midudev/tailwind-animations";

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    animations,
    iconsPlugin({
      collections: getIconCollections(["tabler"]),
    }),
  ],
};
