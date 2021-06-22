## tapable

为插件暴露的钩子函数库。

```
const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require('tapable')
```
### install

`npm i -S tapabel`

### usage

所有的钩子函数构造者都可以接收一个可选参数。
可选参数是一个string组成的array.

```
const hook = new SyncHook(['arg1', 'arg2', ...])

// 若在个类中封装所有的钩子构造者的实例，则更好。
class Car {
  constructor () {
    this.hooks = {
      accelerate: new SyncHook(['newSpeed']),
      brake: new SyncHook(),
      calculateRoutes: new AsyncParallelHook(['source', 'target', 'resourceList']),
    }
  }
}
// use
const myCar = new Car()
myCar.hooks.brake.tap('WarningLampPlugin', () => warningLamp.on())
// 需要传入一个name，以区别plugin/reason
```

同步钩子，只能使用tap添加插件。异步钩子，可以使用异步插件。

钩子会使用您指定的插件的最有效的方法去编译。它会依赖以下东西生成代码：
1. 若干个已注册插件。
2. 若干种已注册插件。
3. 使用方式
4. 参数数量
5. 是否打断

### hook types

每一个钩子都会采用若干方法。

- basic hook. 名子中没有'Waterfall', 'Bail', 'Loop'.
- Waterfall 把上一个方法的结果传入下一个方法的参数中。
- Bail 允许更早退出。当任一方法返回任一结果。
- Loop 当一个循环的钩子中返回非undefined时，钩子会重新从第一个插件开始。
- Sync 同步执行
- AsyncSeries 可以执行一批文法，基于promise.
- AsyncParallel

### interception

所有方法都可以添加interception api.
```
myCar.hooks.calculateRoutes.intercept({
  call: (source, target, routesList) => {
    console.log('...')
  },
  register: (tapInfo) => {
    console.log('...')
    return tapInfo
  }
})
```

- call(...args) => void
- tap(tap) => vlid
- loop(...args) => void
- register(tap) => tap

### context

插件在intercept时可以添加context属性。该属性可以接收任意类型数据，它会要传入下一个插件或interceptor.

### HookMap

钩子们的映射助手。

```
const keyedHook = new HookMap(key => new SyncHook(['arg']))
```

### Hook/HookMap interface

Public:
```
interface Hook {
  tap: (name: string | Tap, fn: (context?, ...args) => Result) => void,
  tapAsync: (name: string | Tap, fn: (context?, ...args, callback: (err, result: Result) => void) => void) => void,
  tapPromise: (name: string | Tap, fn: (context?, ...args) => Promise<Result>) => void,
  intercept: (interceptor: HookInterceptor) => void
}

interface HookInterceptor {
  call: (context?, ...args) => void,
  loop: (context?, ...args) => void,
  tap: (context?, tap: Tap) => void,
  register: (tap: Tap) => Tap,
  context: boolean
}

interface HookMap {
  for: (key: any) => Hook,
  intercept: (interceptor: HookMapInterceptor) => void
}

interface HookMapInterceptor {
  factory: (key: any, hook: Hook) => Hook
}

interface Tap {
  name: string,
  type: string
  fn: Function,
  stage: number,
  context: boolean,
  before?: string | Array
}
```
Protected (only for the class containing the hook):
```
interface Hook {
  isUsed: () => boolean,
  call: (...args) => Result,
  promise: (...args) => Promise<Result>,
  callAsync: (...args, callback: (err, result: Result) => void) => void,
}

interface HookMap {
  get: (key: any) => Hook | undefined,
  for: (key: any) => Hook
}
```

### MultiHook

它是一个类钩子类助手。它可以tap别的multiple hooks

```
const { MultiHook } = require("tapable");
this.hooks.allHooks = new MultiHook([this.hooks.hookA, this.hooks.hookB]);
```
