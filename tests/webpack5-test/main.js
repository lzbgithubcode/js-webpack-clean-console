const A = require("./a");
const B = require("./b");
function testFuncB() {
  let a = 2,
    b = 3;
  const sum = a + b + A.getRandom(50);
  return sum;
}

function testFile() {
  console.log("我是测试foo");
  console.debug("我是测试debug");
  console.warn("我是测试warn");
  const a = testFuncB() + B.getComputeString("ABa");
  console.info("我是测试info");
  console.error("我是测试error");
  let name = "test";
  const result = `${name} + 123`;
  console.log("结果-------", result);
  return a;
}

const result = testFile();
console.log("🍺", result);
