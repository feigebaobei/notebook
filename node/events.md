# 事件驱动

有点像参赛者模式。

```
// 把事件发送到事件队列中


                                         |-------->|
  |-------|                     events   |         |
  |       |   EventEmitter   |--| |--| |--|        |
  |       | ---------------> |  | |  | |  |     event loop ----> event handlers
  |       |                  |--| |--| |--|        |
  |-------|                              ^         |
                                         |---------|
```

# events

一般事件名称是用一个大小写混合（camel-cased ）的字符串表示，然而，没有严格的限制，因为任何字符串将被接受。

# EventEmitter 类

events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。
当一个EventEmitter表达错误时，一般会派发一个'error'事件， Error事件在node中作为一个特例。如果没有对此做监听，默认行为就是打印错误日志并退出当前程序。

|实例事件|||
|-|-|-|
|newListener|||
|removeListener|||
|实例方法|||
|-|-|-|
|emitter.addListener(eventName, listener)|是emitter.on的别名。|为指定事件添加一个监听器到监听器数组的尾部。|
|emitter.emit(eventName[, ...args])|||
|emitter.eventNames()|获取监听器的全部事件名||
|emitter.getMaxListeners()|获取当前的监听器最大限制数的值||
|emitter.listenerCount(eventName)|获取监听器数组的长度||
|emitter.listeners(eventName)|监听器数组||
|emitter.off(eventName, listener)|||
|emitter.on(eventName, listener)|为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。||
|emitter.once(eventName, listener)|||
|emitter.prependListener(eventName, listener)|||
|emitter.prependOnceListener(eventName, listener)|||
|emitter.removeAllListeners([eventName])|移除指定事件或全部事件的所有监听器||
|emitter.removeListener(eventName, listener|||
|emitter.setMaxListeners(n)|设置监听器的默认限制的数量。|默认监听器不超过10个。|
|emitter.rawListeners(eventName)|获取 eventName 事件的监听器数组的拷贝，包括封装的监听器||
|events.once|const {once} = require('events')||
|-|-|-|
|events.on(emitter, eventName)|||
|-|-|-|
|newListener|||
|newListener|||
|类属性|||
|-|-|-|
|EventEmitter.errroMonitor|||
|event.bubbles|Boolean|always return false|
|event.cancelBubble()|别名是event.stopPropagation()||
|event.cancelable()|Boolean||
|event.composed|||
|event.composedPath()|||
|event.currentTarget|||
|event.defaultPrevented|||
|event.eventPhase|||
|event.isTrusted||false|
|event.preventDefault()|||
|event.returnValue|||
|event.srcElement|||
|event.stopImmediatePropagation()|||
|event.stopPropagation()|||
|event.target|||
|event.timeStamp|||
|event.type|||
|EventTarget类|||
|-|-|-|
|eventTarget.addEventListener(type, listener[, options])|||
|eventTarget.dispatchEvent(event)|||
|eventTarget.removeEventListener(type, listener)|||
|NodeEventTarget类|||
|nodeEventTarget.addListener(type, listener[, options])|||
|nodeEventTarget.eventNames()|||
|nodeEventTarget.listenerCount(type)|||
|nodeEventTarget.off(type, listener)|||
|nodeEventTarget.on(type, listener[, options])|||
|nodeEventTarget.once(type, listener[, options])|||
|nodeEventTarget.removeAllListeners([type])|||
|nodeEventTarget.removeListener(type, listener)|||
|类方法|||
|-|-|-|
|EventEmitter.defaultMaxListeners(n)|||

```
const events = require('Events')
const eventEmitter = new events.EventEmitter()
eventEmitter.on('eventName', () => {...}) // 可为同一个事件类型绑定多个回调fn.这些回调函数会按定义顺序依次执行。
eventEmitter.on('eventName', () => {...})
eventEmitter.on('eventName', () => {...})
setTimeout(() => {
  eventEmitter.emit('eventName')
})
```

## events处理错误

require('events') // 返回一个EventEmitter类
可用于要实例化EventEmitter实例（eventEmitter）。
eventEmitter实例可注册同步、异步监听器。
实例化出错时会被node.js视为特殊情况。打印错误日志并退出当前程序。
为了防止崩溃 Node.js 进程，可以使用 domain 模块。
处理error事件有2种方式：
```
// 推荐
const EventEmitter = require('events')
const MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()
// 应该先绑定再触发。
myEmitter.on('error', (err) => {
  console.log(`错误信息：${err}`)
})

myEmitter.on(EventEmitter.errorMonitor, (err) => {...})

// 不推荐
使用domain
```

##





