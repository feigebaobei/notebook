# vue3的新特性

Object.defineProperty() => new Proxy()
支持tree-shaking。使vue3更小。
composition-api (浸入式api)
fragments 可有多个根节点。
better support ts
custom Renderer api

setup(props, context)
{
  methods
  watch
  computed
  data
}

## 生命周期钩子

Vue2.x 的生命周期  Vue3.x 的生命周期
beforeCreate  使用 setup()
created 使用 setup()
beforeMount onBeforeMount
mounted onMounted
beforeUpdate  onBeforeUpdate
updated onUpdated
beforeDestroy onBeforeUnmount
destroyed onUnmounted
errorCaptured onErrorCaptured

新增
onRenderTracked
onRenderTriggered
检查哪个依赖性导致组件重新渲染

## 重写 Vdom

```
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock('span', null, 'Hello world!'))
}
```
1. patch flag 优化静态树
1.1. 静态绑定
1.2. 动态绑定
2. 静态提升 只关注它有变化的部分。
3. 事件侦听器缓存 当你的页面在不断的更新的时候，你的事件侦听器并不会重复地销毁再创建。
