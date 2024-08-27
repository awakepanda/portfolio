import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    // container: {
    //   center: true,
    //   padding: "2rem",
    //   screens: {
    //     "2xl": "1400px",
    //   },
    // },
    extend: {
      stroke: {
        illust: {
          DEFAULT: "hsl(var(--illust) / <alpha-value>)",
          foreground: "hsl(var(--illust-foreground) / <alpha-value>)",
        },
        foreground: "hsl(var(--foreground))",
      },
      fill: {
        illust: {
          DEFAULT: "hsl(var(--illust) / <alpha-value>)",
          foreground: "hsl(var(--illust-foreground) / <alpha-value>)",
        },
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: "hsl(158 81% 43%)",
        illust: {
          DEFAULT: "hsl(var(--illust) / <alpha-value>)",
          foreground: "hsl(var(--illust-foreground) / <alpha-value>)",
        },
      },
    },
  },
} satisfies Config;

export default config;
