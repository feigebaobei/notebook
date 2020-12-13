# 开启多进程

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

我们启动一个服务、运行一个实例，就是开一个服务进程，例如 Java 里的 JVM 本身就是一个进程，Node.js 里通过 node app.js 开启一个服务进程，多进程就是进程的复制（fork），fork 出来的每个进程都拥有自己的独立空间地址、数据栈，一个进程无法访问另外一个进程里定义的变量、数据结构，只有建立了 IPC 通信，进程之间才可数据共享。





# thread

一个线程只能隶属于一个进程，但是一个进程是可以拥有多个线程的。
如果采用 Javascript 进行编码时候，请尽可能的利用Javascript异步操作的特性。

1. Node.js 虽然是单线程模型，但是其基于事件驱动、异步非阻塞模式，可以应用于高并发场景，避免了线程创建、线程之间上下文切换所产生的资源开销。
2. 当你的项目中需要有大量计算，CPU 耗时的操作时候，要注意考虑开启多进程来完成了。
3. Node.js 开发过程中，错误会引起整个应用退出，应用的健壮性值得考验，尤其是错误的异常抛出，以及进程守护是必须要做的。
4. 单线程无法利用多核CPU，但是后来Node.js 提供的API以及一些第三方工具相应都得到了解决，文章后面都会讲到。

# node中的进程

child_process是node的内置模块。
child_process.spawn()
child_process.exec()
child_process.execFile()
child_process.fork()

```
const fork = require('child_process').fork
compute = fork('path/to/file.js')
compute.send('data')
compute.on('message', param => {
  // 可得到当前环境的变量
  compute.kill()
})
compute.on('close', (code, signal) => {
  compute.kill()
})

// file.js
process.on('message', msg => {
  process.send('data')
})
```

```
// cluster demo
...
```

process的属性
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

# 进程间通信

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


