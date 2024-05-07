import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
      colors: {
        //Surface (BG)
        "surface-primary": "#FFFFFF",
        "surface-primary-dark": "#121212",
        "surface-primary-very-light": "#FFFFFF",
        "surface-primary-very-light-dark": "#171717",
        "surface-extra-light": "#FFFFFF",
        "surface-extra-light-dark": "#212121",
        "surface-light": "#FCFCFC",
        "surface-light-dark": "#272727",
        "surface-medium": "#F9F9F9",
        "surface-medium-dark": "#3A383F",
        "surdace-dark": "#FFFFFF",
        "surface-dark-dark": "#FFFFFF",
        //On (Elements)
        "on-surface": "#000000",
        "on-surface-dark": "#FFFFFF",
        "on-light": "#A1A1A1",
        "on-dark-light": "#747474",
        "on-medium": "#747474",
        "on-dark-medium": "#A1A1A1",
        "on-dark": "#FFFFFF",
        "on-dark-dark": "#FFFFFF",
        //Outline (borders)
        "outline-medium": "#E5E5E5",
        "outline-medium-dark": "#3B3B3B",
        "outline-light": "#EEEEEE",
        "outline-light-dark": "#222222",
        //Primary
        "primary-primary": "#35B164",
        "primary-primary-dark": "#76FB92",
        "primary-primary-extra-light": "#FFFFFF",
        "primary-primary-dark-extra-light": "#FFFFFF",
        "primary-light": "#EAFEEF",
        "primary-light-dark": "#183F37",
        "primary-medium": "#76FB92",
        "primary-medium-dark": "#397E53",
        "primary-dark": "#183F37",
        "primary-dark-dark": "#EAFEEF",
        //Util
        modal: "rgba(0, 0, 0, 0.5)",
        "dark-transparent": "rgba(0, 0, 0, 0.5)",
      },
      // fontSize: {
      //   sm: "0.8rem",
      //   base: "1rem",
      //   xl: "1.25rem",
      //   "2xl": "1.563rem",
      //   "3xl": "1.953rem",
      //   "4xl": "2.441rem",
      //   "5xl": "3.052rem",
      // },
    },
  },
  plugins: [],
};
export default config;
