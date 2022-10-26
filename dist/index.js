"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebpackRemoveConsolePlugin = void 0;
var _utils = require("./core/utils");
const pluginName = "webpack-remove-console-plugin";
class WebpackRemoveConsolePlugin {
  constructor(options = {}) {
    if (!(0, _utils.isPlainObject)(options)) {
      throw new Error(`webpack-remove-console-plugin only accepts an options object`);
    }

    // 是否移除
    this.openRemoveConsole = options.openRemoveConsole == true || options.openRemoveConsole == false ? options.openRemoveConsole : true;

    // 是否包含

    this.include = ['log']; // 默认清楚

    if (options && options.include) {
      if (!Array.isArray(options.include)) {
        throw new Error(`webpack-remove-console-plugin  options.include only accepts an options Array, e.g ['log', 'info'] or ['*']`);
      }

      // 包括 * 表示所有
      if (options.include.includes("*")) {
        this.include = Object.keys(console).filter(key => typeof console[key] == 'function');
      } else {
        // 直接传入值覆盖
        this.include = options.include;
      }
    }
  }
  apply(compiler) {
    const hooks = compiler.hooks;
    const handlerAssets = (assets, compilation) => {
      console.log('dsfdsafdsafdsafdsafadsf=======', assets);
    };

    //监听事件  - compilation 创建之后执行
    hooks.compilation.tap({
      name: pluginName
    }, compilation => {
      // 暂时没有好的方法区分webpack4/5 - 只能通过弃用方法来判断
      if (compilation.hooks.processAssets) {
        // webpack 5 
        compilation.hooks.processAssets.tap({
          name: pluginName
        }, assets => {
          handlerAssets(assets, compilation);
        });
      } else if (compilation.hooks.optimizeAssets) {
        // webpack 4
        compilation.hooks.optimizeAssets.tap(pluginName, assets => {
          handlerAssets(assets, compilation);
        });
      } else {}
    });
  }
}
exports.WebpackRemoveConsolePlugin = WebpackRemoveConsolePlugin;