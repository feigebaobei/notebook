# express-session

node众多模块中处理session的模块。
从1.5.0后不再需要cookie-parser。从req/res里读、写cookie。
默认使用MemeryStore内存存储器。还可以使用文件存储器、数的库存储器。

使用touch更新session的时候回调
session在服务器的默认有效时间是30分钟，可以通过3种方式去设置session的过期时间（具体那三种可以百度），下面通过代码的方式设置session过期时间为180秒
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

options: {
  cookie: { {path: '/', httpOnly: true, secure: false, maxAge: null}
    domain
    expires
    httpOnly
    maxAge
    path
    sameSite
    secure
  }
  genid uid-safe
  name 'connect.sid'
  proxy undefined
  resave true 强制session保存到session store中。即使在请求中这个session没有被修改。但是这个并不一定是必须的，如果客户端有两个并行的请求到你的客户端，一个请求对session的修改可能被另外一个请求覆盖掉，即使第二个请求并没有修改sesion。
  rolling false
  saveUninitialized true 强制没有“初始化”的session保存到storage中，没有初始化的session指的是：刚被创建没有被修改,如果是要实现登陆的session那么最好设置为false(reducing server storage usage, or complying with laws that require permission before setting a cookie) 而且设置为false还有一个好处，当客户端没有session的情况下并行发送多个请求时。默认是true,但是不建议使用默认值。
  secret string/[string]
  store MemoryStore
  unset 'keep'/'destroy' 不懂
}

req.session // 用于保存、访问session
session.regenerate(cb) // 重新生成session
session.destroy(cb) // 删除session
session.reload(cb) // 重新加载
session.save(cb) // 保存session
session.touch() // 更新maxAge，一般不需要手动触发。session中间件会做此事。

session.id // req.sessionID
session.cookie // 
session.cookie.maxAge // 
session.cookie.originalMaxAge // 

store.all(cb) // 返回session存储器中的所有session
store.destroy(sid, cb) // 删除指定session
store.clear(cb) // 删除所有session
store.length(cb) // 已经保存的session数量
store.get(sid, cb) // 返回指定session
store.set(sid, session, cb) // 更新session
store.touch(sid, session, cb) // 更新session

