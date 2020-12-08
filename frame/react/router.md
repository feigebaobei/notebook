# router

```
npm i react-router
```

# react-router和react-router-dom的区别

react-router: 实现了路由的核心功能
react-router-dom: 基于react-router，加入了在浏览器运行环境下的一些功能。
react-router-native: 基于react-router，类似react-router-dom，加入了react-native运行环境下的一些功能。

## 安装
基于浏览器环境的开发，只需要安装react-router-dom；基于react-native环境的开发，只需要安装react-router-native。npm会自动解析react-router-dom包中package.json的依赖并安装。

## react-router-dom

```
import * as RR from 'react-router-dom'
RR: {
  BrowserRouter: ƒ BrowserRouter(basename, children, forceRefresh, getUserConfirmation, keyLength)
    // basename 指定路由前缀。
  HashRouter: ƒ HashRouter()
  Link: Object
  MemoryRouter: ƒ MemoryRouter()
  NavLink: Object
  Prompt: ƒ Prompt(_ref)
  Redirect: ƒ Redirect(_ref) // 重定向，常用于登录页
  Route: ƒ Route() // 包裹与url相同的、需要渲染的组件
  Router: ƒ Router(props)
  StaticRouter: ƒ StaticRouter()
  Switch: ƒ Switch() // 只渲染第一个匹配location的route/redirect
  generatePath: ƒ generatePath(path, params)
  matchPath: ƒ matchPath(pathname, options)
  useHistory: ƒ useHistory()
  useLocation: ƒ useLocation()
  useParams: ƒ useParams() // 取出路由中的参数
  useRouteMatch: ƒ useRouteMatch(path)
  withRouter: ƒ withRouter(Component)
}
```

### BrowserRouter

BrowserRouter主要使用在浏览器中，也就是WEB应用中。它利用HTML5 的history API来同步URL和UI的变化。
无`#`
会真的向server发送get请求。
需要server处理404页面。
BrowserRouter组件提供了四个属性。

basename: 字符串类型，路由器的默认根路径
forceRefresh: 布尔类型，在导航的过程中整个页面是否刷新
getUserConfirmation: 函数类型，当导航需要确认时执行的函数。默认是：window.confirm
keyLength: 数字类型location.key 的长度。默认是 6

### Link

```
to: String | Object
replace: Boolean

<Link to={
  {
    pathname: '/path',
    search: '?key=value',
    hash: '#fragment',
    state: {
      fromDashboard: true
    }
  }
  replace: true
}
/>
```

### Route

```
component: React元素
render: Function
children: Function
path: String
exact: Boolean
<Route
  component={Comp}
  render={() => <div>hi</div>}
  children={() => {}}
  path="/path/:id"
  exact
>
</Route>
```

### Redirect

```
to: String | Object
push: Boolean // 是否压入history栈。
from: String // path的别称
<Redirect push to="/to/path" />
```
### switch

主要解决使用多个 <Route> 时多个路由同时匹配的问题。
```
location: Object
children: Node
```

### NavLink

```
activeClassName: String // default: active
activeStyle: Object
isActive: Function
```

### HashRouter

有`#`。
不会真的向server发送get请求。
需要前端处理404页面。

# 404

1. 写一个404页面。
2. 当没有匹配到路由时，跳入404页面。

```
import React form 'react'
class ErrorPage extends React.Componenet {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <h3>error page</h3>
        <Link to="/">home</Link>
      </div>
    )
  }
}

// 引入依赖+ErrorPage+...
class App extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/path0" component={comp0} />
          <Route path="/path1" component={comp1} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
      <div>

      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
```

