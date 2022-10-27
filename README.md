#### webpack-clean-console-plugin Introduction

A lightweight webpack plug-in for `console` remove, small and dependency free (only one file), supports both `webpack4.x` and `webpack5.x`

#### advantages

- support `webpack4.x`与`webpack5.x`

- small volume

- Without dependency

#### Installation

```sh
 npm install webpack-clean-console-plugin --save-dev
 yarn  add  webpack-clean-console-plugin --dev
```

#### Usage

```javascript
// webpack.config.js
const WebpackCleanConsolePlugin = require("webpack-clean-console-plugin");

// case 1  include method
module.exports = {
  // ...other code
  plugins: [new WebpackCleanConsolePlugin({ include: ["log", "info"] })],
};

// case 2 all console method
module.exports = {
  // ...other code
  plugins: [new WebpackCleanConsolePlugin({ include: ["*"] })],
};
```

**More webpack4/5 example reference `tests/webpack4-test`、`tests/webpack5-test`**

#### Options

| option  | description                                          | default   | options                                                    |
| ------- | ---------------------------------------------------- | --------- | ---------------------------------------------------------- |
| include | An array of console methods that you want to remove. | `['log']` | all `["*"]` or `['log', 'info','error','warn','debug']...` |

| openRemoveConsole | Whether or not open console | true | `true`、 `false`|
