#proxy

在目标对象前设置一个“拦截层”。  

**Proxy(target, handler)**
**get(target, property, proxy){}**
**set(target, property, value, proxy){}**
**apply(target, context, args)**
**has(target, property)** HasProperty
**construct(target, args, newTarget)**
**deleteProperty(target, property)** delete 
**defineProperty(target, property, descriptor)**
**getOwnPropertyDescriptor()** Object.getOwnPropertyDescriptor
**getPrototypeOf(target)**
**isExtensible(target)**
**ownKeys(target)**
**preventExtensions(target)**
**setPrototypeOf(target, prototype)**
**Proxy.revocable(target, handler)**
**this => proxy**

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
