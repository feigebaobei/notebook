https = http + ssl/tls

            http                       https                      http/2                     http/3
              |                          |                          |                          |
            http                       http                        http                       http
                                                          Hpack   stream             QPack    Stream
                                       ssl/tls                  tls 1.2+                 quic    tls 1.3+
    传输层    tcp                          tcp                    tcp                          udp
    网络层     ip                          ip                      ip                          ip

        明文传输                       加密传输
        不需要ssl证书                    ssl证书
        不安全                            安全
        对搜索引擎不友好              对搜索引擎不友好
        默认80接口                       默认443接口
        基于应用层                       基于传输层
        不显示                       浏览器显示绿色安全锁

https证书的生成/使用过程

1. 服务器将自己的公钥合传到数字证书认证机构.
2. 数字证书认证机构用自己的私钥对服务器传来的公钥进行加密,并颁发数字证书.
3. 服务器把传回的公钥证书发给客户端.
4. 数字证书认证机构已经事先把公钥植入了客户端.客户端使用数字机构颁发的公钥去验证证书的有效性,以及服务器的公钥的真实性.
5. 客户端使用服务端的公钥进行消息加密,后发送给服务器.
6. 服务器使用私钥进行解密.

CSR (Cerificate Signing Request) 证书请求文件
也就是证书申请者在申请数字证书时由CSP(加密服务提供者)在生成私钥Private Key的同时也生成证书请求文件CSR，证书申请者只需要把CSR文件提交给证书颁发机构后，证书颁发机构使用其根证书私钥签名就生成了证书公钥文件，也就是颁发给用户的SSL证书。

## 生成自签名证书.
// 生成ca私钥
$ openssl genrsa -out ca.key 1024
// 生成csr文件
$ openssl req -new -key ca.key -out ca.csr
// 生成自签名证书
$ openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt
// 生成server.csr文件
$ openssl req -new -key server.key -out server.csr
// 生成带有ca签名的证书
$ openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt

## 使用express / https / http 建站

    var express = require('express');
    var https = require('https');
    var http = require('http');
    var fs = require('fs');
    //同步读取密钥和签名证书
    var options = {
        key:fs.readFileSync('./keys/server.key'),
        cert:fs.readFileSync('./keys/server.crt')
    }
    var app = express();
    var httpsServer = https.createServer(options,app);
    var httpServer = http.createServer(app);
    app.get('/',function(req,res,next){
            res.send('Hello Express+https');
    });
    //https监听3000端口
    httpsServer.listen(3000);
    //http监听3001端口
    httpServer.listen(3001);

## 发展历史

|||||
|-|-|-|-|
|http/0.9|1991|只能使用get请求。不涉及数据包传输。|没有作为正式的标准|
|http/1.0|1996|增加了PUT/PATCH/HEAD/OPTIONS/DELETE命令。传输内容格式不限制。||
|http/1.1|1997|长连接，节约带宽，host域、host域、管道机制。分块传输编码||
|http/2|2015|多路复用，服务器推送、头信息压缩，二进制协议等||
|http/3|--|||

```
    http/1.1                                http/2
    client            server              client            server
         open connection                      open connection
         get /index.html                       get /index.html
     -------------------->                  -------------------->

         rsponse                                 rsponse
     <--------------------                  <--------------------

         get /style.css                         get /style.css
     -------------------->                      get /script.js
                                            -------------------->
         rsponse                                  rsponse
     <--------------------                        rsponse
                                            <--------------------
         get /script.js                   render
     -------------------->                   close connection

         rsponse
     <--------------------
  render
        close connection
```

多路复用：一个http/2连接可以发起多重请求-回应。多个请求可以共享一个tcp连接。

长连接（持久连接）：若在任意一端没有明确的提出断开连接，则保持tcp连接状态。
在请求头中设置 `Connection: keep-alive`

## http
不能保证数据完整性。
## https
1. 使用混合加密。不能被直接看到明文。不能被中间者修改、篡改。
2. c/s需要使用证书验证对方身份。

## 成本

1. ssl证书需要购买。需要绑定ip，不能在同一ip上绑定多个域名。
2. https协议会延长加载时间约50%。增加10%-20%耗电。
3. http更高效。https流量成本高。
4. https占用服务端的资源多。
5. 可采用分而治之的方式。在非私密数据的页面使用http,在有私密数据的页面使用https。

## http3
