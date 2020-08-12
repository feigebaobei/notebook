# connect-mongo.md

为connect/express开发的使用mongodb存储session的store.

## install

```
npm i connect-mongo
```

## usage

```
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
app.use(session({
  secret: 'foo',
  store: new MongoStore(options)
  }))
```

```
options: {

}
```
```
// Basic usage
app.use(session({
    store: new MongoStore({ url: 'mongodb://localhost/test-app' })
}));

// Advanced usage
app.use(session({
    store: new MongoStore({
        url: 'mongodb://user12345:foobar@localhost/test-app?authSource=admins&w=1',
        mongoOptions: advancedOptions // See below for details
    })
}));
```