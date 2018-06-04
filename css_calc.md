#css的calc()
##简介
在css中使用calc方法计算四则运行的方法。返回得到值（包括单位）给css属性（eg:width,font-size,padding...）

##定义、使用
width: calc(expression)  
expression: 四则运算表达式。  
每个操作符前后都需要一个空格。  

    width: calc(( 100% - 20px ) * 3 + 50in)

##反思
clac(expression)  

1. 百分比值只能以当前元素的父元素为依据。

min()：min(10% + 20px, 300px) // 用于比较数值的大小并取出最小的那个  
max()：max(10% + 20px, 150px) // 用于比较数值的大小并取出最大的那个  
cycle(): //允许子孙元素使用取值序列中的值循环替换继承而来的值
但是目前这三种函数还没有浏览器支持，
