# async

async函数对generator函数的改进：

1. 为generator函数提供执行器。
2. 更好的语义
3. 更广的适用。（await 后面可以是promise/原始类型。当是原始类型时会使用promise.resolved）
4. 返回promise对象。

执行到async函数时会立即返回一个promise对象。当await后面的异步方法执行完后继续执行。

## uasge

```
async function timeout (ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}
async function asyncPrint(value, ms) {
    await timeout(ms)
    console.log(value)
}
asyncPrint('str', 2000)
```

### async函数的多种形式

```
// define
async function foo () {}
const foo = async function () {}
const foo = async () => {}
let obj = {
    foo: async () => {}
}
class Cl {
    async foo () {}
}
// use
foo().then().catch()
obj.foo().then().catch()
```

## 处理错误

因async方法返回的是promise对象，所以可以使用then/catch方法处理错误。
async方法内可以写多个await。若有一个await后的promise出错，则该await后的代码不执行。为了执行下去可以为每个await后的promise添加then/catch.
await后面的异步操作出错等同于async函数返回的promise对象被reject.
可以把所有的await放在try...catch里
```
async function main () {
    try {
        await first()
        await second()
        await third()
        await four()
    } catch (e) {
        ...
    }
}
```

利用这种方法可以扩展出一个处理失败后再次尝试的功能

```
async function main () {
    let index = 0
    while (index < 3) {
        try {
            await first()
            break // 若出错会进行catch,不会执行这里.
        } catch (e) {
        }
        index++
    }
}
```

## 使用技巧

1. 为处理每个await后的promise可能出现的reject.可以把每个await放在try...catch里.
2. 当多个await后的promise没有继发关系,可以使用同时触发的方法节省代码执行时间.`let foo = await getFoo();let bar = await getBar();`

```
let fooPromise = getFoo()
let barPromise = getbar()
let foo = await fooPromise() // 继发
let bar = await barPromise()
function dbFuc(db) {
    let docs = [{}, {}, {}]
    for (let doc of docs) { // 继发
        await db.post(doc)
    }
}
async function dbFuc(db) {
    let docs = [{}, {}, {}]
    let promises = docs.map((doc) => db.post(doc)) // 并发
    let res = await Promise.all(promises)
}
// or
async function dbFuc(db) {
    let docs = [{}, {}, {}]
    let promises = docs.map((doc) => db.post(doc)) // 并发
    let res = []
    for (let p of promises){
        res.push(await p)
    }
}
```

3. async函数保留运行堆栈。