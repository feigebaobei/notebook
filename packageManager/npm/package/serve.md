# serve

可以提供静态站点（单页面应用或静态文件）服务。它可以为目录里的内容提供一个灵巧的服务。
在生产环境部署网站时，推荐使用[`vercel`](https://vercel.com)

## install

至少需要一个node LTS

```
npm i serve
// or
yarn add serve
```

## usage

```
npx serve // 在当前目录启动服务
// or
serve // 在当前目录启动服务
serve folder_name
serve --help
serve --version
serve [-l listen uri [-l ...]] [directory]
```
默认把服务启动在0.0.0.0:5000。

## configuration

`serve`的配置文件是`serve.json`

```
public
cleanUrls
rewrites
redirects
headers
directoryListing
unlisted
trailingSlash
rederSingle
symlinks
etag
```

## options

--help
-v --version
-l --listen listen_uri 指定需要鉴定的uri。可以指定多个。
-d --debug 显示bug信息。
-s --single 当找不到请求时全部返回'index.html'
-c --config 指定自定义路径到serve.json
-n --no-clipboardi 不能复制本地地址
-u --no-compression 不能压缩文件
--no-etag response header中使用Last-Modified代替ETag.
-S --symlinks 使用符号链接代替404
--ssl-cert 在https请求中使用一个可选的SSL/TLS证书。
--ssl-key 一个可选的SSL/TLS证书的私钥的路径

## endpoints

```
serve -l 1234
serve -l tcp://hostname:1234
serve -l unix:/path/to/socket.sock
serve -l pipe:\\.\pipe\PipeName
```

## api

这个模块的核心是`serve-handler`,它可以用于http服务的中间件。
```
const hander = require('serve-handler')
const http = require('http')
const server = http.createServer((req, res) => {
  return handler(req, res)
  })
server.listen(3000, () => {
  console.log('running at http://localhost:3000')
  })
// 也可以使用micro代替http.createServer
```
