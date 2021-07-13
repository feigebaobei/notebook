# overview
本示例展示了：
- 使用js api运行测试文件。

# init project
同`./demo0.md`

## 创建文件
创建`<root>/__tests__/firstTestApi.js`
```
let Jasmine = require('jasmine')
let jasmine = new Jasmine()
jasmine.loadConfigFile('./spec/support/jasmine.json')
jasmine.configureDefaultReporter({
    showColors: false    // 输出日志时没用彩色
});
jasmine.execute()        // 开发执行
```

# usage
`node __tests__/firstTestApi.js`

# 后记
有人把测试代码放在与被测试代码附近，有人把测试代码集中到一个目录中管理。二者只是习惯不同。我更喜欢后者。