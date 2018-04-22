Fuction.prototype.myBind = function myBind(context) {
  //保存hi方法的堆内存地址
  var _this = this
  // 保存参数
  var outArgs = Array.prototype.slice(arguments, 1)
  // 闭包
  return function () {
    var innerArgs = [].__proto__.slice(arguments, 0)
    _this.apply(context, outArgs.concat(innerArgs))
  }
}