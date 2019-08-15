# express框架下使用session

上一遍文章说了cookie的不足，提到使用session是解决缺点的一个方法。这遍文章说说怎么使用session.作者使用了文件保存session的方法。若用别保存方式（内存、数据库）也行，记得使用相应的模块。  
下面从使用内存存储和文件存储的2个方法分别说明。  

## 内存存储session

### 实现过程

    // app.js
    // 引入express-session
    var session = require('express-session')
    // 为应用绑定session中间件
    app.use(session({
        name: 'session-id',
        secret: '12345-67890',
        saveUninitialized: false,
        resave: false
    }))

### 查看结果

    router.get('/session/first', (req, res, next) => {
      let s = req.session
      console.log(s)
      res.send(s)
    })

![](../image/node/session0.jpg)

### 使用

使用这个方法做一个demo.比如显示浏览次数。

    router.get('/session/view', (req, res, next) => {
      let s = req.session
      if (req.session.views) {
        req.session.views++
        res.send(`views: ${req.session.views} time.`)
      } else {
        req.session.views = 1
        res.send('views: 0')
      }
    })

![](../image/node/session1.jpg)  
我发现在操作session后，会在根目录下创建一个session目录，里面保存了session.

## 文件存储session

相对于内存存储session不同在于保存session的位置不同。内存存储方式是把session保存在session里。对于后台服务会占用大量内存，这种方法肯定不行。文件存储方式是把session保存在文件夹里。听说还有一种叫数据库保存。

### install

要使用文件存储session需要安装`session-file-store`。

    npm i express-session session-file-store

## 使用文件存储

    // app.js
    var session = require('express-session')
    var FileStore = require('session-file-store')(session) // 引入 
    // 在express-session中使用
    app.use(session({
      name: 'session-id',
      secret: '12345-67890',
      saveUninitialized: false,
      resave: false,
      store: new FileStore() // 指明使用文件存储
    }))

## 注册、登录、登录验证和登出

这部分需要`bodyParser mongoose`模块。记得安装。

### 1. 创建数据库连接。

连接了数据库就可以把用户数据放在数据库里。

    // app.js
    const mongoose = require('mongoose')
    const url = 'mongoodb://localhost:27017/confusion'
    const connect = mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true})
    connest.then(db => {
      console.log('Connect correct to server')
    }, err => {console.log(err)})

### 2. 创建user的model，用于连接数据库。

在项目根目录下创建models目录，再创建user.js。下面定义了user的model

    // @/models/user.js
    var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = new Schema({
      username: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      admin: {
        type: Boolean,
        default: false
      }
    })
    module.exports = mongoose.model('User', User)

### 3. 创建注册的接口。

    注册的接口
        是否已经存在用户------存在------>不重复创建.  
                |-----------不存在----->创建用户

    // @/routes/users.js
    // /session/first /session/view 注释了或删除了。
    // 该文件在app.user(session(...))之前，所以得不到req.session
    // // 查看session
    // router.get('/session/first', (req, res, next) => {
    //   let s = req.session
    //   console.log(s)
    //   res.send(s)
    // })
    // // 在session里保存浏览次数
    // router.get('/session/view', (req, res, next) => {
    //   let s = req.session
    //   if (req.session.views) {
    //     req.session.views++
    //     res.send(`views: ${req.session.views} time.`)
    //   } else {
    //     req.session.views = 1
    //     res.send('views: 1')
    //   }
    // })
    
    router.post('/signup', (req, res, next) => {
      console.log(req.body)
      User.findOne({username: req.body.username}).then(user => {
        if (user === null) {
          return User.create({
            username: req.body.username,
            password: req.body.password
          })
        } else {
          var err = new Error(`User ${req.body.username} already exist!`)
          err.status = 403
          next(err)
        }
      }).then(user => {
        res.statusCode = 200
        res.json({status: 'registration successful', user: user})
      }).catch(err => {
        res.send(err)
      })
    })

### 4. 创建登录的接口。

    登录的接口https://github.com/feigebaobei/nodejs/tree/master/node-session
        是否已经登录------登录------>不做事  
            |-----------没登录----->验证username/password是否正确.----正确---->设置已经登录  
                                            |----------------------不正确---->返回错误

    router.post('/login', (req, res, next) => {
      if (req.session.auth) { // 以req.session.auth为标记，标记是否已经通过登录验证
        res.statusCode = 200
        res.send('You are already authenticated')
      } else {
        User.findOne({username: req.body.username}).then(user => {
          if (user) {
            if (user.password !== req.body.password) {
              var err = new Error(`password error`)
              err.status = 403
              next(err)
            } else {
              req.session.auth = true // 登录成功设置标记为true
              res.statusCode = 200
              res.send('login successful')
            }
          } else { // 没用指定用户
            var err = new Error(`User ${req.body.username} does not exist!`)
            err.status = 403
            next(err)
          }
        // }).catch(err => next(err))
        }).catch(err => {
          res.send(err)
        })
      }
    })

### 5. 创建登出的接口。

    router.get('/logout', (req, res, next) => {
      if (req.session) {
        req.session.destroy() // 删除session
        res.clearCookie('session-id') // 删除cookie
        res.send('登出成功。重定向的事让前端做')
      } else {
        var err = new Error('you are not logged in!')
        err.status = 403
        next(err)
      }
    })

### 6. 登录后才可访问的接口

    // @/routes/news.js
    var express = require('express');
    var router = express.Router();
    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });
    module.exports = router;

### 7. 编写登录验证的中间件。注意登录接口、登录验证中间件、登录后才可访问的接口的次序。

    // app.js
    // 1.引入路由
    var index = require('./routes/index');
    var users = require('./routes/users');
    var news = require('./routes/news');
    // 2.挂载session中间件
    app.use(session({
      name: 'session-id',
      secret: '12345-67890',
      saveUninitialized: false,
      resave: false,
      store: new FileStore()
    }))
    // 3.挂载不需要登录验证的路由
    app.use('/', index)
    app.use('/users', users)
    // 4.定义验证登录函数
    let authFn = (req, res, next) => {
      console.log(req.session)
      if (req.session.auth) {
        next()
      } else {
        var err = new Error('You are not authenticated!')
        err.status = 403
        next(err)
      }
    }
    // 5.挂载需要登录验证的路由
    app.use('/news', news)

### 总结

这个例子只诠释了简单的登录、验证登录、登出功能。下面是本文用到的js模块（express-session, session-file-store, mongoose）在npm上都能找到。[完整代码](https://github.com/feigebaobei/nodejs/tree/master/node-session)