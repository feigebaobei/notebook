# connect-redis

为express提供了在redis里保存session的方法。
需要redis >= 2.0.0

## install

```
npm i connect-redis
```

## api

```
const redis = require('redis')
const session = require('express-session')
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: 'keyboard cat',
  resave: false
}))
```

### RedisStore(options)

必须传入一个redisClient.

|||是否必填|default|
|-|-|-|
|client|redisClient|true|-|
|prefix|前缀|false|sess:|
|ttl|session cookie的过期时间|86400s(24h)||
|disableTouch|不能重新设置ttl||false|
|serializer|是否在redis里保存时使用编码/解码。|||
|scanCount||||


## install
## install
## install