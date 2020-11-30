## vue-loader的原理

使用了4个loader：
selector
style-compiler
template-compiler
babel-loader(它引入的)

对`*.vue`文件的template/script/style分别使用不同的loader.

### template部分

```
import __vue_template__ from "!!../../lib/template-compiler/index?{\"id\":\"data-v-793be54c\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!../../lib/selector?type=template&index=0&bustCache!./basic.vue"
import __vue_template__ from "!
!
../../lib/template-compiler/index?{\"id\":\"data-v-793be54c\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!
../../lib/selector?type=template&index=0&bustCache!
./basic.vue"
```

从右到左执行。
先被selector处理，再被template-compiler处理。
seletor把template抽出来后交给template-compiler处理成html

### script部分

```
import __vue_script__ from "!
!
babel-loader!
../../lib/selector?type=script&index=0&bustCache!
./basic.vue"
```
从右到左执行。
selector把`*.vue`文件中的script部分抽出来。传递给babel-loader处理为javascript.

### style部分

```
import __vue_styles__ from "!!vue-style-loader!css-loader!../../lib/style-compiler/index?{\"vue\":true,\"id\":\"data-v-793be54c\",\"scoped\":false,\"hasInlineConfig\":false}!../../lib/selector?type=styles&index=0&bustCache!./basic.vue"
// 分割后
import __vue_styles__ from "!
!
vue-style-loader!
css-loader!
../../lib/style-compiler/index?{\"vue\":true,\"id\":\"data-v-793be54c\",\"scoped\":false,\"hasInlineConfig\":false}!
../../lib/selector?type=styles&index=0&bustCache!
./basic.vue"
```
从右到左执行。
selector把style部分取出后
传递给style-compiler，处理为css.
再传递给css-loader处理为module
再传递给vue-style-loader把css放在`<style>`里，再注入到html中。

#### tip

vue-style-loader是从style-loader fork出来的。
vue-style-loader在stylye-loader的基础上添加了ssr功能。

### selector

分别处理template/script/style.
主要用到parser.

### parser

解析工作由compiler.parseComponent完成。
compiler是`vue-template-compiler`的一个实例。这个包是vue本体的一部分。它在node-module/@vue目录下。

#### parseComponent

parseComponent 里面有以下变量
处理对象 sfc
把 .vue 里的 css, javaScript, html 抽离出来之后，存放到找个对象里面
变量 depth
当前正在处理的节点的深度，比方说，对于 <template><div><p>foo</p></div></template来说，处理到 foo 时，当前深度就是 3, 处理到 </div> 时，当前深度就是 2 。
  currentBlock
当前正在处理的节点，以及该节点的 attr 和 content 等信息。
函数 start
遇到 openTag 节点时，对 openTag 的相关处理。逻辑不是很复杂，读者可以直接看源码。有一点值得注意的是，style 是用 array 形式存储的
函数 end
遇到 closeTag 节点时，对 closeTag 的相关处理。
函数 checkAttrs
对当前节点的 attrs 的相关处理
函数 parseHTML
这是和一个外部的函数，传入了 content (其实也就是 .vue 的内容)以及由 start和 end 两个函数组成的对象。看来，这个 parseHTML 之才是分解分析 .vue 的关键
跟之前一样，我们要继续深入 parseHTML 函数来分析，它到底对 .vue 做了些什么，源码如下

#### parseHTML

深入到这一步，我想再提醒一下读者，selector的目的是将 .vue 中的 template, javaScript, css 分离出来。带着这个目的意识，我们再来审视这个 parseHTML。
parseHTML 整个函数的组成是：
一个 while 循环
在 while 循环中，存在两个大的分支，一个用来分析 template，一个是用来分析 script 和 style。
函数 advance
向前跳过文本
函数 parseStartTag
判断当前的 node 是不是 openTag
函数 handleStartTag
处理 openTag, 这里就用到了之前提到的 start() 函数
函数 parseEndTag
判断当前的 node 是不是 closeTag，同时这里也用到了 end() 函数
通过以上各个函数的组合，在while循环中就将 sfc 分割成了三个不同的部分，读者可以对比我的注释和源码自行解读源码逻辑。
顺便在这里吐个槽，很明显这里的 parseHTML 是函数名是有问题的，parseHTML 应该叫做 parseSFC 比较合适。

### others

VeuLoaderPlugin是挂载在compiler的compilation钩子上的。

```
class VueLoaderPlugin {
  apply (compiler) {
    // add NS marker so that the loader can detect and report missing plugin
    compiler.hooks.compilation.tap(id, compilation => {
      const normalModuleLoader = require('webpack/lib/NormalModule').getCompilationHooks(compilation).loader
      normalModuleLoader.tap(id, loaderContext => {
        loaderContext[NS] = true
      })
    })
    ...
```

因为在selector里写死了参数，所以vue-loader无法扩展（就是不能与其他loader链式调用）。这与webpack的loader设计方式相背。

Vue 的模板编译是在 mount 的过程中进行的，在mount的过程中进行的。在mount 的时候执行了 compile 这个方法来将 template 里的内容转换成真正的 HTML 代码。complie 之后执行的事情也蛮重要的，这个我们留到最后再说。complie 最终生成 render 函数，等待调用。这个方法分为三步：
complie 最终生成 render 函数，等待调用。这个方法分为三步：
1. parse 函数解析 template
2. optimize 函数优化静态内容
3. generate 函数创建 render 函数字符串

## parse解析

## optimiz优化

静态内容指的是和数据没有关系，不需要每次都刷新的内容。
optimize 的过程分为两步：
1. 标记所有的静态和非静态结点
2. 标记静态根节点

## 标记静态根节点
## generate 生成 render

整个 Vue 渲染过程，前面我们说了 complie 的过程，在做完 parse、optimize 和 generate 之后，我们得到了一个 render 函数字符串。
那么接下来 Vue 做的事情就是 new watcher，这个时候会对绑定的数据执行监听，render 函数就是数据监听的回调所调用的，其结果便是重新生成 vnode。当这个 render 函数字符串在第一次 mount、或者绑定的数据更新的时候都会被调用，生成 Vnode。如果是数据的更新，那么 Vnode 会与数据改变之前的 Vnode 做 diff，对内容做改动之后，就会更新到我们真正的 DOM 上啦~
