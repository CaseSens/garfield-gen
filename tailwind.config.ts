import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "page-grid": "repeat(3, minmax(max-content, 1fr))",
      },
      gridTemplateRows: {
        "page-grid-rows": "repeat(3, minmax(max-content, 1fr))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "bg-dark": "#0B0E14",
        orange: "#fe7a1b",
        "text-white": "#E0E4ED",
      },
    },
  },
  plugins: [],
};
export default config;
