module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ["testing-library", "jest-dom"],
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
  ],
};
