##Generator  

1. 它是一个状态机，封装了多个内部状态。  
2. 执行Generator函数时返回一个遍历器对象（iterator）。  
3. 使用`function`与函数名之间的`*``。  
4. 内部使用`yield`表达式。只能在genrator函数内部使用。  
5. yield表达式必须在

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

##与iterator接口的关系  

    var myIterator = {}
    myIterator[Symbol.iterator] =  function * () {
        yield 1
        yield 2
        yield 3
    }
    [...myIterator] // [1, 2, 3]

## next方法的参数  

该参数当作上一个yield表达式的返回值。  

## for...of循环  

只作用于yield表达式的。不作用于return。  

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

**Generator.prototype.throw()**  
1. iterator对象抛出错误时会被generator函数体内的捕获。第二次抛出不会捕获。  
2. throw()方法执行时会以附带执行一次next()方法。  
3. throw() 和g.throw()互不影响。  
4. 一旦g执行过程中抛出错误，且没有被内部捕获。就不会再执行下去。再执行next()就会返回`{ value: undefined, done: true }`表示运行结束。  

**Generator.prototype.return()**  

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

****
****
##
##
##
##
##
##
##
##
##
##
##
##