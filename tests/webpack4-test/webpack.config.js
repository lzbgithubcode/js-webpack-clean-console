const path = require("path");
// const WebpackCleanConsolePlugin = require("../../src/index");
const WebpackCleanConsolePlugin = require("webpack-clean-console-plugin");

module.exports = {
  // mode: "development",
  mode: "production",
  cache: true,
  context: __dirname,
  entry: "./main.js",
  output: {
    path: path.join(__dirname, "build"),
    filename: "[hash].main.js",
  },
  plugins: [
    // Try various defaults and options.
    new WebpackCleanConsolePlugin({ include: ["log"] }),
  ],
};
