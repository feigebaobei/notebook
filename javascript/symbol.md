#symbol

它的本意就是标记。而且是惟一的标记。
保证值都惟一。  
es6时添加的第7种数据类型。（undefined, null, boolean, string, number, object）  
它不是对象，不能添加属性。它类似string.  

可以使用参数。即使使用相同的参数也得到的symbol对象也是不相等的。参数的作用大多是一个注释。对symbol对象使用toString()在视觉上更好区分。
symbol可以转化为Boolean/String。
        不能转化为Number.

## 使用

    var s = Symbol()
    var s = Symbol('foo')
    var s = Symbol(2)
    var s = Symbol.for('str')

## 属性
Symbol.prototype.description // 返回一个symbol对象的描述（string类型），即：参数。
Symbol.toStringTag // 若该对象上没有prototype.toString方法，就会出现toStringy方法返回的字符串，来表示该对象的类型。利用Symbol.toStringTag指向定制返回字符串的方法3
Symbol.unscopables // 指定该对象不能被`with`使用的关键字。































