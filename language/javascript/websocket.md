# websocket

可以实现客户端、服务双向通信。相比http没有同源限制。
基于tcp.

## 协议概览

协议包括：握手+数据传输。

```
// from client
// 第一行（leading line）遵循了HTTP请求行的格式。
// 从第二行开始是无序的header字段
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13

// from server
// 第一行（leading line）遵循了HTTP状态行的格式。
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
Sec-WebSocket-Protocol: chat
```

当客户端和服务端都发送了他们的握手协议，并且当握手已经成功，那么数据传输就开始了。这是一个双方都可以独立发送任意数据的双向通信渠道。
cs间传输的数据是消息，消息可以是若干帧。每帧包含相同类型的数据。
连接握手的过程，我不熟悉。
结束握手的过程：当收到一个关闭帧后就关闭连接。
同源策略无效。

## uris

`ws`默认使用80端口
`wss`默认使用443端口
```
ws-URI = "ws:" "//" host [ ":" port ] path [ "?" query ]
wss-URI = "wss:" "//" host [ ":" port ] path [ "?" query ]

host = <host, defined in [RFC3986](https://tools.ietf.org/html/rfc3986#section-3.2.2), 3.2.2节>
port = <port, defined in [RFC3986](https://tools.ietf.org/html/rfc3986#section-3.2.3), 3.2.3节>
path = <path-abempty, defined in [RFC3986](https://tools.ietf.org/html/rfc3986#section-3.3), 3.3节>
query = <query, defined in [RFC3986](https://tools.ietf.org/html/rfc3986#section-3.4), 3.4节>

```

# 浏览器的websocket对象

浏览器自化websocket对象。
node环境需要使用websocket的模块。
HTTP、WebSocket 等应用层协议，都是基于 TCP 协议来传输数据的。我们可以把这些高级协议理解成对 TCP 的封装。

## 构造函数

`WebSocket(url[, protocols])`
url是链接的地址。
protocols是子协议。可以是string/字符串数组。有子协议可以让websocket协议传输多种数据类型，相当于http中的`Content-Type: application/json`

## 连接协议

ws/wss
|协议|默认端口|-|
|-|-|-|
|ws|80|非加密|
|wss|433|加密|

因每个websocket连接都始于一个http请求。所有websocket连接与http连接相似，不同点是请求头中多了`Upgrade`。
websocket初始握手时：
请求头中包括`Upgrade: websocket`
响应中必须包括101状态码、Upgrate、Sec-Websocket-Accept。
Sec-Websocket-Accept响应头的值时从Sec-Websocket-Key中继承而来。
Sec-WebSocket-Key是浏览器自动生成的。

|http1.0|http1.1|
|-|-|
|-|增加了keep-alive|
|-|可以让一个http请求中，多次请求、多次回馈。|

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

## close的状态码

表示服务端发送的关闭码。
|||||
|-|-|-|-|
|0-999|保留段，未使用。|||
|1000|正常关闭; 无论为何目的而创建, 该链接都已成功完成任务.|||
|1001|终端离开, 可能因为服务端错误, 也可能因为浏览器正从打开连接的页面跳转离开.|||
|1002|由于协议错误而中断连接.|||
|1003|由于接收到不允许的数据类型而断开连接 (如仅接收文本数据的终端接收到了二进制数据).|||
|1004|保留. 其意义可能会在未来定义.|||
|1005|保留.  表示没有收到预期的状态码.|||
|1006|保留. 用于期望收到状态码时连接非正常关闭 (也就是说, 没有发送关闭帧).|||
|1007|由于收到了格式不符的数据而断开连接 (如文本消息中包含了非 UTF-8 数据).|||
|1008|由于收到不符合约定的数据而断开连接. 这是一个通用状态码, 用于不适合使用 1003 和 1009 状态码的场景.|||
|1009|由于收到过大的数据帧而断开连接.|||
|1010|客户端期望服务器商定一个或多个拓展, 但服务器没有处理, 因此客户端断开连接.|||
|1011|客户端由于遇到没有预料的情况阻止其完成请求, 因此服务端断开连接.|||
|1012|服务器由于重启而断开连接. [Ref]|||
|1013|服务器由于临时原因断开连接, 如服务器过载因此断开一部分客户端连接. [Ref]|||
|1014|由 WebSocket 标准保留以便未来使用.|||
|1015|保留. 表示连接由于无法完成 TLS 握手而关闭 (例如无法验证服务器证书).|||
|1016-1999|由 WebSocket 标准保留以便未来使用.|||
|2000-2999|由 WebSocket 拓展保留使用.|||
|3000-3999|?可以由库或框架使用.? 不应由应用使用. 可以在 IANA 注册, 先到先得.|||
|4000-4999|可以由应用使用.|||
