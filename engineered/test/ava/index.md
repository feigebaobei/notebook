# `ava`

## overview
> 用node.js的测试运行器。默认输出error，独立进程让开发更舒服。

### feature
- 更小、更快
- 简单的测试语法
- 并行测试文件
- 强力写原子测试
- 支持ts
- 支持最新的js语法
- 内置断言（功能比较少）
- 每个测试文件一个独立环境
- 支持异步（async/await/promise）
- 支持可查看
- 在ci中自动运行并发测试
- 堆栈跟踪

## install
`npm i ava`

## usage
同`./demo.md`
```
const ava = require('ava');
// or
// import ava from 'ava';
// TODO: DEMONSTRATE API
```

## configuration
默认配置文件：`path/to/file.json`。

## api
`ava.fn(param, first: string, second: boolean = true) => void`
description

`ava.fn(param, [options: {a: string, b?: number}])`
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