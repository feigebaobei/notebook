# overview
- `async`是一个提供直接了当的有用的异步方法的工具。起初是为node.js开发的。后来也支持在browser中使用。esm/mjs的版本都在本包中。可以自动兼容`webpack`/`rollup`。
- 若只使用esm，则请使用`async-es`。
- 该包是一个综合了很多方法的包。约70种方法。
- 所有方法遵守node.js的约定。异步方法的最后一个参数是回调函数。该回调函数的第一个参数是error。回调方法只执行一次。


# install
`npm i async`

# usage
```
var async = require('async')
async.mapLimit(urls, 5, async function (url) {
    const res = await fetch(url)
    return res.body
}, (err, res) => {
    if (err) throw err
    console.log(res)
})
```

# title
## common pitfalls
若你使用该包是提示这样的错误：`RangeError: Maximum call stack size exceeded.`或其他的栈溢出问题。你可以使用同步迭代。意思是在同一个event loop中调用同一个不使用i/o的回调方法。当执行很多交回调方法时很快会栈溢出。若你遭到此问题，只需要使用`async.setImmediate`在下一个event loop后开始一个新栈。
使用以下方式再现问题：
```
async.eachSeries(hugeArray, function iteratee(item, cb) => {
    if (inCache(item)) {
        cb(null, cache[item])
    } else {
        doSomeIO(item, cb)
    }
}, function done() {
        // ...
})
```
修改为
```
async.eachSeries(hugeArray, function iterateee(item, cb) {
    if (inCache(item)) {
        async.setImmediate(function () {
            cb(null, cache[item])
        })
    } else {...}
})
```

## multiple callbacks
## using es2017 async functions
## binding a context to an iteratee
## subtle memory leaks
## mutating collections while processing them
## 多种情况下的使用方法
```
### commonjs
npm i async
var async = require('async')
var waterfall = require('async/waterfall')

### browser
<script type="text/javascript" src="async.js"></script>
<script type="text/javascript">
    async.map(data, asyncProcess, function (e, r) {
        ...
    })
</script>

### esm
npm i async-es
import waterfall from 'async-es/waterfall'

### ts
npm i -D @types/async
// tsconfig.json
{
    "compilerOptions": {
        "target": "es2017"
    }
}
### cm
```
## other libraries
- limiter
- neo-async
- co-async
- promise-async

# api
作者把该包中的方法分为三类：集合/控制流/工具

## collections
处理集合数据的方法集合。如`array`/`object`。
concat(coll, iteratee, cb)


|fn|arguments|argument type|description|return||||
|-|-|-|-|-|-|-|-|
|concat|||把coll中的每一项经过iteratee处理（并发执行）后按原顺序组装后返回。|promise||||
||coll|array / iterable / asynciterable / object||||||
||iteratee|asyncfunction||||||
||cb|function||||||
|concatLimit|||最大执行limit次迭代|promise||||
||coll|||||||
||limit|number||||||
||iteratee|asyncfunction||||||
||cb|function||||||
|concatSeries|||与concat类化，但是只执行一个异步操作|promise||||
||coll|||||||
||iteartee|||||||
||cb|function||||||
|detect|||cb处理coll中第一个被iteratee处理为值的值|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|detectLimit|||最多执行limit次探测|promise||||
||coll|||||||
||limit|number||||||
||iteratee|||||||
||cb|function||||||
|detectSeries|||只执行一次探测|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|each|||迭代|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|eachLimit|||description|promise||||
||coll|||||||
||limit|number||||||
||iteratee|||||||
||cb|function||||||
|eachOf|||与each类似。iteratee的第二个参数时key/index.|promise||||
||coll|||||||
||iteratee|(value, key, cb)||||||
||cb|function||||||
|eachOfLimit|||description|promise||||
||coll|||||||
||limit|||||||
||iteratee|||||||
||cb|function||||||
|eachOfSeries|||只执行一个为真的值|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|eachSeries|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|every|||经iteratee处理coll，若全为真则返回处理的结果，否则返回false.|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|everyList|||description|promise||||
||coll|||||||
||limit|||||||
||iteratee|||||||
||cb|function||||||
|everySeries|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|filter|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|filterLimit|||description|promise||||
||coll|||||||
||limit|||||||
||iteratee|||||||
||cb|function||||||
|filterSeries|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|groupBy|||返回一个对象，key是相当的key.value是coll中的值组成的数组。|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|groupByLimit|||description|promise||||
||coll|||||||
||limit|||||||
||iteratee|||||||
||cb|function||||||
|groupBySeries|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|map|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|mapLimit|||description|promise||||
||coll|||||||
||limit|||||||
||iteratee|||||||
||cb|function||||||
|mapSeries|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|mapValues|||为object设计map方法|promise||||
||coll|||||||
||iteratee|(value, key, cb)||||||
||cb|function||||||
|mapValuesLimit|||description|promise||||
||coll|||||||
||limit|||||||
||iteratee|||||||
||cb|function||||||
|mapValueSeries|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|reduce|||description|promise||||
||coll|||||||
||memo|reduce的初始值||||||
||iteratee|||||||
||cb|function|(memo, item, cb)|||||
|reduceRight|||description|promise||||
||array|||||||
||memo|||||||
||iteratee|||||||
||cb|function||||||
|reject|||filter的相反方法|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|rejectLimit|||description|promise||||
||coll|||||||
||limit|||||||
||iteratee|||||||
||cb|function||||||
|rejectSeries|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|some|||当iteratee返回true时，执行cb|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|someLimit|||description|promise||||
||coll|||||||
||limit|||||||
||iteratee|||||||
||cb|function||||||
|someSeries|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|sortBy|||使用iteratee排序|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|transform|||description|promise||||
||coll|||||||
||accumulator|可选||||||
||iteratee|(acc, item, index, cb)||||||
||cb|function||||||

## control flow
|key||||||||
|-|-|-|-|-|-|-|-|
|applyEach|||description|promise||||
||fns|||||||
||args|||||||
||cb|function||||||
|key|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|key|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|key|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|key|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|key|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|key|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|key|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|key|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|key|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|key|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|key|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||

## utils
|key||||||||
|-|-|-|-|-|-|-|-|
|key|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|key|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||
|key|||description|promise||||
||coll|||||||
||iteratee|||||||
||cb|function||||||

# thoery