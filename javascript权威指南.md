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






































