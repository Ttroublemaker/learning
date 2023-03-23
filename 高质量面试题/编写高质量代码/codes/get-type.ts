// typeof 只能判断值类型，其他就是function和object
// instanceof 需要两个参数来判断，而不是获取类型

/**
 * 一个通用的获取数据类型的函数
 * @param x
 * @returns
 */
export function getType(x: any) {
  return Object.prototype.toString.call(x).slice(8, -1); //.toLowerCase();
}
console.info(getType(1));
console.info(getType('1'));
console.info(getType(false));
console.info(getType(undefined));
console.info(getType(null));
console.info(getType(Symbol()));
console.info(getType({}));
console.info(getType([]));
console.info(getType(new Map()));
console.info(getType(new Set()));
console.info(getType(() => {}));
console.info(getType(new Date()));
