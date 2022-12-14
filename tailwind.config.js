/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans TC', 'sans-serif']
      },
      colors: {
        gray: {
          300: "#f0f0f0", 
          400: "#b7b7b7",
          500: "#bababa",
          600: "#424242",
        },
        green: {
          400: "#1C8B6A",
          500: "#35A483",
          600: "#077854",
        },
        blue: "#0014C7",
        red: "#CA0000",
        orange: "#FFB800",
      },
      backgroundImage: {
        "gradient-green": "linear-gradient(180deg, #35A483 0%, #077854 100%)",
      },
      boxShadow: {
        normal: "1px 1px 6px rgba(0, 0, 0, .11)",
      },
    },
  },
  plugins: [],
};
