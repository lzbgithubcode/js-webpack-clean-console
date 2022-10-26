import {Compilation, Compiler, } from "webpack";
import {Options} from "./core/interfaces";
import {isPlainObject} from "./core/utils";

const pluginName:string = "webpack-remove-console-plugin";

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
           this.include  = Object.keys(console).filter((key: string) =>  typeof console[key as keyof Console] == 'function');
        }else {
          // 直接传入值覆盖
          this.include = options.include;
        }
    }

   


  }

  apply(compiler: Compiler){
    const hooks = compiler.hooks;


     const handlerAssets = (assets: any , compilation: Compilation)=>{

      console.log('dsfdsafdsafdsafdsafadsf=======',assets);
     }

      //监听事件  - compilation 创建之后执行
     hooks.compilation.tap({name: pluginName}, compilation => {

         // 暂时没有好的方法区分webpack4/5 - 只能通过弃用方法来判断
         if(compilation.hooks.processAssets){
            // webpack 5 
          compilation.hooks.processAssets.tap({name: pluginName}, (assets) => {
              handlerAssets(assets, compilation);
          });
           
         }else if(compilation.hooks.optimizeAssets){
           // webpack 4
           compilation.hooks.optimizeAssets.tap(pluginName,(assets) => {
               handlerAssets(assets, compilation);
           });
         }else {

         }
     })

  }
    
}

export {WebpackRemoveConsolePlugin};