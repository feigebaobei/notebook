# `jasmine`

## overview
为node.js开发的测试助手包。默认输出到终端。
可以在node.js中运行，也可以浏览器中运行。

## install
`npm i jasmine`

## usage
```
// cli用法
jasmine init              // 生成默认配置文件。
// or
// npx jasmine init
jasmine examples          // 为源代码生成在示例。
jasmine path/to/file.js   // 执行指定的说明文件。也可使用glob。

// library用法
let Jasmine = require('jasmine')
let jasmine = new Jasmine()
jasmine.loadConfigFile('spec/support/jasmine.json') // 加载说明文件
// or
// jasmine.loadConfig({
//     spec_dir: 'spec',
//     spec_files: [
//         'appSpec.js',
//         'requests/**/*[sS]pec.js',
//         'utils/**/*[sS]pec.js'
//     ],
//     helpers: ['helpers/**/*.js']
// })
jasmine.onComplete(function(passed: boolean) {...})  // 自定义onComplete事件
jasmine.configureDefaultReporter({...})              // 设置默认reporter
let CustomeReporter = require('./myCustomReporter')
jasmine.addReporter(new CustomeReporter())           // 添加reporter
jasmine.execute()                                    // 执行测试
// or
// jasmine.execute(['fooSpec.js'], 'a spec name')    // 执行指定的说明文件
```

## configuration
默认配置文件：`spec/support/jasmine.json`。
支持dir glob。可在此文件设置很多配置。
```
{
    "spec_dir": "spec"                                   // 相对于当前工作的说明文件的目录
    "spec_files": ["**/*[sS]pec.js", "!**/*nospec.js"]   // 指定包含和不包含（使用!开头）的说明文件
    "helpers": ["helpers/**/*.js"]                       // 相对于spec_dir的助手文件。
    "failSpecWithNoExpectations": false                  // 是否让一个没有期望的说明失败。
    "stopSpecOnExpectationFailure": false                // 当前一个期望失败时是否停止
    "stopOnSpecFailure": false                           // 当前一个期望文件失败时是否停止执行。
    "random": false                                      // 是否半随机执行
}
```

### filtering specs
`jasmine "spec/**/critical/*Spec.js"`   // 执行一些文件。
`jasmine spec/currentSpec.js`           // 执行一个文件。
`jasmine --filter "adapter21*"`          // 执行匹配正则的文件。

## cli options
JASMINE_CONFIG_APTH  指定配置文件。相对/绝对。
--no-color           无颜色输出
--filter             指定需要运行的说明文件
--stop-on-failure    当期望失败时是否停止
--random             是否半随机运行说明文件
--seed               xxxx
--reporter           xxxx

## api

jasmine.fn(param, first: string, second: boolean = true) => void
description

jasmine.fn(param, [options: {a: string, b?: number}])
description

## principle
此包的处理逻辑。

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。

## ??
helper是做什么的？
spec.js文件怎么写？