#promise

1. 对象的状态不受外界影响。pending=>fulfilled || pending=>rejected  
2. 一旦状态改变，就不会再变。  
3. promise新建后就会立即执行，无法中途取消。  
4. promise的错误会一直冒泡。  
5. 处于pending状态时，无法知道进展到哪个阶段。  

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

    const p1 = new Promise((resolve, reject) => {})
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (condition) {
                resolve(p1)
            } else {
                reject(condition)
            }
        })
    })














































