# 介绍

基于redux/redux-sage
6个api
内置react-router / fetch
支持hmr

# 快速上手

```
npm i dva-cli -g
dva -v

// create app
// 现在已经不推荐使用了，
dva new dvaApp
cd dvaApp
npm start

npm i antd babel-plugin-import
// .webpackrc
{
  "extraBabelPlugins": [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "css"
      }]
  ]
}
```
然后官网教程上展示了一个人触发组件的事件的过程。大概如下：
1. create ui component.
1.1 定义需要触发的事件
2. create model
2.1 定义namespace / state / reducers
2.2 定义reducers方法。
3. create connect。
3.1 在index.js里引入步骤2里定义的model，再引入步骤1里创建的组件。
3.2 在使用组件时写好事件对应的方法。
3.3 定义该方法。在该方法中dispatch({type, payload})
4. 创建初始化数据。（我不知道在哪儿创建）

# 例子与脚手架
# 目录结构

```
.
├── mock    // mock数据文件夹
├── node_modules // 第三方的依赖
├── public  // 存放公共public文件的文件夹
├── src  // 最重要的文件夹，编写代码都在这个文件夹下
│   ├── assets // 可以放图片等公共资源
│   ├── components // 就是react中的木偶组件
│   ├── models // dva最重要的文件夹，所有的数据交互及逻辑都写在这里
│   ├── routes // 就是react中的智能组件，不要被文件夹名字误导。
│   ├── services // 放请求借口方法的文件夹
│   ├── utils // 自己的工具方法可以放在这边
│   ├── index.css // 入口文件样式
│   ├── index.ejs // ejs模板引擎
│   ├── index.js // 入口文件
│   └── router.js // 项目的路由文件
├── .eslintrc // bower安装目录的配置
├── .editorconfig // 保证代码在不同编辑器可视化的工具
├── .gitignore // git上传时忽略的文件
├── .roadhogrc.js // 项目的配置文件，配置接口转发，css_module等都在这边。
├── .roadhogrc.mock.js // 项目的配置文件
└── package.json // 当前整一个项目的依赖
```
# dva概念

## 数据流向

用户行为 -> dispatch -> action -> effect
                                    |
                                    V
                               -> reducer -> state -> connect -> component

## models

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
### state

操作的时候不应当修改state里的数据。为了保证state是独立的。
`app._state`可以得到顶部的state数据。

### action

修改state的惟一途径。
使用dispatch函数调用action，如：
```
dispatch({
  type: 'namespace/actionName'
  })
```
dispatch是组件在connect model后通过props传入的。
action必须带有type属性，这是为了指明具体的行为。其它字段可以自定义。

### dispatch

在这里触发action

### reducer

这里定义的方法是action.
每个action都是描述如何改变state的方法。
都是纯函数。
这些方法接收2个参数。
第一个参数：上一次处理数据的结果。
第二个参数：当前方法需要处理的数据。
返回newState

```
reducers: {
  'delete' (state, {payload: id}) => state.filter(item => item.id !== id)
}
```


### effect

副作用。
不是纯函数。若想要做成纯函数，一般使用generator方法。
一般用于请求数据。
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

### subscription

语义是评阅。
订阅一个数据源，根据需要使用dispatch触发相应的action

```
import key from 'keymaster';
...
app.model({
  namespace: 'count',
  subscriptions: {
    keyEvent({dispatch}) {
      key('⌘+up, ctrl+up', () => { dispatch({type:'add'}) });
    },
  }
});
```

## router

我看到router文件返回一个react对象。
没有看到为哪个路由绑定哪个组件。
有可能是使用约定式路由（以路由文件名为路由名），然后路由文件返回react组件。
dva使用的路由是react-reouter。
```
import {Router, Route} from 'dva/router'
app.router(({history}) => <Router history={history}>
  <Route path="/" component={HomePage}></Route>
</Router>)
```

## route components

react中的组件一般有2种。
### container component

用来监听一些数据，绑定component与model.
通常的书写格式为：
```
import React, { Component, PropTypes } from 'react';
// dva 的 connect 方法可以将组件和数据关联在一起
import { connect } from 'dva';
// 组件本身
const MyComponent = (props)=>{};
MyComponent.propTypes = {};
// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  return {...state.data};
}
// 关联 model
export default connect(mapStateToProps)(MyComponent);
```

### presentation component

只用来展示组件。
通常的书写格式为：
```
import React, { Component, PropTypes } from 'react';
// 组件本身
// 所需要的数据通过 Container Component 通过 props 传递下来
const MyComponent = (props)=>{}
MyComponent.propTypes = {};
// 并不会监听数据
export default MyComponent;
```

# 入门课

## react没有解决的问题
1. 组件间如何通信
2. 数据如何与视图串联起来？路由和数据如何绑定？如何编写异步逻辑？

## 通信问题

有3种通信。
1. 向子组件发消息。
1. 向父组件发消息。
1. 向其它组件发消息。

react只提供了一种通信手段：传参。用于大应用，很不方便。

## 组件通信问题

```
    class Son extends React.Component {
      render() {
        return <input onChange={this.props.onChange}/>;
      }
    }
    class Father extends React.Component {
      constructor() {
        super();
        this.state = {
          son: ""
        }
      }
      changeHandler(e) {
        this.setState({
          son: e.target.value
        });
      }
      render() {
        return <div>
          <Son onChange={this.changeHandler.bind(this)}/>
          <p>这里显示 Son 组件的内容：{this.state.son}</p>
        </div>;
      }
    }
    ReactDOM.render(<Father/>, mountNode);
```

## 数据流问题

常用的数据流有3种
1. flux eg: redux
2. reactive eg: mobx
3. else eg: rxjs

## 目前流行的数据流方案

路由: React-router
架构: redux
异步操作: redux-saga

当引入多个库时，会让项目变复杂。

## dva是什么

dva = React-router + Redux + Redux-saga

## dva应用的最简结构

```
import dva from 'dva'
const App = () => <div>string</div>
// create app
const app = dva()
// registe view
app.router(() => <App />)
// start app
app.start('#root')
```

## 数据流图

```
    state <-------------------
      |                      |
      |                      |
   connect                 action
      |                      ^
      |                      |
      V                      |
    view ---------------------
```

## 核心概念

state 保存整个应用用到的状态
view react组件的视图层
action 一个描述事件的对象
connect 绑定state到view.
dispatch 发送一个action到state

## state / view

action更改state后，view会做也相应变化。

## action

是描述一个ui层事件的对象。
```
{
  type: 'click-submit-button',
  payload: this.form.data
}
```

## connect 方法

把state绑定到view的方法。
```
import {connect} from 'dva'
function mapStateToProps (state) {
  return {todos: state.todos}
}
connect(mapStateToProps)(App)
```
connect方法接收一个mapStateToProps函数，返回一个react组件。
mapStateToProps函数会返回一个对象，用来建立state到props的映射关系。

## dispatch

将action发送给state
```
dispatch({
  type: 'click-submit-button',
  payload: this.form.data
})
```

## 带model的dva应用的最简结构

```
// create app
const app = dva()
// registe model
app.model({
  namespace: 'count',
  state: 0,
  reducers: {
    add(state) {return state + 1}
  },
  effects: {
    *addAfter1Second(action, {call, put}) {
      yield call(delay, 1000)
      yield put({type: 'add'})
    }
  }
  })
// registe view
app.router(() => {<ConncetedApp />})
// start app
app.start('#root')
```

## 数据流图1

```



              |-----------------------|
              |       store           |
              |                       |
              |     middleware <------|------------------
              |           |           |                 |
              |           |           |                 |
              |           V           |                 |
              |         state         |                 |
              |           |           |                 |
              |           |           |                 |
              |           |           |                 |
              |-----------------------|              action
                          |                             ^
                          |                             |
                       connect                          |
                          |                             |
                          |                             |
                          V                             |
                        view----------dispatch-----------


```

## 数据流图2

```


                                effect --------------> server
                                   |
                                   |
                        |-----------------------|
                        |          |            |
                        |          V            |
            url---------|-----> store           |
                        |                       |
                        |     middleware <------|------------------
                        |           |           |                 |
                        |           |           |                 |
                        |        reducer        |                 |
                        |           |           |                 |
                        |           V           |                 |
                        |         state         |                 |
                        |           |           |                 |
                        |           |           |                 |
                        |           |           |                 |
                        |-----------------------|              action
                                    |                             ^
                                    |                             |
                                 connect                          |
                                    |                             |
                                    |                             |
                                    V                             |
                                  view----------dispatch-----------


```

## app.model

绑定应用逻辑

## model对象的例子

```
{
  namespace: 'count',
  state: 0,
  reducers: {
    add(state) {
      return state + 1
    }
  },
  effects: {
    *addAfter1Second(action, {call, put}) {
      yield call(delay, 1000)
      yield put({type: 'add'})
    }
  }
}
```

## model对象的属性

namespace
state
reducers
effects

## reducer

从上一个state算出当前state

```
function add(state) {return state + 1}
function addTodo (state, action) { retrun [...state, action.payload]}
function addTodo (state, action) {
  return {
    ...state,
    todos: state.todos.concat(action.payload),
    loading: false
  }
}
```

## effect

基于redux-saga实现的action处理器，处理异步运作。
计算以外的操作都是effect.
使用函数式编程。
```
function * addAfter1Second(action, {put, call}) {
  yield call(delay, 1000)
  yield put({type: 'add'})
}

<=>

addAfter1Second: function * () {...}
```

## generator函数

每个effect方法都是generator函数，内部使用yield关键字。

## call / put

都是在effect函数内部常用的处理函数。
call: 执行异步函数。
put: 发出一个action，类似dispatch.

# 输出文件

## dva

默认输出文件

## dva/router

默认输出`react-router`接口。
`react-router-redux`接口通过routerRedux输出。
`import {Router, Route, routerRedux} from 'dva/router`

## dva/fetch

异步请求库，输出isomorphic-fetch接口。

## dva/sage

输出redux-saga接口。

## dva/dynamic

解决组件动态加载问题的util方法

```
import dynamic from 'dva/dynamic'
const UserPageComponent = dynamic({
  app,
  models: () => {
    import('./models/users')
  },
  component: () => import('./routes/UserPage')
  })
```
opts: {
  app: dva实例
  models: 返回promise数组的函数，promise返回dva model
  component: 返回promise方法，promise返回react component
}

# api

`const app = dva(opts)`
opts: {
  history: 默认hashHistory,
  // 若想使用browserHistory，需要引入依赖。
  // import createHistory from 'history/createBrowserHistory'
  // history: createHistory()
  initialState: detail {}，优先级高于model里的state。
  // hook
  onError
  onAction
  onStateChange
  onReducer
  onEffect
  onHmr
  // 额外的reducer
  extraReducers
  // 额外的StoreEnhancer
  extraEnhancers
}

## app.use(hooks)

配置hooks/注册插件。
```
import createLoading from 'dva-loading'
...
app.use(createLoading(opts))
```

### onError

1. effect执行出错时触发。
2. subscription通过done抛出错误。

一般这么对待错误信息。
```
import {message} from 'antd'
const app = dva({
  onError (e) {
    message.error(e.message || 'strign', 3)
  }
  })
```

### onAction(fn | fn[])

```
import createLogger from 'redux-logger'
const app = dva({
  onAction: createLogger(opts)
  })
```

### onStateChange(fn)

state改变时触发，用于state/localStorage/server……

### onReducer(fn)

封装 reducer 执行。比如借助 redux-undo 实现 redo/undo ：
```
import undoable from 'redux-undo';
const app = dva({
  onReducer: reducer => {
    return (state, action) => {
      const undoOpts = {};
      const newState = undoable(reducer, undoOpts)(state, action);
      // 由于 dva 同步了 routing 数据，所以需要把这部分还原
      return { ...newState, routing: newState.present.routing };
    },
  },
});
```

### onEffect(fn)

封装effect执行。

### onHmr(fn)

### extraReducers

### extraEnhancers

## app.model(model)

注册model

## app.unmodel(namespace)

取消model注册

## app.replaceModel(model)

替换model

## app.router(({history, app}) => RouterConfig)

```
app.router(require('./router').default)
// ./router
export default function routerConfig({history}) {
  return (
    <Router history={history}>
      <Router path="/" component={App}/>
    </Router>
    )
}
```

## app.start(selector?)
`app.start('#root')`

# model

## namespace
## state
## reducers
## effects
## subscriptions