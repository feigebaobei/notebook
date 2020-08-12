# express-session

node众多模块中处理session的模块。
从1.5.0后不再需要cookie-parser。从req/res里读、写cookie。
默认使用MemeryStore内存存储器。还可以使用文件存储器、数据库存储器。

使用touch更新session的时候回调
session在服务器的默认有效时间是30分钟，可以通过3种方式去设置session的过期时间（具体哪三种可以百度），下面通过代码的方式设置session过期时间为180秒
request.getSession().setMaxInactiveInterval(30*6);
使用request对象的session属性得到session.`req.session`是json对象。
genid属性可以指定生成sessionid的方法。该属性默认使用uid-safe库生成sessionid.
     delete req.session.user // 删除session
我们知道Session是存在于服务器端的，当把浏览器关闭时，浏览器并没有向服务器发
任何请求来关闭Session，自然Session也不会被销毁，但是可以做一点努力，在所
客户端页面里使用js的window.onclose来监视浏览器的关闭动作，然后向服务器发
个请求来关闭Session，但是这种做法在实际的开发中也是不推荐使用的，最正常的
就是不去管它，让它等到默认的时间后，自动销毁。

## install

```
npm i express-session
```

## usage

```
const session = require('express-session')
session(options)
```

```
options: {
  cookie: { // default {path: '/', httpOnly: true, secure: false, maxAge: null}
    domain
    expires
    httpOnly
    maxAge
    path
    sameSite bool
    secure   bool false 是否使用https传输
  },
  genid uid-safe 生成sessionid的方法
  name  session id cookie的名称。（session id cookie: 指定id的session对应的cookie）
  proxy undefined
  resave true            强制session保存到session store中。即使在请求中这个session没有被修改。但是这个并不一定是必须的，如果客户端有两个并行的请求到你的客户端，一个请求对session的修改可能被另外一个请求覆盖掉，即使第二个请求并没有修改sesion。
  rolling false
  saveUninitialized true 强制没有“初始化”的session保存到storage中，没有初始化的session指的是：刚被创建没有被修改,如果是要实现登陆的session那么最好设置为false(reducing server storage usage, or complying with laws that require permission before setting a cookie) 而且设置为false还有一个好处，当客户端没有session的情况下并行发送多个请求时。默认是true,但是不建议使用默认值。
  secret string/[string] 用于签名session id cookie.当secret是string时使用它加签session id cookie，当secret是array时，使用第一个元素加签，使用其它元素验签。
  store MemoryStore      session store的实例
  unset 'keep'/'destroy' 不懂
}
```

```
const session = require('express-session')
const FileStore = require('session-file-store')(session) // 我只会使用文件保存session
app.use(session({
  name: 'session-id',
  secret: '123456',
  saveUninitialized: false,
  resave: true,
  store: new FileStore(),
  cookie: {maxAge: 1000}
  }))
```

## api

req.session                // 用于保存、访问session
req.session.regenerate(cb) // 重新生成session。只要调用，就会重新初始化req.session.
req.session.destroy(cb)    // 删除session
req.session.reload(cb)     // 重新加载。重新从store里取出session并放在req.session。
req.session.save(cb)       // 保存session
req.session.touch()        // 更新maxAge，一般不需要手动触发。session中间件会做此事。
                           // cb的第一个参数都是error

req.session.id                    // req.sessionID
req.session.cookie                // 
req.session.cookie.maxAge         // 
req.session.cookie.originalMaxAge // 

store是session存储器
store.all(cb)                  // 返回session存储器中的所有session
store.destroy(sid, cb)         // 删除指定session
store.clear(cb)                // 删除所有session
store.length(cb)               // 已经保存的session数量
store.get(sid, cb)             // 返回指定session
store.set(sid, session, cb)    // 更新session
store.touch(sid, session, cb)  // 更新session

## demo

```
app.use(session({
  secret: 'keyboard cat',
  cookie: {maxAge: 60 * 1000}
}))
app.get('/', (req, res, next) => {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write(`<p><views: ${req.session.views}</p>`)
    res.write(`<p>expires in: ${req.session.cookie.maxAge / 1000}s</p>`)
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to here.')
  }
})
```