# redux

状态管理器
单向数据流

1. Web 应用是一个状态机，视图与状态是一一对应的。
2. 所有的状态，保存在一个对象里面。

|||
|-|-|
|存放一个数据对象            |window.store = createStore(reducer)|
|外界能访问到这个数据         |store.getState()|
|外界也能修改这个数据         |store.dispatch()|
|当数据有变化的时候，通知订阅者 |store.subscribe()|

```
import * as Redux from 'redux'
Redux: {
  applyMiddlware(),
  bindActionCreators(),
  combineReducers(),
  compose(),
  createStore(),
  __DO_NOT_USE__ActionTypes: {
    INIT,
    PROBE_UNKNOWN_ACTION
    REPLACE
  }
}
```

## 原则

1. 唯一数据源。（单例模式）
2. 保存状态只读。
3. 数据改变只能通过纯函数完成。

## api

## install

```
npm i redux
```

## action

```
import * as ActionTypes from './ActionType.js'
export const increament = (params) => {
  return {
    type: ActionTypes.INCREAMENT,
    payload: params
  }
}
```

## store

let store = React.createStore(reducer, initState, storeEnhancer)
|||
|-|-|
|store.getState()|获取状态|
|store.dispatch(action)|分发action|
|store.subscribe(cb)|当store改变时执行cb|
|store.unsubscribe(cb)|取消当store改变时执行cb|

```
import {createStore} from 'redux'
import reducer from './Reducer.js'
const initValues = {k: 'v'}
const store = createStore(reducer, initValue)
export default store
```

## reducer(state, action)

reducer函数要做的事情，就是根据state和action的值产生一个新的对象(state)并返回。
用于更新状态。
比flex从state参数。

```
let defaultState  = {k: 'v', f: null, s: null, t: null} // 可定义 也可引入
function reducer (state = defaultState, action) {
  // action: {type: 'String', payload: 'any'}
  let newState = state
  switch (action.type) {
    case 'first':
      newState = Object.assign(newState, {f: action.payload})
      break
    case 'second':
      newState = Object.assign(newState, {s: action.payload})
      break
    case 'three':
      newState = Object.assign(newState, {t: action.payload})
      break
    default:
      break
  }
  return newState
}
```

## view

```

```

### createStore(fn)

创建一个Store对象。
fn是一个reducer.

#### State

```
import {createStore} from 'redux'
const store = createStore(fn)
const state = store.getState()
```

Redux 规定， 一个 State 对应一个 View。

### action

action是惟一改变state的方法。

const action = {
  type: 'hi',
  payload: ''
}

```
// action creator
function addTodo (text) {
  return {
    type: 'TYPE',
    text
  }
}

// store.dispatch(action)
store = createStore(fn)
// 触发一个action
store.dispatch({
  type: 'TYPE',
  payload: '...'
})

// reducer
reducer是一个过程，收到action后改变state，再更新view的过程。
这是一个函数。
返回新状态。
let reducer = function (state, action) {
  // ...
  return newState
}
// 监听state变化。变化后执行cb。
store.subscribe(cb)
store.subscribe(() => {
  // 重新渲染组件。
  component.setState(store.getState())
})
```


### reducer的拆分

```
const chatReducer = (state = defaultState, action = {}) => {
  return {
    chatLog: chatLog(state.chatLog, action),
    statusMessage: statusMessage(state.statusMessage, action),
    userName: userName(state.userName, action)
  }
}

// combineReducers 把多个reducer合并为一个大reducers
const chatReducer = combineReducers({
  chatLog,
  statusMessage,
  userName
})
```

# react-redux

## title




# 中间件
# flux
### title