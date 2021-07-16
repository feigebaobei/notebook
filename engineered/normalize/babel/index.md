# `babel`

## overview
> 它是js编译器
所有包都在`@babel`下。

### feature
- 让使用新规范写的js代码可以在旧浏览器环境运行。
  + 转换语法
  + 弥补旧环境中没有功能。
  + 源代码转换
  + ……
- 支持插件
- 支持sourcemap
- 支持链式调用

## install
`npm i babel`

## usage
同`./demo.md`
```
const babel = require('babel');
// or
// import babel from 'babel';
// TODO: DEMONSTRATE API
```

使用不同的包完成不同环境的编译代码工作
jsx/react   react preset
            babel-sublime
flow        flow preset
ts          TypeScript preset


## configuration
2种配置形式：
- babel.config.json。或`.js / .cjs / .mjs`
- .babelrc.json。或`.babelrc / .js / .cjs / .mjs`
- package.json中的babel字段。
```
// babel.config.json
{
  presets: [...],
  plugins: [...]
}

//babel.config.js
module.exports = {
  presets: [...],
  plugins: [...]
}
```
babel.config.json / .babelrc好像用途不一样。
可以使用js写`babel.config.json` / `.babelrc.json`。

## api
`babel.fn(param, first: string, second: boolean = true) => void`
description

`babel.fn(param, [options: {a: string, b?: number}])`
description

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。


plugin有轮换功能。每个插件的转换功能不一样。
presets  设置一些插件


