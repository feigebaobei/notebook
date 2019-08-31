# 在express框架下使用jwt实现验证。

接着上遍文章(使用session保存用户数据)来让使用jwt保存用户数据。
这里会用到`passport-jwt`/`jsonwebtoken`。
passport-jwt是passport的一个验证策略。它使用jwt（json web token）验证。
jsonwebtoken是一个编码、解码、验证jwt的模块。

## 使用jwt保存用户数据与使用session保存用户数据对比

|session|json web token||
|-|-|-|
|保存在server|保存在client||

因session保存在server，所以服务器压力比较大。听说并发量达到1k时就能看到效果。
因jwt保存在client，所以需要加密。

## 使用jwt

### 1. 安装依赖。

```
npm i passport-jwt jsonwebtoken
```

### 2. 创建一个配置文件，引用配置是使用。

```
// ./config.js
module.exports = {
    secretKey: '12345-67890-9876-54321',
    mongoUrl: 'mongodb://localhost:27017/confusion'
}
```

### 3. 使用数据库链接配置
    
```
var config = require('./config')
...
const url = config.mongoUrl
const connet = mongoose.connect(url, {useNewUrlParse: true, useCreateIndex: true})
```

### 4. 创建验证文件

```
./authenticate.js
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('./models/user')

var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  jwt = require('jsonwebtoken')

var config = require('./config.js')

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, {expiresIn: 3600}) // 签发token时设置超时时间是3600s
}

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken() // 从验证头中提取，模型默认是`'bearer'`.
opts.secretOrKey = config.secretKey

exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  console.log('JWT payload: ', jwt_payload)
  User.findOne({_id: jwt_payload._id}, (err, user) => {
    if (err) {
      return done(err, false)
    } else {
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    }
  })
}))

exports.verifyUser = passport.authenticate('jwt', {session: false}) // 使用jwt就不再需要session保存用户数据了。
```

### 5. 用户申请登录时把jwt给前端

```
// routes/users.js
...
var authenticate = require('../authticate')
router.post('/login', passport.authenticate('local'), (req, res) => { // 登录时还是使用passport-local
    var token = authenticate.getToken({_id: req.user._id}) // 得到签发后的jwt
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({success: true, token: token, status: 'You are successful logged in!'})
})
```

### 6. 前端保存token

```
// use localStorage
$.ajax({
  type: 'post',
  dataType: 'json',
  url: 'users/login',
  data: {
    username: 'un',
    password: 'pw'
  },
  success: funciton (res) {
    localStorage.token = getToken(res)
    },
  error: funciton (err) {...}
})
// 还可以使用vux方法。
// 还可以使用封装axios方法。
```

### 7. 用户登录超时

jsonwebtoken验证jwt后，若结果不通过，会有3种错误类型。分别是
TokenExpiredError // 当token超时时抛出。

    err = {
        name: 'TokenExpiredError',
        massage: 'jwt expired',
        expired: [ExpDate]
    }

JsonWebTokenError
jwt错误

    err = {
        name: 'JsonWebTokenError',
        message: 'jwt malformed' // 'jwt malformed', 'jwt signature in required', 'invalid signature', 'jwt audience invalid. expected: [OPTIONS AUDIENCE]', 'jwt issuer invalid. expected: [OPTIONS ISSUER]', 'jwt id invalid. expected:[OPTIONS JWT ID]', 'jwt subject invalid. expected: [OPTIONS SUBJECT]'
    }

NotBeforeError
当当前时间超过nbf的值时抛出该错误。

    err = {
        name: 'NotBeforeError',
        message: 'jwt not active',
        date: 2018-10-04T16:10:44.000Z
    }

passport在验证jwt不通过时(token过期也是一种不通过)自动向前端发送“状态码为401，内容是Unauthorized”.
在使用passport/passport-jwt/jsonwebtoken时没有发现处理token过期的方法。所以在使用passport-jwt验证不通过时再写一个验证是否过期的方法。

```
// authenicate.js
...
export.verifyUser = passport.authenticate('jwt', {
  session: false,
  failureRedirect: '/error/auth' // 在这个路由里统一处理验证不通过的事情
  })
```

```
// routes/error.js
...
router.get('/auth', (req, res, next) => {
  let header = req.headers
  let rawToken = header.authorization
  if (!rawToken.split(' ').length) {
    res.json({ // 统一的数据结构方便前端使用
      code: 403,
      data: {},
      message: 'error for get token'
    })
  } else {
    let token = rawToken.split(' ')[1]
    jwt.verify(token, config.secretKey, err => { // 这里用到jsonwebtoken/config。注意引用
      switch (err.name) {
        case 'TokenExpiredError':
        case 'NotBeforeError':
          let payload = jwt.decode(token)
          token = authenticate.getToken({_id: payload._id})
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json({success: true, token: token, status: '已经刷新token'})
          break
        case 'JsonWebTokenError':
        default:
          res.statusCode = 401
          res.json({
            code: 401,
            data: {
              error: err
            },
            message: 'token错误'
          })
          break
      }
      })
  }
  })
```

### 8. 用户jwt验证不通过

passport在验证jwt不通过时(token过期也是一种不通过)自动向前端发送“状态码为401，内容是Unauthorized”.

### 9. 用户申请登出

在前端删除token.

### 10. 不要打断活动用户的操作

在no.7里若因为token过期造成验证不通过，则向前端返回了新的token。不是在不影响用户操作前提下更新用户的token的。下面在的总结的几种不影响用户操作的前提下更新用户的token的方法。

1. 前端设置一个定时器。在小于过期时间时向后端请求新token并保存起来。
2. 把token放在cookie时。后端从cookie里取出token，在过期前更新token。
3. 将 token 存入 DB（如 Redis）中，失效则删除；但增加了一个每次校验时候都要先从 DB 中查询 token 是否存在的步骤，而且违背了 JWT 的无状态原则（这不就和 session 一样了么？）。
