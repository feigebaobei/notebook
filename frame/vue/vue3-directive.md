// 各钩子函数
{
  beforeMount
  mounted
  beforeUpdate
  updated
  beforeUnmounted
  unmounted
}
mounted(el, binding, vnode) {
  let vm = binding.instance
}

app.directive('dire-name', {
  // 各钩子方法。
})

参数说明：
el:      指令所在的dom
binding: {
  instance // 组件的实例
  value    // 传入指令的值 v-dire="1 + 1"中的2。只有一个。
  oldvalue // 只在beforeUpdate / updated中有效。
  arg      // 传入指令的参数。只有一个。
  modifiers // 指令的修饰符 v-dire.foo.bar中的修饰对象是{foo: true, bar: true}
  dir       // 注册指令时的对象
}
vnode:      el对应的虚拟dom（即vnode）
prevNode:   上一个虚拟节点。在beforeUpdata/updated时有效。

// defined
// 全局注册
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})
// 组件内局部注册
directives: {
  focus: {
    mounted(el) {
      el.focus()
    }
  }
}
directives: {
  focus: (el, binding, vnode, prevNode) => {} //
}
// usage
`<input v-focus>`
v-focus:for="value"    // for是静态指令参数
v-dire:[arg]="value"   // arg是动态指令参数
// 原理
`<root>/packages/runtime-core/src/directives.ts`
/**
 * Adds directives to a VNode.
 */
export function withDirectives<T extends VNode>
在vnode上增加directive的功能。
  为什么默认挂载在mounted/updated上。
invokeDirectiveHook
调用directive的方法。


`<root>/packages/runtime-core/src/compat/reanderFn.ts`
convertLegacyDirectives
给vnode添加指令。部分挂载。
此方法在compatH中使用。

`<root>/packages/vue/src/index.ts`
export * from '@vue/runtime-dom'

`<root>/packages/runtime-core/src/component.ts`
createComponentInstance
返回一个被初始化后的实例对象。其中有`directives`属性。

`<root>/packages/runtime-core/src/renderer.ts`
setupRenderEffect
触发各个钩子方法。

`<root>/packages/runtime-core/src/vnode.ts`
VNode.dirs就是用于放置directive的。


// demo: 内置指令
`<root>/packages/runtime-dom/src/directives/vShow.ts`


`app.directive('d-n', {...})`