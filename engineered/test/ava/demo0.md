# overview
本示例展示了：
- 如何使用ava

# init project
```
mkdir projDir
cd projDir
npm i ava -D
npm set-script test ava
```

## 创建文件
创建被测试文件`<root>/file.ext`
```
module.exports = {
    add: (a, b) => (a + b)
}
```
创建被测试文件`<root>/file.ext`
```
const useava = require('..');
let test = require('ava')
test('add', (t) => {
    // t：执行对象。包含断言。
    t.is(useava.add(1, 2), 3, 'show error of add()')
})
test('add 2', (t) => {
    t.is(useava.add(1, 2), 4, 'show error of add() 2')
})
```

# usage
`npm run test`

# 后记
