# `babel`

## overview
它是js编译器
所有包都在`@babel`下。
使用了管道模式。所有轮换功能都需要插件完成。
js的各版本向前兼容。即后发布的版本兼容先发布的版本。‘ 
js规范的制作需要经过5个过程：
|阶段   |说明                          |对应的编译器|||
|-|-|-|-|-|
|stage0|未提交正式提案的讨论              |preset-stage-0|||
|stage1|正式化提案                      |preset-stage-1|||
|stage2|初始的规范，通过polyfill完成功能。 |preset-stage-2|||
|stage3|候选推荐规范                     |preset-stage-3|||
|stage4|必须有2个独立的通过验收测试的实现，会实现在下一个修订版中。|preset-stage-4|||
转译器是转译插件的集合。
转译插件是有转译功能的插件。如转译箭头函数的功能。
转译器分为3类：
- 语法转译器     负责转译js最新的语法。如：class.
- 补丁转译器     负责转译js最新的api和全局对象。如新增的String原型方法。
- jsx/flow/ts
命令行工具是`babel-cli`

### feature
- 让使用es5+规范写的js代码编译为es5/es3规范。
  + 转换语法
  + 弥补旧环境中没有功能。
  + 源代码转换
  + 支持cli
  + 支持js api
  + ……
- 支持插件
- 支持sourcemap
- 支持链式调用

## install
`npm i babel -D`

## usage
```
// cli
babel --plugins <pluginName> <file.js>
// js api
require('@babel/cli').transformSync('code', {
  plugins: [<pluginName>]
})
```

使用不同的包完成不同环境的编译代码工作
jsx/react   react preset
            babel-sublime
flow        flow preset
ts          TypeScript preset


## configuration
它有2种并行的配置形式：
||||||
|-|-|-|-|-|
|babel.config.json|7.x.x以上版本推荐使用`*.json`。也可以是`.js / .cjs / .mjs`。|单一仓库模式|project-wide configuration 全项目配置|应该根目录中。默认作用于全局。|
|.babelrc.json|或`.babelrc / .js / .cjs / .mjs`。|只用于项目的某个部分。|file-relative configuration 文件相关配置|一般作用于当前子包中。若希望作用于全局则应该放在根目录中，再调用`babelrcRoots`字段|
|package.json|和第二行是同一种||||
```
// babel.config.json
{
  presets: [...],
  plugins: [...]
}

// babel.config.js
// 常用于根据环境动态设置配置。
module.exports = function (api) {
  api.cache(true)
  let presets = [...],
  // 可动态设置presets/plugins
  let plugins = [...]
  return {
    presets,
    plugins
  }
}

// .babelrc.json
{
  "presets": [...],
  "plugins": [...]
}

// package.json
{
  ...
  "babel": {
    "presets": [...],
    "plugins": [...]
  }
}
```
### 配置文件
从当前目录依次向上找。
babel.config.json / .babelrc好像用途不一样。
可以使用js写`babel.config.json` / `.babelrc.json`。
|project-wide configuration|file-relative configuration||||
|-|-|-|-|-|
|从7.x后有了根目录的概念。此方式会作用于全项目。|只作用于当前子包||||
|可使用`configFile`设置覆盖默认配置文件。|||||
||默认不是根目录的配置。可使用`babelrcRoots`设置为根配置。||||
|.json .js .cjs .mjs|.json .js .cjs .mjs||||
|推荐使用.json|推荐使用.json||||

7.x后更喜欢`babel.config.json`

若为`*.js`类型，则可以灵活配置。demo:
```
module.exports = function (api) {
  return {...}
}
```
`api.version`
指定babel的版本。

`api.cache`

`api.env(...)`
`api.caller(cb)`
`api.assertVersion(range)`

### 配置选项
`cwd`
string
process.cwd()
工作目录

`caller`
不会

`filename`
不会

`filenameRelative`


`cwd`
`cwd`
`cwd`
`cwd`
`cwd`
`cwd`

`presets`
presets的顺序是从后往前的。
个人理解就是预先设置好babel使用的环境，即告诉babel将编译哪些类型的代码。
实际上，**presets用起来就像是一个组合好的plugins套餐而已**。比如说上面的代码中预设的react。如果我们想实现babel能编译react代码，那么我们就必须得在plugins中配置一堆插件。现在，babel官方将这些plugins组合成了一个 @babel/preset-react 预设，所以我们在presets中配置了就相当于是直接预设了react环境了。


`exclude`
`include`
`ignore`
不转译
`only`
只转译
`overrides`
`sourceType`
告诉babel是否需要以ES6模块去编译，值有 script module(默认) unambiguous 。一般来说，我们项目都是在node环境下的，所以模块化标准用的是CommonJs。这时候如果我们想用ES6的模块化标准的话，我们就需要将其配置为 module 。
而 unambiguous 就比较暴力了，他就看文件中是否出现了import/export，出现了就匹配为 script ,没出现就匹配为 module 。

`parserOpts`
该配置项的库为 @babel/parser 。用于解析文件时的配置，可以利用其解析一些语法，比如jsx，flow等。

`highlightCode`

`minified`
是否压缩。default: false

`plugins`
转译前、依次执行。

`presets`
用于定义转译器的倒序执行顺序。（即：从最后的转译器开始执行）

`cwd`
`cwd`
`cwd`
`cwd`
`cwd`
`cwd`
`cwd`
`cwd`
`cwd`
`cwd`
`cwd`
`cwd`
`cwd`
`cwd`
`cwd`
`cwd`




## plugins & presets
1. 先正序执行plugins
2. 再倒序执行presets

## api
`babel.fn(param, first: string, second: boolean = true) => void`
description

`babel.fn(param, [options: {a: string, b?: number}])`
description

## plugins list
详见`./plugins.md`

`@babel/core` 核心库

`@babel/cli` 命令行工具

`@babel/polyfill` 弥补缺失的新功能

`@babel/plugin-transform-runtime`
`@babel/register`
`@babel/standalone`
`@babel/parse`
`@babel/generator`
`@babel/runtime`
`@babel/template`
`@babel/tranverse`
`@babel/types`

## principle
Babel 本质上就是在操作 AST 来完成代码的转译。
1. babel-cli开始读取我们的参数(源文件test1.js、输出文件test1.babel.js、配置文件.babelrc)
2. babel-core根据babel-cli的参数开始编译
3. Babel Parser 把我们传入的源码解析成ast对象
4. Babel Traverse（遍历）模块维护了整棵树的状态，并且负责替换、移除和添加节点(也就是结合我们传入的插件把es6转换成es5的一个过程)
5. Babel Generator模块是 Babel 的代码生成器，它读取AST并将其转换为代码和源码映射（sourcemaps）。


### uml
Babel的编译过程跟绝大多数其他语言的编译器大致同理，分为三个阶段：
1. 解析：将代码字符串解析成抽象语法树
  2. 词法分析
  2. 语法分析
2. 变换：对抽象语法树进行变换操作
3. 再建：根据变换后的抽象语法树再生成代码字符串
  3. 



```
```

## 常用的转译器
babel-preset-env
转译结果是可以在不同版本的浏览器、node中运行。

babel-preset-es2015
es2015（即es6）转译为es5

babel-preset-latest
不推荐使用。

兼容ie浏览器的转译器
es3-member-expression-literals
es3-property-literals
es5-property-mutators

## 常用的插件
## todo
> 实现一个插件。
> 未来迭代计划。
> 未来迭代计划。



babel-cli内置babel-node
babel-register 用于改写require命令
babel-core     主要用于node等环境。
