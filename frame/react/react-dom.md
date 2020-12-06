# react-dom

引入方法有3种。

```
1. <script>
2. import ReactDOM from 'react-dom' // es6
3. var ReactDOM = require('react-dom') // es5
```

## 常用方法

1. render()
2. hydrate()
3. unmountComponentAtNode()
4. createPortal()

## react Dom 对象
```
ReactDOM: {
  createPortal()
  findDOMNode()
  flushSync()
  hydrate()
  render()
  unmountComponentAtNode()
  unstable_batchedUpdates()
  unstable_createPortal()
  unstable_renderSubtreeIntoContainer()
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
}
```