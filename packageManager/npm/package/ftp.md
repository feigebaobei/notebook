# `ftp`

## overview
基于node开发的异步连接fpt服务器的fpt客户端。

### feature
- 查看目录内容。
- 上传文件/目录。
- 下载文件/目录。

## install
`npm i ftp -D`

## usage
### demo
执行`npm i -D ftp`
创建`<root>/src/index.js`
```
var Ftp = require('ftp')
var client = new Ftp()
let {log, dir} = console

client.connect({ // 这步很重要。
    // 本示例中下列4个数据使用了假数据。
    host: '1.2.3.4',
    post: 21,
    user: 'usernaem',
    password: 'pwd',
})

client.on('ready', () => {
    log('has connect')
    client.list((e, list) => {
        if (e) throw e
        dir(list)
        client.end()
    })
})
```

## configuration
默认配置文件：`path/to/file.json`。
|key|description|default|type|enum|demo||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||
## api
### methods
`<constructor>() -> instance`
调用构造函数返回一个实例。

`connect(config: object) -> void`
连接ftp服务器。
|config props|description|default|enum|demo|||
|-|-|-|-|-|-|-|
|host|ftp服务器的主机名或ip|'localhost'|||||
|post|ftp服务器的端口号|21|||||
|secure|是否加密|false|||||
|secureOptions|连接时的附加内容。会被`tls.connect()`处理。|none|||||
|user|用于验证的用户名|'anonymous'|||||
|password|用于验证的密码。需要与user配套。|'anonymous@'|||||
|connTimeout|最大等待连接时长|10000|||||
|pasvTimeout|最大等待pasv data连接时长|10000|||||
|keepalive|每隔多久向服务器发送一次模拟命令。用于保持连接状态。|10000|||||

`end() -> void`
当任务队列中的命令都执行后关闭连接。

`destroy() -void`
立即关闭连接。

`list([path: string], [useCompress: boolean, ] cb: function) -> void`
列出一个由下列对象组成的数组。
|object props|description|default|enum|demo|||
|-|-|-|-|-|-|-|
|type|||||||
|name|||||||
|size|||||||
|date|||||||
|rights|||||||
|rights.user|||||||
|rights.group|||||||
|rights.other|||||||
|owner|||||||
|group|||||||
|target|||||||
|sticky|||||||
path: 指定需要查看的路径。默认当前路径。
useCompression: 是否压缩，默认false

`get(path: string, [useCompress,] (err: error, fileStream: ReadableStream) => {}: function) -> void`
从服务端获得指定文件。

`put(input: any, destPath: string, [useCompression: boolean,] (err: error) => {}: function) -> void`
description

`append(input: any, destPath: string, [useCompression: boolean,] (err: error) => {}: function) -> void`
若destPath已经存在，则追加input。否则创建destPath

`rename(oldPath: string, newpPath: string, (err: error) => {}) -> void`
description

`logout((err: error) => {}) -> void`
在日志中记录登录的用户。

`delete(path: string, (err: error) => {}) -> void`
description

`cwd(path: string, (err: error, currentDir: string) => {}) -> void`
不会

`abort((err: error) => {}) -> void`
打断当前的传输。如:get()/put()/list()。

`site(command: string, (err: error， resText: string, resCode: number) => {}) -> void`
不会

`status((err: error， status: string) => {})`
获得人类可读的服务器的状态。

`ascii((err: error) => {})`
设置传输数据类型是ascii.

`binary((err: error) => {})`
设置传输数据类型是二进制的。

`mkdir(path: string, [recursive: boolean,] (err: error) => {})`

`rmdir(path: string, [recursive: boolean,] (err: error) => {})`

`cdup((err: error) => {})`
改变工作目录为当前目录的父目录。

`pwd((err: error, cwd: string) => {})`
获得当前工作目录。

`system((err: error, OS: string) => {})`
获得服务器的操作系统。

`listSafe([path: string,] [useCompression: boolean,] (err: error) => {})`
不控制字符地输出当前目录内容。

`size(path: string, (err: error, numBytes: number) => {})`

`lastMod(path: string, (err: error, lastModified: date) => {})`
获得最后一次修改的时间。

`restart(byteOffset: number, (err: error, numBytes: number) => {})`
不会

### events
`greeting(msg: string)`
当连接成功时服务端发来msg。

`ready()`
当连接成功并验证有效时触发。

`close(hadErr: boolean)`
当关闭连接时触发。

`end()`
当结束连接时触发。

`error(err: error)`
当出错时触发。协议级错误时，`err`包含`code`属性，该属性是ftp返回的3位数字。
应该与http状态码差不多。

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。