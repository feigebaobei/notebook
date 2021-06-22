#proxy

在目标对象前设置一个“拦截层”。  

## Proxy(target, handler)
target Object
handler Object
为target设置拦截层handler。

handler.get(target, propKey, receiver) | proxy.foo / proxy['foo']
    target   Object    被代理的对象
    propKey  String    属性名
    receiver proxy对象
    用于拦截get操作

handler.set(target, propKey, value[, receiver]) | proxy.foo / proxy['foo'] = v
    target
    propkey
    value
    receiver
    return boolean
    拦截proxy[foo] = bar / proxy.foo = bar / Object.create(proxy)[foo] = bar / Reflect.set()

handler.has(target, propKey) | propKey in proxy
    target
    propKey
    拦截in/Reflect.has()/with

handler.deleteProperty(target, propKey) | delete proxy[propKey]
handler.ownKeys(target) | Object.getOwnPropertyNames(proxy) / handler.Object.getOwnPropertySymbols(proxy) / Object.keys(proxy) / for...in
    target
    return iterable对象
    拦截Reflect.ownKeys()/Object.keys()/object.getOwnPropertySymbols()/object.getOwnPropertyNames()
    约定：返回一个数组。string[]/symbol[]

handler.getOwnPropertyDescriptor(target, propKey) | Object.getOwnPropertyDescriptor(proxy, propKey)
    target 目标对象
    prop   属性
    拦截Object.getOwnPropertyDescriptor() / Reflect.getOwnPropertyDescriptor()
    return obj/undefined

handler.defineProperty(target, propKey, descriptor) | Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)
    target     目标对象
    property   属性
    descriptor 属性描述符
    用于拦截Object.defineProperty()/Reflect.getPrototypeOf()/__proto__/Object.prototype.isPrototypeOf()/instanceof

handler.preventExtensions(target) | Object.preventExtensions(proxy)
    target
    return boolean
    拦截Object.preventExtenstions() / Reflect.preventExtentions()
    约定：若目标对象是可扩展的。则只能返回false。

handler.getPrototypeOf(target) | Object.getPrototypeOf(proxy)
    target 目标对象
    拦截Object。getPrototypeOf()

handler.isExtensible(target) | Object.isExtensible(proxy)
    target
    return boolean
    拦截Object.isExtensible()/Reflect.isExtensible()

handler.setPrototypeOf(target, proto) | Object.setPrototypeOf(proxy, proto)
    target
    proto   原型对象
    拦截Object.setPrototypeOf()

handler.apply(target, thisArg, args) |  Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(thisArg, ...args)、proxy.apply(...)。
    target     目标对象是函数
    thisArg    目标对象的this
    args       目标函数的实参
    用于拦截函数的调用

handler.construct(target, args, newTarget) | new ProxyObj()
    target    目标对象是函数
    args      函数的参数
    newTarget 创建实例对象时的构造函数
必须返回一个对象。
    用于拦截new操作
    let p = new Proxy(function () {...}, {
        construct(target, args) {
            return new target(...args)
        }
    })
    new p(2)

## Proxy.revocable(target, handler) // 常用于及时收回代理权的地方。
返回{proxy, revoke}
    proxy实例， 方法
  revoke() // 取消proxy实例。
this => proxy代理

可以用来模拟从服务请求数据。

    var pipe = function () {
        return function (value) {
            var funcStack = []
            var oproxy = new Proxy({}, {
                get (pipeObject, fnName) {
                    if (fnName === 'get') {
                        funcStack.reduce(function (val, fn) {
                            return fn(val)
                        }, value)
                    }
                    funcStack.push(window[fnName])
                    return oproxy
                }
            })
        }
    }

    const handler = {
        get (target, property, receiver) {
            invariant(key, 'get')
            return target[key]
        },
        set (target, property, value, receiver) {
            invariant(key, 'set')
            target[property] = value
            return true
        }
    }
    function invariant (key, action) {
        if (key[0] === '_') {
            throw new Error('error by lixd')
        }
    }

## 代理局限性

```
pobj + ''
pobj == obj
pobj === obj
typeof(pobj)
string(pobj)
```

## 使用代理

```
// 代理在前
let pobj = new Proxy(obj, handler)
// 代理在后
let catchall = new Proxy({}, handler)
Object.setPrototype(obj, catchall)    // 最后的保障
// 伪原型环
let hander = {
    get(target, key, context) {
        if (Reflect.has(target, key)) {
            return Reflect.get(target, key, context)
        } else {
            return Reflect.get(target[Symbol.for("[[Prototype]]")], key, context)
        }
    }
}
let pobj1 = new Proxy({...}, handler)
let pobj2 = Object.assign(Object.create(pobj1), {...})
// 伪多继承
let handler = {
    get(target, key, context) {
        if (Reflect.has(target, key)) {
            return Reflect.get(target, key, context)
        } else {
            for (let p of target[Symbol.for("[[Prototype]]")]) {
                if (Reflect.get(p, key)) {
                    return Reflect.get(p, key, context)
                }
            }
        }
    }
}
let pobj = new Proxy({...}, handler)
pobj[Symbol.for("[[Prototype]]")] = [obj1, obj2]
```