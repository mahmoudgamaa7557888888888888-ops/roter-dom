module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", 
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["dark", "hover", "responsive"],
      textColor: ["dark", "hover", "responsive"],
      boxShadow: ["dark"],
    },
  },
  plugins: [],
};
