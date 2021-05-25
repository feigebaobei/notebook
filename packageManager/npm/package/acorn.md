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
parse(input, options)
options: {
    ecmaVersion: 必填
    sourceType
}
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

# principle
