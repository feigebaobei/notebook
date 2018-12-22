#node.js开发指南

为实时web应用开发而诞生的平台.  
运行在服务端。没有dom/bom对象。  
异步式I/O，事件驱动。 
为风格而诞生的。   

##commonjs

把js文件按照模块整理归档。  

###为什么需要commonjs规范

1. 没有模块系统。  
2. 标准库少。  
3. 没有标准接口。  
4. 缺乏包管理系统。  
5. 列表内容。  

###usage

####1. define

    // add.js
    let sum = function (a, b) {
        return a + b
    }
    exports.sum = sum // 向外提供接口

####2. require

    // a.js
    let math = require('./path/to/add.js')

####3. use

    // a.js
    math.sum(1, 2)

##install & set

node.js与windows的兼容性不如posix操作系统。主要是因为第三方的模块需要编译原生的c/c++代码。这些编译框架和系统都是以linux为范本的。  

###window install node.js

1. 在管网下载压缩包。  
2. 解压安装。  

###linux install node.js

因为node更新的比linux系统快，所以安装的不会太新。  

1. 使用命令行安装node.js

###mac os x install node.js

1. 在官网下载压缩包。  
2. 解压安装。  

###inspect

使用以上3种方法安装完成后，需要检查是否安装正确。在命令行中运行：  

    node -v

若得到node相应的版本号，说明安装正确。否则安装失败。  

##快速入门

听说的使用node.js开发是使用黑客的思维和风格写代码。  
node.js本身包含http/fs……模块。  

    node [options] [ -e script | script.js ] [arguments]
    node debug script.js [arguments]

###监控代码变动

当监控的文件有变动时，重新解析该文件。  
若不使用`supervisor name.js`即：使用`node name.js`则不会监听文件变动。客户端每次请求都会从本地内存中取数据。  

    // install
    npm i -g supervisor
    // use
    supervisor name.js

所有的异步I/O操作完成时都会发送一个事件在事件队列。事件由`EventEmitter`对象提供。  

    // event.js
    // require
    let EventEmitter = require('events').EventEmitter
    // init
    let eventEmitter = new EventEmitter()
    // define
    eventEmitter.on('event_name', () => {
        // operate
    })
    // trigger
    setTimeout(() => {
        eventEmitter.emit('event_name')
    }, 1000)







