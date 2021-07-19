# overview

此文件是分析vue框架在vue项目中如何运行的文件。
vue项目中使用vue/vite

# 分析main.ts
```
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// console.log('App', App)
// {
//  components: {HelloWorld: {…}}
//  name: "App"
//  render: ƒ _sfc_render(_ctx, _cache, $props, $setup, $data, $options)
//  __emits: null
//  __file: "/home/turbo/code/exercise/first-proj/src/App.vue"
//  __hmrId: "7ba5bd90"
//  __props: []
//  __proto__: Object
// }
// ﻿

createApp(App).mount('#app')
```

createApp方法在`runtime-dom/src/index.ts`中。
此方法调用createApp()方法，得到app，后返回app。
// 源代码是就是把2个方法命令为相同的名字了。因在不同的文件所以可以正常运行。
createApp()方法在`runtime-core/src/renderer.ts`中。
内部调用了`baseCreateRenderer()`
baseCreateRenderer()
内部定义了好多方法。返回了一个对象：
{
    render(),
    hydrate,
    createApp: createAppAPI(render, hydrate) // 与前2个createApp又不同。           @0
}
createAppAPI()在`runtime-core/src/apiCreatApi.ts`中。
它返回一个方法。这样就与@0对应上了。
此方法的参数是(rootComponent, rootProps)，这就与官网的createApp(rootComponent, rootProps)对应上了。
该方法返回一个app对象：
{
    _uid,
    _component
    _props
    _container
    _context
    version
    get config()     // return context.config
    set config(v)    // 若是开发环境，则显示警告。
    use()            // 用于安装插件
    mixin()          // context.mixins.push(mixin)
    component()      // context.components[name] = component
    directive()      // context.directives[name] = directive
    mount()          // 使用render()
    unmount()        // 使用render()
    provide()        // context.provides[key as string] = value
}
此对象中属性只做了初始化。

# 官网说明
createApp(rootComponent, props)

# 为什么`import App from './App.vue'`得到的是一个对象



