# `sinon`

## overview
> JavaScript test spies, stubs and mocks.
它是一个测试工具。不是断言库，不是测试框架。它需要与测试框架（如：mocha）、断言库（如：chai）结合使用。
它能做的事这么少，不知道它的市场怎么来的。

### feature
- spies
- stubs
- mocks

## install
`npm i sinon`

## usage
同`./demo.md`
```
const sinon = require('sinon');
// or
// import sinon from 'sinon';
// <script src="./node_modules/sinon/pkg/sinon.js"></script>
// <script>
//   // Access the `sinon` global...
// </script>
```

## configuration
默认配置文件：`path/to/file.json`。

## api
`sinon.fn(param, first: string, second: boolean = true) => void`
description

`sinon.fn(param, [options: {a: string, b?: number}])`
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