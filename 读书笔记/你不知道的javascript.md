# 作用域是什么

js语言的本质是编译型语言。
js代码在执行前编译。

## 编译原理
1. 记法分析
2. 语法分析。用到编译器。
3. 代码生成

```
            变量声明
编译器 -------------------> 作用域
  |
  |
  |
  V          找变量
引擎----------------------->

            返回变量
    <----------------------
```
LHS左侧查询 变量出现在赋值操作的左侧
RHS右侧查询 变量出现在赋值操作的右侧 更准确的是非左侧
根据作用域链特点。若当前作用域中没有该变量会在其上层查询。直到找到或在全局作用域中找不到。
若在非严格模式下。会创建一个并返回一个全局变量，
否则不会创建一个并返回一个全局变量，报ReferenceError错误。
先做作用域查询，再做类型操作。

# 词法作用域

代码定义时产生的作用域。
查询作用域是会从内向外一层一层地查询。中间作用域的变量被屏蔽了，则无法得到。
访问全局变量：`window.key`

## 欺骗词法作用域（eval/with）
eval在非严格模式下。可以接受一个string。在运行时插入到该作用域中。
eval在严格模式下，有独立的作用域。
with已经不被推荐使用。
with常用于简化访问同一个对象下的多个属性。
```
var o = {a, b, c}
with(o) {
  a = 3
  b = 3
  c = 3
}
```
eval、with 运行都较慢。
  无法判断标识符的位置，无法编译优化。

# 函数作用域与块作用域

js是有函数作用域、块级作用域、局部作用域(全局作用域是最大的局部作用域)。
## 函数作用域
就是用函数包裹一段代码。
可以认为是函数包裹了代码。也可以认为是代码放在了函数内。
这种方式可以实现内部与外部“隔离”。
然后就实现了最小权限原则、规避冲突、创建命名空间等。

```
// 函数声明
function f() {...}
// 函数表达式
var f = function () {...}
```
匿名函数的缺点：
1. 调试困难。
2. 调用自己时需要使用已经过期的方法`argument.callee`
3. 可读性较差。

## 立即执行函数

```
(function () {...})()
// or
(function () {...}())
```
第二个()里的数据会做为function的参数。有时会传递window/document/undefind/另一个方法。

## 块作用域

let、const、with、try/watch
使用块作用域可以让浏览器的垃圾回收器更好分辨哪些空间需要被回收。
（没有块作用域前浏览器怎么回收垃圾。）

# 提升

1. 先编译，再执行。
2. 先声明，再赋值。
3. 函数声明优先变量声明。
4. 一个普通块内部的函数声明会被提升到所在作用域的顶部。
5. 可以覆盖。

# 作用域闭包

函数可以记住并访问所有的词法作用域。当函数在词法作用域外执行时，就产生了闭包。

用途：
1. 返回函数。
2. 回调函数。
3. iife

iife会通过声明并立即执行一个函数来创建作用域。

```
for (var i = 0; i < 5 i++) {
  (function () {
    var j = i;
    setTimeout(() => {...}, 0)
  })()
}
for (var i = 0; i < 5 i++) {
  (function (j) {
    setTimeout(() => {...}, 0)
  })(i)
}
```

模块：返回一个字面量对象的方法。
```
let myModule = function () {
  return {
    a: function () {...},
    b: function () {...},
  }
}
```
模块机制
```
// define module
// name name of module
// deps impl function 需要的params
// impl 定义模块内容的方法。
var MyModules = (function () {
  var modules = {}
  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i]=modules[deps[i]]
    }
    modules[name] = impl.apply(impl, deps)
  }
  function get(name) {
    return modules[name]
  }
  return {
    define: define,
    get: get
  }
  })()
```
import & export
import可以将一个模块中的一个、多个api导入到当前作用域中。

# 附录A: 动态作用域

动态作用域：运行时作用域。
与其相对的是词法作用域。
只关心在何处调用。作用域链是基于调用栈的。
它不好理解的原因是：平时写代码多以词法作用域的思维思考。若以运行时的思维思考则会很好理解。
```
// demo
var a = 2
function foo () {
  console.log(a)
}
function bar () {
  var a = 3
  foo()
}
bar() // 3 因为foo有执行时执行了RHS。在调用栈中先查询到了a = 3（在bar的词法作用域中）。
```
# 附录B: 块作用域的方案

在es3时出来了try/catch。它是块级作用域。
google开发了traceur，它可以把es6代码办的为es5代码。它在对待let时是使用try/catch的。
```
try {
  throw 2
} catch(a) {
  console.log(a) // 2
}
```

# 附录C: this词法



# 附录D: 致谢





# 关于this



# title
# title
# title
# title
# title
# title
# title
# title
# title
# title
# title
# title
# title

# 严格模式与非严格模式的本质异同
# 错误类型
TypeError
ReferenceError