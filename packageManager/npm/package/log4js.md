# `log4js`

## overview
为node开发的log4js框架。有它就不用再去浏览器中打印输出了。它与java库中的log4js同名。

### feature

- 文本带颜色输出
- 基于文件大小/日期，在日志文件中添加内容。
- 为服务器做日志。
- 配置日志信息的模板。
- 不同的分类中使用不同日志级别。

## install
`npm i log4js`

## usage

```
// 1
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";
logger.debug("Some debug messages");
// 2
const log4js = require("log4js");
log4js.configure({
  appenders: { cheese: { type: "file", filename: "cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
}); 
const logger = log4js.getLogger("cheese");
logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");
```

## configuration
默认配置文件：`path/to/file.json`。

## api
`log4js.configure(object || string) => void`
若为string则被认为是`*.json`文件的文件名。要求该文件内是json对象。
若为object则被认为是配置对象。
当引入log4js后应该第一时间配置，否则该包会使用默认配置。默认配置：log level: off,有颜色日志。

### configuration
|key|subkey|description|type|default|enum|||
|-|-|-|-|-|-|-|-|
|levels||||||||
|appenders||||||||
|categories|appenders|||||||
|categories|level|||||||
|categories|enableCallStack|||||||
|pm2||||||||
|pm2InstanceVar||||||||
|disableClustering||||||||

`log4js.getLogger([category])`
description

|key|subkey|description|type|default|enum|||
|-|-|-|-|-|-|-|-|
|level||||||||
|is||||||||
|addContext||||||||
|removeContext||||||||
|clearcontext||||||||
|setParseCallStackFunction||||||||
|level||||||||

`log4js.shutdown(cb)`
关闭log4js。
请在关闭服务器/确认不写入文件/关闭sockets时使用。

`log4js.addLayout(type, fn)`
使用自定义排版。

## principle
此包的处理逻辑。

### uml
```
```

## layout


## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。