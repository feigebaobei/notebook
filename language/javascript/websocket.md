# websocket

HTTP、WebSocket 等应用层协议，都是基于 TCP 协议来传输数据的。我们可以把这些高级协议理解成对 TCP 的封装。

## 构造函数

WebSocket(url[, protocols])

## 常量

WebSocket.CONNECTING 0
WebSocket.OPEN 1
WebSocket.CLOSING 2
WebSocket.CLOSED 3

## 属性

binaryType
  使用二进制的数据类型连接
bufferedAmount
  未发送到服务器的字节数
extensions
  服务器选择的扩展
onclose
  当关闭连接后的回调函数
onerror
  当连接失败后的回调函数
onmessage
  当从服务器接收到信息时的回调函数
onopen
  当连接成功后的回调函数
protocol
  服务器选择的下属协议
readyState
  当前的链接状态
url
  websocket的绝对路径

