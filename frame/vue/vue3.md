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

## 常用的api

### 按需引入
```
// vue2
import Vue from 'vue'
// vue3
import {ref, createApp, onBeforeMount} from 'vue'
```
### setup

是Composition API的入口函数。
```
<script>
import {ref, lifeCycleFns} from 'vue'
export default {
  setup () {
    let number = ref(0)
    function add () {
      number.value++
    }
    return {number},
    onMounted(() => {})
    // mounted () {} vue2
  }
}
</script>
```
生命周期
setup
onBeforeMount
onMounted
onBeforeUpdate
onUpdated
onBeforeUnmount
onUnmounted

### reactive(obj) & ref(any)

二者类似，都可以创建响应式对象。

ref(obj) 约等于 reactive({value: obj})

```
// html
<p>{{state.count}}</p>
// js
setup () {
  const state = reactive({count: 3})
  return {state}
}

<p>{{state.value.count}}</p>
setup () {
  const state = ref({count: 3})
  return {state}
}
```

|适用范围||
|-|-|
|ref|基本类型、单值对象|
|reactive|引用类型|

### toRef(obj, key) & ref(any)

把obj的key转化为响应式数据。

```
setup () {
  let obj = {count: 3}
  const state = toRef(obj, 'count')
  return {state}
}
```
||||
|-|-|-|
|ref  |拷贝原数据|当依赖的值改变时会更新视图|
|toRef|引用原数据|当依赖的值改变时不更新视图|

### toRefs(obj)

监听obj的所有属性变化。

```
setup () {
  let obj = {k: 'v', a: 'b'}
  let state = toRefs(obj)
  return {state}
}
```

### shallowReactive

浅层reactive.
reactive       会对每一层属性都使用Proxy包装。
shallowReactive会对第一层属性都使用Proxy包装。非第一层属性不能响应式。

### shallowRef

监听`.value`变化时更新视图。

### triggerRef

修改值后立即驱动视图更新.
参数是被监听的对象

```
triggerRef(state)
```

### toRaw

获取ref / reactive的原始数据。
```
setup () {
  const state = reactive(obj)
  const raw = toRaw(state)
  // obj === raw // true
}
```
补充一句，当 toRaw 方法接收的参数是 ref 对象时，需要加上 .value 才能获取到原始数据对象

### markRaw

将原始数据标记为非响应式。
使用ref/reactive包装后仍不能实现数据响应式。
```
setup () {
  const raw = markRaw(obj)
}
```

### provide(key, value) & inject(key)

provide向后代组件传递数据。
inject向接收祖先组件传递来的数据。

```
setup () {
  provide('info', obj)
}
```

### watch(source, cb, options) & watchEffect

source 指定监听的依赖对象
cb     依赖对象变化后执行的回调函数
      (newValue, oldValue) => {}
options: {
  immediate: Boolean
  deep: Boolean
}

都是用来监视某项数据变化从而执行指定的操作的
因此当组件初始化时，不会执行第二个参数中的回调函数，若我们想让其初始化时就先执行一遍，可以在第三个参数对象中设置 immediate: true
watch方法会返回一个stop方法，若想要停止监听，便可直接执行该stop函数

||||
|-|-|-|
|watch|||
|watchEffect|1. 不需要手动传入依赖。2. 初始化时会执行一次回调函数获取依赖。3. 只能得到变化后的值。||

```
// 可同时监听多个值
setup () {
  watch(
    [() => state.count, () => state.name],
    ([newCount, newName], [oldCount, oldName]) => {...}
  )
}

setup () {
  watchEffect(() => {
    console.log(state.count)
    console.log(state.name)
    })
}
```

### getCurrentInstance

setup中的this指向undefined。
使用getCurrentInstance()可得到当前组件。

### useStore

getCurrentInstance().ctx中没有$store。
需要使用vuex的useState得到。

```
import Vuex from 'vuex'
const store = Vuex.createStore({
  state: {
    key: 'value'
  },
  mutations: {
    ...
  }
})

import {useStore} from 'vuex'
setup () {
  const store = useStore()
  console.log(store) // 此store与vue2里的store一样。
}
```

### 获取dom

```
// vue2
this.$refs.key
// vue3
<div ref="el">string</div>
import {ref, onMounted} from 'vue'
setup () {
  const el = ref(null) // ref的参数必须是null 创建一个DOM引用，名称必须与元素的ref属性名相同
  onMounted(() => { // 在挂载后才能通过 el 获取到目标元素
    el.value.innerHTML = 'str'
  })
  return {el} // 把创建的引用 return 出去
}
```
