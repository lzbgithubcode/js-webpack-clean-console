function testFuncB() {
  let a = 2,
    b = 3;
  const sum = a + b;
  return sum;
}

function testFile() {
  console.log("我是测试foo");
  console.debug("我是测试error");
  console.warn("我是测试warn");
  testFuncB();
  console.info("我是测试info");
  console.error("我是测试error");
  let name = "test";
  const result = `${name} + 123`;
}

testFile();
