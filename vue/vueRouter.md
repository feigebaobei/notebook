# vue-router 基础
## install
1. CDN  
	`<script src="/path/to/vue.js"></script>`
	`<script src="/path/to/vue-router.js></script>`  
1. NPM  
	`npm install vue-router`  
	安装路由功能  

	`import Vue from 'vue'`  
	`import VueRouter from 'vue-router'`  
	`Vue.use(VueRouter)`
	
## 作用，使用

1. 定义组件与路由的映射。  
2. 定义渲染组件的位置。  

![router的运行过程](./image/vue/vueRouter/router0.png)  

### $route & $router  

**this.$route // 路由记录**  
**this.$router // 路由实例**  

![$route&$router](./image/vue/vueRouter/router1.png)

## 动态路由
*用处：* 在使用“动态路由参数”时会用到动态路由。  
*作用：*   

**定义：** router file  
    
    {
        path: '/user/:id',
        component: 'user'
    }

*注意：* 动态路由的动态部分改变时原来的组件会被复用，这样就不会触发生命周期钩子函数。若要触发请使用watch $route或beforeRouteUpdate  

**使用：** user file

    <router-link to="/path/:id"/> // 定义
    this.$route.params.id // 得到
    // {key0: value0, key1: value1}

## 高级匹配模式
（待续）  

## 优先级

越先定义优先级越高。  

## 嵌套路由&命名视图  

![嵌套路由&命名视图对比图](./image/vue/vueRouter/router2.png)  

## router

    // 定义routes的对象。 // new Router({ routes: [ {}, {}, {} ] })
    {
        path: '/user',
        name: 'name', // 命名路由
        component: user,
        alias: '/roler', // 别名
        redirect: { name: 'foo' }, // 重定向
        props: true // 将 this.$route.params 设置为组件属性
    }

### 命名路由  

就是给路由起个名字。方便使用。

    <router-link :to="{ name: 'user', params: { userId: 123 }}">user</router-link>

    this.$router.push({ name: 'user', params: { userId: 123 }})

### 重定向、别名。

redirect  
    
    redirect: '/b'
    redirect: {name: 'foo'}
    redirect: to => {
        // 方法接收目标路由作为参数
        // return 重定向的 字符串路径/路径对象
    }

alias  

    alias: '/b'

### 路由组件传参  

**定义路由：** router file  

    {
      path: 'routeUser/:userId',
      // components: {
      //   default: eleThree,
      //   second: eleSecond
      // },
      // props: {
      //   default: true,
      //   second: true
      // },
      component: routeUser,
      children: [
        {
          path: '/',
          components: {
            default: routeSecond,
            second: routeThree
          },
          props: {
            default: dynamicDate,
            second: true
          }
        }
      ],
      props: true
    }

    function dynamicDate (route) {
      console.log(route)
      const now = new Date()
      return {
        date: now.getFullYear()
      }
    }

**定义组件：** routeUser file  

    <p>userId: {{userId}}</p>
    <router-view></router-view>
    <router-view name="second"></router-view>

    props: ['userId']

|-|-|
|1. 布尔模式|将 this.$route.params 设置为组件属性|
|2. 对象模式|按原样设置为组件属性|
|3. 函数模式|方便做更多的操作|  

## HTML5 History模式

|||
|-|-|
|hash模式|默认|使用url的hash来模拟一个完整的url，于是当url改变时，页面不会重新加载。|
|history模式|-|充分利用`history.pushState`api来完成url跳转，无须重新加载页面。|

###设置路由模式

    const router = new Router({
        mode: 'history', // 或者'hash'
        routes:[...]
    })

###history  

1. 需要后台配置支持。    

## vue服务端渲染文档
（待续）  

# vue-router 进阶
## 导航守卫
监控导航的变化  

### 全局守卫

定义全局守卫 router file  

    const router = new VueRouter({ ... })

    // 全局前置守卫
    router.beforeEach( (to, from) => {
        // ...
    })
    // 全局复用守卫
    router.beforeEnter( (to, from) => {
        // ...
    })
    // 全局后置守卫
    router.afterEach( (to, from) => {

    })

### 路由独享守卫

定义路由独享的守卫 router file  

    {
        path: '/foo',
        component: foo,
        beforeEnter: (to, from, next) => {
            // ...
            next()
        }
    }

### 组件内的守卫

在组件内定义守卫 vue file  

    {
        beforeRouteEnter (to, from, next) {
            // code
        },
        beforeRouteUpdate (to, from, next) {
            // code
        },
        beforeRouteLeave (to, from, next) {
            // code
        }
    }

### 完整的导航解析流程

1. 导航被触发。  
1. 在失活的组件里调用离开守卫。  
1. 调用全局的 beforeEach 守卫。  
1. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。  
1. 在路由配置里调用 beforeEnter。  
1. 解析异步路由组件。  
1. 在被激活的组件里调用 beforeRouteEnter。  
1. 调用全局的 beforeResolve 守卫 (2.5+)。  
1. 导航被确认。  
1. 调用全局的 afterEach 钩子。  
1. 触发 DOM 更新。  
1. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。  

## 路由元信息

可以检查元信息。有时检查用户登录状态时会用到。  

定义路由元信息 vue file  

    {
        path: '/foo',
        component: foo,
        meta: { requiresAuth: true }
    }

使用  

    this.$route.matched.meta.requiresAuth

## 过渡动效

    <transition>
        <router-view></router-view>
    </transition>

## 数据获取  

### 导航完成前获取数据

vue file  

    beforeRouteEnter (to, from, next) {
        //
    },
    // 路由改变前，组件就已经渲染完了。
    beforeRouteUpdate (to, from, next) {
        //
    }

### 导航完成后获取数据

vue file  

    create () {
        this.fetchData()
    },
    watch () {
        '$route': 'fetchData'
    },

## 滚动行为

router file  

    const router = new VueRouter({
        routes: [...],
        scrollBehavior (to, from, savedPosition) {
            return { x: 20, y: 50 }
        }
    })

## 路由懒加载  

      {
        path: '',
        component: resolve => {
          require(['@/views/consumer/market'], resolve)
        }
      },

# vue-router原理

在vue实例中添加`_route`属性，并为其设置存取描述符。当`_route`改变时更新视图。

## 1. 在vue实例中混入_route属性。
使用`Vue.use(Router)`混入属性。
vue安装插件时会使用插件的install方法。
vue-router相对于vue是一个插件。上面这行代码会调用vue-router里的install方法。

## 2. 为_route设置存取描述符。

原码里是这样定的。

    // 为 vue 实例定义数据劫持
    Vue.util.defineReactive(this, '_route', this._router.history.current)

当_route改变时会更新视图。

## 3. vue-router有三种模式。

     / history 先使用history模式，若浏览器不运行history模式，再使用hash模式。  \
     |                                                                      >浏览器支持的械
     | hash 默认使用该模式。                                                 /
    /
    \
     | abstract 非浏览器支持的模式
     |
     \

## 4. 改变路由

改变路由的方法有：`push``replace``go``back``forward``addRoutes`等。

## 5. 更新视图

以上这些方法会在各模式下触发相应的事件。

history模式下为history.pushState/history.replaceState/popstate事件绑定方法。
hash模式下为window.hash/window.replace/window.onpopstate事件绑定方法。
非浏览器模式（即abstract）下，我不会。

----

2018.09.11 by stone

## hash / history的區別
### hash
在vue的路由配置中有mode选项，最直观的区别就是在url中hash 带了一个很丑的 # ，而history是没有#的。vue默认使用hash。
它的特点在于：hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。
### history
利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。（需要特定浏览器支持）

## hash / history的相同点
因此可以说，hash 模式和 history 模式都属于浏览器自身的特性，Vue-Router 只是利用了这两个特性（通过调用浏览器提供的接口）来实现前端路由。
通过history api，我们丢掉了丑陋的#，但是它也有个问题：不怕前进，不怕后退，就怕刷新，f5，（如果后端没有准备的话）,因为刷新是实实在在地去请求服务器的。在hash模式下，前端路由修改的是#中的信息，而浏览器请求时不会将 # 后面的数据发送到后台，所以没有问题。但是在history下，你可以自由的修改path，当刷新时，如果服务器中没有相应的响应或者资源，则会刷新出来404页面。

2020.10.26 by stone
