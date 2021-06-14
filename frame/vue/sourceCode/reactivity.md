# packages/reactivity
## overview

### usage note
此包是面向用户的内置的global/esm的渲染器，如`@vue/runtime-dom`。也可以单独使用。独立构建时不应该与面向用户的预绑定构建一起使用，因为它们有不同的保存形式。面向用户的渲染器应该再次输出所有api.

### credits
使用了当下优先的js生态：
- [Meteor Tracker](https://docs.meteor.com/api/tracker.html)
- [nx-js/observer-util](https://github.com/nx-js/observer-util)
- [salesforce/observable-membrane](https://github.com/salesforce/observable-membrane)

### caveats
内置对象不是观察`array/map/weakmap/set/weakset`。

## reactivity/src/index.ts
从兄弟文件中引入并输出。

## reactivity/src/operations.ts
定义了2个enum。

## reactivity/src/effect.ts
effect是什么？
createReactiveEffect
返回创建的ReactiveEffect类型的effect对象。
effect是一个方法。此方法上扩展了一些属性。function也是object，所以可以为function设置属性。
isEffect
return fn && fn._isEffect === true
effect
调用createReactiveEffect创建effect后再输出。
cleanup
effect.deps.length = 0
stop
effect.options.onStop()
effect.active = false
track
在targetMap中添加target，在depsMap中添加key。执行activeEffect.options.onTrack()。
trigger
触发depsMap中的所有dep。

## reactivity/src/ref.ts
ref的本质是调用reactive.
class RefImpl
`this._value = _shallow ? _rawValue : convert(_rawValue)`
get value() {...
    return this._value}
set
若有改变，则调用trigger。
createRef
返回RefImpl的实例。
ref/shallowRef
都是调用reacteRef
unref
返回原本的值。
proxyRefs
若是响应式对象则返回参数，否则返回Proxy对象。
class CustomRefImpl
自定义ref实现
customRef
返回CustomRefImpl实例
class ObjectRefImpl
为指定object的指定key设置存取方法。
toRef
`return isRef(objcet[key]) ? object[key] : (new ObjectRefImpl(object, key))`
toRefs
返回一个由toRef方法处理后的数据组成的对象。
object的每个属性都经过toRef处理。

## reactivity/src/reactive.ts
响应式对应是由proxy处理的。
reactiveMap
shallowReactiveMap
readonlyMap
shallowReadonlyMap
都是WeatMap对象
targetTypeMap
返回参数的type值。此值由enum TargetType结合。
getTargetType
调用targetTypeMap
createReactiveObject
创建一个响应式对象。
它做了好多兼容的东西。先判断是否是响应式对象。若是，则返回该对象。否则使用Proxy创建后返回。
vue中有好多方法都像这样做了兼容。
reactive
参数是深度调用proxy。
调用createReactiveObject方法。
shallowReactive
调用createReactiveObject方法。
readonly
调用createReactiveObject方法。返回一个只读对象。
shallowReadonly
调用createReactiveObject方法。返回一个浅只读对象。
isReactive
isReadonly
isProxy
toRaw
markRaw
def(value, ReactiveFlags.SKIP, true)

## reactivity/src/baseHandlers.ts
createGetter
创建一个getter.
返回一个get方法。此方法返回一个Reflect.get处理后的结果。
createSetter
创建一个setter。
返回一个set方法。此方法返回一个Reflect.set处理后的结果。
deleteProperty
使用Reflect.deleteProperty()。执行target()
has
执行target
执行Reflect.has()
ownKeys
执行target
执行Reflect.onwKey()
readonlyHandlers
可读/不可写/不可删除
shallowReactiveHandlers
……
shallowReadonlyHandlers
……

## reactivity/src/collectionHandlers.ts
toReactive
若是对象，则返回reactive，否则返回参数。
toReadonly
若是对象，则返回readonly(value)，否则返回参数。
getProto
Reflect.getPrototypeOf(v)
get
……
has
return Reflect.get(target, 'size', target)
add
trigger(target, TriggerOpTypes.ADD, value, value)
set
执行trigger
checkIdentityKeys
key是否正确。
deleteEntry
clear
都是对对象的操作。
createForEach
创建一个forEach
createIterableMethod
返回一个方法。此方法返回一个对象：{next(), [Symbol.iterator]()}
createReadonlyMethod
返回一个方法。
……
mutableInstrumentations
shallowInstrumentations
readonlyInstrumentations
shallowReadonlyInstrumentations
都是把一些相关的方法整理到一个对象中。

## reactivity/src/computed.ts
class ComputedRefImpl
……
computed
封装为ComputedRefImpl的实例
