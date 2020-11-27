# 开启多进程

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
