const path = require("path");
var WebpackRemoveConsolePlugin =
  require("../../dist/index").WebpackRemoveConsolePlugin;

module.exports = {
  mode: "development",
  cache: true,
  context: __dirname,
  entry: "./main.js",
  output: {
    path: path.join(__dirname, "build"),
    filename: "[hash].main.js",
  },
  plugins: [
    // Try various defaults and options.
    new WebpackRemoveConsolePlugin(),
  ],
};
