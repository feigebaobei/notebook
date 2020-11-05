#promise

1. 对象的状态不受外界影响。pending=>fulfilled || pending=>rejected  
2. 一旦状态改变，就不会再变。  
3. promise新建后就会立即执行，无法中途取消。  
4. promise的错误会一直冒泡。  
5. 处于pending状态时，无法知道进展到哪个阶段。  

**不能返回值。就像一个if判断一样，分别执行一个函数。**
**resolved时执行resolve函数。rejected时执行reject函数。**

**实例化promise对象**

    const promise = new Promise((resolve, reject) => {
        // code
        if (condition) {
            resolve(value)
        } else {
            reject(error)
        }
    })

**为promise对象使用then方法分别指定resolve状态和reject状态**

    promise.then((value) => {}, (error) => {}) 

```
    const getJson = (url) => {
        const promise = new Promise((resolve, reject) => {
            const handler = function () {
                if (this.readyState !== 4) {
                    return
                }
                if (this.status === 200) {
                    resolve(this.response)
                } else {
                    reject(new Error(this.statusText))
                }
            }
            consts client = new XMLHttpRequest()
            client.open('GET', url)
            client.onreadystatechange = handler
            client.responseType = 'json'
            client.setRequestHeader('Accept', 'application/json')
            client.send()
        })
        return promise
    }
    getJson('/posts.json').then(function(json) {
        console.log('Contents: ' + json)
    }, function (error) {
        console.error('出错了。', error)
    })
```

**异步加载图片**

    let loadImageAsync = (url) => {
        return new Promise((resolve, reject) => {
            let image = new Image()
            image.src = url
            image.onload = () => {
                resolve(image)
            }
            image.onerro = () => {
                reject(new Error('error' + url))
            }
        })
    }

**可以嵌套**

    const p1 = new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error('fail')), 3000)
    })
    const p2 = new Promise(function (resolve, reject) {
      setTimeout(() => resolve(p1), 1000)
    })
    p2
      .then(result => console.log(result))
      .catch(error => console.log(error))

改变状态后需要使用`return`才能取消代码向下执行。  
then可以接受2个参数。（resolve时执行，reject时执行）。可以利用这个特性实现链式写法。  
then指定的方法会在当前所有脚本执行完后执行。  
catch是then(null, rejection)的别名，用于指定发生错误时的回调函数。  
promise对象的rejected状态会向上冒泡。会被最近的一个catch函数捕获。  
定义promise时就会立即执行。绑定的then方法会在所有同级js文件执行后执行。  


**Promise.prototype.then()**  

then()方法返回的是一个promise对象，所以可以链式调用。  

**Promise.prototype.catch()**  

是then(null, rejection)的别名。  

**Promise.prototype.all()**  

将多个promise对象包装成一个promise对象。  

    var p = Promise([p1, p2, p3]) // 参数可以不是数组，但一定要有Iterator接口，且每个成员必须是promise实例。  

全是的resolved时p执行then方法。有一个rejected就执行p的catch方法。  

**Promise.prototype.race()**  

    var p = Promise.race([p1, p2, p3]) // 最先改变状态的promise对象决定p的状态。  

**Promise.allSettled()**  

等所有这些实例都向返回结果（不管是fulfilled/rejected）。
一旦结束，状态问题fulfilled。
```
let allSP = Promise.allSettled([p0, p1, p2]).then(([rp0, rp1, rp2]) => {...})
```

**Promise.any()**  

当参数实例只要有一个变为fulfilled，则该实例为fulfilled状态。否则该实例为reject状态。
若抛出错误，则该错误是一个AggregateError，它是一个数组，若每个成员对应一个rejected.
```
Promise.any([p0, p1, p2]).then(([rp0, rp1, rp2]) => {...}).catch(([ep0, ep1, ep2]) => {...})
```

**Promise.resolve()**  

将参数转化为promise对象。  

    Promise.resolve('foo')
    // 等同于
    new Promise(resolve => resolve('foo'))

它接受的参数有4种。

|||
|-|-|
|promise对象|直接返回，不做操作。|
|thenable(具有then方法的对象) let a = {then: () => {...}}|转化为的promise对象后立即执行其then方法。|
|不是thentable对象的、不是对象的|返回一个新的promise对象。状态是resolved.|
|无参数|返回一个的resolved状态的promise对象。|

**Promise.reject()**  

返回一个promise对象，状态是rejected.  

    var p = Promise.reject('error')
    // 等同于
    var p = new Promise((resolve, reject) => reject('error'))

**Promise.try()**  

未知某方法是同步、异步。
```
let f = () => {...} // 同步
Promise.resolve().then(f) // 异步
```

**Promise.prototype.done()**  

抛出最后一个错误。

    Promise.prototype.done = function(onFulfilled, onRejected) {
        this.then(onFulfilled, onRejected)
            .catch(function (reason) {
                setTimeout(() => throw reason, 0)
            })
    }

**Promise.prototype.finally()**  

不管最后是什么状态，都会执行的操作。参数时一个函数。  
它不返回promise对象，所以其后不能直接使用then/catch.

    Promise.prototype.finally = function (callback) {
        let p = this.constructor
        return this.then(
            value => p.resolve(callback()).then(() => value),
            reason => p.resolve(callback()).then(() => reason)
        )
    }

**一段代码限时3s执行完。否则报错。**  

    const p1 = new Promise.race([new Promise((resolve, reject) => {
        // code
    }), new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('request timeout'), 3000)
        })
    })])

    p1.then(console.log(true)).catch(console.log(false))











































