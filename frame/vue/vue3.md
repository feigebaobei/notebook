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
const CompB = {
  components: {
    'comp-a': compA
  }
}
```

## Props
## 非Prop的Attribute
## 自定义事件
## 插槽
## 提供、注入
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

## 模板引用
ref
## 处理边界情况

只有感觉渲染速度慢时才使用v-once。
$forceUpdate用于强制更新。
## 过渡&处理边界情况

- 基于 class 的动画和过渡
- 过渡与 Style 绑定
- 
- 

# 过渡&动画
# 可复用&组合
# 高阶指南
# 工具
# 规模化
# 无障碍
# 从vue2迁移
# 贡献文档
