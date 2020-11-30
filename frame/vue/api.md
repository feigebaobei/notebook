# api

## 全局配置

Vue.config是一个对象，包含Vue的全局配置，可以在启动应用之前修改下列property.

### silent
是否取消vue所有的日志与警告。
### optionMergeStrategies

自定义合并策略。

### devtools

是否允许`vue-devtools`检查代码。

### errorHandler

未捕获错误的处理函数，由这个方法处理。
```
Vue.config.errorHandler = (err, vm, info) => {...}
```

### warnHandler

为 Vue 的运行时警告赋予一个自定义处理函数。注意这只会在开发者环境下生效，在生产环境下它会被忽略。
```
Vue.config.warnHandler = (msg, vm, trace) => {...}
```

### ignoredElements

使 Vue 忽略在 Vue 之外的自定义元素。

### keyCodes

给v-on自定义键位别名
```
Vue.config.keyCodes = {
  v: 86,
  f1: 112,
  // mediaPlayPause: 179,
  'media-play-pause': 179,
  up: [38, 87]
}
```

### performance

boolean
在浏览器的开发工具的性能、时间线面板中启用对组件初始化、编译、渲染、打补丁的性能追踪。

### productionTip

boolean
是否阻止vue在启动时生成生产提示。

## 全局api

### Vue.extend(options)

使用基础`Vue`构造器，创建一个子类。

```
// 使用创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}}</p>',
  data: function () {
    return {
      firstName: 'he',
      lasttName: 'llo'
    }
  }
})
// 使用创建的结果
new Profile().$mount('#mountPoint')
```

### Vue.nextTick([cb, context])

在下次dom更新循环结束之后执行延迟回调。
在修改数据之后立即使用这个方法，获取更新后的dom。

```
vm.msg = 'hello'
Vue.nextTick(function () {
  // dom 更新了。
})
Vue.nextTick().then(function () {
  // dom 更新了。
})
```

### Vue.set(target, propertyName/index, value)

向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 this.myObject.newProperty = 'hi')

### Vue.delete

删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到 property 被删除的限制，但是你应该很少会使用它。

### Vue.directive(id[, definition])

注册或获取全局指令。

```
Vue.directive('my-directive', {
  bind: function () {},
  inserted: function () {},
  update: function () {},
  componentUpdated: function () {},
  unbind: function () {}
})
Vue.directive('my-directive', function () {
  // 会被bind / update调用
})
var myDirective = Vue.directive('my-directive')
```

### Vue.filter(id[, definition])

注册或获取全局过滤器。

```
// setter
Vue.filter('my-filter', function (value) {
  // 
})
// getter
var myFilter = Vue.filter('my-filter')
```

### Vue.component(id[, definition])

注册或获取全局组件。注册还会自动使用给定的 id 设置组件的名称.

```
// 注册。传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({...}))
// 注册。传入一个选项对象。（自动调用Vue.extend）
Vue.component('my-component', {...})
// 获取注册的组件。（始终返回构造器）
var MyComponent = Vue.component('my-component')
```

### Vue.use(plugin)

安装Vue.js插件。
若插件中一个对象，必须提供install方法。
若插件是一个方法，则会被作为install方法。
执行install时，会将Vue作为参数传入。
需要在执行`new Vue()`前被调用。
若多次执行一次安装，则只安装一次。

### Vue.mixin(mixin)

全局注册一个混入。

### Vue.compile(template)

```
var res = Vue.compile('<div><span>{{msg}}</span></div>')
new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render
  staticRenderFns: res.staticRenderFns
})
```

### Vue.observable(object)

让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。
返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景：

```
const state = Vue.observable({ count: 0 })
const Demo = {
  render(h) {
    return h('button', {
      on: { click: () => { state.count++ }}
    }, `count is: ${state.count}`)
  }
}
```

### Vue.version

Vue的版本号
var version = Number(Vue.version.split('.')[0])

## 选项、数据

### data

Vue 实例的数据对象。Vue 将会递归将 data 的 property 转换为 getter/setter，从而让 data 的 property 能够响应数据变化。
实例创建之后，可以通过 vm.$data 访问原始数据对象。

`JSON.parse(JSON.stringify(obj))`

### props

props 可以是数组或对象，用于接收来自父组件的数据。
{
  type // 构造函数
  default any
  required boolean
  validator function
}

### propsData

创建实例时传递props。

```
var Comp = Vue.extend({
  props: ['msg'],
  template: '<div>{{msg}}</div>'
})
var vm = new Comp({
  propsData: {msg: 'hello'}
})
```

### computed
### methods

不能使用箭头函数。

### watch

不能使用箭头函数。

## 选项、dom

### el

提供一个在页面上已经存在的dom元素作为vue实例的挂载目标。可以是css选择器，也可以是一个HTMLElement实例。

### template

一个字符串模板作为 Vue 实例的标识使用。。模板将会替换挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发插槽。

### render

接受一个`createElement`的方法为参数。
若它存在，则不会使用template/el.

### renderError

## 选项、生命周期钩子
this指向实例。
不能使用箭头函数。
### beforeCreate
数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
### created
### beforeMount
该钩子在服务器端渲染期间不被调用。
### mounted

注意 mounted 不会保证所有的子组件也都一起被挂载。
如果你希望等到整个视图都渲染完毕，可以在 mounted 内部使用
vm.$nextTick

```
mounted: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
  })
}
```

### beforeUpdate

该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。

### updated

注意 updated 不会保证所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以在 updated 里使用 vm.$nextTick：

```
mounted: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
  })
}
```

### cativated

被 keep-alive 缓存的组件激活时调用。
该钩子在服务器端渲染期间不被调用。

### deactivated

被 keep-alive 缓存的组件停用时调用。
该钩子在服务器端渲染期间不被调用。

### beforeDestroy
### destroyed
### errorCaptured

当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。
`(err: Error, vm: Component, info: string) => ?boolean`

## 选项、资源

### directives
### filters
### components
## 选项、组合
### parent
### mixins
Mixin 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。
### extends

允许声明扩展另一个组件 (可以是一个简单的选项对象或构造函数)，而无需使用 Vue.extend。这主要是为了便于扩展单文件组件。

### provide / inject

provide 和 inject 主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。
provide 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的 property。
提示：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。

```
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```
```
// 使用一个注入的值作为一个 property 的默认值：
const Child = {
  inject: ['foo'],
  props: {
    bar: {
      default () {
        return this.foo
      }
    }
  }
}

// 使用一个注入的值作为数据入口：
const Child = {
  inject: ['foo'],
  data () {
    return {
      bar: this.foo
    }
  }
}

// 如果它需要从一个不同名字的 property 注入，则使用 from 来表示其源 property：
const Child = {
  inject: {
    foo: {
      from: 'bar',
      default: 'foo'
    }
  }
}

// 与 prop 的默认值类似，你需要对非原始值使用一个工厂方法：
const Child = {
  inject: {
    foo: {
      from: 'bar',
      default: () => [1, 2, 3]
    }
  }
}
```
## 选项、其它
### name

只有作为组件选项时起作用。
允许组件模板递归地调用自身。注意，组件在全局用 Vue.component() 注册时，全局 ID 自动作为组件的 name。

### delimiters

改变纯文本插入分隔符。

### functional

函数式组件

### model
### inheritAttrs

不会

### comments
这个选项只在完整构建版本中的浏览器内编译时可用。

## 实例 property

### vm.$data
### vm.$props
### vm.$el
### vm.$options
### vm.$parent
### vm.$root
根vue实例
### vm.$children
### vm.$slots
### vm.$scopedSlots
### vm.$refs
### vm.$isServer
### vm.$attrs
### vm.$listeners

## 实例方法、数据
### vm.$watch(expOrFn, cb[, options])
options: {
  deep      boolean
  immediate boolean 是否立即以表达式的当前值触发回调：
}
### vm.$set
### vm.$delete
## 实例方法、事件
### vm.$on(event, cb)

```
vm.$on('test', function (msg) {...})
vm.$emit('test', 'hi') // hi
```

### vm.$once(event, cb)
监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。
### vm.$off([event, cb])
### vm.$emit(eventName[, ...args])
### title
### title
## 实例方法、生命周期

### vm.$mount([elementOrSelector])
### vm.$forceUpdate()
使 Vue 实例及其后代组件、插槽内容重新渲染。
### vm.$nextTick([cb])

将回调延迟到下次dom更新循环之后执行。在修改数据之后立即使用它。

### vm.$destroy()
完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。

## 指令
### v-text
### v-html
### v-show
### v-if
### v-else
### v-else-if
### v-for
### v-on
@
.stop
.prevent
.capture
.self
.{keyCode | keyAlias}
.native
.once
.left
.right
.middle
.passive
### v-bind
:
.prop
.camel
.sync
### v-model
限制
input
select
textarea
修饰符
.lazy
.number
.trim
### v-slot
#
### v-pre
跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
`<span v-pre>{{ this will not be compiled }}</span>`
### v-cloak
这个指令保持在元素上直到关联实例结束编译。
```
<div v-clock>{{msg}}</div>
[v-clock] {
  display: none
}
// 不会显示，直到编译结束。
```
### v-once
只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。
```
<!-- 单个元素 -->
<span v-once>This will never change: {{msg}}</span>
<!-- 有子元素 -->
<div v-once>
  <h1>comment</h1>
  <p>{{msg}}</p>
</div>
<!-- 组件 -->
<my-component v-once :comment="msg"></my-component>
<!-- `v-for` 指令-->
<ul>
  <li v-for="i in list" v-once>{{i}}</li>
</ul>
```
## 特殊attribute
### key
key 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
结合 v-for
### ref
### is
## 内置的组件
### component
### transition
props: {
  name
  appear
  css
  type: 'transition' | 'animation'
  mode 'out-in' | 'in-out'
  duration
  enter-class
  leave-class
  appear-class
  enter-to-class
  leave-to-class
  appea-to-class
  enter-active-class
  leave-active-class
  appear-active-class
}
事件：{
  before-enter
  before-leave
  before-appear
  enter
  leave
  appear
  after-enter
  after-leave
  after-appear
  enter-cancelled
  leave-cancelled (只用于v-show)
  appear-cancelled
}
### transition-group
### keep-alive
activated 和 deactivated 将会在 `<keep-alive>` 树内的所有嵌套组件中触发。
props: {
  include
  exclude
  max
}
### slot
### com
## vnode接口
## 服务端渲染
