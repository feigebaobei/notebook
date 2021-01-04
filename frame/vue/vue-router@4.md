# introduction

它是vue.js的官方的路由器。它深度完善了vue.js的spa。包括以下功能：

- 路由地图嵌套
- 动态路由
- 模块化的。基于组件的路由配置
- 路由参数、查询字符串、通配符。
- 使用vue.js的过渡系统过渡视图。
- 细致的导航控制
- 自动连接css的class
- 支持h5的history / hash，2种模式。
- 自动滚动行为
- 适当的编码url.

# install

```
// cdn
https://unpkg.com/vue-router@4 // unpkg.com总是提供最新的版本。
https://unpkg.com/vue-router@3.0.0/dist/vue-router.js // 也可以使用指定的版本。这个例子指定了@3.

// npm
npm i vue-router@4

// dev build
// 克隆仓库后自己构建最新的版本。
git clone https://github.com/vuejs/vue-router.git node_modules/vue-router
cd node_modules/vue-router
npm i
npm run build
```

# essentials
## getting started

可以使用vue+vue-router创建一个spa。vue.js可以组建组件。当再结合vue-router后，我们需要制定组件与路由的映射关系。让vue-router知道在什么时候渲染什么组件。下面是一个基本用法。

```
<div>
  <router-link to="/"></router-link>
  <router-link to="/about"></router-link>
</div>
<div>
  <router-view/>
</div>
```

### router-link

会生成a标签。允许vue-router改变url时不重新加载页面。

### router-view

会显示一个符合当前url的组件。你可以在适合你的排版的任意地方使用`router-view`。

### javascript

```
// router.js
// 引入或定义组件
// const home = {template: '<div>home</div>'}
import home from './path/to/home.vue'
// 可以搞更多组件
// 定义路由
const routes = [
  {path: '/', component: home},
  ...
]
// 创建路由
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

// main.js
const app = Vue.createApp({})
app.use(router).mount('#app')

// this.$router // 得到当前组件的路由。
// import {useRouter} from 'vue-router'
// this.$route // 得到路由。
// import {useRoute} from 'vue-router'
```

## 动态路由匹配

定义动态路由的次序与匹配的次序有关，优先匹配前面的动态路由。

```
const routes = [
  {
    path: '/users/:id',
    component: compUser
  }
]

:后面是需要动态的部分。
this.$route.params可得到
{
  key: 'value',
  key1: 'value1',
  ...
}
```
当相同的动态路由匹配同一个动态路由时会重新渲染2次相同的组件。
还可以使用路由守卫。如：`beforeRouteUpdate`。

### 匹配404页面

可以使用正则匹配。

```
const routes = [
  {
    path: '/user-:afterUser(.*)',
    component: userComp
  }
]
```

## 路由匹配语法

### 在参数中自定义正则
```
可以在动态路由的动态部分后面写括号，再在括号里写相应的正则表达式。
const routes = [
  {
    path: '/o/:orderId(\\d+)', // 只会匹配数字的动态路由。
    component: xxx
  },
  {
    path: '/p/:productName', // 会匹配所有。
    component: xxx
  }
]
```
### 可重复的参数

```
+ 1次或多次
* 0次或多次
const routes = [
  {path: '/:chapters+'},
  {path: '/:chapters*'}
]

// get
router.resolve({
  name: 'chapters',
  params: {
    chapters: []
  }
}).href
router.resolve({
  name: 'chapters',
  params: {
    chapters: ['a', 'b']
  }
}).href
router.resolve({
  name: 'chapters',
  params: {
    chapters: []
  }
}).href
```
根据括号内的正则去匹配路由。

### 可选的参数

```
const routes = [
  {path: '/users/:userId?'},
  {path: '/users/:userId(\\d+)?'}
]
```

## 嵌套路由

路由使用了嵌套后，需要组件里也嵌套`<router-view>`.
每个router-view会用于旋转当前组件嵌套的子组件。
以`/`开头的path会当做根组件对待。
嵌套的路由需要使用`children`
```
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        path: 'profile', // 没有以`/`开头
        component: userProfile
      },
      ...
    ]
  }
]
```

## 编程式导航

```
// 声明式
<router-link :to="..."></router-link>
// 编程式
router.push(...)

router.push('path')
router.push({
  path: 'path'
})
router.push({
  name: 'name', // 若提供了params，可省略path.
  params: {
    username: 'un'
  }
})
router.push({
  path: 'path', // 
  query: {
    plan: 'p'
  }
})
router.push({
  path: 'path',
  hash: '#h'
})
```

### 跳转路由的方式

||参数|说明|本质||
|-|-|-|-|-|
|push||在history中压入一个路由|window.history.pushState||
|replace||代替最近的history|window.history.replaceState||
|go|Number|跳过多个history|window.history.go||

## 命名路由

应该为路由提供一个'name'值。

- 不用写硬编码url
- 自动编码、解码参数。
- 预防拼写错误url
- 绕过路由排序

```
<router-link :to="{name: 'user', params: {k: 'v'}}">user</router-link>

router.push({
  name: 'user',
  params: {
    k: 'v'
  }
})

const routes = [
  {
    path: 'path',
    name: 'user',
    component: user
  }
]
```

## 命名视图

当一个页面需要使用多个视图时，需要为视图提供命名。每个视图`router-view`都有一个默认的属性`name="default"`.
多个视图可以显示多个组件，在一个相同的路由里。
```
<router-view name="side"></router-view>
<router-view name="main"></router-view>
<router-view></router-view> // 这是默认的。

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      // 这里设置了3个组件。
      components: { // 注意，这里使用了复数
        default: home,
        side: sideComp,
        main: mainComp
      }
    }
  ]
})
```
可以使用嵌套的视图于复杂的排版，

## redirect & alias

```
const routes = [
  {
    path: '/path',
    redirect: '/',
    // or 
    // redirect: {
    //   name: 'home'
    // }
    // or
    // redirect: to => {
    //   return {
    //     path: '/path',
    //     query: {k: 'v'}
    //   }
    // }
  }
]
```
to 是什么？

alias: 为指定的路由设置一个别名。
当在url中访问别名时，vue-router会渲染指定的组件。路由仍是使用别名状态。
可以是数组。

## 给组件传递数据

可传递一些数据，不能嵌套。
```
// router.js
const routes = [
  {
    path: '/user/:id',
    component: 'userComp',
    props: true, // 是否允许被组件的props得到。
  }
]

// userComp.js
$route.params.<key>
```
当使用命名视图时，需要在props时分别指明。
```

const routes = [
  {
    path: 'path',
    components: {
      default: d,
      side: s
    },
    props: {
      default: true,
      side: false
    }
  }
]
```
当props是一个Object时，会设置组件的props接收到的key.
当props是Function时。可以改变组件的props接收到的key.
```
props: route => ({queryKey: route.query.key})
```
这样做可以使组件内的props保持不变时，在路由层做适配。（有点像适配器模式）

## 不同的history模式

history是可选的设置项。

|hash|html5|||
|-|-|-|-|
|createWebHashHistory()|createWebHistory()|||
|不会向server发出get请求|真会向server发出get请求|||
|不需要服务端支持404等页面|需要服务端支持404等页面|||
|-|支持的方式有很多种，如：apache/nginx/server……|||
|有#标志|没有#标志|||

# advanced

## 导航守卫

### 全局守卫

const router = createRouter({...})
router.beforeEachl((to, from) => {
  return false // 取消跳转
  // or return 返回一个标准路由
  // 当返回undefined 、 true是进入to.
})

异步。
在所有的钩子函数执行前执行。
to   跳转去的标准路由
from 跳转前的标准路由
router.onError() 会抛出错误时触发。会取消跳转。

也可以使用异步方法。
```
router.beforeEach(async (to, from) => {
  // fn(to) return true / false
  return await fn(to)
})
```

#### next

这是一个被删除的不好的参数。但是vue-router4还在支持它。我们推荐不使用这个方法。
若非要使用，请保存next只会被执行一次。（使用if/switch处理）

### 全局解析守卫

全局级的导航。
先执行全局的守卫，再执行组件级的守卫。
可以使用异步组件。
router.beforeResolve是一个很好的在用户进入指定路由前得到数据的方法。


### 全局的after hooks

不需要使用next参数。
不能影响导航。
```
router.afterEach((to, from, failure) => {
  if (!failure) sendToAnalytics(to.fullPath)
})
```

### 路由级的守卫

只对当前路由有作用。
只能触发进入指定路由前的路由改变，不能触发进入路由后的路由改变。
```
const routes = [
  {
    path: 'path',
    component: 'com',
    beforeEnter: (to, from) => {
      return false // 总是不能进入该路由。
    }
    // 也可以传递一个方法组成数组 Array<function>
  }
]
```

### 组件级的守卫

指定组件的守卫。
```
beforeRouteEnter(to, from, next)
beforeRouteUpdate(to, from, next)
beforeRouteLeave(to, from, next)
```
### 导航触发流

1. 发生路由跳转。
2. 前组件的`beforeRouteLeave`
3. 全局守卫的`beforeEach`
4. 后组件的`beforeRouteUpdate`守卫。
5. 路由级的守卫`beforeEnter`
6. 解决异步组件
7. 后组件的`beforeRouteEnter`
8. 全局的`beforeResolve`
9. 导航结束
10. 全局的`afterEach`
11. 更新dom.
12. 在实例中的`beforeRouteEnter`的回调函数中使用next。

## meta 字段

在配置路由时有一个字段是meta。可以放置任意的数据。它是一个object对象。

## 获取数据

```
// 先获取数据再进入组件
beforeRouteEnter(to, from, next) {
  getData() //
}
// 先进入组件再获取数据
created() {
  getDate() // 它会在methods里被定义
}
```

## composition api

在setup方法中使用useRouter获取路由。
```
import { useRouter, useRoute } from 'vue-router'
export default {
  setup() {
    const router = userRouter()
    const route = userRoute()
    function pushWithQuery(query) {
      router.push({
        name: 'search',
        query: {
          ...route.query
        }
      })
    }
    watch(
      () => route.params
      async newParams => {
        userData.value = await fetchUser(newParams.id)
      }
    )
    return {
      // 若在template中需要route/router。则需要在这里返回。
    }
  }
}
```

```
import {
  useRouter,
  useRoute,
  useLink
} from 'vue-router'
```

## transitions
## 滚动行为

```
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // to
    // from
    // savedPosition Boolean
    return { // object
      top: 0,
      left: 10px,
      el: '#main', // 指定的dom执行滚动。
      behavior: 'smooth' // 指定滚动的要行为 可选值 'auto'
    }
    // or
    // return savedPosition
    // or 滚动到指定的锚点
    // return {el: to.hash}
    // returns 
  }
  // 异步滚动
  // scrollBehavior(to, from, savePosition) {
  //   return new Promise((s, j) => {
  //     setTimeout(() => {
  //       s({left: 0, top: 0})
  //     }, 500)
  //   })
  // }
})
```

## 路由懒加载

```
const router = createRouter({
  ...
  routes: [
    {
      path: 'path',
      component: () => import('/path/comp.vue')
      // components: ...
    }
  ]
})

// or
let getComp = (compName) => import(`@/components/path/${compName}.vue`)
componet: getComp(comp)
```

## 扩展routerlink

## 导航失败

失败的种类
- aborted: false,
- cancelled
- duplicated 已经在当前路由了。

## 动态路由

```
router.addRoute()
router.reomveRoute()

let removeRouter = router.addRoute({path: 'path', name: 'name', component: comp}) // 添加路由
removeRouter()// 移除路由
router.removeRouter('name') // 参数是name

// 添加嵌套的路由
router.addRoute({name: 'na', ...})
router.addRoute('na', {path: 'p', ...})

// 查看是否存在指定的路由
router.hasRoute()
router.getRoutes()
```

# migrating from vue2

|vue-router3|vue-router4||
|-|-|-|
|new Router()|createRouter()||
|history|createWebHistory()||
|hash|createWebHashHistory()||
|abstract|createMemoryHistory()||
|base|createWebHistory(param)||
|*|-||
|onReady|isReady 返回promise||
|scrollBehavior|-||
|append|-||
|event|-||
|tag|||
|exact|||
|router.match|router.resolve||
||||
||||

# 解构vue-router

```
{
  NavigationFailureType: Object
  RouterLink           : Object
  RouterView           : Object
  START_LOCATION       : Object
  createMemoryHistory  : ƒ createMemoryHistory(base = '')
  createRouter         : ƒ createRouter(options)
  createRouterMatcher  : ƒ createRouterMatcher(routes, globalOptions)
  createWebHashHistory : ƒ createWebHashHistory(base)
  createWebHistory     : ƒ createWebHistory(base)
  isNavigationFailure  : ƒ isNavigationFailure(error, type)
  matchedRouteKey      : Symbol([vue-router]: router view location matched)
  onBeforeRouteLeave   : ƒ onBeforeRouteLeave(leaveGuard)
  onBeforeRouteUpdate  : ƒ onBeforeRouteUpdate(updateGuard)
  parseQuery           : ƒ parseQuery(search)
  routeLocationKey     : Symbol([vue-router]: route location)
  routerKey            : Symbol([vue-router]: router)
  routerViewLocationKey: Symbol([vue-router]: router view location)
  stringifyQuery       : ƒ stringifyQuery(query)
  useLink              : ƒ useLink(props)
  useRoute             : ƒ useRoute()
  useRouter            : ƒ useRouter()
  viewDepthKey         : Symbol([vue-router]: router view depth)
}
```

# api

|||||||
|-|-|-|-|-|-|
|||||||
|||||||
|||||||
|||||||




## <router-link>

|props|type|default|可选值|explain|
|-|-|-|-|-|
|to|||||
|repalce|Boolean|false|||
|active-class|String|'router-link-active'|||
|aria-current-value|String|'page'|'stop','loation','date','time','true','false'|当链接处于活动状态时，传递给属性aria-current的值。|
|custom|Boolean|false|||
|exact-active-class|String|'router-link-exact-active'|||
|to|||||
|to|||||
|to|||||
|to|||||
|to|||||

## <router-link>'s v-slot
## <router-view> props

name
route

## createRouter(routerOptions)

创建一个路由实例。

### routerOptions

||type|default|explain|
|-|-|-|-|
|history||||
|linkActiveClass|String|||
|linkExactActiveClass|String|||
|parseQuery|Object|||
|stringifyQuery|String|||
|routes|`Array<RouteRecordRaw>`|||
|scrollBehavior||||

### RouteRecordRaw
||type|defautl|explain|
|-|-|-|-|
|path|String|||
|redirect|RouteRecordRaw|||
|children||||
|alias||||
|name||||
|beforeEnter||||
|props|Boolean|||
|meta||||

## createWebHistory(base: string)

生成一个html5 history。一般用于spa。必须使用http协议。



## createWebHashHistory(base: string)

生成一个hash history.当没有host时一般使用web app.

## createMemoryHistory(base: string)

创建一个内存history.一般用于ssr.
返回一个history对象。它可以解析为路由构造者。

## NavigationFailureType

## START_LOCATION
## Composition API

onBeforeRouteLeave(cb)
  cb: (to, from) => {...}
onBeforeRouteUpdate(cb)
  cb: (to, from) => {...}
useLink
  不会
useRoute
  <=> $route
useRouter
  <=> $router

## TypeScript
## Router Properties

currentRoute
options

## Router methods

||||||
|-|-|-|-|-|
|addRoute(parentName: string, route: RouterRecordRaw)|||||
|afterEach(cb)|||||
|back()|||||
|beforeEach(cb)|||||
|beforeResolve(cb: NavigationGuard)|||||
|forward()|||||
|getRoutes()|||返回全部的route records||
|go(Number)|||||
|hasRoute(name: string)|||||
|isReady||||return Promise|
|onError(handler)|||||
|push(to: RouteLocationRaw)|||||
|removeRoute(name: string)|||||
|replace(to: RouteLocationRaw)|||||
|resolve()|||||

## RouteRecordNormalized

route record的标准化版本

||||||
|-|-|-|-|-|
|aliasOf|||||
|beforeEnter|||||
|children|||||
|components|||||
|meta|||||
|name|||||
|path|||||
|props|||||
|redirect|||||

## NavigationFailure
## NavigationGuard
## Component Injections




### titile

### titile
### titile
### titile
### titile
### titile
### titile

