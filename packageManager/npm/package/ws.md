# ws

ws是一个使用简单、运行快速、全面测试websocket的实现。
这个包不能在浏览器中工作。若需要在浏览器中工作，则使用`WebSocket`对象。

# protocol support



# install

`npm i ws`

# api docs

[api文档](https://github.com/websockets/ws/blob/HEAD/doc/ws.md)  

WebSocket.Server是基于`EventEmitter`开发的。它是WebSocket Server类。

## usage

### class WebSocket.Server

#### new WebSocket.Server(options[, cb])
options             object
  host              string                       给server绑定的hostname
  port              number
  backlog           number
  server            http.Server | https.Server   一个已经创建好的node.js http/s server
  verifyClient      function
  handleProtocols   function
  path              string
  noServer          boolean
  clientTracking    boolean                      是否跟踪client
  perMessageDeflat  boolean | object
  maxPayload        number                       消息最多x byte.
cb                  function

会返回一个server的实例。必须有port/server/noServer三者之一，否则会报错。若使用port，则会自动创建一个http server.当使用http/s server时，需要使用server/noServer来扩展http/s server.当使用noServer模式时会把WebSocket server与http/s server分开。如在多个websocket server间共享一个http/s server.
“noServer”模式允许WebSocket服务器完全脱离HTTP/S服务器。这使得在多个WebSocket服务器之间共享一个HTTP/S服务器成为可能。

> 不鼓励使用verifyClient.鼓励在http服务器的upgrade事件中处理客户端身份验证的工作。详情见下文。

若没有在握手时设置verifyClient，则在自己得到它。若它有一个参数:
  info: {
    origin string
    req http.IncomingMessage
    secure boolean
  }

若verifyClient提供了2个参数：
  info object
  cb function
    result boolean
    colde number
    name string
    headers object

handleProtocols应该有2个参数
  protocols array
  request http.IncomingMessage

若客户端的请求子协议中没有设置handleProtocols。

perMessageDeflate可以控制permessage-deflate extension.默认值为false。当是一个对象时，其属性如下：
  serverNoContextTakeover boolean
  clientNoContextTakeover boolean
  serverMaxWindowBits number
  clientMaxWindowBits number
  zlibDeflateOptions object
  zlibInflateOptions object
  threshold number default 1024 bytes
  concurrencyLimit number

当不使用noServer模式时cb会监听http server。

#### 事件

close
connection(socket, request)
  socket websocket
  request http.IncomingMessage
error
headers(headers, request)
  headers array
  request http.IncomingMessage
  在返回socket前写回馈头。
listening

#### 属性

server.address()
server.clients                                     set     返回所有`clientTracking`为真的client组成的集合。
server.close
server.handleUpgrade(request, socket, head, cb)
server.shouldHandle(request)

### class WebSocket

websoket是基于EventEmitter开发的，它是WebSocket类。

#### 状态常量

CONNECTING 0
OPEN       1
CLOSING    2
CLOSED     3

#### `new WebSocket(address[, protocols][, optios])`

address string | url.URL
protocols string | array
options objcet
  followRedirects boolean
  handshakeTimeout number
  macRedirect number
  perMessageDeflate boolean | object 默认值是true
  protocolVersion number
  origin string
  macPayload number

返回一个WebSocket实例。

#### 事件

close
error
message
open
ping
pong
unexpected-response
upgrade
当回馈头被接收后触发。允许你从server读header，如set-cookie。

#### 属性

websocket.addEventListener(type, listenser[, options])
websocket.binaryType
websocket.bufferedAmount
websocket.close([code[, reason]])
websocket.extensions
websocket.onclose
websocket.onerror
websocket.onmessage
websocket.onopen
`websocket.ping([data[, mask]][, cb])`
`websocket.pong([data[, mask]][, cb])`
websocket.protocol
websocket.readState
websocket.removeEventListener(type, listener)
`websocket.send(data[, options][, cb])`
websocket.terminate()
websocket.url

### WebSocket.createWebSocketStream(websocket[, options])

...
```
const WebSocket = require('ws')
const ws = new WebSocket('ws://www.host.com/path', {perMessageDeflate: false})

// Sending and receiving text data
const WebSocket = require('ws');
const ws = new WebSocket('ws://www.host.com/path');
ws.on('open', function open() {
  ws.send('something');
});
ws.on('message', function incoming(data) {
  console.log(data);
});

// Sending binary data
const WebSocket = require('ws');
const ws = new WebSocket('ws://www.host.com/path');
ws.on('open', function open() {
  const array = new Float32Array(5);
  for (var i = 0; i < array.length; ++i) {
    array[i] = i / 2;
  }
  ws.send(array);
});

// simple server
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  ws.send('something');
});

// external http/s seerver
const fs = require('fs')
const https = require('https')
const WebSocket = require('ws')
const server = https.createServer({
  cert: fs.readFileSync('/path/to/cert.pem'),
  key: fs.readFileSync('/path/to/key.pem')
})
const wss = new WebSocket.Server({server})
wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    console.log(`received: ${msg}`)
  })
  ws.send('something')
})
server.listen(8080)

// Multiple servers sharing a single HTTP/S server
const http = require('http');
const WebSocket = require('ws');
const url = require('url');
const server = http.createServer();
const wss1 = new WebSocket.Server({ noServer: true });
const wss2 = new WebSocket.Server({ noServer: true });
wss1.on('connection', function connection(ws) {
  // ...
});
wss2.on('connection', function connection(ws) {
  // ...
});
server.on('upgrade', function upgrade(request, socket, head) {
  const pathname = url.parse(request.url).pathname;
  if (pathname === '/foo') {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request);
    });
  } else if (pathname === '/bar') {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});
server.listen(8080);

// Client authentication
const http = require('http');
const WebSocket = require('ws');
const server = http.createServer();
const wss = new WebSocket.Server({ noServer: true });
wss.on('connection', function connection(ws, request, client) {
  ws.on('message', function message(msg) {
    console.log(`Received message ${msg} from user ${client}`);
  });
});
server.on('upgrade', function upgrade(request, socket, head) {
  // This function is not defined on purpose. Implement it with your own logic.
  authenticate(request, (err, client) => {
    if (err || !client) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request, client);
    });
  });
});
server.listen(8080);

// Server broadcast
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

// echo.websocket.org demo
const WebSocket = require('ws');
const ws = new WebSocket('wss://echo.websocket.org/', {
  origin: 'https://websocket.org'
});
ws.on('open', function open() {
  console.log('connected');
  ws.send(Date.now());
});
ws.on('close', function close() {
  console.log('disconnected');
});
ws.on('message', function incoming(data) {
  console.log(`Roundtrip time: ${Date.now() - data} ms`);
  setTimeout(function timeout() {
    ws.send(Date.now());
  }, 500);
});

// Use the Node.js streams API
const WebSocket = require('ws');
const ws = new WebSocket('wss://echo.websocket.org/', {
  origin: 'https://websocket.org'
});
const duplex = WebSocket.createWebSocketStream(ws, { encoding: 'utf8' });
duplex.pipe(process.stdout);
process.stdin.pipe(duplex);

// How to get the IP address of the client?
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function connection(ws, req) {
  const ip = req.socket.remoteAddress;
});
// When the server runs behind a proxy like NGINX, the de-facto standard is to use the X-Forwarded-For header.
wss.on('connection', function connection(ws, req) {
  const ip = req.headers['x-forwarded-for'].split(/\s*,\s*/)[0];
});

// How to detect and close broken connections?
const WebSocket = require('ws');
function noop() {}
function heartbeat() {
  this.isAlive = true;
}
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function connection(ws) {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
});
const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);
wss.on('close', function close() {
  clearInterval(interval);
});

// 
const WebSocket = require('ws');
function heartbeat() {
  clearTimeout(this.pingTimeout);
  // Use `WebSocket#terminate()`, which immediately destroys the connection,
  // instead of `WebSocket#close()`, which waits for the close timer.
  // Delay should be equal to the interval at which your server
  // sends out pings plus a conservative assumption of the latency.
  this.pingTimeout = setTimeout(() => {
    this.terminate();
  }, 30000 + 1000);
}
const client = new WebSocket('wss://echo.websocket.org/');
client.on('open', heartbeat);
client.on('ping', heartbeat);
client.on('close', function clear() {
  clearTimeout(this.pingTimeout);
});
```
