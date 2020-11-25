# qiankun

## start up

```
// install
npm i -S qiankun

// 在主应用中注册微应用
import {registerMicroApps, start} from 'qiankun'
registerMicroApps([
  {
    name: 'react app',
    entry: '//localhost:7100',
    container: '#yourContainer',
    activeRule: '/yourActiveRule' // 若手动加载微应用，则不需要该字段。
  },
  {
    name: 'vue app',
    entry: {scripts: ['//localhost:7100/main.js']},
    container: '#yourContainer2',
    activeRule: '/yourActiveRules'
  }
])
start()
```

需要在入口文件中导出`bootstrap / mount / unmount`
```
export async function bootstrap () {}
export async function mount () {}
export async function unmount () {}
export async function update () {}
```
```
// webpack的配置文件
const packageName = require('./package.json').name
module.exports = {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    jsonpFunction: `wepackJsonp_${packageName}`
  }
}
```
## api

通过将微应用关联到一些 url 规则的方式，实现当浏览器 url 发生变化时，自动加载相应的微应用的功能。

qiankun: {
  // 自动加载微应用
  registerMicroApps(apps[, LifeCycles])
    当符合activeRule时激活。
    apps Array
      app Object
        {
          name 应用的名称。惟一。
          entry 微应用的入口
          container string | htmlElement
          activeRule string | function | array<string|fn> 微应用的激活规则
        }
    LifeCycles fn
      // demo LifeCycle = (app: registrableApp) => Promise<any>
      beforeLoad
      beforeMount
      afterMount
      beforeUnmount
      afterUnmount
  start([options])
    启动qiankun
    options object
    {
      prefetch boolean | 'all' | string[] | fn
        true     第一个微应用mount后开始预加载其他微应用。
        all      主应用 start 后即开始预加载所有微应用静态资源
        string[] 则会在第一个微应用 mounted 后开始加载数组内的微应用资源
        fn       自定义
      sandbox boolena | {strictStyleIsolation: boolean, experimentalStyleIsolation: boolean}
        子应用之间样式隔离。
      singular boolean (true) | fn 是否为实例场景
      fetch fn
      getPublicPath () => string 微应用的entry
      excludeAssetFilter () => boolean 指定动态加载的微应用资源不被qiankun劫持。
    }
  setDefaultMountApp(appLink)
    主应用启动后默认进入的微应用
    // demo setDefaultMountApp('/homeApp')
  runAfterFirstMounted(effect)
    第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本。
    runAfterFirstMounted(() => {...})
  // 手动加载微应用
  loadMicroApp(app[, configuration])
    返回微应用实例。
    手动加载一个微应用。
    app
      {name, entry, container}
    configuration
      {sandbox, singular, fetch, getPublicPath, getTemplate, excludeAssetFilter}
  prefetchApps(apps[, importEntryOpts])
    手动预加载指定的微应用静态资源。仅手动加载微应用场景需要，基于路由自动激活场景直接配置 prefetch 属性即可。
    apps
    importEntryOpts
  addGlobalUncaughtErrorHandler(handler)
    添加全局的未捕获异常处理器。
  removeGlobalUncaughtErrorHandler(handler)
  initGlobalState(state)
    定义全局状态，并返回通信方法，建议在主应用使用，微应用通过 props 获取通信方法。
    MicroAppStateActions: {
      onGlobalStateChange
      setGlobalState
      offGlobalStateChange
    }
}