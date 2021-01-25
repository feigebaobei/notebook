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

# title
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