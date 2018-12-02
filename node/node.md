#node.js


##node核心设计理念
##node核心模块api
##web开发
##数据库
##测试

异步io. 服务器端js  
node.js的运行基于chrome开发的v8引擎。  

##安装

1. 进行 `http://nodejs.org`下载*.msi。
2. 一直点下一步。  
3. 在cmd中输入 `node -v`。若得到版本号就说明安装成功。  

##npm

它是由node写的一个包管理工具。关于它的用法去看它的笔记吧。  

##repl(交互式解释器)

- 读取  
- 执行  
- 打印  
- 循环  

###启动

    node

###停止

ctrl + c

##js基础

基本类型 number, boolean, string, null, undefined  
复杂类型 array, function, object  

作用域，闭包，原型链，继承。  

##node是单线程的。

事件轮询是node io的基础核心。  

process是nodejs中的全局变量。  
require相对于当前目录。  

    require('module_a.js') // 载入/node_modues/module
    require('./module_b.js') // 载入./module.js

##node重要的api

fs模块是唯一一个

##fs

    let fs = require('fs')
    fs.readFileSync('file.xxx') // 阻塞
    fs.readFile('file.xxx') // 非阻塞代码
    fs.createWriteStream('string');
    fs.createReadStremm('string');
    

##eventEmmit类

用来监听事件。  

    let events = require('events')
    eventEmit = new events.EventsEmitter()
    eventEmit.on(event, fn) // 绑定事件
    eventEmit.emit(event) // 触发
    eventEmit.addListener(event, listener)
    eventEmit.once(event, listener)
    eventEmit.removeListener(event,listener)
    eventEmit.setMaxListeners(n)
    eventEmit.listeners(event)
    eventEmit.listenerCount(emitter, event)

##Buffer  

存储原始数据的方法，可以让node处理二进制数据。  

##stream

1. readable  
2. writable  
3. duplex  
4. transform  

- data  
- end  
- error  
- finish  

##全局变量

    __filename // 当前执行脚本的文件名。
    __dirname // 当前执行脚本所在的目录。
    setTimeout(cb, ms)
    clearTimeout(t)
    setInterval(cb, ms)
    clearInterval(t)
    console
    process // 描述当前node.js进程状态的对象

##util

#异步编程

高阶函数：以函数为参数或返回值的函数。  
偏函数：调用已经预置的函数的函数。  

**优势**  
基于事件驱动的非阻塞I/O  
node是为了解决编程模型中阻塞I/O的性能问题。大部分云计算使用node.









---
2018/10/28 by stone