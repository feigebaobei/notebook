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
最初为了做详细的映射，生成代码是源代码的10倍大。v2时减少了50%，v3又减少50%。
```
        A  A  g  B  C
        |  |  |  |  |
        |  |  |  |  |
        V  V  V  V  V
        0  0  32 1  2
        // 使用base64 码值对应。
```
mappings字段会很大。该字段的解析：
- 使用;表示行。
- 使用,表示本行片段。
- 每个片段的长度分为1、4、5，或更长。
每个片段都基于前一个片段。
解析mappings字段：
- 生成列
- 在原文件在sources数组中出现的位置
- 原文件中的行号
- 原文件中的列号
- 原文件中的变量名在names中出现的位置。若没有，则不显示。
上图中g是延续位。它会在base64 vlq解码是进行进一步优化。此位可储存一个大数字。（用base64表示的一个大数字，灵感来源于midi format）。
上面的图表AAgBC一旦进一步处理将返回0,0,32,16,1 - 32是延续位，帮助构建下面的值16。在Base64中纯解码的B是1。所以重要的值是0,0,16,1。这让我们知道生成文件的第1行(用分号计数)的第0列映射到文件0(文件0的数组是foo.js)，第16行第1列。
参考source map包（mozilla开发的）去解析片段。










# 转码

base64、base32、base16分别编码转化8位字节为6位、5位、4位。
## base64 码值对应
```
|value|char|
|-|-|
|0|A|
|1|B|
|2|C|
|3|D|
|4|E|
|5|F|
|6|G|
|7|H|
|8|I|
|9|J|
|10|K|
|11|L|
|12|M|
|13|N|
|14|O|
|15|P|
|16|Q|
|17|R|
|18|S|
|19|T|
|20|U|
|21|V|
|22|W|
|23|X|
|24|Y|
|25|Z|
|26|a|
|27|b|
|28|c|
|29|d|
|30|e|
|31|f|
|32|g|
|33|h|
|34|i|
|35|j|
|36|k|
|37|l|
|38|m|
|39|n|
|40|o|
|41|p|
|42|q|
|43|r|
|44|s|
|45|t|
|46|u|
|47|v|
|48|w|
|49|x|
|50|y|
|51|z|
|52|0|
|53|1|
|54|2|
|55|3|
|56|4|
|57|5|
|58|6|
|59|7|
|60|8|
|61|9|
|62|+|
|63|/|
```
还有一个垫字"="。一共65个字符。
base64转码逻辑：
1. 按字符取ascii码值。
2. 每3个8bit转换为4个6bit。（`3*8 = 6*4 = 24`）
3. 每6bit前加2个0。形成4个8bit.
4. 按base64码值每8bit取一个字符。
demo:
The
84 104 101
0101 0100    0110 1000    0110 0101
010101     000110   100001   100101
00010101 00000110 00100001 00100101
21 6 33 37
VGhl

## base32 码值对应
```
|value|char|
|-|-|
|0|A|
|1|B|
|2|C|
|3|D|
|4|E|
|5|F|
|6|G|
|7|H|
|8|I|
|9|J|
|10|K|
|11|L|
|12|M|
|13|N|
|14|O|
|15|P|
|16|Q|
|17|R|
|18|S|
|19|T|
|20|U|
|21|V|
|22|W|
|23|X|
|24|Y|
|25|Z|
|26|2|
|27|3|
|28|4|
|29|5|
|30|6|
|31|7|
```
pad =

## base16 码值对应
```
|value|char|
|-|-|
|0|0|
|1|1|
|2|2|
|3|3|
|4|4|
|5|5|
|6|6|
|7|7|
|8|8|
|9|9|
|10|A|
|11|B|
|12|C|
|13|D|
|14|E|
|15|F|
```







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