// define plug-in name
const pluginName = "webpack-clean-console-plugin";

// define methods
const consoleName = ["console", "window.console"];

// default config
const defaultOptions = {
  /**
   *  Whether or not open console
   *  default true
   */
  openRemoveConsole: true,

  /**
   * Contains the console method you want to remove
   *  default log
   */
  include: ["log"],
};

class WebpackCleanConsolePlugin {
  constructor(options = defaultOptions) {
    if (!this.isPlainObject(options)) {
      throw new Error(
        `webpack-remove-console-plugin only accepts an options object`
      );
    }

    // Whether to remove
    this.openRemoveConsole =
      options.openRemoveConsole == true || options.openRemoveConsole == false
        ? options.openRemoveConsole
        : true;

    // Contains the console method you want to remove
    this.include = defaultOptions.include;

    if (options && options.include) {
      if (!Array.isArray(options.include)) {
        throw new Error(
          `webpack-remove-console-plugin  options.include only accepts an options Array, e.g ['log', 'info'] or ['*']`
        );
      }

      // If it includes *, it's everything
      if (options.include.includes("*")) {
        this.include = Object.keys(console).filter(
          (key) => typeof console[key] == "function"
        );
      } else {
        // If there is input, the value is passed directly to override
        this.include = options.include;
      }
    }
  }

  apply(compiler) {
    const hooks = compiler.hooks;

    const that = this;
    const handlerAssets = (assets, compilation) => {
      Object.entries(assets).forEach((item) => {
        const fileName = item[0];
        const cacheSource = item[1];
        // Matching js files
        if (/\.js$/.test(fileName)) {
          let sourceCode = cacheSource.source();
          const map = cacheSource.map();

          // Matching console.[log, 'info'...]
          const regExp = new RegExp(
            `(${consoleName.join("|")}).(?:${that.include.join(
              "|"
            )})\s{0,}\(.*?\)`,
            "g"
          );
          // clear console
          sourceCode = sourceCode.replace(regExp, "");

          // restructuring code
          compilation.assets[fileName] = {
            source: () => {
              return sourceCode;
            },
            map: () => map,
            sourceAndMap: () => ({
              source: sourceCode,
              map,
            }),
            buffer: () => Buffer.from(sourceCode),
            size: () => {
              return Buffer.byteLength(sourceCode, "utf-8");
            },
          };
        }
      });
    };

    //Listen for an event  - Execute after compilation creation
    hooks.compilation.tap({ name: pluginName }, (compilation) => {
      // There is currently no good way to differentiate webpack4/5 - only by deprecating methods
      if (compilation.hooks.processAssets) {
        // webpack 5
        compilation.hooks.processAssets.tap({ name: pluginName }, (assets) => {
          handlerAssets(assets, compilation);
        });
      } else if (compilation.hooks.optimizeAssets) {
        // webpack 4
        compilation.hooks.optimizeAssets.tap(pluginName, (assets) => {
          handlerAssets(assets, compilation);
        });
      } else {
      }
    });
  }

  isPlainObject(value) {
    if (Object.prototype.toString.call(value) !== "[object Object]") {
      return false;
    }

    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.getPrototypeOf({});
  }
}

module.exports = WebpackCleanConsolePlugin;
