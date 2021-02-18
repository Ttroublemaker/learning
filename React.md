# React 篇

React和Vue一样重要（特别是大厂面试），力求两者都会  
React和Vue有很多相通之处，而且正在趋于一致  
React比Vue学习成本高，尤其对于初学者  

## 1. 基本使用（必会）
#### 1：JSX使用
变量表达式、class style、子元素和组件  
缺图 TODO

#### 2：条件判断
if/else、三元表达式、逻辑运算符&& ||

#### 3：列表渲染
map（带key）

#### 4：事件（重点）
1）bind this（三种形式，使用类时：构造函数内绑定this、class fields、回调中使用箭头函数） 
缺图 TODO

2）关于event参数（重要）  
缺图 TODO  
参考之后章节  

3）传递自定义参数  
缺图 TODO

上述两种方式是等价的，分别通过箭头函数和 Function.prototype.bind 来实现。

#### 5：表单
受控组件和非受控组件  
使 React 的 state 成为表单元素的“唯一数据源”=>受控组件  

<hr>

## 2. 组件使用

#### 1：setState（非常重要）
1）不可变值(注意)
   ```
   // 不要直接修改 state ，使用不可变值 
   // this.state.count++ // 错误,如违反,会影响 shouldComponentUpdate 
   // this.setState({
   //     count: this.state.count + 1    
// })
```
缺图 TODO  
 
2）可能是异步更新（三种情况）  
缺图 TODO  
 
3）可能会被合并  
缺图 TODO  

#### 2：组件生命周期（重要、会画）
http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/  
缺图 TODO  
 
可以关注下shouldComponentUpdate，其他的无需关注  
缺图 TODO  
 
父子组件生命周期和vue完全一样

<hr>

## 3. 高级特性
1.函数组件   
2.非受控组件   
3.Portals   
4.context  
5.异步组件  
6.性能优化  
7.高阶组件HOC  
8.Render Props  

#### 1：函数组件
1.纯函数，输出props，输出JSX  
2.没有实例，没有周期，没有state。但是hooks 可以给函数组件引入状态和生命周期等  

#### 2：非受控组件
在大多数情况下，我们推荐使用受控组件来处理表单数据。在一个受控组件中，表单数据是由 React 组件来管理的。另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。  
Ref、defaultValue、defaultChecked、React.createRef()

###### 使用场景：
1.必须手动操作DOM元素，setState实现不了时  
2.文件上传input  
3.某些富文本编辑器，需要传入DOM元素（绑定在某个元素）

#### 3：Portals
Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。  
ReactDOM.createPortal(child, container) 参考官网

#### 4：context
参考官网
Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。  
应用场景+核心api  

#### 5：异步组件
React.lazy  
React.Suspense  
缺图 TODO  

#### 6：React 性能优化（针对React，性能优化是重点）
性能优化对React更加重要  
1）shouldComponentUpdate  
1.React默认：父组件更新，则子组件无条件更新，默认返回true
2.SCU一定要每次都用吗？不一定，需要才优化
3.当用户输入不规范时，直接操作state，如this.state.list.push(xx)，SCU将不再有效果，故SCU必须配合不可变值书写
 
2）PureComponent/React.memo  
PureComponent，SCU中实现了浅比较（只比较第一层）
Memo,函数组件中的PureComponent
浅比较已经使用大部分内容，state层级尽量低（尽量避免深度比较，耗费性能 ）

3）不可变值immutable.js（了解）  
彻底拥抱不可变值
基于共享数据（不是深拷贝），速度快  
缺图 TODO

#### 7：关于组件公共逻辑的抽离
1.Mixin，已被React弃用  
2.高阶组件 HOC  
注意透传所有props  
缺图 TODO
 
3.Render Props   
参考官网

###### 对比：
HOC：模式简单，但会增加组件层级  
Render Props：代码简洁，学习成本较高

<hr>

## 4. 扩展
#### Redux的使用（常考）
基本概念  
store state  
action  
reducer  
dispatch(action)  
reducer => newState  
subscribe触发通知  
   
react-redux  
Provider  
connect  
mapStateToProps mapDispatchToProps  

Redux 处理异步  
redux-thunk  
缺图 TODO
 

#### React-router
面试考点不多
路由模式，同Vue
路由配置（动态路由、懒加载），同Vue  
缺图 TODO
 
 <hr>

## 5. React 原理
#### 1：牢记不可变值  
#### 2：vdom和diff  
h函数  
vnode数据结构 
patch函数  
只比较同一层级，不跨级比较  
tag不同，则删除重建，不再深度比较  
tag和key，两者都相同，则认为是相同节点，不再深度比较  

Vue2.x、Vue3.0、React 三者实现vdom细节都不同  
核心概念和实现思路，都一样  
面试主要考察核心概念和实现思路，不用全部核心细节  

#### 3：JSX本质
JSX等同于Vue模板
Vue模板非html
JSX也不是js
(babel网站中可以编译试一试)  
缺图 TODO
 
React.createElement 即h函数，返回vnode
第一个参数，可能是组件，也可能是html tag
组件名称在jsx中首字母必须大小写（区分h函数的第一个参数是 html tag string，还是个组件变量名）

#### 4：React 的合成事件
所有事件都挂载在document中  
event 不是原生的，是SyntheticEvent合成事件对象  
和Vue事件不同，和DOM事件也不同  
缺图 TODO 

###### 为什么要合成事件机制
1：更好的兼容性和跨平台  
2：挂载到document，减少内存消耗，避免频繁解绑  
3：方便事件的统一管理（如事务机制）  

#### 5：setState 和 batchUpdate
有时异步（普通使用）有时同步（setTimeout/自定义DOM事件）  
有时合并（对象形式），有时不合并（函数形式）  
1：setState主流程  
2：batchUpdate机制  
缺图 TODO
 
 


setState无所谓异步还是同步，看是否命中batchUpdate机制，判断isBatchingUpdates  
哪些能命中batchUpdate机制：  
1）生命周期（和它调用的函数）  
2）React中注册的事件（和它调用的函数）  
3）React可以管理的入口  
哪些不能命中batchUpdate机制：  
1）setTimeout/setInterval等（和它调用的函数）  
2）自定义的DOM事件（和它调用的函数）  
3）React管不到的入口  

6：transaction(事务)机制  
缺图 TODO  



#### 7：组件渲染和更新过程
JSX如何渲染为页面  
setState之后如何更新页面  
组件渲染:  
1）props/state  
2）render()生成vnode  
3）patch(elem,node)  
组件更新：  
1）setState(newState)=>dirthComponents(可能含有子组件)  
2）render()生成newVode  
3）patch(vnode, newVnode)  

更新的两个阶段  
上述的patch被拆分成两个阶段：  
1）reconciliation阶段，执行diff算法，纯js计算  
2）commit 阶段，将diff结果渲染成dom  
可能会有性能问题：  
缺图 TODO

React fiber如何优化性能：
缺图 TODO















## 6. React 真题演练
#### 1：组件间如何通讯
父子组件props
自定义事件
Redux和Context

#### 2：JSX本质
createElement  
执行返回vnode  

#### 3：context是什么，如何应用
父组件，向其下所有子孙组件传递信息  
如一些简单的公共信息：主题色、语言等  
复杂的公共信息，用redux  

#### 4：shouldComponentUpdate用途
性能优化  
(配合"不可变值"一起使用，否则会出错)  

#### 5：redux单向数据流
缺图 TODO

#### 6：setState场景题
缺图 TODO

#### 7：什么是纯函数
返回一个新值，没有副作用（不会偷偷修改其他值）  
重点是不可变值  

#### 8：组件生命周期
参考之前内容

#### 9：React发起ajax应该在哪个生命周期
componentDidMount

#### 10：渲染列表，为何使用key
同vue

#### 11：函数组件和类组件区别
纯函数，输入props，输出JSX  
没有实例，没有生命周期，没有state  
不能扩展其他方法  

#### 12：什么是受控组件
表单的值，受state控制 
需要自行监听onChange，更新state 
对比非受控组件 

#### 13：何时使用异步组件
同vue  
加载大组件  
路由懒加载  

#### 14：多个组件如何抽离公共逻辑
高阶组件  
Render Props  
Hook  

#### 15：redux 如何进行异步请求
使用异步action  
如使用redux-thunk  

#### 16：react-router 如何配置懒加载
缺图 TODO

#### 17：pureComponent有何区别
实现了浅比较的SCU  
性能优化  
需要结合不可变值的使用  

#### 18：React事件和DOM事件的区别
参考之前内容

#### 19：React 性能优化
1.渲染列表使用key
2.自定义事件、DOM事件及时销毁
3.合理使用异步组件
4.减少函数bind this的次数
（因为这样每次render都会进行一次bind操作消耗性能）
5.合理使用SCU PureComponent和memo
6.Webpack层面的优化
7.前端通用的性能优化，如图片懒加载

#### 20：React 和Vue的区别
###### 共同点：
都支持组件化  
都是数据驱动视图  
都使用vdom 操作DOM  
###### 区别：
React使用JSX拥抱JS，Vue使用模板拥抱html  
React函数式编程，Vue声明式编程  
React更加灵活，需要自力更生，Vue把想要的都给你，添加了很多用法  
