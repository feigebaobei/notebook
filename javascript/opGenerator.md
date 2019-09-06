# generator 的笔记

1. 有特定的书写格式。
2. 返回Iterator接口。
3. 分段执行函数体。
4. 结合异步方法使用。

## 特定的书写格式

    function * gen () {
        yield 'hello'
        yield* 'world'
        yield fn() // fn()必须返回iterable的内容.
        return 'ending'
    }

## 返回Iterator接口

generator方法返回的是Iterator接口。

    function* fib(max) {
      let index = 0
      let [prev, cur] = [0, 1];
      while (index < max) {
        (yield(cur));
        [prev, cur] = [cur, cur + prev]
        index++
      }
    }
    console.log([...fib(15)]) // [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610 ]

## 分段执行函数体

generator函数的实例只有执行`next()`方法才执行下一段。否则就不执行。正因其有此特性，才可以执行一段后执行其它代码然后再执行下一段。

    function * toggle (init) {
        while (true) {
            yield init
            init = !init
        }
    }
    let g = toggle(false)
    g.next() // { value: false, done: false }
    // other code
    g.next() // { value: true, done: false }
    // other code
    g.next() // { value: false, done: false }
    // other code
    g.next() // { value: true, done: false }

## 结合异步方法使用

    function * readFile () {
        var r0 = yield fetch('url0') // fetch是异步读取文件的方法
        var r1 = yield fetch('url1')
        var r2 = yield fetch('url2')
    }

因generator方法的实例不会自动执行，需要使用`next()`方法才能执行。在此例中我们希望该实例可以自动执行完函数体。现在我们需要一个让generator实例自动执行的方法（自执行方法）。这里介绍一个`co`模块。

    co(readFile())