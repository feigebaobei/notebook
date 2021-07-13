# overview
本示例展示了：
- 如何使用qunit测试

# init project
```
mkdir projDir
cd projDir
npm i qunit -D
npm set-script test qunit
```

## 创建文件
创建被测试文件`<root>/index.js`
```
module.exports = {
    add: (a, b) => (a + b)
}
```

创建测试文件`<root>/test/first.js`
```
const useQunit = require('..')
QUnit.module('useQunit.add')
QUnit.test('add two numbers', assert => {
    assert.equal(useQunit.add(1, 2), 3)
})
```

# usage
`npm run test`

# 后记
