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

## 方法

close([code[, reason]])
  关闭当着链接
send(data)
  对要传输的数据进行排队

## 事件

close
  当一个 WebSocket 连接被关闭时触发。
  也可以通过 onclose 属性来设置。
  在本次数据接收或发送后关闭连接。
error
  当一个 WebSocket 连接因错误而关闭时触发，例如无法发送数据时。
  也可以通过 onerror 属性来设置.
message
  当通过 WebSocket 收到数据时触发。
  也可以通过 onmessage 属性来设置。
open
  当一个 WebSocket 连接成功时触发。
  也可以通过 onopen 属性来设置。
terminate
  直接关闭连接

## 常见报错

### Unexpected response code: 502

原因：接口报错了，不是websocket的问题。

### Error in v-on handler: "InvalidStateError: Failed to execute 'send' on 'WebSocket': Still in CONNECTING state."

原因： 未完成链接时发送信息。

### failed: Error in connection establishment: net::ERR_CONNECTION_TIMED_OUT

原因：连接超时。
解决方法：
可能是没有开通服务、端口、防火墙。

### error: connect ECONNREFUSED 47.94.105.206:9875

原因：服务端没有开通相应的端口、接口等。
解决方法：
可能是没有开通服务、端口、防火墙。

