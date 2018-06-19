#javascript权威指南 笔记

    obj['name']
    obj.name

"use strict"   
在 es3 中不确定的行为得到处理。  
##3
bool, string, digit, array, function, null, undefined, date, regexp, error.  
最大值：+-1.797*E308, 最小值：+-5*E-324.  
16进制： oxff // 15 * 16 + 15 = 255(十进制)  
10进制：
8进制：0377 // 3 * 64 + 7 * 8 + 7 = 255(十进制)  
在es6的严格模式下，8进制是明令禁止的。  
2进制：  

`+-*/%`  

Math对象的属性  

    Math.pow(2, 53); // 2的53次方
    Math.round(0.6); // 1.0, 四舍五入
    Math.ceil(0.6); // 1.0, 向上求整
    Math.floor(0.6); // 0.0, 向下求整
    Math.abs(-5); // -5的绝对植
    Math.min(x, y, z); // 返回最小值
    Math.max(x, y, z); // 返回最大值
    Math.random(); // 返回0<=x<1.0的伪随机数
    Math.PI; // 圆周率
    Math.E; // 自然对数的底数
    Math.sqrt(3); // 3的平方根
    Math.pow(3, 1/3); // 3的立方根
    Math.sin(0); // sin0的值
    Math.cos(0); // cos0
    Math.tan(0); // tan0
    Math.log(10); // 10的自然对数
    Math.log(100)/Math.LN10; // 以10为底100的对数
    Math.log(512)/Math.LN2; // 以2为底512的对数
    Math.exp(3); // e的三次幂

`Infinity`  

string对象的属性  

    str.charAt(0); // 
    str.charAt(str.length - 1); // 
    str.substring(start, end); // 
    str.slice(start, [end]); // 
    str.indexOf('substr'); // 
    str.lastIndexOf('substr'); // 
    str.indexOf('substr', 3); // 
    str.split(','); // 
    str.replace('substr1', 'substr2'); // 
    str.toUpperCase(); // 
    str[0]; // 
    str[str.length - 1]; // 最后一个字符

null 非对象  
undefined 没有初始化  

|||||
|-|-|-|-|
|null|无值|非对象|== true|
|undefined|无值|没有初始化|=== false|

|值|转换为字串|转换为数字|转换为bool值|转换为对象|
|-|-|-|-|-|
|undefined|"undefined"|NaN|false|throws TypeError|
|null|"null"|0|false|throws TypeError|
|true|"true"|1|`-`|new Boolean(true)|
|false|"false"|0|`-`|new Boolean(false)|
|`""`|`-`|0|false|new String('')|
|`1.2`|`-`|1.2|true|new String("1.2")|
|`"one"`|`-`|NaN|true|new String('one')|
|0|`"0"`|`-`|false|new Number(0)|
|-0|`"0"`|`-`|false|new Number(-0)|
|NaN|`"NaN"`|`-`|false|new Number(NaN)|
|Infinity|`'Infinity'`|`-`|true|new Number(Infinity)|
|-Infinity|`'Infinity'`|`-`|true|new Number(-Infinity)|
|1|`"1"`|`-`|true|new Number(1)|
|`{}`|||true|`-`|
|`[]`|`""`|0|true||
|`[9]`|`"9"`|9|true||
|`["a"]`|`"a"`|NaN|true||
|`function () {}`||NaN|true||

显示类型转换  

    Number("3")
    String(false)
    Boolean([])
    Object(3) // new Number(3)
    number.toString(radix) // 转换为字符串
    number.toFixed(num)
    number.toExponential(num)
    number.toPrecision(num)
    parseInt("21345")
    parseFloat("string")

||||
|-|-|-|
|声明|`var variable`|被提前到顶部|
|定义|`var variable = 1`|不会被提前|

ajax  
图像ping  
jsonp  
comet  
web socket  

    var point = {x: 1, y: 2}
    "x" in point // true
    "z" in point // false

    o instanceof Object // o的是否是Object的实例
    o typeof Object // o的原型是否是Object

    eval()
    // 在严格模式下。可以更改局部变量，不能在局部作用域内定义新的变量或函数。

多次声明同一个变量无所谓。  

break  
continue  
return  

    throw new Error('string')

    try {
        // 抛出一个异常
    }
    catch(e) {
        // 捕获异常时执行
    }
    finally {
        // 永远会执行
    }

严格模式下禁止使用with语句。非严格模式下不推荐使用with。原因难于人优化，运行慢。  
debugger // 加断点  
"use strict"  

|严格模式|非严格模式|
|-|-|
|禁止使用with|可以使用|
|使用变量、函数、参数……必须先声明|可以不声明|
|调用的函数（不是方法）中的this是undefined|this是全局对象|
|call(), apply() 中的this是传入的第一个参数||
|给只读属性赋值和给不可扩展对象创建新成员时会抛出类型错误。|显示操作失败，只报错。|

对象object  
    
    var book = {
        "main title": 'js', // 属性名字中有空格，必须用字符串表示。  
        'sut-title': 'object', // 属性名字中有连字符，必须用字符串表示。
        'for': 'student', // for是保留字，必须用字符串表示。
        author: { // 这个属性名字可以不加引号。
            firstname: 'david',
            surname: 'flanagan'
        }
    }

对象常见的用法。  
|创建|create|
|设置|set|
|查找|query|
|删除|delete|
|检测|test|
|枚举|enumerate|

内置对象  
宿主对象  
自定义对象  
自有属性  
继承属性  

创建一个对象  

    var a = new Array();
    var d = new Date();
    var r = new RegExp('js');

    Object.create() // 是一个静态函数。
    var o = Object.create(null)

    // 通过原型继承一个新对象
    function inherit(proto) {
        if (proto == null ) throw TypeError()
        if (Object.create) return Object.create(proto)
        var t = typeof proto
        if (t !== 'object' && t !== 'function') throw TypeError();
        var F = function () {}
        F.prototype = proto
        return new F()
    }

delete 只能删除自在属性，不能删除继承属性。  
严格模式下不能删除全局属性、方法。  

    o.hasOwnPreperty(name) // 是否是自有属性
    o.propertyIsEnumerable(name) // 在自有属性中是否可枚举。继承的属性不可枚举。
    'prop' in o // 为对象中是否有属性prop

    // o继承p中的全部属性、方法
    function extend(o, p) {
        for (prop in p) {
            o[prop] = p[prop]
        }
        return o
    }
![](./image/jsAuthority3.png)  
***

    // o合并p中的全部属性、方法。并集
    function merge(o, p) {
        for (prop in p) {
            if (o.hasOwnPorperty[prop]) continue
            o[prop] = p[prop]
        }
        return o
    }
![](./image/jsAuthority0.png)  
***

    // 从o中减去p中没有的属性、方法。交集。
    function restrict(o, p) {
        for (prop in p) {
            if (!(prop in p)) {
                delete o[prop]
            }
        }
        return o
    }
![](./image/jsAuthority1.png)  
***

    // 从o中减去p中全部的属性、方法。
    function subtract(o, p) {
        for (prop in p) {
            delete o[prop]
        }
        return o
    }
![](./image/jsAuthority2.png)  
***

    // 
    function union(o, p) {
        return extend(extend({}, o), p)
    }

    // 
    function intersection(o, p) {
        return restrict(extend({}, o), p)
    }

    // 
    function keys(o) {
        if (typeof o !== 'object') throw TypeError()
        var temp = []
        for (var prop in p) {
            if (o.hasOwnProperty(prop)) temp.push(porp)
        }
        return temp
    }

    Object.getPrototypeOf(o) // 得到o对象的原型。
    o.constructor.prototype // 得到o对象的原型
    p.isPrototypeOf(o) // p是否是o的原型

存取器  
es5时添加的2个方法。（`getter`, `setter`）  
存取器属性可以继承

|数据属性|存取器属性|
|-|-|
|值，可写性，可枚举性，可配置性|读取，写入，可枚举，可配置|

    Object.getOwnPropertyDescriptor(o, prop) // 返回o对象的prop属性的属性描述。只能操作自有属性。 
    // 设置属性权限
    Object.defineProperty(o, 'prop', {
        value: 1, // 值
        writable: true, // 可写入
        enumerable: false, // 不可枚举
        configurable: true // 可配置
        })

|||
|-|-|
|若对象不可扩展|可以编辑已有的自有属性，不可添加新属性。|
|若存取器属性是不可配置|则不能修改它的可配置性和可枚举性|
|存取器属性是不可配置|不能修改getter/setter方法。不能将它转换为数据属性|
|若数据属性是不可配置的|不能转换为存取属性|
|若数据属性是不可配置的|不能将它的可写性从false改为true,可从true改为false|
|若数据属性是不可配置且不可写的|不能修改它的值，可配置但不可写属性的值是可以修改的|
|||
|||

`__proto__`用来直接查询、设置对象原型。但不推荐使用。因为safari/chrome支持。ie,opera不支持。ff虽然支持，但是限制修改不可扩展对象的原型  

可扩展性  

    Object.preventExtensions(o) // 设置o为不可扩展对象。设置为不可扩展对象后不能再回到可扩展对象。若为不可对象扩展属性。虽不会报错，但没有执行结果。
    Object.isExtensible(o) // o对象是否可扩展
    Object.seal(o) // 封印o对象。不仅不能扩展对象，而且还不能删除它已有的属性。
    Object.isSealed(o) // 检测是否封印。
    Object.freeze(o) // 冻结对象。不可修改。
    Object.isFrozen(o) // 是否冻结

序列化对象  

    JSON.stringify(o)
    JSON.parse(s)

类属性

    function classof(o) {
        if (o === null) return 'Null'
        if (o === undefined) return 'Undefined'
        return Object.prototype.toString.call(o).slice(8, -1)
    }

创建数组  

    var a = []
    var a = [1, 3, 4]
    var a = [1, true, 'string']
    var base = 1024, a = [base, base + 1, base + 2]
    var a = new Array()
    var a = new Array(10)

运行稀疏数组时速度比较慢。

    a.length

    Array.isArray([]) // true 是否是数组对象
    Array.isArray({}) // false

    // 判断一个对象是否是类数组对象。
    function isArrayLick (o) {
        if (o &&
            typyof o === 'object' &&
            isFinite(o.length) && 
            o.length >= 0 && 
            o.length === Math.floor(o.length) &&
            o.length < Math.pow(2, 32)) {
            return true
        } else {
            return false
        }
    }

类数组对象  

    var a = { '0': 'a', '1': 'b', '2': 'c' }
    Array.prototype.join.call(a, '+') // 'a+b+c'
    Array.prototype.slice.call(a, 0) // ['a', 'b', 'c']
    Array.prototype.map.call(a, function (item) {
        return x.toUpperCase()
    }) // ['A', 'B', 'C']

函数

    funciton factorial(x) {
        if (x > 0) return x
        return x * factorial(x-1)
    }

函数命名  
描述性强、简洁

this 非严格模式 全局对象  
this 严格模式 undefined

    a = a || [] // a若不存在就赋值为[]

    arguments[n]
    argument.callee // 当前正在执行的函数
    argument.caller // 访问调用栈

立即执行函数  

    (function (variable) {
        // code
    } ())

闭包  

1. 外部不能直接访问内容定义的方法、属性。  
2. 加载完后执行。  
3. 命名空间与其它闭包隔离。  
4. 在页面生命周期内一直存在。  

    `
    f.call(o, item0, item1, item2)  
    f.apply(o, [item0, item1, item2])
    `

bind  

    function f () {
        // code
    }
    f.bind(o) // 为函数f绑定一个对象并返回一个新的函数

函数式编辑（又叫柯里化）

    var sum = function (x, y) { return x + y }
    var succ = sum.bind(null, 1)
    var a = succ(2)
    console.log(a) // 3

高级函数（操作函数的函数）

动态可继承  
鸭式辩型(具有鸭子的特性的东西都可以当成鸭子对待。)  

    Object.getOwnPropertyNames(o) // 得到o对象中的所有的属性值

集合类

    function Set () {
      this.values = {}
      this.n = 0
      this.add.apply(this, arguments)
    }
    Set.prototype.add = function () {
      for (var i = 0, iLen = arguments.length; i < iLen; i++) {
        var str = Set._v2s(arguments[i])
        if (!this.values.hasOwnProperty(str)) {
          this.values[str] = arguments[i]
        }
      }
      return this
    }
    Set._v2s = function (val) {
      switch (val) {
        case undefined: return 'u'
        case null: return 'n'
        case true: return 't'
        case false: return 'f'
        default: switch(typeof val) {
          case 'number':
            return '#' + val
          case 'string':
            return '"' + val
          default:
            return '@' + objectId(val)
        }
      }
      function objectId(o) {
        var prop = "|**objectid**|"
        console.log(Set._v2s.next)
        if (!o.hasOwnProperty(prop)) {
          o[prop] = Set._v2s.next++
        }
        return o[prop]
      }
    }
    Set._v2s.next = 100
    Set.prototype.remove = function () {
      arguments.forEach(function (item, index, arr) {
        if (this.values.hasOwnProperty(item)) {
          delete this.values[item]
          this.n--
        }
      })
      return this
    }
    Set.prototype.contains = function (value) {
      return this.values.hasOwnProperty(Set._v2s(value))
    }
    Set.prototype.size = function () {
      return this.n
    }
    Set.prototype.foreach = function (f, context) {
      for (var key in this.values) {
        if (this.values.hasOwnProperty(key)) {
          f.call(context, this.values[key])
        }
      }
    }

    var f = function () {
      console.log('f')
    }
    var a = new Set()
    a.add('s')
    a.add(4)
    a.add(5)
    a.add(true)
    a.add(true)
    a.add(false)
    a.add(function () {console.log('string')})
    a.add(f)
    a.add(f)

let  

- 定义变量时和var一样  
- 显示定义变量的作用域。只在表达式内可用。  

解构赋值  
（需要在es6中学习）


迭代器  
（需要在es6中学习）  

生成器  
（需要在es6中学习）  

数组推导  
（需要在es6中学习）  

解构赋值  
（需要在es6中学习）


ECMAScript for XML (E4X)

浏览器兼容性的网站  

|链接|名称|
|-|-|
|https://developer.mozilla.org|mozilla开发者中心|
|https://msdn.microsoft.com|microsoft开发者网络|
|https://develop.apple.com/safari|apple开发都网络里的safari开发中心|
|https://code.google.com/doctype|开发web的一本百科全书|
|https://en.wikipedia.org/wiki/Comparison_of_layout_engines_(HTML_5)|wikipadia文章跟踪html5特性和api在各浏览器里的实现状态|
|https://en.wikipedia.org/wiki/Compparison_of_layout_engines_(Document_Object_Model)|跟踪dom特性的实现状态|
|https://a.deveria.com/caniuse|（何时可用……）跟踪web特性的实现状态|
|https://www.quirksmode.org/dom|各浏览器的dom兼容性表格|
|https://webdevout.net/brower-support|跟踪浏览器开发商对于web标准的实现的站点|

    <!--[if IE 6]>
    // code
    <![endif]-->
    <!--[if lte IE 7]>
    // code
    <![endif]-->
    <!--[if !IE]>
    // code
    <![endif]-->
    <!--[if gte IE 8]>
    // code
    <![endif]-->

js没有权限写入或删除客户计算机上的任意文件或列出任意目录。

|名称|介绍|
|-|-|
|Prototype||
|Dojo||
|YUI||
|Closure||
|GWT||

window对象的setTimeout()方法

    function fn () {
        // code
    }
    var t = setTimeout(fn, 500) // 只有写方法名字，不能写参数。若要写参数可写为
    var t = setTimeout(function () {
        fn2(param)
    }, 500)

window对象的clearTimeout()方法

    clearTimeout(t)

window对象的setInterval()方法

    var t = setInterval(fn, 500)
    var t = setInterval(function () {
        fn2(param)
    }, 500)

window对象的clearTimeout()方法

    clearInterval(t)

location  

    location.hash // 片段。#以后的，即内部链接。  
    location.pathname
    location.search
    location.host
    location.href
    location.port
    location.protocol
    location.replace
    location.assgin

    function urlArgs() {
        var args = {}
        var query = location.search.substring(1)
        var arr = query.split('&')
        for (let i = 0, iLen = arr.length; i < iLen; i++) {
            var pos = arr[i].indexOf('=')
            if (pos === -1) {
                continue
            }
            var key = arr[i].substring(0, pos)
            var value = arr[i].substring(pos + 1)
            args[key] = value
        }
        return args
    }

history  

    history.go(0)
    history.go(2)
    history.go(-2)

navigator(浏览器嗅探)  

    navigator.appName // 浏览器的全称
    navigator.appVersion // 
    navigator.userAgent // 
    navigator.platform // 
    navigator.platform // 
    navigator.onLine // 

    function getBrowser () {
      var s = navigator.userAgent.toLowerCase()
      var match = /(webkit)[\/]([\w.]+)/.exec(s) ||
                  /(opera)(?:.*version)?[\/]([\w.]+)/.exec(s) ||
                  /(msie) ([\w.]+)/.exec(s) ||
                  !/compatible/.test(s) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||
                  []
      return {name: match[1] || '', version: match[2] || '0'}
    }

screen

    screen.availHeight
    screen.availLeft
    screen.availTop
    screen.availWidth
    screen.colorDepth
    screen.height
    screen.width
    screen.pixelDepth
    screen.orientation

对话框































