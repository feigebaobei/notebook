#Object
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

**Object.entries(obj)** // 返回一个数组，  包含对象中的键组成的数组，和对象中的值组成的数组。  

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

### 稳妥构造函数模式  

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






















