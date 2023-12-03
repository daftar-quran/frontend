/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: { sans: ['var(--bodyfont)'] },
  },
  plugins: ["prettier-plugin-tailwindcss"],
}

