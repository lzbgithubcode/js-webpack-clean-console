// 定义插件名称
const pluginName = "webpack-remove-console-plugin";

// 定义方法名
const consoleName = ["console", "window.console"];

// 默认配置
const defaultOptions = {
  /**
   * 打开移除console
   *  默认true
   */
  openRemoveConsole: true,

  /**
   * 包含移除的打印信息
   *  默认log
   */
  include: ["log"],
};

class WebpackRemoveConsolePlugin {
  constructor(options = defaultOptions) {
    if (!this.isPlainObject(options)) {
      throw new Error(
        `webpack-remove-console-plugin only accepts an options object`
      );
    }

    // 是否移除
    this.openRemoveConsole =
      options.openRemoveConsole == true || options.openRemoveConsole == false
        ? options.openRemoveConsole
        : true;

    // 是否包含
    this.include = defaultOptions.include; // 默认清楚log

    if (options && options.include) {
      if (!Array.isArray(options.include)) {
        throw new Error(
          `webpack-remove-console-plugin  options.include only accepts an options Array, e.g ['log', 'info'] or ['*']`
        );
      }

      // 包括 * 表示所有
      if (options.include.includes("*")) {
        this.include = Object.keys(console).filter(
          (key) => typeof console[key] == "function"
        );
      } else {
        // 直接传入值覆盖
        this.include = options.include;
      }
    }
  }

  apply(compiler) {
    const hooks = compiler.hooks;

    const that = this;
    const handlerAssets = (assets, compilation) => {
      // 定义 需要请求的对象
      Object.entries(assets).forEach((item) => {
        const fileName = item[0];
        const cacheSource = item[1];
        // 匹配js文件
        if (/\.js$/.test(fileName)) {
          let sourceCode = cacheSource.source();
          const map = cacheSource.map();

          // 匹配console.[log, 'info'...]
          const regExp = new RegExp(
            `(${consoleName.join("|")}).(?:${that.include.join(
              "|"
            )})\s{0,}\(.*?\)`,
            "g"
          );
          // 清楚日志
          sourceCode = sourceCode.replace(regExp, "");

          // 重组code对象
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

    //监听事件  - compilation 创建之后执行
    hooks.compilation.tap({ name: pluginName }, (compilation) => {
      // 暂时没有好的方法区分webpack4/5 - 只能通过弃用方法来判断
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

module.exports = WebpackRemoveConsolePlugin;
