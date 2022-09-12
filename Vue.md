# Vue 篇

#### 4：computed 和 watch

- computed 有缓存，data 不变化则不会重新计算，取决于依赖项是否变化
- watch 如何深度监听

```js
watch:{
  name:{
    handler(oldVal, newVal ){
      // do something
    },
    deep:true
  }
}
```

- watch 监听引用类型，拿不到 oldVal， 因为引用类型是指针赋值，新值旧值指向同一个地址

#### 5：class 和 style

使用动态属性 对象语法 数组语法  
使用驼峰写法

#### 6：条件渲染

- v-if/v-else-if/v-else 用法，可以使用变量，也可以使用===等判断表达式
- v-if 和 v-show 的区别：v-if 控制组件的渲染与销毁，v-show 通过设置 display 控制隐藏和显示
- v-if 和 v-show 的使用场景：频繁切换用 v-show(v-if 渲染代价更大)，切换不频繁或者只判断一次的使用 v-if

#### 7：循环（列表）渲染 v-for

- key 的重要性，key 不能乱写，必须唯一，最好是唯一 id  
  key 是为 Vue 中 vnode 标记的唯一 id，通过这个 key,我们的 diff 操作可以更准确、更快速  
  准确: 如果不加 key，那么 vue 会选择复用节点(Vue 的就地更新策略)，导致之前节点的状态被保留下来，会产生一系列的 bug  
  快速: key 的唯一性可以被 Map 数据结构充分利用，相比于遍历查找的时间复杂度 O(n)，Map 的时间复杂度仅仅为 O(1)

- v-for 和 v-if 不能一起使用  
  v-for 的优先级高过 v-if，所以会对循环体内的每一项使用 v-if 进行判断，因此哪怕我们只渲染出一小部分用户的元素，也得在每次重渲染的时候遍历整个列表，不论活跃用户是否发生了变化，从而导致不必要的计算。通常可以使用 computed 对数据先进行过滤

#### 8：事件

- event 参数、自定义参数  
  模板中使用$event 表示"原生事件"对象，比如increment(payload,$event)，打印 event.currentTarget 会发现事件被注册到当前元素上，和 react 不同，react 是合成事件。  
  **关注点：**  
  1）事件是原生的  
  2）事件被注册到当前元素上

- 事件修饰符，按键修饰符

```js
<!-- 事件修饰符 -->

<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>

<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>

```

```js
<!-- 按键修饰符 -->

<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">

<!-- Alt + C -->
<input v-on:keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div>

<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>
```

#### 9：表单

v-model  
常见表单项 textarea checkbox radio select  
修饰符 lazy number trim  
Lazy 具备防抖效果，输入过程中 value 不会变化，在输完后才变化

---

## 2. Vue 组件使用（必会）

#### 1：props 和$emit

- 父=>子 props v-bind:name="name" 或者 :name="name"
- 子=>父 $emit 父组件中使用@userEvent="userMethod"监听自定义事件

#### 2：组件间通讯、自定义事件

1. 父=>子 props
2. 子=>父 $emit
3. 自定义事件（事件总线 ），eventBus = new Vue(), 常用于兄弟组件、远距离组件等， $on、$off、$once、$emit。使用时注意及时解绑自定义事件
4. vuex
5. inject provide
6. 获取父子组件实例 $parent、$children、$refs 获取实例的方式调用组件的属性或者方法

#### 3：组件生命周期（必考，可能涉及父子组件）

- Vue 生命周期经历哪些阶段：

  - 总体来说：初始化、运行中、销毁
  - 详细来说：开始创建、初始化数据、编译模板、挂载 Dom、渲染 → 更新 → 渲染、销毁等一系列过程

- 详见下页图，必须会画
- 至少知道 created 和 mounted 的区别
- beforeDestroy 里注意解除事件监听、定时器等  
  ![生命周期](imgs/vue/生命周期.jpg)
  ![父子生命周期](imgs/vue/父子生命周期.jpg)
  ![父子生命周期2](imgs/vue/父子生命周期2.jpg)

**生命周期经历的阶段和钩子函数**

1：实例化 vue(组件)对象：  
new Vue()

2：初始化事件和生命周期  
init events 和 init cycle

3：beforeCreate 函数：  
在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。即：  
此时 vue（组件）对象被创建了，但是 vue 对象的属性还没有绑定，如 data 属性，computed 属性还没有绑定，即没有值。

4：挂载数据（属性赋值）  
包括属性和 computed 的运算

5：created 函数：  
vue 对象的属性有值了，但是 DOM 还没有生成，$el 属性还不存在。
完成了响应式绑定
此时有数据了，但是还没有真实的 DOM，即：
data，computed 都执行了。属性已经赋值，但没有动态创建 template 属性对应的 HTML 元素，所以，此时如果更改数据不会触发 updated 函数

6：检查  
1）检查是否有 el 属性  
检查 vue 配置，即 new Vue{}里面的 el 项是否存在，有就继续检查 template 项。没有则等到手动绑定调用 vm.$mount();

2）检查是否有 template 属性  
检查配置中的 template 项，如果没有 template 进行填充被绑定区域，则被绑定区域的 el 对象的 outerHTML（即整个#app DOM 对象，包括`<div id="app" >`和`</div>`标签）都作为被填充对象替换掉填充区域，即：如果 vue 对象中有 template 属性，那么，template 后面的 HTML 会替换$el 对应的内容。如果有 render 属性，那么 render 就会替换 template。
即：优先关系是： render > template > el

7：beforeMount 函数：  
模板编译(template)，调用 render 生成 vdom、数据挂载(把数据显示在模板里)之前执行的钩子函数  
此时 this.$el 有值，但是数据还没有挂载到页面上。即此时页面中的{{ }}里的变量还没有被数据替换

8：模板编译：  
用 vue 对象的数据（属性）替换模板中的内容

9：mounted 函数：  
模板编译完成，数据挂载完毕，此时已经把数据挂载到了页面上，页面上能够看到正确的数据了。
一般来说，我们在此处发送异步请求（ajax，fetch，axios 等），获取服务器上的数据，显示在 DOM 里。

10：beforeUpdate 函数：  
组件更新之前执行的函数，只有数据更新后，才能调用（触发）beforeUpdate，注意：此数据一定是在模板上出现的数据，否则，不会也没有必要触发组件更新（因为数据不出现在模板里，就没有必要再次渲染）
数据更新了，但是，vue（组件）对象对应的 dom 中的内部（innerHTML）没有变，所以叫作组件更新前

11：updated 函数：
组件更新之后执行的函数，vue（组件）对象对应的 dom 中的内部（innerHTML）改变了

12：activated 函数：keep-alive 组件激活时调用

13：deactivated 函数：keep-alive 组件停用时调用

14：beforeDestroy：vue（组件）对象销毁之前
注意解除事件监听、定时器等

15：destroyed：vue 组件销毁后

什么时候操作 DOM 比较合适：mounted 和 updated 都不能保证子组件全部挂载完成，使用$nextTick 比较合适

## 3. Vue 高级特性

不是每个都很常用，但是用到时必须知道  
考察候选人对 vue 的掌握是否全面，且是否有深度  
考察做过的项目是否有深度和复杂度（至少能用到高级特性）

1：自定义 v-model  
2：$nextTick  
3：refs  
4：slot  
5：动态/异步组件  
6：keep-alive  
7：mixin

#### 1：自定义 v-model

![自定义 v-model](imgs/vue/自定义v-model.jpg)

#### 2：$nextTick

异步渲染，$nextTick 待 DOM 渲染后再回调  
页面渲染时会将 data 的修改做整合，多次 data 修改只会渲染一次  
1: nextTick 批量异步更新策略，一句话概括:  
在下次 DOM 更新循环结束之后执行延迟回调

2: 它主要是为了解决：  
例如一个 data 中的数据，它的改变会导致视图的更新，而在某一个很短的时间被改变了很多次，假如是 1000 次，每一次的改变如果都都将促发数据中的 setter 并按流程跑下来直到修改真实 DOM，那 DOM 就会被更新 1000 次，这样的做法肯定是非常低效的。

3: 在目前浏览器平台并没有实现 nextTick 方法，所以 Vue.js 源码中分别用 Promise、setTimeout、setImmediate 等方式定义了一个异步方法 nextTick，它接收的是一个回调函数，多次调用 nextTick 会将传入的回调函数存入队列中，当当前栈的任务都执行完毕之后才来执行这个队列中刚刚存储的那些回调函数，并且通过这个异步方法清空当前队列

#### 3：slot 插槽

1: 基本使用  
内容派发 备选（默认）内容 `<slot></slot>`

2: 作用域插槽  
父组件中的插槽内容访问子组件中的数据  
`<span> <slot v-bind:user="user"> {{ user.lastName }} </slot> </span>`

`<current-user> <template v-slot:default="slotProps"> {{ slotProps.user.firstName }} </template> </current-user>`  
缩写：  
`<current-user v-slot:default="slotProps"> {{ slotProps.user.firstName }} </current-user>`

3: 具名插槽

```js
<div class="container">
  <header>
    <!-- 我们希望把页头放这里 -->
  </header>
  <main>
    <!-- 我们希望把主要内容放这里 -->
  </main>
  <footer>
    <!-- 我们希望把页脚放这里 -->
  </footer>
</div>

<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

#### 4：动态组件

`<component v-bind:is="currentTabComponent"></component>`  
必须使用动态写法(:is)，适用于根据数据动态渲染的常见，组件类型不确定，可以用 v-if 语法。

#### 5：异步组件（重要）

1：import()函数  
2：按需加载，异步加载大组件  
配合魔法注释可以对异步 chunk 进行自定义命名

```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import("./MyComponent.vue"),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000,
});
```

#### 6：keep-alive

缓存组件  
频繁切换，不需要重复渲染  
vue 常见的性能优化手段之一  
include - 字符串或正则表达，只有匹配的组件会被缓存  
exclude - 字符串或正则表达式，任何匹配的组件都不会被缓存（优先级高于 include）  
使用 include/exclude 属性需要给所有 vue 类的 name 赋值（注意不是给 route 的 name 赋值），否则 include/exclude 不生效

```js
<keep-alive include="a,b">
  <!-- 将缓存name为a或者b的组件，结合动态组件使用 -->
  <component :is="view"></component>
</keep-alive>

<!-- 使用正则表达式，需使用v-bind -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 动态判断 -->
<!-- includedComponents是缓存的组件Array集合 -->
<keep-alive :include="includedComponents">
  <router-view></router-view>
</keep-alive>

<keep-alive exclude="excludeComponents">
  <!-- 将不缓存name为excludeComponents的组件 -->
  <component></component>
</keep-alive>
```

想保持这些组件的状态，以避免反复重渲染导致的性能问题

#### 7：mixin

- 多个组件有相同的逻辑，抽离出来

  - mixins：[mixinOne，mixinTwo...]
  - 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用
  - 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先

- mixin 并非完美的解决方案，会有一些问题

  - 变量来源不明确，不利于阅读
  - 多 mixin 时，容易造成命名冲突
  - mixin 和组件可能出现多对多的关系，复杂度高（维护火葬场）

- vue3 中的 composition API 旨在解决这些问题

### 总结：

高级特性  
可以不深入，但必须知道  
熟悉基本用法，了解使用场景，最好能和自己的项目经验结合起来

---

## 4. 扩展

#### Vuex 使用

面试考点并不多(熟悉 vue 后，vuex 没有难度)  
基本概念，基本使用和 API 必须要掌握  
可能会考察 state 的数据结构设计（参考数据结构与组件设计章节）

- Vuex 基本概念

  - state
  - getters
  - action
  - mutation

- 用于 vue 组件
  - dispatch
  - commit
  - mapState
  - mapGetter
  - mapActions
  - mapMutations

理解流程（重要），只能在 actions 里进行异步操作，mutations 进行同步操作，state 只能通过 mutations 进行修改，不能直接修改  
必须会画

![vuex](imgs/vue/vuex.jpg)

#### Vue-router 使用

面试考点并不多  
路由模式（hash、h5 history）  
路由配置（动态路由、路由懒加载）  
h5 history 需要后端配置，无论请求什么地址，后端都返回 index.html  
动态路由

![动态路由](imgs/vue/动态路由.jpg)

---

## 5. Vue 原理(大厂必考) 原理 ≠ 源码

1：面试为何会考察原理？  
2：面试中如何考察？以何种方式？  
考察重点、而非细节  
和使用相关联的原理，如 VDOM、模板渲染  
整体流程是否全面、热门技术是否有深度  
3：Vue 原理包括哪些  
组件化/响应式/vnode 和 diff/模板编译/渲染过程/前端路由

#### 1：如何理解 MVVM 模型

M：model 数据模型  
V：view UI 视图  
VM：view-mode 连接 M 和 V  
数据驱动视图

![mvvm](imgs/vue/数据驱动视图.jpg)

#### 2： 监听 data 变化的核心 API（重点）

#### 3： 如何监听对象变化（重点）

#### 4： 如何监听数组变化（重点）

核心 API：Object.defineProperty 有缺陷  
vue3：Proxy 兼容性不好，且无法 polyfill  
1）深度监听，需要递归到底，一次性计算量大（嵌套层数尽量少）  
2）无法监听新增属性、删除属性（新增了 Vue.set/ Vue.delete API）  
3）无法原生监听数组，需要特殊处理（需要修改数组原型）

监听对象、监听数组、复杂对象，深度监听

```js
// 触发更新视图
function updateView() {
  console.log("视图更新");
}

// 重新定义数组原型
const oldArrayProperty = Array.prototype;
// 创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(
  (methodName) => {
    arrProto[methodName] = function () {
      updateView(); // 触发视图更新
      oldArrayProperty[methodName].call(this, ...arguments);
    };
  }
);
// 重新定义属性，监听起来
function defineReactive(target, key, value) {
  // 深度监听
  observer(value);
  // 核心 API
  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        // 深度监听
        observer(newValue);
        // 设置新值, 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
        value = newValue;
        // 触发更新视图
        updateView();
      }
    },
  });
}
// 监听对象属性
function observer(target) {
  if (typeof target !== "object" || target === null) {
    // 不是对象或数组
    return target;
  }
  if (Array.isArray(target)) {
    target.__proto__ = arrProto;
  }
  // 重新定义各个属性（for in 也可以遍历数组）
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      defineReactive(target, key, target[key]);
    }
  }
}
// 准备数据
const data = {
  name: "zhangsan",
  age: 20,
  info: {
    address: "北京", // 需要深度监听
  },
  nums: [10, 20, 30],
};
// 监听数据
observer(data);
// 测试
// data.name = 'lisi'
// data.age = 21
// // console.log('age', data.age)
// data.x = '100' // 新增属性，监听不到 —— 所以有 Vue.set
// delete data.name // 删除属性，监听不到 —— 所有已 Vue.delete
// data.info.address = '上海' // 深度监听
data.nums.push(4); // 监听数组
```

#### 5： 虚拟 DOM（重要）

vdom 是实现 vue 和 react 的重要基石  
diff 算法是 vdom 中最核心、最关键的部分  
vdom 是一个热门话题，也是面试中的热门问题

有了一定的复杂度，想减少计算次数比较难  
能否把计算，更多地转移为 js 计算？因为 js 执行速度很快  
vdom 用 js 模拟 DOM 结构，计算出最小的变更，操作 DOM

操作 DOM 非常耗费性能  
以前用 jq，可以自行控制 DOM 操作的时机，手动调整  
Vue 和 react 是数据驱动视图，如何有效控制 DOM 操作？  
Virtual DOM 是用 VNode 这么一个 Class 去描述

会用 vdom 描述 html 结构，如下：

```js
<div class="title">
  <span>Hello ConardLi</span>
  <ul>
    <li>苹果</li>
    <li>橘子</li>
  </ul>
</div>;

const VitrualDom = {
  tag: "div",
  props: { className: "title" },
  children: [
    {
      tag: "span",
      children: "Hello ConardLi",
    },
    {
      tag: "ul",
      children: [
        { tag: "li", children: "苹果" },
        { tag: "li", children: "橘子" },
      ],
    },
  ],
};
```

<br>

vue3 重写了 vdom 的代码，优化了性能  
但 vdom 的基本理念不变，面试考点不变
React 和 Vue 的具体实现也不同，但是基本理念类似

#### 6： diff 算法(重点)

diff 算法是 vdom 中最核心、最关键的部分  
diff 算法能在日常使用 vue react 中体现出来（如 key 的使用）  
diff 算法是前端热门话题，面试宠儿

[diff 算法详解 1](https://github.com/aooy/blog/issues/2])
[diff 算法详解 2](https://github.com/lihongxun945/myblog/issues/33)

diff 即对比，是一个广泛的概念，如 linux diff 命令、git diff 等  
两个 js 对象也可以做 diff  
两棵树做 diff，如这里的 vdom diff  
复杂度 O(n^3)=>O(n)

只比较同一层级，不跨级比较  
tag 不同，则直接删掉重建，不再深度比较  
tag 和 key，两者都相同，则认为是相同节点，并继续比较下级同级节点  
大大降低了复杂度

三个主要的 diff 算法（不要纠结细节）

```js
function patch(oldVnode: VNode | Element, vnode: VNode): VNode {
    let i: number, elm: Node, parent: Node;
    const insertedVnodeQueue: VNodeQueue = [];
    // 执行 pre hook
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

    // 第一个参数不是 vnode
    if (!isVnode(oldVnode)) {
      // 创建一个空的 vnode ，关联到这个 DOM 元素
      oldVnode = emptyNodeAt(oldVnode);
    }

    // 相同的 vnode（key 和 sel 都相等）
    if (sameVnode(oldVnode, vnode)) {
      // vnode 对比
      patchVnode(oldVnode, vnode, insertedVnodeQueue);

      // 不同的 vnode ，直接删掉重建
    } else {
      elm = oldVnode.elm;
      parent = api.parentNode(elm);

      // 重建
      createElm(vnode, insertedVnodeQueue);

      if (parent !== null) {
        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }

    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i]);
    }
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    return vnode;
  };
```

```js
function patchVnode(oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {
    // 执行 prepatch hook
    const hook = vnode.data?.hook;
    hook?.prepatch?.(oldVnode, vnode);

    // 设置 vnode.elem
    const elm = vnode.elm = oldVnode.elm;

    // 旧 children
    let oldCh = oldVnode.children as VNode[];
    // 新 children
    let ch = vnode.children as VNode[];

    if (oldVnode === vnode) return;

    // hook 相关
    if (vnode.data !== undefined) {
      for (let i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
      vnode.data.hook?.update?.(oldVnode, vnode);
    }

    // vnode.text === undefined （vnode.children 一般有值）
    if (isUndef(vnode.text)) {
      // 新旧都有 children
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
        // 新 children 有，旧 children 无 （旧 text 有）
      } else if (isDef(ch)) {
        // 清空 text
        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
        // 添加 children
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        // 旧 child 有，新 child 无
      } else if (isDef(oldCh)) {
        // 移除 children
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        // 旧 text 有
      } else if (isDef(oldVnode.text)) {
        api.setTextContent(elm, '');
      }

      // else : vnode.text !== undefined （vnode.children 无值）
    } else if (oldVnode.text !== vnode.text) {
      // 移除旧 children
      if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }
      // 设置新 text
      api.setTextContent(elm, vnode.text!);
    }
    hook?.postpatch?.(oldVnode, vnode);
  }
```

```js
function updateChildren(parentElm: Node,
    oldCh: VNode[],
    newCh: VNode[],
    insertedVnodeQueue: VNodeQueue) {
    let oldStartIdx = 0, newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx: KeyToIndexMap | undefined;
    let idxInOld: number;
    let elmToMove: VNode;
    let before: any;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (oldStartVnode == null) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
      } else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx];
      } else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx];

        // 开始和开始对比
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];

        // 结束和结束对比
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];

        // 开始和结束对比
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];

        // 结束和开始对比
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];

        // 以上四个都未命中
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        // 拿新节点 key ，能否对应上 oldCh 中的某个节点的 key
        idxInOld = oldKeyToIdx[newStartVnode.key as string];

        // 没对应上
        if (isUndef(idxInOld)) { // New element
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];

          // 对应上了
        } else {
          // 对应上 key 的节点
          elmToMove = oldCh[idxInOld];

          // sel 是否相等（sameVnode 的条件）
          if (elmToMove.sel !== newStartVnode.sel) {
            // New element
            api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);

            // sel 相等，key 相等
          } else {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined as any;
            api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
          }
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      } else {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
  }
```

细节不重要，updateChildren 的过程也不重要，不要深究  
vdom 核心概念很重要：h、vnode、patch、diff、key 等  
vdom 存在的价值更加重要：数据驱动视图，控制 DOM 操作等

```js
export interface VNode {
  sel: string | undefined;
  data: VNodeData | undefined;
  children: Array<VNode | string> | undefined;
  elm: Node | undefined;
  text: string | undefined;
  key: Key | undefined;
}
export interface VNodeData {
  props?: Props;
  attrs?: Attrs;
  class?: Classes;
  style?: VNodeStyle;
  dataset?: Dataset;
  on?: On;
  hero?: Hero;
  attachData?: AttachData;
  hook?: Hooks;
  key?: Key;
  ns?: string; // for SVGs
  fn?: () => VNode; // for thunks
  args?: any[]; // for thunks
  [key: string]: any; // for any other 3rd party module
}

export function vnode(
  sel: string | undefined,
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | Text | undefined
): VNode {
  let key = data === undefined ? undefined : data.key;
  return { sel, data, children, text, elm, key };
}
```

#### 7：模板编译

![模板编译](imgs/vue/模板编译.png)

<!-- ![模板编译2](imgs/vue/模板编译2.png)  -->

```js
const compiler = require("vue-template-compiler");
// render 函数
// 返回 vnode
// patch

// 编译
const res = compiler.compile(template);
console.log(res.render);

// 插值
const template = `<p>{{message}}</p>`;
// with (this) { return createElement('p', [createTextVNode(toString(message))]) }
// h -> vnode
// createElement -> vnode

// // 表达式
const template = `<p>{{flag ? message : 'no message found'}}</p>`;
// with (this) { return _c('p', [_v(_s(flag ? message : 'no message found'))]) }

// 属性和动态属性
const template = `<div id="div1" class="container"><img :src="imgUrl"/></div>`;
// with (this) {
//   return _c('div',
//     { staticClass: "container", attrs: { "id": "div1" } },
//     [
//       _c('img', { attrs: { "src": imgUrl } })])
// }

// 条件
const template = `<div><p v-if="flag === 'a'">A</p><p v-else>B</p></div>`;
// with (this) { return _c('div', [(flag === 'a') ? _c('p', [_v("A")]) : _c('p', [_v("B")])]) }

// 循环
const template = `<ul><li v-for="item in list" :key="item.id">{{item.title}}</li></ul>`;
// with (this) { return _c('ul', _l((list), function (item) { return _c('li', { key: item.id }, [_v(_s(item.title))]) }), 0) }

// 事件
const template = `<button @click="clickHandler">submit</button>`;
// with (this) { return _c('button', { on: { "click": clickHandler } }, [_v("submit")]) }

// v-model
const template = `<input type="text" v-model="name">`;
// 主要看 input 事件
// with (this) { return _c('input', { directives: [{ name: "model", rawName: "v-model", value: (name), expression: "name" }], attrs: { "type": "text" }, domProps: { "value": (name) }, on: { "input": function ($event) { if ($event.target.composing) return; name = $event.target.value } } }) }

// 从 vue 源码中找到缩写函数的含义
function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
```

- 模板编译为 render 函数，执行 render 函数返回 vnode
- 基于 vnode 再执行 patch 和 diff
- 使用 webpack-vue-loader，会在开发环境下编译模板

#### 8：组件渲染、更新过程

1）初次渲染过程

1. 解析模板为 render 函数（或者在开发环境已完成，vue-loader）
2. 触发响应式，监听 data 属性 getter setter
3. 执行 render 函数。生成 vnode，然后 patch(elem,vnode)  
   执行 render 函数会触发 getter（针对模板中使用到的数据），从而进行依赖收集

2）更新过程

1.  修改 data，触发 setter(此前在 getter 中已经被监听，必需是初始渲染已经依赖过的)调用 Dep.notify()，将通知它内部的所有的 Watcher 对象进行视图更新
2.  重新执行 render 函数，生成 newVnode
3.  然后就是 patch 的过程(diff 算法),patch(oldVnode, newVnode )

#### 9：异步渲染

$nextTick 汇总 data 修改，一次性更新视图，减少 DOM 操作次数，提高性能  
组件渲染/更新过程（重要）

![nextTick](imgs/vue/nextTick.png)

#### 10： 前端路由原理

稍微复杂的 SPA，都需要前端路由，Vue-router 是 vue 全家桶标配之一，属于"和日常使用相关联的原理"，面试常考。

**路由模式**

1. hash
2. H5 history
3. memoryHistory(v4 之前叫做 abstract history)

- hash 模式
  - 形如：http://ai.huawei.com/nlp/aila_conference/#/home
  - location.hash => #/home
  - hash 的特点
    - hash 变化会触发网页跳转，即浏览器的前进后退
    - hash 变化不会刷新页面，SPA 必需的特点
    - hash 永远不会提交到 server 端

![hash](imgs/vue/router-hash.png)

- H5 history 模式
  - 用 url 规范的路由，但跳转时不刷新页面
  - histroy.pushState：
    - 打开一个新的路由【注意】用 pushState 方式，浏览器不会刷新页面
  - window.onpopstate：
    - 监听浏览器前进、后退

![history](imgs/vue/router-history.png)
![history](imgs/vue/router-history2.png)

Vue 原理总结：组件化、响应式 、vdom 和 diff 、模板编译、渲染过程、前端路由

---

## 6. 面试真题演练：

#### 1：v-show 和 v-if 的区别

1. v-show 通过 css display 控制显示和隐藏
2. v-if 组件真正的渲染和销毁，而不是显示和隐藏
3. 频繁切换显示状态用 v-show，否则 v-if

#### 2：为何在 v-for 中使用 key

1. 必须使用 key，且不能是 index 和 random
2. Diff 算法中通过 tag 和 key 来判断是否是 sameNode
3. 减少渲染次数，提升渲染性能  
   key 是为 Vue 中的 vnode 标记的唯一 id，通过这个 key，我们的 diff 操作可以更准确、更快速  
   准确: 如果不加 key,那么 vue 会选择复用节点(Vue 的就地更新策略),导致之前节点的状态被保留下来,会产生一系列的 bug  
   快速: key 的唯一性可以被 Map 数据结构充分利用,相比于遍历查找的时间复杂度 O(n),Map 的时间复杂度仅仅为 O(1)

#### 3：描述 vue 组件生命周期（如包括父子组件呢？）

1. 单组件生命周期图会画
2. 父子组件生命周期关系（最好知道为什么）

#### 4：vue 组件如何通讯（常见）

1. 父子组件 props 和 $emit
2. 自定义事件 event.$on/event.$off/event.$emit/event.$once，即事件总线 EventBus
3. vuex
4. $refs $parent 等

#### 5：描述组件渲染和更新过程

会画和描述流程图

![nextTick](imgs/vue/nextTick.png)

#### 6：双向数据绑定 v-model 的实现原理

v-model 本质就是一个语法糖，可以看成是 value + input 方法的语法糖。可以通过 model 属性的 prop 和 event 属性来进行自定义。原生的 v-model，会根据标签的不同生成不同的事件和属性。

text 和 textarea 元素使用 value 属性和 input 事件；
checkbox 和 radio 使用 checked 属性和 change 事件；
select 字段将 value 作为 prop 并将 change 作为事件。

![v-model](imgs/vue/v-model.png)

#### 7：对 MVVM 的理解

会画模型图  
MVVM 是 Model-View-ViewModel 缩写，Model 层代表数据模型，View 代表 UI 视图，ViewModel 是 View 和 Model 层的桥梁，数据会绑定到 viewModel 层并自动将数据渲染到页面中，view 中由于用户交互操作而改变的数据也会在 Model 中同步,从而实现数据驱动视图的效果

![mvvm](imgs/vue/数据驱动视图.jpg)

#### 8：computed 有何特点

具有缓存性，data 不变不会重新计算  
缓存性，提高了性能

#### 9：为何组件 data 必须是一个函数

定义组件时，组件实际上是一个类，使用组件时，将对组件实例化，这些实例用的都是同一个构造函数。如果 data 不是一个函数，那么所有的组件实例将引用同一个 data，造成状态共享

#### 10：ajax 请求应该放在哪个生命周期

created 和 mounted 都可以
ajax 是异步获取数据，但 created 和 mounted 的时间间隔相较于网络请求来说太短，放在 created 里并没有什么优势

#### 11：如何将组件所有 props 传递给子组件

`<User v-bind="$props" />`k

#### 12: 实现自己的 v-model

一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value attribute 用于不同的目的。model 选项可以用来避免这样的冲突

![自定义v-model](imgs/vue/自定义v-model.jpg)

#### 13：多个组件有相同逻辑，如何抽离

Mixin 以及 mixin 的一些缺点

#### 14：何时使用异步组件

加载大组件、路由异步加载

#### 15：何时需要使用 keep-alive（可优化性能）

缓存组件、不需要重复渲染  
多个静态 tab 页的切换  
主要是有 include、exclude、max 三个属性；前两个属性允许 keep-alive 有条件的进行缓存；max 可以定义组件最大的缓存个数，如果超过了这个个数的话，在下一个新实例创建之前，就会将以缓存组件中最久没有被访问到的实例销毁掉。两个生命周期 activated/deactivated，用来得知当前组件是否处于活跃状态。

#### 15：何时需要使用 beforeDestroy

1. 解绑自定义事件 event.$off
2. 清除定时器
3. 解绑自定义的 DOM 事件，如 window scroll click 等（模板中的事件会自动解绑）

#### 16：什么是作用域插槽

![作用域插槽](imgs/vue/作用域插槽.png)

有时让插槽内容能够访问子组件中才有的数据。绑定在 <slot> 元素上的 attribute 被称为插槽 prop

#### 17：vuex 中 action 和 mutation 有何区别

action 中处理异步，mutation 不可以，action 不能直接操作 State  
mutation 做原子操作，专注于修改 State，理论上是修改 State 的唯一途径  
action 可以整合多个 mutation

#### 19：如何配置 vue-router 异步加载

```js
new Vue({
  //...
  components: {
    "my-component": () => important("./my-async-component"),
  },
});
```

#### 20：请用 vnode 描述一个 DOM 结构

参考 Vnode 章节

#### 21：监听 data 变化的核心 api

Object.defineProperty  
深度监听、监听数组  
有何缺点  
参考相关章节

#### 22：vue 如何监听数组变化

Object.defineProperty 不能监听数组变化  
重新定义原型，重写 push pop 等共 6 个方法，实现监听  
Proxy 可以原生监听数组变化

#### 23：请描述响应式原理

监听 data 变化+组件渲染和更新流程，组合回答即可  
Vue 在初始化数据时，会使用 Object.defineProperty 重新定义 data 中的所有属性，当页面使用对应属性时，首先会进行依赖收集(收集当前组件的 watcher)如果属性发生变化会通知相关依赖进行更新操作(发布订阅)。

#### 24：diff 算法的时间复杂度

O(n^3)=>O(n) 优化的思路

#### 25：简述 diff 算法过程

参考相关章节  
核心：  
patch(elem,vnode)和 patch(vnode,newVnode)  
patchVnode 和 addVnodes 和 removeVnodes  
updateChildren(key 的重要性)

#### 26：vue 为何是异步渲染，$nextTick 何用

异步渲染（以及合并 data 修改），以提高渲染性能  
$nextTick 在 DOM 更新完之后，触发回调

#### 27：再说一下 computed 和 watch

computed 本质是一个具备缓存的 watcher，依赖的属性发生变化就会更新视图。适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。

watch 没有缓存性，更多的是观察的作用，可以监听某些数据执行回调。当我们需要深度监听对象中的属性时，可以打开 deep：true 选项，这样便会对对象中的每一项进行监听。

使用 Watch 的深度监听可能会带来性能问题，优化的话可以使用字符串形式监听，如果没有写到组件中，也就是使用 vm.$watch来设置监听的时候，这个vm.$watch 是会返回一个取消观察函数，调用这个函数就可以手动注销监听了。

#### 28：Vue 事件绑定原理说一下

原生事件绑定是通过 addEventListener 绑定给真实元素的，组件事件绑定是通过 Vue 自定义的$on实现的。  
换句话说：Vue支持 2 种事件类型，原生 DOM 事件和自定义事件。  
普通DOM和组件上挂了.native修饰符之后，最终调用的还是原生的addEventListener()方法
组件上，Vue实例上事件会调用原型上的$on、$emit、$off、$once 等方法。

#### 29：Vue 常见的性能优化

1. 合理使用 v-show/v-if
2. 合理使用 computed
3. v-for 时加 key，避免和 v-if 同时使用如果需要使用 v-for 给每项元素绑定事件时使用事件代理
4. 自定义事件、DOM 事件及时销毁（避免内存泄漏）
5. 使用路由懒加载、异步组件
6. 合理使用 keep-alive
7. 防抖节流
8. 第三方模块按需引入
9. 长列表滚动到可视区域动态加载
10. data 层级不要太深（深度监听需要一次性遍历完成，造成遍历过多）
11. 使用 vue-loader 在开发环境做模板编译 vue-runtime 版本
12. webpack 层面（参考 webpack 相关章节）
13. 前端通用性能优化，如图片懒加载  
    减少 HTTP 请求/减小 cookie 大小/将样式表放到页面顶部/将脚本放到页面底部/将 javascript 和 css 从外部引入/压缩 javascript 和 css/服务使用 Gzip 压缩

## Vue3

面试会考察候选人对新技术的关注程度  
升级内容：
全部用 ts 重写（响应式，vdom，模板编译等）  
性能提升，代码量减少（tree shakeing 打包后的包体积）  
调整了部分 API  
Proxy

#### Proxy 实现响应式

```js
// 创建响应式
function reactive(target = {}) {
  if (typeof target !== "object" || target == null) {
    // 不是对象或数组，则返回
    return target;
  }
  // 代理配置
  const proxyConf = {
    get(target, key, receiver) {
      // 只处理本身（非原型的）属性
      const ownKeys = Reflect.ownKeys(target);
      if (ownKeys.includes(key)) {
        console.log("get", key); // 监听
      }
      const result = Reflect.get(target, key, receiver);
      // 深度监听
      // 性能如何提升的？
      return reactive(result);
    },
    set(target, key, val, receiver) {
      // 重复的数据，不处理
      if (val === target[key]) {
        return true;
      }
      const ownKeys = Reflect.ownKeys(target);
      if (ownKeys.includes(key)) {
        console.log("已有的 key", key);
      } else {
        console.log("新增的 key", key);
      }
      const result = Reflect.set(target, key, val, receiver);
      console.log("set", key, val);
      // console.log('result', result) // true
      return result; // 是否设置成功
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key);
      console.log("delete property", key);
      // console.log('result', result) // true
      return result; // 是否删除成功
    },
  };
  // 生成代理对象
  const observed = new Proxy(target, proxyConf);
  return observed;
}

// 测试数据
const data = {
  name: "zhangsan",
  age: 20,
  info: {
    city: "beijing",
  },
};

const proxyData = reactive(data);
```

#### Reflect 作用

和 proxy 能力一一对应  
替代 Object 的工具函数
标准化、 规范化、函数式（如下：）  
![Reflect](imgs/vue/Reflect-demo.png)

与 Object.defineProperty 深度递归的区别是 Proxy 只在 get 时递归，不会一次性递归，而 Object.defineProperty 则是一次性递归完成

#### Proxy 特点

深度监听，性能更好  
可监听 新增、删除属性  
可监听数组变化  
无法兼容所有浏览器，无法 polyfill(缺点)
