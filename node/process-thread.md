# 开篇

node的单线程是指js的引擎只有一个实例。因其是单线程模式，所以比其他语言更适合io密集型操作。
node的单线程，以单一进程运行，因此无法利用多核CPU以及其他资源，为了调度多核CPU等资源，node还提供了cluster模块，利用多核CPU的资源，使得可以通过一串node子进程去处理负载任务，同时保证一定的负载均衡型。

node.js默认是单线程，一个node.js应用无法利用多核资源。不过有第三方库提供多线程支持，但不是无缝的。

事实上，它的单线程指的是自身Javascript运行环境的单线程，Node.js并没有给Javascript执行时创建新线程的能力，最终的实际操作，还是通过Libuv以及它的事件循环来执行的。
Nodejs所谓的单线程，只是主线程是单线程，所有的网络请求或者异步任务都交给了内部的线程池去实现，本身只负责不断的往返调度，由事件循环不断驱动事件执行。
我们平时所说的单线程是指node中只有一个js引擎在主线程上运行。其他异步IO和事件驱动相关的线程通过libuv来实现内部的线程池和线程调度。libv中存在了一个Event Loop，通过Event Loop来切换实现类似于多线程的效果。简单的来讲Event Loop就是维持一个执行栈和一个事件队列，当前执行栈中的如果发现异步IO以及定时器等函数，就会把这些异步回调函数放入到事件队列中。当前执行栈执行完成后，从事件队列中，按照一定的顺序执行事件队列中的异步回调函数。

node是单进程的，必然存在一个问题，就是无法充分利用cpu等资源。node提供了child_process模块来实现子进程，从而实现一个广义上的多进程的模式。通过child_process模块，可以实现1个主进程，多个子进程的模式，主进程称为master进程，子进程又称工作进程。在子进程中不仅可以调用其他node程序，也可以执行非node程序以及shell命令等等，执行完子进程后，以流或者回调的形式返回。

child_process模块可以实现子进程，从而实现广义的多进程模式。它提供了四个创建子进程的方法，区别如下：

1. spawn：子进程中执行的是「非node程序」，提供一组参数后，执行的「结果以流的形式返回」。
1. execFile：子进程中执行的是「非node程序」，提供一组参数后，执行的「结果以回调的形式返回」。
1. exec：子进程中执行的是「非node程序」，提供一组「shell命令」，执行的「结果以回调的形式返回」。
1. fork：子进程中执行的是「node程序」，提供一组参数后，执行的「结果以流的形式返回」。

工作进程由child_process.fork()方法创建，因此它们可以使用IPC和父进程通信，从而使各进程交替处理连接服务。

## child_process

node内置模块

```
const cp = require('child_process')
cp: {
  _forkChild Function
  ChildProcess Function
  exec Function
  execFile Function
  execFileSync Function
  exexSync Function
  fork Function
  spawn Function
  spawnSync Function
}
```

## 进程之间的通信

send()向其他进程发送消息。
on('nessage')用来监听message事件。

「stdin/stdout传递json」。是最直接的方式，适用于关联进程之间的通信，无法跨机器。
「node原生IPC」。同样的约束。
「通过sockets」。这是最通用的方式，有良好的跨环境能力，但存在网络性能消耗的问题。
「借助message queue」。是为通信问题而扩展出的一层强大的消息中间件。

# 开启多线程

worker_threads模块允许使用并行地执行JavaScript的线程。
worker_threads相对于I/O密集型操作是没有太大的帮助的，因为异步的I/O操作比worker线程更有效率，但对于CPU密集型操作的性能会提升很大。

## 线程间的通信方式有：

「共享内存」。线程之间可以共享内存，使用ArrayBuffer或SharedArrayBuffer。
「parentPort」。主要用于父子线程通信，通过经典的on('message')，postMessage形式。
「MessageChannel」。创建自定义的消息传递通道。

# process

1. 系统进行资源分配和调度的基本单位，
2. 是操作系统结构的基础.
3. 进程是线程的容器.
4. 进程是资源分配的最小单位。

简单的来说，进程是一个应用程序的实例，同一个应用程序可以起多个实例（进程）。并且进程是一个系统资源的集合，这些资源包括内存、CPU等。同时进程也是系统各项资源使用的标识，像有了身份证才能办银行卡一样，各项如 fd、端口等资源都是通过进程为标识使用的。

我们启动一个服务、运行一个实例，就是开一个服务进程，例如 Java 里的 JVM 本身就是一个进程，Node.js 里通过 node app.js 开启一个服务进程，多进程就是进程的复制（fork），fork 出来的每个进程都拥有自己的独立空间地址、数据栈，一个进程无法访问另外一个进程里定义的变量、数据结构，只有建立了 IPC 通信，进程之间才可数据共享。

# thread

一个线程只能隶属于一个进程，但是一个进程是可以拥有多个线程的。
如果采用 Javascript 进行编码时候，请尽可能的利用Javascript异步操作的特性。

1. Node.js 虽然是单线程模型，但是其基于事件驱动、异步非阻塞模式，可以应用于高并发场景，避免了线程创建、线程之间上下文切换所产生的资源开销。
2. 当你的项目中需要有大量计算，CPU 耗时的操作时候，要注意考虑开启多进程来完成了。
3. Node.js 开发过程中，错误会引起整个应用退出，应用的健壮性值得考验，尤其是错误的异常抛出，以及进程守护是必须要做的。
4. 单线程无法利用多核CPU，但是后来Node.js 提供的API以及一些第三方工具相应都得到了解决，文章后面都会讲到。

# child_process

child_process是node的内置模块。

```
child_process: {
  _forkChild Function
  ChildProcess Function
  exec Function
  execSync Function
  execFile Function
  execFileSync Function
  spawn Function
  spawnSync Function
  fork Function
}
```

```
const fork = require('child_process').fork
compute = fork('path/to/file.js')
compute.send('data') // 以消息形式发送给子进程数据
compute.on('message', param => {
  // 可得到当前环境的变量
  compute.kill()
})
compute.on('close', (code, signal) => {
  compute.kill()
})

// file.js
process.on('message', msg => { // 以消息形式发送给子进程数据
  process.send('data')
})
```

child_process.spawn()        别的方法都是基于它的。
child_process.spawnSync()
child_process.exec()         衍生 shell 并且在 shell 中运行命令，当完成时则将 stdout 和 stderr 传给回调函数。
child_process.execSync()
child_process.execFile()     类似于 child_process.exec()，但是默认情况下它会直接衍生命令而不先衍生 shell。
child_process.execFileSync()
child_process.fork()         衍生新的 Node.js 进程，并调用指定的模块，该模块已建立了 IPC 通信通道，可以在父进程与子进程之间发送消息。
每个方法都返回一个 ChildProcess 实例。 这些对象实现了 Node.js 的 EventEmitter API，允许父进程注册监听器函数，在子进程的生命周期中当发生某些事件时会被调用。

## api

`child_process.spawn(command[, args][, options])`

command 需要运行的命令
args   命令的参数
optison <Object> {
  cwd String 子进程的当前工作目录 undefined
  env Object 子进程的环境变量的键值对 process.env
  argv0 显式地设置发送给子进程的 argv[0] 的值。 如果没有指定，则会被设置为 command 的值。
  stdio Array | String 子进程的 stdio 配置
  detached 使子进程独立于其父进程运行。 具体行为取决于平台。
  uid 设置进程的用户标识
  gid 设置进程的群组标识
  serialization String 可选值'json'|'advanced'
  shell Boolean | String
  windowsVerbatimArguments Boolean
  windowsHide Boolean 藏子进程的控制台窗口 false
}
return childProcess实例

`child_process.exec(command[, options][, callback])`
command
options: {
  cwd
  env
  encodiing
  shell
  timeout
  maxBuffer
  killSignal
  uid
  gid
  windowsHide
}
callback: function (error, stdout, stderr) {}
返回: <ChildProcess>
衍生 shell，然后在 shell 中执行 command，并缓冲任何产生的输出。 传给 exec 函数的 command 字符串会被 shell 直接处理，特殊字符（因 shell 而异）需要被相应地处理：

`child_process.execFile(file[, args][, options])`
file
args
opitons: {
  cwd
  input <string> | <Buffer> | <TypedArray> | <DataView> 该值会作为 stdin 传给衍生的进程。提供此值会覆盖 stdio[0]。
  stdio
  env
  uid
  gid
  timeout
  killSignal
  maxBuffer
  encoding
  windowsHide
  shell
}
返回: <ChildProcess>

`child_process.fork(modulePath[, args][, options])`
modulePath
args
options: {
  cwd
  detached
  env
  execPath
  execArgv
  serialization
  silent
  stdio
  windowsVerbatimArguments
  uid
  gid
}
返回: <ChildProcess>

|ChildProcess类 事件|||||
|-|-|-|-|-|
|close|子进程的stdio流被关闭时|code, signal|||
|disconnect|在父进程中执行`subProcess.disconnect`或在子进程中执行`process.disconnect`时触发||||
|error|无法衍生进程、无法杀死进程、向子进程发消息失败时|error|||
|exit||code, signal|||
|message||message, sendHandle|||
|subProcess.channel||Object|||
|subProcess.channel.ref()||Object|||
|subProcess.channel.unref()||Object|||

|属性/方法|||||
|-|-|-|-|-|
|subProcess.connected|||||
|subProcess.disconnect()|关闭父进程与子进程之间的 IPC 通道，一旦没有其他的连接使其保持活跃，则允许子进程正常退出。||||
|subProcess.exitCode|||||
|subProcess.kill([signal])|||||
|subProcess.killed||Boolean|||
|subProcess.pid||Number|||
|subProcess.ref()|||||
|`subProcess.send(msg[, sendHandle[, options]][, cb])`|||||
|subProcess.signalCode|||||
|subProcess.spawnargs|||||
|subProcess.spwanfile|||||
|subProcess.stderr|||||
|subProcess.stdin|||||
|subProcess.stdio|||||
|subProcess.stdout|||||
|subProcess.unref()|||||

```
// 使用事件
cp.on('eventName', (params) => {...})
```

# cluster

Cluster会创建一个master，然后根据你指定的数量复制出多个子进程，可以使用 cluster.isMaster属性判断当前进程是master还是worker(工作进程)。由master进程来管理所有的子进程，主进程不负责具体的任务处理，主要工作是负责调度和管理。
cluster模块为什么可以让多个子进程监听同一个端口。master进程内部启动了一个TCP服务器，而真正监听端口的只有这个服务器，当来自前端的请求触发服务器的connection事件后，master会将对应的socket具柄发送给子进程。
cluster 模块可以创建共享服务器端口的子进程。
提升系统的吞吐率。对这样多个node实例，我们称之为cluster（集群）。

## 原理

工作进程由 child_process.fork() 方法创建，因此它们可以使用 IPC 和父进程通信，从而使各进程交替处理连接服务。
cluster 模块支持两种分发连接的方法。

第一种方法（也是除 Windows 外所有平台的默认方法）是循环法，由主进程负责监听端口，接收新连接后再将连接循环分发给工作进程，在分发中使用了一些内置技巧防止工作进程任务过载。

第二种方法是，主进程创建监听 socket 后发送给感兴趣的工作进程，由工作进程负责直接接收连接。

### 方案一：多个node实例+多个端口

集群内的node实例，各自监听不同的端口，再由反向代理实现请求到多个端口的分发。
优点：实现简单，各实例相对独立，这对服务稳定性有好处。
缺点：增加端口占用，进程之间通信比较麻烦。

### 方案二：主进程向子进程转发请求

集群内，创建一个主进程(master)，以及若干个子进程(worker)。由master监听客户端连接请求，并根据特定的策略，转发给worker。
优点：通常只占用一个端口，通信相对简单，转发策略更灵活。
缺点：实现相对复杂，对主进程的稳定性要求较高。

```
// cluster demo

const cluster = require('cluster');            // | |
const http = require('http');                  // | |
const numCPUs = require('os').cpus().length;   // | |    都执行了
                                               // | |
if (cluster.isMaster) {                        // |-|-----------------
  // Fork workers.                             //   |
  for (var i = 0; i < numCPUs; i++) {          //   |
    cluster.fork();                            //   |
  }                                            //   | 仅父进程执行
  cluster.on('exit', (worker) => {             //   |
    console.log(`${worker.process.pid} died`); //   |
  });                                          //   |
} else {                                       // |-------------------
  // Workers can share any TCP connection      // |
  // In this case it is an HTTP server         // |
  http.createServer((req, res) => {            // |
    res.writeHead(200);                        // |   仅子进程执行
    res.end('hello world\n');                  // |
  }).listen(8000);                             // |
}                                              // |-------------------
                                               // | |
console.log('hello');                          // | |    都执行了
```

## api

|事件||||
|-|-|-|-|
|disconnect||||
|error||||
|exit||code, signal||
|listening||address||
|message||||
|online||||




|disconnect||||
|disconnect||||
|disconnect||||

|事件||||
|-|-|-|-|
|disconnect||||

|事件||||
|-|-|-|-|
|disconnect||||

|事件||||
|-|-|-|-|
|disconnect||||





# child_process & cluster

|child_process|cluster||||
|-|-|-|-|-|
|需要处理cpu密集型时|需要提升系统的吞吐率时||||
||||||
||||||
||||||

# process的属性

env
nextTick
pid
ppid
cwd()
platform
uptime()
on('uncaughtException', cb)
stdout
stdin
stderr
title

# 进程间通信 ipc

ipc inter-process communication

# 进程守护

forever / pm2

pm2 start file.js
pm2 stop id/name
pm2 delete id/name
pm2 log name
pm2 list
pm2 monit

# linux

ps aux | grep server // 查看pid
kill -9 pid // 关闭pid
ps aux | grep server


