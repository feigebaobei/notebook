# 在express框架下使用passport实现验证。

前面2个文章说明了cookie/session保存、验证用户的方法都有各自的缺点。现在推荐一个使用passport的方法验证用户。 
这里的代码是基于上一遍文章（express框架下使用session）的代码。

## 基本使用方法。

这部分目的在于说清passport的工作过程。

1. 安装依赖。

```
npm i passport passport-local passport-local-mongoose
```
 
2. 在app.js中挂载并配置passport

```
// app.js
var passport = require('passport')
var authenticate = require('authenticate')
// 在app.use(session())后
app.use(passport.initialize())
app.use(passport.session())
// authenticate.js
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('./models/user')
passport.use(new LocalStrategy(User.authenticate())) // passport.use(new LocalStrategy()) 是配置验证策略。User.authenticate是plm为user添加的静态方法，用来验证用户的。可是它返回了什么？
passport.serializeUser(User.serializeUser()) // passport.serializeUser()为了建立持续的session必须序列化session.再在后序的请求中反序列化。
passport.deserializeUser(User.deserializeUser())

```

3. 在models/user.js中使用passport-local-mogoose(plm)

```
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose'),
  User = new Schema({
    admin: {
      type: Boolean,
      default: false
    }
  })
User.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', User)
```

4. 在routes/users.js中使用plm的注册、验证方法。

```
router.post('/signup', (req, res, next) => {
  console.log(req.body)
  User.register(new User({username: req.body.username}),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500,
        res.json({err: err})
      } else {
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200
          res.json({success: true, status: 'registration successful!'})
        })
      }
    })
})
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.statusCode = 200
  res.json({success: true, status: 'you are successful logged in!'})
})
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy()
    res.clearCookie('session-id')
    res.send('登出成功。重定向的事让前端做')
  } else {
    var err = new Error('you are not logged in!')
    err.status = 403
    next(err)
  }
})
```
### 在npm上passport的文档。

#### 策略

passport就是为验证请求而生的。它有好多验证策略。可以使用本地验证策略，可以使用委托验证，可以使用openID验证。
在使用验证前都需要配置passport.下面是配置的demo
```
passport.use(new LocalStrategy(authcb))
```

#### session

passport会维持登录session.为了使用session一直工作，所以验证用户时必须序列化，再在后续的请求的反序列化。
passport不会暴露任何如何保存用户记录的方法。所以需要程序员提供序列化和反序列化逻辑。下面是一个例子，保存时序列化了用户id,取时根据反序列化的用户id找到user.
```
passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(null, user.id)
    })
})
```

#### 中间件

若在express/connect应用中使用要passport，则需要挂载`passport.initialize()`中间件。
若使用持续session.(建议但不强制)，则挂载`passport.session()`中间件。

```
app.use(session())
app.use(passport.initialize()) // 这两个方式到底做了什么，还需要去看原码。
app.use(passport.session())
```

#### 验证请求

passport提供了一个在路由中验证请求的方法——`authenticate()`
```
app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), (req, res) => {
    res.redirect('/')
} )
```

## 使用jwt验证