# `consola`

## overview

为node.js/browser优雅输出日志。

### feature
- 方便使用。
- 可支持报道中做插件。
- 支持cli
- 支持tag
- 重定向console/stdout/stderr
- 运行浏览器环境
- 支持暂停，继续。
- 支持mock
- 支持群发。

## install
`npm i consola`

## usage

```
const consola = require('consola');
consola.success('built!')
consola.info('built string!')
consola.error(new Error('foo'))
// 会输出相应日志。
```

## configuration
默认配置文件：`path/to/file.json`。

## api
`<type>(logObject) <type>(args...)`
按照指定的形式输出。

`addReporter(reporter)`
添加报道者

`removReporter(reporter?)`
移除报道者

`setReporter(reporter|reporter[])`
设置报道者

`create(options)`
创建一个consola的实例。

`···`
### fields
level: 

logObject:
    message
    additional
    args
    date
    tag

reporters
    BasicReporter
    FancyReporter
    JSONReporter
    WinstonReporter
    // 可自定义reporter

## principle
`consola.js`中定义了一个`consola`类。此类在初始化时设置`reporter`。在调用`_log`时，使用`reporter`输出日志。
所有的内置`reporter`都在`reporter/index.js`统一输出。每个`reporter`都在`reporter/`目录下。每个reporter都有自己输出日志的方式。
作者说“优雅”什么的。我在代码中也没看多少优雅的代码。在终端中看日志也没发现多好看。只是比log多了一个小icon。比较好的地方是设置配置项的时候比较好。
该包依赖`chalk`。直接使用chalk也挺好的。

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。