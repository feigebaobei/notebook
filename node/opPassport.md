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

### passport 基本使用方法

初始化：app.use(passport.initialize());
安装策略： passport.use(new BasicStrategy(...))
使用策略：app.get('/...', passport.authenticate('basic'),(req,res)=>{...})
其他方便函数：
req.user 登陆后存在
req.login() 仅在注册时手工调用。登陆时由策略自动调用。
req.logout() 登出时调用

无session的，如basic-auth，在每次使用时都要检查

```
app.get('/api/users/me',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  });
```

有session的，在第一次由策略=>user。之后每次由sessionid=>user

策略=>user 又分为2步
web数据=>策略参数
策略参数=>user

sessionid=>user 也包含2件事
serializeUser: user=>sessionid
deserializeUser: sessionid=>user

### passport的学习笔记

passport只能做登录验证，且可以本地账号登录验证和三方账号登录验证。可以与express等web框架无缝对接。  

#### 策略

所策略封装成插件插入passport后才在进行登录验证。  
passport是在everyauth不足的基础出生的，everyauth是connect-auth不足的基础上出生的。  

#### 基本用法 

先配置再使用

    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy
    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({username: username}, (err, user) => {
            if (err) {return done(err)}
            if (!user) {return done(null, false, {message: 'string'})}
            if (!user.validPassword(password)) {return done(null, false, {message: 'string'})}
            return done(null, user)
            })
        }))

上例中使用username进行验证，还可以经过配置把验证项改为email等。

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'passwd'
        }, (username, password, done) => {...}))

passport.use(new Strategy([options], cb)) // 为使用验证策略进行配置
                                      ^ // 这是放的回调函数就是进行验证的回调函数。接收三个参数：username/password/done
                                        // 这个回调函数的done(又是一个回调函数)有三种形式的用法
                                        // 1. done(err)
                                        // 2. done(null, false, {message: 'string'})
                                        // 3. done(null, user)

user.validPassword(pwd) // 例子中的user的validPassword()的方法是程序员写的。
                        // 在plm里有一个与其同样功能的方法`user.authenticate(pwd, [cb])`

验证过程就是把用户登录成功后在session中保存的用户数据与用户提交的凭证对比。

什么时候保存到session里数据的。
使用什么方法保存的。
用户凭证是什么，怎么取的？
序列化是把什么序列化。  

passport.authenticate(strategyName, options, cb)
    // 策略的名称
    // 配置项 session: Boolean
    //        successRedirect: String
    //        failureRedirect: String
    //        failureFlash: Boolean / String
    //        successFlash: Boolean / String
    // 若通过验证则进入该回调函数。否则报401错误。建立session/发出响应应该在该回调函数里做。

## 使用jwt验证
