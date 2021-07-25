# `@babel/core`

## overview
> 根据配置文件转译代码。

### feature
- feature0
- feature1
- feature2

## install
`npm i @babel/core -D`

## usage
```
const babel = require('@babel/core');
```

## configuration
默认配置文件：`path/to/file.json`。

## api
以`a/Async`结尾的方法，返回Promise对象。以`sSync`结尾的方法，返回`{ast, code, map}`
`@babel/core.transform(code: string, [options], (err, result) => {})`
转译代码。
result: {
    ast: 
    code: String
    map: 
    metadata: {}
    options: {...}
    sourceType: "module"
}
其实result是一个`FileResult`对象。此对象是此包（用ts写的）内定义的一个type。输出时使用字面量方式写的，所以得到是result的原型是`Object`。

`@babel/core.transformSync(code: string, [options]) => Promise<{code, ast, map}>`
异步转译代码

`@babel/core.transformFile(filename: string, options, cb)`
异步转译文件。

`@babel/core.transformFileSync(filename: string, options)`
`@babel/core.transformFileAsync(filename: string, options) => Promise<{code, ast, map}>`
`@babel/core.transformFromAst(ast: object, [code], [options], cb) => fileNode | null`
`@babel/core.transformFromAstSync(ast: object, [code: string], [options]) => {ast, map, code}`
`@babel/core.transformFromAstAsync(ast: object, [code: string], [options]) => Promise()`
`@babel/core.parse(code: string, [options], cb)`
babel使用标准行为解析。会依据plugins/presets。

`@babel/core.parseSync(code: string, [options]) => AST`
`@babel/core.parseAsync(code: string, [options]) => Promise<AST>`
`@babel/core.loadOptions(options)`
解决babel的options。

`@babel/core.loadPartialConfig([options])`
`@babel/core.createConfigItem(value: string | {} | Function | [string | {} | Function, {} | void], { dirname?: string, type?: "preset" | "plugin" })`

## principle
官网说此包是babel的核心。此包的核心是`@babel/generator`和` convert-source-map`。
此包逻辑：
- 多次方法调用。直到使用`generate`方法。都没多少逻辑，就是一个方法调用另一个方法。
- 处理了source map.

### 列出调用关系
```
transformFile      > transformFileRunner > run > transformFile + generateCode > generate
transformFileSync  > transformFileRunner > run > transformFile + generateCode > generate
transformFileAsync > transformFileRunner > run > transformFile + generateCode > generate
transform          > transformRunner     > run ...
transformSync      > transformRunner     > run ...
transformAsync     > transformRunner     > run ...
```
### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。