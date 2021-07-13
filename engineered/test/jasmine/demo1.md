# overview

本示例展示了：
- 使用cli启动测试。
- 设置cli options
- 使用自定义配置项

# init project
同`./demo0.md`
```
mkdir projDir
cd projDir
// other command
```

## 创建文件
创建测试文件`__tests__/custTest.js`
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

创建`__tests__/config.json`
```
{
    "spec_dir": "__tests__",
    "spec_files": [
      "custTest.js"
    ],
    "helpers": [
      "helpers/**/*.js"
    ],
    "stopSpecOnExpectationFailure": false,
    "random": true
}
```

## dir construct
```
<root>
|-- xxxx // 说明主要文件/目录的功能
|-- __tests__
    |-- custTest.js     // 测试文件
    |-- config.json     // 配置文件
    |-- xxxx
|-- xxxx
```

# usage
`npx jasmine --config=__tests__/config.json`

# 后记
我不喜欢使用`=`把选项、选项值链接起来。我喜欢使用` `（空格）把选项、选项值分开。