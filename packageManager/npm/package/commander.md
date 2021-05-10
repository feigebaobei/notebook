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
该包在大型程序中有多种用法，包括多单元测试，最好使用本地`Command`对象。
```
const {Command} = require('commander')
const program = new Command()           // program是Command的实例。 
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

## Default option value
可以设置一个默认值
```
program
	.option('-c, --cheese <type>', 'add the specified type of cheese', 'blue')
program.parse()
console.log(`cheese: ${program.opts().cheese}`)
```
```
$ pizza-options
cheese: blue
$ pizza-options --cheese stilton
cheese: stilton
```

## Other option types, negatable boolean and boolean|value
若定义了以`no-`开头和不以`no-`开头的相当的选项时，则这2个选项的默认值分别是false、true.
若只定义了以`no-`开头的选项时，则该选项的默认值是true.
使用`[]`处理可选参数`--optional [value]`，若不带参数，则可用作boolean选项。否则参数中得到值。
```
program
  .option('-c, --cheese [type]', 'Add cheese with optional type');

program.parse(process.argv);

const options = program.opts();
if (options.cheese === undefined) console.log('no cheese');
else if (options.cheese === true) console.log('add cheese');
else console.log(`add cheese type ${options.cheese}`);
```
```
$ pizza-options
no cheese
$ pizza-options --cheese
add cheese
$ pizza-options --cheese mozzarella
add cheese type mozzarella
```

## Required option
使用`requiredOption()`定义必填属性。要么设置默认值，要么在命令行输入值。
```
program
	.requiredOption('-c, --cheese <type>', 'pizza must have cheese')
```
## varidic option
要选项类型后面加`...`可设置为变长参数。即在一个数组内保存为该选项输入的数据。以`--`表示设置变长参数结束。

```
program
  .option('-n, --number <numbers...>', 'specify numbers')
  .option('-l, --letter [letters...]', 'specify letters');

program.parse();

console.log('Options: ', program.opts());
console.log('Remaining arguments: ', program.args);
```
```
$ collect -n 1 2 3 --letter a b c
Options:  { number: [ '1', '2', '3' ], letter: [ 'a', 'b', 'c' ] }
Remaining arguments:  []
$ collect --letter=A -n80 operand
Options:  { number: [ '80' ], letter: [ 'A' ] }
Remaining arguments:  [ 'operand' ]
$ collect --letter -n 1 -n 2 3 -- operand
Options:  { number: [ '1', '2', '3' ], letter: true }
Remaining arguments:  [ 'operand' ]
```

## 版本选项
可以使用`-V`/`--version`设置版本。设置了版本后，命令行会输出当前的版本号。
用法与`option`相同。
```
program.version('0.0.1', '-v, --vers', 'output the current version');
```

## 更多配置项
大多数情况下，选项均可通过.option()方法添加。但对某些不常见的用例，也可以直接构造Option对象，对选项进行更详尽的配置。
```
program
  .addOption(new Option('-s, --secret').hideHelp())
  .addOption(new Option('-t, --timeout <delay>', 'timeout in seconds').default(60, 'one minute'))
  .addOption(new Option('-d, --drink <size>', 'drink size').choices(['small', 'medium', 'large']));
```

# 命令
使用`.command()`/`.addCommand()`添加（子）命令。必须设置行为或独立的可以执行文件。
`.command(commandName)`
commandName    命令的名字，可必填，可选填。






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



# 读各版本源码
## 0.0.0
输出了2个构造函数：Option/Command。
输出默认值`new Command()`
## 1.0.0
与0.0.0相似
## 2.0.0
与0.0.0相似
入口文件为`index`
删除了example
## 3.0.0
基于`events.EventEmitter`开发的。
使用`on`定义事件，使用`emit`触发事件。没有移除事件。
`parse`是解析的意思，tj把它用于执行选项、命令了。
可定义选项，可定义命令。

## 1.0.0
## 1.0.0
## 1.0.0
## 1.0.0


## 为什么先讲option，再讲command
### 定义命令
项目中的`package.json`。
```
{
	...
	"bin": {
		commandKey: "commandFile"
	}
}
```
### usage
```
commandKey
```
### 命令的选项
在上一块代码中只有命令，没有选项。若真是这样，真是太难用了。
在`commandFile`中设置选项。
```
const program = require('commander') // 因为cli中使用node运行的，所有采用commonjs规范。
program.version('0.0.1')
program
	.option('', '')
```
program是`Command`的实例，
Command#option(flags, description, [[fn], defaultValue])
flags         选项的标记
description   选项的说明
fn            不会
defaultValue  默认值

## Command构造函数（或类）

|方法|说明|参数|demo|备注|
|-|-|-|-|-|
|Command#parse|在定义时设置选项并执行命令|argv[]|||
|Command#parseArgs|解析命令`args`|args[], unknown|||
|Command#action|为命令定义回调函数||||
|Command#parseOptions|从`argv`中解析出选项，再返回`argv`|argv[]|||
|Command#parse|||||
|Command#parse|||||
|Command#parse|||||
|Command#parse|||||
|Command#parse|||||
|Command#parse|||||
|Command#parse|||||
|Command#parse|||||
|Command#parse|||||

## 困难
我以前没有接触过编辑命令行。于是用编辑function的思路去理解编辑命令行。结果有好多地方是不通的。tj也不把readme写的入门一点，也没有api。害得我从`0.0.1`开始读它的代码。
我发现写命令行需要5个要素：命令 选项 标记 参数(或变量) 值。
	 写方法需要2个要素： 方法名 参数。

## demo

```
// 快速引入Commander的实例
const program = require('commander')
// 定义选择
program
	.option('-d, --debug', 'output extra debugging')
	.option('-s, --small', 'small pizza size')
// 解析选项，即：执行选项
program.parse(process.argv)
	// process.argv 会获取命令行的数据，返回类型是数组。
// 根据选项及其值，执行相应逻辑。
if (program.debug) console.log(program.opts())
if (program.small) console.log('- small pizza size')
```

# overview
官网写的readme太差了，连一个像样的demo都没有。我看了几天readme也没学会。后来还是去看源码自己揣摸出来的。是tj太nb了，让我这个小白的看不懂他的的文章，还是写不清楚自己的库能干什么、怎么干。下面是我写的demo。方便像我这样的小白入门。若你能看懂tj写的readme。关了这个页面吧。
# init project
```
mkdir projectCommand
cd projectCommand
lerna init
lerna create testCommand
lerna add commander
```
# defined
修改`./projectCommand/packages/testCommand/package.json`
```
{
	...
	"bin": {
		"demo": "./bin/index.js"
	}
}
```
# init cli
在中创建`./projectCommand/packages/testCommand/bin/index.js`。编辑内容如下：
```
#!/usr/bin/env node

// 快速引入Commander的实例
const program = require('commander')
// 定义选项
program
	.option('-d, --debug', 'output extra debugging')
	.option('-s, --small', 'small pizza size')
// 解析选项，即：执行选项
program.parse(process.argv)
	// process.argv 会获取命令行的数据，返回类型是数组。
// 根据选项及其值，执行相应逻辑。
if (program.debug) console.log(program.opts())
if (program.small) console.log('- small pizza size')
```
该文件的处理逻辑：根据选项执行相应输出。

# usage
## 在本包中使用命令
在`./projectCommand/packages/testCommand`下执行`npm link`
再执行`demo -d`，则输出：`{ debug: true, small: undefined }`
再执行`demo -s`，则输出：`- small pizza size`
若得到相应输出，则验证cli运行正确。

## 在其他包中使用命令
创建一个其他包
在`./projectCommand/`中执行
```
lerna create useCommand
lerna add testCommand
cd packages/testCommand
npm unlink               // 取消全局软链接该包
demo -d                  // 验证是否取消成功
// => zsh: command not found: demo
```
编辑`./projectCommand/packages/useCommand/package.json`
```
{
	...
	"script": {
		...
		"useDemo": "demo -d"
	}
}
```
在`./projectCommand/packages/useCommand/`下执行
```
npm run useDemo
// => { debug: true, small: undefined }
```
若得到相应输出，则验证cli运行正确。

# 后记
记得在`./projectCommand/packages/testCommand`下执行`npm unlink`
删除`projectCommand`项目。
## 为什么使用lerna创建项目
我已经学习了lerna。不用也是浪费。
## package.json中的bin字段
它是定义命令的地方。本地中定义的命令叫`demo`。读者也可以叫别的名字。也可以定义多个命令。
定义命令在package.json中。使用命令在终端中。执行命令时会执行package.json中bin字段对应的文件。

## 命令对应的文件
`#!/usr/bin/env node`是标明当前文件是可执行文件。使用node解析当前文件。可执行文件的第一行必须是它。
请使用commonjs规范编辑该文件。

## 使用命令
若是全局安装该包则全局可以使用该包的命令。
若是局部安装该包则局部可以使用该包的命令。
