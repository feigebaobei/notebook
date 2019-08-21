# 在express框架下使用passport实现验证。

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

1. 安装依赖。

```
npm i passport-jwt jsonwebtoken
```

2. 创建一个配置文件，引用配置是使用。

```
// ./config.js
module.exports = {
    secretKey: '12345-67890-9876-54321',
    mongoUrl: 'mongodb://localhost:27017/confusion'
}
```

3. 使用数据库链接配置
    
```
var config = require('./config')
...
const url = config.mongoUrl
const connet = mongoose.connect(url, {useNewUrlParse: true, useCreateIndex: true})
```

4. 创建验证文件

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
  return jwt.sign(user, config.secretKey, {expiresIn: 3600}) // 签发token
}

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
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

5. 用户申请登录时把jwt给前端

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

6. 前端保存token

7. 用户登录超时

8. 用户jwt验证不通过

9. 用户申请登出






[关于json web token的网站]()  
[阮一峰的jwb文章]()
