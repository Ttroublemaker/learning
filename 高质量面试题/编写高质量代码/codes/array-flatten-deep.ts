/**
 * 数组深度扁平化
 * 使用push
 */
export function flattenDeep(arr: any[]): any[] {
  const res: any[] = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      const flatItem = flattenDeep(item); // 递归拍平
      flatItem.forEach((n) => res.push(n));
    } else {
      res.push(item);
    }
  });
  return res;
}

/**
 * 数组深度扁平化
 * 使用concat
 */
export function flattenDeep2(arr: any[]): any[] {
  let res: any[] = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      const flatItem = flattenDeep2(item); // 递归拍平
      res = res.concat(flatItem);
    } else {
      res = res.concat(item);
    }
  });
  return res;
}

// 功能测试
const arr = [1, [2, 3], 4, [5, [6, 7]]];
console.info(flattenDeep(arr));
console.info(flattenDeep2(arr));
