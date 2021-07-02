# overview
本示例展示了：
- jest中如何测试异步方法

# init project
同`./demo0.md`
创建`<root>/second.test.js`
```
let cfn = (cb, t = 1500) => {
    setTimeout(() => {
        let a = 20
        cb(a)
    }, t)
}
let pfn = () => {
    return new Promise((s, j) => {
        setTimeout(() => {
            s(20)
        }, 500);
    })
}

describe('async', function () {
    test('callback', function(done) {
        function cb (data) {
            try {
                expect(data).toBe(20)
                done() // 只有执行此方法，才会停止此测试细则。
            } catch (e) {
                done(e)
            }
        }
        cfn(cb)
    })
    test('promise', function () {
        return pfn().then(res => {
            expect(res).toBe(20)
        })
    })
    test('async', async () => {
        let res = await pfn()
        expect(res).toBe(21)
    })
})
```

## dir construct
```
<root>
|-- sum.js         // 被测试的文件
|-- sum.test.js    // 测试文件
|-- second.test.js // 测试文件
|-- xxxx
```

# usage
同`./demo0.md`
