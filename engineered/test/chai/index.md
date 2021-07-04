# `chai`

## overview
为node/browser开发的bdd/tdd断言库。可以方便与任意js测试库结合使用。

### feature
- 开放了should/expect/assert接口。
- 可链式使用bdd.
- 支持插件扩展。

## install
```
npm i chai -D
// or
<script src="chai.js" type="text/javascript"></script>
```

## usage

```
// 断言
const chai = require('chai');
let {assert} = chai
let foo = 'bar'
let beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
assert.typeOf(foo, 'string'); // without optional message
assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
assert.equal(foo, 'bar', 'foo equal `bar`');
assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');

// expect可链式调用
var expect = require('chai').expect
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(beverages).to.have.property('tea').with.lengthOf(3);

// should链式断言。需要在每个对象的调用链中先使用should。
// assert/expect/should中只有should是方法的运行结果。
var should = require('chai').should() //actually call the function
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
beverages.should.have.property('tea').with.lengthOf(3);
```

### difference
`expect`用于测试期望值，其他的都使用`should`

### es6的使用方式
```
import chai from 'chai'
chai.should()
// or
import 'chai/register-should'
```
### configuration
```
chai.config.includeStack = true // 跟踪错误信息
chai.config.showDiff = false    // 当断言失败时AssertionError对象中是否有showDiff字段。
chai.config.truncateThreshold = 0 // 设置断言失败时期望值与实际值的长度阈值。若超过阈值，则走过部分被截断。

```
|||defalut||
|-|-|-|-|
|chai.config.includeStack|跟踪错误信息|false||
|chai.config.showDiff|当断言失败时AssertionError对象中是否有showDiff字段。|true||
|chai.config.truncateThreshold|设置断言失败时期望值与实际值的长度阈值。若超过阈值，则超过设置断言失败时期望值与实际值的长度阈值。若超过阈值，则走过部分被截断。|40||

## core plugin


## configuration
默认配置文件：`path/to/file.json`。

## api

`chai.fn(param, first: string, second: boolean = true) => void`
description

`chai.fn(param, [options: {a: string, b?: number}])`
description

## principle
出口文件是`<root>/lib/chai.js`
`<root>/lib/chai.js`
定义了一个use方法。此方法是运行`fn(exprots, util)`。
这个方法没多东西。东西都在`fn`上。我看了几个fn方法大体上是为export设置一些属性。util是此包内置的一些文件的集合。exports对象是`<root>/lib/chai.js`的exports对象。它的属性都会被暴露出去。
下面看几个重要的文件。

`<root>/utils`
里面都是一些工具方法。平时我们写项目也会以写一些工具方法。
`flags(obj, key, value)`
得到obj里的key对应的值，或设置`obj[key] = value`
`proxify(obj, nonChainableMethodName)`
返回一个代理对象。它的get方法被代理。若符合条件，则返回相应的值。
`transferFlags(assertion, object, includeAll)`
设置`object.__flags[flag]`
`addProperty(ctx, name, getter)`
设置ctx的name属性。使用了`Object.defineProperty(..)`
`addMethod(ctx, name, method)`
设置方法。
`test(obj, args)`
Test and object for expression.

`<root>/chai/assertion.js`
<!-- 为`exports`对象设置`Assertion`属性。 -->
设置`exports.Assertion(obj, msg, ssfi, lockSsfi)`
该方法返回一个代理对象。

`<root>/core/assertions.js`
此文件定义了assert的api。对应文档中的api.

`<root>/interface/expect`
`expect(val, message)`
返回一个Assertion的实例。
`expect.fail(actual, expected, message, operator)`
返回一个断言失败。

`<root>/interface/should`
定义should的api。
支持should/Should.

`<root>/interface/assert`
设置assert方法。
定义assert的api.

`<root>/chai/config.js`
配置的集合。

## 后记
多分出几文件可解决循环引用的问题。
提出一个核心文件。然后多次使用。此包的核心文件是`<root>/chai/assertion.js`。vue的核心文件是`runtime-core`。也可以提出一个核心方法。再多次修改、使用。
