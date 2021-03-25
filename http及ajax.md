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
  - Accept 浏览器可接收的数据格式，如：application/json, text/plain, \*/\*
  - Accept-Encoding 浏览器可接收的压缩算法，如gzip
  - Accept-Languange 浏览器可接收的语言，如：Accept-Languange: zh-CN,zh;q=0.9,en;q=0.8
  - Connection：keep-alive 一次TCP连接可重复使用
  - cookie 同域的cookie
  - host 域名
  - User-Agent（简称UA）浏览器信息
  - Content-type 发送数据的格式，如：application/json;charset=UTF-8

- 常见的Response Headers
  - Content-type 返回数据的格式，如：application/json
  - Content-length 返回数据的大小，多少字节
  - Content-Encoding 返回数据的压缩算法，如gzip
  - Set-Cookie 服务器返回的响应头用来在浏览器种cookie，一旦被种下，当浏览器访问符合条件的url地址时，会自动带上这个cookie
  - Connection:一次TCP连接是否可重复使用 keep-alive/close
  
- 自定义header
  - 如请求头 headers:{'X-Requested-With':'xxx'}，常用于权限控制
  
- 缓存相关的headers
  - Cache-Control、Expires 强缓存
  - Last-Modified、IF-Modified-Since 协商缓存
  - Etag、IF-None-Match 协商缓存


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
  patch或get 请求 /api/blog/100
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
      - no-cache 不用客户端强制缓存，让服务端处理（协商缓存）
      - no-store 不用客户端强制缓存，也不让服务器缓存，不使用缓存
    - Expires
      - 同在响应头中，同为控制缓存过期
      - 已被Cache-Control代替
      - Expires: Thu, 22 Apr 2021 01:17:22 GMT
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

---

# AJAX

### 题目
- 书写一个简易的ajax
- 跨域的常用实现方式
  
### 1. XMLHttpRequest
```js
/** 1. 创建XMLHttpRequest对象 **/
var xhr = null;
xhr = new XMLHttpRequest()
/** 2. 连接服务器 **/
xhr.open('get', url, true)
/** 3. 发送请求 **/
xhr.send(null);
/** 4. 接受请求 **/
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      success(xhr.responseText);
    } else {
      /** false **/
      fail && fail(xhr.status);
    }
  }
}
```

**xhr.readyState**
- 0－（未初始化）还没有调用send()方法
- 1－（载入）已调用send()方法，正在发送请求
- 2－（载入完成）send()方法执行完成，已经接收到全部响应内容
- 3－（交互）正在解析响应内容
- 4－（完成）响应内容解析完成，可以在客户端调用了

### 2. websocket
<table>
  <tr><th>属性</th><th>描述</th></tr>
  <tr>
    <td>Socket.readyState</td>
    <td>
      只读属性 readyState 表示连接状态，可以是以下值
      <table>
        <tr><th>状态码</th><th>含义</th></tr>
        <tr><td>0</td><td>表示连接尚未建立</td></tr>
        <tr><td>1</td><td>表示连接已建立，可以进行通信</td></tr>
        <tr><td>2</td><td>表示连接正在进行关闭</td></tr>
        <tr><td>3</td><td>表示连接已经关闭或者连接不能打开</td></tr>
      </table>
    </td>
  </tr>
  <tr><td>Socket.bufferedAmount</td><td>只读属性 bufferedAmount 
    已被 send() 放入正在队列中等待传输，但是还没有发出的 UTF-8 文本字节数。</td></tr>
</table>

WebSocket 事件
|事件	|事件处理程序|	描述|
|---|---|---|
|open|	Socket.onopen|	连接建立时触发|
|message|	Socket.onmessage|	客户端接收服务端数据时触发|
|error	|Socket.onerror|	通信发生错误时触发|
|close	|Socket.onclose|	连接关闭时触发|


WebSocket 方法

|方法|	描述|
|---|---|
|Socket.send()|	使用连接发送数据|
|Socket.close()|	关闭连接|
### 2. 跨域

#### 同源策略
- ajax请求时，浏览器要求当前网页和服务必须同源（安全）
- 同源：协议、域名、端口，三者必须一致
- 加载图片、css、js可无视同源策略
- 所有跨域，都必须通过服务端允许和配合
- 未经服务端允许就实现跨域，说明浏览器有漏洞，危险信号

#### 跨域方案
- JSONP
> JSONP 的原理：利用 `<script>`标签没有跨域限制的漏洞。通过`<script>`标签指向一个需要访问的地址并提供一个回调函数来接收数据  
> JSONP 使用简单且兼容性不错，但是只限于 get 请求
> ```js
>   var script = document.createElement('script');
>   script.type = 'text/javascript';
> 
>   // 传参并指定回调执行函数为onBack
>   script.src = 'http://www.....:8080/login?user=admin&callback=onBack';
>   document.head.appendChild(script);
> 
>   // 回调执行函数
>   function onBack(res) {
>     alert(JSON.stringify(res));
>   }
> ```
- cors 服务器设置http header
![服务器设置http header](./imgs/js/跨域响应头设置.png)

- nginx代理跨域
- webpack-dev-server(仅适用于开发环境)

### 题目
- 书写一个简易的ajax
```js
function ajax (url) {
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true) // true表示异步请求
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else if (xhr.status === 404) {
          reject(new Error('404 not found'))
        }else if ( xhr.status === 500) {
          reject(new Error('500 server error'))
        }
      }
    }
    xhr.send(null)
  })
  return p
}
```
### 3. fetch
### 4. axios
