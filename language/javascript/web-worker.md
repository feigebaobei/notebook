# web-worker

在前端实现多线程工作。可以异步执行代码。  

## 使用分析

![过程泳道图](../image/javascript/worker.png)  

## api

worker分为二种：专用worker/共享worker。它们的作用于它们的名字一样。专用worker，只有第一个生成它的脚本可使用，全局变量是：`DedicatedWorkerGlobalScope`。共享worker，可以被多个脚本使用。全局变量是：`SharedWorkerGlobalScope`.

worker内不能操作dom.可操作WebSockets、indexedDB等。

判断浏览器是否支持worker`window.Worker`

### 主线程

    let worker = new Worker('url.js', options) // url.js是worker线程需要执行的任务。
    worker.postMessage('str') // 主线程向子线程发送消息
    worker.onmessage(function (event) { // 接收从子线程传来的消息。消息中包括数据。
        // event.data 从子线程传来的数据
    })
    worker.addEventListener('message', function (event) {})
    worker.onerror(function (event) {}) // 当子线程错误时
    worker.addEventListener('error', function (event) {})
    worker.terminate() // 关闭子线程。推荐在主线程中关闭线程。

### 子线程

    self是子线程的全局对象
    self.addEventListener('message', function (event) { // 接收从父线程传来的消息。消息中包括数据。
    // or
    // addEventListener('message', function (event) { // 接收从父线程传来的消息。消息中包括数据。
        // event.data 是从父线程传来的数据
    })
    self.onmessage = function (event) {}
    self.onmessageerror = function (event) {} // 当发送的数据无法序列化时触发。
    self.postMessage(obj) // 向父线程传数据
    self.close() // 关闭当前子线程

## 限制

1. 必须使用同源文件。  
2. 不能操作主线程的内容。  
3. 子主线程间必须使用message传递数据。  
4. 不能执行打断主线程的代码。  
5. 必须来自网络不能使用本地文件。  
6. 不能使用document/window/parent/alert()/confirm()...
7. 可使用navigator/location.
8. Worker()的参数必须来自网络。

## 数据转移

transferable Objects
因拷贝方法处理二进制文件会造成性能问题。所以js允许主线程把原文件转换给子线程。转移后主线程就无法再使用二进制文件了。

## 建议

1. 在主线程中创建的子线程。尽量在主线程中关闭子线程。  
2. 使用同页面的web worker.  
3. 数据在子线程/父线程间转移比拷贝性能高.  

同页面使用web worker时，script的type使用浏览器不认识的值。如`app/worker`。
```
    <script id="workId" type="app/worker">
      self.addEventListener('message', (e) => {
        postMessage('hi')
      }, false)
    </script>

    // other
    let blob = new Blob([document.querySelector('#workId').textContent])
    let url = window.URL.createObjectURL(blob)
    let worker = new Worker(url)
    worker.onmessage = (e) => {
      ...
    }
    // 把页面中的脚本代码生成二进制对象。
    // 把二进制对象生成url。
    // 在worker中加载这个url.
```

## 专用worker

先来一个demo.

```
<!-- index.html -->
<html>
    <head>
    <script id="worker" type="app/worker">
      onmessage = function (e) {
        let result = e.data[0] * e.data[1]
        postMessage(result)
      }
    </script>
    </head>
    <body>
        <form action="#">
      <input type="text" id="number1">
      <input type="text" id="number2">
    </form>
    <p class="result"></p>
    <script type="text/javascript" src="./worker/main.js"></script>
    </body>
</html>
```

```
// main.js
const first = document.querySelector('#number1')
const second = document.querySelector('#number2')
const result = document.querySelector('.result')
function createWebWorker (id) {
  var blob = new Blob([document.getElementById(id).textContent])
  var worker = new Worker(window.URL.createObjectURL(blob))
  return worker
}
if (window.Worker) {
  // const myWorker = new Worker('./worker/worker.js')
  const myWorker = createWebWorker('worker') // new Worker()无法加载本地文件，需要加载远程文件。
  first.onchange = function () {
    myWorker.postMessage([first.value, second.value])
  }
  second.onchange = function () {
    myWorker.postMessage([first.value, second.value])
  }
  myWorker.onmessage = function (e) {
    result.textContent = e.data
    console.log('main', e)
  }
} else (
  console.log('curent browser dont support web worker.')
)
```

### worker特性检测

使用worker前最好判断浏览器是否支持。

### 生成一个专用worker

`new Worker(<远程url>)`

### 专用worker中消息的接收与发送

`postMessage()` // 发送数据。

`onmessage()` // 接收数据。

### 终止worker

在父线程中： `myWorker.terminate()`

在当前线程中： `close()`

### 处理错误

`onerror()` // 发生错误时触发。为防止触发默认动作。可以使用`preventDefault()`

`message / filename / lineno`

### 生成subworker

subworker解析 url时使用父worker的地址，这样方便记录它们的依赖关系。

### 引入脚本和库

`importScript()` // 同步方法。

`importScript('foo.js')`

`importScript('foo.js', 'bar.js')` // 同时加载多个脚本

## 共享worker

可以被多个脚本调用（window/iframe/worker）。

### 生成一个共享worker

`new ShareWorker(<远程url>)`

在传递消息前，必须显式打开。

`myWorker.port.start()` // 父worker

`port.start()` // 当前子worker

### 共享worker中消息的接收和发送

```
// 父worker
myWorker.port.postMessage([a, b])
myWorker.port.onmessage = function (e) {...}
// 子worker worker.js
onconnect = function (e) { // 当接口连接被创建时
    var port = e.ports[0] // 得到接口
  port.onmessage = function (e) {
    port.portMessage(result)
  }
}
```

## 关于线程安全

worker接口是操作系统级别的线程

## 内容安全策略

每个worker对象都有自己的执行上下文。为了给worker指定内容安全策略，必须为发送worker代码的请求本身加一内容安全策略。

若worker脚本的源是全局性的唯一的标识符。worker会继承它的document/worker的内容安全策略。

## worker中数据接收与发送

## 嵌入式Worker

## 更多示例

## 其它类型的worker

## worker中可用的函数和接口

## demo

```
let workStr = `
self.addEventListener('message', (e) => {
  console.log(e.data, 'worker')
  postMessage('worker: "hi"')
})
`
let createWorker = (workStr) => {
  let worker = new Worker(window.URL.createObjectURL(new Blob([`${workStr}`])))
  return worker
}
var w =createWorker(workStr)
w.postMessage('hello')
```

---
2019/07/09 by stone
