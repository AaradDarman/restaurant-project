/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  corePlugins: {
    // preflight: false,
  },
  // important: "#__next",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Byekan: ["BYekan", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        gradient:
          "linear-gradient(0deg, rgba(131,144,152,1) 0%, rgba(43,55,62,1) 100%)",
      },
      keyframes: {
        wiggle: {
          // "0%, 100%": { transform: "rotate(180deg)" },
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(359deg)",
          },
          // "50%": { transform: "rotate(3deg)" },
        },
        scale: {
          "100%": {
            transform: "scaleX(2) scaleY(2)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        scale: "scale 1s ease-in-out infinite",
      },
      colors: {
        primary: {
          main: "#3D4241",
          900: "#1c2120",
          800: "#3d4241",
          700: "#5c6160",
          600: "#6f7574",
          500: "#989e9d",
          400: "#b7bdbc",
          300: "#dae0df",
          200: "#e8efed",
          100: "#f0f6f5",
        },
        secondary: {
          main: "#0b171d",
          900: "#0b171d",
          800: "#0D1A21",
          700: "#49555c",
          600: "#5c6870",
          500: "#839098",
          400: "#a4b1b9",
          300: "#c8d5de",
          200: "#d9e7ef",
          100: "#e4f2fa",
        },
        accent: {
          main: "#D6663C",
          900: "#ab5435",
          800: "#c75f39",
          700: "#D6663C",
          600: "#e46c40",
          500: "#ef7245",
          400: "#f0845e",
          300: "#f1997a",
          200: "#f4b5a0",
          100: "#f7d1c5",
        },
      },
      flexGrow: {
        0.3: 0.3,
        0.4: 0.4,
        0.5: 0.5,
        0.6: 0.6,
        0.7: 0.7,
        0.8: 0.8,
        0.9: 0.9,
      },
    },
  },
  plugins: [],
};
