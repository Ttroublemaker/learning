# 从 js 基础知识到 JS-Web-API

- js 基础知识，规定语法(ECMA 262 标准)
- Js Web API，网页操作的 API(w3c)
- 前者是后者的基础,两者结合才能实现真正实际应用

### JS Web API

- DOM
- BOM
- [事件](./事件.md)
- [AJAX](./http及ajax.md)
- [存储](./存储.md)

### DOM

- DOM 是哪种数据结构
  - 本质是 DOM 树
- DOM 操作的常用 API(自行补充)
  - 创建新节点
  - 添加、移除、替换、插入
  - 节点查找

```js
createDocumentFragment(); //创建一个DOM片段
createElement(); //创建一个具体的元素
createTextNode(); //创建一个文本节点
appendChild(); //添加
removeChild(); //移除
replaceChild(); //替换
insertBefore(); //插入
getElementsByTagName(); //通过标签名称
getElementsByName(); //通过元素的Name属性的值
getElementById(); //通过元素Id，唯一性
```

- [attr 和 property 的区别](https://www.cnblogs.com/elcarim5efil/p/4698980.html)
  - Attribute 和 Property 分别为特性和属性，Attribute 就是 DOM 节点自带属性，例如我们在 HTML 中常用的 id,class,src,title,alt 等。而 Property 则是这个 DOM 元素作为对象，其附加的属性或者内容，例如 childNodes，firstChild 等
  - Property 修改对象属性，不会体现到 html 结构中
  - Attribute 修改 html 属性，会改变 html 结构
  - 两者都可能引起重渲染

```js
// // property 形式
// p1.style.width = '100px'
// console.log( p1.style.width )
// p1.className = 'red'
// console.log( p1.className )
// console.log(p1.nodeName)
// console.log(p1.nodeType) // 1

// // attribute
// p1.setAttribute('data-name', 'imooc')
// console.log( p1.getAttribute('data-name') )
// p1.setAttribute('style', 'font-size: 50px;')
// console.log( p1.getAttribute('style') )
```

- 一次性插入多个 DOM 节点，如何操作

```js
const list = document.getElementById("list");

// 创建一个文档片段，此时还没有插入到 DOM 结构中
const frag = document.createDocumentFragment();

for (let i = 0; i < 20; i++) {
  const li = document.createElement("li");
  li.innerHTML = `List item ${i}`;

  // 先插入文档片段中
  frag.appendChild(li);
}

// 都完成之后，再统一插入到 DOM 结构中
list.appendChild(frag);

console.log(list);
```

- 改善 DOM 性能
  - DOM 查询做缓存
  - 将频繁操作改为一次性操作，如：document.createDocumentFragment()
