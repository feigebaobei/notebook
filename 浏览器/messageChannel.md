# messageChannel

Channel Messaging API的MessageChannel 接口允许我们创建一个新的消息通道，并通过它的两个MessagePort 属性发送数据。

```
var channel = new MessageChannel()
// channel: {port1, port2}
channel.port1.postMessage({k: 'v'})
channel.port2.onmessage = (e) => {
  console.log(e)
  // e: {
  //   buffules: false,
  //   path: [],
  //   ports: [],
  //   data: {k: 'v'}
  //   origin: '',
  //   source: null
  //   srcElement:
  //   target:
  //   type: 'message'
  // }
}
```