# overview
本示例展示了：
- 在项目中如何使用`chai`

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
创建`<root>/test/index.js`。这是测试文件。
```
let {add} = require('../index.js')
let {assert} = require('chai')
assert.equal(add(1, 2), 3)
assert.equal(add(1, 2), 4)
```

## dir construct
```
<root>
|-- index.js     // 被测试的文件
|-- test
    |-- index.js // 测试文件
|-- packag.json
|-- xxxx
```

# 执行测试
```
node test/index.js
```
当有断言失败时报错。