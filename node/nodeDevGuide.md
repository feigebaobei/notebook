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

node程序是由事件循环开始，到事件循环结束。  
node的模块与包机制的实现参照了commonjs的标准，但不完全遵循。  
在模块中有`this`就是`module`对象。`module`对象有2个属性`require`引入，`exports`输出。  
输出有2种方法。  

|输出|接收|使用|
|-|-|-|
|`module.exports = fn`|`var Fn = require('./name')`|`Fn.prop`|
|`exports.fn = function(){}`|`var Fn = require('./name')`|`Fn.fn`|  

exports是一个空对象。module.exports输出的是一个被赋值的元素。export.xxx输出的是一个包含xxx属性（方法）的对象。  

包通常是一些模块的集合。  

commonjs规范的包应该具备以下特征。  

- package.json必须在包的顶层目录下。  
- 二进制文件应该在bin目录下。  
- js代码应该在lib目录下。   
- 文档应该在doc目录下。  
- 单元测试文件应该在test目录下。  

package.json的字段说明  

||||
|-|-|-|
|name|包的名称，必须是唯一的（相对于npm）。由小写英文字母、数字、下划线组成。不能有空格。||
|description|简单说明||
|version|语义化版本识别规范。||
|keywords|关键字数组。通常用于搜索||
|maintainers|维护者数组。每个元素包含name/email/web/...||
|contributors|贡献者数组。每个元素包含name/email/web/...||
|bugs|提交bug的地址，一般是网址、电子邮件。||
|licenses|许可证数组。每个元素包含type许可证名称/url许可证文本的链接||
|respositories|仓库托管地址数组。每个元素包含type/url/path||
|dependencies|包的依赖。每个元素包含nema/version||  

npm的文档请去`../npm/`  

###调试

    node debug fileName.js // 本地调试
    node --debug[=port] fileName.js // 远程调试
    node --debug-brk[=port] fileName.js // 远程调试
    // use node-inspector
    npm i -g node-inspector
    node --debug-brk=5858 fileName.js
    // 在浏览器中打开https://127.0.0.1.8080/debug?port=5858

##core module

###全局对象

    global: {
        precess: { // 当前node.js进程状态的对象
            argv: [] // node filename 每个元素的一个运行参数。
            stdout: 标准输出流。process.stdout.write提供了更底层的接口。
            stdin: 标准输入流
            nestTick: 为事件循环设置一项任务。可以把复杂的工作拆散，变成一个个较小的事件。
        }
    }


###常用工具

####util.inherits()

实现对象间原型继承的函数。`util.inherits(subObj, baseObj)`只继承原型中的属性不继承构造函数中的。  

####util.inspect()

    util.inspect(obj, [showHidden], [depth], [colors])
    showHidden: boolean 是否显示隐藏信息。
    depth: number 最大递归层数。默认为2.
    color: boolean true:ansi颜色编码。
obj=>sting  

####util.isArray()
####util.isRegExp()
####util.isDate()
####util.isError()
####util.format()
####util.debug()

###事件驱动

####事件发射器

events.EventEmitter  

    let events = require('events')
    let emitter = new event.EventEmitter()
    emitter.on('someEvent', function (arg1, arg2) {
        ...
    })
    emitter.on('someEvent', function (arg1, arg2) {
        ...
    })
    emitter.emit('someEvent', 'str', number)
    // 以str/number分别为参数传入fn

    EventEmitter.on(event, listener)
    EventEmitter.emit(event, [arg1....])
    EventEmitter.once(event, listener)
    EventEmitter.removeListener(event, listener)
    EventEmitter.removeAllListeners([event])

一定要为`error`事件设置`listener`否则会报错，中止整个程序。  

###文件系统 fs

提供文件的读取、写入、更名、删除、遍历目录、链接等posiz文件系统操作。  

####fs.readFile(fileName, [encoding], [callback(err, data)])

|-|-|-|
|fileName|文件的名称||
|encoding|文件的字符编码||
|callback|回调函数||
|error|有没有错误发生。||
|data|文件内容||

####fs.readFileSync(fileName, [encoding])
####fs.open(path, flags, [mode], [callbakc(error, fd)])

|参数|说明||
|-|-|-|
|path|文件的路径||
|flags|以哪种方式打开文件|r: 读取模式 r+: 读写模式 w: 写入模式，若不存在则创建。 w+: 读写模式，若不存在则创建。 a: 追加模式，若不存在则创建。 a+: 读取追加模式，若不存在则创建。|
|mode|在创建文件时给文件指定权限。||
|fd|文件描述符||

####fs.read(fd, buffer, offset, length, position, [callback(err, bytesRead, buffer)])

|参数|说明||
|-|-|-|
|fd|文件描述符||
|buffer|缓冲区对象||
|offset|偏移量||
|position|从当前文件的哪个位置读取文件||
|err|||
|bytesRead|读取文件的字节数||
|buffer|缓冲区对象||

####http

    let http = require('http')
    let server = http.Server() // init
    server.on('request', function (request, response) {
        ...
    })
    server.listen(3000) // 监听3000端口

|http.Server的事件|回调函数|说明|
|-|-|-|
|request|fn(reqeust, response)||
|connection||当tcp链接建立时触发。|
|close||当服务器关闭时触发。不是在用户断开连接时。|

|http.ServerRequest|回调函数|说明|
|-|-|-|
|data|fn(chunk: 请求到的数据){}|当请求体数据来时触发|
|end||当请求体数据传输完成时触发|
|close||当用户请求结束时触发，不同于end|  

|http.ServerResponse|回调函数|说明|
|-|-|-|
|writeHead|(statusCode, [headers是一个类似关系数组的对象])|向请求的客户端发送响应头|
|write|(data, [encoding])|向请求的客户端发送响应的内容|
|end|[data], [encoding]|结束响应，告知客户端已经发送完成|  

http.request(options: 请求的参数, callbac)  

##WEB开发


