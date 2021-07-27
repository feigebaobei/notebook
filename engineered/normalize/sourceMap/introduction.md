# Introduction to JavaScript Source Maps

## overview
> 介绍source map

## real world
source map可以让编译、压缩后的客户端代码可读。
source map记录了源代码的位置信息。它可以让你很快找到压缩后指定位置的代码对应源代码中的位置。
chrome/ff 23+已经支持解析source map了。
在这个网站：https://ryanseddon.com/demo/source_mapping/ 右击代码后选择`get original location`会得到指定位置对应源代码中的位置信息。

## 为什么我会关心source map
js的未来是光明的。可能使用很简单的语言转换为js:
- coffeescript
- es6
- sass/less
- pretty
ff已经支持coffeescript了。
google web toolkit (gwt)
`traceur`可以把es6+的代码转换为es3。

## source map 如何工作
在压缩的文件后添加一行：`//# sourceMappingURL=/path/to/file.js.map`。就可以在浏览器中当未压缩的文件使用。
设置`X-SourceMap: /path/to/file.js.map`可以不显示注释。

## 如何生成source map
需要使用“闭包编译器”。再执行如下命令：
```
java -jar compiler.jar \ 
     --js script.js \
     --create_source_map ./script-min.js.map \
     --source_map_format=V3 \
     --js_output_file script-min.js
```
` --source_map_format=V3 \`明确指定使用v3版本。

## 剖析source map
```
{
    version : 3,                            // 指定source map的版本号
    file: "out.js",                         // 生成代码后的文件名。
    sourceRoot : "",                        // 源文件的目录。
    sources: ["foo.js", "bar.js"],          // 源文件名组成的数组。
    names: ["src", "maps", "are", "fun"],   // 在源文件中出现的所有变量、方法名。
    mappings: "AAgBC,SAAQ,CAAEA"            // 使用base64 VLQ值映射。
}
```
它是一个普通对象。

## Base64 VLQ使source map变小
vlq(variable length quantity)









### feature
- feature0
- feature1
- feature2

## install
`npm i {{packageName}}`

## usage
同`./demo.md`
```
const {{packageName}} = require('{{packageName}}');
// or
// import {{packageName}} from '{{packageName}}';
// TODO: DEMONSTRATE API
```

## configuration
默认配置文件：`path/to/file.json`。

## api
`{{packageName}}.fn(param, first: string, second: boolean = true) => void`
description

`{{packageName}}.fn(param, [options: {a: string, b?: number}])`
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