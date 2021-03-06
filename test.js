function fn (a, b) {
  console.log(this);
  console.log({ a, b });
}

const fn2 = fn.bind({ x: 1 }, 10, 20)
fn2() // {x:1} {a:10, b:20}
// 模拟bind
Function.prototype.myBind = function () {
  // context 即为this
  const [context, ...args] = Array.from(arguments)
  // fn.bind(...)中的fn
  const self = this
  // 返回一个函数
  return function () {
    return self.apply(context, args)
  }
}

const fn3 = fn.myBind({ x: 2 }, 3, 4)
fn3() // {x:2} {a:3, b:4}