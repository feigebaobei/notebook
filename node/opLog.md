##mongodb / morgan 保存日志

### 把日志保存在日志文件里

    // app.js
    var logger = require('morgan');
    var fs = require('fs')
    var logDirectory = path.join(__dirname, 'log')
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
    var accesLogStream = FileStreamRotator.getStream({
      date_format: 'YYYYMMDD',
      filename: path.join(logDirectory, 'access-%DATE%.log'),
      frequency: 'daily',
      verbose: false
    })
    app.use(logger(logger.compile(`[joke] :req[User-Agent] :req[Referer]`), {stream: accesLogStream}))
    
    // 运行结果
    // 使用postman请求几次
    [joke] PostmanRuntime/7.15.2 -
    [joke] PostmanRuntime/7.15.2 -
    [joke] PostmanRuntime/7.15.2 -
    [joke] PostmanRuntime/7.15.2 http://localhost:3000/dish

### 把日志保存在mongodb里

    // models/log.js
    let {Schame} = {require('mongoose')}
    let Log = new Schema({
      userAgent: {
        type: String,
        default: ''
      },
      referrer: {
        type: String,
        default: ''
      }
    })
    modole.exports = mongoose.model('Log', Log)
    
    // app.js
    var logger = require('morgan');
    var log = require('./models/log.js')
    var writeToDB = {
      write: function (line) {
        var [, ua, re] = line.split(' ')
        var ele = new Log({
          userAgent: ua,
          referrer: re
        })
        ele.save(err => {
          if (err) {
            console.log('err', err)
          }
        })
      }
    }
    /*
    morgan的源码是这样写的
    stream.write(line + '\n')
    所以为morgan指定的stream属性值的write属性是把日志保存到数据的方法
     */
    app.use(logger(logger.compile(`[joke] :req[User-Agent] :req[Referer]`), {stream: writeToDB}))

### 记录一个bug

把日志写入mongodb时报如下错误:`'E11000 duplicate key error collection: confusion.logs index: userAgent_1 dup key: { : null }'`
我在网上找的解决方法是`db.addresses.createIndex( { "xmpp_id": 1 }, { sparse: true } )`当时看不懂。用了一个很暴力的方法解决的这个问题。方法如下：

1. 打开mongodb的compass，打开相应的collection的Indexes面板。把报错信息里的index删除了。
2. 再打开相应的collection的Documents面板。把没有报错信息里的index的文档删除了。（不是万不得已不要使用这种方法!!!）
