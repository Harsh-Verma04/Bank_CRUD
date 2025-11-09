/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1e1e2e",
        surface: "#2a2b32",
        accent: "#10a37f",
        textMain: "#ececec",
        textMuted: "#9ca3af",
      },
      boxShadow: {
        soft: "0 4px 14px rgba(0,0,0,0.4)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
}
