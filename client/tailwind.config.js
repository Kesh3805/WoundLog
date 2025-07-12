module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poetic: ["var(--font-playfair)", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        inter: ["var(--font-inter)", "Arial", "sans-serif"],
      },
    },
  },
}; 