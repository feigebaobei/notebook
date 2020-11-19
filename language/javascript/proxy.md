#proxy

在目标对象前设置一个“拦截层”。  

**Proxy(target, handler)**
target Object
handler Object
为target设置拦截层handler。

get(target, propKey, receiver) | proxy.foo / proxy['foo']
  target Object 被代理的对象
  propKey String 属性名
  receiver proxy对象
set(target, propKey, value, receiver) | proxy.foo / proxy['foo'] = v
has(target, propKey) | propKey in proxy
deleteProperty(target, propKey) | delete proxy[propKey]
ownKeys(target) | Object.getOwnPropertyNames(proxy) / Object.getOwnPropertySymbols(proxy) / Object.keys(proxy) / for...in
getOwnPropertyDescriptor(target, propKey) | Object.getOwnPropertyDescriptor(proxy, propKey)
defineProperty(target, propKey, descriptor) | Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)
preventExtensions(target) | Object.preventExtensions(proxy)
getPrototypeOf(target) | Object.getPrototypeOf(proxy)
isExtensible(target) | Object.isExtensible(proxy)
setPrototypeOf(target, proto) | Object.setPrototypeOf(proxy, proto)
apply(target, object, args) |  Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
construct(target, args, newTarget) | new ProxyObj()
  newTarget 创建实例对象时的构造函数
Proxy.revocable(target, handler) // 常用于及时收回代理权的地方。
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
