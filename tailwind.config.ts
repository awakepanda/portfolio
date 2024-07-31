/** @type {import('tailwindcss').Config} */
module.exports = {
  darkmode: "class",
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extends: {
      // colors: {
      //   background: "rgb(var(--background))",
      //   foreground: "rgb(var(--foreground))",
      //   muted: {
      //     DEFAULT: "rgb(var(--muted))",
      //   },
      // },
    },
  },
  plugin: [],
};
