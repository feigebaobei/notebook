dva是处理数据流的。
model是存放处理数据流的方法的文件。这个文件返回一个对象，这个对象包含数据、处理数据的方法。
model文件的一般结构
```
export default {
  namespace: 'example', // 这个model的命名空间，必须全局惟一。
  state: { // 初始数据
    count: 0
  },
  reducers: { // 用于修改数据
    save() {...}
  },
  effects: { // 用于获取数据
    *getData() {...}
  },
  subscriptions: { // 用于订阅数据
    setup() {...}
  }
}
```

## reducers

(state / action) => state

## effects

生成器函数

```
*getData(obj, {call, put, select}) {
  // obj
  // call 用于执行异步事件
  // put 用于执行别的action(可以是effects也可以是reducers)
  // select 用于得到相应数据
  const data = yield select(states => states.user)
  const assets = yield call(fetchData, user)
  yield put({type: 'actionFn', payload:{assets}})
}
```

## subscription

订阅一个数据源，根据需要使用dispatch触发相应的action

```
subscription: {
  setup({dispatch, history}) {
    return hisotry.listen(({pathnaem, query}) => {
      if (pathname === '/home') {
        dispatch({type: 'query'})
      }
      })
  }
}
```
dispatch是触发action的，（有点像put）其参数可以从subscription的参数、已经被connect过的组件的props里取得。
