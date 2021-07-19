# `babel`

## overview
> 它是js编译器
所有包都在`@babel`下。
使用了管道模式。所有轮换功能都需要插件完成。

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
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。


plugin有轮换功能。每个插件的转换功能不一样。
presets  设置一些插件


