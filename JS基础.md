# js基础
### 变量类型
#### 1、值类型
- 基本类型：String、Number、null、underfined、Boolean、symbol。数据占用空间小，存储在栈中
- 引用类型：object，数据存储在堆中，地址存储在栈中，指向这个对象
- JS基本数据类型的变量存放的是基本类型数据的实际值；而引用数据类型的变量保存对它的引用，即指针
#### 2、typeof运算符
- 识别所有值类型
- 识别函数
- 识别是否是引用类型（无法细分，使用instanceof）

#### 3、手写深拷贝
```
/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 */
function deepClone (obj = {}) {
  if (typeof obj !== 'object' || obj == null) {
    // obj 是 null ，或者不是对象和数组，直接返回
    return obj
  }

  // 初始化返回结果
  let result
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  for (let key in obj) {
    // 保证 key 不是原型的属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用！！！
      result[key] = deepClone(obj[key])
    }
  }

  // 返回结果
  return result
}
```

### 变量计算-类型转换
- 字符串拼接
- ==（建议使用全等===）
- if语句及逻辑运算 
  - truly: !!a===true  
  - falsely: !!a===false
  
---

# 原型和原型链（重点）

### 1、class类
参考es6

#### 继承
- extends
- super
- 扩展或重写方法
  
### 2、instanceof 类型判断
顺着原型链一层层查找原型

### 3、原型
- class 实际上是函数，是语法糖
- 每个class都有显示原型prototype
- 每个实例都有隐式原型__proto__
- 实例的__proto__指向对应class的prototype
  
### 4、原型链(能画)
![原型链](./imgs/js/原型链.png)


---

### 思考
#### 1、如何准确判断一个变量是数组
- arr instanceof Array
- Array.isArray(arr)
- Object.prototype.toString.call(arr).slice(8,-1)

#### 2、class的原型本质
- 原型和原型链图示
- 属性和方法的执行规则（顺着原型链一步步查找）
  
#### 3、手写建议jQuery，考虑插件和扩展性
```
class jQuery {
    constructor(selector) {
        const result = document.querySelectorAll(selector)
        const length = result.length
        for (let i = 0; i < length; i++) {
            this[i] = result[i]
        }
        this.length = length
        this.selector = selector
    }
    get(index) {
        return this[index]
    }
    each(fn) {
        for (let i = 0; i < this.length; i++) {
            const elem = this[i]
            fn(elem)
        }
    }
    on(type, fn) {
        return this.each(elem => {
            elem.addEventListener(type, fn, false)
        })
    }
    // 扩展很多 DOM API
}

// 插件
jQuery.prototype.dialog = function (info) {
    alert(info)
}

// "造轮子"
class myJQuery extends jQuery {
    constructor(selector) {
        super(selector)
    }
    // 扩展自己的方法
    addClass(className) {

    }
    style(data) {
        
    }
}

// const $p = new jQuery('p')
// $p.get(1)
// $p.each((elem) => console.log(elem.nodeName))
// $p.on('click', () => alert('clicked'))


```

# 作用域和闭包（重要）
作用域：变量能够合法使用的范围
- 全局作用域
- 函数作用域
- 块级作用域

作用域链: 
- 变量的查找从当前作用域开始，如果找到即停止,没有找到则继续向上级作用域查找,直到全局作用域或者找到为止

闭包
- 有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量，利用闭包可以突破作用链域

闭包的特性：
- 函数内再嵌套函数
- 内部函数可以引用外层的参数和变量
- 参数和变量不会被垃圾回收机制回收

两种表现：
- 函数作为参数被传递
- 函数作为返回值被返回
```
// 函数作为返回值
// function create() {
//     const a = 100
//     return function () {
//         console.log(a)
//     }
// }

// const fn = create()
// const a = 200
// fn() // 100

// 函数作为参数被传递
function print (fn) {
  const a = 200
  fn()
}
const a = 100
function fn () {
  console.log(a)
}
print(fn) // 100

// 所有的自由变量的查找，是在函数定义的地方，向上级作用域查找
// 不是在执行的地方！！！
```

### 1、this的应用场景，如何取值
[this传送门](https://blog.csdn.net/weixin_37722222/article/details/81625826)
- 作为普通函数 => window
- 使用call apply bind => 绑定的值
- 做为对象函数被调用 => 对象本身
```
let obj = {
  a: 222,
  fn: function () {
    setTimeout(function () { console.log(this) })
  }
};
obj.fn(); // window

let obj2 = {
  a: 222,
  fn: function () {
    setTimeout(() => { console.log(this) });
  }
};
obj2.fn(); // obj
```
- 在class方法中调用 => 实例
- 箭头函数 => 上级作用域中的this

**this取值是在函数执行时确认，而不是在定义时执行**

### 2、手写bind函数
```
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
```
### 3、实际开发中闭包的应用场景
- 闭包的最大用处有两个，一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中
- 闭包的另一个用处，是封装对象的私有属性和私有方法
  
**案例：隐藏数据**
```
// 闭包隐藏数据，只提供 API
function createCache () {
  const data = {} // 闭包中的数据，被隐藏，不被外界访问
  return {
    set: function (key, val) {
      data[key] = val
    },
    get: function (key) {
      return data[key]
    }
  }
}

const c = createCache()
c.set('a', 100)
console.log(c.get('a'))
```
**案例：做一个简单的cache工具**
- 如：节流防抖

**使用闭包的注意点**
- 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露
- 解决方法是，在退出函数之前，将不使用的局部变量全部删除

---

# 异步与单线程（重要）
- 单线程与异步
   - js是单线程语言，只能同时做一件事
   - 浏览器和nodejs已支持js启动进程，如Web Worker
   - js和DOM渲染共用同一线程，因为js可以修改DOM结构
   - 遇到等待，不能卡住，所以需要异步（不阻塞代码执行）
- es6前：callback hell
- es6+：promise、generator、async/await

## 思考
### 1、同步与异步的区别
基于js是单线程本质，异步不会阻塞代码执行，相反同步会阻塞

### 2、手写promise加载一张图片
```
function loadImg (src) {
  const p = new Promise(
    (resolve, reject) => {
      const img = document.createElement('img')
      img.onload = () => {
        resolve(img)
      }
      img.onerror = () => {
        const err = new Error(`图片加载失败 ${src}`)
        reject(err)
      }
      img.src = src
    }
  )
  return p
}
```

### 3、前端使用异步的应用场景
- 网络请求，如ajax请求
- 定时任务，如setTimeout、setInterval