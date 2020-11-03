##Generator  

1. 它是一个状态机，封装了多个内部状态。  
2. 执行Generator函数时返回一个遍历器对象（iterator）。  
3. 使用`function`与函数名之间的`*`。demo:`function * gen() {yield 'string'}`  
4. 内部使用`yield`表达式。只能在genrator函数内部使用。  
5. yield表达式必须在
6. value表示当前内部状态的值。done表示是否结束。

**用途**  
1. 用于多次返回数据。（数列）

```
    function * hwGenerator () {
        yield 'hello'
        yield 'world' // 到yield会暂时运行。返回到yield后面的值。下次运行进再向下执行。
        return 'ending' // 到return为止
    }
    var hw = hwGenerator()
    hw.next() // { value: 'hello', done: false }
    hw.next() // { value: 'world', done: false }
    hw.next() // { value: 'ending', done: true }
    hw.next() // { value: undefined, done: true }
```

##yield  

Generator函数提供了一个可以暂停执行的函数。通过调用`next()`执行下一个内部状态。由`yield`表达式表示暂停标志。
`yield`表达式，本身没有值，总是等于`undefined`，所以使用yield表达式时需要next()赋值。  
yield 是惰性求值，只有执行到yield表达式时才求值。
只能用在generator函数里。
在表达式中使用时，必须放在`()`里

##与iterator接口的关系  

Iterator接口是对应返回遍历的方法的。Generator函数正好是返回遍历器。

    var myIterator = {}
    myIterator[Symbol.iterator] =  function * () { // 为对象添加Iterator接口
        yield 1
        yield 2
        yield 3
    }
    [...myIterator] // [1, 2, 3]

## next方法的参数  

该参数当作上一个yield表达式的返回值。  
`next()`可以写入参数。表示上一次yield的返回值。
第一次执行next时传递参数是无效的。从第二次使用next()开始，使用参数才有效。

## for...of循环  

只作用于yield表达式的。不作用于return。  
若遇上return，则停止执行。
generator对象返回的是iterator对象。且不需要执行next方法。

    // define
    function * objectEntries(obj) {
        let propKeys = Reflect.ownKeys(obj)
        for (let propKey of propKeys) {
            yield [propkey, obj[propKey]]
        }
    }
    // usage
    let p = { first: 'jan', last: 'boo' }
    for (let [key, value] of objectEntries(p)) {
        console.log(`${key}: ${vlaue}`)
    }

    function * numbers () {
        yield 1
        yield 2
        return 3
        yield 4
        yield 5
    }
    [...numbers()] // [1, 2]
    Array.from(numbers())
    let [x, y] = numbers() // x: 1, y: 2
    for (let n of numbers()) {
        // 1
        // 2
    }

## **Generator.prototype.throw()**  

1. iterator对象(generator方法返回的)抛出错误时会被generator函数体内的捕获。第二次抛出时generator方法不捕获。  
3. generator方法内部没写try...catch,则触发外部的try...catch。若外部没有try...catch，则报错并中断执行。
2. throw()方法执行时会以附带执行一次next()方法。  
3. throw() 和g.throw()互不影响。  
4. 一旦g执行过程中抛出错误，且没有被内部捕获。就不会再执行下去。再执行next()就会返回`{ value: undefined, done: true }`表示运行结束。  

## **Generator.prototype.return()**  

在generator函数内使用try...finally，并使用g.return(value)，则在执行g.return前执行finally内的代码再执行g.return(value)。此时返回的内容是`{value: value, done: true}`

1. 返回给定的值。并且终结遍历generator函数。  
```
    function * g () {
        yield 1
        yield 2
        yield 3
    }
    let gsub = g ()
    gsub.next() // { value: 1, done: false }
    gsub.return('for') // { value: 'foo', done: true }
    gsub.next() // { value: undefined, done: true }
```
**next(), throw(), return()**  

1. 本质上是一样的。都是替换`yield`表达式。  
2. next()将yield表达式替换成一个值。  
3. throw()将yield表达式替换成一个throw语句。  
4. return()将yield表达式替换成一个return语句。  

**`yield*`**  

在一个g内部调用另一个g.  
返回iterator对象。  

    function * bar () {
        yield: 'x';
        yield* foo()
        yield: 'y'
    }
    function * foo () {
        yield: 'a',
        yield: 'b'
    }
    // 等同于
    function * bar () {
        yield: 'x';
        yield: 'a',
        yield: 'b',
        yield: 'y'
    }

**对象属性的generator函数**  

    let obj = {
        * g () {...}, // 在属性前写 *
        // or
        k: function * () {...}
    }

**generator函数的this**  

    // 生成一个空对象，使用`call`方法绑定generator函数内部的`this`
    function * F() {
        this.a = 1
        yield this.b = 2
        yield this.c = 3
    }
    let obj = {}
    let f = new F.call(obj)
    f.next() // { value: 2, done: false }
    f.next() // { value: 3, done: false }
    f.next() // { value: undefined, done: true }
    obj.a // 1
    obj.b // 2
    obj.c // 3

**把generator方法改为构造函数**

    function * gen () {
        this.a = 1
        yield this.b = 2
        yield this.c = 3
    }
    function F () {
        return gen.call(gen.prototype)
    }
    var f = new F()
    f.next() // {value: 2, done: false}
    f.next() // {value: 3, done: false}
    f.next() // {value: undefined, done: true}
    f.a // 1
    f.b // 2
    f.c // 3

## 应用

### 异步操作的同步化表达
### 控制流管理

    let steps = [step1Func, step2Func, step3Func];
    function* iterateSteps(steps){
      for (var i=0; i< steps.length; i++){
        var step = steps[i];
        yield step();
      }
    }

    var it = iterateJobs(jobs);
    var res = it.next();
    while (!res.done){
      var result = res.value;
      // ...
      res = it.next();
    }

### 部署iterator接口

    function * iterEntries(obj) {
        let keys = Object.keys(obj)
        for (let key of keys) {
            yield [key, obj[key]]
        }
    }
    function * makeSimpleGenerator(arr) {
        var index = 0
        while (index < arr.length) {
            yield arr[index++]
        }
    }

### 作为数据结构

    function * doStuff () {
        yield ...
        yield ...
        yield ...
    }

**斐波那契数列**  

    function * fib () {
        let [f, e] = [0, 1]
        while (true) {
            yield e
            [f, e] = [e, f + e]
        }
    }
    function genfb (count) {
        let ele = fib()
        let arr = []
        let index = 0
        while (index < count) {
            arr.push(ele.next().value)
            index++
        }
        return arr
    }

**大衍数列**  

    function * dayan (max) {
        let bool = true,
            count = 1
        while (count <= max) {
            if (bool) {
                yield (count * count - 1) / 2
            }else {
                yield (count * count) / 2
            }
            bool = !bool
            count++
        }
    }

**自增id**  

    function * next_id () {
        let current_id = 0
        while (true) {
            yield current_id++
        }
    }
    // usage 
    let idNum = next_id() // 得到实例
    idNum.next() // { value: 0, done: false }
    idNum.next() // { value: 1, done: false }
    idNum.next() // { value: 2, done: false }
    idNum.next() // { value: 3, done: false }
    // 会一直运行下去，没有结束。

**状态机**  

    function * isClock (init = false) {
        let ticking = init
        while (true) {
            yield ticking = !ticking
        }
    }

**异步操作**  

    function * load () {
        ...
        yield ajaxEvent()
        otherAjaxEvent()
    }

    let l = load()
    l.next() // ajaxEvent
    l.next() // otherAjaxEvent
    // 利用了g函数暂停执行的效果

**同步操作**  

    function * main () {
        let result = yield ajaxRequist('url');
        console.log(result)
    }
    function ajaxRequest('url') {
        makeAjax(url, fuction (response) {
            ...
            it.next(response)
        })
    }
    var it = main()
    it.next()

## 协程  

有点像函数，也有点像线程。  

1. 协程A开始。  
2. 执行到一半时暂停，执行权转移到协程B.  
3. 协程交还执行权。  
4. 协程A恢复执行。  

## Thunk 函数  

传值调用 call by value （c/js就是用的这种）

    let x = 1
    f(x + 5) // f(6)

传名调用 caal by name  (haskell语言就是用这种)  

    let x = 1
    f(x + 5) // f(x + 5)

它是传名调用的一种实现策略。  
把参数放到一个临时函数中，再将临时函数传入函数体。  

    let thunk = () => {
        return x + 5
    }
    let f = (thunk) => {
        retunr thunk() * 2
    }


