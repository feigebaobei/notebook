# packages/compiler-sfc
## overview
这是一低层的的编译vue的单文件组件（single file components）的工具。
可以基于该包再写一个用于sfc的插件/打包器。如: vue-loader/rollup-plugin-vue/vite

### api
故意把此包做的低层一点。就是为了方便上层二次开发。可实现如下功能：
- 把script/template/style分开在hmr时。
    + 更新template时不应该重置组件状态。
    + 更新style应该不重新渲染组件。
- 利用工具的插件系统预处理。如`<style lang="scss">`
- 有时，使用平行化配置时不能共享相同的执行环境。如：`thread-loader`。加载template时会使用`vue-loader`处理全部的sfc。
使用外观模式统一处理script/template/style。如下：
```js
// main script
import script from '/project/foo.vue?vue&type=script'
// template compiled to render function
import { render } from '/project/foo.vue?vue&type=template&id=xxxxxx'
// css
import '/project/foo.vue?vue&type=style&index=0&id=xxxxxx'

// attach render function to script
script.render = render

// attach additional metadata
// some of these should be dev only
script.__file = 'example.vue'
script.__scopeId = 'xxxxxx'

// additional tooling-specific HMR handling code
// using __VUE_HMR_API__ global

export default script
```

### high level workflow
1. 使用parse处理源代码。生成外观（模式的）转换。
2. 

## compiler-sfc/src/index.ts
从兄弟文件中引入并输出。
