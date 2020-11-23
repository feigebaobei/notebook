# 介绍

乌米
内置 react react-router

# 快速上手
## 需要的环境

```
node 8.1+
yarn / npm
yarn global add umi
umi -v
```

```
yarn create umi [appname]
// npm create umi [appname]
引用文件有5种
- ant-design-pro
app
block
libray
plugin
// 是否使用ts
// 选择功能
yarn // 安装依赖
yarn start // 启动
```

## 创建页面

```
umi g page index
umi g page users
// umi g <=> umi generate
```

pages目录下所有的js文件即路由。

## 启动服务
```
yarn global add serve
serve ./dist
```
## 部属项目
```
yarn global add now
now ./dist // 这个我没有跑通
```

# 目录及约定

.
├── dist/                          // 默认的 build 输出目录
├── mock/                          // mock 文件所在目录，基于 express
├── config/
    ├── config.js                  // umi 配置，同 .umirc.js，二选一
└── src/                           // 源码目录，可选
    ├── layouts/index.js           // 全局布局
    ├── pages/                     // 页面目录，里面的文件即路由
        ├── .umi/                  // dev 临时目录，需添加到 .gitignore
        ├── .umi-production/       // build 临时目录，会自动删除
        ├── document.ejs           // HTML 模板
        ├── 404.js                 // 404 页面
        ├── page1.js               // 页面 1，任意命名，导出 react 组件
        ├── page1.test.js          // 用例文件，umi test 会匹配所有 .test.js 和 .e2e.js 结尾的文件
        └── page2.js               // 页面 2，任意命名
    ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
    ├── global.js                  // 可以在这里加入 polyfill
    ├── app.js                     // 运行时配置文件
├── .umirc.js                      // umi 配置，同 config/config.js，二选一
├── .env                           // 环境变量
└── package.json

## dist
## mock
```
// mock/users.js
export default {
  'api/users': ['a', 'b']
}
// in browser
http://localhost:8000/api/users
```
## src 源文件
404 // 访问/404才能得到。
pages/document.ejs 存在时，会覆盖默认的html模板。
/global(.css|less|sass|scss) 自动被引入，处理于全局样式。

# 路由

umi根据pages目录下生动生成路由。

## 约定式路由

```
pages
  users
    index.js
    list.js
  index.js

// router
[
  {path: '/', component: './pages/index.js'},
  {path: '/users', component: './pages/users/index.js'},
  {path: '/users/list', component: './pages/users/list.js'}
]
```

## 动态路由

以$开头的js文件就是动态路由文件。
```
pages
  $post.js
{
  {path: '/:post', component: './pages/$post.js'}
}
```

## 可选的动态路由

动态路由后有$则为可选动态路由。
```
$post$.js
{path: ':/post?', component: './pages/$post$.js'}

```

## 嵌套路由

```
pages
  users
    _layout.js

{
  path: '/users', component: './pages/users/_layout.js', routes: [
    {
      path: '/users/', component: './pages/users/index.js',
      path: '/users/:id', component: './pages/users/$id.js'
    }
  ]
}
```
src/layouts/index.js // 全局路由，返回react组件。

```
export default function (props) {
  if (props.location.pathname === '/login') {
    return <SimpleLayout>{props.children}</SimpleLayout>
  }
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
    )
}
```

## 配置式路由

在.umirc.(ts|js)或config/config.(ts|js)中配置routes属性。此属性存在时不会对src/pages做约定式解析。
component是相对于src/pages的。

## 权限路由

在配置式路由对象上添加Routes属性。
```
{
  path: '/list',
  component: './pages/list.js',
  Routes: ['./routes/PrivateRoute.js']
}
```

## 路由动效

有多种实现方式。
```
yarn add react-transition-group

export default withRouter(
  ({ location }) =>
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        { children }
      </CSSTransition>
    </TransitionGroup>
)

.fade-enter {
  opacity: 0;
  z-index: 1;
}
.fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 250ms ease-in;
}
```

## 面包屑

有多种实现方式。
```
const routes = [
  { path: '/', breadcrumb: '首页' },
  { path: '/list', breadcrumb: 'List Page' },
];

export default withBreadcrumbs(routes)(({ breadcrumbs }) => (
  <div>
    {breadcrumbs.map((breadcrumb, index) => (
      <span key={breadcrumb.key}>
        <NavLink to={breadcrumb.props.match.url}>
          {breadcrumb}
        </NavLink>
        {(index < breadcrumbs.length - 1) && <i> / </i>}
      </span>
    ))}
  </div>
));
```
## 启用hash路由

umi默认使用Browser History.
还有一种hash： Hash History.

## scroll to top

```
import { Component } from 'react';
import withRouter from 'umi/withRouter';
class Layout extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return this.props.children;
  }
}
export default withRouter(Layout);

```

# 在页面间跳转

有2种方式
## 声明式（像a标签）

```
import Link from 'umi/link'
export default () => {
  <Link to="/list">go to list page</Link>
}
```

## 命令式（像js方法）

```
import router from 'umi/router'
function goToListPage () {
  router.push('/list')
}
```

# 配置

umi项目中有2个地方可以设计配置文件。.umirc.js / config/config.js（二选一）
.umirc.local.js是本地的配置文件，不要提交到git。若存在，则会与.umric.js合并后再返回。

# html模板

umi有默认的模板。

## 修改默认模板

新建pages/document.ejs,且有`<div id="root"></div>`

## 配置模板

在模板中使用context得到umi提供的变量。
context: {
  route,
  config, // 用户配置信息
  publicPath // output.publicPath
  env // development / production
}

## 使用特定模板

需要开启exportStatic配置。
通过注释扩展document属性。
```
/**
 * document: ./src/documents/404.ejs
 */
```

路由的document属性 > src/pages/document.ejs > umi内置模板。

# module processor

下列模块会被umi自动处理。
- .js / .jsx / .mjs / .jsx / .json
.ts
.graphql / .gql
.css / .less / .sass
.svg

# 介绍umi ui
umi项目的本地研发工作台。
## 参考
[文档](https://umijs.org/zh/plugin/umi-ui.html#api-intl)

# mock数据

## 使用umi的mock功能

umi约定mock目录下/page(s)目录下的_mock文件都是mock文件。
```
export default {
  'GET /api/users': {users: [1, 2]},
  '/api/users/1': {id: 1},
  'POST /api/users/create': (req, res) => {res.end('ok')}
}
```

### 引入mock.js文件

```
import mockjs from 'mockjs'
export default {
  'GET /api/tags': mockjs.mock({
    'list|100': [{
      name: '@city', 'value|1-100': 50, 'type|0-2': 1
      }]
    })
}
```

### 添加跨域请求头

```
'POST /api/users/create': (req, res) => {
  ...
  res.setHeader('Access-Control-Allow-Origin', '*')
  ...
}
```

### 合理拆分mock文件

把每一个数据模型抽象成一个文件，再统一放在mock目录里。
|-mock
  |-api.js
  |-chart.js
  |-...

### 模拟延迟

```
// 使用setTimeout
'POST /api/forms': (req, res) => {
  setTimeout(() => {
    res.sned('ok')
    })
}

// 使用插件
import {delay} from 'roadhog-api-doc'
const proxy = {
  'GET /api/project/notice': getNotice,
  ...
}
export default: delay(proxy, 1000)
```

### 动态mock数据

```
'/api/random': (req, res) => {
  res.send(Mock.mock({
    'number|1-100': 100
    }))
}
```

# use umi with dva

使用umi-plugin-react配置dva。

```
yarn add umi-plugin-react
// or
npm i umi-plugin-react

// .umirc.js
export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: true
        // 推荐开启dva-immer以简化reducer
        // dva: {immer: true}
      }
    ]
  ]
}
```

## model注册

### 全局model

`src/models/**/*.js`

### 页面model
```
src/pages/**/models/**/*.js
// or
src/pages/**/model.js
```

## 配置及插件

```
// src/app.js
export const dva = {
  config: {
    onError(e) {
      e.preventDefault()
      console.error(e.message)
    }
  },
  plugins: [
    require('dva-logger')()
  ]
}
```

# 按需加载
## 按需加载组件

```
import dynamic from 'umi/dynamic'
const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout))
const App = dynamic({
  loader: async function () {
    await delay(1000)
    return () => <div>I will render after 1s</div>
  }
  })
```

## 按需加载模块
```
import('g2').then(() => {
  //
  })
```
# 运行时配置
## why

需要比.umirc.js更细致的配置。

## 配置方式

// src/app.js 为运行时的配置文件。

## 配置列表

### patchRoutes
运行时修改路由

```
export function patchRoutes(routes) {
  routes[0].unshift({
    path: '/foo',
    component: require('./routes/foo').default
    })
}
```

### render
改写把整个应用render到dom树里的方法。
```
export default render(oldRender) {
  setTimeout(oldRender, 1000)
}
```

### onRouteChange
初始加载、路由切换时做一些事情。
```
export default onRouteChange({location, routes, action}) {
  bacon(location.pathname)
}
```

### rootContainer
用于封闭root container

```
export default rootContainer (container) {
  const DvaContainer = require('@tmp/DvaContainer').default;
  return React.createElement(DvaContainer, null, container)
}
```
### modifyRouteProps
修改传给路由组件的props
```
export default modifyRouteProps (props, {route}) {
  return {...props, foo: 'bar'}
}
```

# 服务端渲染

ssr 服务端渲染
csr 客户端渲染

1. 更好的seo
2. 更快的首屏加载速度
3. 需要服务器支持

## 使用服务端渲染

```
// 配置文件
export default {
  ssr: true
}

umi build
// 会在./dish目录生成
.
├── dist
│   ├── index.html
│   ├── ssr-client-mainifest.json
│   ├── umi.css
│   ├── umi.js
│   └── umi.server.js

// 接下来在服务端做一些设置。
// 我没看懂如何设置。
```

## 预渲染

export default {
  plugin: [
    [
      '@umijs/plugin-prerender', opitons
    ]
  ]
}

# 区块
2.3.+
区块是快速搭建页面的代码片段。
## 使用区块
```
umi block add [blockUrl] --path=[target path]
// --js 把ts转化为js
// --npm-client cnpm
// --registry myregistryUrl

// 设置区块前缀
// 配置文件
block: {
  defaultGitUrl: 'https://github.com/ant-design/pro-block'
}
npx umi block add DashboardAnalysis
```
## 区块开发
```
yarn create umi --type=block
// 区块的目录结构
- root
  - src              // 区块的代码
    - index.js       // 区块入口，需要默认导出一个 React 组件
    - _mock.js       // 约定的 mock 文件
  - package.json     // 区块依赖等信息
  - .umirc.js        // 基于 umi 开发区块时的配置
  - thumb.[png|jpg]  // 区块的缩略图
// package.json的内容
{
  name: '@umi-blocks/demo',
  description: '区块描述',
  blockConfig: {
    // 区块的配置信息。
    specVersion: '0.0.1'
  }
  // ... 更多其他 npm 包的相关定义
  dependencies: {
    // dependencies 里面是区块运行时阶段的依赖，比如 antd g2 这些包的依赖
    antd: '^3.0.0',
  },
  devDependencies: {
    // 用户调试区块时候的依赖，和区块没有直接关系，可以提供基于 umi 的开发方案
  },
  scripts: {
    // 开发区块调试时的命令，和区块没有直接关系
  }
}
```

### 区块添加逻辑

1. git clone
2. 安装package.json里的依赖。
3. 执行宏替换
4. 若需要添加路由则添加路由。

## 区块调试

安装nmi-plugin-block-dev
```
// 配置文件
export default {
  plugins: {
    [
      'umi-plugin-block-dev',
      {
        layout: 'ant-design-pro'
      }
    ]
  }
}
```

# 部署

默认执行umi build后输出index.html/umi.js/umi.css三个文件。

## 不输出html文件

```
html = none umi build
```

## 启动服务
## 启动服务
# ui插件开发