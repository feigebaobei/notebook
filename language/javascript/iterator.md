iterator的作用  

1. 为各种数据结构提供一个统一的、简便的访问接口。  
2. 使数据按照某种次序排列。  
3. 创造一种新的遍历方法（`for...of`）  

## iterator对象

对象的Symbol.iterator指向一个返回遍历器对象的方法。
遍历器对象具有next方法。调用next()方法可以返回一个当前成员的信息对象。{value: v, done: b} // value: 当前值，done: 是否结束。

    var a = [1,2,3,4] // Array对象具有Symbol.iterator属性
    var s = a[Symbol.iterator]() // 得到遍历器对象
    s.next() // 使用next()依次得到值
    s.next()

为了方便使用遍历器对象，es6添加了`for...of`循环
若一个对象有Symbol.iterator方法，则这个接口就有Iterator接口。若有该接口，则可以使用for...of循环。
若一个对象可以使用for...of循环，则证明该对象有Iterator接口。

有些数据类型已经具有Iterator接口了。

- Array  
- Map  
- Set  
- String  
- TypedArray  
- arguments  
- NodeList // dom对象组成的列表

Object没有Iterator接口。
若要使用Iterator接口需要设定。

    // 先证明没有Iterator接口
    var o = {a: 0, b: 1, c: 2}
    for (let v of o) {console.log(v)} // Uncaught SyntaxError: o is not iterable
    o[Symbol.iterator] = function* () {yield this.a; yield this.b; yield this.c; return}
    for (let v of o) {console.log(v)}
    // 0
    // 1
    // 2

for...of 中得到是当前值。
next() 得到的是当前值的信息对象。

## Iterator的遍历过程

1. 创建一个指针对象，指向当前数据结构的起始位置。（遍历器对象本质上就是一个指针对象）
2. 调用指针对象的next()，可以将指针指向数据结构下一个成员，直到结束。

```
    let makeIterator = (arr) => {
        let nextIndex = 0
        return {
            next: () => nextIndex < arr.length ? {value: arr[nextIndex++], done: false} : {value: undefined, done: true}
            // value: 当前值。
            // done: 是否遍历结束
        }
    }
    let it = makeIterator(['a', 'b'])
    it.next() // { done: flase, value: 'a'}
    it.next() // { done: flase, value: 'b'}
    it.next() // { done: true, value: undefined}
```

**为对象添加iterator接口**  

    // define
    let Obj = {
        data: ['a', 'b', 'c', 'd'],
        [Symbol.iterator] () {
            let self = this,
                index = 0
            return {
                // next () {}
                // next: () => {}
                next () {
                    if (index < self.data.length) {
                        return { done: false, value: self.data[index++] }
                    } else {
                        return { done: true, value: undefined }
                    }
                }
            }
        }
    }
    // usage
    for ( let item of Obj ) {
        ...
    }

    // let Obj = {
        a: 'a',
        b: 'b',
        c: 'c',
        [Symbol.iterator] () {
            let self = this,
                keys = Object.keys(self),
                index = 0
            return {
                next: () => {
                    if (index < keys.length) {
                        return { done: false, value: keys[index++] }
                    } else {
                        return { done: true, value: undefined }
                    }
                }
            }
        }
    }
    //
    for (let item of Obj) {
        console.log(item)
    }

**对于类似数组的对象使用iterator接口**  

    NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]
    NodeList.prototype[Symbol.iterator] = [][Symbol.iterator]

    // define
    let Obj = {
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3,
        [Symbol.iterator]: [][Symbol.iterator]
    }
    // suage
    for (let item of Obj) {
        ... 
    }

## 调用Iterator接口的场合

1. 解构赋值
2. 扩展运算符
3. yield*
4. for...of
5. Array.from()
6. Map() Set() WeakMap() WeakSet()
7. Promise.all()
8. Promise.race()

---
2019/08/17 by stone