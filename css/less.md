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
// 嵌套
@import "lessFileName"
// or
#main {
	@import "lessFileName"
}

// @extend
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
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

`<root>/index.js`
从class中得到实例，再使用。
输出的`Render`是`<root>/render`方法的输出值。

`<root>/environment/environment.js`
返回一个class，其实例有方法：`getFileMaager/addFileManager/clearFileManagers`

`<root>/import-manager.js`
```
export default function (environment) {
	return class ImportManager {
		constructor(less, context, rootFileInfo) {...}
		push(path, tryAppendExtention, currentFileInfo, importOptions, callback) {...}
	}
}
```

`<root>/parse-tree.js`
```
export default function (sourceMapBuilder) {
	return class ParseTree {
		constructor(lroot, imorts) {...}
		toCSS(options) {
			...
			evaldRoot = transformTree(this.root, options);
			result.css = evaldRoot.toCSS(toCSSOptions);
			return result
		}
	}
}
```

`<root>/transform-tree.js`
```
export default function (root, options) {
	...
}
```

`<root>/parse.js`
添加plugin
调用parser()
```
```

### uml
```
```

### 学到内容
```
// 同时支持cb/promise的方法
let fn = (args, cb) => {
    let f = (args, cb) => {
        let r // 用于保存结果。
        let err // 用于错误信息。
        // ...
        // 经过若干处理后得到结果
        if (err) {
            cb(err, null)
        } else {
            cb(null, r)
        }
    }
    if (cb) {
        f(args, cb)
    } else {
        new Promise((s, j) => {
            fn(args, (e, r) => {
                if (e) {
                    j(e)
                } else {
                    s(r)
                }
            })
        })
    }
}
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。