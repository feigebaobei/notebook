#number
  
1. 在js中，整数和浮点数使用同样的储存方法。  

**Number.isFinite(number)** 判断number是否是有限数。  

    Number.isFinite(2.3) // true

**Number.isNaN(variable)** 判断number是否是NaN.

    Number.isNaN(123) // false
    Number.isNaN(NaN) // true

**Number.parseInt(number)** 向下取整。  

    Number.parseInt(2.6) // 2

**Number.parseFloat(number)** 得到浮点型数值。

    Number.parseFloat('2.4') // 2.4

**Number.isInteger(number)** 判断一个数是否是整数。

    Number.isInteger(2.3) // false

**Number.EPSILON** 极小的常量。  

    Number.EPSILON // 2.220446049250313e-16

**Number.isSafeInteger()** 是否在-2e53到2e53之间。  

    Number.isSafeInteger(Math.pow(2, 53) - 1) // true
    Number.isSafeInteger(Math.pow(2, 53)) // false

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



















