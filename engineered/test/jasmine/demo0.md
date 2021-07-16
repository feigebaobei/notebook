# overview
本示例展示了：
- 如何在项目使用jasmine

# init project
```
mkdir projDir
cd projDir
npm i jasmine -D
npx jasmine init              // generate configuration file + 测试文件的目录
npm set-script test jasmine
npm run test
```

创建文件`<root>/index.js`
```
module.exports = {
    add: (a, b) => (a + b)
}
```
创建文件`<root>/spec/first_spec.js`
```
let {add} = require('../index.js')
describe('first', () => {
    it('second', () => {
        expect(add(1, 2)).toEqual(3)
    })
    it('second', () => {
        expect(add(1, 2)).toEqual(4)
    })
})
```
## dir construct
```
<root>
|-- xxxx // 说明主要文件/目录的功能
|-- sepc
    |-- first_spec.js // 测试文件
    |-- xxxx
|-- index.js          // 被测试文件
|-- xxxx
```

# usage
启动测试
`npm run test`

# priciple
原理

# 后记
本示例中需要注意的地方。
为什么这么做示例。
如何恢复本示例的运行结果。