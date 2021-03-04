# html及css篇

## HTML

#### 1、如何理解语义化
用正确的标签做正确的事情！
HTML语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析；
在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的。
搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。
使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解

keyword：增加代码可读性、利于搜索引擎搜索

#### 2、默认情况下，哪些HTML标签是块级元素，哪些是内联元素
  首先：CSS规范规定，每个元素都有display属性，确定该元素的类型，每个元素都有默认的display值，如div的display默认值为“block”，则为“块级”元素；span默认display属性值为“inline”，是“行内”元素。

（1）行内元素有：a b span img input select strong（强调的语气）  
（2）块级元素有：div ul ol li dl dt dd h1-h6 p  
（3）常见的空元素：br hr img input link meta  


## CSS 

### 1：布局
#### 1）盒模型宽度计算
offsetWidth = 内容宽度+内边距+边框，不包括外边距

#### 2）margin纵向重叠问题  
相邻元素的margin-top和margin-bottom会发生重叠  
空白内容的p标签也会重叠  

#### 3）margin负值问题
#### 4）BFC理解与应用
#### 5）float布局
如何实现圣杯布局和双飞翼布局  
手写clearfix  
#### 6）flex布局



