#js中对象的属性的分类及权限

##对象的属性分类  

从属性性质的角度分类可分为“数据属性”和“存取器属性”  

###数据属性

**定义**  
    
    var o = {
        key0: value0
    }

**使用**

    o.key0 // 得到value0
    o.key0 = newValue0 // 设置新值

###存取器属性

**定义**  
    
    var o = {
        temp: 'temp',
        // 只能对方法设置存取器
        get key0 () {
            return 'value0'
        },
        set key0 (newValue) {
            this.temp = 'newTemp'
        }
    }

**使用**

    o.key0 // 得到value0
    o.key0 = newValue0 // 设置新值

发现这两个属性在定义时有区别，在使用时没有区别。  

##属性的权限

**设置**  

    Object.defineProperty(o, 'key0', {
        value: 'value0', // 值
        writable: true, // 可写入
        enumerable: true, // 可枚举
        configurable: true // 可配置
    })

在设置属性权限为`false`时是最后一次修改属性值的时候。设置属性可写权限为`false`后就不能再修改了。  

##操作对象的权限

##扩展

设置不可扩展后就不能再扩展该对象的属性了。  

    Object.isExtensible(o) // 得到对象o是否可扩展
    Object.preventExtensions(o) // 设置对象o为不可扩展对象，且不可逆。再扩展o对象时不会报错但是没有执行结果。

##封印

设置该对象的所有属性可修改不可删除不可添加。  

    Object.isSealed(o) // 得到o对象是否封印。
    Object.seal(o) // 封印该对象，且不可逆。

##冻结

设置该对象的所有属性不可添加不可修改不可删除。

    Object.isFrozen(o) // 得到o对象是否冻结。
    Object.freeze(o) // 设置o对象冻结，且不可逆。

##小结

||扩展|封印|冻结|是否可逆|
|-|-|-|-|-|
|添加|X|X|X|X|
|修改|Y|Y|X|X|
|删除|Y|X|X|X|

***
2018/06/15 by stone
