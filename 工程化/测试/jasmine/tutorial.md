# overview
本文是根据[官网的教程](https://jasmine.github.io/tutorials/your_first_suite)翻译的。
官网中代码与对应的说明更好。本文只对官网的文本记录了自己理解。

# 一个测试集合
测试集合：描述你的测试。
`describe`方法是若干相关测试细则的集合。每个测试文件都至少有一个describe在顶级。可嵌套。

# 测试细则
全局的jasmine的方法`it`是测试细则的方法。
```
it(describe, fn)
describe 测试细则的标题
fn       测试细则的测试方法
```

# 它只是一个方法
`describe`/`it`都一个方法。可以包括任意用于测试的代码。

# 期望值
`expect`是一个期望的方法。其参数是被期望的值。它是一个链，它期望匹配到的方法的运行结果是它的参数。

## 匹配方法
会把匹配方法的运行结果与期望值比较，若为true，则通过，否则不通过。
任何一个匹配的方法都可以使用链式断言否定值。`expect`/`not`链式调用。
jasmine有丰富的设置匹配方法的方法。api中提供了很多内容方法，也支持自定义方法。

## 启动与teardown
帮助测试集合重复启动或停止。如：
```
beforeEach // 在每个测试细则调用前调用
afterEach  // 在每个测试细则调用后调用
beforeAll  // 在所有测试细则调用前调用
afterAll   // 在所有测试细则调用后调用
```

## this关键字
不会
this是一个空对象。

## 手动失败
`fail(msg)`方法会触发失败的消息。

## 嵌套的describe块
describe可以嵌套。

# 残疾的测试集合
不会

# 未完成的测试细则
若测试细则没运行，则此细则被标记为`pending`。
任何使用`xit`的测试细则不会被标记为`pending`.

# 间谍
不会

## spies: createSpy
## spies: createSpyObj

# 匹配更多的策略
当不想匹配精确的值时使用。
```
jasmine.any(constructor)              // 该对象的构造器是否是指定的构造器
jasmine.anything                      // 不是null/undefined
jasmine.objectContaining({k: v})              // 指定的对象中是否包括指定的k/v。
jasmine.arrayContaining([...])        // 指定的数组中是否包括指定的值。
jasmine.stringMatching(str/exp)       // 指定的客串中是否包括指定的字符串
```

## 自定义不对称的测试
`{asymmetricMatch: xxx}`，一个包含`asymmetricMatch`属性的对象可实现此功能。

# jasmine clock
计时器
```
jasmine.cloc().install
jasmine.cloc().uninstall
```

## 模拟js超时方法
设置`setTimeout/setInterval`只在tick后执行。
`jasmine.clock().tick(ms)` // 指定ms时间后执行。

## 模拟日期
`jasmine.clock().mockDate(date)` // 用于模拟当时的日期。

# 支持异步
`beforeAll/afterAll/beforeEach/afterEach/it`可以成为异步的。有三种方法：
- 设置一个回调方法。
- 返回一个promise
- 使用async

## 使用回调
`done.fail`在测试细则失败时执行。

## 使用promise

## 使用async/await

