# 应用配置

config 是一个包含了 Vue 应用全局配置的对象。你可以在应用挂载前修改其以下 property：

```
const {createApp} from 'vue'
import App from './App.vue'
createApp(App).config: {
  errorHandler:          undefined
  globalProperties:      {}
  isCustomElement:       () => false
  isNativeTag:           (tag) => {...}
  optionMergeStrategies: {}
  performance:           false
  warnHandler:           undefined
}
```
## errorHandler

app.config.errorHandler = (err, vm, info) => {
  // 处理错误
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
}

指定一个处理函数，来处理组件渲染方法执行期间以及侦听器抛出的未捕获错误。这个处理函数被调用时，可获取错误信息和应用实例。

## warnHandler

app.config.warnHandler = function(msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
}
为 Vue 的运行时警告指定一个自定义处理函数。注意这只会在开发环境下生效，在生产环境下它会被忽略。

## globalProperties

app.config.globalProperties.foo = 'bar'
app.component('child-component', {
  mounted() {
    console.log(this.foo) // 'bar'
  }
})

添加可以在应用程序内的任何组件实例中访问的全局 property。属性名冲突时，组件的 property 将具有优先权。

## isCustomElement

// 任何以“ion-”开头的元素都将被识别为自定义元素
app.config.isCustomElement = tag => tag.startsWith('ion-')

指定一个方法，用来识别在 Vue 之外定义的自定义元素（例如，使用 Web Components API）。如果组件符合此条件，则不需要本地或全局注册，并且 Vue 不会抛出关于 Unknown custom element 的警告。

## optionMergeStrategies

为自定义选项定义合并策略。
合并策略选项分别接收在父实例和子实例上定义的该选项的值作为第一个和第二个参数，引用上下文实例被作为第三个参数传入。

## performance

设置为 true 以在浏览器开发工具的 performance/timeline 面板中启用对组件初始化、编译、渲染和更新的性能追踪。只适用于开发模式和支持 performance.mark API 的浏览器。

# 应用api

```
vue: {
  BaseTransition: (...)
  Comment: (...)
  Fragment: (...)
  KeepAlive: (...)
  Static: (...)
  Suspense: (...)
  Teleport: (...)
  Text: (...)
  Transition: (...)
  TransitionGroup: (...)
  callWithAsyncErrorHandling: (...)
  callWithErrorHandling: (...)
  camelize: (...)
  capitalize: (...)
  cloneVNode: (...)
  compile: (...)
  computed: (...)
  createApp: (...)                  创建一个应用实例
  createBlock: (...)
  createCommentVNode: (...)
  createHydrationRenderer: (...)
  createRenderer: (...)
  createSSRApp: (...)
  createSlots: (...)
  createStaticVNode: (...)
  createTextVNode: (...)
  createVNode: (...)
  customRef: (...)
  defineAsyncComponent: (...)
  defineComponent: (...)
  defineEmit: (...)
  defineProps: (...)
  devtools: (...)
  getCurrentInstance: (...)
  getTransitionRawChildren: (...)
  h: (...)
  handleError: (...)
  hydrate: (...)
  initCustomFormatter: (...)
  inject: (...)
  isProxy: (...)
  isReactive: (...)
  isReadonly: (...)
  isRef: (...)
  isVNode: (...)
  markRaw: (...)
  mergeProps: (...)
  nextTick: (...)
  onActivated: (...)
  onBeforeMount: (...)
  onBeforeUnmount: (...)
  onBeforeUpdate: (...)
  onDeactivated: (...)
  onErrorCaptured: (...)
  onMounted: (...)
  onRenderTracked: (...)
  onRenderTriggered: (...)
  onUnmounted: (...)
  onUpdated: (...)
  openBlock: (...)
  popScopeId: (...)
  provide: (...)
  proxyRefs: (...)
  pushScopeId: (...)
  queuePostFlushCb: (...)
  reactive: (...)
  readonly: (...)
  ref: (...)
  registerRuntimeCompiler: (...)
  render: (...)
  renderList: (...)
  renderSlot: (...)
  resolveComponent: (...)
  resolveDirective: (...)
  resolveDynamicComponent: (...)
  resolveTransitionHooks: (...)
  setBlockTracking: (...)
  setDevtoolsHook: (...)
  setTransitionHooks: (...)
  shallowReactive: (...)
  shallowReadonly: (...)
  shallowRef: (...)
  ssrContextKey: (...)
  ssrUtils: (...)
  toDisplayString: (...)
  toHandlerKey: (...)
  toHandlers: (...)
  toRaw: (...)
  toRef: (...)
  toRefs: (...)
  transformVNodeArgs: (...)
  triggerRef: (...)
  unref: (...)
  useContext: (...)
  useCssModule: (...)
  useCssVars: (...)
  useSSRContext: (...)
  useTransitionState: (...)
  vModelCheckbox: (...)
  vModelDynamic: (...)
  vModelRadio: (...)
  vModelSelect: (...)
  vModelText: (...)
  vShow: (...)
  version: (...)
  warn: (...)
  watch: (...)
  watchEffect: (...)
  withCtx: (...)
  withDirectives: (...)
  withKeys: (...)
  withModifiers: (...)
  withScopeId: (...)
}

createApp(comp, props): { // createApp 方法返回应用实例本身，因此可以在其后链式调用其它方法，这些方法可以在以下部分中找到。
  component: ƒ component(name, component)
  config: (...)
  directive: ƒ directive(name, directive) // 注册或检索全局指令
  mixin: ƒ mixin(mixin)
  mount: (containerOrSelector) => {…}
  provide: ƒ provide(key, value)
  unmount: ƒ unmount()
  use: ƒ use(plugin, ...options)
  version: "3.0.4"
  _component: {name: "App", components: {…}, __hmrId: "7ba5bd90", __file: "src/App.vue", render: ƒ, …}
  _container: null
  _context: {app: {…}, config: {…}, mixins: Array(0), components: {…}, directives: {…}, …}
  _props: null
  _uid: 0
}
```

## directive

```
app.directive('my-directive', {
  // 指令有6个钩子函数
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated () {},
  beforeUnmount () {},
  unmounted () {}
})
```

## mixin
## mount
## provide
## unmount
## use

# 全局api

这里只说一些常用的、重要的。

## createApp(comp, props)

```
// 第一种方法
import App from './App.vue'
const app = Vue.createApp(App)
// 此方法是经过vue-loader处理过的*.vue文件。引入后得到
{
  render: Function // 只有它有用
  ...
}
render是生成组件的方法。
vue-loader就是把*.vue文件处理成一个render方法(表示式)供webpack使用。

// 第二种方法
const app = Vue.createApp({
  data () {
    return {...}
  },
  props: Object | Array,
  computed,
  methods,
  watch
  emits: Array<string> | Object.
})
```

## h(tag, props, children)
## defineComponent(Object: ComponentOptions | setup: Function)

defineComponent最重要的是：在TypeScript下，给予了组件 正确的参数类型推断 。
返回一个组件。
组件中是object.name | function的名字

## defineAsyncComponent(fn: Function)

创建一个异步组件，当需要它时加载。
fn: 返回Promise对象的方法。
  promise的resolve参数是从服务器上得到的组件。
  promise的reject参数是加载失败的说明。

### usage

```
// 在根组件内使用（全局注册组件）。
app.component('comp-a', defineAsyncComponent(() => {
  return ('./components/comp-a.vue')
}))

// 在组件内使用
createApp({
  components: {
    compA: defineAsyncComponent(() => {
      return ('./components/comp-a.vue')
    })
  }
})
```

## resolveComponent

如果在当前应用实例中可用，则允许按名称解析 component。
返回一个 Component。如果没有找到，则返回 undefined。
只能在 render 或 setup 函数中使用。

## resolveDynamicComponent

只能在 render 或 setup 函数中使用。

## resolveDirective(name)

只能在 render 或 setup 函数中使用。
如果在当前应用实例中可用，则允许通过其名称解析一个 directive。

## withDirectives(vnode, directives)

只能在 render 或 setup 函数中使用。
允许将指令应用于 VNode。返回一个包含应用指令的 VNode。

## createRenderer(hostNode, hostElement)

## nextTick

# 选项

## data
```
data
props
computed
methods   不应该使用箭头函数来定义 method 函数 
watch
emits
```
## dom

template // 组件式风格
render   // 命令式风格

```
let app = createApp({})
app.component('compName', {
  render() {
    return h('tag', props, children)
  },
  props: {
    key: {
      type: Type,
      default: () => {...}
    }
  }
})
```

## 生命周期钩子

## 选项、资源

```
// 定义指令
directives: {
  directiveName: {
    ...
  }
}
// 局部引入
components: {
  compA
}
```

## 组合

mixins
extends
provide/inject
setup(props, context)
setup 函数是一个新的组件选项。它作为在组件内部使用组合式 API 的入口点。
是在 beforeCreate 钩子之前调用的。
从 setup 返回的 refs 在模板中访问时会自动展开，因此模板中不需要 .value。
setup 还可以返回一个渲染函数，该函数可以直接使用在同一作用域中声明的响应式状态：
请不要解构 props 对象，因为它会失去响应式：

## 杂项

name
delimiters
inheritAttrs

# 实例property

$data
$props
$el
$options 需要在选项中包含自定义 property 时会有用处：
```
const app = Vue.createApp({
  customOption: 'foo',
  created () {
    console.log(this.$options.customOption) // 'foo'
  }
})
```
$parent
$root
$slots 只读 返回各个具名插槽。
$refs
$attrs

# 实例方法

## $watch(key, cb, options)
options: {
  deep: Boolean
  immediate: Boolean
  flush
}
返回一个取消侦听函数，用来停止触发回调：
```
const app = Vue.createApp({
  data () {return {...}},
  created () {
    this.$watch('a', (nv, ov) => {...})
    this.$watch(() => this.c.d, (nv, ov) => {...})
    this.$watch(() => this.a + this.b, (nv, ov) => {...})
  }
})
```

当侦听的值是一个对象或者数组时，对其属性或元素的任何更改都不会触发侦听器，因为它们引用相同的对象/数组：

const unwatch = vm.$watch('a', cb)
unwatch()

## $emit

```
<comp-a v-on:en="fn"></comp-a>
methods: {
  fn() {...}
}
// comp-a.vue
<button @click="$emit('en')"></button>
```

## $forceUpdate
## $nextTick
# 指令
v-text
v-html
v-show
v-if
v-else
v-else-if
v-for
v-on @
v-bind :
v-model   支持数据双向绑定
v-slot #
v-pre     跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
v-cloak   这个指令可以隐藏未编译的 Mustache 标签直到组件实例准备完毕。
  和 CSS  规则如 [v-cloak] { display: none } 一起用时，
v-once    只渲染元素和组件一次。
v-is

## v-model

```
// v-model arguments
<comp-a v-model:title="param"></comp-a>
props: {
  title: String
}
emit('update:title', data)

// multiple v-model binding
<comp-a v-model:title="tp" v-model:cont="cp"></comp-a>
props: {
  title: String,
  cont: String
}
emit('update:title', dataTitle)
emit('update:cont', dataCont)
```

本质

```
<comp-a :title="pt" @update:title(data)></comp-a>
```

缩写

```
<comp-a :title.sync="pt"></comp-a>
```
`:title.sync`的值不能是表达式
`.sync`的功能是使一个值变化时同步到其他组件。

# 特殊指令

key
ref
is

# 内置组件

component
```
<component :is="componentParams"></component>
```
transition
  props: {
    name
    appear    是否在初始渲染时使用过渡。默认为 false。
    presisted 表示这是一个不真实插入/删除元素的转换，而是切换显示/隐藏状态。
    css
    type
    mode
    duration
    enter-from-class
    leave-from-class
    appear-class
    enter-to-class
    leave-to-class
    appear-to-class
    enter-active-class
    leave-active-class
    appear-active-class
  }
  事件
transitoin-group
  props: {
    tag        默认为 span
    move-class 覆盖移动过渡期间应用的 CSS 类。
    mode
  }
keep-alive
  props: {
    include
    exclude
    max
  }
  activated
  deactivated
slot
teleport
```
<teleport to="tag"></teleport>
<teleport to="#id"></teleport>
<teleport to=".class"></teleport>
```

# 响应式\api
## 响应式基础api
### reactive(obj)
返回对象的响应式副本
### readonly(obj)

获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。只读代理是深层的：访问的任何嵌套 property 也是只读的。
被代理的原对象被修改后Proxy对象也会被修改。
返回Proxy对象。

### isProxy(param)

检查对象是 reactive 还是 readonly创建的代理

### isReactive(param)

检查对象是否是 reactive创建的响应式 proxy。

### isReadonly(param)

检查对象是否是由readonly创建的只读代理。

### toRaw(Proxy)

返回 reactive 或 readonly 代理的原始对象。

### markRaw

标记一个对象，使其永远不会转换为代理。返回对象本身。
实际上 markRaw 函数所做的事情，就是在数据对象上定义 `__v_skip` 属性，从而跳过代理。

### shallowReactive

创建一个响应式代理，该代理跟踪其自身 property 的响应性，但不执行嵌套对象的深度响应式转换 (暴露原始值)。

### shallowReadonly

## refs

### ref

返回RefImple对象。
在script中使用.value得到数据。
在template中直接得到数据。

### unref

`isRef(val) ? val.value : val`
得到一个被ref()处理前的数据。

### toRef(obj, key)

// 这里错了
返回把obj.key设置为RefImple对象。obj.key不变。
在script标签中需要使用.value获取数据。

### toRefs(obj)

// 这里错了
返回一个Object对象，其每个属性都是ObjectRefImpl对象。原obj不变。

### isRef
### customRef
### shallowRef
### triggerRef

## computed / watch

### computed
### watchEffect(effect, {flush, onTrack, onTrigger})

```
effect: Function           它就是需要执行的副作用函数。
  (onInvalidate) => {}
    onInValidate: Function 用于消除effect产生的副作用
      参数是一个Function
      只作用于异步函数。
      effect方法执行时执行。
      监听器被注销时（如被卸载）执行。
  options:                 何时运行副作用函数
    {
      flush: 'post' | 'pre' | 'sync', 何时执行
      onTrack(),                      开发阶段有效
      onTrigger()                     开发阶段有效
    }
```
立即执行Funtion，并根据Function中的数据添加追踪依赖。依赖变更时重新运行Funtion.
返回一个停止监听函数。运行该函数可停止监听。

```
watchEffect(() => console.log(state.count))
```
onTrack 和 onTrigger 只能在开发模式下工作。
onTrack 将在响应式 property 或 ref 作为依赖项被追踪时被调用。
onTrigger 将在依赖项变更导致副作用被触发时被调用。

### watch(source, Function)

对source监听，当source变更时执行Function.
source可是ref()后的结果，也可是reactive()的结果。
可监听多个源。

# 组合式api
## setup
## 生命周期钩子

beforeCreate    -> use setup()
created         -> use setup()
beforeMount     -> onBeforeMount
mounted         -> onMounted
beforeUpdate    -> onBeforeUpdate
updated         -> onUpdated
beforeUnmount   -> onBeforeUnmount
unmounted       -> onUnmounted
errorCaptured   -> onErrorCaptured
renderTracked   -> onRenderTracked
renderTriggered -> onRenderTriggered

## provide/inject
## getCurrentInstance

# composition api
## setup(props, context)

当前组件的入口。代替了beforeCreate/created.
props是传入当前组件的props。
  父组件传入什么，当前组件的props里就有什么。
  驼峰命名需要使用中划线命名代替。因为html对大小写不敏感。
context是当前组件的上下文。相当于this.
  {
    attrs
    emit
    expose
    props
    slots
  }

## reactive(param)

把参数处理为响应式的。
返回一个Proxy对象。

```
setup () {
  let state = reactive({
    name: 'hi'
  })
  return {state}
}
```

## ref(param)

把参数处理为一个响应式的数据对象。在script标签中使用param.value获取。在template中使用param获取。
其结果是RefImpl类型。

```
import { ref } from 'vue'
setup () {
  const count = ref<number>(10)
  console.log(count.value)
  return {
    count
  }
}
```

## isRef(param)

判断参数是否是ref()处理后的。
返回Boolean

```
import { ref, isRef } from 'vue'
...
setup () {
  let age = 3
  let state = ref(age)
  console.log(isRef(age))
  console.log(isRef(state))
}
```

## toRefs(obj)

toRefs() 函数可以将 reactive() 创建出来的响应式对象，转换为普通的对象，只不过，这个对象上的每个属性节点，都是ObjectRefImpl类型的响应式数据。
因此可解构后使用。`...refs(obj)`
当参数是`RefImpl`对象时可能会出错。
返回Object对象
ObjectRefImpl与RefImpl很像。
```
ObjectRefImpl: {
  __v_isRef: Boolean,
  _key:      String,
  _object:   Proxy,
  vlaue:     Value
}
```

ObjectRefImpl里的每个key都是RefImpl对象。
```
RefImpl: {
  __v_isRef: Boolean,
  _rawValue: Value,
  _shallow:  Boolean,
  _vlaue:    Value,
  value:     Value
}
```

若参数是RefImpl对象，则结果是一个对象，该对象的`_value.value`是原本的值。
```
setup () {
  let state = reactive({
    name: 'top'
  })
  let a = toRefs(state)
  return {
    ...a
  }
}
```

|参数类型|来源|返回类型|
|-|-|-|
|Proxy|reactive(p)|`Object: {各个key: ObjectRefImpl}`|ObjectRefImpl对象的value就是原值。|
|RefImpl|ref(p)|`Object: {..., _value: ObjectRefImpl}`|`object._value.value`|

## computed(Function | {set: Fn, get: Fn})

返回一个ComputedRefImpl对象。
返回一个ref对象。

```
setup () {
  let age = ref(18)
  let compP = computed(() => age.value++)
  return {
    compP
  }
}
```

## watch

返回停止监听的方法。

```
// 可监听reactive()、ref()的返回值
// 可监听多个值
// 停止监听
setup () {
  let state = reactive(obj0)
  let foo   = ref(obj1)
  watch(state.key, (nv, ov) => {...})
  watch(foo.key,   (nv, ov) => {...})
  let sw = watch([state.key, foo.key], (nv, ov) => {...})
  sw() // 停止监听
}
```

## LifeCycle Hooks

参考文档
https://juejin.cn/post/6887359442354962445?content_source_url=https%3A%2F%2Fgithub.com%2Fvue3%2Fvue3-News


## reactive & ref

|reactive|ref||
|-|-|-|
|返回Proxy对象|返回RefImpl对象||
|在template中直接使用|在template中直接使用||
|在script中直接使用|在script中使用.value使用||
|偏低层一些|基于reactive实现的||
|参数必须是引用类型（如：Object/Array）|参数任意||
||||

## isReactive & isProxy & isReadonly & isRef

|isReactive | isProxy | isReadonly| isRef |
|-|-|-|-|
|是否是被reactive处理过的|是否是代理对象（被reactive/readonly处理过的）|是否是被readonly处理过的|是否是RefImpl对象|

## 深&浅

|深|浅|
|-|-|
| ref      | shallowRef      |
| reactive | shallowReactive |
| readonly | shallowReadonly |

toRaw(Proxy)
  Proxy的来源：reactive | readonly
markRaw(obj)

|watchEffect|watch|effect|
|-|-|-|
|基于effect的实现。|-|偏底层的实现。|
|维护组件、实例、组件状态的关系。组件被卸载时自动stop.|source可是ref()后的结果，也可是reactive()的结果。|不维护，不自动卸载|
|组件挂载时执行一次，然后开始追踪source的变化。若的变化则执行function。|source发生变化时执行|-|




