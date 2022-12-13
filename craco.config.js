const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@chess": path.resolve(__dirname, "./src/chess"),
      "@website": path.resolve(__dirname, "./src"),
    },
  },
};
