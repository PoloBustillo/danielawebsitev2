/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      italliano: ["var(--font-hand)"],
      barlow: ["var(--font-barlow)"],
      sans: ["var(--font-inter)"],
      inter: ["Inter", "sans-serif"],
      roboto: ["Roboto Condensed"],
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
      "15px": ["15px", { lineHeight: "1" }],
      "75px": ["75px", { lineHeight: "1" }],
    },

    extend: {
      lineHeight: {
        "4px": "85px",
      },
      animation: {
        "fade-in": "fade-in 3s ease-in-out forwards",
        title: "title 6s ease-out forwards",
        "fade-left": "fade-left 3s ease-in-out forwards",
        "enter-right": "enter-right 3s ease-in-out forwards",
        "fade-right": "fade-right 3s ease-in-out forwards",
        "enter-line": "fade-in 3s ease-in-out forwards",
        morphdiv: "blob 12s linear infinite alternate",
        border: "border 4s ease infinite",
        hideMe: "hideMe 0s ease-in 5s forwards",
      },
      keyframes: {
        hideMe: {
          to: {
            width: 0,
            height: 0,
            visibility: "hidden",
            padding: 0,
          },
        },
        border: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        blob: {
          "0%": { "border-radius": "77% 47% 61% 49%" },
          "20%": { "border-radius": "89% 46% 70% 30%" },
          "40%": { "border-radius": " 56% 93% 56% 94%" },
          "60%": { "border-radius": "68% 60% 94% 96%" },
          "80%": { "border-radius": "34% 74% 59% 82%" },
          "100%": { "border-radius": "77% 47% 61% 49%" },
        },
        "fade-in": {
          "0%": {
            opacity: "0%",
          },
          "75%": {
            opacity: "0%",
          },
          "100%": {
            opacity: "100%",
          },
        },
        "fade-left": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0%",
          },

          "30%": {
            transform: "translateX(0%)",
            opacity: "100%",
          },
          "100%": {
            opacity: "0%",
          },
        },
        "fade-right": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0%",
          },

          "30%": {
            transform: "translateX(0%)",
            opacity: "100%",
          },
          "100%": {
            opacity: "0%",
          },
        },
        "enter-right": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0%",
          },

          "30%": {
            transform: "translateX(0%)",
            opacity: "80%",
          },
          "80%": {
            opacity: "40%",
          },
          "100%": {
            opacity: "100%",
          },
        },
        title: {
          "0%": {
            "line-height": "0%",
            "letter-spacing": "0.25em",
            opacity: "0",
          },
          "25%": {
            "line-height": "0%",
            opacity: "0%",
          },
          "80%": {
            opacity: "100%",
          },

          "100%": {
            "line-height": "100%",
            opacity: "100%",
          },
        },
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            background: "#F5F5F5",
            foreground: "#2e2b22",
            focus: "#fb7185",
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            background: "#101010",
            foreground: "#F5F5F5",
            secondary: "#f36c29",
            focus: "#fb7185",
          },
        },
      },
    }),
  ],
};
