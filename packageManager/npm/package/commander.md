# overview
node cli的完整解决方案。

# installation
`npm i commander`

# 宣布程序变量
`commander`会输出一个全局对象，这样会方便快速开发程序。为了方便，在本reademe中都使用它。
```
const {program} = require('commander')
program.version('0.0.2')
```
`commander`有多种用法，包括多单元测试，最好使用本地`Command`对象。
```
const {Commnad} = require('commander')
const program = new Command()
program.version('0.0.1')
```
支持esm规范，
```
// index.mjs
import {Command} from 'commander/esm.mjs'
const program = new Command()
```
支持ts
```
// index.ts
import {Command} from 'commander'
const program = new Command()
```

# Options
使用`.option()`方法定义选项。它也做为选项的文档。每一个选项可以有二种标记：短标记/长名字。使用`,`/` `/`|`分割。
在`Command`对象上使用`.opts()`可得到选项。当使用多词选项（multi-word option）如：`--template-engine`时，会被转化为`camelCased`。如：`program.opts().templateEngine`。
多个短标记可缩写为一个。如`-a -b -p 80` => `-ab -p80` / `-abp80`。
使用`--`做为选项的结束符。可省略最后一个。
默认行内选项没有次序。

## Common option types, boolean and value
2种最常用的选项：boolean/从后面的参数中取值（使用`<>`处理，如：`--expect <value>`）。若二者都没有，则使用`undefined`。
```
program
	.option('-d, --debug', 'output extra debuggin')
	.option('-s, --small', 'small pizza size')
	.option('-p, --pizza-type <type>', 'flavour of pizza')
program.parse(process.argv)
const options = program.opts()
if (options.debug) console.log(options)
console.log('pizza details:')
if (options.small) console.log('-small pizza size')
if (options.pizzaType) console.log(`-${options.pizzaType}`)
```
```
$ pizza-options -d
```



# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview


program
Command
Option
