# title
# title
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
```

```



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