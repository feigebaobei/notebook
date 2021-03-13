#number

## 语法

```
new Number(v)
var a = new Number('123')
var b = Number('23')
a instanceof Number // true
b instanceof Number // false
```
## 属性

|都是静态的|||||
|-|-|-|-|-|
|Number.EPSILON|2个可表示数之间的最小间隔| 2.220446049250313e-16|||
|Number.MAX_SAFE_INTEGER|最大安全数|2^53 - 1|||
|Number.MAX_VALUE|最大正数||||
|Number.MIN_SAFE_INTEGER|最小安全数|-(2^53 - 1)|||
|Number.MIN_VALUE|最小正数||||
|Number.NaN|||||
|Number.NEGATIVE_INFINITY|负无穷大||||
|Number.POSITIVE_INFINITY||正无穷大|||
|Number.prototype|||||

## 方法

|都是静态的|||||
|-|-|-|-|-|
|Number.inNaN()|是不是NaN||||
|Number.isFinite()|是否是有限数||||
|Number.isInteger()|是否是整数||||
|Number.inSafeInteger()|是否是安全数|(-(2^53 - 1), 2^53 - 1)|||
|Number.toInteger()|把参数转换为整数。兜底解决方案是无穷大数。||||
|Number.parseFloat()|把参数转化为小数。||||
|Number.parseInt()|把参数转化为整数。|向下取整。|||

#Math

**Math.trunc()** 除去一个数的小数部分，返回整数部分。  

    Math.trunc(2.6) // 2
    Math.trunc(-2.6) // -2

**Math.sign()** 判断指定的数到底是正数、负数、还是零。
    
    Math.sign(3.7) // 1
    Math.sign(-3.7) // -1
    Math.sign(0) // 0
    Math.sign(-0) // -0

**Math.cbrt(number)** 计算一个数的立方根。  

    Math.cbrt(8) // 2

**Math.clz32()**  
**Math.imul()**  
**Math.fround()**  

**Math.hypot()** 返回所有参数的平方和的平方根。  

    Math.hypot(3, 4) // 5 3*3+4*4的平方根 = 5

**Math.expm1()**  
**Math.log1p()**  

**Math.log10(n)** 得到以10为底n的对数。  
**Math.log2(n)** 得到以2为底n的对数。  
**Math.sinh(n)**  
**Math.cosh(n)**  
**Math.tanh(n)**  
**Math.asinh(n)**  
**Math.acosh(n)**  
**Math.atanh(n)**  

**Math.singbit(n)** 判断一个数的符号是否被设置。  

**指数运算符(\**)**  
它与Math.pow()的实现不同。  
    
    2 ** 2 // 4
    2 ** 3 // 8


# BigInt

















