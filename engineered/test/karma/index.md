# `karma`

## overview
常用于tdd（测试驱动开发）。
可以在多个真实的浏览器中运行js code。
它既不是测试框架，也不是断言库。是一个测试运行器。（好像是负责把测试库运行起来。）本质上是一个web服务器。为连接的每个浏览器的测试代码执行源代码。把每种要浏览器的每个测试的结果被检查，并通过命令行显示给开发人员。
它只发起http server，和生成测试html文件。

### 什么时候会用到它
- 需要真实浏览器中测试代码时。
- 需要在多个浏览器中测试代码时。
- 在开发时测试本地代码。
- 在连续集成服务上测试。
- 在每次保存时测试。
- 你喜欢你的终端（我不知道作者什么意思）
- xxx
- xxx
- xxx

### 推荐测试框架
- jasmine    bdd 提供基于网页的输出结果
- mocha      
- qunit      jquery
- nodeunit   为node.js/browser提供简单的单元测试
- nunit      vs上的集成

## install
```
npm i karma
// 通常还需要安装一些插件
npm i -D karma-jasmine karma-chrome-launcher jasmine-core
```

## usage

```
npx karma init               // 生成配置文件
// 然后全选默认值
./node_modules/karma/bin/karma start
// or
// npx karma start           // 启动一个服务
// 若要使用cli，则需要安装karma-cli
// npm i -g karma-cli        // 全局安装该包后，就不用再使用npx了。
```

## configuration
为karma启动的服务提供配置项的文件。
可以用js/coffeescript/ts编写。

### 快速生成配置文件
```
karma init // 生成默认的配置文件
karma init my.conf.js // 生成指定的配置文件
```

### 开始运行karma
`karma start my.conf.js`// 使用指定的配置文件。
运行Karma时配置文件可以作为第一个参数传入。
默认情况下karma会在当前目录下寻找：
./karma.conf.js
./karma.conf.coffee
./karma.conf.ts
./.config/karma.conf.js
./.config/karma.conf.coffee
./.config/karma.conf.ts

### cli arguments
`karma start my.conf.js --log-level debug --single-run`

### 配置项说明
|key|description|param|type|default|demo|cli|
|-|-|-|-|-|-|-|
|autoWatch|-||boolean|true|||
|autoWatchBatchDelay|当有一批文件被修改后执行一次。||number|250|||
|basePath|用于解决所有的相对路径。||string|''|||
|browserDisconnectTimeout|多长时间（ms）后重联||number|2000|||
|browserConsoleLogOptions|浏览器的log属性||object|{level: 'debug', format: '%b %t %m', terminal: true}|||
|browserDisconnectTolerance|容忍的断开次数||number|0|||
|browserNoActivityTimeout|浏览器多长不活动时间 ms||number|30000|||
|browsers|启动和捕获的浏览器列表。需要相应的插件。||string[]||||
|captureTimeout|捕获超时的时间。||||||
|client.args|-||||||
|client.useIframe|在iframe中执行测试/新的窗口。||boolean|true|||
|client.runInParent|在相同的窗口中运行||boolean|true|||
|client.captureConsole|在终端中捕获log输出||||||
|client.clearContext|清空窗口中的内容||||||
|client.clientDisplayNone|设置客户端的样式||||||
|colors|是否使用有颜色的log||||||
|concurrency|karma平行支持多少个浏览器。||||||
|crossOriginAttribute|是否设置跨域需要的属性。||||||
|customContextFile|自定义内容文件||||||
|customDebugFile|自定义debug文件。||||||
|customClientContextfile|用于代替client_with_context.html||||||
|customHeaders|自定义http headers||object[]||||
|detached|是否使用另一个进程处理，不使用输出。||||||
|exclude|加载文件中不包括的文件||||||
|failOnEmptyTestSuite|运行空测试文件时是否失败。||||||
|failOnSkippedTests|测试路过功能。如fit()/xit()||||||
|failOnFailingTestSuite|在测试文件失败时是否失败。||||||
|files|-||||||
|forceJSONP|是否使用jsonp代替xhr.||||||
|frameworks|测试框架||||||
|listenAddress|-|||0.0.0.0|||
|hostname|-|||'localhost'|||
|httpsServerOptions|不会||||||
|logLevel|console时使用什么方法。||||||
|loggers|使用什么输出||||||
|middleware|不会||||||
|mime|-||object||||
|beforeMiddleware|不会||||||
|plugins|需要的插件||string[]||||
|port|-|||9876|||
|processKillTimeout|不会||||||
|preprocessors|预处理|||`{'**/*.coffee': 'coffee'}`|||
|protocol|-|||'http:'|||
|httpModule|karma webserver的module||||||
|proxies|path-proxy对的映射。||object||||
|proxyValidateSSL|不会||||||
|reportSlowerThan|不会||||||
|reporters|不会||||||
|formatError|不会||||||
|pingTimeout|-||number||5000||
|restartOnFileChange|-||||||
|retryLimit|-|||2|||
|singleRun|不会||||||
|transports|不会||||||
|proxyReq|请求的代理||||||
|proxyRes|回馈的代理||||||
|upstreamProxy|不会||||||
|urlRoot|karma的基本url|||'/'|||
|browserSocketTimeout|-|||20000|||

## api

karma.fn(param, first: string, second: boolean = true) => void
description

karma.fn(param, [options: {a: string, b?: number}])
description

## principle
此包的处理逻辑。

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。