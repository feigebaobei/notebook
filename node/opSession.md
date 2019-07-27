# express框架下使用session


上一遍文章说了cookie的不足，提到使用session是解决缺点的一个方法。这遍文章说说怎么使用session.作者使用了文件保存session的方法。若用别保存方式（内存、数据库）也行，记得使用相应的模块。  
下面从使用内存存储和文件存储的2个方法分别说明。  

## 内存存储session

### 实现过程

    // 引入express-session
    var session = require('express-session')
    // 为应用绑定session中间件
    app.use(session({
        name: 'session-id',
        secret: '12345-67890',
        saveUninitialized: false,
        resave: false,
        store: new FileStore()
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



    
    







## 设置













              server             |            client
           生成cookie            |            client









## 
## 文件存储session
### install

    npm i express-session session-file-store
## 
## 
## 
## 
## 
## 什么时候删除session

## 
## 
## 