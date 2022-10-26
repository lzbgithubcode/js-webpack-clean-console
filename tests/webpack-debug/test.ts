import {WebpackRemoveConsolePlugin} from "../../src/index";
import {Compiler, Compilation, webpack} from "webpack";

const plugin = new WebpackRemoveConsolePlugin({include: ["*"]});

console.log('========',plugin,Object.keys(webpack));