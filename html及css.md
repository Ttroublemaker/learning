# html及css篇

## HTML

#### 1、如何理解语义化
- 让页面的内容结构化，便于对浏览器、搜索引擎解析；  
- 在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的。
- 搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。  
- 增加代码可读性，便于阅读维护理解  

keyword：增加代码可读性、利于搜索引擎搜索

#### 2、默认情况下，哪些HTML标签是块级元素，哪些是内联元素
- 行内元素有：a b span img input select strong
- 块级元素有：div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p
- 空元素：`<br> <hr> <img> <input> <link> <meta>`
- 行内元素不可以设置宽高，不独占一行
- 块级元素可以设置宽高，独占一行
- 行内块元素inline-block兼具两则特性

#### html5有哪些新特性、移除了那些元素？
- 主要是关于图像，位置，存储，多任务等功能的增加
   - 绘画 canvas
   - 用于媒介回放的 video 和 audio 元素
   - 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失
   - sessionStorage 的数据在浏览器关闭后自动删除
   - 语意化更好的内容元素，比如 article、footer、header、nav、section
   - 表单控件，date、time、email、url、search
   - 新的技术webworker, websocket, Geolocation

- 移除的元素：
   - 纯表现的元素：basefont，big，center，font, s，strike，tt
   - 对可用性产生负面影响的元素：frame，frameset，noframes

#### viewport
```
<meta name="viewport" 
content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
// width            设置viewport宽度，为一个正整数，或字符串"device-width"
// device-width     设备宽度
// height           设置viewport高度，一般设置了宽度，会自动解析出高度，可以不用设置
// initial-scale    默认缩放比例（初始缩放比例），为一个数字，可以带小数
// minimum-scale    允许用户最小缩放比例，为一个数字，可以带小数
// maximum-scale    允许用户最大缩放比例，为一个数字，可以带小数
// user-scalable    是否允许手动缩放
```

## CSS 

### 布局
#### 1、盒模型宽度计算
offsetWidth = 内容宽度+内边距+边框，不包括外边距

#### 2、margin纵向重叠问题  
相邻元素的margin-top和margin-bottom会发生重叠  
空白内容的p标签也会重叠  

#### 3、margin负值问题
#### 4、BFC理解与应用

[Block Formatting Context](https://webcache.googleusercontent.com/search?q=cache:gTcC0M4yrLAJ:https://juejin.cn/post/6854573211737784333+&cd=4&hl=zh-CN&ct=clnk&gl=sg)，即块格式化上下文；BFC 是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个 BFC 中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列
- 创建规则：
   - 根元素
   - 浮动元素（float不是none）
   - 绝对定位元素（position取值为absolute或fixed）
   - display取值为inline-block,table-cell, table-caption,flex, inline-flex之一的元素
   - overflow不是visible的元素
- 作用：
   - 外边距合并
   - 浮动元素或定位元素脱离文档流导致父元素高度丢失
   - 清除浮动
   - 兄弟元素其中一个元素浮动，其他兄弟元素占有该元素位置，需要设置margin进行隔离
   
#### 5、float布局
如何实现圣杯布局和双飞翼布局  
手写clearfix  
#### 6、flex布局

#### 30、link与@import的区别
- link是HTML方式， @import是CSS方式
- link最大限度支持并行下载，@import过多嵌套导致串行下载，出现FOUC
（Flash Of Unstyled Content：用户定义样式表加载之前浏览器使用默认样式显示文档，用户样式加载渲染之后再重新显示文档，造成页面闪烁。解决：把样式表放到文档的head）
- link可以通过rel="alternate stylesheet"指定候选样式
- 浏览器对link支持早于@import，可以使用@import对老浏览器隐藏样式
- @import必须在样式规则之前，可以在css文件中引用其他文件
- 总体来说：link优于@import

