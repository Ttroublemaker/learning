"use strict";
/**
 * @description 实现 new
 * @author 双越老师
 */
exports.__esModule = true;
exports.customNew = void 0;
function customNew(constructor) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    // 1. 创建一个空对象，继承 constructor 的原型
    var obj = Object.create(constructor.prototype);
    // 2. 将 obj 作为 this ，执行 constructor ，传入参数
    // ts会报错：TypeError: Class constructor Foo cannot be invoked without 'new'，编译成js后能正常执行
    constructor.apply(obj, args);
    // 3. 返回 obj
    return obj;
}
exports.customNew = customNew;
var Foo = /** @class */ (function () {
    function Foo(name, n) {
        this.name = name;
        this.city = '北京';
        this.n = n;
    }
    Foo.prototype.getName = function () {
        return this.name;
    };
    return Foo;
}());
var f = new Foo('双越', 100);
var f2 = customNew(Foo, '双越2', 200);
console.info(f);
console.info(f.getName());
console.info(f2);
console.info(f2.getName());
