iterator的作用  

1. 为各种数据结构提供一个统一的、简便的访问接口。  
2. 使数据按照某种次序排列。  
3. 创造一种新的遍历方法（`for...of`）  

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

默认的Iterator接口部署在数据结构的Symbol.iterator属性。  
有Symbol.iterator属性的就是可以遍历的。  

原生具备Iterator接口的数据结构。  

- Array  
- Map  
- Set  
- String  
- TypedArray  
- arguments  
- NodeList  

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

****
****
****
****
****
****
****
****
****
****
****
****
****
****
****
****

---
2018/08/16 by stone