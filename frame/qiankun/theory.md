## theory.md
# 原理

新版的 Qiankun 基于 Single-spa 的 Parcel 做了这方面的支持。

1. 子应用如何定义和使用？
2. 如何动态加载？
3. 如何隔离？
4. Single-spa

## Single-spa

1. 它返回一个应用或方法，它们返回一个promise对象。当filfulled时resolve的参数是application module.
2. 目的是懒加载。
3. 可实现加载任意方法去实现返回一个promise.

## 不用iframe

1. url不同步。浏览器无法把iframe url压入浏览栈。
2. ui不同步。dom结构不共享。
3. 全局环境不共享。(如cookie不共享。)
4. 慢。


Single-spa
都是注册子应用，
api registerMicroApps 支持传入 html 地址
single-spa            前端资源地址的数组作为应用入口，


```
关键 api registerMicroApps 与 single-spa 类似，都是注册子应用，区别在于支持传入 html 地址或者前端资源地址的数组作为应用入口，根据约定，子应用需要暴露声明周期方法，Qiankun 会去加载资源然后根据约定拿到方法，这里官方的推荐是通过 webpack 的 umd 输出格式来做。在执行 js 资源时通过 eval，会将 window 绑定到一个 Proxy 对象上，以防污染全局变量，并方便对脚本的 window 相关操作做劫持处理，达到子应用之间的脚本隔离。 下面是截取的一些相关代码，逻辑还算比较容易看懂。
```