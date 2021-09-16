# `less`

## overview
> TODO: description

### feature
- feature0
- feature1
- feature2

## install
`npm i less`

## usage
### cli
```
// 先安装 // npm i less
lessc [option option=parameter ...] <source> [destination]
```

### browse
```
<link rel="stylesheet/less" type="text/css" href="styles.less" />
<script
	less={
		env: "development",
		async: false,
		fileAsync: false,
		poll: 1000,
		functions: {},
		dumpLineNumbers: "comments",
		relativeUrls: false,
		rootpath: ":/a.com"
	}
></script>
<!-- 配置项会作用于之后所有less -->
<script src="less.js" type="text/javavscript"></script>
```

### programmatic
```
const less = require('less');
less.render(lessInput, option).then((output) => {
	// output: {
	// 	css
	// 	map
	// }

})
```

### plugin
```
npm i less-plugin-myplugin // 建议使用less-plugin-为前缀

lessc --myplugin
// or
// lessc --plugin=myplugin

// 传参
lessc --myplugin="advanced"
// or
// lessc --plugin=myplugin=advanced

// 在less包中使用插件
let less = require('less')
let myplugin = require('./myplugin')
less.render(myLess, {plugins: [myplugin]}).then((output) => {...}, (error) => {...})
```
### demo
```
```

## configuration
默认配置文件：`path/to/file.json`。
|key|description|default|type|enum|demo||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||
## api
`less.fn(param, first: string, second: boolean = true) => void`
description

`less.fn(param, [options: {a: string, b?: number}])`
description

## principle
使用lerna管理了三个包。`less`/`less-browse`/`less-node`。
内部有的使用了构造方法-原型链扩展，也有使用`class`的。每个构造函数/class只做一个功能，再在index文件中统一后输出。
基本方法差不多是同一个人写的。

如何实现跨平台？

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。