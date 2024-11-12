/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionDuration: {
        2000: "2000ms",
        4000: "4000ms",
      },
      colors: {
        "spotify-green": "#1DB954",
        // "spotify-black": "#191414",
        // "spotify-white": "#FFFFFF",
        // "spotify-gray": "#B3B3B3",
      }
    },
  },
  plugins: [],
};
