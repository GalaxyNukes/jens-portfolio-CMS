import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "var(--color-accent)",
        bg: "var(--color-bg)",
        "text-col": "var(--color-text)",
      },
      fontFamily: {
        display: "var(--font-display)",
        serif: "var(--font-serif)",
        body: "var(--font-body)",
      },
    },
  },
  plugins: [],
};

export default config;
