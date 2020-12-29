# 基础
## 安装

- cdn `<script src="https://unpkg.com/vue@next"></script>`
- npm `$ npm install vue@next`
- cli `npm i @vue/cli -g    vue upgrade --next`

vue devtools是开发工具。

vite是一个 web 开发构建工具，由于其原生 ES 模块导入方法，它允许快速提供代码。
它只是提供web服务，不能代替webpack的打包工能。

## 应用 & 组件实例

是一套用于构建用户界面的渐进式框架

使用方式：

- 声明式渲染 `{{}}`
- 处理用户输入 `v-model`
- 条件与循环 `v-if v-for`
- 组件化应用构建

## 应用 & 组件实例

每个 Vue 应用都是通过用 createApp 函数创建一个新的应用实例开始的。

```
const app = Vue.createApp({})
app.component('SearchInput', SearchInputComp)
app.directive('focus', FocusDirective)
app.use(LocalePlugin)
// or 链式调用
Vue.createApp({}).component('SearchInput', SearchInputComp).directive('focus', FocusDirective).use(LocalePlugin)
```

### 创建一个应用实例`Vue.createApp()`
createApp 的选项用于配置根组件。
### 根组件
mount 不返回应用本身。它返回的是根组件实例。
### 组件实例property
```
Vue.createApp({
  data () {return {...}},
  methods: {...},
  props,
  computed,
  inject,
  ...
})
```
### 生命周期钩子
## 模板语法

```
{{msg}}
v-once
v-html // 可能受到xss攻击
v-bind :
:[attributeName] // 动态参数
js表达式
v-on @
@[event]
// 修饰符
.prevent // event.preventDefault()
v-if
v-for
```
## Data Property 和方法

组件的 data 选项是一个函数。Vue 在创建新组件实例的过程中调用此函数。
Vue会通过响应性系统处理data，并保存在$data里。

```
const app = Vue.createApp({
  data () {return {k: 'v'}},
  ...
})
const vm = app.mount('#app')
vm.$data.k // 'v'
vm.k       // 'v'
```
Vue 使用 $ 前缀通过组件实例暴露自己的内置 API。它还为内部 property 保留 _ 前缀。

## 计算属性和侦听器

### computed
计算属性是基于它们的反应依赖关系缓存的。计算属性只在相关响应式依赖发生改变时它们才会重新求值。
计算属性默认只有 getter，不过在需要时你也可以提供一个 setter
### watch
当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

## Class 与 Style 绑定
```
<div :class="{active: param}"></div>
<div :class="classObj"></div>
computed: {
  classObj () {...}
}
<div :class="[f, s]"></div>
data () {
  return {
    f: 'first',
    s: 'second'
  }
}
<div :class="[isActive ? activeClass : '', errorClass]"></div>
<div :class="[activeClass : isActive, errorClass]"></div>

<div :style="{color: activeColor, fontSize: fontSize + 'px'}"></div>
data () {
  return {
    activeColor: 'red',
    fontSize: 23
  }
}
<div :style="[f, e]"></div>
```
使用stlye时vue会自动添加前缀。

## 条件渲染

```
v-if
v-else
v-else-if
v-show // display: none 不支持template / v-else

```

## 列表渲染
```
v-for="(item, index) in arr"
v-for="item in arr"
v-for="value in obj"
v-for="(value, name) in obj"
v-for="(value, name, index) in obj"
```
数组更新检测
push()
pop()
shift()
unshift()
splice()
sort()
reverse()

注意我们不推荐在同一元素上使用 v-if 和 v-for。
当它们处于同一节点，v-if 的优先级比 v-for 更高。

## 事件处理

可绑定多个事件。

### 事件修饰符

```
.stop
.prevent
.capture
.self
.once
.passive // 修饰符尤其能够提升移动端的性能。会告诉浏览器你不想阻止事件的默认行为。
```

可链式调用。

### 按键修饰符

```
.enter
.tab
.delete
.esc
.space
.up
.down
.left
.right
```

### 系统修饰键

```
.ctrl
.alt
.shift
.meta // 实心宝石键 windows键 command键
.exact // 精确地控制系统修饰符
```

## 表单输入绑定

v-model可用于input/textarea/select
      :model-value + @update:model-value
      :value + @input
text     / textarea  使用value  +input 事件处理
checkbox / radio     使用checked+change事件处理
select               使用value  +change事件处理

### 修饰符

```
.lazy   // 把input事件改为change事件
.number // 自动将用户输入值转为数值类型
.trim   // 过滤用户输入的首尾空格
```

## 组件基础

```
// 全局注册
const app = Vue.createApp({})
app.component('button-counter', {
  data,
  template
})
// 使用
<button-counter></button-counter>
```

### 父子传递数据

props
$emit

### dom模板的注意事项

有些html元素对内部元素严格限制。
当在其下使用非法子元素是vue会把该组件提升到外部。并导致渲染出错。
`v-is`可解决此问题。其值是字符串文本。
`<tr v-is="'blog-post-row'"></tr>`

# 深入组件

## 组件注册

全局注册可使组件全局可用。
局部注册不能使其子组件中可用。
```
// 在B中可使用A
import compA from './path/to/comp-a.vue'
const CompB = {
  components: {
    'comp-a': compA
  }
}
```
使用Vue.createApp({...}).component('compName', {...})可以全局注册组件。
组件名可以使用驼峰也可以使用中划线。推荐使用动词中划线名词的方式命名。
全局注册后全局可用，局部注册后只在当前组件可使用，其子组件不可用。

## Props

类型
```
String
Number
Boolean
Array
Object
Date
Function
Symbol
```
单向数据流
prop验证 `validator`
```
props: {
  a: Number,
  b: [String, Number],
  c: {
    type: String,
    required: true
  },
  d: {
    type: Number,
    default: 100,
  },
  e: {
    type: Object,
    // Object / Array 是需要使用Fn返回默认值。
    default: function () {
      return {...}
    }
  },
  f: {
    type: Boolean,
    // 验证
    validator: function (value) {
      return ...
    }
  }
}
```


## 非Prop的Attribute

会被`$attrs`捕获。
当组件返回单个根节点时，非 prop attribute 将自动添加到根节点的 attribute 中。
同样的规则适用于事件监听器。
如果你不希望组件的根元素继承 attribute，你可以在组件的选项中设置 inheritAttrs: false
多个根节点时，需要显式绑定$attrs.

## 自定义事件

事件名会被转换为全小写。因为html不区分大小写。
使用`emits: ['eventName', 'submit', 'click']`自定义事件。若定义了原生事件（eg:click）则会替代原生事件。
v-model对应到props里是modelValue / update:modelValue事件

### 多个v-model绑定

每个 v-model 将同步到不同的 prop上。
```
<comp-a
  v-model:first-name="firstName"
  v-model:last-name="lastName"
>
</comp-a>
// comp-a
...
props: {
  firstName: String,
  lastName: String
}
<input type="text" :value="firstName" @input="$emit('update:firstName', $event.target.value)" />
```


## 插槽

```
v-slot:slotName
<slot name="slotName"></slot> // 默认是default
```

插槽内容
渲染作用域
父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。
后备内容`<slot>string</slot>`
具名插槽
```
// defind
<slot name="slotName"></slot>
// use
<comp-a>
  <template v-slot:slotName>
    <p>string</p>
  </template>
</comp-a>
```
v-slot 只能添加在 `<template>` 上。独占默认插槽时可以把v-slot写在要组件上。
在`<slot>`上使用attribute可插入prop.
注意默认插槽的缩写语法不能和具名插槽混用。
### 解构插槽
### 动态插槽名
```
<template v-slot:[dynamicSlotName]>
</template>
```
缩写`<template #slotName></template>`

## 提供、注入

provide / inject
父组件不需要知道哪些子组件使用它提供的 property
子组件不需要知道 inject property 来自哪里
```
// 处理响应式
app.component('todo-list', {
  provide () {
    return {
      todoLength: Vue.computed(() => this.todos.length)
    }
  }
})
```

## 动态组件&异步组件

```
:is
<keep-alive>
  <comp :is="param"></comp>
</keep-alive>
```

### 异步组件

在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。为了简化，Vue 有一个 defineAsyncComponent 方法：

```
const app = Vue.createApp({})
const AsyncComp = Vue.defineAsyncComponent(() => {
  return new Promise((s, j) => {
    s({template: '<div>string</div>'})
  })
})
app.component('async-comp', AsyncComp)
```

### suspense

```
<suspense>
  <template #default>
    <p>welcome</p>
  </template>
  <template #fallback>
    <p>loading...D</p>
  </template>

</suspense>
```

## 模板引用

ref
this.$refs.refName // 得到。
可与v-for一起使用。

## 处理边界情况

$forceUpdate用于强制更新。
只有感觉渲染速度慢时才使用v-once。

# 过渡&动画
## 过渡&处理边界情况

### flip
first last invert play
动画将用户界面带入生活。
任何触发布局变化的属性（比如height），浏览器都会递归检查布局中的其他元素是否也因此改变，这样的一个过程花销是很贵的。如果这个计算所费的时间比一个动画帧（大约16.7ms）更长，那么动画就会丢帧，从而导致动画迟滞。

- 基于 class 的动画和过渡。在css中使用animate运行动画。
- 过渡与 Style 绑定

### 性能

transform、opacity会触发几何开关变化或绘制。
硬件加速。（perspective / backface-visibility / transform:translateZ(x）

### timing
通常使用 0.1s 到 0.4s 之间的计时，大多数人发现 0.25s 是一个最佳选择。

easing

## 进入过渡&离开过渡

`transition`作用于:
- 条件渲染
- 条件展示
- 动态组件
- 组件根节点

### 过渡class

1. v-enter-from
2. v-enter-active
3. v-enter-to
4. v-leave-from
5. v-leave-active
6. v-leave-to

```
// demo
<transition name="slide-fade">
...
</transition

// css
.slide-fade-enter-from
.slide-fade-enter-active
.slide-fade-enter-to
.slide-fade-leave-from
.slide-fade-leave-active
.slide-fade-leave-to
```

自定义过渡class类名

enter-from-class
enter-active-class
enter-to-class
leave-from-class
leave-active-class
leave-to-class

```
<transition
  name="cutName"
  enter-active-class="astart"
  leave-active-class="lstart"
  ... // 指定别的类
>
</transition>
```

过渡时间
duration
```
<transition :duration="1000"></transition>
<transition :duration="{enter: 500, leave: 800}"></transition>
```

js钩子

```
<transition
  @before-enter="beforEnterFn"
  @enter="enterFn"
  @after-enter="afterEnterFn"
  @enter-cancelled="enterCancelledFn"
  @before-leave="beforeLeaveFn"
  @leave="leaveFn"
  @after-leave="afterLeaveFn"
  @leave-cancelled="leaveCancelledFn"
  :css="false"
>
</transition>
// 组件内
methods: {
  beforeEnterFn(el) {...}
  enterFn(el, done) {... done()} // 必须使用done
  afterEnterFn(el) {...}
  enterCancelledFn(el) {...}
  beforeLeaveFn(el) {...}
  leaveFn(el, done) {... done()} // 必须使用done
  afterLeaveFn(el) {...}
  leaveCancelledFn(el) {...}
}
```
添加 :css="false"，也会让 Vue 会跳过 CSS 的检测，除了性能略高之外，这可以避免过渡过程中 CSS 规则的影响。

```
<transition appear></transition> // 初始渲染的过渡
// 多个元素的过渡
<transition>
  <div v-if="docState === 'saved'" key="saved">
  </div>
  <div v-if="docState === 'edited'" key="edited">
  </div>
  <div v-if="docState === 'editing'" key="editing">
  </div>
</transition>
```

过渡模式

in-out
out-in
`<transition name="fade" mode="out-in"></transition>`

多组件的过渡与多元素的过渡一样。

## 列表过渡

```
<transition-group name="tgName"> // name指定自定义动画类前缀。
// 也可以使用move-class 手动设置。

</transition-group>
```

### 可复用的过渡

```
<transition>
  <slot></slot>
</transition>
```
## 状态过渡
# 可复用&组合
## 混入

```
import mixinObj from './path/to/file.js'
Vue.createApp({
  mixins: [mixinObj]
})
```

当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
混入对象的钩子将在组件自身钩子之前调用。

### 全局混入

Vue.createApp({
  mixins: [...]
})
// or
Vue.createApp(...).mixin({...})

一旦使用全局混入，它将影响每一个之后创建的组件 (例如，每个子组件)。

## 自定义指令

```
// 全局注册
const app = Vue.createApp({})
app.directive("focus", {
  mounted(el) {
    el.focus()
  }
})
// 局部注册
directives: {
  focus: {
    mounted(el) {
      el.focus()
    }
  }
}
```
### 钩子函数
beforeMount   (el, binding, vnode)
mounted       (el, binding, vnode)
beforeUpdate  (el, binding, vnode, prevnode)
updated       (el, binding, vnode, prevnode)
beforeUnmount (el, binding, vnode)
unmounted     (el, binding, vnode)

el dom
binding: {
  instance   组件实例
  value      当前的值
  oldValue   以前的值
  arg        动态指令
  modifiers  修饰符组成的对象
  dir        一个对象，在注册指令时作为参数传递。
}
vnode        真实dom元素的蓝图
prevNode     上一个虚拟节点，

binding.arg是参数
动态指令

`v-mydirective:[arg]="value"`

## teleport

使用 `<teleport>`，并告诉 Vue “Teleport 这个 HTML 到该‘body’标签”。

```
<teleport to="body">
</teleport>
// 目标的内部的尾部
// 可在同一个目标上使用多个teleport
<teleport to="#id">
</teleport>
```

## 渲染函数

除了使用html创建模板外，还可以使用渲染函数。

```
Vue.createApp({...}).component('comp-a', {
  props: {...},
  render() {
    const { h } = Vue
    return h(tag, props, children)
  }
})
```

h() 到底会返回什么呢？其实不是一个实际的 DOM 元素。它更准确的名字可能是 createNodeDescription，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，包括及其子节点的描述信息。
h() 函数是一个用于创建 vnode 的实用程序。也许可以更准确地将其命名为 createVNode()，但由于频繁使用和简洁，它被称为 h() 。它接受三个参数：
`h(tag, props, children)`

### 函数式组件

用来定义那些没有响应数据，也不需要有任何生命周期的场景，它只接受一些props 来显示组件。
1. 不维护响应数据
2. 无钩子函数
3. 无instance实例
4. 没有this.(非函数式组件可用this访问当前组件vm)

```
// demo
Vue.component('comp-a', {
  functional: true, // 标明是函数式组件
  props: {...}, // 可选
  render: function (tag, context) {...} // 返回vnode
})
// or 单文件式
<template functional></template>

组件中需要的一切数据需要context提供。
context: {
  props
  childrend
  slots
  scopedSlots
  data
  parent
  listeneers
  injections

}
```


### 使用js代替模板功能

```
render () {
  if () {} else {}                 代替 v-if
  map                              代替 v-for
  modelValue + onUpdate:modelValue 代替 v-model
  onClick                使用on驼峰 代替 v-on
  onClick: {
    handler: fn,
    capture: true,
    once: true,
    // passive: 
    stop
    prevent
    self
    enter
    ctrl
    alt
    shift
    meta
  }
}
```
你可以通过 this.$slots 访问静态插槽的内容，每个插槽都是一个 VNode 数组：
```
render() {
  // `<div><slot></slot></div>`
  return Vue.h('div', {}, this.$slots.default({text: 'string'}))
}
```

## 插件
插件是自包含的代码，通常向 Vue 添加全局级功能。它可以是公开 install() 方法的 object，也可以是 function
```
export default {
  install : (app, options) => {
    app.config.globalProperties.$translate = key => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, i18n)
    }
  }
}
```

# 高阶指南
## 响应式

代理对象与原对象是不相等的。`=== false == false`

```
import { reactive } from 'vue'
reactive <=> Vue.observable // 深度转换
ref // 返回一个响应式的引用。
readonly
computed(() => {(ref(1)).value++})
watchEffect(fn) // 跟踪变更
stop() // 停止侦听
watch
```

watch与watchEffect不同
懒执行副作用；
更具体地说明什么状态应该触发侦听器重新运行；
访问侦听状态变化前后的值。

## setup

```
setup(props, context)

// comp-a.vue
export default {
  props: {
    title: 'string'
  },
  setup(props, context) {
    // context是一个普通的js对象。
    // 不是响应式的。
    let {title} = toRefs(props) // 解构
    console.log(props.title)
  }
}
```
执行 setup 时，组件实例尚未被创建。因此，你只能访问以下 property：

props
attrs
slots
emit

换句话说，你将无法访问以下组件选项：

data
computed
methods

从 setup 返回的 refs 在模板中访问时是被自动解开的，因此不应在模板中使用 .value。

在 setup() 内部，this 不会是该活跃实例的引用，因为 setup() 是在解析其它组件选项之前被调用的，所以 setup() 内部的 this 的行为与其它选项中的 this 完全不同。这在和其它选项式 API 一起使用 setup() 时可能会导致混淆。

| 选项式 API | Hook inside setup|
|-|-|
|beforeCreate    | Not needed* |
|created         | Not needed* |
|beforeMount     | onBeforeMount |
|mounted         | onMounted |
|beforeUpdate    | onBeforeUpdate |
|updated         | onUpdated |
|beforeUnmount   | onBeforeUnmount |
|unmounted       | onUnmounted |
|errorCaptured   | onErrorCaptured |
|renderTracked   | onRenderTracked |
|renderTriggered | onRenderTriggered |

hook方法的参数是一个方法。

### 提供、注入

我们也可以在组合式 API 中使用 provide/inject。两者都只能在当前活动实例的 setup() 期间调用。

```
<template>
  <my-marker>
</template>
<script>
import myMarker from './my-marker.vue'
export default {
  components: {
    myMarker
  },
  provide: {
    location: 'string',
    geolocation: {
      longitude: 90,
      latitude: 135
    }
  }
}
</script>
// my-marker.vue
<script>
export default {
  inject: ['location', 'geolocation']
}
</script>
```
在 setup() 中使用 provide 时，我们首先从 vue 显式导入 provide 方法。这使我们能够调用 provide 时来定义每个 property。

provide 函数允许你通过两个参数定义 property：

property 的 name (<String> 类型)
property 的 value

```
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide } from 'vue'
import MyMarker from './MyMarker.vue

export default {
  components: {
    MyMarker
  },
  setup() {
    provide('location', 'North Pole')
    provide('geolocation', {
      longitude: 90,
      latitude: 135
    })
  }
}
</script>
```
在setup()中使用inject时也需要从vue中显示导入它。
inject(name[, default])

# 工具

## 单文件组件

```
// usage
// 该例子不是单文件组件
Vue.component("comp-name", comp)

缺点：
1. 需要全局定义，且各component之间不能命名冲突。
2. 字符串模板不高亮
3. 不支持css
4. 不能预处理，因没有构建步骤。
```
单文件组件是`*.vue`文件。
```
<template>
  <div>...</div>
</template>
<script>
...
</script>
<style>
...
</style>
```
在webpack中需要使用vue-loader处理`*.vue`单文件。

## 测试

单元测试
  Jest
  Mocha
组件测试
  vue testing library
端到端 (E2E，end-to-end) 测试
  跨浏览器测试
  cypress
  Nightwatch.js
  Puppeteer
  TestCafe

## TypeScript支持

Vue 3 是用 TypeScript 编写的。这意味着在 Vue 中使用 TypeScript 不需要任何其他工具——它具有一流的公民支持。

```
npm i -g @vue/cli
vue create <project-name>
vue add typescript

<script lang="ts">
</script>
```

要让 TypeScript 正确推断 Vue 组件选项中的类型，需要使用 defineComponent 全局方法定义组件：
```
import { defineComponent } from 'vue'
const Component = defineComponent({
  // 已启用类型推断
})
```
TypeScript 应该能够在不显式定义类型的情况下推断大多数类型。

## mobile

Capacitor
NativeScript

# 规模化

## 路由

```
// 引入组件
const NotFoundComponent = { template: '<p>Page not found</p>' }
const HomeComponent = { template: '<p>Home page</p>' }
const AboutComponent = { template: '<p>About page</p>' }
// 定义路由
const routes = {
  '/': HomeComponent,
  '/about': AboutComponent
}
// 
const SimpleRouter = {
  data: () => ({
    currentRoute: window.location.pathname
  }),
  // 计算组件
  computed: {
    CurrentComponent() {
      return routes[this.currentRoute] || NotFoundComponent
    }
  },
  // 函数式组件
  render() {
    return Vue.h(this.CurrentComponent)
  }
}
// 挂载根组件
Vue.createApp(SimpleRouter).mount('#app')
```

## title
## title
# 无障碍
# 从vue2迁移
# 贡献文档

# tip

当前的vue3做了一些兼容vue2的事。
比如：
在vue2中data/watch是export default 的对象的子属性、方法。
在vue3中兼容此方式。
在使用vue3时有更合适的写法。
写在setup里。
使用reactive/ref处理data.
使用watchEffect代替watch的功能。
