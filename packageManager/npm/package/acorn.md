# overview
使用js写的小型js解析器

# install
`npm i acorn`

# usage
```
let acorn = require("acorn");
console.log(acorn.parse("1 + 1", {ecmaVersion: 2020}));
```

## interface
当出现语法错误时，会提示`SyntaxError`对象。
```
SyntaxError: {
    pos // 错误出现的距行首的偏移量。
    loc: {   // 错误的位置
        line,
        column
    }
}
```

## command line interface
||||||
|-|-|-|-|-|
|--ecma3|||||
|--ecma4|||||
|--ecma5|||||
|--ecma6|||||
|--ecma7|||||
|--ecma8|||||
|--ecma9|||||
|--module|||||
|--location|||||
|--allow-hash-bang|||||
|--allow-await-outside-function|||||
|--compact|||||
|--silent|||||
|--help|||||

# api
## parse(input, options)
options: {
    ecmaVersion: 必填
    sourceType
}
返回ast(抽象语法树)
该方法是此库的主要接口。

|options|description|option value|||
|-|-|-|-|-|
|ecmaVerions|es版本号|3/4/5/6/7/8/9/10/11/12|||
|sourceType|源代码的格式|'script' / 'module'|||
|onInsertedSemicolon|||||
|onTrailingComma|||||
|allowReserved|||||
|allowReturnOutsideFunction|||||
|allowImportExportEverywhere|||||
|allowAwaitOutsideFunction|||||
|allowHashBang|||||
|laocation|||||
|onToken|||||
|onComment|||||
|ranges|||||
|program|||||
|sourceFile|||||
|directSourceFile|||||
|preserveParens|||||

## parseExpressAt(input, offset, options)
解析指定字符串右边代码。
返回ast.

## tokenizer(input, options)

## tokTypes


## getLineInfo(input, offset)

# principle

使用rollup打包。
（rollup使用它做代码分析。）
`package.json`中定义不同打包命令。用于分别打包。主要是输出格式不同。
下面主要看`<root>/acorn/rollup.config.js`。
该配置文件指定了入口文件是`<root>/acorn/src/index.js`
`<root>/acorn/src/index.js`
定义了一个类。
创建函数中根据默认option设置了属性。

## 目录结构
```
<root>
|-- acorn
    |-- src
        |-- options.js  该库需要的option
        |-- util.js     工具方法地
        |-- tokenType.js  代码中标记的信息
        |-- scopeflags.js  作用域的码值对应表
        |-- whitespace.js  空白符
        |-- identifier.js  标识符
        |-- parseutil.js   为Parse对象扩展原型对象的方法。
        |-- expression.js   为Parse对象扩展原型对象的方法。
        |-- lval.js   为Parse对象扩展原型对象的方法。
        |-- node.js   为Parse对象扩展原型对象的方法。新建了node方法。
        |-- regexp.js   为Parse对象扩展原型对象的方法。新建了RegExpValidationState类。
        |-- scope.js   为Parse对象扩展原型对象的方法。新建了scope类。
        |-- statement.js   为Parse对象扩展原型对象的方法。
        |-- tokencontext.js   为Parse对象扩展原型对象的方法。新建了TokContext类。
        |-- tokenize.js   为Parse对象扩展原型对象的方法。新建了Token类。
        |-- identifier.js
        |-- locutil.js     定位用到的方法。
        |-- package.json   只定义了一个对象。
```
看完目录结构，发现该包把Parse类的原型上的方法会到好多文件中编写。（若写在一个文件里估计有几千行。我就都不想看了。）
