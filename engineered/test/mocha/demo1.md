# overview
如何编写测试文件。
本示例展示了：
- 同步测试
- 异步测试 * 3
- only / skip
- hooks
- configuration file

# init project
同`./demo0.md`

编写`<root>/test/first.js`
```
let {add, afn, pfn} = require('../index.js')
let {assert, expect} = require('chai')
let {log} = console
// console.log(assert)

describe('Array', () => {
    it('string', () => {
        assert.equal(add(1, 2), 3)
    })
    it('string', () => {
        assert.equal(add(1, 2), 4)
    })
    it('string', () => {
        assert.equal([1, 2, 3].indexOf(4), -1)
    })
})
describe('test', function () {
    this.timeout(2000)
    it('hi', function(done) {
        setTimeout(done, 4000)
    })
})
// describe.only('test', function () {
//     this.timeout(2000)
//     it('hi', function(done) {
//         setTimeout(done, 4000)
//     })
// })
// describe.skip('test', function () {
//     this.timeout(2000)
//     it('hi', function(done) {
//         setTimeout(done, 4000)
//     })
// })
describe('asyc', function() {
    this.timeout(8000)
    let x = true
    it('item', function (done) {
        setTimeout(function () {
            x = false
            expect(x).to.be.not.ok
            done() // 通知mocha测试结束
        }, 2000)
    })
})
describe('async', function () {
    this.timeout(2000)
    it('afn', function (done) {
        let a = afn()
        log(a)
        done()
    })
})
describe('async', function () {
    // this.timeout(2000)
    it('pfn', function () {
        let a = pfn('str')
        return a.then(res => {
            expect(res).to.be.equal('str')
        })
    })
})
describe('test for hooks', function () {
    beforeEach(() => {
        console.log('beforeEach')
    })
    before(() => {
        console.log('before')
    })
    it('pfn', async function () {
        let a = await pfn('hi')
        expect(a).to.be.equal('hi')
    })
    it('pfn', async function () {
        let a = await pfn('hi')
        expect(a).to.be.equal('hi')
    })
    it('pfn', async function () {
        let a = await pfn('hi')
        expect(a).to.be.equal('hi')
    })
    afterEach(() => {
        console.log('afterEach')
    })
    after(() => {
        console.log('after')
    })
})
```

编写`<root>/test/index.js`
```
module.exports = {
    add: (a, b) => (a + b),
    afn: () => {
        setTimeout(() => {
            return 'hi'
        }, 1500);
    },
    pfn: (str) => {
        return new Promise((s, j) => {
            setTimeout(function() {
                s(str)
            }, 1500);
        })
    }
}
```

编写`<root>/.mocharc.js`
```
module.exports = {
    // require: 'test/hooks.js'
    // recursive: true
    // invert: true,
    fgrep: 'test' // 只测试描述文本中包含'test'的测试集合、测试项。
}
```

## dir construct
```
<root>
|-- index.js     // 被测试的文件
|-- test
    |-- first.js // 测试文件
    |-- index.js // 被测试文件
|-- .mocharc.js  // mocha的配置文件
|-- packag.json
|-- xxxx
```

# 执行测试
```
npx mocha
```
当有断言失败时报错。