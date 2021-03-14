# http篇

### 题目
- http常见的状态码有哪些
- http常见的header有哪些
- 什么是Restful API
- 描述一下http的缓存机制（重要）

### 1. http常见的状态码有哪些
- 状态码分类
  - 1xx 服务器收到请求
  - 2xx请求成功，如200
  - 3xx重定向，如302
  - 4xx客户端错误，如404
  - 5xx服务端错误，如500
- 常见状态码
  - 200 服务器已成功处理了请求
  - 301 永久重定向（配合location，浏览器自动处理），如旧域名迁移到新域名
  - 302 临时重定向（配合location，浏览器自动处理）  
    302是暂时的重定向，搜索引擎会抓取新的内容而保留旧的网址，搜索引擎认为新的网址只是暂时的。  
    301是永久的重定向，搜索引擎在抓取新内容的同时也将旧的网址替换为重定向之后的网址。
  - 304 资源未被修改（可使用缓存）
  - 404 资源未找到
  - 403 没有权限
  - 500 服务器错误
  - 504 网关超时
- 关于协议与规范
  - 一个约定，要求大家都跟着执行
  - 不要违反规范

### 2. http methods
- 传统的methods
  - get 获取服务器的数据
  - post 向服务器提交数据
- 现在的methods
  - get 获取数据
  - post 新建数据
  - patch/put 更新数据
  - delete 删除数据

### 2. http常见的header有哪些
- 常见的Request Headers
  - Accept 浏览器可接收的数据格式
  - Accept-Encoding 浏览器可接收的压缩算法，如gzip
  - Accept-Languange 浏览器可接收的语言，如zh-CN
  - Connection：keep-alive 一次TCP连接可重复使用
  - cookie 同域的cookie
  - host 域名
  - User-Agent（简称UA）浏览器信息
  - Content-type 发送数据的格式，如application/json

- 常见的Response Headers
  - Content-type 返回数据的格式，如application/json
  - Content-length 返回数据的大小，多少字节
  - Content-Encoding 返回数据的压缩算法，如gzip
  - Set-Cookie 服务器返回的响应头用来在浏览器种cookie，一旦被种下，当浏览器访问符合条件的url地址时，会自动带上这个cookie
- 自定义header
  - 如：请求头 headers:{'X-Requested-With':'xxx'}，常用于权限控制
- 缓存相关的headers
  - Cache-Control、Expires
  - Last-Modified、IF-Modified-Since
  - Etag、IF-None-Match


### 3. 什么是Restful API
- 一种新的API设计方法（早已推广使用）
- 传统的API设计：把每个url当做一个功能
- Restful API设计：把每个url当做一个唯一的资源
  - 如何设计成一个资源
    - 不使用url参数
  ```js
  传统的API设计：/api/list?pageIndex=2
  Restful API设计：/api/list/2
  ```
    - 使用method表示操作类型
  ```js
  传统的API设计：
  post 请求 /api/create-blog
  post 请求 /api/update-blog?id=100
  get 请求 /api/get-blog?id=100
  Restful API设计：
  post 请求 /api/blog
  patch 请求 /api/blog/100
  get 请求 /api/blog/100
  ```

### 4. 描述一下http的缓存机制（重要）
- 什么是缓存  
良好的缓存策略可以降低资源的重复加载，提高网页的整体加载速度  
哪些资源可以被缓存：静态资源（js、css、img、音视频资源等）
- http缓存策略（强制缓存+协商缓存）
  - 强制缓存 
    - cache-control
      - max-age 最大缓存时间，单位s
      - no-cache 不用客户端强制缓存，让服务端处理
      - no-store 不用客户端强制缓存，也不让服务器缓存
    - Expires
      - 同在响应头中，同为控制缓存过期
      - 已被Cache-Control代替
  - 协商缓存（也叫对比缓存）
    - 服务端缓存策略（服务端决定是否可以使用缓存，但资源还是缓存在客户端）
    - 服务端判断客户端资源，是否和服务端资源一样
    - 一致则返回304，否则返回200和最新的资源
    - 资源标识
      - 在响应头中，有两种
      - Last-Modified 资源的最后修改时间
      - Etag资源的唯一标识（一个字符串，类似人类的指纹），优先于Last-Modified
  
  ![协商缓存](/imgs/http/协商缓存.png)

  ![协商缓存2](/imgs/http/协商缓存2.png)

  ![缓存](/imgs/http/缓存.png)

  ![缓存流程](/imgs/http/缓存流程.png)

  
- 刷新操作方式对缓存的影响
  - 三种刷新操作
    - 正常操作：地址栏输入url，跳转链接，前进后退等
    - 手动刷新：F5，点击刷新按钮，右击菜单刷新
    - 强制刷新：ctrl+f5
  - 缓存影响
    - 正常操作：强制缓存和协商缓存都有效
    - 手动刷新：强制缓存失效，协商缓存有效
    - 强制刷新：强制缓存及协商缓存都失效