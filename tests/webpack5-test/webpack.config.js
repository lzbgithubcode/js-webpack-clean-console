const path = require("path");
const WebpackRemoveConsolePlugin = require("../../src/index");

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
    new WebpackRemoveConsolePlugin({ include: ["log"] }),
  ],
};
