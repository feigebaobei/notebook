#symbol

保证每个属性的名字都惟一。  
es6时添加的第7种数据类型。（undefined, null, boolean, string, number, object）  
它不是对象，不能添加属性。它类似string.  































-----------------
作为属性名的symbol

    // 设置
    let ms = Symbol()
    let a = {}
    a[ms] = 'str'
    let a = {
        [ms]: 'str'
    }
    let a = {}
    Object.defineProperty(a, ms, {value: 'str'})
    // 得到
    a[ms]

    symbol作为属性名时，属性不会出现在for...in
                                    for...of
                                    Object.keys()
                                    Object.getOwnPropertyNames()
                                    JSON.stringify()
                        不是私有属性。
                        Object.getOwnPropertypeSymbols(obj) 可以得到对象的所有symbol属性名。
## Symbol.for(param) / Symbol.keyFor(symbol)
        |                               |
        V                               V
    检查是否已经存在             返回一个已经登记的Symbol值
    该参数作为名称的Symbol值
    |           |
    Y           N
    |           |
    返回该      新建
    Symbol值

## 11个内置的Symbol(都是对象的属性)
Symbol.hasInstance 指向一个判断实例是否为对象的实例的方法。在使用`ele instanceof Proto`时，在语言内部实际运行的是`Proto[Symbol.hasInstance](ele)`
Symbol.isConcatSpreadable 是否在使用`concat`时展开数组（或类数组）
                            作用于数组时，true时，展开
                                        非true时，不展开
                            作用于类数组时，false时，展开
                                            非false时，不展开
Symbol.species 指向该对象的构造函数。
Symbol.match 指向一个执行`str.match(reg)`时调用的方法。
            String.prototype.match(reg) <=> reg[Symbol.match](str)
Symbol.replace 指向一个执行`String.prototype.replace`时调用的方法。
                Symbol.replace(string, repalceString)
Symbol.search  指向一个执行`String.prototype.search`时调用的方法
                Symbol.search(string, value)
Symbol.split String.prototype.split
            Symbol.split(string, seperate)
Symbol.interator 指向该对象的默认遍历器方法
Symbol.toPrimitive 指向一个转化为原始类型的值时调用的方法。
-----------------
