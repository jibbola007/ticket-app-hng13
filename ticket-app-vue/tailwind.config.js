module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        status: {
          open: "#22c55e",
          in_progress: "#f59e0b",
          closed: "#6b7280",
        },
      },
      maxWidth: {
        "1440": "1440px",
      },
    },
  },
  plugins: [],
};


