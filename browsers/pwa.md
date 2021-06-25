# pwa

progressive web app 渐进式网站应用

## native app & web app

native app
|缺点|优点||
|-|-|-|
|开发成本高|||
|上线需要审核|||
|需要上传到不同的应用商店|||
|不下载不能使用|||

web app
|缺点|优点||
|-|-|-|
|手机桌面入口不便捷，使用收藏url|||
|受网络限制，若要离线，基本无法使用。|||
|不能实现消息推送|||

## describe pwa

这一个网页。
使网页接近到native app.

|优点|||
|-|-|-|
|可以添加到主屏幕。可实现开启动画、隐藏地址栏等。|||
|可实现离线缓存。无网也可使用。|||
|可实现消息推送。|||

## 实现方法

使用manifest.json，把web应用放在主屏幕上。
```
// index.html
<head>
  <link rel="manifest" href="manifest.json" />
  // ...
</head>

// manifest.json
{
  "name": "name pwa",
  "start_url": "/",
  "icons": [
    {
      "src": "icon/lowres.webp",
      "sizes": "48x48",
      "type": "image/webp"
    },
    ...
  ],
  ...
}
```
### manifest

Web应用程序清单在一个JSON文本文件中提供有关应用程序的信息（如名称，作者，图标和描述）。

#### 使用

需要在head标签里添加一个链接标记。
```
<link rel="manifest" href="/manifest.json" />
```

demo
```
{
  "name": "HackerWeb",
  "short_name": "HackerWeb",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#fff",
  "description": "A simply readable Hacker News app.",
  "icons": [{
    "src": "images/touch/homescreen48.png",
    "sizes": "48x48",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen72.png",
    "sizes": "72x72",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen96.png",
    "sizes": "96x96",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen144.png",
    "sizes": "144x144",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen168.png",
    "sizes": "168x168",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen192.png",
    "sizes": "192x192",
    "type": "image/png"
  }],
  "related_applications": [{
    "platform": "web"
  }, {
    "platform": "play",
    "url": "https://play.google.com/store/apps/details?id=cheeaun.hackerweb"
  }]
}
```
members

background_color
description
dir "auto" 设置主文本方向。有了它可以显示右到左文本。
display "standalone" 首选显示模式 fullscreen -> standalone -> minimal-ui -> browser
icons Array {sises, src:相对于manifest文件的url, type}
lang
name 供人类读的应用程序的名称。
orientation 定义web应用的顶级默认方向。 any natural landscape landscape-primary landscape-secondary portrait portrait-primary portrait-secondary
perfer_related_applications 指定一个布尔值，提示用户代理向用户指示指定的相关应用程序.
related_applications 指定一个“应用程序对象”数组，代表可由底层平台安装或可访问的本机应用程序
scope 定义此Web应用程序的应用程序上下文的导航范围。
short_name
start_url
theme_color

### service worker -> 离线缓存

用于给 web 应用提供高级的可持续的后台处理能力。
它的出现就是为了离线优先（offline first）.
service worker 是异步处理缓存数据。
localStorage/sessionStorage是同步处理缓存数据。

```

      |----------------|      |----------------|      |----------------|
      |  page          |      | service worker |      |  server        |
      |                |----->|                |----->|                |
      |                |      |                |<-----|                |
      |                |      |                |      |                |
      |----------------|      |----------------|      |----------------|

```
它介于网页与server之间。

1. 网站必须使用 HTTPS。除了使用本地开发环境调试时(如域名使用 localhost)
1. 运行于浏览器后台，可以控制打开的作用域范围下所有的页面请求
1. 单独的作用域范围，单独的运行环境和执行线程
1. 不能操作页面 DOM。但可以通过事件机制来处理
1. 事件驱动型服务线程

#### 使用前的设置

Firefox Nightly: 访问 about:config 并设置 dom.serviceWorkers.enabled 的值为 true; 重启浏览器；
Chrome Canary: 访问 chrome://flags 并开启 experimental-web-platform-features; 重启浏览器 (注意：有些特性在Chrome中没有默认开放支持)；
Opera: 访问 opera://flags 并开启 ServiceWorker 的支持; 重启浏览器。

#### 使用步骤

1. 使用serviceWorkerContainer.register()去获取、注册。
2. 若注册成功，则在ServiceWorkerGlobalScope环境中运行。独立与浏览器的主线程（main thread, 在render process里。）不能访问dom.
3. 此时可处理事件。
4. 安装service worker `oninstall`事件。若成功，则认为安装成功。
5. `onactivate`激活事件。清理先前版本的service worker脚本中使用的资源。
6. 此时service worker可以控制页面了。

##### 生命周期

installing
  开始注册，准备把缓存离线资源。
  event.waitUntil()
  self.skipWaiting()
installed
  已经启动完成。开始等待client请求，直到关闭。
activating
  此阶段允许worker去启动、清除其它worker相关的资源。如清除旧缓存。
  event.waitUntil()
  self.clients.claim()
activated
  此时可以控制功能事件（functional events）。
redundant
  此worker被别的worker代替。

#### service worker 支持的事件

```
install
activate         functional events: fetch  sync  push
message
```

#### 注册worker

```
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/path/to/sw.js', {scope: '/url/path/'}).then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error)
  })
}
```

worker会把`/url/path/`下的所有页面的请求让`/path/to/sw.js`处理。

注册失败的原因：
1. 未使用https
2. worker的工作路径是相对于origin的。

#### 安装与激活

当注册成功后，浏览器会指定路径下的网页安装并激活worker。
若安装、激活成功，则worker会对该页面的请求有全部控制权，直到不再使用worker。

```
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open('v1').then(cache => {
    return cache.addAll(['/sw-test/', '/sw-test/index.html'])
  }))
})
```

ExtendableEvent.waitUntil() 当worker完成后再执行该方法内的逻辑。
caches.open() 创建一个叫做v1的新缓存。

#### 自定义请求的响应

```
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then(response => { // 缓存中是否有指定的数据。
    if (response !== undefined) {
      return response
    } else {
      return fetch(event.request).then((response) => { // 若缓存中没有该数据，则向服务器发送请求。
        let responseClose = response.close()
        cache.open('v1').then((cache) => { // 缓存请求到的数据
          cache.put(event.request, responseClose)
        })
        return response
      }).catch(() => {
        return caches.match('/sw-test/name.png')
        // return {}
        // return 'string'
      })
    }
  }))
})
```

client发送请求时，会触发worker监听的fetch事件。
event.respondWith()劫持https请求。其内部应该返回一些数据。

##### CacheStorage 对象

全局Cache对象的接口。
match() // 返回promise.其resolve方法的参数是与match相对的缓存数据。
has() // promise Boolean 是否存在指定的缓存数据。
open() // promise resolve方法的参数是在缓存中找到的缓存数据。若不存在则创建一个新的。
delete() // promise boolean
keys() // promise 所有缓存数据的key

#### 创建新的service worker

```
self.addEventListener('install', event => {
  event.waitUntil(caches.open('v2').then(cache => {
    return cache.addAll(['/sw-test/', '/sw-test/index.html'])
  }))
})
```
此2个版本的缓存都存在。相互不影响。

#### 删了旧缓存

```
self.addEventListener('activate', (event) => {
  var cacheWhiteList = ['v2']
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map((key) => {
        if (cacheWhiteList.indexOf(kye) === -1) {
          return caches.delete(key)
        }
      }))
    })
  )
})
```

## 后记

都说当前pwa是下一代网页。多久后能看成为当代，不知道需要多长时间。从整个处理缓存数据的逻辑角度看，主要是浏览器是否支持。就像es6不普及就是因为浏览器不支持。
若网页的请求被前端代码hijeck后。后端就无法得到请求。因后端无法得到请求，所以其于请求的一些功能无法在后端做。如：统计pv、pc、转化率。
这些请求被运行在前端的要代码（如：上例中的sw.js）控制。可能被xss/csrf攻击。
需要斟酌哪些数据需要缓存在浏览器中，若缓存数据量太大，则对浏览器的压力太大。

---

2020/11/16 by stone