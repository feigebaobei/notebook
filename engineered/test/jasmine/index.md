# `jasmine`

## overview
为node.js开发的测试助手包。默认输出到终端。
可以在node.js中运行，也可以浏览器中运行。

## 名词说明
|||||
|-|-|-|-|
|-|测试集合|一个describe包括的内容||
|spec|测试细则|每个测试项，由`it`设置。||
|-||||
|-||||
|-||||
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

`afterAll([fn: function[, timeout: number = jasmine.DEFAULT_TIMOUT_INTERVAL]])`
设置`decribe`中所有测试细则`it`完成时执行的方法。

`afterEach([fn: function[, timeout: number = jasmine.DEFAULT_TIMEOUT_INTERVAL]])`
设置每个测试细则完成时执行的方法。

`beforeAll([fn: function[, timeout: number = jasmine.DEFAULT_TIMEOUT_INTERVAL]])`

`beforeEach([fn: function[, timeout: number = jasmine.DEFAULT_TIMEOUT_INTERVAL]])`

`describe(description: string, specDefinitins: function)`
创建一个测试集合。

`expect(actual: any) -> {matchers}`
为当前测试细则设置期望值。

`expectAsync(actual: any) -> {async-matchers}`
为当前测试细则设置异步期望值。matchers也需要是异步的。每matcher都返回一个promise.

`fail([error: string | error])`
设置测试细则失败。

`fdescribe(description: string, specDefinitions: function)`
设置被关注的description。
只有被关注的description才能被执行。

`fit(description: string, testFunction: function, [timeout: number = jasmine.DEFAULT_TIMEOUT_INTERVAL])`
设置被关注的it
只有被关注的测试细则才会被执行。

`it(description, [testFuntion: function[, timeout: number = jasmine.DEFAULT_TIMEOUT_INTERVAL]])`

`pending([msg: string])`
设置测试细则被忽略。

`setSpecProperty(key: string, value: any)`
在回馈的报告中的`SpecResult`字段中使用用户的定义的属性。

`setSuiteProperty(key: string, value: any)`
在回馈的报告中的`SuiteResult`字段中使用用户的定义的属性。

`spyOn(obj, methodName) -> {Spy}`
xxx

`spyOnAllFunction(obj, includeNonEnumerable) -> {Object}`
xxx

`sypOnProperty(obj: object, propertyName: string, [accessType: string]`
xxx

`xdescribe(description, specDefinition)`
设置临时不使用的`description`

`xit(description, [testFunction])`
设置临时不使用的`it`

## type definitions

`implementationCallback([done])`

`JasmineDoneInfo`

`JasmineStartedInfo`

`SpecFilter(spec)`

`SpecResult`

`SuiteResult`

## principle
此包的处理逻辑。

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。

## ??
helper是做什么的？
spec.js文件怎么写？