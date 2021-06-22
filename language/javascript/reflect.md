#reflect

1. reflect可以获得语言内部的新方法。  
2. 修改object方法的返回结果。  
3. js的反射机制。
4. 把object的部分命令式语法（delete o.p）改为方法式（Reflect.deleteProperty(o, p)） 
5. 与proxy方法一一对应。可以方便的使用Reflect方法完成默认行为。  
6. Reflect是一个内建的对象，用来提供方法去拦截JavaScript的操作。Reflect不是一个函数对象，所以它是不可构造的，也就是说它不是一个构造器，你不能通过`new`操作符去新建或者将其作为一个函数去调用Reflect对象。Reflect的所有属性和方法都是静态的。
7. reflect是拦截操作，proxy也是拦截操作。二者都有拦截功能。

**Reflect.get(target, property, receiver)**  
target   目标对象
property 指定key
receiver getter方法的this。
查找并返回target对象的name属性，如果没有该属性，则返回undefined

**Reflect.set(target, property, value[, receiver])**  
return boolean

**Reflect.has(target, property)** 对应 `in` 运算符  
return boolean

**Reflect.deleteProperty(target, property)** 删除对象的属性  
return boolean

**Reflect.construct(target, args[, newTarget])**  
target    目标构造函数
args      目标构造函数的参数
newTarget 被新建对象的constructor属性。默认是target。

**Reflect.getPrototypeOf(obj)** 读取对象的`__proto__`属性  

**Reflect.setPrototypeOf(obj, newProto)**
设置目标对象的要原型对象。
return boolean

**Reflect.apply(func, thisArg, args)** 等同于Function.prototype.apply.call(func, thisArg, args)  
func    目标函数
thisArg 目标函数绑定的this
args    目标函数的实参

**Reflect.defineProperty(target, propertyKey, attributes)**
返回boolean

**Reflect.getOwnPropertyDescriptor(target, propertyKey)**
返回目标对象的指定属性的属性描述符，或undefined。

**Reflect.isExtensible(target)**
return boolean

**Reflect.preventExtensions(target)**
return boolean。目标对象是否成功被设置为不可扩展。

**Reflect.ownKeys(target)**
返回一个由目标对象自身的属性键组成的数组。

可以实现观察者模式。

    const queuedObservers = new Set()
      const observe = fn => queuedObservers.add(fn)
      const observable = obj => new Proxy(obj, {
        set (target, property, value, receiver) {
          const result = Reflect.set(target, property, value, receiver)
          queuedObservers.forEach(observer => observer())
          return result
        }
      })

      let person = observable({
        name: 'foo',
        age: 23
      })

      let print = (name, age) => {
        console.log(`hello`)
      }

      observe(print)

      person.name = '2'

需要整理成为类

## 属性排序

Reflect.ownKeys(...)
1. 数字升序
2. 创建时字符串属性
3. 创建时符号属性

## reflect是拦截操作，proxy也是拦截操作。二者都有拦截功能。二者的异同
reflect 操作目标对象的本质时使用。
proxy   操作目标对象的非本质时使用。

## 二者可嵌套


