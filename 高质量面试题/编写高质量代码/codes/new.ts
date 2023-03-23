/**
 * @description 实现 new
 * @author 双越老师
 */

export function customNew<T>(constructor: Function, ...args: any[]): T {
  // 1. 创建一个空对象，继承 constructor 的原型
  const obj = Object.create(constructor.prototype);
  // 2. 将 obj 作为 this ，执行 constructor ，传入参数
  // ts会报错：TypeError: Class constructor Foo cannot be invoked without 'new'，编译成js后能正常执行
  constructor.apply(obj, args);
  // 3. 返回 obj
  return obj;
}

class Foo {
  // 属性
  name: string;
  city: string;
  n: number;

  constructor(name: string, n: number) {
    this.name = name;
    this.city = '北京';
    this.n = n;
  }

  getName() {
    return this.name;
  }
}

const f = new Foo('双越', 100);
const f2 = customNew<Foo>(Foo, '双越2', 200);
console.info(f);
console.info(f.getName());

console.info(f2);
console.info(f2.getName());
