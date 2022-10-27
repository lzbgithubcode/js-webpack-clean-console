module.exports = {
  getRandom: function (number) {
    console.log("传入的参数=====", number);
    return Math.random() * number;
  },
};
