##module.exports|exports|export|export defaut的区别

|module.exports|exports|export|export default|
|-|-|-|-|
|node.js中的语法。用来导出对象用法。|node.js中的语法。用来导出对象用法。|es6的语法|es6的语法|
|module.exports = {}|exports={}|export {var0, var1}|export default {}|
|-|-|import {a, b as c} from 'map'|import a from 'map'|

[JS - 各浏览器对ES2015/ES6的支持情况（桌面端、移动端、以及服务器）](http://www.hangge.com/blog/cache/detail_1692.html)  

##桌面端浏览器对ES2015的支持情况
1. Chrome：51 版起便可以支持 97% 的 ES6 新特性。
1. Firefox：53 版起便可以支持 97% 的 ES6 新特性。
3. Safari：10 版起便可以支持 99% 的 ES6 新特性。
4. IE：Edge 15可以支持 96% 的 ES6 新特性。Edge 14 可以支持 93% 的 ES6 新特性。（IE7~11 基本不支持 ES6）

`<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>`

1. babel转码器。  
2. traceur转码器。  

let命令  

1. 所在代码块内有效。  
2. 无变量提升。  
3. 暂时性死区。  
4. 不允许重复声明。  

块级作用域  

IIFE写法。  

    (function () {}())
    (function () {})()

块级作用域写法  

    {
        function () {}
    }

||范围|定义|使用|
|-|-|-|-|
|全局作用域|在全局有作用|在全局定义或不使用var直接给变量赋值||
|函数作用域|在函数内定义后有作用|在函数体内定义||
|块级作用域|在此块内有作用|在块内定义。就是{}内。||

**6种变量声明方法的对比**  

|关键字|特点|
|-|-|
|var||
|function||
|let|1. 所在代码块内有效。 2.无变量提升。 3. 存在暂时性死区。 4. 不允许重复声明。|
|const|1. 用来声明只读常量。 2. 声明时必须初始化。 3. 无变量提升。 4. 存在暂时性死区。 5. 不可重复声明。 6。本质：变量指向的内存地址不变。|
|import||
|class||  

## 解构赋值

1. 数组解构赋值时rest要放在最后。  
3. 解构值严格等于undefined时使用默认值。  
2. 解构对象时按照模式相同的赋值。  
3. 函数参数使用解构赋值并给参数设置默认值。一定要为参数设置默认值。不是为参数的属性设置默认值。  

**默认值，** 只有undefined可以触发默认值。  

## 字符串的扩展

**模板字符串**

## 正则表达式

## 数值的扩展

## 函数的扩展

    function m1 ({x = 0, y = 0} = {}) {}
    // m1函数的默认参数时{}。
    // m1({})时 m1({x = 0, y = 0 } = {})
    // x = 0
    // y = 0

    function m2 ({x, y} = { x: 0, y: 0 }) {}
    // m2函数的默认值是{ x: 0, y: 0 }
    // m2({})时 m2({x, y} = {})
    // x undefined
    // y undefined

    // 为函数设置必填参数
    function throwIfMissing() {
        throw new Error('Missing parameter')
    }
    function foo (mustBePorvided = throwIfMissing()) {
        // code
    }

1. rest参数后不能再有别的参数。  
2. 函数的length属性不包括rest参数。  

### 严格模式

    'use strict'

es6中规定：只要函数参数使用了默认值、解构赋值、扩展运算符(...rest)，那么函数内部就不能显式设定为严格模式。否则就会报错。  

1. 设定全局性的严格模式。  
2. 把函数包在一个无参数的立即执行函数里。  

**注意：**  
箭头函数：
1. 函数体内的this对象是定义时所在的对象。  
2. 不能用作构造函数。  
3. 不能使用arguments对象。使用rest参数可以启相同作用。  
4. 不能使用yield命令。  
5. 不存在this/arguments/super/new.target

**绑定this**  

###尾调用优化  

最后一步操作。  

    (x) => {
        if (x > 0) {
            return m(x)
        } else {
            return n(x)
        }
    }

1. 不保存函数内部变量。  
2. 不保存函数的调用位置等信息。  

### 尾递归  

    let tailFactorial = (n, total) => {
        if (n === 1) {
            return total
        }
        return (n-1, total * n)
    }
    let factorial = (n) => {
        return taiFactorial(n, 1)
    }

**使用尾调用、尾递归不会发生栈溢出，相对节省内存。**  

**柯里化**  

将多参数的函数转换成单参数的形式。  


1. 柯里化有什么特点。   
2. 柯里化能做什么。  
3. 柯里化能用在什么地方。  
4. 柯里化怎么使用。  
5. 柯里化的优缺点。  

```
    let currying = (fn, n) => {
        return (m) => {
            return fn.call(fn, m, n)
        }
    }
    let tailFactorial = (n, total) => {
        if (n === 1) {
            return total
        }
        return tailFactorial(n - 1, n * total)
    }
    const factorial = currying(tailFactorial, 1)
```

**循环可以使用递归代替，一旦使用递归，最好使用尾递归。**  

**尾调用优化只在严格模式下启作用，在正常模式下无效。**  

## 对象的扩展

**对象中只写属性名时，表示。属性值等于属性名所代表的变量。**

object.assign(target, source1[, source2, source3]) // 将多个源对象的可枚举属性添加到目标对象。  

**对象的遍历方法** 

    for (let key in obj) {} // 遍历对象的key
    Object.keys(obj) // 以数组形式返回对象自身的所有可枚举属性（不包含symbol属性）
    Object.getOwnPropertyNames(obj) // 以数组的形式返回对象自身的所有属性（不含symbol属性）
    Object.getOwnPropertySymbols(obj) // 以数组形式返回对象自身的所有Symbol属性
    Object.ownKeys(obj) // 以数组形式返回对象自身的所有属性

## call/apply/bind
bind 是固定某个函数的参数和this，返回另外一个函数。
call 和 apply是指定this和参数调用这个函数，立即执行这个函数。
call apply 的区别是他们指定参数的方式不同。
都是重新定义this
### call
obj.fn.call(newThis, p0, p1, p2, ...)
### apply
obj.fn.apply(newThis, [p0, p1, p2, ...])
### bind
obj.fn.bind(newThis, p0, p1, p2, ...)

```
function fn(a,b){
    console.log(this);
    console.log(a);
    console.log(b);
}
// bind(this,args...)
bf = fn.bind("Bind this",10); // 没有任何输出，也就是说没有执行这个函数
bf(); // "Bind this",10,undefined
bf(20);// “Bind this”,10,20
// 原函数不受影响
fn(1,2); //window， 1，2
bf2 = fn.bind("Bind this",1,2);
bf2(); // "Bind this",1,2

// call(this,args...)
fn.call("Call this",1) // "Call this",1,undefined
fn.call("Call this",1,2) // "Call this",1,2

// apply(this,[args])
fn.apply("Apply this",[1]) // "Apply this",1,undefined
fn.apply("Apply this",[1,2]) // "Apply this",1,2
```
