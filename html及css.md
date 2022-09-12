# html 及 css 篇

## HTML

#### 1、如何理解语义化

- 让页面的内容结构化，便于对浏览器、搜索引擎解析；
- 搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。
- 增加代码可读性，便于阅读维护理解

keyword：增加代码可读性、利于搜索引擎搜索

#### 2、默认情况下，哪些 HTML 标签是块级元素，哪些是内联元素

- 行内元素有：a b span img input select strong
- 块级元素有：div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p
- 空元素：`<br> <hr> <img> <input> <link> <meta>`
- 行内元素不可以设置宽高，不独占一行
- 块级元素可以设置宽高，独占一行
- 行内块元素 inline-block 兼具两者特性

#### html5 有哪些新特性、移除了那些元素？

- 主要是关于图像，位置，存储，多任务等功能的增加

  - 绘画 canvas
  - 用于媒介回放的 video 和 audio 元素
  - 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失
  - sessionStorage 的数据在浏览器关闭后自动删除
  - 语意化更好的内容元素，比如 article、footer、header、nav、section
  - 表单控件，date、time、email、url、search
  - 新的技术 webworker, websocket, Geolocation

- 移除的元素：
  - 纯表现的元素：basefont，big，center，font, s，strike，tt
  - 对可用性产生负面影响的元素：frame，frameset，noframes

## CSS

### css 布局

#### 1、盒模型宽度计算

offsetWidth = 内容宽度+内边距+边框，不包括外边距  
box-sizing：content-box/border-box

#### 2、margin 纵向重叠问题

相邻元素的 margin-top 和 margin-bottom 会发生重叠  
空白内容的 p 标签也会重叠

#### 3、margin 负值问题

margin-top 和 margin-left 负值，元素会向上、向左移动  
margin-right 负值，右侧元素左移，自身不受影响  
margin-bottom 负值，下方元素上移，自身不受影响

#### 4、BFC 理解与应用

[Block Formatting Context](https://juejin.cn/post/6854573211737784333+&cd=4&hl=zh-CN&ct=clnk&gl=sg)，即块格式化上下文；一个独立的布局环境，内部元素布局不会影响边界以外的元素

- 形成条件：
  - 根元素
  - 浮动元素（float 不是 none）
  - 绝对定位元素（position 取值为 absolute 或 fixed）
  - display 取值为 inline-block,table-cell, table-caption,flex, inline-flex 之一的元素
  - overflow 不是 visible 的元素
- 作用：
  - 清除浮动
  - 解决高度塌陷问题

#### 5、float 布局

如何实现圣杯布局和双飞翼布局

- ##### 圣杯布局
- 要求：三列布局；中间主体内容前置，且宽度自适应；两边内容定宽
- 好处：重要的内容放在文档流前面可以优先渲染
- 原理：利用相对定位、浮动、负边距布局，而不添加额外标签

```
<!-- css -->
.container {
  padding-left: 150px;
  padding-right: 200px;
  height: 100px;
}
.main {
  width: 100%;
  height: 100%;
  background-color: green;
  float: left;
}
.left {
  width: 150px;
  height: 100%;
  background-color: blue;
  float: left;
  margin-left: -100%;
  position: relative;
  left: -150px;
}
.right {
  width: 200px;
  height: 100%;
  background-color: yellow;
  margin-left: -200px;
  float: left;
  position: relative;
  right: -200px;
}
<!-- html -->
<div class="container">
  <div class="main"></div>
  <div class="left"></div>
  <div class="right"></div>
</div>
```

- ##### 双飞翼布局
- 双飞翼布局：对圣杯布局（使用相对定位，对以后布局有局限性）的改进，消除相对定位布局
- 原理：主体元素上设置左右边距，预留两翼位置。左右两栏使用浮动和负边距归位，消除相对定位。

```
.main-wrap {
  width: 100%;
  float: left;
}
.main {
  margin-left: 150px;
  margin-right: 200px;
  height: 100px;
  background-color: green;
}
.left {
  float: left;
  width: 150px;
  height: 100px;
  background-color: blue;
  margin-left: -100%;
}
.right {
  float: left;
  width: 200px;
  height: 100px;
  background-color: yellow;
  margin-left: -200px;
}

<!-- html -->
<div class="main-wrap">
  <div class="main"></div>
</div>
<div class="left"></div>
<div class="right"></div>
```

- ##### 手写 clearfix
- 父级 div 定义 height
- 额外标签法（在最后一个浮动标签后，新加一个标签，给其设置 clear:both)
- 父级 div 定义伪类:after 和 zoom
- 父级 div 定义 overflow:hidden
- 父级 div 也浮动，需要定义宽度

推荐使用伪类元素清除浮动

```
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
.clearfix{
  *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
```

#### 6、flex 布局

[flex 布局](https://www.cnblogs.com/echolun/p/11299460.html)

### css 定位

#### 1、absolute 和 relative 定位依据

relative 依据自身定位、absolute 依据最近一层的定位元素定位（position 属性不是 static），一直到 body

#### 2、水平、垂直居中

- 水平居中
  - 元素为行内元素，设置父元素 text-align:center
  - 如果元素宽度固定，可以设置左右 margin 为 auto;
  - 绝对定位和移动: absolute + transform
  - 使用 flex-box 布局，指定 justify-content 属性为 center
  - display 设置为 tabel-cell
- 垂直居中
  - 将显示方式设置为表格，display:table-cell，同时设置 vertial-align:middle
  - 使用 flex 布局，设置为 align-item:center
  - 绝对定位中设置 bottom:0,top:0，并设置 margin:auto
  - 绝对定位中固定高度时设置 top:50%，margin-top 值为高度一半的负值
  - 文本垂直居中设置 line-height 为 height 值

### css 图文样式

#### 1、line-height 如何继承

- 写具体数值，如 30px，则继承该值
- 写比例，如 2/1，则继承该比例
- 写百分比或 em、rem，如 100%，则继承计算出来的值（考点）

### css 响应式

#### 1、rem 是什么

- px：绝对长度单位
- em：相对长度单位，相对于父元素
- rem：相对长度单位，相对于根元素，常用于响应式布局

#### 2、响应式布局常用方案

- 媒体查询，根据不同的屏幕宽度设置不同的跟元素 font-size
- rem，基于根元素的相对单位

```
  @media only screen and (max-width: 374px) {

      /* iphone5 或者更小的尺寸，以 iphone5 的宽度（320px）比例设置 font-size */
      html {
        font-size: 86px;
      }
    }

    @media only screen and (min-width: 375px) and (max-width: 413px) {

      /* iphone6/7/8 和 iphone x */
      html {
        font-size: 100px;
      }
    }

    @media only screen and (min-width: 414px) {

      /* iphone6p 或者更大的尺寸，以 iphone6p 的宽度（414px）比例设置 font-size */
      html {
        font-size: 110px;
      }
    }

    body {
      font-size: 0.16rem;
    }
```

- rem 的弊端：<strong>阶梯性</strong>
- window.screen.height // 屏幕高度
- window.innerHeight // 网页视口高度
- document.body.clientHeight // body 高度
- vw/vh 是视口宽高的 1/100
- vmax 取 vw 和 vh 的最大值，vmin 类似

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

### css3

了解动画
