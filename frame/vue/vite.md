# vite

Vite 是一个 web 开发构建工具，由于其原生 ES 模块导入方法，它允许快速提供代码。
Vite 是一个由原生 ESM 驱动的 Web 开发构建工具。在开发环境下基于浏览器原生 ES imports 开发，在生产环境下基于 Rollup 打包。

## 特点

快速的冷启动
即时的模块热更新
真正的按需编译

```
npm init vite-app <project-name>
cd <project-name>
npm i
npm run dev
```

## 原理

```
// index.html
...
<script type="module" src="/src/main.js"></script>
...
```

script module 是 ES 模块在浏览器端的实现，目前主流的浏览器都已经支持


## webpack & vite

|webpack|vite|||
|-|-|-|-|
|使用 map 存放模块 id 和路径，使用 webpack_require 方法获取模块导出|利用浏览器原生支持模块化导入这一特性，省略了对模块的组装，也就不需要生成 bundle|vite的冷启动更快||
|随着项目越来越大打包后的 bundle 也越来越大|ESM 天生就是按需加载的，只有 import 的时候才会去按需加载|||

## vite运行
提供 web server
  vite 的一个任务就是启动一个 web server 去代理这些模块，vite 里是借用了 koa 来启动了一个服务
模块解析
  vite 的一个实现核心 - 拦截浏览器对模块的请求并返回处理后的结果
为了解决 import xxx from 'xxx' 报错的问题，vite 对这种资源路径做了一个统一的处理，加一个/@module/前缀。
支持 /@module/
vite 在拦截了对模块的请求并执行了一个实时编译。在 webpack 里我们是使用的 vue-loader 对单文件组件进行编译。
  这样就把原本一个 .vue 的文件拆成了三个请求（分别对应 script、style 和template） ，浏览器会先收到包含 script 逻辑的 App.vue 的响应，然后解析到 template 和 style 的路径后，会再次发起 HTTP 请求来请求对应的资源，此时 Vite 对其拦截并再次处理后返回相应的内容。
实际上 vite 就是在按需加载的基础上通过拦截请求实现了实时按需编译
