# overview
在终端中高亮显示文本。
>>>>>>> 24b41625f91ace69117ef9a1934f713c641d5cd4

# install
`npm i chalk`

# usage
```
const chalk = require('chalk');
const log = console.log;
// Combine styled and normal strings
log(chalk.blue('Hello') + ' World' + chalk.red('!'));
```

# options
`chalk.<style>[.<style>...](string, [string...])`。若样式冲突则优先使用最后一个。
`chalk.`


## style
||||
|-|-|-|
|reset|||
|bold|||
|rest|||
|dim|Emitting only a small amount of light.||
|itelic|||
|underline|||
|inverse|交换前景色/背景色||
|hidden|打印并不可见||
|strikethrough|使用中划线贯穿字符串。||
|visible|||

## colors
||||
|-|-|-|
|black|||
|red|||
|green|||
|yellow|||
|blue|||
|magenta|||
|cyan|||
|white|||
|blackBright/gray/grey|||
|redBright|||
|blueBright|||
|magantaBright|||
|cyanBright|||
|whiteBright|||

## background colors
||||
|-|-|-|
|bgBlack|||
|bgRed|||
|bgGreen|||
|bgYellow|||
|bgBlue|||
|bgMagenta|||
|bgCyan|||
|bgWhite|||
|bgBlackBright / bgGray / bgGrey|||
|bgRedBright|||
|bgGreenBright|||
|bgYellowBright|||
|bgBlueBright|||
|bgMagentaBright|||
|bgCyanBright|||
|bgWhiteBright|||

## 模板字符串
`{style / content / ${variable}}`
`in {bold ${var} miles}.`

## 256 / 真色
||||
|-|-|-|
|rgb|||
|hex|||
|keyword|||
|hsl|||
|hsv|||
|hwb|||
|ansi|||
|ansi256|||

# principle
用到好多操作原型链的方法。如：
setPrototypeOf
getPrototypeOf
defineProperty
为什么不用class / Object.create做呢？
用到2个依赖包：
ansi-styles
supports-color

有在终端中设置文本颜色的方法。（我不知道是什么方法）。`chalk`是基于`ansi-styles`开发的。
`ansi-styles`使用该方法在终端中输出文本。
