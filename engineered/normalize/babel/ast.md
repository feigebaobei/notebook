# `ast`

## overview
> 把源代码转换为ast.
> 再使用控件把ast转换为新代码。

### feature
- 解析
  - 生成ast
    - 词法分析
    - 语法分析
- 转换
  - 对节点进行添加、更新、移除等操作
- 生成
  - 把ast转换为源码

## install
`npm i ast`

## usage
同`./demo.md`
```
const ast = require('ast');
// or
// import ast from 'ast';
// TODO: DEMONSTRATE API
```

## configuration
默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||
## api
`ast.fn(param, first: string, second: boolean = true) => void`
description

`ast.fn(param, [options: {a: string, b?: number}])`
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