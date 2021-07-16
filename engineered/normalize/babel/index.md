# `babel`

## overview
> 它是js编译器

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
默认配置文件：`path/to/file.json`。

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





