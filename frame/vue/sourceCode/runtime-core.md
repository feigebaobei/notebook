# packages/runtime-core
用于拼写/创建自定义render。不能用于应用。
从名字判断。该包是核心内容。

## packages/runtime-core/src/index.ts
只是一个输出口。里面好多方法是兄弟文件/兄弟包中获得后输出的。
// 好多子包都这么做。

## packages/runtime-core/src/apiLifecycle.ts
injectHook(type: LifecycleHooks, hook: Function & {__weh?: Function}, target, ComponentInternalInstance | null = currentInstance, prepend: boolean = false): Function | undefined
为指定target设置指定类型的hook。
定义onBeforeMount等钩子时使用injectHook创建钩子。

## packages/runtime-core/src/apiComputed.ts
使用了重载。

## packages/runtime-core/src/component.ts
recordInstanceBoundEffect
记录从setup()到unmount，组件的影响。

## packages/runtime-core/src/apiWatch.ts
doWatch(source: WatchSource | WatchSource[] | WatchEffect | object, cb: WatchCallback | null, {immediate, deep, flush, onTrack, onTrigger}: WatchOptions = EMPTY_OBJ, instance = currentInstance): WatchStopHandle
返回一个包括stop方法的对象。（还可以再写细一点）
watch(...)使用了一堆重载。内部调用doWatch()
// 若要输出重载的方法，则需要对每个方法使用export。
instanceWatch
调用doWatch
watchEffect
调用doWatch

## packages/runtime-core/src/apiInject.ts
// export interface InjectionKey<T> extends Symbol {}
// 这样扩展了Symbol。
// 同样可以扩展Array/Set/Map
包括了provide/inject方法
provide(key, value)
// TS doesn't allow symbol as index type
把最近的祖先元素的provide与key/value结合为一个对象。不返回东西。
inject
使用了重载
设置默认值后返回provide的对象。

## packages/runtime-core/src/scheduler.ts
模块内定义了一堆变量。在操作队列时使用。变量如下：
let isFlushing = false                                    // 是否正在冲洗
let isFlushPending = false                                // 是否正在等待冲洗
const queue: SchedulerJob[] = []                          // 队列
let flushIndex = 0                                        // 冲洗的下标
const pendingPreFlushCbs: SchedulerCb[] = []              // 
let activePreFlushCbs: SchedulerCb[] | null = null
let preFlushIndex = 0
const pendingPostFlushCbs: SchedulerCb[] = []
let activePostFlushCbs: SchedulerCb[] | null = null
let postFlushIndex = 0
const resolvedPromise: Promise<any> = Promise.resolve()
let currentFlushPromise: Promise<void> | null = null       // 当前被冲洗的promise
const RECURSION_LIMIT = 100


// export type SchedulerCbs = SchedulerCb | SchedulerCb[]
// 加s后可以表示复数。
nextTick(this, [fn])
处理被冲洗的promise。
返回一个promise对象，内部使用fn作为回调。
把fn放在微任务队列里。
// p.then(fn.bind(this))
// 改变fn的上下文环境后作为p.then的回调方法。
queueJob(job)
把job插入队首或队尾。再冲洗队列。
currentFlushPromise = resolvedPromise.then(flushJobs)
invalidateJob(job)
在队列中移除job。
queueFlush()
在不是正在冲洗且不是正在等待冲洗时，标记为正在冲洗，
flushJobs

## packages/runtime-core/src/apiDefineComponent.ts
defineComponent(...)
模块内都是该函数的重载。
返回isFunction(options) ? { setup: options, name: options.name } : options
options不是

## packages/runtime-core/src/apiAsyncComponent.ts
isAsyncWrapper
返回是否异步加载
defineAsyncComponent
内部的load：使用promise返回异步加载到的组件。
使用defineComponent方法处理组件。

## packages/runtime-core/src/component.ts
createComponentInstance
创建并返回一个instance对象。
validateComponentName
是否是内置的标签名/或原生标签名。
setupComponent
……
setupStatefulComponent
……
createSetupContext
返回setup方法的context对象：{attrs, slots, emit, expose}
getComponentName
返回组件名字。
formatComponentName
格式化组件名字。

## packages/runtime-core/src/componentOptions.ts
// export interface ComponentCustomOptions {}
// 定义一个空interface
mergeOptions
合并到to上后返回to。
resolveMergedOptions
调用mergeOptions后返回其结果
createWatcher
调用watch

## packages/runtime-core/src/vnode.ts
type VNodeProps
isVNode
是否是vnode对象。
createVNode
返回_createVNode生成的vnode
_createVNode
返回vnode对象
cloneVNode
返回复制后的vnode
createTextVNode
使用createVNode生成文本VNode
createStaticVNode
生成静态VNode // 可能此vnode不会改变。
createCommentVNode
生成注释vnode
normalizeVNode
标准化vnode

## packages/runtime-core/src/componentPublicInstance.ts
// 先输出type
// 先输出interface
// 再输出变量/对象。
// 再输出方法。
type ComponentPublicInstance
proxy暴露的属性。在渲染模板时使用，代表this。

## packages/runtime-core/src/apiSetupHelpers.ts
defineProps
提示警告
defineEmit
提示警告
useContext
……

## packages/runtime-core/src/h.ts
h是createVNode的友好版本。它允许省略props。用于在render方法中使用。
1. h是单态的。避免多次调用。
2. 允许为优化指定patchFlag
全文都是h的重载。
都是调用用createVNode.
h不是createVNode的别名。是对createVNoder的封装。

## packages/runtime-core/src/components/Teleport.ts
isTeleport
是否是teleport
isTargetSVG
是否是SVGElement
resolveTarget
……
TeleportImpl
是一个对象：{
    __isTeleport
    porcess()
    remove()
    move: moveTeleport
    hydrate: hydrateTeleport
}

Teleport
就是TeleportIml

## packages/runtime-core/src/renderer.ts
……

## packages/runtime-core/src/components/Suspense.ts
suspense的相关内容。
createSuspenseBoundary
创建一个SuspenseBoundary类型的对象，并返回。
patchSuspense
……
setActiveBranch
设置branch
queueEffectWithSuspense

## packages/runtime-core/src/components/KeepAlive.ts
KeepAliveImpl是一个ComponentOptions对象。

## packages/runtime-core/src/components/BaseTransition.ts
BaseTransitionImpl是一个ComponentOptions对象。
resolveTransitionHooks
返回一个TransitionHooks类型的对象。
getTransitionRawChildren
返回包括所有children对象的数组。

## packages/runtime-core/src/componentRenderUtil.ts
shouldUpdateComponent
是否应该更新节点

## packages/runtime-core/src/directives.ts
withDirectives
为指定的vnode添加指定的指令

## packages/runtime-core/src/compat/customDirective.ts
……

## packages/runtime-core/src/compat/compatConfig.ts
兼容相关的配置/方法。
DeprecationTypes
已经被删除的type
decrecationData
DeprecationType相对的warn
toggleDeprecationWarning
切换是否警告
warnDeprecation
输出警告
configureCompat
检查兼容性
valideteCompatConfig
是否兼容
getCompatConfigForKey
返回兼容的key
isCompatEnabled
是否兼容
assertCompatEnabled
是否兼容
softAssertCompatEnabled
是否兼容
checkCompatEnabled
是否兼容

## packages/runtime-core/src/helpers/useSsrContext.ts
useSSRContext
是否支持ssr

## packages/runtime-core/src/warning.ts
formatProp
若prop的格式不对，则警告。

## packages/runtime-core/src/errorHandling.ts
callWithErrorHandling
兼容错误的调用。
可以使用修饰方法来实现同样的功能。
callWithAsyncErrorHandling
在callWithErrorHandling的基础上兼容错误的调用。
handleError
处理错误
logError
输出错误

## packages/runtime-core/src/helpers/resolveAssets.ts
resolveAsset
使用了重载。

## packages/runtime-core/src/customFormatter.ts
initCustomFormatter
……

## packages/runtime-core/src/devtools.ts
createDevtoolsComponentHook
返回一个方法。该方法触发事件。

## packages/runtime-core/src/apiCreateApp.ts
createAppContext
返回一个AppContext类型的对象
createAppAPI
返回createApp方法
createApp
返回一个App类型的对象。
_uid递增。使用存取描述符修饰config。use方法安装插件后返回app。mixin方法中使用push添加，返回app。component方法返回app。directive方法添加指令后返回app。mount方法使用render方法添加vnode。unmount方法使用render方法删除添加null，即删除。provide方法为context.provides对象添加指定的值。

## packages/runtime-core/src/componentEmit.ts
isEmitListener
是否有指定的事件触发者
normalizeEmitsOptions
……
emit
……

## packages/runtime-core/src/hydration.ts
createHydrationFunctions
返回[hydrate, hydrateNode]

## packages/runtime-core/src/componentSlots.ts
内置的key使用_开头。或$stable
isInternalKey
是否是内置key
normalizeSlotValue
normalizeObjectSlots
normalixeVNodeSlots
initslots
updateSlots

## packages/runtime-core/src/componentProps.ts
getInvalidTypeMessage
返回非法type对应的消息。
isSimpleType
是否是简单类型。
assertType
断言类型
validateProp
验证prop的类型。
无返回
validateProps
验证所有的prop
isSameType
类型是否相同。
getType
得到参数的类型。
getTypeIndex
得到type的下标。
validatePropName
通过PropName，返回是否通过。
normalizePropsOptions
规范化props的选项。
resolvePropValue
解决prop的值。处理为默认值或boolean。
setFullProps
为所有prop设置值
updateProps
经过一堆判断后，决定是否使用trigger方法。
initProps
初始化props
调用setFullProps。
若无值，则设置为undefined
验证值。
设置props/attrs。

## packages/runtime-core/src/hmr.ts
map是Map类型的记录的保存器。
hmrDirtyComponents是Set类型的需要hmr的组件的保存器。
createRecord
在保存器中创建一条记录。
registerHMR
为记录添加实例。
rerender
record.component.render = newRender
再做好标记。
reload
在hmrDirtyComponent中保存指定组件。
再执行reload方法。

## packages/runtime-core/src/hmrcomponentRenderContext.ts
2个变量currentRenderingInstance/currentScopeId。
pushScopeId/popScopeId
设置/置空currentScopeId
setCurrentRenderingInstance
设置urrentRenderingInstance

## packages/runtime-core/src/helpers/renderList.ts
renderList
使用了重载。
使用renderItem渲染每一项后再组成数组后返回。

## packages/runtime-core/src/helpers/toHandler.ts
设置handler

## packages/runtime-core/src/helpers/renderSlot.ts
ensureValideVNode
确保vnode是合法的。
renderSlot
……

## packages/runtime-core/src/helpers/createSlots.ts
整理slot.name/slot.fn

## packages/runtime-core/src/compat/apiSetupHelperscomp.ts
defineReactiveSimple
简单的reactive。使用Object.defineProperty。
defineReactive
若为数组，则改变this。
否则调用defineReactiveSimple
methodsToPatch
操作数组的7种方法。
installCompatMount
为组件兼容mount/destroy
applySingletonPrototype
……
installLegacyAPIs
Object.defineProperties(app, ...)
installAppCompatProperties
方法内调用了几个本模块的方法。
createCompatVue
创建一个vue对象，并返回。

## packages/runtime-core/src/compat/globalConfig.ts
mergeHook
把from/to使用set合并。
mergeObjectOptions
上个方法时合并array的。这个方法是合并object的。
