# overview
本示例展示了：
- 在项目中如何使用`mocha`
- 与断言库（本示例使用`chai`）一起使用

# init project
```
mkdir projDir
cd projDir
npm i chai -D
```
创建`<root>/index.js`。这是项目的文件。用于被测试。
```
module.exports = {
    add: (a, b) => (a + b)
}
```
创建`<root>/test/first.js`。这是测试文件。
```
let {add} = require('../index.js')
let {assert} = require('chai')
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
```

## dir construct
```
<root>
|-- index.js     // 被测试的文件
|-- test
    |-- first.js // 测试文件
|-- packag.json
|-- xxxx
```

# 执行测试
```
npx mocha
```
当有断言失败时报错。