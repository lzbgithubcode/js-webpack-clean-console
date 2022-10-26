import {Compiler} from "webpack";
import {Options} from "./core/interfaces";
import {isPlainObject} from "./core/utils";

const pluginName:String = "webpack-remove-console-plugin";

class WebpackRemoveConsolePlugin {

  private readonly openRemoveConsole: boolean;
  private readonly include: string[];

  constructor(options: Options = {}){

    if(!isPlainObject(options)){
      throw new Error(`webpack-remove-console-plugin only accepts an options object`);
    }

    // 是否移除
    this.openRemoveConsole = options.openRemoveConsole == true || options.openRemoveConsole == false ? options.openRemoveConsole: true;

    // 是否包含
  
    this.include =  ['log']; // 默认清楚

    if(options && options.include){
        if(!Array.isArray(options.include)){
          throw new Error(`webpack-remove-console-plugin  options.include only accepts an options Array, e.g ['log', 'info'] or ['*']`);
        }

         // 包括 * 表示所有
        if(options.include.includes("*")){
          this.include  = Object.keys(console).filter((key: String) => typeof console[key as keyof typeof String] == "function")
        }else {
          // 直接传入值覆盖
          this.include = options.include;
        }
    }


  }

  apply(compiler: Compiler){
    const hooks = compiler.hooks;

    console.log('-------------',hooks);

  }
    
}

export {WebpackRemoveConsolePlugin};