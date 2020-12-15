#Object

## 三大对象

### 本地对象

1. Object
2. String
3. Array
3. Date
3. Number
3. RegExp
3. Function
3. Boolean
3. Error

### 内置对象

1. Math
2. JSON

### 宿主对象

1. DOM
2. BOM

## Object 的常用方法描述

|方法 | 描述|
|-|-|
|create(proto[, propertiesDescribeObject])   | 创建一个对象，其原型为prototype，同时可添加多个属性。|
|assign(target, ...sources)                  | 把一个或多个源对象的可枚举、自有属性值复制到目标对象中，返回值为目标对象。会改变target对象。|
|defineProperty(obj, prop, descriptor)       | 在一个对象上定义一个新属性或修改一个现有属性，并返回该对象。|
|defineProperties()                          | 在一个对象上定义一个或多个新属性或修改现有属性，并返回该对象。|
|getOwnPropertyDescriptor(obj, prop)         | 获取目标对象上某自有属性的配置特性（属性描述符），返回值为配置对象。|
|getOwnPropertyDescriptors()                 | 获取目标对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。|
|Object.getOwnPropertyNames(obj)                    | 获取目标对象上的全部自有属性名（包括不可枚举属性）组成的数组。|
|getOwnPropertySymbols()                     | 返回目标对象自身的所有 Symbol 属性的数组。|
|Object.getPrototypeOf(obj)                         | 获取指定对象的原型，即目标对象的prototype属性的值。|
|setPrototypeOf(obj, prototype)              | 设置目标对象的原型为另一个对象或null，返回该目标对象。|
|seal(obj)                                   | 密封对象，阻止其修改现有属性的配置特性，即将对象的所有属性的configurable特性设置为false（也就是全部属性都无法重新配置，唯独可以把writable的值由true改为false，即冻结属性），并阻止添加新属性，返回该对象。可以修变已有属性。|
|freeze(obj)                                 | 完全冻结对象，在seal的基础上，属性值也不可以修改，即每个属性的wirtable也被设为false。|
|preventExtensions(obj)                      | 使某一对象不可扩展，也就是不能为其添加新属性。|
|is()                                        | 判断两个值是否是相同的值。同一个引用。|
|isSealed(obj)                               | 用于判断目标对象是否被密封，返回布尔值。|
|isFrozen(obj)                               | 用于判断目标对象是否被冻结，返回布尔值。|
|isExtensible(obj)                           | 用于判断一个对象是否可扩展，即是否可以添加新属性。|
|keys(obj)                                   | 获取目标对象上所有可枚举属性组成的数组。|
|entries()                                   | 返回目标对象可枚举属性的键值对的数组。|
|fromEntries()                               | 把目标键值对列表转换为一个对象。|
|values(obj)                                 | 返回目标对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。|

## Object.prototype对象方法

|toString()                  | 返回当前对象的字符串形式，返回值为String类型。|
|toLocaleString()            | 返回当前对象的"本地化"字符串形式，以便于当前环境的用户辨识和使用，返回值为String类型。|
|valueOf()                   | 返回指定对象的原始值。|
|hasOwnProperty(prop)        | 返回一个布尔值 ，表示某个对象是否含有指定的属性，而且此属性非原型链继承的。|
|isPrototypeOf(obj)          | 返回一个布尔值，表示指定的对象是否在本对象的原型链中。|
|propertyIsEnumberable(prop) | 方法返回一个布尔值，表示指定的属性是否可枚举。|

##Object.assign(target, ...sources)
把一个或多个源对象复制到目标对象。并返回目标对象。简单理解为合并对象。  
`Object.assign()`是浅拷贝。只复制一层，剩下的只复制指针。  
**深拷贝：**  
把对象转为字符串，再把字符串转为对象，再赋给变量。  

	// Deep Clone
	obj1 = { a: 0 , b: { c: 0}};
	let obj3 = JSON.parse(JSON.stringify(obj1));
	obj1.a = 4;
	obj1.b.c = 4;
	console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 0}}

**Object.assign(target, source1[, source2, source3])** // 将多个源对象的可枚举属性添加到目标对象。这是浅复制。  

**Object.keys(obj)** // 返回一个数组，包含对象中的键。  

**Object.values(obj)** // 返回一个数组，包含对象中的值。  

**Object.entries(obj)** // 返回一个数组：由对象的key和对应的valuexe组成的数组组成的数组。

**克隆对象** 

    const clone1 = {
        __proto__: Object.getPrototypeOf(obj),
        ...obj
    }
    const clone2 = Object.assign(
        Object.create(Object.getPrototypeOf(obj)),
        obj
    )

**扩展运算符** 

    let o = { a: 1, b: 2 }
    let n = {...a} // 遍历所有可遍历属性
    n // { a: 1, b: 2 }
    // 合并对象
    let ab = {...a, ...b}

**Object.assign** 的用途。  

    class Point {
        constructor (x, y) {
            Object.assign(this, {x, y})
        }
    }
    Object.assign(SomeClass.prototype, {
        someMethod(arg1, arg2) {
            // code
        },
        anotherMethod(arg1, arg2) {
            // code
        }
    })
    // 合并对象
    const merge = (target, ...source) => Object.assign(target, ...source)
    const merge = (...source) => Object.assign({}, ...source)
    // 为对象指定默认属性
    const options = Object.assign({}, defaults, option) // defauls对象里是默认的属性，option里是设置的属性。

**object.getOwnPropertyDescriptor(obj, prop)** 返回对指定对象的指定属性的描述对象。  
    let o = { foo: 234 }
    Object.getOwnPropertyDescriptor(o, 'foo')

**对象的遍历方法** 

    for (let key in obj) {} // 遍历对象的key
    Object.keys(obj) // 以数组形式返回对象自身的所有可枚举属性（不包含symbol属性）
    Object.getOwnPropertyNames(obj) // 以数组的形式返回对象自身的所有属性（不含symbol属性）
    Object.getOwnPropertySymbols(obj) // 以数组形式返回对象自身的所有Symbol属性
    Object.ownKeys(obj) // 以数组形式返回对象自身的所有属性

**__proto__属性**  

指向取决于对象创建时的实现方式。  

    Object.setPrototypeOf(obj, prototype) // 设置一个对象的prototype属性，返回这个对象
    Object.getPrototypeOf(obj) // 得到对象的prototype属性

**Object.defineProperty(object, prototype, describeObject)** // 为指定的对象的指定的属性设置描述。  

    Object.defineProperty(person, 'name', {
        writable: false, // 不可修改
        confiurable: false, // 不可删除
        value: 'haha'
    })

**set(), get()** // 设置属性和得到属性时的操作。  

    var obj = {
        value: 0,
        set val(v) {
            this.value = v
        },
        get val() {
            return this.value
        }
    } 





## 创建对象  

### 工厂模式  

使用函数封装按指定接口创建对象。  
1. 创建一个对象。  
2. 为这个对象创建一些属性。  
3. 返回这个对象。  

    let person（name, age, job）=> {
        var o = new Object(); // 或Object.create(obj)
        o.name = name
        o.age = age
        o.job = job
        o.sayName= () => {
            console.log(this.name)
        }
        return o
    }
    let p1 = person('a', 23, 'web')

### 构造函数模式  

用来创建特定类型的对象。从而定义对象类型的属性和方法。  
1. 通过new来调用。
2. 没有return语句。  

    // 定义
    Person(name, age) { // 一般首字母大写
        this.name = name;
        this.age = age
        this.sayName = () => {
            console.log(this.name)
        }
    }
    // 使用
    var persion1 = new Person('a', 23)

### 原型模式  

使用function的prototype属性。这个属性指向一个对象。这个对象包含所有实例共享的属性和方法。  

    let Person () => {}
    Person.prototype.name = 'ha'
    Person.prototype.age = 23
    Person.prototype.sayName = () => {
        console.log(this.name)
    }
    var p1 = new Person()

### 结合使用(混合模式)

使用原型模式定义共享属性。使用构造函数模式或工厂模式创建私有属性。  

    let Person (name, age) => {
        this.name = name,
        ...
    }
    Person.prototype = {
        sayName: () => {
            ...
        }
    }
    let p1 = new Person('a', 43)

### 动态原型模式  

    let Person(name, age) => {
        this.name = name
        this.age = age
        if (typeof this.sayName !== 'function') {
            Person.prototype.sayName = () => {...}
        }
    }

### 寄生构造函数模式  

对另一个构造函数（可以是原生数据对象）的扩展。  

    function SpecialArray () {
        var values = new Array() // 先定义一个对象
        values.push.apply(values, arguments)
        values.toPipeString = function () { // 再扩展这个对象(寄生于这个对象才扩展的)
            return this.join('|')
        }
        return values
    }

### 稳妥构造函数模式  

定义一个对象的属性只能通过指定的方式访问，不能随意改动（甚至访问）。相较于构造函数更安全。因此叫稳妥构造函数。  

    function Person (name, age) {
        var o = new Object()
        o.sayName = () => { // 只能通过sayName访问name属性。别的方法不可以访问。
            return name
        }
        return o
    }

## 继承  

将一个原型对象的prototype指针。指向别一个对象。  

    let SuperType = () => {...}
    let SubType = () => {...}
    SubType.prototype = new SuperType()

****  


****  


****  


****  


****  


****  


****  


****  


****  


****  


****  


****  


****  


****  


****  


****  


****  






















