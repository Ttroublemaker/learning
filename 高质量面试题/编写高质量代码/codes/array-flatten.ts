/**
 * 数组扁平化
 * 使用push
 */
export function flatten(arr: any[]): any[] {
  const res: any[] = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      item.forEach((n) => res.push(n));
    } else {
      res.push(item);
    }
  });
  return res;
}

/**
 * 数组扁平化
 * 使用concat
 */
export function flatten2(arr: any[]): any[] {
  let res: any[] = [];
  arr.forEach((item) => {
    res = res.concat(item);
  });
  return res;
}

// 功能测试
const arr = [1, [2, 3], 4, [5, [6, 7]]];
console.info(flatten(arr));
console.info(flatten2(arr));
