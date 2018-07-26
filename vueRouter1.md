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
（待续）  

----
2018.07.26 by stone