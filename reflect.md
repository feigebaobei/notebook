#reflect

1. reflect可以获得语言内部的新方法。  
2. 修改object方法的返回结果。  
3. 把object的部分命令式语法（delete o.p）改为方法式（Reflect.deleteProperty(o, p)） 
4. 与proxy方法一一对应。可以方便的使用Reflect方法完成默认行为。  



**Reflect.get(target, property, receiver)**  
**Reflect.set(target, property, value, receiver)**  
**Reflect.has(target, property)** 对应 `in` 运算符  
**Reflect.deleteProperty(target, property)** 删除对象的属性  
**Reflect.construct(target, args)**  
**Reflect.getPrototypeOf(obj)** 读取对象的`__proto__`属性  
**Reflect.setPrototypeOf(obj, newProto)**
**Reflect.apply(function, thisArgs, args)** 等同于Function.prototype.apply.call(func, thisArg, args)  
**Reflect.defineProperty(target, propertyKey, attributes)**
**Reflect.getOwnPropertyDescriptor(target, propertyKey)**
**Reflect.isExtensible(target)**
**Reflect.preventExtensions(target)**
**Reflect.ownKeys(target)**
****
****
****
****
****
****


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



